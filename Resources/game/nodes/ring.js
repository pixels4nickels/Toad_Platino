var Ring = require('lib/ash/ash').Node.create({
	jump : require('game/components/jump'),
	position : require('game/components/position'),
	transform : require('game/components/transform'),
	display : require('game/components/display')
});
module.exports = Ring;

