// --buddyfile: ./scss/_hamburger.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	hamburgerRot: function(templ) {
		return this.button(
			y().cl('c-hamburger')
			.cl('c-hamburger--rot')
			.span('toggle menu')
			.dom(function(context, node) {
				node.addEventListener('click', function(e) {
					$(e.target).toggleClass("is-active");
				});
			}),
			templ
		);
	},
	hamburgerX: function(templ) {
		return this.button(
			y().cl('c-hamburger')
			.cl('c-hamburger--htx')
			.cl('is-active')
			.span('toggle menu')
			.dom(function(context, node) {
				node.addEventListener('click', function(e) {
					$(e.target).toggleClass("is-active");
				});
			}),
			templ
		);
	},
	hamburgerLeftArrow: function(templ) {
		return this.button(
			y().cl('c-hamburger')
			.cl('c-hamburger--htla')
			.span('toggle menu')
			.dom(function(context, node) {
				node.addEventListener('click', function(e) {
					$(e.target).toggleClass("is-active");
				});
			}),
			templ
		);
	},
	hamburgerRightArrow: function(templ) {
		return this.button(
			y().cl('c-hamburger')
			.cl('c-hamburger--htra')
			.span('toggle menu')
			.dom(function(context, node) {
				node.addEventListener('click', function(e) {
					$(e.target).toggleClass("is-active");
				});
			}),
			templ
		);
	}
});
