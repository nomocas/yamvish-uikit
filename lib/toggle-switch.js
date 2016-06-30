// --buddyfile: ./scss/_toggle-switch.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	// type : '', alert, error, notice, success
	toggleSwitch: function(varPath) {
		return this.label(
			y().cl('label-switch')
			.input('checkbox', null, y().prop('checked', '{{' + varPath + '}}'))
			.div(y().cl('checkbox')
				.click(function(e) {
					console.log('click ', varPath, this.get(varPath))
					this.set(varPath, !e.target.previousSibling.checked);
				})
			)
		);
	}
});
