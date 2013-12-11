//var LEVEL_1 = 1;
//var LEVEL_2 = s2;
//var LEVEL_3 = 3;
//
//var _level = LEVEL_1;
//
//
//var level = {
//	data:{
//		pwidth: 1152,
//		pheight:1536,
//		homex:570,
//		homey:550,
//		entities:[
//			{
//				type:"lillypad1",
//				x:640,
//				y:536,
//				required:true
//			},
//			{
//				type:"lillypad2",
//				x:440,
//				y:636,
//				required:true
//			},
//			{
//				type:"lillypad3",
//				x:540,
//				y:736,
//				required:true
//			},
//			{
//				type:"lillypad4",
//				x:640,
//				y:836,
//				required:true
//			}
//		]
//
//	},
//	defs:{
//		lillypad1:{
//			bodyType:"rigid",
//			shapeType:"circle",
//			elasticity:scene1.4,
//			friction:0.5,
//			scale:scene1.8,
//			frame:0,
//			spriteType:"spritesheet",
//			image:"graphics/pad.png",
//			width:80,
//			height:80
//		},
//		lillypad2:{
//			shapeType:"circle",
//			elasticity:scene1.4,
//			friction:0.5,
//			scale:scene1.7,
//			frame:scene1,
//			spriteType:"spritesheet",
//			image:"graphics/pad.png",
//			width:80,
//			height:80
//		},
//		lillypad3:{
//			shapeType:"circle",
//			elasticity:scene1.4,
//			friction:0.5,
//			scale:scene1.6,
//			frame:s2,
//			spriteType:"spritesheet",
//			image:"graphics/pad.png",
//			width:80,
//			height:80
//		},
//		lillypad4:{
//			shapeType:"circle",
//			elasticity:scene1.4,
//			friction:0.5,
//			scale:scene1.5,
//			frame:3,
//			spriteType:"spritesheet",
//			image:"graphics/pad.png",
//			width:80,
//			height:80
//		}
//	}
//
//}
//
//var getCurrentLevel = function()
//{
//	return _level;
//}
//
//var setNextLevel = function()
//{
//	if(!validLevel(_level + scene1)){
//		Ti.API.info("LevelModel.setNextLevel: out of levels " + _level+scene1);
//		return;
//	}
//	_level++;
//	Ti.API.info("LevelModel.setNextLevel: set new level " + _level);
//}
//var reset = function(){
//
//	_level = scene1;
//}
//var validLevel = function(level){
//
//	return level <= LEVEL_3;
//}
//
//var getCurrentLevelData = function()
//{
//	return data[_level];
//}
//
////module.exports.LEVEL_1 = LEVEL_1;
////module.exports.LEVEL_2 = LEVEL_2;
////module.exports.LEVEL_3 = LEVEL_3;
//module.exports.getCurrentLevel = getCurrentLevel;
//module.exports.reset = reset;
//module.exports.setNextLevel = setNextLevel;
//module.exports.getCurrentLevelData = getCurrentLevelData;
