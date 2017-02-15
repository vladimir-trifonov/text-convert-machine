/* global Promise */
const debug = require('debug')
const error = debug('app:error')
const TaskModel = require('../../components/task/model')
const DocumentModel = require('../../components/document/model')
const fs = require('fs')
const path = require('path')
const htmlToPdf = require('html-to-pdf')

module.exports = {
  getNext: (options) => {
    return new Promise((resolve, reject) => {
      getNextTask(options.type)
        .then((tasks) => {
          if (!tasks.length) {
            return reject()
          }

          return getPreemptsTasks({ type: options.type, limit: options.preempts, fromDate: tasks[0].createdAt })
            .then(getNextTaskByPriority({ priority: options.priority, preempts: options.preempts, nextTask: tasks[0] }))
            .then(resolve)
        })
        .catch((err) => {
          error(err)
          reject()
        })
    })
  },
  process: (options) => {
    return (task) => {
      return new Promise((resolve, reject) => {
        DocumentModel.findOne({ _id: task.source.id })
          .then((document) => {
            // Complete the task after the specific delay
            setTimeout(() => {
              convertDocument(task.source.convertTo, task.get('id'), document.text)
                .then((fileId) => {
                  const conversion = {
                    type: task.source.convertTo,
                    fileId
                  }

                  return Promise.all([
                    document.addConversion(conversion),
                    task.setConversion(conversion)
                  ])
                })
                .then(resolve)
                .catch(reject)
            }, options.delay[task.source.convertTo])
          })
          .catch(reject)
      })
    }
  }
}

function getNextTask (type) {
  return TaskModel.getTasksByType({ type, limit: 1, statusIn: ['processing', 'inQueue'] })
}

function getPreemptsTasks ({type, limit, fromDate}) {
  return TaskModel.getTasksByType({ type, limit, fromDate })
}

function getNextTaskByPriority ({preempts, priority, nextTask}) {
  return (preemptsTasks) => {
    if (preemptsTasks.length < preempts) {
      return nextTask
    }

    const preemptsTasksNotProcessed = preemptsTasks.filter((task) => {
      return task.status !== 'processed'
    })

    if (!preemptsTasksNotProcessed.length) {
      return nextTask
    }

    const nextTaskPriority = priority[nextTask.source.convertTo]

    const preemptsTasksPriority = preemptsTasks.reduce((sum, task) => {
      sum += priority[task.source.convertTo]
      return sum
    }, 0)

    return preemptsTasksPriority < nextTaskPriority ? preemptsTasksNotProcessed[0] : nextTask
  }
}

function convertDocument (type, fn, text) {
  return new Promise((resolve, reject) => {
    function convertHandler (err) {
      if (err) {
        return reject(err)
      }

      resolve(`${fn}`)
    }

    switch (type) {
      case 'html':
        fs.writeFile(path.resolve(__dirname, '../../../storage', `${fn}.html`), text, convertHandler)
        break
      case 'pdf':
        htmlToPdf.convertHTMLString(text, path.resolve(__dirname, '../../../storage', `${fn}.pdf`), convertHandler)
        break
    }
  })
}
