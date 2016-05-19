var y = require('yamvish');
//______________________________________ PERFECT SCROLL BAR
if (y.isClient)
	var Ps = require('perfect-scrollbar');

module.exports = y.toAPI('uikit', {
	perfectScroll: function() {
		return this.if(y.isClient && !y.isMacLike && !y.isMobile,
			y().dom(function(context, node) {
				Ps.initialize(node);
			})
		);
	}
});
