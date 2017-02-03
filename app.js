const config = require('./server/config/')[process.env.NODE_ENV || 'development'];
const {EventEmitter} = require('events');
const server = require('./server');
const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug');
const error = debug('app:error');
const events = new EventEmitter();
const tasksQueue = require('./server/utils/tasks-queue');

process.on('uncaughtException', (err) => {
	error('Unhandled Exception', err);
	throw err;
});

process.on('uncaughtRejection', (err) => {
	error('Unhandled Rejection', err);
});

mongoose.connect(config.mongo.conn);
tasksQueue.create({ events, options: config.tasks });

server.start({
	port: config.port,
	ssl: config.ssl,
	publicPath: path.resolve(__dirname, './front/src'),
	events
}).then(() => console.log(`Server listening on port: ${config.port}`));

events.emit('server.ready');