/* --buddyfile: ./scss/uikit.scss @test */

var y = require('yamvish');
require('./dialog');
require('./card');
require('./dropdown');
require('./spinner');
require('./hamburger');
require('./form');
require('./images');

module.exports = y.toAPI('uikit', {
	breadCrumb: function(path) {

	},
	faicon: function(type, templ) {
		return this.tag('i', y().cl('fa').cl('fa-' + type), templ);
	},
	roundedButton: function(templ) {
		return this.a('#', y().cl('rounded-button'), templ);
	},

	// --buddyfile: ./scss/_uikit.scss @overflow-image
	/**
	 * add img intended to be filled-centered in parent tag surface (with overflow hidden)
	 * use in conjonction with @mixin overflow-image from buddyfile on parent tag selector.
	 *
	 * @example
	 * // in your js
	 * y().div(y().cl('.my-selector').overflowImage('path/to/image'));
	 * // in your scss (to produce round centered image with border)
	 * .my-selector {
	 * 		@include overflow-image(80px, 80px);
	 * 		border-radius: 50%;
	 * 		border: 2px solid white;
	 * }
	 * @param  {String} src   the image source path
	 * @param  {Template} templ optional template to apply on img tag
	 * @return {Template}       current template instance
	 */
	overflowImage: function(src, templ) {
		return this.img(src, y()
			.on('load', function(e) {
				var node = e.target;
				if (node.naturalWidth > node.naturalHeight) {
					node.classList.add('landscape');
					node.style = 'left:' + ((node.clientHeight - node.clientWidth) / 2) + 'px;';
				} else {
					node.classList.remove('landscape');
					node.style = 'left:0;';
				}
			}),
			templ
		);
	},


	collapsable: function(id, templ) {
		return this.div(
			y().id(id)
			.cl('closed', '{{ ui.' + id + '.closed }}')
			.subscribe('ui.' + id + '.closed', function(value) {
				if (value)
				;
			})
			.on('transitionend', function(e) {
				if (this.data.ui[id].closed)
					e.target.dispatchEvent(new Event('closed'));
				else
					e.target.dispatchEvent(new Event('opened'));
			}),
			templ
		);
	}
});



/*

	Todo : 


		subscribe
		on/off
		==> event with 
			e.target = node

	+ sub :
			e.value
			e.path
			e.type
			e.key


	+ dom/string/firstPass/secondPass/exec
		


 */
