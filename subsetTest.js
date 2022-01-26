import { parseQuery } from "./parser.js";

const subsetTest = async (aggrQuery, postgresClient, collection) => {
  let subsetData = [];
  try {
    const parsedQuery = parseQuery(aggrQuery);
    //Retrieve data_ref_id from aggregate_obj table
    const query = `SELECT * FROM aggregate_obj
    WHERE (native_collection = $1 and foreign_collection = $2 and group_id = $3 and start_date = $4 and end_date = $5 and common_attr = $6 
            and stages = $7 and final_stat_name = $8)`;
    const values = convertQueryToArray(collection, parsedQuery);
    let data_test = await postgresClient.query(query, values);
    if (data_test.rows.length > 0) {
      const tempArray = convertPostgresObjToArray(
        data_test.rows[0].content_filter
      );
      if (parsedQuery.$in !== undefined) {
        if (
          tempArray.length > parsedQuery['in/nin'] &&
          parsedQuery.$in.every((elem) => tempArray.includes(elem))
        ) {
          subsetData.push(true);
        }
      } else {
        if (
          tempArray.length > parsedQuery['in/nin'] &&
          parsedQuery.$nin.every((elem) => tempArray.includes(elem))
        ) {
          subsetData.push(true);
        }
      }
      subsetData.push(data_test.rows[0].data_ref_id);
      subsetData.push(parsedQuery.$in);
    } else {
      subsetData.push(false);
    }
  } catch (e) {
    console.log(e);
  }
  return subsetData;
};
const returnSubsetData = async (id, docArray, postgresClient) => {
  //Retrieve data_ref_id from aggregate_obj table
  let subsetDocs = {};
  subsetDocs.subset_data_from_id = id;
  const query = `SELECT * FROM aggregate_stats
    WHERE (id = $1)`;
  const values = [id];
  let data_test = await postgresClient.query(query, values);
  if (data_test.rows.length > 0) {
    const keys = Object.keys(data_test.rows[0]);
    keys.forEach((elem) => {
      if (typeof data_test.rows[0][elem] === "string") {
        if (elem === "statname") {
          subsetDocs.statname = data_test.rows[0][elem];
        } else {
          let tempElem = data_test.rows[0][elem];
          tempElem = tempElem.split(":");
          let tempKey = tempElem[0];
          if (docArray.includes(tempKey)) {
            subsetDocs[elem] = data_test.rows[0][elem];
          }
        }
      }
    });
  }
  return subsetDocs;
};
function convertQueryToArray(local, array) {
  let returnArray = [];
  returnArray.push(local);
  returnArray.push(array.foreign);
  returnArray.push(array.group_id);
  returnArray.push(array.start_date);
  returnArray.push(array.end_date);
  returnArray.push(array.$eq);
  returnArray.push(array.stages);
  returnArray.push(array.aggrStat);
  return returnArray;
}
function convertPostgresObjToArray(string) {
  string = string.replace(/[{}]/g, "");
  let returnArray = string.split(",");
  for (var item in returnArray) {
    returnArray[item] = returnArray[item].replace('"', "").replace('"', "");
  }
  return returnArray;
}

export { subsetTest, returnSubsetData, convertPostgresObjToArray, convertQueryToArray };
