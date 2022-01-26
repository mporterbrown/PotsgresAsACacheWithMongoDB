async function insertMongoData(mongoDataArray, postgresClient) {
  const aggrAttributes = mongoDataArray[4];
  const aggrData = mongoDataArray[5];
  const queryAttr = mongoDataArray[2];
  try {
    //Fill the aggregate_stats table
    const statsArray = await prepareStatsArray(aggrData);
    const queryStats = `INSERT INTO aggregate_stats (statname, stat1, stat2, stat3, stat4, stat5, stat6, stat7, stat8, stat9, stat10)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    await postgresClient.query(queryStats, statsArray);

    //Grab the stat Id field
    const statId = await grabId(statsArray, postgresClient);

    //Fill the aggregate_obj table
    const objArray = await prepareObjArray(statId, queryAttr, aggrAttributes);

    const queryObj = `INSERT INTO aggregate_obj (data_ref_id, pipeline, native_collection, foreign_collection, content_filter, 
                          group_id, start_date, end_date, common_attr, final_stat_name, stages)
                          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    await postgresClient.query(queryObj, objArray);
  } catch (e) {
    console.log(e);
  }
}

async function pullFromPostgres(query, postgresClient) {
  const idQuery = `SELECT data_ref_id FROM aggregate_obj
                       WHERE pipeline = $1`;
  const idValues = [query];
  const data_test = await postgresClient.query(idQuery, idValues);
  var id = 0;
  if (data_test.rows.length > 0) {
    for (var data in data_test.rows) {
      id = data_test.rows[data].data_ref_id;
    }
    //Return the row from aggregate_stats using the data_ref_id
    const statsQuery = `SELECT * FROM aggregate_stats
                              WHERE id = $1`;
    const statsValues = [id];
    const data_test2 = await postgresClient.query(statsQuery, statsValues);
    if (data_test2.rows.length > 0) {
      for (var stat in data_test2.rows) {
        console.log(data_test2.rows[stat]);
      }
    }
    console.log(
      "***********************  END RESULTS FROM POSTGRES ***************************"
    );
  }
}

async function checkPostgres(aggQuery, postgresClient) {
  //Retrieve data_ref_id from aggregate_obj table
  const query = `SELECT data_ref_id FROM aggregate_obj
                     WHERE pipeline = $1`;
  const values = [aggQuery];
  const data_test = await postgresClient.query(query, values);
  if (data_test.rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

const prepareStatsArray = (array) => {
  console.log(array);
  while (array.length < 11) {
    array.push("NULL");
  }
  return array;
};

const grabId = async (array, postgresClientTemp) => {
  const queryGrabId = `SELECT * FROM aggregate_stats
  WHERE (statname = $1 and stat1 = $2 and stat2 = $3 and stat3 = $4 and stat4 = $5 and stat5 = $6 and stat6 = $7
         and stat7 = $8 and stat8 = $9 and stat9 = $10 and stat10 = $11)`;
  let query = await postgresClientTemp.query(queryGrabId, array);
  let id;
  id = query.rows[0].id;
  return id;
};

const prepareObjArray = async (id, query, array) => {
  //data_ref_id, query, native_collection, foreign_collection, content_filter, group_id, start_date,
  //end_date, common_attr, final_stat_name, stages
  let newArray = [id];
  newArray.push(query);
  newArray.push(array.local);
  newArray.push(array.foreign);
  if (array.$in === undefined) {
    newArray.push(array.$nin);
  } else {
    newArray.push(array.$in);
  }
  newArray.push(array.group_id);
  newArray.push(array.start_date);
  newArray.push(array.end_date);
  newArray.push(array.$eq);
  newArray.push(array.aggrStat);
  newArray.push(array.stages);

  return newArray;
};

const clearTables = async (postgresClient) => {
  try {
    const query = `DELETE FROM aggregate_obj`;  
    await postgresClient.query(query);
    const query2 = `DELETE FROM aggregate_stats`;
    await postgresClient.query(query2);
  } catch(e) {
    console.log(e);
  }
};

export {
  prepareObjArray,
  grabId,
  prepareStatsArray,
  insertMongoData,
  checkPostgres,
  pullFromPostgres,
  clearTables
};
