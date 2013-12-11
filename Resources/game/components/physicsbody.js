var PhysicsBody = require('lib/ash/ash').Class.extend({
	body: null,
	constructor: function (body) {
		this.body = body;
		return this;
	}
});

module.exports = PhysicsBody;