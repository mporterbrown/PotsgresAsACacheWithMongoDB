/*
  This file is used to store MongoDB aggregate queries
*/

const cached1 = ['cached1', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Florida', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in FL': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in FL': 1
      }
    }
  ]];
const uncached1 = ['uncached1', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'United States', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in US': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in US': 1
      }
    }
  ]];
const cached2 = ['cached2', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Georgia', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in GA': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in GA': 1
      }
    }
  ]];
const uncached2 = ['uncached2', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Alabama', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in AL': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in AL': 1
      }
    }
  ]];
const cached3 = ['cached3', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Louisiana', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in LA': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in LA': 1
      }
    }
  ]];
const uncached3 = ['uncached3', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Texas', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in TX': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in TX': 1
      }
    }
  ]];
const cached4 = ['cached4', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Connecticut', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in CT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in CT': 1
      }
    }
  ]];
const uncached4 = ['uncached4', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Virginia', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in VA': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in VA': 1
      }
    }
  ]];
const cached5 = ['cached5', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Vermont', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in VT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in VT': 1
      }
    }
  ]];
const uncached5 = ['uncached5', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Rhode Island', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in RI': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in RI': 1
      }
    }
  ]];
const cached6 = ['cached6', 'CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached6 = ['uncached6','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
        'Percent of COVID-19 deaths with Obesity by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached7 = ['cached7','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Influenza and pneumonia', 
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
        'Percent of COVID-19 deaths with Influenza/Pneumonia by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached7 = ['uncached7','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
        'Percent of COVID-19 deaths with Sepsis by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached8 = ['cached8','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Diabetes', 
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
        'Percent of COVID-19 deaths with Diabetes by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached8 = ['uncached8','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Adult respiratory distress syndrome', 
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
        'Percent of COVID-19 deaths with ARDS by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached9 = ['cached9','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Vascular and unspecified dementia', 
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
        'Percent of COVID-19 deaths with Dementia by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached9 = ['uncached9','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Renal failure', 
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
        'Percent of COVID-19 deaths with Renal Failure by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached10 = ['cached10','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Hypertensive diseases', 
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
        'Percent of COVID-19 deaths with Hypertensive Diseases by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached10 = ['uncached10','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Ischemic heart disease', 
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
        'Percent of COVID-19 deaths with Ischemic Heart Disease by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached16 = ['cached16','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Circulatory diseases', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with a Circulatory Disease by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached16 = ['uncached16','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Diabetes', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Diabetes by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached17 = ['cached17','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Vascular and unspecified dementia', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Dementia by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached17 = ['uncached17','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Malignant neoplasms', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Malignant Neoplasms by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached18 = ['cached18','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Renal failure', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached18 = ['uncached18','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Sepsis', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Sepsis by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached19 = ['cached19','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Alzheimer disease', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Alzheimer Disease by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached19 = ['uncached19','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Obesity', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Obesity by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const cached20 = ['cached20','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'All other conditions and causes (residual)', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with All Other Conditions by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncached20 = ['uncached20','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Respiratory diseases', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of deaths with a Respiratory Disease by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
//Subsets of uncached5
const cachedSubset11 = ['cachedSubset11', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Rhode Island', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in RI': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in RI': 1
      }
    }
  ]];
const uncachedSubset11 = ['uncachedSubset11', 'ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Rhode Island', 
        'Condition': {
          '$in': [
            'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in RI': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in RI': 1
      }
    }
  ]];
//Subsets of uncached1
const cachedSubset12 = ['cachedSubset12','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'United States', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in US': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in US': 1
      }
    }
  ]];
const uncachedSubset12 = ['uncachedSubset12','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'United States', 
        'Condition': {
          '$in': [
            'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in US': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in US': 1
      }
    }
  ]];
//Subsets of cached2
const cachedSubset13 = ['cachedSubset13','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Georgia', 
        'Condition': {
          '$in': [
            'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in GA': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in GA': 1
      }
    }
  ]];
const uncachedSubset13 = ['uncachedSubset13','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Georgia', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest', 'Cardiac arrhythmia'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in GA': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in GA': 1
      }
    }
  ]];
//Subsets of cached5
const cachedSubset14 = ['cachedSubset14','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Vermont', 
        'Condition': {
          '$in': [
            'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in VT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in VT': 1
      }
    }
  ]];
const uncachedSubset14 = ['uncachedSubset14','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Vermont', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in VT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in VT': 1
      }
    }
  ]];
//Subsets of cached4
const cachedSubset15 = ['cachedSubset15','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Connecticut', 
        'Condition': {
          '$in': [
            'Heart failure', 'Hypertensive diseases', 'Ischemic heart disease', 'Cardiac arrest'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in CT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in CT': 1
      }
    }
  ]];
const uncachedSubset15 = ['uncachedSubset15','ConditionsRelatedToCovidDeathsByStateAndAge',[
    {
      '$match': {
        'Start Date': '01/01/2020', 
        'End Date': '09/25/2021', 
        'Group': 'By Total', 
        'Age Group': {
          '$ne': 'All Ages'
        }, 
        'State': 'Connecticut', 
        'Condition': {
          '$in': [
            'Cardiac arrest', 'Cardiac arrhythmia', 'Cerebrovascular diseases', 'Other diseases of the circulatory system'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$Condition', 
        'Start Date': {
          '$first': '$Start Date'
        }, 
        'End Date': {
          '$first': '$End Date'
        }, 
        'State': {
          '$first': '$State'
        }, 
        'Deaths': {
          '$sum': '$COVID-19 Deaths'
        }
      }
    }, {
      '$lookup': {
        'from': 'CovidDeathsBySexAndAge', 
        'let': {
          'startLocal': '$Start Date', 
          'endLocal': '$End Date'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$and': [
                  {
                    '$eq': [
                      '$Start Date', '$$startLocal'
                    ]
                  }, {
                    '$eq': [
                      '$End Date', '$$endLocal'
                    ]
                  }
                ]
              }, 
              'State': 'United States', 
              'Group': 'By Total', 
              'Sex': 'All Sexes', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$unwind': '$ConditionDeaths'
    }, {
      '$addFields': {
        'Total Covid Deaths': '$ConditionDeaths.COVID-19 Deaths'
      }
    }, {
      '$addFields': {
        'Ratio': {
          '$divide': [
            '$Deaths', '$Total Covid Deaths'
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
      '$addFields': {
        'Percent Of Covid Deaths Related in CT': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }, {
      '$project': {
        '_id': 1, 
        'Start Date': 1, 
        'End Date': 1, 
        'State': 1, 
        'Deaths': 1, 
        'Percent Of Covid Deaths Related in CT': 1
      }
    }
  ]];
//Subsets of cached6
const cachedSubset21 = ['cachedSubset21','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            '0-24', '25-34', '35-44', '45-54'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncachedSubset21 = ['uncachedSubset21','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            '55-64', '65-74', '75-84', '85+'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
//Subset of cached8
const cachedSubset22 = ['cachedSubset22','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            '0-24', '25-34', '35-44', '45-54'
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
              'Condition': 'Diabetes', 
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
        'Percent of COVID-19 deaths with Diabetes by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncachedSubset22 = ['uncachedSubset22','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            '55-64', '65-74', '75-84', '85+'
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
              'Condition': 'Diabetes', 
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
        'Percent of COVID-19 deaths with Diabetes by Age': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
//Subsets of cached17
const cachedSubset23 = ['cachedSubset23','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Vascular and unspecified dementia', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Dementia by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
const uncachedSubset23 = ['uncachedSubset23','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': 'Vascular and unspecified dementia', 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
            }
          }
        ], 
        'as': 'ConditionDeaths'
      }
    }, {
      '$addFields': {
        'Condition Deaths': {
          '$sum': '$ConditionDeaths.COVID-19 Deaths'
        }
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
        'Percent of COVID-19 deaths with Dementia by State': {
          '$round': [
            '$Percent', 2
          ]
        }
      }
    }
  ]];
//Union of cached6 uncached6 uncached7
const cachedUnion24 = ['cachedUnion24','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with CLRD by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Sepsis by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Obesity by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by Age', ': ', {
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with CLRD by Age', '$Percent of COVID-19 deaths with Sepsis by Age', '$Percent of COVID-19 deaths with Obesity by Age'
        ]
      }
    }
  ]];
//Union of cached6 uncached9 cached9
const uncachedUnion24 = ['uncachedUnion24','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
                  'Renal failure', 'Vascular and unspecified dementia', 'Chronic lower respiratory diseases'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with CLRD by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Dementia by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Dementia by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by Age', ': ', {
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with CLRD by Age', '$Percent of COVID-19 deaths with Dementia by Age', '$Percent of COVID-19 deaths with Renal Failure by Age'
        ]
      }
    }
  ]];
//Union of uncached6 cached8
const cachedUnion25 = ['cachedUnion25','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
                  'Diabetes', 'Obesity'
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
        'Percent of COVID-19 deaths with Diabetes by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Diabetes by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Obesity by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with Diabetes by Age', '$Percent of COVID-19 deaths with Obesity by Age'
        ]
      }
    }
  ]];
//Union of uncached7 uncached9
const uncachedUnion25 = ['uncachedUnion25','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
                  'Sepsis', 'Renal failure'
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
        'Percent of COVID-19 deaths with Sepsis by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with Sepsis by Age', '$Percent of COVID-19 deaths with Renal Failure by Age'
        ]
      }
    }
  ]];
//Union of cached6 uncached7
const cachedUnion26 = ['cachedUnion26','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
                  'Sepsis', 'Chronic lower respiratory diseases'
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
        'Percent of COVID-19 deaths with CLRD by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with CLRD by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Sepsis by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Obesity by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity', ': ', {
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with CLRD by Age', '$Percent of COVID-19 deaths with Sepsis by Age'
        ]
      }
    }
  ]];
//Union of cached9 uncached9
const uncachedUnion26 = ['uncachedUnion26', 'CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'State': 'United States', 
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': {
          '$in': [
            'All Ages', '0-24', '25-34', '35-44', '45-54', '55-64', '65-74', '75-84', '85+'
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
                  'Renal failure', 'Vascular and unspecified dementia'
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
        'Percent of COVID-19 deaths with Dementia by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Dementia by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with CLRD'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by Age': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by Age', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Sepsis'
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
        'Percent of COVID-19 deaths array by Age': [
          '$Percent of COVID-19 deaths with Dementia by Age', '$Percent of COVID-19 deaths with Renal Failure by Age'
        ]
      }
    }
  ]];
//Union of uncached16 cached18
const cachedUnion27 = ['cachedUnion27','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Renal failure', 'Diabetes'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Diabetes by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Diabetes by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Condition3 by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Diabetes by State', '$Percent of COVID-19 deaths with Renal Failure by State'
        ]
      }
    }
  ]];
//Union of cached17 uncached17
const uncachedUnion27 = ['uncachedUnion27','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Malignant neoplasms', 'Vascular and unspecified dementia'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Malignant Neoplasms by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Malignant Neoplasms by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Dementia by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Dementia by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Condition3 by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Malignant Neoplasms by State', '$Percent of COVID-19 deaths with Dementia by State'
        ]
      }
    }
  ]];
//Union of uncached18 cached20
const cachedUnion28 = ['cachedUnion28','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'All other conditions and causes (residual)', 'Sepsis'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Sepsis by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with All Other Conditions by State': {
          '$concat': [
            'Percent of COVID-19 deaths with All Other Conditions by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Condition3 by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Sepsis by State', '$Percent of COVID-19 deaths with All Other Conditions by State'
        ]
      }
    }
  ]];
//Union of cached17 cached19
const uncachedUnion28 = ['uncachedUnion28','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Alzheimer disease', 'Vascular and unspecified dementia'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Alzheimer Disease by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Alzheimer Disease by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Dementia by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Dementia by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Condition3 by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Alzheimer Disease by State', '$Percent of COVID-19 deaths with Dementia by State'
        ]
      }
    }
  ]];
//Union of uncached16 uncached18 cached18
const cachedUnion29 = ['cachedUnion29','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Diabetes', 'Sepsis', 'Renal failure'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Sepsis by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Diabetes by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Diabetes by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Sepsis by State', '$Percent of COVID-19 deaths with Diabetes by State', '$Percent of COVID-19 deaths with Renal Failure by State'
        ]
      }
    }
  ]];
//Union of uncached16 uncached19 cached18
const uncachedUnion29 = ['uncachedUnion29','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Diabetes', 'Obesity', 'Renal failure'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Diabetes by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Diabetes by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Obesity by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Obesity by State', '$Percent of COVID-19 deaths with Diabetes by State', '$Percent of COVID-19 deaths with Renal Failure by State'
        ]
      }
    }
  ]];
//Union of uncached16 uncached18 cached18 uncached19
const cachedUnion30 = ['cachedUnion30','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Diabetes', 'Sepsis', 'Renal failure', 'Obesity'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }, 
        'Condition4Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 3
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }, 
        'Condition4Ratio': {
          '$divide': [
            '$Condition4Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition4': {
          '$multiply': [
            '$Condition4Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Sepsis by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Sepsis by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Diabetes by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Diabetes by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Obesity by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Obesity by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition4'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Sepsis by State', '$Percent of COVID-19 deaths with Diabetes by State', '$Percent of COVID-19 deaths with Obesity by State', '$Percent of COVID-19 deaths with Renal Failure by State'
        ]
      }
    }
  ]];
//Union of uncached17 cached17 cached18 cached19
const uncachedUnion30 = ['uncachedUnion30','CovidDeathsByStateAgeAndRace',[
    {
      '$match': {
        'End Date': '09/25/2021', 
        'Start Date': '01/01/2020', 
        'AgeGroup': 'All Ages', 
        'State': {
          '$in': [
            'New York', 'Massachusetts', 'Maine', 'Vermont', 'Connecticut', 'New Hampshire', 'Rhode Island', 'New Jersey', 'Pennsylvania'
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$State', 
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
          'stateLocal': '$_id'
        }, 
        'pipeline': [
          {
            '$match': {
              '$expr': {
                '$eq': [
                  '$State', '$$stateLocal'
                ]
              }, 
              'Group': 'By Total', 
              'Condition Group': {
                '$in': [
                  'Alzheimer disease', 'Vascular and unspecified dementia', 'Malignant neoplasms', 'Renal failure'
                ]
              }, 
              'Start Date': '01/01/2020', 
              'End Date': '09/25/2021', 
              'Age Group': 'All Ages'
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
        'Condition1Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 0
          ]
        }, 
        'Condition2Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 1
          ]
        }, 
        'Condition3Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 2
          ]
        }, 
        'Condition4Deaths': {
          '$arrayElemAt': [
            '$Condition Deaths', 3
          ]
        }
      }
    }, {
      '$addFields': {
        'Condition1Ratio': {
          '$divide': [
            '$Condition1Deaths', '$deaths'
          ]
        }, 
        'Condition2Ratio': {
          '$divide': [
            '$Condition2Deaths', '$deaths'
          ]
        }, 
        'Condition3Ratio': {
          '$divide': [
            '$Condition3Deaths', '$deaths'
          ]
        }, 
        'Condition4Ratio': {
          '$divide': [
            '$Condition4Deaths', '$deaths'
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of Covid-19 deaths with Condition1': {
          '$multiply': [
            '$Condition1Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition2': {
          '$multiply': [
            '$Condition2Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition3': {
          '$multiply': [
            '$Condition3Ratio', 100
          ]
        }, 
        'Percent of Covid-19 deaths with Condition4': {
          '$multiply': [
            '$Condition4Ratio', 100
          ]
        }
      }
    }, {
      '$addFields': {
        'Percent of COVID-19 deaths with Malignant Neoplasms by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Malignant Neoplasms by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition1'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Alzheimer Disease by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Alzheimer Disease by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition2'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Dementia by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Dementia by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition3'
            }
          ]
        }, 
        'Percent of COVID-19 deaths with Renal Failure by State': {
          '$concat': [
            'Percent of COVID-19 deaths with Renal Failure by State', ': ', {
              '$toString': '$Percent of Covid-19 deaths with Condition4'
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
        'Percent of COVID-19 deaths array by State': [
          '$Percent of COVID-19 deaths with Malignant Neoplasms by State', '$Percent of COVID-19 deaths with Alzheimer Disease by State', '$Percent of COVID-19 deaths with Dementia by State', '$Percent of COVID-19 deaths with Renal Failure by State'
        ]
      }
    }
  ]];


//ARRAYS
const cachedQueries = [cached1, cached2, cached3, cached4, cached5, cached6, cached7, cached8, cached9, cached10, cachedSubset11, cachedSubset12, cachedSubset13, cachedSubset14, cachedSubset15, cached16, cached17, cached18, cached19, cached20, cachedSubset21, cachedSubset22, cachedSubset23, cachedUnion24, cachedUnion25, cachedUnion26, cachedUnion27, cachedUnion28, cachedUnion29, cachedUnion30];
const uncachedQueries = [uncached1, uncached2, uncached3, uncached4, uncached5, uncached6, uncached7, uncached8, uncached9, uncached10, uncachedSubset11, uncachedSubset12, uncachedSubset13, uncachedSubset14, uncachedSubset15, uncached16, uncached17, uncached18, uncached19, uncached20, uncachedSubset21, uncachedSubset22, uncachedSubset23, uncachedUnion24, uncachedUnion25, uncachedUnion26, uncachedUnion27, uncachedUnion28, uncachedUnion29, uncachedUnion30];

const subsetQueries = [cachedSubset11, cachedSubset12, cachedSubset13, cachedSubset14, cachedSubset15, cachedSubset21, cachedSubset22, cachedSubset23, uncachedSubset21, uncachedSubset22, uncachedSubset23, uncachedSubset11, uncachedSubset12, uncachedSubset13, uncachedSubset14, uncachedSubset15];
const unionQueries = [cachedUnion24, cachedUnion25, cachedUnion26, cachedUnion27, cachedUnion28, cachedUnion29, cachedUnion30, uncachedUnion24, uncachedUnion25, uncachedUnion26, uncachedUnion27, uncachedUnion28, uncachedUnion29, uncachedUnion30];

const baseQueries = [cached1, cached2, cached3, cached4, cached5, cached6, cached7, cached8, cached9, cached10, cached16, cached17, cached18, cached19, cached20, uncached1, uncached2, uncached3, uncached4, uncached5, uncached6, uncached7, uncached8, uncached9, uncached10, uncached16, uncached17, uncached18, uncached19, uncached20];

// console.log(cachedQueries.length);
// console.log(uncachedQueries.length);
// console.log(subsetQueries.length);
// console.log(unionQueries.length);
// console.log(baseQueries.length);

export {cachedQueries, uncachedQueries, subsetQueries, unionQueries, baseQueries};