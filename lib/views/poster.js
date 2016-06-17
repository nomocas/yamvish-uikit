// --buddyfile: ../scss/views/_poster.scss
var y = require('yamvish'),
	Swapable = require('nomocas-webutils/lib/swapable'),
	applyRemote = true;

var uikit = module.exports = y.toAPI('uikit', {
	poster: function(opt /* opt : protocol, path, ?rootTempl, ?itemsSwitch, ?menuContent*/ ) {
		return this
			.toMethods({
				patchItem: function(e) {
					if (!applyRemote)
						return;
					y.c3po.patch(opt.protocol, this.data.id, e.value, e.context.path + '.' + e.path)
						.log('patchItem item result');
				},
				deleteItem: function(path, index) {
					this.del(path);
					if (!applyRemote)
						return;
					y.c3po.remote(opt.protocol, 'deleteproperty', { id: this.data.id, path: opt.path + '.' + index })
						.log('delete item result');
				},
				insertItem: function(path, index, data) {
					this.insertItem(path, { data: data, index: index  });
					if (!applyRemote)
						return;
					y.c3po.remote(opt.protocol, 'insertitem', { id: this.data.id, path: opt.path, index: index, data: data })
						.log('insert item result');
				}
			})
			.div(
				y()
				.cl('poster')
				.use(opt.rootTempl)
				.button('edit Mode',
					y()
					.cl('box-button')
					.cl('edit-button')
					.click(function(e) {
						this.toggle('$ui.editMode');
					})
				)
				.div(
					y()
					.cl('poster-items')
					.click(function() {
						this.set('$ui.showButtonsPanel', false);
					})
					//____________ SWAPABLE
					.dom(function(context, node, args, container) {
						var swapable = new Swapable({ axis: 'y', container: node, delegateDragEnd: true });
						context.toMethods('addSwapableItem', function(node, context) {
							swapable.add(node, context);
						});
						context.toMethods('removeSwapableItem', function(node) {
							swapable.remove(node);
						});
						swapable.on('nodeDisplaced', function(geom, fromIndex, toIndex) {
							context.displaceItem(opt.path, { fromIndex: fromIndex, toIndex: toIndex });
							if (!applyRemote)
								return;
							y.c3po.remote(opt.protocol, 'displaceitem', { id: context.data.id, path: opt.path, fromIndex: fromIndex, toIndex: toIndex })
								.log('displace item result');
						});
					})
					// ____________ ITEMS
					.each(opt.path,
						y().use('uikit:posterItem', opt),
						null,
						// eacher initialiser
						function(eacher, contextEacher, context, node, container) {
							eacher.on('pushItem', function(itemContainer) {
								if (!applyRemote)
									return;
								y.c3po.remote(opt.protocol, 'pushitem', { id: context.data.id, data: itemContainer.context.output(), path: opt.path  })
									.log('push item result');
							});
						}
					)
					// __________ END ITEMS
				)
				// ADD ITEMS MENU
				.posterContentMenu(opt.menuContent || y().posterDefaultContentMenu(opt))
			);
	},
	// ___________________________________ MENUS
	posterContentMenu: function(menu) {
		return this.mountIf('{{ $ui.editMode }}',
			y().div(
				y()
				.fade()
				.cl('poster-content-menu')
				.button(
					y().cl('icon-button')
					.cl('plus-button')
					.faicon('plus')
					.click(function(e) {
						e.stopPropagation();
						e.preventDefault();
						this.set('$ui.showButtonsPanel', true);
					})
				)
				.mountIf('{{ $ui.showButtonsPanel }}',
					y().div(
						y().fade()
						.cl('poster-content-menu-panel'),
						menu
					)
				)
			)
		);
	},
	posterDefaultContentMenu: function(opt) {
		return this
			.toMethods({
				addH1: function(e, index) {
					this.push(opt.path, { type: 'h1', content: 'default title' });
				},
				addH2: function(e, index) {
					this.push(opt.path, { type: 'h2', content: 'default title' });
				},
				addHeadline: function(e, index) {
					this.push(opt.path, { type: 'headline', content: 'default text' });
				},
				addText: function(e, index) {
					this.push(opt.path, { type: 'text', content: 'default text' });
				},
				addImage: function(e, index) {
					this.push(opt.path, { type: 'media', mediaType: 'image', uri: '/statics/img/avatar.png' });
				}
			})
			.button(y().cl('box-button').text('h').tag('sup', 1).click('addH1'))
			.button(y().cl('box-button').text('h').tag('sup', 2).click('addH2'))
			.button(y().cl('box-button').faicon('quote-right').click('addHeadline'))
			.button(y().cl('box-button').faicon('align-justify').click('addText'))
			.button(y().cl('box-button').faicon('picture-o').click('addImage'));
	},
	//__________________________________________________ POSTER ITEM MENU
	posterItemMenu: function(templ) {
		return this.client(
			y().div(
				y()
				.visible('{{ $parent.$ui.editMode }}')
				.cl('poster-item-menu')
				.button(
					y()
					.cl('box-button')
					.faicon('trash')
					.click(function(e) {
						this.parent.call('deleteItem', this.path, this.index);
					})
				),
				templ
			)
		);
	},
	//__________________________________________________ POSTER ITEM WRAPPER
	posterItem: function(opt) {
		return this.div(
			y().cl('poster-item')
			.cl('edited-mode', '{{ $parent.$ui.editMode }}')
			.dom(function(context, node, args, container) {
				var parent = context.parent;
				parent.call('addSwapableItem', node, context);
				container.on('destroyed', function() {
					parent.call('removeSwapableItem', node);
				});
			})
			.switch('{{ type }}', opt.itemsSwitch || {
				// default items
				'h1': 'uikit:posterH1',
				'h2': 'uikit:posterH2',
				'headline': 'uikit:posterHeadline',
				'text': 'uikit:posterText',
				'media': 'uikit:posterMedia'
			}, true /* destruct on switch */ )
		);
	},
	//__________________________________________________ POSTER ITEMS WIDGETS
	posterH1: function() {
		return this
			.posterItemMenu( /* ?menuTempl */ )
			.h(1,
				y().contentEditable({
					value: '{{ content }}',
					flag: '{{ $parent.$ui.editMode }}',
					onUpdate: '$parent.patchItem',
					eventName: 'blur'
				})
			);
	},
	posterH2: function() {
		return this
			.posterItemMenu( /* ?menuTempl */ )
			.h(2, y().contentEditable({
				value: '{{ content }}',
				flag: '{{ $parent.$ui.editMode }}',
				onUpdate: '$parent.patchItem',
				eventName: 'blur'
			}));
	},
	posterHeadline: function() {
		return this
			.posterItemMenu( /* ?menuTempl */ )
			.div(
				y().cl('poster-headline')
				.contentEditable({
					value: '{{ content }}',
					flag: '{{ $parent.$ui.editMode }}',
					onUpdate: '$parent.patchItem',
					eventName: 'blur'
				})
			);
	},
	posterText: function() {
		return this
			.posterItemMenu( /* ?menuTempl */ )
			.div(
				y().cl('poster-text')
				.wysiwyg('{{ content }}', '{{ !!$parent.$ui.editMode }}', '$parent.patchItem')
			);
	},
	posterMedia: function() {
		return this
			.posterItemMenu( /* ?menuTempl */ )
			.div(
				y().cl('poster-media')
				.switch('{{ mediaType }}', {
					'image': y().div(y().background('{{ uri }}').cl('poster-image')),
					'youtube': y().div()

				})
			);
	}
});


/**
 * poster
 * {
		//...
 * 		content:[
 * 			{
 * 				type:'h1',
 * 				uri:'...'
 * 			},
 * 			{
 * 				type:'h2',
 * 				content:'.....'
 * 			},
 * 		 	{
 * 		 		type:'headline'
 * 		 	 	content:'...'
 * 		 	},
 * 		 	{
 * 		 		type:'text',
 * 		 		content:'...'
 * 		 	},
 * 		 	{
 * 		 		type:'media',
 * 		 		mediaType:'image',
 * 		 		uri:'String'
 * 		 	}
 * 		]
 * }
 */
