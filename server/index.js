/* global Promise */

const status = require('http-status');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const spdy = require('spdy');
const debug = require('debug');
const error = debug('app:error');
const bodyParser = require('body-parser');
const components = require('./components');
// TODO: remove
var cors = require('cors');

const start = ({port, ssl, publicPath, events }) => {
	return new Promise((resolve, reject) => {
		if (!port) {
			reject(new Error('The server must be started with an available port'));
		}

		const app = express();
		// TODO: remove
		app.use(cors());
		app.use(morgan('dev'));
		app.use(helmet());
		// parse application/x-www-form-urlencoded 
		app.use(bodyParser.urlencoded({ extended: false }));
		// parse application/json 
		app.use(bodyParser.json());

		components({ app, events });

		app.use((err, req, res, next) => {
			error('Something went wrong!', err);
			res.status(status.INTERNAL_SERVER_ERROR).send({message: 'Something went wrong!'});
		});

		const server = spdy.createServer(ssl, app);
			
		const io = require('socket.io')(server);
		io.on('connection', function(socket) {
			console.log('new connection');
			socket.emit('message', 'This is a message from the dark side.');
		});

		server.listen(port, () => resolve(server));
	});
};

module.exports = Object.assign({}, { start });