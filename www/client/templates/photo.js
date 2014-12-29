Template.photo.helpers({
	getPrevPhoto: function () {
		return Photos.findOne(
			{ _id: { $gt: this['_id'] }},
			{ sort: { _id: 1}}
		);
	},
	getNextPhoto: function () {
		return Photos.findOne(
			{ _id: { $lt: this['_id'] }},
			{ sort: { _id: -1}}
		);
	}
});
