const development = {
	port: process.env.PORT || 3000,
	ssl: require('./ssl'),
	mongo: require('./mongo')
};

module.exports = Object.assign({}, {development});