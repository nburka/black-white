Template.header.helpers({
	isActiveTemplate: function() {
		var currentRoute = Router.current();
		var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
		return (_.indexOf(arguments, template) !== -1);
	}
});
