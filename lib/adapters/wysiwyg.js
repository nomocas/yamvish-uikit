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
			if (value.dependenciesCount > 1)
				throw new Error("template.val could only depend to one variable.");
			varPath = value.parts[1].dep[0];
		}
		return this.prop('contentEditable', typeof flag === 'undefined' ? true : flag)
			.dom(function(context, node) {
				var wysiwyg = new y.Wysiwyg(node),
					freeze;
				wysiwyg.on('update', function(e) {
					freeze = true;
					node.classList[!e.detail.value ? 'add' : 'remove']('empty');
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
					node.classList[!wysiwyg._value ? 'add' : 'remove']('empty');
					context.subscribe(varPath, function(value, type, path, key) {
						if (freeze)
							return;
						y.utils.emptyNode(node);
						y.utils.insertHTML(value, node);
						node.classList[!value ? 'add' : 'remove']('empty');
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
