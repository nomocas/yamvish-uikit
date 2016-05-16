// --buddyfile: ./scss/_sharebar.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	sharebar: function() {
		return this.agoraView(
			y().div(
				y().cl('spinner')
				.div(y().cl('double-bounce1'))
				.div(y().cl('double-bounce2'))
			)
		);
	}
});
