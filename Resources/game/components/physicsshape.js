var PhysicsShape = require('lib/ash/ash').Class.extend({
	shape: null,
	constructor: function (shape) {
		this.shape = shape;
		return this;
	}
});

module.exports = PhysicsShape