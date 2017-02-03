const express = require('express');
const controller = require('./controller');

module.exports = () => {
	const router = express.Router();

	router.get('/tasks', controller.getTasks);

	return router;
};