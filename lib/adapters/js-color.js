var yam = require('yamvish');
y = require('./uikit-api');
//______________________________________ PERFECT SCROLL BAR
if (y.isClient)
	var jscolor = require('jscolor');

module.exports = yam.toAPI('uikit', {
	colorPicker: function() {
		return this.p('color : ',
			y.tag('input',
				y.dom(function(context, node) {
					var picker = new jscolor(node);
					node.addEventListener('change', function(e) {
						context.set('color', picker.toHEXString());
					});
					picker.fromString(context.get('color') || '#ab2567');
				})
			)
		);
	}
});