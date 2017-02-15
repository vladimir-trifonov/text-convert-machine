class NotifyController {
  constructor ({io, events}) {
    this.io = io
    this.events = events
    this.initEventHandlers()
  }

  initEventHandlers () {
    this.events.on('document.convert.task.changed', (source) => {
      this.io.sockets.emit('document.convert.task.changed', source)
    })
  }
}

exports.create = (params) => new NotifyController(params)
