// --buddyfile: ./scss/_spinner.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	spinner: function() {
		return this.div(
			y().cl('spinner')
			.div(y().cl('double-bounce1'))
			.div(y().cl('double-bounce2'))
		);
	}
});
