const express = require('express');
const controller = require('./controller');

module.exports = () => {
	const router = express.Router();

	router.post('/documents', controller.createDocument);

	return router;
};