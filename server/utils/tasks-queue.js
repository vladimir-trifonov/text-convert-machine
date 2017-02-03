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
		this.taskHandler.getNext()
			.then(this.process.bind(this))
			.then(this.proceedTask.bind(this))
			.catch(() => {
				this.state = STATE.IDLE;
			});
	}

	process({task}) {
		return new Promise((resolve, reject) => {
			this.notifyProcessing(task);

			this.taskHandler.process(task)
				.then(() => {
					this.notifyProcessed(task);
					resolve();
				})
				.catch(reject);
		});
	}

	notifyProcessing(task) {
		this.events.emit(`${this.options.type}.task.processing`, { task, status: 'processing' });
	}

	notifyProcessed(task) {
		this.events.emit(`${this.options.type}.task.processed`, { task, status: 'processed' });
	}
}

exports.create = (params) => new TasksQueue(params);