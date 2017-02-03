const config = require('./server/config/')[process.env.NODE_ENV || 'development'];

const {EventEmitter} = require('events');
const server = require('./server');
const path = require('path');
const mongoose = require('mongoose');

const mediator = new EventEmitter();

process.on('uncaughtException', (err) => {
	console.error('Unhandled Exception', err);
});

process.on('uncaughtRejection', (err) => {
	console.error('Unhandled Rejection', err);
});

mongoose.connect('mongodb://localhost/myappdatabase');

server.start({
	port: config.port,
	ssl: config.ssl,
	public: path.resolve(__dirname,'./front/src')
}).then(() => console.log(`Server listening on port: ${config.port}`));

mediator.emit('boot.ready');