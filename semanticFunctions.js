import * as fs from 'fs';

import {returnUnionData} from './unionTest.js';

const checkSemanticInfo = (query) => {
    let semanticData = [false];
    try {
        var data = fs.readFileSync('semanticRelations.txt', 'utf-8');
        data = data.split('\n');
        data = convertSemanticToArray(data);
        data.forEach((item) => {
            if (item[0] === query){
                semanticData[0] = true;
                semanticData.push(item);
            }
        }); 
        return semanticData;
    } catch(e) {
        console.log(e);
    }
};

const parseSemanticInfo = (semanticData, queryArray) => {
        let finalReturnData = [];
        let primaryQuery = semanticData[1][0];
        let relationType = semanticData[1][2];
        let relationTables = semanticData[1][4].split(',');
        let referenceQueries = [];
        //After pulling query labels from references queries in semantic info, 
        //If they exist within the array that contains all queries,
        //Push the pipeline from the query to then reference the aggregate_obj table
        for (var item in queryArray) {
            if (relationTables.includes(queryArray[item][0])){
                referenceQueries.push(JSON.stringify(queryArray[item][2]));
            }
        }
        //find the data_ref_id by using the pipeline as indidcator for aggregate function in tables
        //No need to parse query still, just pull data and make union
        finalReturnData.push(primaryQuery);
        finalReturnData.push(relationType);
        finalReturnData.push(referenceQueries);
        return finalReturnData;
};  

const convertSemanticToArray = (data) => {
    let newArray = [];
    data.forEach(item => {
        item = item.split(' ');
        newArray.push(item);
    }); 
    return newArray;
};  

const pullDataFromSemanticInfo = async (parsedSemanticData, postgresClient) => {
    let primaryQuery = parsedSemanticData[0];
    let relationType = parsedSemanticData[1];
    let refQueries = parsedSemanticData[2];
    let idArray = [];
    try {
        for (var item in refQueries) {
            const query = `SELECT data_ref_id FROM aggregate_obj
            WHERE pipeline = $1`;
            const values = [refQueries[item]];
            const data_test = await postgresClient.query(query, values);
            if (data_test.rows.length > 0) {
               idArray.push(data_test.rows[0].data_ref_id);
            } 
        }
        if (relationType === 'union') {
            const unionReturn = await returnUnionData(idArray, postgresClient);
            console.log(unionReturn);
        } else if (relationType === 'subset') {
            console.log('Subset data can be found from cached data');
            const query = `SELECT * FROM aggregate_stats
            WHERE id = $1`;
            const values = idArray;
            const data_test = await postgresClient.query(query, values);
            if (data_test.rows.length > 0) {
              console.log(data_test.rows[0]);
            } 
        }
    } catch (e) {
        console.log(e);
    }
};


export {checkSemanticInfo, parseSemanticInfo, pullDataFromSemanticInfo};