const taskComponent = require('./task');
const documentComponent = require('./document');

module.exports = ({app}) => {
	taskComponent({app});
	documentComponent({app});
};