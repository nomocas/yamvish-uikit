var y = require('yamvish'),
	embed = require('embed-video'),
	fitVids = require('nomocas-webutils/lib/fitvids');

y.Template.prototype.fitVids = function(options) {
	return this
		.dom(function(context, node) {
			setTimeout(function() {
				fitVids($(node), $, options);
			}, 100);
		});
};

y.Template.prototype.fittedVideo = function(urlPath, options) {
	return this.html('{{ ' + urlPath + ' | embed() }}')
		.fitVids(options);
}

y.Filter.prototype.embed = function(options) {
	this._queue.push(function(input) {
		return embed(input);
	});
	return this;
};
