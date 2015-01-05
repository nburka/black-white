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
	onBeforeAction: function() {
		this.next();

		if (Meteor.isClient) {
			var currentRoute = Router.current();
			var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
			$('body').addClass(template);

		}
	},
	onStop: function() {
		if (Meteor.isClient) {
			var currentRoute = Router.current();
			var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
			$('body').removeClass(template);
		}
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFoundPage'});

Router.route('/', function() {
	this.render('projectsPage');
}, { name: 'projectsPage', fastRender: true });

Router.route('/feed', function() {
	var request = this.request;

	var rssNpm = Meteor.npmRequire('rss');

	var feed = new rssNpm({
		title: 'Black and White',
		description: 'Foo',
		feed_url: Meteor.absoluteUrl('feed'),
		site_url: Meteor.absoluteUrl(),
		copyright: _.str.sprintf(
			'All rights reserved %s, Nicholas Burka',
			moment().format('YYYY')
		),
		categories: ['Photography']
	});

	var photos = Photos.find(
		{},
		{
			sort: { publish_date: -1, _id: -1},
			limit: 50
		}
	);

	photos.forEach(function(photo) {
		var img_tag = _.str.sprintf(
			'<img src="%s/photos/1000/%s" />',
			Meteor.settings.public.uri.cdn,
			photo.filename
		);

		feed.item({
			title: photo.title,
			description: img_tag,
			url: Meteor.absoluteUrl('photos/' + photo._id),
			date: photo.publish_date,
			enclosure: { file: Meteor.absoluteUrl('photos/' + photo._id + '.jpg') },
		});
	});

	this.response.setHeader('content-type', 'application/rss+xml; charset=utf-8');
	this.response.end(feed.xml({indent: true}));
}, { where: 'server' });

Router.route('/photos', function() {
	this.render('photosPage');
}, { name: 'photosPage' });

Router.route('/photos/:_id', function() {
	this.render('photoPage', {
		data: function() {
			return Photos.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'photoPage',
	layoutTemplate: '',
	fastRender: true
});

Router.route('/projects', function() {
	this.redirect('/');
}, { name: 'projects-redirect' });

Router.route('/projects/:_id', function() {
	this.render('projectPage', {
		data: function() {
			return Projects.findOne({_id: this.params._id});
		}
	});
}, { name: 'projectPage', fastRender: true });

Router.route('projects/:project_id/photos/:_id', function() {
	this.render('projectPhotoPage', {
		data: function() {
			return {
				photo: Photos.findOne({_id: this.params._id}),
				project: Projects.findOne({_id: this.params.project_id})
			}
		}
	});
}, {
	name: 'projectPhotoPage',
	layoutTemplate: '',
	fastRender: true
});
