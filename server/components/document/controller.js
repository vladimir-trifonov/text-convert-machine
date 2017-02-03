const status = require('http-status');
const Document = require('./model');

exports.createDocument = (req, res, next) => {
	const newDoc = new Document(req.body);

	newDoc.save()
		.then((data) => {
			res.sendStatus(status.CREATED).send(data);
		})
		.catch(next);
};