var yam = require('yamvish'),
	y = require('./uikit-api'),
	gaStart = "<script>" +
	"(function(b, o, i, l, e, r) {" +
	"    b.GoogleAnalyticsObject = l;" +
	"    b[l] || (b[l] =" +
	"        function() {" +
	"            (b[l].q = b[l].q || []).push(arguments)" +
	"        });" +
	"    b[l].l = +new Date;" +
	"    e = o.createElement(i);" +
	"    r = o.getElementsByTagName(i)[0];" +
	"    e.src = '//www.google-analytics.com/analytics.js';" +
	"    r.parentNode.insertBefore(e, r)" +
	"}(window, document, 'script', 'ga'));" +
	"ga('create', '",
	gaEnd = "', 'auto'); ga('send', 'pageview'); </script>";

yam.gaEvent = function(category, type, data) {
	if (typeof ga !== 'undefined')
		ga('send', 'event', category, type, data);
};

module.exports = yam.toAPI('uikit', {
	ga: function(opt) {
		if (yam.isProduction)
			return this.raw(gaStart + opt.key + gaEnd);
		return this;
	}
});