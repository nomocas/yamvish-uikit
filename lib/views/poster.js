// --buddyfile: ../scss/views/_poster.scss
var y = require('yamvish'),
	Swapable = require('nomocas-webutils/lib/swapable');

var uikit = module.exports = y.toAPI('uikit', {
	poster: function(path, templ, dico, menu) {
		return this
			.div(y().cl('poster')
				.use(templ)
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
						})
					})
					// ____________ ITEMS
					.each(path,
						y().switch('{{ type }}', dico || {
							'h1': y().use('uikit:posterH1'),
							'h2': y().use('uikit:posterH2'),
							'headline': y().use('uikit:posterHeadline'),
							'text': y().use('uikit:posterText'),
							'media': y().use('uikit:posterMedia'),
						}, true /* destruct on switch */ ),
						null,
						// eacher initialiser
						function(eacher, context, node, container) {
							eacher.on('item-pushed', function(eacher, itemContainer) {
								y.utils.appendContainerTo(itemContainer, node);
							});
						}
					)
					// __________ END ITEMS
				)
				// ADD ITEMS MENU
				.posterContentMenu(menu ||
					y()
					.set({
						addH1: function() {
							this.push(path, { type: 'h1', content: 'default title' });
						},
						addH2: function() {
							this.push(path, { type: 'h2', content: 'default title' });
						},
						addHeadline: function() {
							this.push(path, { type: 'headline', content: 'default text' });
						},
						addText: function() {
							this.push(path, { type: 'text', content: 'default text' });
						},
						addImage: function() {
							this.push(path, { type: 'media', mediaType: 'image', uri: '/statics/img/avatar.png' });
						}
					})
					.button(y().cl('box-button').faicon('header').click('addH1'))
					.button(y().cl('box-button').faicon('header').click('addH2'))
					.button(y().cl('box-button').faicon('header').click('addHeadline'))
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
			.mousedown(function(e) {
				if (!y.Wysiwyg.currentlyFocused || y.Wysiwyg.currentlyFocused.editedNode !== e.target)
					this.parent.call('hideWysiwyg');
			})
			.dom(function(context, node) {
				context.parent.call('addSwapableItem', node, context);
			}),
			content
		);
	},
	//__________________________________________________ POSTER ITEMS WIGETS
	posterH1: function() {
		return this.posterItem(
			y().h(1, y().contentEditable('{{ content }}', '{{ !!$parent.$ui.editMode }}'))
		);
	},
	posterH2: function() {
		return this.posterItem(
			y().h(2, y().contentEditable('{{ content }}', '{{ !!$parent.$ui.editMode }}'))
		);
	},
	posterHeadline: function() {
		return this.posterItem(
			y().div(y().cl('poster-headline').contentEditable('{{ content }}', '{{ !!$parent.$ui.editMode }}'))
		);
	},
	posterText: function() {
		return this.posterItem(
			y().div(
				y().cl('poster-text')
				.wysiwyg('{{ content }}', '{{ !!$parent.$ui.editMode }}')
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
