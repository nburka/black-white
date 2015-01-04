Template.projectPhotoPage.helpers({
	getPrevPhoto: function () {
		return Template.projectPhotoPage.getPrevPhoto(this.photo, this.project);
	},
	getNextPhoto: function () {
		return Template.projectPhotoPage.getNextPhoto(this.photo, this.project);
	}
});

Template.projectPhotoPage.getPhotos = function(project) {
	var photos = Photos.find({ _id: { $in: project.photos }});

	var results = [];
	for (var i = 0; i < project.photos.length; i++) {
		photos.forEach(function(photo) {
			if (photo._id == project.photos[i]) {
				results.push(photo);
			}
		});
	}

	return results;
}

Template.projectPhotoPage.getPrevPhoto = function(photo, project) {
	var photos = Template.projectPhotoPage.getPhotos(project);

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

Template.projectPhotoPage.getNextPhoto = function(photo, project) {
	var photos = Template.projectPhotoPage.getPhotos(project);

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

Template.projectPhotoPage.captureNextPrevKeypress = function(e) {
	var photo = false;

	switch (e.which) {
	case 39:
		photo = Template.projectPhotoPage.getNextPhoto(
			this.current_data.photo,
			this.current_data.project
		);
		break;
	case 37:
		photo = Template.projectPhotoPage.getPrevPhoto(
			this.current_data.photo,
			this.current_data.project
		);
		break;
	}

	if (photo) {
		Router.go(
			_.str.sprintf(
				'/projects/%s/photos/%s',
				this.current_data.project._id,
				photo._id
			)
		);
	}
}

Template.projectPhotoPage.rendered = function() {
	// Use auto-run to update the current id based on the template
	// instance.
	var that = this;
	this.autorun(function() {
		$("img.lazy").unveil();
		that.current_data = Template.currentData();
	});

	$(window).on(
		'keydown',
		$.proxy(Template.projectPhotoPage.captureNextPrevKeypress, this)
	);
};

Template.projectPhotoPage.destroyed = function() {
	$(window).off(
		'keydown',
		$.proxy(Template.projectPhotoPage.captureNextPrevKeypress, this)
	);
};
