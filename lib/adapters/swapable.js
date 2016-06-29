var y = require('yamvish'),
	Swapable = require('nomocas-webutils/lib/swapable');

module.exports = y.toAPI('uikit', {
	swapableParent: function(itemsPath, enabledXpr) {
		if (enabledXpr)
			enabledXpr = y.interpolable(enabledXpr);
		return this.dom(function(context, node, args, container) {
			var swapable = new Swapable({ axis: 'y', container: node, delegateDragEnd: true });
			context.toMethods({
				addSwapableItem: function(node, context) {
					swapable.add(node, context, context.index);
				},
				removeSwapableItem: function(node) {
					swapable.remove(node);
				}
			});
			if (enabledXpr)
				enabledXpr.subscribeTo(context, function(value) {
					swapable.enabled = !!value;
				});
			swapable.on('nodeDisplaced', function(geom, fromIndex, toIndex) {
				context.displaceItem(itemsPath, { fromIndex: fromIndex, toIndex: toIndex });
			});
		});
	},
	swapableItem: function() {
		return this.dom(function(context, node, args, container) {
			var parent = context.parent;
			parent.call('addSwapableItem', node, context);
			container.on('destroyed', function() {
				parent.call('removeSwapableItem', node);
			});
		});
	}
});
