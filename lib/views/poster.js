// --buddyfile: ../scss/views/_poster.scss
var y = require('yamvish'),
	Swapable = require('nomocas-webutils/lib/swapable');

var uikit = module.exports = y.toAPI('uikit', {
	poster: function(opt) {
		return this
			.div(y().cl('poster')
				.use(opt.templ)
				.button('edit Mode',
					y()
					.cl('box-button')
					.cl('edit-button')
					.click(function(e) {
						this.toggle('$ui.editMode');
					})
				)
				.div(
					y().cl('poster-items')
					.click(function() {
						this.set('$ui.showButtonsPanel', false);
					})
					//____________ SWAPABLE
					.dom(function(context, node) {
						var swapable = new Swapable({ axis: 'y', container: node });
						context.set('addSwapableItem', function(node, context) {
							swapable.add(node, context);
						});
						swapable.on('nodesSwapped', function(geom1, geom2) {
							// console.log('swapped : ', geom1, geom2);
							geom1.data.set('index', geom1.index);
							geom2.data.set('index', geom2.index);
							// y.c3po.patch(opt.protocol, this.data.id, e.value, e.context.path + '.index').log('auto patch index result');
						});
					})
					.set('autoPatch', function(e) {
						// y.c3po.patch(opt.protocol, this.data.id, e.value, e.context.path + '.' + e.path).log('auto patch result');
					})
					// ____________ ITEMS
					.each(opt.path,
						y().switch('{{ type }}', opt.dico || {
							'h1': y().use('uikit:posterH1'),
							'h2': y().use('uikit:posterH2'),
							'headline': y().use('uikit:posterHeadline'),
							'text': y().use('uikit:posterText'),
							'media': y().use('uikit:posterMedia')
						}, true /* destruct on switch */ ),
						null,
						// eacher initialiser
						function(eacher, context, node, container) {
							eacher.on('item-pushed', function(eacher, itemContainer) {
								// y.c3po.remote(opt.protocol, 'push', { id:this.data.id,  item:itemContainer.context.output(), path:eacher.path }).log('remote push result');
								if (itemContainer.context.data.index) {
									// find next sibling of index-1
									var nextSibling;
									y.utils.appendContainerTo(itemContainer, node, nextSibling);

								} else
									y.utils.appendContainerTo(itemContainer, node);
							});
						}
					)
					// __________ END ITEMS
				)
				// ADD ITEMS MENU
				.posterContentMenu(opt.menu ||
					y()
					.set({
						addH1: function(index) {
							index = typeof index === 'undefined' ? (this.get(opt.path).length - 1) : index;
							this.push(opt.path, { type: 'h1', content: 'default title', index: index });
						},
						addH2: function() {
							index = typeof index === 'undefined' ? (this.get(opt.path).length - 1) : index;
							this.push(opt.path, { type: 'h2', content: 'default title', index: index });
						},
						addHeadline: function() {
							index = typeof index === 'undefined' ? (this.get(opt.path).length - 1) : index;
							this.push(opt.path, { type: 'headline', content: 'default text', index: index });
						},
						addText: function() {
							index = typeof index === 'undefined' ? (this.get(opt.path).length - 1) : index;
							this.push(opt.path, { type: 'text', content: 'default text', index: index });
						},
						addImage: function() {
							index = typeof index === 'undefined' ? (this.get(opt.path).length - 1) : index;
							this.push(opt.path, { type: 'media', mediaType: 'image', uri: '/statics/img/avatar.png', index: index });
						}
					})
					.button(y().cl('box-button').text('h').tag('sup', 1).click('addH1'))
					.button(y().cl('box-button').text('h').tag('sup', 2).click('addH2'))
					.button(y().cl('box-button').faicon('quote-right').click('addHeadline'))
					.button(y().cl('box-button').faicon('align-justify').click('addText'))
					.button(y().cl('box-button').faicon('picture-o').click('addImage'))
				)
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
	posterItemMenu: function(templ) {
		return this.div(
			y()
			.visible('{{ $parent.$ui.editMode }}')
			.cl('poster-item-menu')
			.button(
				y().cl('box-button')
				.faicon('trash')
				.click(function(e) {
					this.parent.del(this.path);
				})
			),
			templ
		);
	},
	//__________________________________________________ POSTER ITEM WRAPPER
	posterItem: function(content, menu) {
		return this.div(
			y().cl('poster-item')
			.cl('edited-mode', '{{ $parent.$ui.editMode }}')
			.posterItemMenu(menu)
			.dom(function(context, node) {
				context.parent.call('addSwapableItem', node, context);
			}),
			content
		);
	},
	//__________________________________________________ POSTER ITEMS WIDGETS
	posterH1: function() {
		return this.posterItem(
			y().h(1, y().contentEditable({
				value: '{{ content }}',
				flag: '{{ $parent.$ui.editMode }}',
				onUpdate: '$parent.autoPatch'
			}))
		);
	},
	posterH2: function() {
		return this.posterItem(
			y().h(2, y().contentEditable({
				value: '{{ content }}',
				flag: '{{ $parent.$ui.editMode }}',
				onUpdate: '$parent.autoPatch'
			}))
		);
	},
	posterHeadline: function() {
		return this.posterItem(
			y().div(
				y().cl('poster-headline')
				.contentEditable({
					value: '{{ content }}',
					flag: '{{ $parent.$ui.editMode }}',
					onUpdate: '$parent.autoPatch'
				})
			)
		);
	},
	posterText: function() {
		return this.posterItem(
			y().div(
				y().cl('poster-text')
				.wysiwyg('{{ content }}', '{{ !!$parent.$ui.editMode }}', '$parent.autoPatch')
			)
		)
	},
	posterMedia: function() {
		return this.posterItem(
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
