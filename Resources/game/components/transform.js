var Transform = require('lib/ash/ash').Class.extend({
	transform:null,
	constructor: function (transform) {
		this.transform = transform;
		return this;
	}
});

module.exports = Transform;