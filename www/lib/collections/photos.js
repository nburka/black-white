Photo = function (doc) {
  _.extend(this, doc);
};

_.extend(Photo.prototype, {
	getImgTag: function (param) {
		return {
			src: '/photos/' + this.photo,
			width: 800,
			height: 800
		};
	}
});

Photos = new Mongo.Collection('Photos', {
	transform: function (doc) { return new Photo(doc); }
});
