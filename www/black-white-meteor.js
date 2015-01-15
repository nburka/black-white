if (Meteor.isClient) {
	Template.registerHelper('dateFormatLong', function(date) {
		return moment(date).format('MMMM Do YYYY');
	});

	Template.registerHelper('dateFormat', function(date, format) {
		return moment(date).format(format);
	});

	Template.registerHelper('setPageTitle', function() {
		var args = _.toArray(arguments);
		document.title = args.slice(0, args.length - 1).join(' | ');
	});

	Template.registerHelper('addBodyClass', function(classes) {
		$(document.body).addClass(classes);
	});

	Template.registerHelper('cdnUri', function(uri) {
		return Meteor.settings.public.uri.cdn + '/resources' + uri;
	});
}

if (Meteor.isServer) {
	Meteor.startup(function () {
		// code to run on server at startup
	});
}
