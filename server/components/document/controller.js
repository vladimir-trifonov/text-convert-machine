const status = require('http-status');
const Document = require('./model');

class DocumentsController {
	constructor({events}) {
		this.events = events;
	}

	createAndConvertDocument(req, res, next) {
		const {name, text, convertto} = req.body;
		const newDoc = new Document({ name, text });

		newDoc.save()
			.then((saved) => {
				// Create convert task
				let message = { document: { id: saved.id, name: saved.name, createdAt: saved.createdAt }, convertTo: convertto };
				this.events.emit('document.create-convert-task', message);

				res.status(status.CREATED).send(saved);
			})
			.catch(next);
	}
}

exports.create = (params) => new DocumentsController(params);