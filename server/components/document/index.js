const routes = require('./routes');
const controller = require('./controller');

module.exports = ({app, events}) => {
	app.use('/api', routes(controller.create(events)));
};