const dynamoDocClient = require('serverless-dynamodb-client').doc


module.exports.all = async (req, res, next) => {

  const params = {
    TableName: process.env.PLAYERS_TABLE,
    Item: {
      playerId: '1234',
      otherData: 'OtherData'
    }
  }

  const result = await dynamoDocClient.put(params).promise()

  console.log(result)

  res.send({ players: "Yes" })
}


module.exports.create = async (req, res, next) => {
  res.status(201)
}

module.exports.update = async (req, res, next) => {} // 204?