const STATE = {
	IDLE: 'idle',
	BUSY: 'busy'
};

class DocumentsQueue {
	constructor({events, options}) {
		this.state = STATE.STOPPED;
		this.events = events;
		this.options = options;
		this.initEventHandlers();
	}

	initEventHandlers() {
		this.events.on('server.ready', this.run.bind(this));
		this.events.on('task.created', this.run.bind(this));
	}

	run() {
		if(this.state === STATE.BUSY) {
			return;
		}
		this.state = STATE.BUSY;
		this.proceedTasks();
	}

	proceedTasks () {
	}
}

exports.create = (params) => new DocumentsQueue(params);