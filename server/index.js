/* global Promise */

const status = require('http-status')
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const spdy = require('spdy')
const http = require('http')
const debug = require('debug')
const error = debug('app:error')
const bodyParser = require('body-parser')
const components = require('./components')
const cors = require('cors')

const start = ({ port, ssl, events }) => {
  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(cors())
    app.use(morgan('dev'))
    app.use(helmet())
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())

    var notify = components({ app, events })

    app.use((err, req, res, next) => {
      error('Something went wrong!', err)
      res.status(status.INTERNAL_SERVER_ERROR).send({ message: 'Something went wrong!' })
    })

    const server = http.createServer(app)
    //const server = spdy.createServer(ssl, app)

    const io = require('socket.io')(server)
    notify({ io, events })

    server.listen(port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })
