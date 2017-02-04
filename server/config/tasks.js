module.exports = {
	document: {
		convert: {
			type: 'document.convert',
			preempts: 5,
			priority: {
				html: 1,
				pdf: 5
			}
		}
	}
};