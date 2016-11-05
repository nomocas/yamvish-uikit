var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	sharebar: function(gaCategory) {
		return this
			.agoraView('sharethis',
				y()
				.toMethods('gaEvent', function(e, type, url) {
					if (typeof ga !== 'undefined')
						ga('send', 'event', gaCategory || 'PersonasSharebar', type, url);
				})
				.div(
					y()
					.fade()
					.cl('sharethis-box')
					.a('http://www.facebook.com/sharer/sharer.php?u={{ url }}', y()
						.cl('icon-button')
						.faicon('facebook')
						.attr('target', '_blank')
						.click('gaEvent("facebook", url)')
					)
					.a('http://twitter.com/share?url={{ url }}', y()
						.cl('icon-button')
						.faicon('twitter')
						.attr('target', '_blank')
						.click('gaEvent("twitter", url)')
					)
					.a('http://www.linkedin.com/shareArticle?url={{ url }}&title={{ title | urlencode() }}', y()
						.cl('icon-button')
						.faicon('linkedin')
						.attr('target', '_blank')
						.click('gaEvent("linkedin", url)')
					)
					.a('http://pinterest.com/pin/create/button/?url={{ url }}&description={{ (title + " - " + description) | urlencode()  }}&media={{ image }}', y()
						.cl('icon-button')
						.faicon('pinterest')
						.attr('target', '_blank')
						.click('gaEvent("pinterest", url)')
					)
					.a('https://plus.google.com/share?url={{ url }}', y()
						.cl('icon-button')
						.faicon('google')
						.attr('target', '_blank')
						.click('gaEvent("google+", url)')
					)
					.a('mailto:?subject={{ title | urlencode() }}&body={{ (url +" - "+ description) | urlencode() }}', y()
						.cl('icon-button')
						.faicon('envelope')
						.click('gaEvent("mailto", url)')
					)
				)
			);
	}
});