const status = require('http-status');
const Task = require('./model');

class TaskController {
	constructor(events) {
		this.events = events;
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.events.on('document.convert.task.new', (source) => {
			this.createTask({ type: 'document.convert', source });
		});
	}

	createTask(task) {
		const newTask = new Task(task);

		newTask.save()
			.then((saved) => {
				this.events.emit(`${saved.type}.task.created`, saved);
			})
			.catch((err) => {
				this.events.emit('error', err);
			});
	}

	getTasks(req, res, next) {
		Task.getOrderedTasks()
			.then((data) => {
				res.status(status.OK).send(data);
			})
			.catch(next);
	}
}

exports.create = (params) => new TaskController(params);