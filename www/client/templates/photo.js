Template.photo.helpers({
	getPrevPhoto: function () {
		return Template.photo.getPrevPhoto(this._id);
	},
	getNextPhoto: function () {
		return Template.photo.getNextPhoto(this._id);
	}
});

Template.photo.getPrevPhoto = function(id) {
	return Photos.findOne(
		{ _id: { $gt: id }},
		{ sort: { _id: 1}}
	);
}

Template.photo.getNextPhoto = function(id) {
	return Photos.findOne(
		{ _id: { $lt: id }},
		{ sort: { _id: -1}}
	);
}

Template.photo.captureNextPrevKeypress = function(e) {
	var photo = false;

	switch (e.which) {
	case 39:
		photo = Template.photo.getNextPhoto(this.current_id);
		break;
	case 37:
		photo = Template.photo.getPrevPhoto(this.current_id);
		break;
	}

	if (photo) {
		Router.go('/photos/' + photo._id);
	}
}

Template.photo.rendered = function() {
	// Use auto-run to update the current id based on the template
	// instance.
	var that = this;
	this.autorun(function() {
		that.current_id = Template.currentData()._id;
	});

	$(window).on(
		'keydown',
		$.proxy(Template.photo.captureNextPrevKeypress, this)
	);
};

Template.photo.destroyed = function() {
	$(window).off(
		'keydown',
		$.proxy(Template.photo.captureNextPrevKeypress, this)
	);
};
