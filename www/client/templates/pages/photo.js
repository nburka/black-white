Template.photoPage.helpers({
	getPrevPhoto: function () {
		return Template.photoPage.getPrevPhoto(this._id);
	},
	getNextPhoto: function () {
		return Template.photoPage.getNextPhoto(this._id);
	}
});

Template.photoPage.getPrevPhoto = function(id) {
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

Template.photoPage.getNextPhoto = function(id) {
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

Template.photoPage.captureNextPrevKeypress = function(e) {
	var photo = false;

	switch (e.which) {
	case 39:
		photo = Template.photoPage.getNextPhoto(this.current_id);
		break;
	case 37:
		photo = Template.photoPage.getPrevPhoto(this.current_id);
		break;
	}

	if (photo) {
		Router.go('/photos/' + photo._id);
	}
}

Template.photoPage.rendered = function() {
	// Use auto-run to update the current id based on the template
	// instance.
	var that = this;
	this.autorun(function() {
		$("img.lazy").unveil();
		that.current_id = Template.currentData()._id;
	});

	$(window).on(
		'keydown',
		$.proxy(Template.photoPage.captureNextPrevKeypress, this)
	);
};

Template.photoPage.destroyed = function() {
	$(window).off(
		'keydown',
		$.proxy(Template.photoPage.captureNextPrevKeypress, this)
	);
};
