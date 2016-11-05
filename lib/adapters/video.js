var yam = require('yamvish'),
	y = require('./uikit-api');
embed = require('embed-video'),
	fitVids = require('nomocas-webutils/lib/fitvids');

yam.Template.prototype.fitVids = function(options) {
	return this
		.dom(function(context, node) {
			setTimeout(function() {
				fitVids($(node), $, options);
			}, 100);
		});
};

yam.Template.prototype.fittedVideo = function(urlPath, options) {
	return this.html('{{ ' + urlPath + ' | embed() }}')
		.fitVids(options);
}

yam.Filter.prototype.embed = function(options) {
	this._queue.push(function(input) {
		return embed(input);
	});
	return this;
};