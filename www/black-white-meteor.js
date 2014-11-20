if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 0);

  Template.photos.helpers({
    photos: function () {
      return Photos.find();
    },
	random: function() {
		var min = 0;
		var max = 10;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
  });

  Template.photoPage.helpers({
    getNextPhoto: function () {
      var photo = Photos.findOne(
		{ _id: { $gt: this['_id'] }},
		{ sort: { _id: 1}}
	  );

	  return photo;
    },
    getPrevPhoto: function () {
      var photo = Photos.findOne(
		{ _id: { $lt: this['_id'] }},
		{ sort: { _id: -1}}
	  );
      return photo;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
