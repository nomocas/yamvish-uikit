// --buddyfile: ./scss/_images.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	// .use('uikit:screen-cell', { background: '/img/some.png' }, 'hello screen cell')
	'screen-cell': function(attr, content) {
		attr = attr || {};
		var inner = y().cl('screen-cell');
		if (attr.background)
			inner.css('background', 'url(' + attr.background + ') no-repeat center center').css('background-size', 'cover');
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
	},
	background: function(url, backgroundSize) {
		url = y.interpolable(url);
		backgroundSize = backgroundSize || 'cover';
		return this.dom(function(context, node) {
			var update = function(value) {
				node.style.background = 'url(' + value + ') no-repeat center center';
				node.style.backgroundSize = backgroundSize;
			};
			if (url.__interpolable__) {
				node.binds = node.binds ||  [];
				url.subscribeTo(context, update, node.binds);
				update(url.output(context));
			} else
				update(url);
		});
	}
});
