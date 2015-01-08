Photo = function (doc) {
  _.extend(this, doc);
};

_.extend(Photo.prototype, {
	getImgTag: function (dimension) {
		return {
			'class': 'lazy',
			'src': 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
			'data-src': _.str.sprintf(
				'%s/photos/%s/%s',
				Meteor.settings.public.uri.cdn,
				dimension,
				this.filename
			),
			'data-src-retina': _.str.sprintf(
				'%s/photos/%s@2x/%s',
				Meteor.settings.public.uri.cdn,
				dimension,
				this.filename
			),
			alt: this.title,
			width: dimension,
			height: dimension
		};
	}
});

Photos = new Mongo.Collection('Photos', {
	transform: function (doc) { return new Photo(doc); }
});
