const express = require('express');
const expressJoi = require('express-joi');
const schema = require('./schema');

module.exports = (controller) => {
	const router = express.Router();

	router.post(
		'/documents/convert', 
		expressJoi.joiValidate(schema.createAndConvertDocument), 
		controller.createAndConvertDocument.bind(controller)
	);
	
	return router;
};