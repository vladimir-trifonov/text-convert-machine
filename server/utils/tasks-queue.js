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
		this.events.on('server.ready', this.start.bind(this));
		this.events.on(`${this.options.type}.task.created`, this.start.bind(this));
	}

	start() {
		if (this.state === STATE.BUSY) {
			return;
		}
		this.state = STATE.BUSY;
		this.next();
	}

	next() {
		this.taskHandler.getNext(this.options)
			.then(this.processCurrent.bind(this))
			.then(this.next.bind(this))
			.catch(() => {
				this.state = STATE.IDLE;
			});
	}

	processCurrent(task) {
		return new Promise((resolve, reject) => {
			task.setStatus('processing')
				.then(this.notifyOnChange.bind(this))
				.then(this.taskHandler.process)
				.then(() => {
					return task.setStatus('processed');
				})
				.then(() => {
					this.notifyOnChange(task);
					resolve();
				})
				.catch(reject);
		});
	}

	notifyOnChange(task) {
		this.events.emit(`${this.options.type}.task.changed`, { task });
		return task;
	}
}

exports.create = (params) => new TasksQueue(params);