var playerStates = {
	SITTING_STATE : "sitting",
	POWERING_STATE : "powering",
	JUMPING_STATE : "jumping",
	SWIMMING_STATE : "swimming"
};
var padStates = {
	UNTOUCHED_STATE : "untouched",
	OCCUPIED_STATE : "occupied",
	TOUCHED_STATE : "touched",
	SINKING_STATE : "sinking",
	SUNK_STATE : "sunk"
};
var gameStates = {
	INIT_STATE : "init",
	TITLE_STATE : "title",
	START_STATE : "start",
	PLAYING_STATE : "playing",
	FAILED_STATE : "over"
};
module.exports.playerStates = playerStates;
module.exports.padStates = padStates;
module.exports.gameStates = gameStates;