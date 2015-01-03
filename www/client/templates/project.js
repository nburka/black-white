Template.project.helpers({
	photos: function () {
		return Photos.find({ _id: { $in: this.photos }}, { sort: { publish_date: -1, _id: -1}});
	},
	projects: function() {
		return Projects.find({}, { sort: { create_date: -1}});
	}
});

Template.project.rendered = function() {
	$("img.lazy").unveil();
};
