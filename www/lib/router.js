Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function() { return Meteor.subscribe('photos'); }
});

Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

Router.route('/', {name: 'photos'});

Router.route('/photos/:_id', function() {
  this.render('photoPage', {
    //to: 'lightbox',
	data: function() {
		return Photos.findOne({_id: this.params._id});
	}
  });
}, { name: 'photoPage' });
