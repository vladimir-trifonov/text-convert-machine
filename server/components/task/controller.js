const status = require('http-status')
const Task = require('./model')

class TaskController {
  constructor (events) {
    this.events = events
    this.initEventHandlers()
  }

  initEventHandlers () {
    this.events.on('document.convert.task.new', (source) => {
      this.create({ type: 'document.convert', source })
    })
  }

  create (task) {
    const newTask = new Task(task)

    newTask.save()
      .then((saved) => {
        this.events.emit(`${saved.type}.task.created`, saved)
      })
      .catch((err) => {
        this.events.emit('error', err)
      })
  }

  getByType (req, res, next) {
    if (!req.query.type) {
      return res.status(400).json({ message: 'Missing query param: type' })
    }

    Task.getTasksByType({ type: req.query.type })
      .then((data) => {
        res.status(status.OK).send(data)
      })
      .catch(next)
  }
}

exports.create = (params) => new TaskController(params)
