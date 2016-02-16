// --buddyfile: ./scss/_images.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	'screen-cell': function(attr, content) {
		attr = attr || {};

		var inner = y().cl('screen-cell');
		if (attr.background)
			inner.css('background', 'url(' + attr.background + ') no-repeat center center')
			.css('background-size', 'cover');
		inner.div(
			y().cl('content')
			.div(
				y().cl('inner-content'),
				content
			)
		);

		return this.div(
			y().cl('screen-cell')
			.use(inner)
		);
	}
});
