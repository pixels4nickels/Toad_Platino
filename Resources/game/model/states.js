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
	MENU_STATE : "menu",
	RETRY_STATE : "retry",
	PLAYING_STATE : "playing",
	SUCCESS_STATE : "success"
};

module.exports.playerStates = playerStates;
module.exports.padStates = padStates;
module.exports.gameStates = gameStates;