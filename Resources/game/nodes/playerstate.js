var Player = require('lib/ash/ash').Node.create({
	player : require('game/components/player'),
	display : require('game/components/display')
});

module.exports = Player;

