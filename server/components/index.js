const taskComponent = require('./task');
const documentComponent = require('./document');

module.exports = ({app, events}) => {
	taskComponent({ app, events });
	documentComponent({ app, events });
};