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
		this.createTask({type: 'document', srcId: document.id});
	}

	createTask({type, srcId}) {
		const newTask = new Task({
			srcId,
			type
		});

		newTask.save()
			.then((saved) => {
				this.events.emit(`${type}.task.created`, {task: saved.id});
			})
			.catch((err) => {
				this.events.emit('error', err);
			});
	}
}

exports.create = (params) => new TaskController(params);