const status = require('http-status')
const Document = require('./model')
const path = require('path')

class DocumentsController {
  constructor (events) {
    this.events = events
  }

  createAndConvert (req, res, next) {
    const {name, text, convertTo} = req.body
    const newDoc = new Document({ name, text })

    newDoc.save()
      .then((saved) => {
        // Create convert task
        const message = { id: saved.id, name: saved.name, convertTo }
        this.events.emit('document.convert.task.new', message)

        res.sendStatus(status.CREATED)
      })
      .catch(next)
  }

  downloadConvertion (req, res, next) {
    if (!req.query.fn) {
      return res.send(422)
    }

    res.download(path.resolve(__dirname, '../../../storage', `${req.query.fn}`))
  }
}

exports.create = (params) => new DocumentsController(params)
