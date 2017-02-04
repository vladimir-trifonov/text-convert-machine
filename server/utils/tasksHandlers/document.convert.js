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

					getPreemptsTasks({ type: options.type, limit: options.preempts, fromDate: tasks[0].createdAt })
						.then((preemptsTasks) => {
							resolve(getNextTaskByPriority(options.priority, tasks[0], preemptsTasks));
						})
						.catch((err) => {
							throw err;
						});
				})
				.catch((err) => {
					error(err);
					reject();
				});
		});
	},
	process: (task) => {
		return new Promise((resolve, reject) => {
			setTimeout(()=> {
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

function getNextTaskByPriority(priority, nextTask, preemptsTasks) {
	const nextTaskPriority = priority[nextTask.source.convertTo];

	const preemptsTasksNotProcessed = preemptsTasks.filter((task) => {
		return task.status !== 'processed';
	});

	if (!preemptsTasks.length || !preemptsTasksNotProcessed.length) {
		return nextTask;
	}

	const preemptsTasksPriority = preemptsTasks.reduce((sum, task) => {
		sum += priority[task.source.convertTo];
		return sum;
	}, 0);

	return preemptsTasksPriority > nextTaskPriority ? nextTask : preemptsTasksNotProcessed[0];
}
