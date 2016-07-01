var y = require('yamvish');
if (y.isClient)
	y.Wysiwyg = require('mini-wysiwyg');

module.exports = y.toAPI('uikit', {
	wysiwyg: function(value, flag, onUpdate) {
		var varPath;
		value = y.interpolable(value);
		if (!value.__interpolable__)
			throw new Error('template.wysiwyg need interpolable expression as first arguments : ' + value);
		varPath = value.assertSingleDependency().firstDependency();
		if (y.isServer)
			return this.string(function(context, descriptor) {
				descriptor.children = context.get(varPath);
			});
		if (typeof onUpdate === 'string')
			onUpdate = y.listenerParser.parseListener(onUpdate);

		return this.prop('contentEditable', typeof flag === 'undefined' ? true : flag)
			.dom(function(context, node) {
				node.binds = node.binds || [];
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
				wysiwyg._value = y.utils.insertHTML(context.get(varPath), node);
				wysiwyg.clean();
				context.subscribe(varPath, function(value, type, path, key) {
					if (freeze)
						return;
					y.utils.emptyNode(node);
					if (value)
						y.utils.insertHTML(value, node);
				}, false, node.binds);
			});
	},
	wysiwygMenu: function() {
		return this.dom(function(context, node) {
			var menu = y.Wysiwyg.menu();
			node.appendChild(menu.el);
			context.toMethods('$env.hideWysiwygMenu', function() {
				menu.hide();
			});
			context.toMethods('$env.showWysiwygMenu', function() {
				menu.show();
			});
		});
	}
});
