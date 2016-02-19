// --buddyfile: ./scss/_card.scss
var y = require('yamvish');

module.exports = y.toAPI('uikit', {
	wallCard: function(attr, title, content, footer) {
		return this.div(
			y().cl('wall-card')
			.div(
				y().cl('wall-card-content')
				.div(y().cl('wall-card-title'), title),
				content
			)
			.div(
				y().cl('wall-card-footer'),
				footer
			)
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
