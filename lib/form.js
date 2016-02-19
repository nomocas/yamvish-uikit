// --buddyfile: ./scss/_form.scss

var y = require('yamvish');


module.exports = y.toAPI('uikit', {
	flatInput: function(value, placeholder, templ) {
		return this.input('text', value, y().cl('input--flat').attr('placeholder', placeholder), templ);
	},
	// opts = { id:'email', ?val:'', path:'email', icon:'user', placeholder:'email', required:true }
	formfield: function(opts) {
		return this.div(
			y()
			.cl('clearfix')
			.label(
				y().attr('for', opts.id)
				.faicon(opts.icon)
			)
			.input(opts.type || 'text', (typeof opts.val !== 'undefined') ? opts.val : '{{ ' + opts.path + ' }}',
				y().attr('id', opts.id)
				.attr('placeholder', opts.placeholder)
				.attr('required', opts.required)
			)
			.div(
				y().visible('{{ $error.' + opts.path + ' }}')
				.cl('formfield-error')
				.text('{{ $error.' + opts.path + '.detail }}')
			)
		);
	}
});
