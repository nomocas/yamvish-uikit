/* --buddyfile: ./scss/uikit.scss @test */

var y = require('yamvish');
require('./dialog');
require('./card');
require('./badges');
require('./dropdown');
require('./spinner');
require('./hamburger');
require('./form');
require('./images');
require('./buttons');
require('./modal');
require('./toggle-switch');
require('./bullet-nav');
require('./opengraph');

module.exports = y.toAPI('uikit', {
	faicon: function(type, templ) {
		return this.tag('i', y().cl('fa').cl('fa-' + type), templ);
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
