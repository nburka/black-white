Project = function (doc) {
  _.extend(this, doc);
};

_.extend(Project.prototype, {
	getTitle: function () {
		return this.title;
	}
});

Projects = new Mongo.Collection('Projects', {
	transform: function (doc) { return new Project(doc); }
});
