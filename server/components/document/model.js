/* global Promise */
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const documentSchema = new Schema({
	name: { type: String, required: true },
	text: { type: String, required: true },
	conversions: { type: Array, required: false }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;