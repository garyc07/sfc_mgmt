const dynamoDocClient = require('serverless-dynamodb-client').doc

const playersTable = process.env.PLAYERS_TABLE

module.exports = {

  allPlayers: async () => {
    const params = { TableName: playersTable }
    const res = await dynamoDocClient.scan(params).promise()
    return res.Items
  },


  activePlayers: async () => {
    /*try{
      const params = {
        TableName: playersTable,
        KeyConditionExpression: 'isActive = :isActive',
        ExpressionAttributeValues: { ':isActive': true },
        ReturnConsumedCapacity: 'NONE'
      }
  
      console.log('Making DB call!!!')
  
      const res = await dynamoDocClient.query(params).promise()
      console.log(res)
      return res.Items
    } catch(err){
      console.log(err)
      return []
    }*/

    // NOT IDEAL, CLEARLY
    const params = { TableName: playersTable }
    const res = await dynamoDocClient.scan(params).promise()
    const activePlayers = res.Items.filter(i => i.isActive)
    return activePlayers
  },


  createPlayer: async (playerData) => {},


  updatePlayer: async (playerData) => {},


  deletePlayer: async (playerId) => {},


  activatePlayer: async (playerId) => {},


  deactivatePlayer: async (playerId) => {},


  updatePlayerMatchStats: async (seasonId, stats) => {},


  updatePlayerTrainingStats: async (seasonId, stats) => {},
}