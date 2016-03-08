function ScrollSpy(sectionsParent, sectionSelector, navParent) {
	this.sectionsParent = sectionsParent;
	this.sectionSelector = sectionSelector;
	var self = this;
	this.update();
	window.addEventListener('scroll', function() {
		var scrollPosition = sectionsParent.scrollTop;
		for (var i in self.sections) {
			if (self.sections[i] <= scrollPosition) {
				navParent.querySelector('.active').classList.remove('active');
				navParent.querySelector('a[href*=' + i + ']').classList.add('active');
			}
		}
	});
}

ScrollSpy.prototype = {
	update: function() {
		var sections = this.sectionsParent.querySelectorAll(this.sectionSelector);
		this.sect ions = {};
		[].forEach.call(sections, function(e) {
			sections[e.id] = e.offsetTop;
		});
	}
};

module.exports = ScrollSpy;
