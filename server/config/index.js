const development = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl'),
  mongo: require('./mongo'),
  tasks: require('./tasks')
}

module.exports = Object.assign({}, {development})
