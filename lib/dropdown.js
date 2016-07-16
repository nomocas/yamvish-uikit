// --buddyfile: ./scss/_dropdown.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	dropDown: function(label, items, itemTempl, top) {
		return this.div(
			y()
			.attr('tabindex', 0)
			.cl('dropdown')
			.if(top, y().cl('dropdown--top', top))
			// .cl('dropdown--small')
			.text(label)
			.ul(
				y().cl('dropdown-content')
				.each(items,
					y().li(itemTempl)
				)
			)
		);
	}
});
