const routes = require('./routes');
const controller = require('./controller');

module.exports = ({app, events, options}) => {
	app.use('/api', routes(controller.create({events, options})));
};