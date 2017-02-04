const status = require('http-status');
const Document = require('./model');

class DocumentsController {
	constructor(events) {
		this.events = events;
	}

	createAndConvertDocument(req, res, next) {
		const {name, text, convertTo} = req.body;
		const newDoc = new Document({ name, text });

		newDoc.save()
			.then((saved) => {
				// Create convert task
				const message = { id: saved.id, name: saved.name, createdAt: saved.createdAt, convertTo };
				this.events.emit('document.create-convert-task', message);

				res.sendStatus(status.CREATED);
			})
			.catch(next);
	}
}

exports.create = (params) => new DocumentsController(params);