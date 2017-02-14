const Controller = require('./controller');

module.exports = ({io, events}) => Controller.create({ io, events });