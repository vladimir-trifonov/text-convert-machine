/* global Promise */
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	source: { type: Object, required: true },
	type: { type: String, required: true, enum: ['document.convert'] },
	priority: { type: Number, required: true, default: 0 },
	status: { type: String, required: true, enum: ['processed', 'processing', 'inqueue'], default: 'inqueue' }
}, { timestamps: true });

taskSchema.statics.getOrderedTasks = function () {
	return this.find({}).sort({ createdAt: 1 }).exec();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;