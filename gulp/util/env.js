var minimist = require('minimist');

var knownOptions = {
	string: 'env',
	default: {
		env: process.env.NODE_ENV || 'dev'
	}
};
module.exports = minimist(process.argv.slice(2), knownOptions);
