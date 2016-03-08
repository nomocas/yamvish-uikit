// --buddyfile: ./scss/_toggle-switch.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	// type : '', alert, error, notice, success
	toggleSwitch: function(varPath) {
		return this.label(
			y().cl('label-switch')
			.input('checkbox', null,
				y()
				.dom(function(context, node) {
					if (!!context.get(varPath))
						node.checked = true;
				})
			)
			.div(y().cl('checkbox')
				.click(function(e) {
					this.set(varPath, !e.target.previousSibling.checked);
					console.log(varPath, this.get(varPath))
				})
			)
		);
	}
});
