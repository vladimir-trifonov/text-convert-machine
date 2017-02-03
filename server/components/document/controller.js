const status = require('http-status');
const Document = require('./model');

class DocumentsController {
	constructor({events}) {
		this.events = events;
	}

	createDocument(req, res, next) {
		const newDoc = new Document(req.body);

		newDoc.save()
			.then((saved) => {
				this.events.emit('document.created', { document: saved.id });
				res.status(status.CREATED).send(saved);
			})
			.catch(next);
	}
}

exports.create = (params) => new DocumentsController(params);