/* global Promise */
const debug = require('debug');
const error = debug('app:error');
const TaskModel = require('../../components/task/model');

module.exports = {
	getNext: (options) => {
		return new Promise((resolve, reject) => {
			getNextTask(options.type)
				.then((tasks) => {
					if (!tasks.length) {
						return reject();
					}

					return tasks[0];
				})
				.then((nextTask) => {
					return getPreemptsTasks({ type: options.type, limit: options.preempts, fromDate: nextTask.createdAt })
						.then(getNextTaskByPriority({ priority: options.priority, preempts: options.preempts, nextTask }));
				})
				.then(resolve)
				.catch((err) => {
					error(err);
					reject();
				});
		});
	},
	process: (task) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve();
			}, 1000);
		});
	}
};

function getNextTask(type) {
	return TaskModel.getTasksByType({ type, limit: 1, statusIn: ['processing', 'inQueue'] });
}

function getPreemptsTasks({type, limit, fromDate}) {
	return TaskModel.getTasksByType({ type, limit, fromDate });
}

function getNextTaskByPriority({preempts, priority, nextTask}) {
	return (preemptsTasks) => {
		if (preemptsTasks.length < preempts) {
			return nextTask;
		}

		const preemptsTasksNotProcessed = preemptsTasks.filter((task) => {
			return task.status !== 'processed';
		});

		if (!preemptsTasksNotProcessed.length) {
			return nextTask;
		}

		const nextTaskPriority = priority[nextTask.source.convertTo];

		const preemptsTasksPriority = preemptsTasks.reduce((sum, task) => {
			sum += priority[task.source.convertTo];
			return sum;
		}, 0);

		return preemptsTasksPriority < nextTaskPriority ? preemptsTasksNotProcessed[0] : nextTask;
	};
}
