const dynamoDocClient = require('serverless-dynamodb-client').doc

const generator = require('../generator')
const dates = require('../dates')


const { playerStore } = require('../db')

module.exports.all = async (req, res, next) => {
  const players = await playerStore.allPlayers()
  res.send(players)
}


module.exports.activePlayers = async (req, res, next) => {
  const activePlayers = await playerStore.activePlayers()
  res.send(activePlayers)
}


module.exports.create = async (req, res, next) => {

  const body = req.body
  const playerId = generator.generateId()

  const params = {
    TableName: process.env.PLAYERS_TABLE,
    Item: {
      playerId: playerId,
      isActive: body.isActive || false,
      activateDate: dates.today(),
      name: body.name,
      knownas: body.knownas,
      dob: body.dob,
      phNum: body.phNum,
      email: body.email,
      emergencyContact: {
        name: 'The Missus',
        number: '12345'
      }
    }
  }

  const result = await dynamoDocClient.put(params).promise()

  console.log(result)
  
  res.status(201).json({ msg: "Player Created" })
}




module.exports.update = async (req, res, next) => {} // 204?


module.exports.delete = async (req, res, next) => {} // 204?




module.exports.active = async (req, res, next) => {}


module.exports.deactivate = async (req, res, next) => {

  const { playerId } = req.body
  const params = {
    TableName: process.env.PLAYERS_TABLE,
    Key: { playerId: playerId },
    UpdateExpression: 'set isActive = :n',
    ExpressionAttributeValues: { ':n': false },
    ReturnConsumedCapacity: 'NONE'
  }

  const result = await dynamoDocClient.update(params).promise()

  console.log(result)


  res.status(201).json({ msg: "Player Deactivated" })
}



module.exports.activate = async (req, res, next) => {}
