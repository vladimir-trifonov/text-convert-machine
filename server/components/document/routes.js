const express = require('express');
const expressJoi = require('express-joi');
const schema = require('./schema');

module.exports = (controller) => {
	const router = express.Router();
	router.post('/documents', expressJoi.joiValidate(schema.createDocumentSchema), controller.createDocument.bind(controller));
	return router;
};