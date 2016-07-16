// --buddyfile: ./scss/_buttons.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	roundedButton: function(text, templ) {
		return this.button(y().cl('rounded-button'), text, templ);
	},
	iconButton: function(icon, templ) {
		return this.button(y().cl('icon-button').faicon(icon), templ);
	},
	boxButton: function(text, templ) {
		return this.button(y().cl('box-button'), text, templ);
	},
	roundedA: function(href, text, templ) {
		return this.a(href, y().cl('rounded-button'), text, templ);
	},
	iconA: function(href, icon, templ) {
		return this.a(href, y().cl('icon-button').faicon(icon), templ);
	},
	boxA: function(href, text, templ) {
		return this.a(href, y().cl('box-button'), text, templ);
	}
});
