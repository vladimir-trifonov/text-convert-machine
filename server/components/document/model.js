const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const documentSchema = new Schema({
	name: { type: String, required: true },
	text: { type: String, required: true },
	type: { type: String, required: true, enum: ['html', 'pdf'] }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;