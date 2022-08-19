module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/player')

  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)
  router.delete('/', controller.delete)

  router.get('/active', controller.activePlayers)
  router.patch('/deactivate', controller.deactivate)
  router.patch('/activate', controller.activate)

  app.use('/player', router)
}