'use strict'

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./server/config/env')[process.env.NODE_ENV || 'development'];
const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use((err, req, res, next) => {
	reject(new Error('Something went wrong!, err:' + err));
	res.status(500).send('Something went wrong!');
});

if (!config.PORT) {
	new Error('Missing config: PORT');
}

const server = app.listen(config.PORT, () => console.log(`Server listening on port: ${config.PORT}`));