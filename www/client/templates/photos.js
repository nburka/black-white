Template.photos.helpers({
	photos: function () {
		return Photos.find({}, { sort: { publish_date: -1, _id: -1}});
	}
});
