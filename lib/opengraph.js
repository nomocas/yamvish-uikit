// --buddyfile: ./scss/_buttons.scss
var y = require('yamvish');
require('yamvish/lib/output-engine/string');

module.exports = y.toAPI('uikit', {
	og: function(prop, content) {
		return this.tag('meta', y().attr('property', 'og:' + prop).attr('content', content));
	},
	opengraph: function(data) {
		for (var i in data)
			this.use('uikit:og', i, data[i]);
		return this;
	},
	opengraphView: function(data) {
		return this.view(
			y()
			.onAgora('opengraph:show', function(context, data) {
				var ogString = y().use('uikit:opengraph', data).toHTMLString();
				context.set('content', ogString);
			})
			.html('{{ content }}')
		);
	}
});

/*
	y().opengraph({
		url:'{{ url }}',
		title:'{{ title }}',
		description: '{{ description }}',
		site_name: 'made.in',
		image: '{{ $.y.baseURI + background.versions.mid }}',
		type: 'website',
		local:'{{ $env.language }}_BE'
	});
 */
