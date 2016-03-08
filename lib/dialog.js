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
	'confirm-panel': function() {
		return this.agoraView('dialog:confirm',
			y().view(
				y()
				.use('transition:fade')
				.set('validate', function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
					this.data.callback(true);
				})
				.set('cancel', function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
					this.data.callback(false);
				})
				.div(
					y()
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
			)
		);
	},
	'alert-panel': function() {
		return this.agoraView('dialog:alert',
			y().view(
				y()
				.use('transition:fade')
				.set('validate', function(e) {
					e.preventDefault();
					e.targetContainer.unmount(true);
					this.data.callback(true);
				})
				.div(
					y()
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
			)
		);
	}
});
