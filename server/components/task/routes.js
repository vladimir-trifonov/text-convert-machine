const express = require('express')

module.exports = (controller) => {
  const router = express.Router()

  router.get('/tasks', controller.getByType.bind(controller))

  return router
}
