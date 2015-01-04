Template.project.helpers({
	photos: function () {
		var photos = Photos.find({ _id: { $in: this.photos }});

		var that = this;
		var results = [];
		for (var i = 0; i < this.photos.length; i++) {
			photos.forEach(function(photo) {
				if (photo._id == that.photos[i]) {
					results.push(photo);
				}
			});
		}

		return results;
	}
});

Template.project.rendered = function() {
	$("img.lazy").unveil();
};
