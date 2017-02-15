const taskComponent = require('./task')
const documentComponent = require('./document')
const notifyComponent = require('./notify')

module.exports = ({app, events}) => {
  taskComponent({ app, events })
  documentComponent({ app, events })

  return ({io, events}) => notifyComponent({ io, events })
}
