var LEVEL_1 = 1;
var LEVEL_2 = 2;
var LEVEL_3 = 3;

var _level = LEVEL_1;


var data = {
	1:{
		pwidth: 1152,
		pheight:1536,
		homex:570,
		homey:550,
		px:570,
		py:550,
		pads:[
			{x:640,y:536,t:0},
			{x:440,y:636,t:1},
			{x:540,y:736,t:2},
			{x:640,y:836,t:3},
			{x:640,y:536,t:0},
			{x:440,y:636,t:0},
			{x:540,y:736,t:3},
			{x:640,y:836,t:3},
			{x:640,y:536,t:1},
			{x:440,y:636,t:1},
			{x:540,y:736,t:2},
			{x:640,y:836,t:3},
			{x:640,y:536,t:0},
			{x:440,y:636,t:1},
			{x:540,y:736,t:2},
			{x:640,y:836,t:2},
			{x:640,y:536,t:1},
			{x:440,y:636,t:3},
			{x:540,y:736,t:2},
			{x:640,y:836,t:2}
		]
	},
	2:{
		homex:170,
		homey:250,
		px:170,
		py:250,
		pads:[
			{x:45,y:110,t:0},
			{x:115,y:50,t:1},
			{x:45,y:450,t:2},
			{x:15,y:30,t:3}
		]
	},
	3:{
		homex:170,
		homey:250,
		px:170,
		py:250,
		pads:[
			{x:45,y:110,t:0},
			{x:15,y:30,t:3}
		]
	}
}

var getCurrentLevel = function()
{
	return _level;
}

var setNextLevel = function()
{
	if(!validLevel(_level + 1)){
		Ti.API.info("LevelModel.setNextLevel: out of levels " + _level+1);
		return;
	}
	_level++;
	Ti.API.info("LevelModel.setNextLevel: set new level " + _level);
}
var reset = function(){

	_level = 1;
}
var validLevel = function(level){

	return level <= LEVEL_3;
}

var getCurrentLevelData = function()
{
	return data[_level];
}

//module.exports.LEVEL_1 = LEVEL_1;
//module.exports.LEVEL_2 = LEVEL_2;
//module.exports.LEVEL_3 = LEVEL_3;
module.exports.getCurrentLevel = getCurrentLevel;
module.exports.reset = reset;
module.exports.setNextLevel = setNextLevel;
module.exports.getCurrentLevelData = getCurrentLevelData;
