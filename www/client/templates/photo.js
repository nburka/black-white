Template.photo.helpers({
	getPrevPhoto: function () {
		return Template.photo.getPrevPhoto(this._id);
	},
	getNextPhoto: function () {
		return Template.photo.getNextPhoto(this._id);
	}
});

Template.photo.getPrevPhoto = function(id) {
	var photos = Photos.find(
		{},
		{ sort: { publish_date: -1, _id: -1}}
	);

	var found = false;
	var prev_photo = null;
	photos.forEach(function(photo) {
		if (photo._id === id) {
			found = true;
		}

		if (!found) {
			prev_photo = photo;
		}
	});

	return prev_photo;
}

Template.photo.getNextPhoto = function(id) {
	var photos = Photos.find(
		{},
		{ sort: { publish_date: -1, _id: -1}}
	);

	var found = false;
	var next_photo = null;
	photos.forEach(function(photo) {
		if (found) {
			next_photo = photo;
			found = false;
		}

		found = (photo._id === id);
	});

	return next_photo;
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
