Template.layout.helpers({
	isActiveTemplate: function() {
		var currentRoute = Router.current();
		var template = (currentRoute) ? currentRoute.lookupTemplate() : '';
		return (_.indexOf(arguments, template) !== -1);
	}
});

Template.layout.rendered = function() {
	var timeout_interval = 2000;
	var motion_sensor = true;

	$(window).on(
		'scroll keypress click focus mousemove touchstart touchend touchmove',
		function() {
			$(document.body).removeClass('idle');
			motion_sensor = true;
		}
	);

	setInterval(
		function() {
			if (motion_sensor) {
				motion_sensor = false;
			} else {
				$(document.body).addClass('idle');
			}
		},
		timeout_interval
	);
};
