const fs = require('fs');

module.exports = {
  key: fs.readFileSync(`${__dirname}/server.key`),
  cert: fs.readFileSync(`${__dirname}/server.crt`),
	passphrase: 'vsdvdfbdfngfbert3v4v243y45yvhry45ev'
};