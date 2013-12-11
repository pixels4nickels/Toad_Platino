var LillyPad = require('lib/ash/ash').Node.create({
	pad         : require('game/components/lillypad'),
	transform   : require('game/components/transform'),
	display     : require('game/components/display'),
	body        : require('game/components/physicsbody'),
	shape       : require('game/components/physicsshape'),
	moment      : require('game/components/physicsmoment')
});
module.exports = LillyPad;