// --buddyfile: ./scss/_card.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	card: function(attr, title, content, footer) {
		return y().div(
			attr,
			y().cl('card')
			.div(
				y().cl('card-content')
				.if(opts.title,
					y().div(y().cl('card-title'), title)
				),
				content
			)
			.div(y().cl('card-footer'), footer)
		);
	}
});


/*
	<uikit:card class="bloupi goldberg">
		<yield>This is title</yield>
		<yield>This is content</yield>
		<yield>This is footer</yield>
	</uikit:card>
 */
