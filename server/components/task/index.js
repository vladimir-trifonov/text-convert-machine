const routes = require('./routes')
const Controller = require('./controller')

module.exports = ({app, events}) => {
  app.use('/api', routes(Controller.create(events)))
}
