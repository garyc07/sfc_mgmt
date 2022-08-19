module.exports = (app, auth) => {
  const router = require('express-promise-router')()
  const controller = require('../controllers/match')

  router.get('/', controller.all)
  router.post('/', controller.create)
  router.patch('/', controller.update)

  app.use('/match', router)
}