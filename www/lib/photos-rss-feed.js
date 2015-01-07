PhotosRssFeed = function () {
	var rssNpm = Meteor.npmRequire('rss');

	var feed = new rssNpm({
		title: Meteor.settings.public.site.title,
		description: 'Photos by Nicholas Burka',
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

	return feed;
};
