const express = require('express')
const expressJoi = require('express-joi')
const schema = require('./schema')

module.exports = (controller) => {
  const router = express.Router()

  router.post(
    '/documents/convert',
    expressJoi.joiValidate(schema.createAndConvert),
    controller.createAndConvert.bind(controller)
  )

  router.get(
    '/documents/convertion',
    controller.downloadConvertion.bind(controller)
  )

  return router
}
