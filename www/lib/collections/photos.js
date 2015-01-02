Photo = function (doc) {
  _.extend(this, doc);
};

_.extend(Photo.prototype, {
	getImgTag: function (dimension) {
		return {
			src: _.str.sprintf(
				'%s/photos/%s/%s',
				Meteor.settings.public.uri.cdn,
				dimension,
				this.filename
			),
			alt: this.title,
			width: '200',
			height: '200'
		};
	}
});

Photos = new Mongo.Collection('Photos', {
	transform: function (doc) { return new Photo(doc); }
});
