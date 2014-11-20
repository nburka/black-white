Meteor.publish('photos', function() {
  return Photos.find();
});
