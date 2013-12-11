var Position = require('lib/ash/ash').Class.extend({
	position:null,
	rotation:null,
    constructor: function (x, y, rotation, collisionRadius) {
	    var Point = require('lib/ash/ash').Point;
        this.position = new Point(x, y);
        this.rotation = rotation;
        this.collisionRadius = collisionRadius;
	    return this;
    }
});
module.exports = Position;
