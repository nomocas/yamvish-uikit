// --buddyfile: ../scss/views/_poster.scss

var yam = require('yamvish'),
	y = require('./uikit-api'),
	embed = require('embed-video'),
	fitVids = require('nomocas-webutils/lib/fitvids');

yam.utils.validUri = /^(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/;

require('../adapters/swapable');
require('../adapters/wysiwyg');

yam.toAPI('poster', {
	/*******************************************************************************
	 * 
	 * 
	 * POSTER COMMON
	 *
	 * 
	 *******************************************************************************/
	// ______________________________ main poster function
	poster: function(opt /*{ path:'myam.items', editModePath, menu, allowAddItem }*/ ) {
		var menuPath = '$ui.' + opt.path + '.additemsButtonsContainer',
			menu = y.use('poster:menu', opt.path, opt.menu || y.use('poster:defaultMenu'));
		return this.dom(function(context, node) {
				context.set(menuPath, menu.toContainer(context));
				context.subscribe(opt.path, function() {
					menu = this.get(menuPath);
					menu.unmount();
				}, true);
			})
			.div(
				y.cl('poster-items')
				.if(opt.swapable, y.swapableParent(opt.path, opt.editModePath ? '{{ ' + opt.editModePath + ' }}' : null))
				.each(opt.path, y.use('poster:item', opt.path, opt.swapable, opt.editModePath, menuPath, opt.allowAddItem))
				.if(opt.allowAddItem, y.use('poster:endMenu', menuPath, opt.editModePath))
			)
	},
	//________________________________ BASE CONTENT MENU
	menu: function(path, buttonsTempl) {
		if (buttonsTempl.forEach) {
			var t = y();
			buttonsTempl.forEach(function(button) {
				t.use(button);
			});
			buttonsTempl = t;
		}
		return this.view(
			y.toMethods({
				execute: function(e, data) {
					if (typeof this.data.insertToIndex !== 'undefined')
						this.parent.insertItem(path, {
							data: data,
							index: this.data.insertToIndex
						});
					else
						this.parent.push(path, data);
					e.targetContainer.unmount();
				}
			})
			.div(
				y()
				.cl('poster-menu-panel'),
				buttonsTempl
			)
		);
	},
	// BUTTON (+) AND Content MENU at end of poster
	endMenu: function(menuPath, editModePath) {
		return this.mountIf('{{ ' + editModePath + ' }}',
			y.div(
				y()
				.fade()
				.cl('poster-menu')
				.button(
					y.cl('icon-button')
					.cl('plus-button')
					.faicon('plus')
					.click(function(e) {
						var itemDiv = e.originalTarget.parentNode,
							menu = this.get(menuPath);
						menu.context.delete('insertToIndex');
						menu.mountBefore(itemDiv.parentNode, itemDiv);
					})
				)
			)
		);
	},

	//__________________________________________________ POSTER ITEM WRAPPER
	item: function(path, swapable, editModePath, menuPath, allowAddItem) {
		editModePath = '$parent.' + editModePath;
		var editFlag = yam.interpolable('{{ ' + editModePath + ' }}');
		return this.div(
			y.cl('poster-item')
			.cl('edited-mode', editFlag)
			.if(swapable, y.swapableItem(path))
			.if(allowAddItem, y.use('poster:interItemButton', editFlag, menuPath))
			.use('@layout', editFlag)
		);
	},
	//__________________________________________________ POSTER ITEM MENU
	itemMenu: function(editFlag, templ) {
		return this.client(
			y.div(
				y()
				.visible(editFlag)
				.cl('poster-item-menu')
				.button(
					y()
					.cl('box-button')
					.faicon('trash')
					.click(function(e) {
						this.parent.delete(this.path);
					})
				),
				templ
			)
		);
	},
	interItemButton: function(editFlag, menuPath) {
		return this.div(
			y.cl('poster-inter-button')
			.cl('edited-mode', editFlag)
			.mountIf(editFlag,
				y.button(
					y.cl('icon-button')
					.cl('plus-button')
					.faicon('plus')
					.click(function(e) {
						var itemDiv = e.originalTarget.parentNode.parentNode,
							menu = this.parent.get(menuPath);
						menu.context.set('insertToIndex', this.index);
						menu.mountBefore(itemDiv.parentNode, itemDiv);
					})
				)
			)
		);
	},
	/*******************************************************************************
	 * 
	 * 
	 * DEFAULT MENU AND WIDGETS
	 *
	 * 
	 *******************************************************************************/
	defaultMenu: function(templ) {
		return this.toMethods({
				addH1: function(e) {
					this.call('execute', e, {
						layout: 'poster:h1',
						content: 'First Level Title'
					});
				},
				addH2: function(e) {
					this.call('execute', e, {
						layout: 'poster:h2',
						content: 'Second Level Title'
					});
				},
				addHeadline: function(e) {
					this.call('execute', e, {
						layout: 'poster:headline',
						content: 'A cool headline...'
					});
				},
				addText: function(e) {
					this.call('execute', e, {
						layout: 'poster:text',
						content: 'Some text...'
					});
				},
				addImage: function(e) {
					this.call('execute', e, {
						layout: 'poster:image',
						uri: '/statics/img/avatar.png'
					});
				},
				addVideo: function(e) {
					this.call('execute', e, {
						layout: 'poster:video',
						uri: ''
					});
				}
			})
			.button(y.cl('box-button').text('h').tag('sup', 1).click('addH1'))
			.button(y.cl('box-button').text('h').tag('sup', 2).click('addH2'))
			.button(y.cl('box-button').faicon('quote-right').click('addHeadline'))
			.button(y.cl('box-button').faicon('align-justify').click('addText'))
			.button(y.cl('box-button').faicon('picture-o').click('addImage'))
			.button(y.cl('box-button').faicon('video-camera').click('addVideo'))
			.use(templ);
	},
	h1Button: function() {
		return this.button(
			y.cl('box-button').text('h').tag('sup', 1)
			.click(function(e) {
				this.call('execute', e, {
					layout: 'poster:h1',
					content: 'First Level Title'
				});
			})
		);
	},
	//__________________________________________________ POSTER ITEMS WIDGETS
	h1: function(editFlag) {
		// console.log('poster edit flag : ', editFlag);
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.h(1, y.contentEditable({
				value: '{{ content }}',
				flag: editFlag,
				eventName: 'blur'
			}));
	},
	h2: function(editFlag) {
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.h(2, y.contentEditable({
				value: '{{ content }}',
				flag: editFlag,
				eventName: 'blur'
			}));
	},
	headline: function(editFlag) {
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.div(
				y.cl('poster-headline')
				.contentEditable({
					value: '{{ content }}',
					flag: editFlag,
					eventName: 'blur'
				})
			);
	},
	text: function(editFlag) {
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.div(
				y.cl('poster-text')
				.wysiwyg('{{ content }}', editFlag)
			);
	},
	image: function(editFlag) {
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.div(
				y.cl('poster-image')
				.background('{{ uri }}')
			);
	},
	video: function(editFlag) {
		var urlXpr = yam.interpolable('{{ uri }}'),
			options = {};
		return this
			.use('poster:itemMenu', editFlag /* ,?menuTempl */ )
			.div(
				y()
				.cl('poster-video')
				.mountIf('{{ !!uri && !$error.badURI }}',
					y.div(
						y()
						.dom(function(context, node) {
							var update = function(value) {
								if (value) {
									var output = embed(value, options);
									if (!output)
										context.set('$error.badURI', true);
									else {
										yam.utils.emptyNode(node);
										yam.utils.insertHTML(output, node);
										fitVids($(node), $, options);
									}
								} else
									yam.utils.emptyNode(node);
							};
							urlXpr.subscribeTo(context, update);
							update(context.get('uri'));
						})
					)
				)
				.mountIf('{{ $error.badURI }}', y.errorBox('bad video url'))
				.mountIf('{{ !uri || $error.badURI }}',
					y.input('text', '',
						y.attr('placeholder', 'paste video url here')
						.visible(editFlag)
						.on('input', function(e) {
							if (e.target.value && !yam.utils.validUri.test(e.target.value))
								this.set('$error.badURI', true);
							else {
								this.set('$error.badURI', false);
								this.set('uri', e.target.value);
							}
						})
					)
				)
			);
	}
});