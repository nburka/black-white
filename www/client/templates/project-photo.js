Template.projectPhoto.helpers({
	getPrevPhoto: function () {
		return Template.projectPhoto.getPrevPhoto(this.photo, this.project);
	},
	getNextPhoto: function () {
		return Template.projectPhoto.getNextPhoto(this.photo, this.project);
	}
});

Template.projectPhoto.getPrevPhoto = function(photo, project) {
	var photos = Photos.find(
		{ _id: { $in: project.photos }},
		{ sort: { publish_date: -1, _id: -1}}
	);

	var found = false;
	var prev_photo = null;
	photos.forEach(function(project_photo) {
		if (photo._id === project_photo._id) {
			found = true;
		}

		if (!found) {
			prev_photo = project_photo;
		}
	});

	return prev_photo;
}

Template.projectPhoto.getNextPhoto = function(photo, project) {
	var photos = Photos.find(
		{ _id: { $in: project.photos }},
		{ sort: { publish_date: -1, _id: -1}}
	);

	var found = false;
	var next_photo = null;
	photos.forEach(function(project_photo) {
		if (found) {
			next_photo = project_photo;
			found = false;
		}

		found = (project_photo._id === photo._id);
	});

	return next_photo;
}

Template.projectPhoto.captureNextPrevKeypress = function(e) {
	var photo = false;

	switch (e.which) {
	case 39:
		photo = Template.projectPhoto.getNextPhoto(
			this.current_data.photo,
			this.current_data.project
		);
		break;
	case 37:
		photo = Template.projectPhoto.getPrevPhoto(
			this.current_data.photo,
			this.current_data.project
		);
		break;
	}

	if (photo) {
		Router.go(
			_.str.sprintf(
				'/project/%s/photos/%s',
				this.current_data.project._id,
				photo._id
			)
		);
	}
}

Template.projectPhoto.rendered = function() {
	// Use auto-run to update the current id based on the template
	// instance.
	var that = this;
	this.autorun(function() {
		$("img.lazy").unveil();
		that.current_data = Template.currentData();
	});

	$(window).on(
		'keydown',
		$.proxy(Template.projectPhoto.captureNextPrevKeypress, this)
	);
};

Template.projectPhoto.destroyed = function() {
	$(window).off(
		'keydown',
		$.proxy(Template.projectPhoto.captureNextPrevKeypress, this)
	);
};
