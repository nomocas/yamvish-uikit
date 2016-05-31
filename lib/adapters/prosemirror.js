var y = require('yamvish');
//_________________________________________ PROSE MIRRROR

if (y.isClient) {
	var prosemirror = require("prosemirror");
	require("prosemirror/dist/menu/tooltipmenu");
}

module.exports = y.toAPI('uikit', {
	prosemirror: function(opt, value) {
		if (!prosemirror || y.isServer)
			return this;
		var varPath;
		value = y.interpolable(value);
		if (value.__interpolable__) {
			if (value.dependenciesCount > 1)
				throw new Error("template.val could only depend to one variable.");
			varPath = value.parts[1].dep[0];
		}
		return this.dom(function(context, node) {
			var val = value.__interpolable__ ? value.output(context) : value;
			var editor = new prosemirror.ProseMirror({
				place: node,
				doc: val,
				docFormat: opt.docFormat || 'html',
				tooltipMenu: true
			});
			editor.on("change", function() {
				var content = editor.getContent('html');
				if (content === val)
					return;
				val = content;
				context.set(varPath, content);
			});
			if (value.__interpolable__)
				value.subscribeTo(context, function(value, type, path, key) {
					if (value === val)
						return;
					val = value;
					editor.setContent(value, 'html');
				});
		});
	}
});
