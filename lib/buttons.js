// --buddyfile: ./scss/_buttons.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	roundedButton: function(templ) {
		return this.a('#', y().cl('rounded-button'), templ);
	},
	iconButton: function(icon, content) {
		return this.button(y().cl('icon-button').faicon(icon), content);
	},
	boxButton: function(content) {
		return this.button(y().cl('box-button'), content);
	}
});
