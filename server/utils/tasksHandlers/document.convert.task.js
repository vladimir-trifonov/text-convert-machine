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
				console.log('1');
				resolve({task: '123'});
			}, 1000);
		});
	},
	process: (task) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				console.log('2');
				resolve();
			}, 1000);
		});
	}
};