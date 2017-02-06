const express = require('express');

module.exports = (controller) => {
	const router = express.Router();

	router.get('/tasks', controller.getTasksByType.bind(controller));
	
	return router;
};