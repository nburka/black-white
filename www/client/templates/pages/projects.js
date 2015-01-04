Template.projectsPage.helpers({
	projects: function() {
		return Projects.find({}, { sort: { create_date: -1}});
	}
});

Template.projectsPage.rendered = function() {
	$("img.lazy").unveil();
};
