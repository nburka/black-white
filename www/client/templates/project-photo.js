Template.projectPhoto.helpers({
	getPrevPhoto: function () {
		return Template.projectPhoto.getPrevPhoto(this.photo, this.project);
	},
	getNextPhoto: function () {
		return Template.projectPhoto.getNextPhoto(this.photo, this.project);
	}
});

Template.projectPhoto.getPrevPhoto = function(photo, project) {
	return Photos.findOne(
		{
			_id: {
				$in: project.photos,
				$gt: photo._id
			}
		},
		{
			sort: {
				publish_date: 1,
				_id: 1
			}
		}
	);
}

Template.projectPhoto.getNextPhoto = function(photo, project) {
	return Photos.findOne(
		{
			_id: {
				$in: project.photos,
				$lt: photo._id
			}
		},
		{
			sort: {
				publish_date: -1,
				_id: -1
			}
		}
	);
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
