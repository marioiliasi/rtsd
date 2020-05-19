const { Client } = require("@elastic/elasticsearch/index");
const action = require("./action");

const defaultEndpoint = "http://localhost:9200";

let client = new Client({
  node: defaultEndpoint
});

module.exports ={
  initClient: (endpoint) => {
    client = new Client({
      node: endpoint
    });
  },

  createIndex: async (index, mappings) => {
    return await client.indices.create({
      index: index,
      body: {
        mappings: mappings
      }
    });
  },

  deleteIndex: async (index) => {
    return await client.indices.delete({index: index});
  },

  search: async (index, query) => {
    const { body } = await client.search({
      index: index,
      body: query
    })

    return body;
  },

  updateByQuery: async (index, body) => {
    return await client.updateByQuery({
      index: index,
      refresh: true,
      body: body
    });
  },

  deleteByQuery: async (index, query) => {
    return await client.deleteByQuery({
      index: index,
      body: {query},
      scroll_size: 10000
    });
  },

  bulk: async (data, index, act) => {
    let body;

    switch(act){
      case action.INSERT:
      case action.UPDATE:
        body = data.flatMap(doc => [{ index: { _index: index } }, doc]);
        break;
      case action.DELETE:
        body = data.flatMap(doc => [{ delete: { _index: index } }, doc]);
        break;
      default: throw new Error("Unsupported operation");
    }

    const { body: bulkResponse } = await client.bulk({ refresh: true, body })

    if (bulkResponse.errors) {
      const erroredDocuments = []
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      console.log(erroredDocuments)
    }

    return bulkResponse;
  }
}
