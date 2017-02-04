const status = require('http-status');
const Document = require('./model');

class DocumentsController {
	constructor({events}) {
		this.events = events;
	}

	createAndConvertDocument(req, res, next) {
		const {name, text, convertTo} = req.body;
		const newDoc = new Document({ name, text });

		newDoc.save()
			.then((saved) => {
				// Create convert task
				const source = { id: saved.id, name: saved.name, createdAt: saved.createdAt };
				this.events.emit('document.create-convert-task', { source, convertTo });

				res.status(status.CREATED).send(Object.assign({}, saved, { convertTo }));
			})
			.catch(next);
	}
}

exports.create = (params) => new DocumentsController(params);