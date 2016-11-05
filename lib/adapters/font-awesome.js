var yamvish = require('yamvish'),
	y = require('./uikit-api');

module.exports = yamvish.toAPI('uikit', {
	fontawesomeLink: function() {
		return this.cssLink('https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css');
	},
	faicon: function(type, templ) {
		return this.tag('i', y.cl('fa').cl('fa-' + type), templ);
	}
});