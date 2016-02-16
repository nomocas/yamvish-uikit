// --buddyfile: ./scss/_dialog.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	errorBox: function(templ) {
		return this.use('uikit:dialog', 'error', templ);
	},
	successBox: function(templ) {
		return this.use('uikit:dialog', 'success', templ);
	},
	infoBox: function(templ) {
		return this.use('uikit:dialog', 'info', templ);
	},
	warningBox: function(templ) {
		return this.use('uikit:dialog', 'warning', templ);
	},
	dialog: function(type, templ) {
		return this.div(
			y().cl('uik-dialog')
			.cl(type.type || type) // if "type" is attrMap : catch inner prop
			.a('#',
				y().cl('closed-button')
				.click(function(e) {
					y.utils.hide(e.target.parentNode);
				})
			),
			templ
		);
	}
});
