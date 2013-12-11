var Player = require('lib/ash/ash').Node.create({
	player      : require('game/components/player'),
	position    : require('game/components/position'),
	transform   : require('game/components/transform'),
	display     : require('game/components/display'),
	body        : require('game/components/physicsbody'),
	shape       : require('game/components/physicsshape')
});

module.exports = Player;

