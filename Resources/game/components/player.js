var Player = require('lib/ash/ash').Class.extend({
	state: null,
	parent: null,
	parentOffsetX: null,
	parentOffsetY: null,
	parentOffsetAngle: null,
	parentDistance: null,
	lastParentAngle: null,
	radius: null,
	constructor: function (initialState, radius) {
		this.state = initialState;
		this.radius = radius;
		return this;
	}
});
module.exports = Player;
