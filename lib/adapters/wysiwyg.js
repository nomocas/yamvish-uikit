var y = require('yamvish');
if (y.isClient)
	y.Wysiwyg = require('mini-wysiwyg');

module.exports = y.toAPI('uikit', {
	wysiwyg: function(value, flag) {
		if (!y.Wysiwyg)
			return this;
		var varPath;
		value = y.interpolable(value);
		if (value.__interpolable__) {
			if (value.dependenciesCount > 1)
				throw new Error("template.val could only depend to one variable.");
			varPath = value.parts[1].dep[0];
		}
		return this.attr('contenteditable', flag)
			.dom(function(context, node) {
				var wysiwyg = new y.Wysiwyg(node),
					freeze;
				wysiwyg.on('update', function(e) {
					freeze = true;
					context.set(varPath, e.detail.value);
					freeze = false;
				});
				if (varPath) {
					y.utils.insertHTML(context.get(varPath), node);
					context.subscribe(varPath, function(value, type, path, key) {
						if (freeze)
							return;
						y.utils.insertHTML(value, node);
					});
				}
			});
	}
});
