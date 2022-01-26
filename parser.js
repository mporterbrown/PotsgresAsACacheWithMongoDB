//AggregateAttribute Table Columns:
// [native collection, foreign collection, $match $in/ $nin array, $group _id, Start Date, End Date,
// $eq in $lookup pipeline, Final Projection (Will contain the aggregate statistic),
// Number of stages in agg pipeline, number of final documents?]

function parseQuery(query) {
  let tempQueryObject = Object.assign({}, query);
  let finalQueryObject = {};
  let postgresObj = {};
  let eq = [];
  postgresObj.stages = Object.keys(tempQueryObject).length;

  //Loops through the aggregate stages and accounts for stages appearing twice
  Object.keys(tempQueryObject).forEach((attr) => {
    let key = Object.keys(tempQueryObject[attr]);
    let value = tempQueryObject[attr][key];

    if (key in finalQueryObject) {
      if (finalQueryObject[key].length > 1) {
        finalQueryObject[key].push(value);
      } else {
        finalQueryObject[key] = [finalQueryObject[key]];
        finalQueryObject[key].push(value);
      }
    } else {
      finalQueryObject[key] = value;
    }
  });

  //Grabs the important elements from each stage of the aggregate pipeline
  Object.keys(finalQueryObject).forEach((attr) => {
    switch (attr) {
      case "$match":
        let extras = [];
        Object.keys(finalQueryObject.$match).forEach((attr2) => {
          switch (attr2) {
            case "End Date":
              postgresObj.end_date = finalQueryObject.$match[attr2];
              break;
            case "Start Date":
              postgresObj.start_date = finalQueryObject.$match[attr2];
              break;
            default:
              break;
          }
          postgresObj.extras = extras;
          if (typeof finalQueryObject.$match[attr2] === "object") {
            Object.keys(finalQueryObject.$match[attr2]).forEach((attr3) => {
              postgresObj[attr3] = finalQueryObject.$match[attr2][attr3];
              postgresObj["in/nin"] = postgresObj[attr3].length;
            });
          }
        });
        break;
      case "$group":
        postgresObj.group_id = finalQueryObject.$group._id;
        eq.push(finalQueryObject.$group._id);
        break;
      case "$lookup":
        postgresObj.foreign = finalQueryObject.$lookup.from;
        if (
          finalQueryObject.$lookup.pipeline[0].$match.$expr.$eq !== undefined
        ) {
          eq.push(finalQueryObject.$lookup.pipeline[0].$match.$expr.$eq[0]);
        } else {
          var eqArray = [];
          for (var item in finalQueryObject.$lookup.pipeline[0].$match.$expr
            .$and) {
            if (
              Object.keys(
                finalQueryObject.$lookup.pipeline[0].$match.$expr.$and[item]
              )[0] === "$eq"
            ) {
              let ref = Object.keys(
                finalQueryObject.$lookup.pipeline[0].$match.$expr.$and[item]
              )[0];
              for (attr in finalQueryObject.$lookup.pipeline[0].$match.$expr
                .$and[item].$eq) {
                eqArray.push(
                  finalQueryObject.$lookup.pipeline[0].$match.$expr.$and[item]
                    .$eq[attr]
                );
              }
            }
          }
          eq = eqArray;
        }
        break;
      case "$addFields":
        break;
      case "$project":
        let tempLength = Object.keys(finalQueryObject.$project).length;
        let projectValue = finalQueryObject.$project[Object.keys(finalQueryObject.$project)[
          tempLength - 1
        ]];
        if (projectValue.length === undefined) {
          postgresObj.aggrStat = Object.keys(finalQueryObject.$project)[
            tempLength - 1
          ];
        } else {
          postgresObj.aggrStat = projectValue;
        }
        break;
      default:
    }
  });
  postgresObj.$eq = eq;
  return postgresObj;
}


const parseResults = (results) => {
  var statIndex = Object.keys(results[0]).length - 1;
  var parsedResults = [Object.keys(results[0])[statIndex]];
  for (var item in results) {
    const itemRef = Object.keys(results[item])[statIndex];
    parsedResults.push(`${results[item]._id}: ${results[item][itemRef]}`);
  }
  return parsedResults;
};

export { parseQuery, parseResults };
