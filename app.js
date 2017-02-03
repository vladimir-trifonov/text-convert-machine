/* global Promise */ 

const config = require('./server/config/')[process.env.NODE_ENV || 'development'];
const {EventEmitter} = require('events');
const server = require('./server');
const path = require('path');
const mongoose = require('mongoose');
const debug = require('debug');
const error = debug('app:error');
const mediator = new EventEmitter();

process.on('uncaughtException', (err) => {
	error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
	error('Unhandled Rejection', err);
});

mongoose.Promise = Promise;
mongoose.connect(config.mongo.conn);

server.start({
	port: config.port,
	ssl: config.ssl,
	public: path.resolve(__dirname,'./front/src')
}).then(() => console.log(`Server listening on port: ${config.port}`));

mediator.emit('boot.ready');