const expressJoi = require('express-joi');
const Joi = expressJoi.Joi;
const Document = require('./model');

module.exports = {
	createDocumentSchema: {
		name: Joi.types.String().required(),
		text: Joi.types.String().required(),
		type: Joi.types.String().required().valid(Document.schema.path('type').enumValues)
	}
};