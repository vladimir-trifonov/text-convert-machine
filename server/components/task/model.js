const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	type: { type: String, required: true, trim: true },
	priority: { type: Number, required: true, trim: true },
	document: {
		type: Schema.Types.ObjectId,
		ref: 'Document'
	}
}, { timestamps: true });

taskSchema.statics.getOrderedTasks = function () {
	return this.find({}).sort({ createdAt: 1 }).exec();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;