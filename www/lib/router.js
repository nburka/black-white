Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() {
		return [
			Meteor.subscribe('photos'),
			Meteor.subscribe('projects'),
			IRLibLoader.load('/js/jquery.unveil.js')
		];
	},
	onBeforeAction: function() {
		this.next();

		if (Meteor.isClient) {
			var currentRoute = Router.current();
			var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
			$('body').addClass(template.toLowerCase() + '-page');

		}
	},
	onStop: function() {
		if (Meteor.isClient) {
			var currentRoute = Router.current();
			var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
			$('body').removeClass(template.toLowerCase() + '-page');
		}
	}
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.route('/', function() {
	this.render('project', {
		data: function() {
			return Projects.findOne({}, { create_date : 'asc'} );
		}
	});
}, { name: 'home' });

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
			'<img src="%s" />',
			Meteor.absoluteUrl('photos/' + photo._id + '.jpg')
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

Router.route('/project/:_id', function() {
	this.render('project', {
		data: function() {
			return Projects.findOne({_id: this.params._id});
		}
	});
}, { name: 'project' });

Router.route('/photos', { name: 'photos' });

Router.route('/photos/:_id', function() {
	this.render('photo', {
		data: function() {
			return Photos.findOne({_id: this.params._id});
		}
	});
}, { name: 'photo' });

Router.route('project/:project_id/photos/:_id', function() {
	this.render('projectPhoto', {
		data: function() {
			return {
				photo: Photos.findOne({_id: this.params._id}),
				project: Projects.findOne({_id: this.params.project_id})
			}
		}
	});
}, { name: 'projectPhoto' });
