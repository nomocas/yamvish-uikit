// --buddyfile: ./scss/_dropdown.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	dropDown: function(label, items) {
		return this.div(
			y()
			.cl('dropdown')
			.cl('dropdown--small')
			.use(label)
			.ul(
				y().cl('dropdown-content')
				.each(items,
					y().li(y().a('#', '{{ $this }}'))
				)
			)
		);
	}
});
