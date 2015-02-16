Template.layout.rendered = function() {
	var timeout_interval = 2000;
	Template.layout.motion_sensor = true;

	$(window).on(
		'scroll keypress click focus mousemove touchstart touchend touchmove',
		function() {
			$('#body-wrapper').removeClass('idle');
			Template.layout.motion_sensor = true;
		}
	);

	setInterval(
		function() {
			if (Template.layout.motion_sensor) {
				Template.layout.motion_sensor = false;
			} else {
				$('#body-wrapper').addClass('idle');
			}
		},
		timeout_interval
	);
};
