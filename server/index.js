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

const start = (options) => {
	return new Promise((resolve, reject) => {
		if (!options.port) {
			reject(new Error('The server must be started with an available port'));
		}

		const app = express();

		// parse application/x-www-form-urlencoded 
		app.use(bodyParser.urlencoded({ extended: false }));

		// parse application/json 
		app.use(bodyParser.json());

		app.use(morgan('dev'));
		app.use(helmet());

		components({ app });

		app.use((err, req, res, next) => {
			error('Something went wrong!, err:' + err);
			res.status(status.INTERNAL_SERVER_ERROR).send('Something went wrong!');
		});

		const server = spdy.createServer(options.ssl, app)
			.listen(options.port, () => resolve(server));
	});
};

module.exports = Object.assign({}, { start });