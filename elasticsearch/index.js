const esClient = require("./library/esclient");
const {generateUsers} = require("./dataGenerator");
const action = require("./library/action");
const {uuid} = require("uuidv4");

let index = "users";

let index_mappings = {
  "properties": {
    "uuid": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "timestampLastModifiedInMilliseconds": {
      "type": "float"
    },
    "role": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "gender": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "primaryLanguage": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "grades": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "familyName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "givenName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "middleName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "sms": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "phone": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "email": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "identifier": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    }
  }
};

let index_mappings2 = {
  "properties": {
    "organization": {
      "type": "nested",
      "properties": {
        "uuid": {
          "type": "keyword",
          "fields": {
            "keyword": {
              "ignore_above": 36,
              "type": "keyword"
            }
          }
        },
        "name": {
          "type": "text",
          "fields": {
            "keyword": {
              "ignore_above": 100,
              "type": "keyword"
            }
          }
        }
      }
    },
    "schools": {
      "type": "nested",
      "properties": {
        "uuid": {
          "type": "keyword",
          "ignore_above": 100,
          "fields": {
            "text": {
              "type": "text"
            }
          }
        },
        "name": {
          "type": "keyword",
          "ignore_above": 100,
          "fields": {
            "text": {
              "type": "text"
            }
          }
        },
        "classes": {
          "type": "nested",
          "properties": {
            "uuid": {
              "type": "keyword",
              "ignore_above": 100,
              "fields": {
                "text": {
                  "type": "text"
                }
              }
            },
            "name": {
              "type": "keyword",
              "ignore_above": 100,
              "fields": {
                "text": {
                  "type": "text"
                }
              }
            },
            "grades": {
              "type": "keyword",
              "ignore_above": 30,
              "fields": {
                "keyword": {
                  "type": "text"
                }
              }
            },
            "course": {
              "type": "nested",
              "properties": {
                "uuid": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "code": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "name": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "subjects": {
                  "type": "nested",
                  "properties": {
                    "code": {
                      "type": "keyword",
                      "ignore_above": 100,
                      "fields": {
                        "text": {
                          "type": "text"
                        }
                      }
                    },
                    "name": {
                      "type": "keyword",
                      "ignore_above": 100,
                      "fields": {
                        "text": {
                          "type": "text"
                        }
                      }
                    }
                  }
                },
                "academicSession": {
                  "type": "nested",
                  "properties": {
                    "startDate": {
                      "type": "date"
                    },
                    "endDate": {
                      "type": "date"
                    },
                    "name": {
                      "type": "keyword",
                      "ignore_above": 100,
                      "fields": {
                        "text": {
                          "type": "text"
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "uuid": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "timestampLastModifiedInMilliseconds": {
      "type": "float"
    },
    "role": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "status": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "gender": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "primaryLanguage": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "grades": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "familyName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "givenName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "middleName": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "sms": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "phone": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "email": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "identifier": {
      "type": "keyword",
      "ignore_above": 100,
      "fields": {
        "text": {
          "type": "text"
        }
      }
    },
    "dashboards": {
      "type": "nested",
      "properties": {
        "ERP": {
          "type": "nested",
          "properties": {
            "currentWeekDaysActive": {
              "type": "long"
            },
            "levelObjectivesMasteredCount": {
              "type": "long"
            },
            "levelObjectivesAttemptedCount": {
              "type": "long"
            },
            "currentWeekSessionMinutes": {
              "type": "long"
            },
            "objectiveList": {
              "type": "nested",
              "properties": {
                "score": {
                  "type": "long"
                },
                "scoreKey": {
                  "type": "long"
                },
                "currentDay": {
                  "type": "boolean"
                },
                "currentWeek": {
                  "type": "boolean"
                },
                "objName": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "mastered": {
                  "type": "boolean"
                },
                "scoreDate": {
                  "type": "date"
                },
                "mastery": {
                  "type": "long"
                }
              }
            },
            "currentDayGoalMinutes": {
              "type": "long"
            },
            "lastChangeDateTime": {
              "type": "date"
            },
            "currentWeekObjectivesCompleted": {
              "type": "long"
            },
            "levelProgress": {
              "type": "long"
            },
            "currentDayObjectivesCompleted": {
              "type": "long"
            },
            "currentWeekGoalMinutes": {
              "type": "long"
            },
            "currentWeekDaysGoal": {
              "type": "long"
            },
            "levelObjectivesMasteredPercent": {
              "type": "long"
            },
            "currentDaySessionMinutes": {
              "type": "long"
            },
            "goalStatus": {
              "type": "keyword",
              "ignore_above": 100,
              "fields": {
                "text": {
                  "type": "text"
                }
              }
            }
          }
        },
        "EMS": {
          "type": "nested",
          "properties": {
            "currentWeekDaysActive": {
              "type": "long"
            },
            "levelObjectivesMasteredCount": {
              "type": "long"
            },
            "levelObjectivesAttemptedCount": {
              "type": "long"
            },
            "currentWeekSessionMinutes": {
              "type": "long"
            },
            "objectiveList": {
              "type": "nested",
              "properties": {
                "score": {
                  "type": "long"
                },
                "scoreKey": {
                  "type": "long"
                },
                "currentDay": {
                  "type": "boolean"
                },
                "currentWeek": {
                  "type": "boolean"
                },
                "objName": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "mastered": {
                  "type": "boolean"
                },
                "scoreDate": {
                  "type": "date"
                },
                "mastery": {
                  "type": "long"
                }
              }
            },
            "currentDayGoalMinutes": {
              "type": "long"
            },
            "lastChangeDateTime": {
              "type": "date"
            },
            "currentWeekObjectivesCompleted": {
              "type": "long"
            },
            "levelProgress": {
              "type": "long"
            },
            "currentDayObjectivesCompleted": {
              "type": "long"
            },
            "currentWeekGoalMinutes": {
              "type": "long"
            },
            "currentWeekDaysGoal": {
              "type": "long"
            },
            "levelObjectivesMasteredPercent": {
              "type": "long"
            },
            "currentDaySessionMinutes": {
              "type": "long"
            },
            "goalStatus": {
              "type": "keyword",
              "ignore_above": 100,
              "fields": {
                "text": {
                  "type": "text"
                }
              }
            }
          }
        },
        "SMARTSTART": {
          "type": "nested",
          "properties": {
            "currentWeekDaysActive": {
              "type": "long"
            },
            "levelObjectivesMasteredCount": {
              "type": "long"
            },
            "levelObjectivesAttemptedCount": {
              "type": "long"
            },
            "currentWeekSessionMinutes": {
              "type": "long"
            },
            "objectiveList": {
              "type": "nested",
              "properties": {
                "score": {
                  "type": "long"
                },
                "scoreKey": {
                  "type": "long"
                },
                "currentDay": {
                  "type": "boolean"
                },
                "currentWeek": {
                  "type": "boolean"
                },
                "objName": {
                  "type": "keyword",
                  "ignore_above": 100,
                  "fields": {
                    "text": {
                      "type": "text"
                    }
                  }
                },
                "mastered": {
                  "type": "boolean"
                },
                "scoreDate": {
                  "type": "date"
                },
                "mastery": {
                  "type": "long"
                }
              }
            },
            "currentDayGoalMinutes": {
              "type": "long"
            },
            "lastChangeDateTime": {
              "type": "date"
            },
            "currentWeekObjectivesCompleted": {
              "type": "long"
            },
            "levelProgress": {
              "type": "long"
            },
            "currentDayObjectivesCompleted": {
              "type": "long"
            },
            "currentWeekGoalMinutes": {
              "type": "long"
            },
            "currentWeekDaysGoal": {
              "type": "long"
            },
            "levelObjectivesMasteredPercent": {
              "type": "long"
            },
            "currentDaySessionMinutes": {
              "type": "long"
            },
            "goalStatus": {
              "type": "keyword",
              "ignore_above": 100,
              "fields": {
                "text": {
                  "type": "text"
                }
              }
            }
          }
        }
      }
    }
  }
};

let matchAllQuery = {
  "match_all": {}
};

async function createIndex() {
  await esClient.createIndex(index, index_mappings);
}

async function createIndex2() {
  await esClient.createIndex(index, index_mappings2);
}

async function deleteIndex() {
  await esClient.deleteIndex(index);
}

async function testBulkInsert(count) {
  let users = generateUsers(count);

  let resp = await esClient.bulk(users, index, action.INSERT);

  console.log(`Inserted ${count} users in ${JSON.stringify(resp.took)} ms`);
}

async function testBulkInsert2(count) {
  let docs = generateData(count);
  let docsToInsert;
  let start = new Date().getTime();
  for (let i = 0; i < count; i += 2000) {
    docsToInsert = docs.slice(i, i + 2000);
    let resp = await esClient.bulk(docsToInsert, index, action.INSERT);

    // console.log(`Inserted ${docsToInsert.length} users in ${JSON.stringify(resp.took)} ms`);
  }
  let end = new Date().getTime();
  console.log(`Inserted ${count} users in ${JSON.stringify(end - start)} ms`);
}

async function testBulkDelete() {
  let resp = await esClient.deleteByQuery(index, matchAllQuery);

  console.log(`Deleted all users in ${resp.body.took} ms`);
}

async function testBulkUpdate(count) {
  let start = new Date().getTime();
  for (let i = 0; i <= count / 10000; i ++){
    let resp = await esClient.updateByQuery(
      index,
      {
        script:{
          lang: 'painless',
          source: 'ctx._source["givenName"] = "test"'
        },
        query: {
          "bool": {
            "must_not": {
              "term": {
                "givenName": "test"
              }
            }
          }
        }
      }
    );
  }
  let end = new Date().getTime();
  console.log(`Updated all users in ${end - start} ms`);
}

async function getAllFilterQuery() {
  let resp = await esClient.search(index, {
    query: {
      "bool": {
        "filter": [
          {
            "term": {
              "role": "Student"
            }
          },
          {
            "term": {
              "primaryLanguage": "Spanish"
            }
          },
          {
            "term": {
              "gender": "Male"
            }
          },
          {
            "terms": {
              "grades": [
                "2,",
                "3",
                "4"
              ]
            }
          }
        ]
      }
    },
    "aggs": {
      "facets": {
        "filter": {
          "bool": {
            "filter": [
              {
                "term": {
                  "role": "Student"
                }
              }
            ]
          }
        },
        "aggs": {
          "gradeLevels": {
            "terms": {
              "field": "grades"
            }
          },
          "genders": {
            "terms": {
              "field": "gender"
            }
          },
          "primaryLanguages": {
            "terms": {
              "field": "language"
            }
          },
          "schools": {
            "nested": {
              "path": "schools"
            },
            "aggs": {
              "classes": {
                "nested": {
                  "path": "schools.classes"
                },
                "aggs": {
                  "uuid": {
                    "terms": {
                      "script": "if(doc['schools.classes.name'].size() == 0) return ''; else return doc['schools.classes.name'].value + '////' + doc['schools.classes.uuid'].value;",
                      "size": "10000",
                      "order": {
                        "_key": "asc"
                      }
                    }
                  },
                  "name": {
                    "terms": {
                      "field": "schools.classes.name",
                      "size": "10000",
                      "order": {
                        "_key": "asc"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    size: 10000
  });

  console.log(`Get filtered users in ${resp.took} ms`);
}

async function getAll() {
  let resp = await esClient.search(index, {
    query: {
      "term": {
        "givenName": {
          "value": "test"
        }
      }
    },
    size: 10000
  });
  // console.log(JSON.stringify(resp.hits.hits));
  console.log(`Get all users in ${resp.took} ms`);
}

async function test(count) {
  await createIndex();

  await testBulkInsert(count);
  await testBulkUpdate(count);
  await getAll();
  await testBulkDelete();

  await deleteIndex();
}

async function test2(count) {
  await createIndex2();

  await testBulkInsert2(count);
  await testBulkUpdate(count);
  await getAllFilterQuery();
  await getAll();
  await testBulkDelete();

  await deleteIndex();
}

async function testPerformance() {
  try {
    await test(100);
    await test(1000);
    await test(10000);
    await test(50000);
  } catch (e) {
    console.log(e);
    await deleteIndex();
  }
}

async function testPerformance2() {
  try {
    await test2(100);
    await test2(1000);
    await test2(10000);
    await test2(50000);
  } catch (e) {
    console.log(e);
    await deleteIndex();
  }
}

testPerformance().then(() => console.log("finished"));
// testPerformance2().then(() => console.log("finished"));

function generateData(count) {
  let documents = [];

  for (let i = 1; i <= count; i++) {
    documents.push(generateDocument());
  }

  return documents;
}

const org1 = uuid();
const org2 = uuid();
const products = ["ERP", "EMS", "SMARTSTART"];
const goals = ["ACTION TAKEN", "SURPASSING GOAL", "ON TRACK", "NEEDS ACTION"];
const grades = ["1", "2", "3", "4", "5"];

function generateDocument() {
  let doc = {};

  doc.uuid = uuid();
  doc.familyName = uuid();
  doc.givenName = uuid();
  doc.middleName = uuid();
  doc.identifier = uuid();
  doc.primaryLanguage = Math.random() > 0.5 ? "English" : "Spanish";
  doc.gender = Math.random() > 2 / 3 ? "Unspecified" : Math.random() < 1 / 2 ? "Male" : "Female";
  doc.status = uuid();
  doc.role = Math.random() > 0.5 ? "Teacher" : "Student";
  doc.grades = [getRandomElementFromlist(grades)];
  doc.sms = uuid();
  doc.phone = uuid();
  doc.email = uuid();
  doc.identifier = uuid();

  doc.timestampLastModifiedInMilliseconds = new Date().getTime();

  doc.organization = {};
  doc.organization.uuid = Math.random() > 0.5 ? org1 : org2;
  doc.organization.name = uuid();

  let schoolCount = Math.floor(Math.random() * 5);
  if (schoolCount > 0) {
    doc.schools = [];
  }
  for (let i = 0; i < schoolCount; i++) {
    doc.schools.push({});
    doc.schools[i].uuid = doc.organization.uuid + i;
    doc.schools[i].name = doc.schools[i].uuid;
    let classCount = Math.floor(Math.random() * 5);
    if (classCount > 0) {
      doc.schools[i].classes = [];
    }
    for (let j = 0; j < classCount; j++) {
      doc.schools[i].classes.push({});
      doc.schools[i].classes[j].uuid = doc.schools[i].uuid + j;
      doc.schools[i].classes[j].name = doc.schools[i].classes[j].uuid;
      doc.schools[i].classes[j].grades = doc.grades;
      doc.schools[i].classes[j].course = {};
      doc.schools[i].classes[j].course.uuid = doc.schools[i].classes[j].uuid + j;
      doc.schools[i].classes[j].course.code = doc.schools[i].classes[j].course.uuid;
      doc.schools[i].classes[j].course.name = doc.schools[i].classes[j].course.uuid;
      doc.schools[i].classes[j].course.subjects = [];
      doc.schools[i].classes[j].course.subjects.push({
        code: uuid(),
        name: uuid()
      });
      doc.schools[i].classes[j].course.academicSession = {};
      doc.schools[i].classes[j].course.academicSession.startDate = new Date();
      doc.schools[i].classes[j].course.academicSession.endDate = new Date();
      doc.schools[i].classes[j].course.academicSession.name = uuid();
    }
  }

  doc.dashboards = {};
  if (Math.random() > 0.33) {
    doc.dashboards.ERP = generateDashboardData();
    // doc.dashboards.push(generateDashboardData());
  }
  if (Math.random() > 0.33) {
    doc.dashboards.EMS = generateDashboardData();
    // doc.dashboards.push(generateDashboardData());
  }
  if (Math.random() > 0.33) {
    doc.dashboards.SMARTSTART = generateDashboardData();
    // doc.dashboards.push(generateDashboardData());
  }

  return doc;
}

function generateDashboardData() {
  let doc = {};

  // doc.product = getRandomElementFromlist(products);
  doc.currentWeekDaysActive = getRandomNumber(100);
  doc.levelObjectivesMasteredCount = getRandomNumber(100);
  doc.levelObjectivesAttemptedCount = getRandomNumber(100);
  doc.currentWeekSessionMinutes = getRandomNumber(100);
  doc.currentDayGoalMinutes = getRandomNumber(100);
  doc.lastChangeDateTime = new Date().getTime();
  doc.currentWeekObjectivesCompleted = getRandomNumber(100);
  doc.levelProgress = getRandomNumber(100);
  doc.currentDayObjectivesCompleted = getRandomNumber(100);
  doc.currentWeekGoalMinutes = getRandomNumber(100);
  doc.currentWeekDaysGoal = getRandomNumber(100);
  doc.levelObjectivesMasteredPercent = getRandomNumber(100);
  doc.currentDaySessionMinutes = getRandomNumber(100);
  doc.goalStatus = getRandomElementFromlist(goals);
  doc.objectiveList = [];
  let count = Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    doc.objectiveList.push({});
    doc.objectiveList[i].score = getRandomNumber(100);
    doc.objectiveList[i].scoreKey = getRandomNumber(100);
    doc.objectiveList[i].currentDay = Math.random() > 0.5;
    doc.objectiveList[i].currentWeek = Math.random() > 0.5;
    doc.objectiveList[i].mastery = getRandomNumber(100);
    doc.objectiveList[i].scoreDate = new Date();
    doc.objectiveList[i].objName = uuid();
    doc.objectiveList[i].mastered = Math.random() > 0.5;
  }
  return doc;
}

function getRandomElementFromlist(lst) {
  return lst[Math.floor(Math.random() * lst.length)];
}

function getRandomNumber(q) {
  return Math.ceil(Math.random() * q);
}
