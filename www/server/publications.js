Meteor.publish('photos', function() {
  return Photos.find({}, { sort: { _id: 1}});
});

Meteor.publish('projects', function() {
  return Projects.find({}, { sort: { create_date: 1}});
});
