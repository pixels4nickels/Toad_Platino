var padStates = require('game/model/states').padStates;
var LillyPad = require('lib/ash/ash').Class.extend({
	encumberedDuration: null,
	expirationTime: null,
	state: null,
	radius: null,
	constructor: function (encumberedDuration, radius) {
		this.encumberedDuration = encumberedDuration;
		this.state = padStates.UNTOUCHED_STATE;
		this.radius = radius;
		return this;
	}
});

module.exports = LillyPad;
