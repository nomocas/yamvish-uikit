// --buddyfile: ./scss/_toggle-switch.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	// type : '', alert, error, notice, success
	toggleSwitch: function(varPath) {
		return this.label(
			y().cl('label-switch')
			.input('checkbox', null,
				y()
				.prop('checked', '{{ !!' + varPath + ' }}')
				.click(function(e) {
					this.set(varPath, e.target.checked);
				})
			)
			.div(y().cl('checkbox'))
		);
	}
});
