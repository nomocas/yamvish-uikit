// --buddyfile: ./scss/_bullet-nav.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	bulletNav: function(collection) {
		return this.ul(
			y().cl('bullet-nav')
			.each(collection, y().li(y().a('#{{ anchorName }}')))
		);
	}
});
