var yamvish = require('yamvish'),
	y = yamvish.initializer();

module.exports = yamvish.toAPI('uikit', {
	sidePanel: function(side) {
		return this.div(
			y().cl('facet-menu-panel')
			.slideLeft({
				max: '270px',
				delay: 700,
				ms: 200
			})
			.dom(function(context, node, args, container) {
				var evtListener = function(e) {
					if (e.target !== node)
						container.unmount(true);
				};
				container.on('mounted', function() {
					setTimeout(function() {
						document.body.addEventListener('click', evtListener);
					}, 100)
				});
				container.on('unmounted', function() {
					document.body.removeEventListener('click', evtListener);
				});
			})
			.iconButton('times', y().cl('facet-menu-panel-close-button').click(function(e) {
				e.targetContainer.unmount(true);
			}))
			.div(
				y()
				.cl('facet-menu-panel-content')
				.loggedAs()
				.use('app:facetsListMenu')
				.br()
				.br()
				.boxButton('logout', y().click(function() {
					var self = this;
					y.env.logout().then(function() {
						self.navigateTo('/');
					})
				}))
			)
		);
	}
});