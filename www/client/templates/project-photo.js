Template.projectPhoto.helpers({
	getProjectPath: function() {
		return '/' + this.project._id + '/';
	},
	getPrevPhoto: function () {
		return Photos.findOne(
			{
				_id: {
					$in: this.project.photos,
					$gt: this.photo._id
				}
			},
			{
				sort: {
					publish_date: 1,
					_id: 1
				}
			}
		);
	},
	getNextPhoto: function () {
		return Photos.findOne(
			{
				_id: {
					$in: this.project.photos,
					$lt: this.photo._id
				}
			},
			{
				sort: {
					publish_date: -1,
					_id: -1
				}
			}
		);
	}
});
