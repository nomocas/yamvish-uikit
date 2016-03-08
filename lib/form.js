// --buddyfile: ./scss/_form.scss

var y = require('yamvish');


module.exports = y.toAPI('uikit', {
	flatInput: function(value, placeholder, templ) {
		return this.input('text', value, y().cl('input--flat').attr('placeholder', placeholder), templ);
	},
	// opts = { id:'email', ?val:'', path:'email', icon:'user', placeholder:'email', required:true }
	inputField: function(opts) {
		return this.div(
			y()
			.cl('input-field')
			.if(opts.icon,
				y()
				.label(
					y().attr('for', opts.id)
					.faicon(opts.icon)
				)
			)
			.input(opts.type || 'text', (typeof opts.val !== 'undefined') ? opts.val : '{{ ' + opts.path + ' }}',
				y().attr('id', opts.id)
				.attr('placeholder', opts.placeholder)
				.attr('required', opts.required)
				.if(opts.icon, y().cl('labeled'))
			)
			.div(
				y().visible('{{ $error.' + opts.path + ' }}')
				.cl('formfield-error')
				.text('{{ $error.' + opts.path + '.detail }}')
			)
		);
	},
	// opts = { id:'email', ?val:'', path:'email', icon:'user', placeholder:'email', required:true }
	textareaField: function(opts) {
		return this.div(
			y()
			.cl('clearfix')
			.textarea(
				y().attr('id', opts.id)
				.attr('placeholder', opts.placeholder)
				.attr('required', opts.required)
				.attr('rows', opts.rows),
				'{{ ' + opts.path + ' }}'
			)
			.div(
				y().visible('{{ $error.' + opts.path + ' }}')
				.cl('formfield-error')
				.text('{{ $error.' + opts.path + '.detail }}')
			)
		);
	},
	submitButton: function(title) {
		return this.input('submit', title);
	}
});
