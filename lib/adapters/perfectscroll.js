var y = require('yamvish'),
	y = require('./uikit-api');
//______________________________________ PERFECT SCROLL BAR
if (yam.isClient)
	var Ps = require('perfect-scrollbar');

module.exports = yam.toAPI('uikit', {
	perfectScroll: function() {
		if (yam.isClient && !yam.isMacLike && !yam.isMobile)
			return this.dom(function(context, node) {
				Ps.initialize(node);
			});
		return this;
	}
});