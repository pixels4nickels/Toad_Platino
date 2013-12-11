var TITLE_STATE = "title";
var CREATING_STATE = "creating";
var WAITING_STATE = "waiting";
var POWERING_STATE = "powering";
var JUMPING_STATE = "jumping";
var SWIMMING_STATE = "swimming";
var OVER_STATE = "over";
var _state = CREATING_STATE;

var _lives = 2;
var _score = 666;
var _pads = new Array();
var _numPads = 5;


var reset = function(){
	_lives = 2;
	_score = 666;
	_pads = new Array();
	_numPads = 5;
}

var getCurrentState = function()
{
	return _state;
}

var setCurrentState = function(state)
{
	if(!validState(state)){
		Ti.API.info("GameModel.setCurrentState: unknown state " + state);
		return;
	}
	if(_state == state){
		Ti.API.info("GameModel.setCurrentState: already in state " + state);
		return;
	}
	Ti.API.info("GameModel.setCurrentState: set new state " + state);
	_state = state;
}

var validState = function(state){
	if(
		state == TITLE_STATE  ||
		state == WAITING_STATE  ||
		state == JUMPING_STATE  ||
		state == POWERING_STATE ||
		state == CREATING_STATE ||
		state == SWIMMING_STATE ||
		state == OVER_STATE
		)
	{
		return true;
	}else{
		return false;
	}
}

var addToScore = function(num)
{
	_score += num;
}

var score = function()
{
	return _score;
}

var removeLife = function()
{
	_lives--;
}

var addLife = function()
{
	_lives++;
}
var lives = function()
{
	return _lives;
}
var pads = function()
{
	return _pads;
}

module.exports.TITLE_STATE = TITLE_STATE;
module.exports.CREATING_STATE = CREATING_STATE;
module.exports.SITTING_STATE = SITTING_STATE;
module.exports.POWERING_STATE = POWERING_STATE;
module.exports.JUMPING_STATE = JUMPING_STATE;
module.exports.SWIMMING_STATE = SWIMMING_STATE;
module.exports.OVER_STATE = OVER_STATE;

module.exports.getCurrentState = getCurrentState;
module.exports.setCurrentState = setCurrentState;
module.exports.score = score;
module.exports.addToScore = addToScore;
module.exports.lives = lives;
module.exports.addLife = addLife;
module.exports.removeLife = removeLife;
module.exports.reset = reset;
module.exports.pads = pads;
module.exports.numPads = _numPads;
