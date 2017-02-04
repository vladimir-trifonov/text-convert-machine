/* global Promise */
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	source: { type: Object, required: true },
	type: { type: String, required: true, enum: ['document.convert'] },
	status: { type: String, required: true, enum: ['processed', 'processing', 'inQueue'], default: 'inQueue' }
}, { timestamps: true });

taskSchema.statics.getOrderedTasks = function () {
	return this.find({}).sort({ createdAt: 1 }).exec();
};

taskSchema.statics.getTasksByType = function ({type, limit, statusIn, fromDate}) {
	let findQuery = { type };

	if (statusIn) {
		findQuery.status = { $in: statusIn };
	}

	if (fromDate) {
		findQuery.createdAt = { $gt: fromDate };
	}

	const query = this.find(findQuery);

	if (typeof limit !== 'undefined') {
		query.limit(limit);
	}

	return query.sort({ createdAt: 1 }).exec();
};

taskSchema.methods.setStatus = function (status) {
		this.set('status', status);

		return this.save();
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;