/* global Promise */
var cnt = 0;
module.exports = {
	getNext: () => {
		return new Promise((resolve, reject) => {
			cnt++;
			if(cnt === 5) {
				cnt = 0;
				return reject();
			}
			setTimeout(() => {
				resolve({task: '123'});
			}, 1000);
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