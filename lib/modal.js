// --buddyfile: ./scss/_modal.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	modal: function(onClose, content) {
		return this.div(
			y().cl('modali')
			.click(function(e) {
				if (e.target.classList.contains('modali'))
					onClose.call(this, e);
			})
			.div(
				y()
				.cl('modal-inner')
				.div(
					y().cl('modal-close')
					.click(onClose)
				),
				content
			)
		);
	}
});
