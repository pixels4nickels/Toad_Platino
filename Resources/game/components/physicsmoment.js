var PhysicsMoment = require('lib/ash/ash').Class.extend({
	moment: null,
	constructor: function (moment) {
		this.moment = moment;
		return this;
	}
});
module.exports = PhysicsMoment;