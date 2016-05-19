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
			y().onAgora('opengraph:show', function(context, data) {
				context.set('content', y().use('uikit:opengraph', data).toHTMLString());
			})
			.html('{{ content }}')
		);
	}
});

/*


 	// opengraph meta bloc

	y().opengraph({
		url:'{{ url }}',
		title:'{{ title }}',
		description: '{{ description }}',
		site_name: 'made.in',
		image: '{{ $.y.baseURI + background.versions.mid }}',
		type: 'website',
		local:'{{ $env.language }}_BE'
	});



	// VIEW

	y().opengraphView()

	and

	context.toAgora('opengraph:show', opengraphData)

	function opengraphData(context, howItWorks, language) {
		return {
			url: context.env.data.baseURI + '/howitworks',
			title: 'made.in : how it works',
			description: 'made.in value propositions',
			site_name: 'www.made.in',
			image: y.utils.getImagePath(context, howItWorks[0].image),
			type: 'website',
			local: (language ||  'fr') + '_BE'
		};
	}

 */
