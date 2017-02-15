const expressJoi = require('express-joi')
const Joi = expressJoi.Joi

module.exports = {
  createAndConvert: {
    name: Joi.types.String().required(),
    text: Joi.types.String().required(),
    convertTo: Joi.types.String().required().valid(['html', 'pdf'])
  }
}
