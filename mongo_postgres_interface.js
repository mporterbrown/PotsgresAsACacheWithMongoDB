//Import Statements
import promptSync from 'prompt-sync';
import * as fs from 'fs';
import { mongoCollectData } from "./mongoFunctions.js";
import {
  insertMongoData,
  checkPostgres,
  pullFromPostgres,
  clearTables
} from "./postgresFunctions.js";
import { subsetTest, returnSubsetData } from "./subsetTest.js";
import { unionTest, returnUnionData } from './unionTest.js';
import {checkSemanticInfo, parseSemanticInfo, pullDataFromSemanticInfo} from './semanticFunctions.js';

// Postgres
import ppkg from "pg";
const { Pool, Client } = ppkg;
const pool = new Pool();
const postgresClientMain = new Client({
  user: "mason",
  host: "localhost",
  database: "SPROJ",
  password: "password",
  port: 5432,
});
//MongoDB
import mpkg from "mongodb";
const { MongoClient } = mpkg;
const uri =
  "mongodb+srv://masonqpb:sprojdraftpassword@sandbox.tra3i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const mongoClientMain = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbMongo = "SprojCovidDatabase";


//Query Samples
const query1 = [
  {
    $match: {
      "End Date": "09/25/2021",
      "Start Date": "01/01/2020",
      AgeGroup: "All Ages",
      State: {
        $in: [
          "New York",
          "Massachusetts",
          "Maine",
          "Vermont",
          "Connecticut",
          "New Hampshire",
          "Rhode Island",
          "New Jersey",
          "Pennsylvania",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$State",
      "Start Date": {
        $first: "$Start Date",
      },
      "End Date": {
        $first: "$End Date",
      },
      deaths: {
        $sum: "$Count of COVID-19 deaths",
      },
    },
  },
  {
    $lookup: {
      from: "ConditionsRelatedToCovidDeathsByStateAndAge",
      let: {
        stateLocal: "$_id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$State", "$$stateLocal"],
            },
            Group: "By Total",
            "Condition Group": "Circulatory diseases",
            "Start Date": "01/01/2020",
            "End Date": "09/25/2021",
            "Age Group": "All Ages",
          },
        },
      ],
      as: "ConditionDeaths",
    },
  },
  {
    $addFields: {
      "Condition Deaths": {
        $sum: "$ConditionDeaths.COVID-19 Deaths",
      },
    },
  },
  {
    $addFields: {
      Ratio: {
        $divide: ["$Condition Deaths", "$deaths"],
      },
    },
  },
  {
    $addFields: {
      Percent: {
        $multiply: ["$Ratio", 100],
      },
    },
  },
  {
    $project: {
      _id: 1,
      state: 1,
      "Start Date": 1,
      "End Date": 1,
      "Percent of deaths with a CC": {
        $round: ["$Percent", 2],
      },
    },
  },
];
const query2 = [
  {
    '$match': {
      'State': 'United States', 
      'End Date': '09/25/2021', 
      'Start Date': '01/01/2020', 
      'AgeGroup': {
        '$nin': [
          'All ages, unadjusted', 'All ages, standardized'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$AgeGroup', 
      'state': {
        '$first': '$State'
      }, 
      'Start Date': {
        '$first': '$Start Date'
      }, 
      'End Date': {
        '$first': '$End Date'
      }, 
      'deaths': {
        '$sum': '$Count of COVID-19 deaths'
      }
    }
  }, {
    '$lookup': {
      'from': 'ConditionsRelatedToCovidDeathsByStateAndAge', 
      'let': {
        'ageLocal': '$_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$Age Group', '$$ageLocal'
              ]
            }, 
            'State': 'United States', 
            'Group': 'By Total', 
            'Condition': 'Chronic lower respiratory diseases', 
            'Start Date': '01/01/2020', 
            'End Date': '09/25/2021'
          }
        }
      ], 
      'as': 'ConditionDeaths'
    }
  }, {
    '$unwind': '$ConditionDeaths'
  }, {
    '$addFields': {
      'Condition Deaths': '$ConditionDeaths.COVID-19 Deaths'
    }
  }, {
    '$addFields': {
      'Ratio': {
        '$divide': [
          '$Condition Deaths', '$deaths'
        ]
      }
    }
  }, {
    '$addFields': {
      'Percent': {
        '$multiply': [
          '$Ratio', 100
        ]
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'state': 1, 
      'Start Date': 1, 
      'End Date': 1, 
      'Percent of Covid-19 deaths with CLRD': {
        '$round': [
          '$Percent', 2
        ]
      }
    }
  }
];
const query3 = [
  {
    $match: {
      "Start Date": "01/01/2020",
      "End Date": "09/25/2021",
      Group: "By Total",
      "Age Group": {
        $ne: "All Ages",
      },
      State: "United States",
      Condition: {
        $in: [
          "Heart failure",
          "Hypertensive diseases",
          "Ischemic heart disease",
          "Cardiac arrest",
          "Cardiac arrhythmia",
          "Cerebrovascular diseases",
          "Other diseases of the circulatory system",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$Condition",
      "Start Date": {
        $first: "$Start Date",
      },
      "End Date": {
        $first: "$End Date",
      },
      State: {
        $first: "$State",
      },
      Deaths: {
        $sum: "$COVID-19 Deaths",
      },
    },
  },
  {
    $lookup: {
      from: "CovidDeathsBySexAndAge",
      let: {
        startLocal: "$Start Date",
        endLocal: "$End Date",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: ["$Start Date", "$$startLocal"],
                },
                {
                  $eq: ["$End Date", "$$endLocal"],
                },
              ],
            },
            State: "United States",
            Group: "By Total",
            Sex: "All Sexes",
            "Age Group": "All Ages",
          },
        },
      ],
      as: "ConditionDeaths",
    },
  },
  {
    $unwind: "$ConditionDeaths",
  },
  {
    $addFields: {
      "Total Covid Deaths": "$ConditionDeaths.COVID-19 Deaths",
    },
  },
  {
    $addFields: {
      Ratio: {
        $divide: ["$Deaths", "$Total Covid Deaths"],
      },
    },
  },
  {
    $addFields: {
      Percent: {
        $multiply: ["$Ratio", 100],
      },
    },
  },
  {
    $addFields: {
      "Percent Of Covid Deaths Related": {
        $round: ["$Percent", 2],
      },
    },
  },
  {
    $project: {
      _id: 1,
      "Start Date": 1,
      "End Date": 1,
      State: 1,
      Deaths: 1,
      "Percent Of Covid Deaths Related": 1,
    },
  },
];
const query4 = [
  {
    '$match': {
      'State': 'United States', 
      'End Date': '09/25/2021', 
      'Start Date': '01/01/2020', 
      'AgeGroup': {
        '$nin': [
          'All ages, unadjusted', 'All ages, standardized'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$AgeGroup', 
      'state': {
        '$first': '$State'
      }, 
      'Start Date': {
        '$first': '$Start Date'
      }, 
      'End Date': {
        '$first': '$End Date'
      }, 
      'deaths': {
        '$sum': '$Count of COVID-19 deaths'
      }
    }
  }, {
    '$lookup': {
      'from': 'ConditionsRelatedToCovidDeathsByStateAndAge', 
      'let': {
        'ageForeign': '$_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$Age Group', '$$ageForeign'
              ]
            }, 
            'State': 'United States', 
            'Group': 'By Total', 
            'Condition': 'Obesity', 
            'Start Date': '01/01/2020', 
            'End Date': '09/25/2021'
          }
        }
      ], 
      'as': 'ConditionDeaths'
    }
  }, {
    '$unwind': '$ConditionDeaths'
  }, {
    '$addFields': {
      'Condition Deaths': '$ConditionDeaths.COVID-19 Deaths'
    }
  }, {
    '$addFields': {
      'Ratio': {
        '$divide': [
          '$Condition Deaths', '$deaths'
        ]
      }
    }
  }, {
    '$addFields': {
      'Percent': {
        '$multiply': [
          '$Ratio', 100
        ]
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'state': 1, 
      'Start Date': 1, 
      'End Date': 1, 
      'Percent of Covid-19 deaths with Obesity': {
        '$round': [
          '$Percent', 2
        ]
      }
    }
  }
];
const query5 = [
  {
    '$match': {
      'State': 'United States', 
      'End Date': '09/25/2021', 
      'Start Date': '01/01/2020', 
      'AgeGroup': {
        '$nin': [
          'All ages, unadjusted', 'All ages, standardized'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$AgeGroup', 
      'state': {
        '$first': '$State'
      }, 
      'Start Date': {
        '$first': '$Start Date'
      }, 
      'End Date': {
        '$first': '$End Date'
      }, 
      'deaths': {
        '$sum': '$Count of COVID-19 deaths'
      }
    }
  }, {
    '$lookup': {
      'from': 'ConditionsRelatedToCovidDeathsByStateAndAge', 
      'let': {
        'ageForeign': '$_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$Age Group', '$$ageForeign'
              ]
            }, 
            'State': 'United States', 
            'Group': 'By Total', 
            'Condition': 'Sepsis', 
            'Start Date': '01/01/2020', 
            'End Date': '09/25/2021'
          }
        }
      ], 
      'as': 'ConditionDeaths'
    }
  }, {
    '$unwind': '$ConditionDeaths'
  }, {
    '$addFields': {
      'Condition Deaths': '$ConditionDeaths.COVID-19 Deaths'
    }
  }, {
    '$addFields': {
      'Ratio': {
        '$divide': [
          '$Condition Deaths', '$deaths'
        ]
      }
    }
  }, {
    '$addFields': {
      'Percent': {
        '$multiply': [
          '$Ratio', 100
        ]
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'state': 1, 
      'Start Date': 1, 
      'End Date': 1, 
      'Percent of Covid-19 deaths with Sepsis': {
        '$round': [
          '$Percent', 2
        ]
      }
    }
  }
];
const unionQuery = [
  {
    '$match': {
      'State': 'United States', 
      'End Date': '09/25/2021', 
      'Start Date': '01/01/2020', 
      'AgeGroup': {
        '$nin': [
          'All ages, unadjusted', 'All ages, standardized'
        ]
      }
    }
  }, {
    '$group': {
      '_id': '$AgeGroup', 
      'state': {
        '$first': '$State'
      }, 
      'Start Date': {
        '$first': '$Start Date'
      }, 
      'End Date': {
        '$first': '$End Date'
      }, 
      'deaths': {
        '$sum': '$Count of COVID-19 deaths'
      }
    }
  }, {
    '$lookup': {
      'from': 'ConditionsRelatedToCovidDeathsByStateAndAge', 
      'let': {
        'ageForeign': '$_id'
      }, 
      'pipeline': [
        {
          '$match': {
            '$expr': {
              '$eq': [
                '$Age Group', '$$ageForeign'
              ]
            }, 
            'State': 'United States', 
            'Group': 'By Total', 
            'Condition': {
              '$in': [
                'Sepsis', 'Obesity', 'Chronic lower respiratory diseases'
              ]
            }, 
            'Start Date': '01/01/2020', 
            'End Date': '09/25/2021'
          }
        }
      ], 
      'as': 'ConditionDeaths'
    }
  }, {
    '$addFields': {
      'Condition Deaths': '$ConditionDeaths.COVID-19 Deaths'
    }
  }, {
    '$addFields': {
      'CLRDDeaths': {
        '$arrayElemAt': [
          '$Condition Deaths', 0
        ]
      }, 
      'SepsisDeaths': {
        '$arrayElemAt': [
          '$Condition Deaths', 1
        ]
      }, 
      'ObesityDeaths': {
        '$arrayElemAt': [
          '$Condition Deaths', 2
        ]
      }
    }
  }, {
    '$addFields': {
      'CLRDRatio': {
        '$divide': [
          '$CLRDDeaths', '$deaths'
        ]
      }, 
      'SepsisRatio': {
        '$divide': [
          '$SepsisDeaths', '$deaths'
        ]
      }, 
      'ObesityRatio': {
        '$divide': [
          '$ObesityDeaths', '$deaths'
        ]
      }
    }
  }, {
    '$addFields': {
      'Percent of Covid-19 deaths with CLRD': {
        '$multiply': [
          '$CLRDRatio', 100
        ]
      }, 
      'Percent of Covid-19 deaths with Sepsis': {
        '$multiply': [
          '$SepsisRatio', 100
        ]
      }, 
      'Percent of Covid-19 deaths with Obesity': {
        '$multiply': [
          '$ObesityRatio', 100
        ]
      }
    }
  }, {
    '$addFields': {
      'Percent of Covid-19 deaths with CLRD': {
        '$concat': [
          'Percent of Covid-19 deaths with CLRD', ': ', {
            '$toString': '$Percent of Covid-19 deaths with CLRD'
          }
        ]
      }, 
      'Percent of Covid-19 deaths with Sepsis': {
        '$concat': [
          'Percent of Covid-19 deaths with Sepsis', ': ', {
            '$toString': '$Percent of Covid-19 deaths with Sepsis'
          }
        ]
      }, 
      'Percent of Covid-19 deaths with Obesity': {
        '$concat': [
          'Percent of Covid-19 deaths with Obesity', ': ', {
            '$toString': '$Percent of Covid-19 deaths with Obesity'
          }
        ]
      }
    }
  }, {
    '$project': {
      '_id': 1, 
      'state': 1, 
      'Start Date': 1, 
      'End Date': 1, 
      'Percent of Covid-19 deaths array': [
        '$Percent of Covid-19 deaths with CLRD', '$Percent of Covid-19 deaths with Sepsis', '$Percent of Covid-19 deaths with Obesity'
      ]
    }
  }
];
const subsetQuery = [
  {
    $match: {
      "End Date": "09/25/2021",
      "Start Date": "01/01/2020",
      AgeGroup: "All Ages",
      State: {
        $in: [
          "Massachusetts",
          "Maine",
          "Vermont",
          "Connecticut",
          "New Hampshire",
        ],
      },
    },
  },
  {
    $group: {
      _id: "$State",
      "Start Date": {
        $first: "$Start Date",
      },
      "End Date": {
        $first: "$End Date",
      },
      deaths: {
        $sum: "$Count of COVID-19 deaths",
      },
    },
  },
  {
    $lookup: {
      from: "ConditionsRelatedToCovidDeathsByStateAndAge",
      let: {
        stateLocal: "$_id",
      },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$State", "$$stateLocal"],
            },
            Group: "By Total",
            "Condition Group": "Circulatory diseases",
            "Start Date": "01/01/2020",
            "End Date": "09/25/2021",
            "Age Group": "All Ages",
          },
        },
      ],
      as: "ConditionDeaths",
    },
  },
  {
    $addFields: {
      "Condition Deaths": {
        $sum: "$ConditionDeaths.COVID-19 Deaths",
      },
    },
  },
  {
    $addFields: {
      Ratio: {
        $divide: ["$Condition Deaths", "$deaths"],
      },
    },
  },
  {
    $addFields: {
      Percent: {
        $multiply: ["$Ratio", 100],
      },
    },
  },
  {
    $project: {
      _id: 1,
      state: 1,
      "Start Date": 1,
      "End Date": 1,
      "Percent of deaths with a CC": {
        $round: ["$Percent", 2],
      },
    },
  },
];

// const aggrQueryArray = [['query1', query1], ['query2', query2], ['query3', query3], ['query4', query4], ['query5', query5], ['subsetQuery', subsetQuery], ['unionQuery', unionQuery]];
const collection1 = 'CovidDeathsByStateAgeAndRace';
const collection2 = 'ConditionsRelatedToCovidDeathsByStateAndAge';

//Main interface for querying with varying options
async function main() {
  try {
    await postgresClientMain.connect();
    await mongoClientMain.connect();
    const prompt =  promptSync();
    console.log('What would you like to do?');
    console.log('Select Key and Hit Enter\n1: Run a Query\n2: Enter Semantic Query Info\n3: Perform Benchmark Test\n4: Delete Data From Postgres Tables');
    const userChoice = prompt('>>> ');
    
    switch (userChoice) {
      case '1': await queryInterface(); break;
      case '2': semanticInput(); break;
      case '3': 
        console.log('Enter number of sample queries:');
        const sampleSize = prompt('>>> ');
        console.log('Do you want to Cache results? Type y/n');
        const withCaching = prompt('>>> ');
        console.log('Do you want to check for Unions and Subsets? Type y/n');
        const withUnionSubsetHelp = prompt('>>> ');
        console.log('do you want to check Semantic Info?');
        const withSemanticHelp = prompt('>>> ');

        //Booleans to control whether or not data is cached to Potgres,
        //and whether or not queries are checked for union and subsets of other queries
        let cachingBool = (withCaching === 'y') ? true : false;
        let unionSubsetBool = (withUnionSubsetHelp === 'y') ? true : false;
        let semanticBool = (withSemanticHelp === 'y') ? true : false;

        await benchmarkTesting(sampleSize, cachingBool, unionSubsetBool, semanticBool); break;
      case '4': await clearTables(postgresClientMain); console.log('Postgres Data Deleted From Tables'); break;
      default: console.log('***** Enter a valid option *****');
               main();
    }
  } catch(e) {
    console.log(e);
  } finally {
    postgresClientMain.end();
    mongoClientMain.close();
  }
}

// *************************************************  Query  *****************************************************************
//Main querying method
//Satisfies queries based on various stages of the query pipeline
async function query(collection, queryLabel, aggregateQuery, cacheResults, unionAndSubsetHelp, semanticHelp, postgresClient, mongoClient, aggrQueryArray) {  
  try {
    const semanticTestData = checkSemanticInfo(queryLabel);
    let subsetTestData;
    let unionTestData;
    if (!semanticHelp) {
      subsetTestData = await subsetTest(aggregateQuery, postgresClient, collection);
      unionTestData = await unionTest(aggregateQuery, postgresClient, collection);
    } else {
      subsetTestData = [false];
      unionTestData = [false];
    }
    
    //Check if query exists in Postgres obj table
    if (
      await checkPostgres(JSON.stringify(aggregateQuery), postgresClient)
    ) {
      //If it is cached, retrieve the data
      console.log(
        "**************************  RESULTS FROM POSTGRES ******************************"
      );
      await pullFromPostgres(
        JSON.stringify(aggregateQuery),
        postgresClient
      );
      //Check if the query is a subset of current cached data
    } else if (semanticTestData[0] && semanticHelp){
      console.log('****** Data pulled from Semantic Query *******');
      const parsedSemanticInfo = parseSemanticInfo(semanticTestData, aggrQueryArray);
      const semanticData = await pullDataFromSemanticInfo(parsedSemanticInfo, postgresClient);
    } else if (unionAndSubsetHelp && subsetTestData[0]) {

      console.log("****************** Data existed as subset of already cached data *****************");
      let subsetData = await returnSubsetData(subsetTestData[1], subsetTestData[2], postgresClient);
      console.log(subsetData);
      console.log("******************* End Subset Data Return ***************************************");

      //Check if query can be found from Union of currently cached data
    } else if (unionAndSubsetHelp && unionTestData[0]) {
      console.log( '****************** Data retrieved from union of already cached data *****************');
      let unionData = await returnUnionData(unionTestData[1], postgresClient);
      console.log(unionData);
      console.log('******************* End Union Data Return ******************************');
      //If query has no matches, cache the data into Postgres
    } else {
      console.log("****************** QUERY UNRECOGNIZED ******************");
      try {
        const mongoDataObject = await mongoCollectData(
          dbMongo,
          collection,
          aggregateQuery,
          mongoClient
        );
        if (cacheResults) {
          await insertMongoData(mongoDataObject, postgresClient);
          console.log(
            "****************** DATA CACHED IN POSTGRES ******************"
          );
        }
      } catch (e) {
        console.log('could not cache');
      }
      
    }
  } catch (e) {
    console.log(e);
  } 
}

//General query interface
async function queryInterface() {
  const prompt =  promptSync();
  console.log('||------------------------ SELECT QUERY USING CORRESPONDING KEY ------------------||');
  console.log('||--------------------------------------------------------------------------------||');
  console.log('|| Key:   |   0    |   1    |   2    |   3    |    4   |      5      |     6      ||');
  console.log('||--------------------------------------------------------------------------------||');
  console.log('|| Query: | query1 | query2 | query3 | query4 | query5 | subsetQuery | unionQuery ||'); 
  const choice = prompt('>>> ');

  switch (choice) {
    case '0': await query(collection1, aggrQueryArray[0][0], aggrQueryArray[0][1], true, true, false, postgresClientMain, mongoClientMain); break;
    case '1': await query(collection1, aggrQueryArray[1][0], aggrQueryArray[1][1], true, true, false); break;
    case '2': await query(collection2, aggrQueryArray[2][0], aggrQueryArray[2][1], true, true, false); break;
    case '3': await query(collection1, aggrQueryArray[3][0], aggrQueryArray[3][1], true, true, false); break;
    case '4': await query(collection1, aggrQueryArray[4][0], aggrQueryArray[4][1], true, true, false); break;
    case '5': await query(collection1, aggrQueryArray[5][0], aggrQueryArray[5][1], true, true, false); break;
    case '6': await query(collection1, aggrQueryArray[6][0], aggrQueryArray[6][1], true, true, false); break;
    default: console.log('Please select a valid option');
  }
}

//Allows users to enter semantic information that can later be used to satisfy queries
async function semanticInput() {
  const prompt = promptSync();
  console.log('Enter semantic relation with following format:');
  console.log('query1 is UNION of query1,query,query3...');
  console.log('---------OR---------');
  console.log('query1 is SUBSET of query2\n');
  var data = prompt('>>> ');
  let dataArray = data.split(' ');
  if (dataArray.length !== 5) {
    console.log('********* Please input info with the proper format ***********\n');
    semanticInput();
  } else {
  console.log(dataArray.length);
  console.log(dataArray[0]);

      fs.writeFile('semanticRelations.txt', (data + '\n'), {flag: 'a+'}, (err) => {
        if(err) {
            throw err;
        }
        console.log("Data has been written to file successfully.");
    });
  }
}

//Temporary benchmark test to test various query paths
async function benchmarkTesting(sampleSize, withCaching, withSubsetUnionHelp, withSemanticHelp) {
  console.time('testing');
  for (var i = 0; i < sampleSize; i++ ) {
    var choice = Math.floor(Math.random() * (6 - 0 + 1) + 0);
    switch (choice.toString()) {
      case '0': await query(collection1, aggrQueryArray[0][0],aggrQueryArray[0][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '1': await query(collection1, aggrQueryArray[1][0],aggrQueryArray[1][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '2': await query(collection2, aggrQueryArray[2][0],aggrQueryArray[2][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '3': await query(collection1, aggrQueryArray[3][0],aggrQueryArray[3][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '4': await query(collection1, aggrQueryArray[4][0],aggrQueryArray[4][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '5': await query(collection1, aggrQueryArray[5][0],aggrQueryArray[5][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
      case '6': await query(collection1, aggrQueryArray[6][0],aggrQueryArray[6][1], withCaching, withSubsetUnionHelp, withSemanticHelp); break;
    }
  }
  console.log('caching? :');
  console.log(withCaching);
  console.log('Union and Subset help?');
  console.log(withSubsetUnionHelp);
  console.timeEnd('testing');
}

export {query};