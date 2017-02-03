const status = require('http-status');
const Task = require('./model');

class TaskController {
	constructor({events}) {
		this.events = events;
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.events.on('document.created', this.onDocumentCreated.bind(this));
	}

	getTasks(req, res, next) {
		Task.getOrderedTasks()
			.then((data) => {
				res.status(status.OK).send(data);
			})
			.catch(next);
	}

	onDocumentCreated({document}) {
		const newTask = new Task({
			document
		});

		newTask.save()
			.then((saved) => {
				this.events.emit('task.created', {task: saved.id});
			})
			.catch((err) => {
				this.events.emit('error', err);
			});
	}
}

exports.create = (params) => new TaskController(params);