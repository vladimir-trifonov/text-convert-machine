const STATE = {
	IDLE: 'idle',
	BUSY: 'busy'
};

const tasksHandlers = require('./tasksHandlers');

class TasksQueue {
	constructor({events, options}) {
		if(!tasksHandlers[options.type]) {
			throw Error(`Missing task handler: ${options.type}`);
		}

		this.state = STATE.STOPPED;
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

	}

	getNext() {

	}

	process() {

	}

	notifyProcessing(task) {
		this.events.emit(`${this.options.type}.task.processing`, { task });
	}

	notifyProcessed(task) {
		this.events.emit(`${this.options.type}.task.processed`, { task });
	}
}

exports.create = (params) => new TasksQueue(params);