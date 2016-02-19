// --buddyfile: ./scss/_badges.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	// type : '', alert, error, notice, success
	badge: function(content, type) {
		return this.span(
			y().cl('badge' + (type ? ('-' + type) : '')),
			content
		);
	}
});
