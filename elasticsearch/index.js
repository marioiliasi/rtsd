const esClient = require("./library/esclient");
const { generateUsers } = require("./dataGenerator");
const action = require("./library/action");

let index = "users";

let index_mappings = {
  "properties": {
    "firstName": {
      "type": "text",
      "fields": {
        "keyword": {
          "ignore_above": 100,
          "type": "keyword"
        }
      }
    },
    "lastName": {
      "type": "text",
      "fields": {
        "keyword": {
          "ignore_above": 100,
          "type": "keyword"
        }
      }
    },
    "age": {
      "type": "integer"
    }
  }
};

let matchAllQuery = {
    "match_all": {}
};

async function createIndex() {
  await esClient.createIndex(index, index_mappings);
}

async function deleteIndex() {
  await esClient.deleteIndex(index);
}

async function testBulkInsert(count){
  let users = generateUsers(count);

  let resp = await esClient.bulk(users, index, action.INSERT);

  console.log(`Inserted ${count} users in ${JSON.stringify(resp.took)} ms`);
}

async function testBulkDelete(){
  let resp = await esClient.deleteByQuery(index, matchAllQuery)

  console.log(`Deleted all users in ${resp.body.took} ms`);
}

async function testBulkUpdate(){
  let resp = await esClient.updateByQuery(
    index,
    {
      lang: 'painless',
        source: 'ctx._source["firstName"] = "test"'
    },
    matchAllQuery
  );
  console.log(`Updated all users in ${resp.body.took} ms`);
}

async function getAll(){
  let resp = await esClient.search(index, {
    "range" : {
      "age" : {
        "gte" : 0,
        "lte" : 100
      }
    }
  });
  console.log(JSON.stringify(resp.hits.hits));
  console.log(`Get all users in ${resp.took} ms`);
}

async function test(count){
  console.log("");

  await createIndex();

  await testBulkInsert(count);
  await testBulkUpdate();
  await getAll();
  await testBulkDelete();

  await deleteIndex();

  console.log("");
}

async function testPerformance() {
  try{
    await test(100);
    await test(10000);
    await test(50000);
  }catch (e) {
    console.log(e);
    await deleteIndex();
  }
}

testPerformance().then(() => console.log("finished"));
