/* global Promise */
const STATE = {
	IDLE: 'idle',
	BUSY: 'busy'
};

const tasksHandlers = require('./tasksHandlers');

class TasksQueue {
	constructor({events, options}) {
		if (!tasksHandlers[options.type]) {
			throw Error(`Missing task handler: ${options.type}`);
		}

		this.state = STATE.STOPPED;
		this.taskHandler = tasksHandlers[options.type];
		this.events = events;
		this.options = options;
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.events.on('server.ready', this.run.bind(this));
		this.events.on(`${this.options.type}.task.created`, this.run.bind(this));
	}

	run() {
		if (this.state === STATE.BUSY) {
			return;
		}
		this.state = STATE.BUSY;
		this.proceedTask();
	}

	proceedTask() {
		this.taskHandler.getNext(this.options)
			.then(this.process.bind(this))
			.then(this.proceedTask.bind(this))
			.catch(() => {
				this.state = STATE.IDLE;
			});
	}

	process(task) {
		return new Promise((resolve, reject) => {
			task.setStatus('processing')
				.then(this.notify.bind(this))
				.then(this.taskHandler.process)
				.then(() => {
					return task.setStatus('processed');
				})
				.then(() => {
					this.notify(task);
					resolve();
				})
				.catch(reject);
		});
	}

	notify(task) {
		this.events.emit(`${this.options.type}.task.changed`, { task });
		return task;
	}
}

exports.create = (params) => new TasksQueue(params);