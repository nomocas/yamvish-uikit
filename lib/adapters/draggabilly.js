var y = require('yamvish'),
	Draggabilly = require('draggabilly'),
	upper;

module.exports = y.toAPI('uikit', {
	draggabilly: function(opt, start, move, drop) {
		if (!y.isClient)
			return;

		return this
			.cl('draggable')
			.if(!noHandle, y().div(y().cl('handle')))
			.mousedown(function(e) {
				if (upper === e.originalNode)
					return;
				if (upper)
					upper.style.zIndex = 0;
				upper = e.originalNode;
				upper.style.zIndex = 1000;
			})
			.dom(function(context, node, args, container) {
				setTimeout(function() {

					var draggie = new Draggabilly(node, opt);
					// events : staticClick pointerUp pointerMove pointerDown dragStart dragMove dragEnd
					draggie.on('dragStart', function(event, pointer) {
						console.log('drag start : ', event, pointer);
					});
					draggie.on('dragMove', function(event, pointer, moveVector) {
						// console.log('drag move : ', event, pointer)
					});
					draggie.on('dragEnd', function(event, pointer) {
						console.log('drag end : ', event, pointer);
					});

					// draggie.disable()
					// draggie.enable();
					// draggie.destroy()
					console.log('draggie at ' + draggie.position.x + ', ' + draggie.position.y)
				}, 200);
			});
		return this;
	}
});
