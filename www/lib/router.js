Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loadingPage',
	notFoundTemplate: 'notFoundPage',
	onData: function() {
		if (Meteor.isClient) {
			$("img.lazy").unveil();
		}
	},
	waitOn: function() {
		return [
			Meteor.subscribe('photos'),
			Meteor.subscribe('projects')
		];
	},
	onStop: function() {
		if (Meteor.isClient) {
			$('body').removeClass();
		}
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFoundPage'});

Router.route(
	'/',
	{
		name: 'projectsPage',
		path: '/',
		fastRender: true
	}
);

Router.route(
	'/photos',
	{
		name: 'photosPage',
		fastRender: true
	}
);

Router.route(
	'/photos/:_id',
	{
		name: 'photoPage',
		data: function() {
			return Photos.findOne({_id: this.params._id});
		},
		layoutTemplate: '',
		fastRender: true
	}
);

Router.route(
	'/projects',
	function() {
		this.redirect('/');
	}
);

Router.route(
	'/projects/:_id',
	{
		name: 'projectPage',
		data: function() {
			return Projects.findOne({_id: this.params._id});
		},
		fastRender: true
	}
);

Router.route(
	'projects/:project_id/photos/:_id',
	{
		name: 'projectPhotoPage',
		layoutTemplate: '',
		data: function() {
			return {
				photo: Photos.findOne({_id: this.params._id}),
				project: Projects.findOne({_id: this.params.project_id})
			}
		},
		fastRender: true
	}
);

// server routes
Router.route(
	'/feed',
	function() {
		var request = this.request;
		var feed = new PhotosRssFeed();
		this.response.setHeader('content-type', 'application/rss+xml; charset=utf-8');
		this.response.end(feed.xml({indent: true}));
	},
	{
		where: 'server'
	}
);
