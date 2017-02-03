const status = require('http-status');
const Task = require('./model');

exports.getTasks = (req, res, next) => {
	Task.getOrderedTasks()
		.then((data) => {
			res.status(status.OK).send(data);
		})
		.catch(next);
};