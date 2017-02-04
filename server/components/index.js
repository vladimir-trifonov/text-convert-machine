const taskComponent = require('./task');
const documentComponent = require('./document');

module.exports = ({app, events, componentOptions}) => {
	taskComponent({ app, events, options: componentOptions.task });
	documentComponent({ app, events });
};