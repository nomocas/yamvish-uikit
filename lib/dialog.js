// --buddyfile: ./scss/_dialog.scss

var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	errorBox: function(templ, close) {
		return this.use('uikit:dialog', 'error', templ, close);
	},
	successBox: function(templ, close) {
		return this.use('uikit:dialog', 'success', templ, close);
	},
	infoBox: function(templ, close) {
		return this.use('uikit:dialog', 'info', templ, close);
	},
	warningBox: function(templ, close) {
		return this.use('uikit:dialog', 'warning', templ, close);
	},
	dialog: function(type, templ, close) {
		return this.div(
			y().cl('uik-dialog')
			.cl(type.type || type) // if "type" is attrMap : catch inner prop
			.a('#',
				y().cl('closed-button')
				.use(close)
			),
			templ
		);
	},
	//_________________________ CONTAINER Box _____________________________________

	containerDialog: function(type, path, content, close) {
		var xpr = y.interpolable('{{ ' + path + ' }}');
		return this.mountIf(xpr,
			y()[type](
				y()
				.fade()
				.use(content || y().text(xpr)),
				// close button template
				close || y().click(function(e) {
					e.targetContainer.unmount(true);
				})
			)
		);
	},
	containerErrorBox: function(path, content, close) {
		return this.containerDialog('errorBox', path, content, close);
	},
	containerSuccessBox: function(path, content, close) {
		return this.containerDialog('successBox', path, content, close);
	},
	containerInfoBox: function(path, content, close) {
		return this.containerDialog('infoBox', path, content, close);
	},
	containerWarningBox: function(path, content, close) {
		return this.containerDialog('warningBox', path, content, close);
	},

	// global dialog panels
	confirmPanel: function() {
		return this.agoraView('dialog:confirm',
			y()
			.toMethods({
				validate: function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
					this.data.callback(true);
				},
				cancel: function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
					this.data.callback(false);
				}
			})
			.div(
				y()
				.use('transition:fade')
				.cl('uik-dialog-background')
				.click(function(e) {
					if (e.target.classList.contains('uik-dialog-background'))
						this.data.cancel(e);
				})
				.infoBox(
					y().h(3, '{{ title }}')
					.p('{{ message }}')
					.div(
						y()
						.cl('pull-right')
						.button(
							y().cl('icon-button')
							.faicon('check')
							.click('validate')
						)
						.button(
							y().cl('icon-button')
							.faicon('times')
							.click('cancel')
						)
					),
					y().click('cancel')
				)
			)
		);
	},
	alertPanel: function() {
		return this.agoraView('dialog:alert',
			y()
			.toMethods('validate', function(e) {
				e.preventDefault();
				e.targetContainer.unmount(true);
				this.data.callback(true);
			})
			.div(
				y()
				.use('transition:fade')
				.cl('uik-dialog-background')
				.infoBox(
					y().h(3, '{{ title }}')
					.p('{{ message }}')
					.button(
						y().cl('icon-button')
						.faicon('check')
						.click('validate')
					),
					y().click('cancel')
				)
			)
		);
	}
});
