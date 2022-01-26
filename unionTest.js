import { parseQuery } from "./parser.js";
import {convertQueryToArray} from './subsetTest.js';


const unionTest = async (aggrQuery, postgresClient, collection) => {
let unionData = [];
let idArray = [];
  try {
    const parsedQuery = parseQuery(aggrQuery);
    const queryArray = convertQueryToArray(collection, parsedQuery);
    //Checks if the input query's final_stat_name attribute contains more than
    //one statistic. if it does not, then the query is not a candidate for a union query
    if (queryArray[queryArray.length-1] === undefined || queryArray[queryArray.length-1].length < 2) {
      unionData.push(false);
    } else {
      unionData.push(true);
    }
    //Loops through the statistic names found in the input query array's 
    //"final_stat_name" attribute and checks if the names already exist in cached data
    for (var statistic in queryArray[queryArray.length -1]){
      let statName = queryArray[queryArray.length-1][statistic];
      statName = statName.replace('$', '');
      const query = `SELECT * FROM aggregate_obj
     WHERE (native_collection = $1 and foreign_collection = $2 and group_id = $3 and start_date = $4 and end_date = $5 and 
      common_attr = $6 and final_stat_name = $7)`;
      const values = convertQueryToArray(collection, parsedQuery);
      values[values.length-2] = statName;
      values.pop();
      let data_test = await postgresClient.query(query, values);
      if (data_test.rows.length > 0) {
        idArray.push(data_test.rows[0].data_ref_id);

      } else {
        unionData[0] = false;
      }
    }
    unionData.push(idArray);
  } catch (e) {
    console.log(e);
  }
  return unionData;
};

const returnUnionData = async (idArray, postgresClient) => {
  //Retrieve data_ref_id from aggregate_obj table
  let unionDocs = {};
  let dataArray = [];
  unionDocs.union_data_from_id = idArray;

  for (var id in idArray) {
    const query = `SELECT * FROM aggregate_stats
    WHERE (id = $1)`;
    const values = [idArray[id]];
    let data_test = await postgresClient.query(query, values);
    if (data_test.rows.length > 0) {
      returnPostgresData(data_test.rows[0], dataArray);
    }
  }
  unionDocs = addDataArray(dataArray, unionDocs);
  return unionDocs;
};

const returnPostgresData = (doc, returnObj) => {
  for (var item = 1; item < Object.keys(doc).length; item++) {
    returnObj.push(doc[Object.keys(doc)[item]]);
  }
};

const addDataArray = (array, obj) => {
  let tempLabel = '';
  for (var item in array) {
    let data = array[item].split(':');
    if (data.length === 1) {
      if (array[item] !== 'NULL') {
        tempLabel = array[item];
      }
    } else if (data.length === 2) {
      if (obj[data[0]] === undefined) {
        obj[data[0]] = [tempLabel + ':' + data[1]];
      } else {
        obj[data[0]].push(tempLabel + ':' + data[1]);
      }
    }
  }
  return obj;
};

export {unionTest, returnUnionData};