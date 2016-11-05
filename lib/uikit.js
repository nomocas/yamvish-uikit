/* --buddyfile: ./scss/uikit.scss @test */

var y = require('yamvish');

require('./uikit-api');
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
	collapsable: function(id, templ) {
		return this.div(
			y().id(id)
			.cl('closed', '{{ ui.' + id + '.closed }}')
			.subscribe('ui.' + id + '.closed', function(value) {
				if (value)
				;
			})
			.on('transitionend', function(e) {
				e.target.dispatchEvent(new Event(this.data.ui[id].closed ? 'closed' : 'opened'));
			}),
			templ
		);
	}
});