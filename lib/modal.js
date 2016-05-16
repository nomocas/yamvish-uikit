// --buddyfile: ./scss/_modal.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	modal: function(onClose, content, backgroundTempl) {
		return this.div(
			y().cl('modali')
			.click(function(e) {
				if (e.target.classList.contains('modali'))
					onClose.call(this, e);
			})
			.use(backgroundTempl)
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
	},
	agoraModal: function(channel, content, backgroundTempl) {
		return this.agoraView(channel,
			y().use('uikit:modal', function(e) {
				e.targetContainer.unmount(true);
			}, content, backgroundTempl)
		);
	}
});
