const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;

module.exports = {
	createAndConvertDocument: {
		name: Joi.types.String().required(),
		text: Joi.types.String().required(),
		convertTo: Joi.types.String().required().valid(['html', 'pdf'])
	}
};