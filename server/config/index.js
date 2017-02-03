'use strict';

const development = {
	port: process.env.PORT || 3000,
	ssl: require('./ssl')
}

module.exports = Object.assign({}, {development});