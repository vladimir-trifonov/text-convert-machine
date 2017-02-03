/* global Promise */ 
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	srcId: {
		type: Schema.Types.ObjectId
	},
	type: { type: String, required: true, enum: ['document'] },
	status: { type: String, required: true, enum: ['processed', 'processing', 'inQueue'], default: 'inQueue' }
}, { timestamps: true });

taskSchema.statics.getOrderedTasks = function () {
	return this.find({}).sort({ createdAt: 1 }).exec();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;