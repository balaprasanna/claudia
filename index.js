const ApiBuilder = require('claudia-api-builder')
const AWS = require('aws-sdk')

var api = new ApiBuilder()
var dynamoDb = new AWS.DynamoDB.DocumentClient()

api.post('/malls', function (request) { // SAVE your mall
  var params = {  
    TableName: 'malls',  
    Item: {
        mallid: request.body.mallId,
        name: request.body.name // your mall name
    } 
  }
  return dynamoDb.put(params).promise(); // returns dynamo result 
}, { success: 201 }); // returns HTTP status 201 - Created if successful

api.get('/malls', function (request) { // GET all users
  return dynamoDb.scan({ TableName: 'malls' }).promise()
      .then(response => response.Items)
});

module.exports = api;