var y = require('yamvish');
if (y.isClient)
	y.Wysiwyg = require('mini-wysiwyg');

module.exports = y.toAPI('uikit', {
	wysiwyg: function(value, flag, onUpdate) {
		if (!y.Wysiwyg)
			return this;
		if (typeof onUpdate === 'string')
			onUpdate = y.listenerParser.parseListener(onUpdate);
		var varPath;
		value = y.interpolable(value);
		if (value.__interpolable__) {
			value.assertSingleDependency();
			varPath = value.firstDependency();
		}
		return this.prop('contentEditable', typeof flag === 'undefined' ? true : flag)
			.dom(function(context, node) {
				var wysiwyg = new y.Wysiwyg(node),
					freeze;
				wysiwyg.on('update', function(e) {
					freeze = true;
					context.set(varPath, e.detail.value);
					if (onUpdate) {
						e.detail.context = context;
						e.detail.node = node;
						e.detail.path = varPath;
						onUpdate.call(context, e.detail);
					}
					freeze = false;
				});
				if (varPath) {
					wysiwyg._value = y.utils.insertHTML(context.get(varPath), node);
					context.subscribe(varPath, function(value, type, path, key) {
						if (freeze)
							return;
						y.utils.emptyNode(node);
						if (value)
							y.utils.insertHTML(value, node);
					});
				}
			});
	},
	wysiwygMenu: function() {
		return this.dom(function(context, node) {
			var menu = y.Wysiwyg.menu();
			node.appendChild(menu.el);
			context.set('$env.hideWysiwygMenu', function() {
				menu.hide();
			});
			context.set('$env.showWysiwygMenu', function() {
				menu.show();
			});
		});
	}
});
