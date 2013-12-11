require('co.lanica.chipmunk2d');
var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var PlayerSystem = require('lib/ash/ash').System.extend({
	playerStates: require('game/model/states').playerStates,
	padStates: require('game/model/states').padStates,
	game: null,
	space: null,
	playerList: null,
	player: null,
	playerList: null,
	padList: null,
	ringList: null,
	ring: null,
	ringList: null,
	constructor: function (game, space) {
		Ti.API.info("PlayerSystem.constructor ");
		this.game = game;
		this.space = space;
		return this;
	},

	addToEngine: function (engine) {
		this.padList = engine.getNodeList(require('game/nodes/lillypad'));
		this.ringList = engine.getNodeList(require('game/nodes/ring'));
		for(var node = this.ringList.head; node; node = node.next) {
			this.addPlayer(node);
		}
		this.ringList.nodeAdded.add(this.addRing, this);

		this.playerList = engine.getNodeList(require('game/nodes/player'));
		for(var node = this.playerList.head; node; node = node.next) {
			this.addPlayer(node);
		}
		this.playerList.nodeAdded.add(this.addPlayer, this);
	},

	addPlayer: function (node) {
		Ti.API.info("PlayerSystem.addPlayer");
		this.player = node;
		this.playerState = node.player.state;  // using value here to store value instead of reference..VERY IMPORTANT for testing state changes!
	},

	addRing: function (node) {
		Ti.API.info("PlayerSystem.addRing");
		this.ring = node;
	},

	removeFromEngine: function (engine) {
		this.nodeList = null;
	},

	update: function (time) {
		if( this.playerList.head && this.player.player){

			view = this.player.display.view;
			var parentNode = this.player.player.parent;
			if(parentNode != null && parentNode.display){
				var offsetDegrees = (180 - ((parentNode.display.view.angle - this.player.player.lastParentAngle) - 180));
				this.player.player.parentOffsetAngle += offsetDegrees * Math.PI/180;

				view.x = parentNode.display.view.x  - -(this.player.player.parentDistance * Math.cos(this.player.player.parentOffsetAngle));
				view.y = parentNode.display.view.y  - (this.player.player.parentDistance * Math.sin(this.player.player.parentOffsetAngle ));

				view.angle -= offsetDegrees;
				this.player.player.lastParentAngle = parentNode.display.view.angle;
			}

			chipmunk.cpBodySetPos(this.player.body.body, v(view.x+view.width/2*this.game.screenScaleX, this.cpY(view.y+view.height/2*this.game.screenScaleY)));
			chipmunk.cpBodySetAngle(this.player.body.body, view.angle * Math.PI/180);

			// check if we landed somewhere good
			if( // we just went from jumping to sitting, check landing.
				this.playerState == this.playerStates.JUMPING_STATE &&
				this.playerList.head.player.state == this.playerStates.SITTING_STATE
			){
				//Ti.API.info("PlayerSystem:update -> test jump!");
				this.processGoodLanding();
			}
			// check if we landed somewhere bad
			if( // we just went from sitting to swimming, return to home.
				(this.playerState == this.playerStates.JUMPING_STATE || this.playerState == this.playerStates.SITTING_STATE )&&
				this.playerList.head.player.state == this.playerStates.SWIMMING_STATE
			){
				//Ti.API.info("PlayerSystem:update -> test jump!");
				this.processBadLanding();
			}
			this.playerState = this.playerList.head.player.state;
		}
	},

	processGoodLanding : function(){
		for (node = this.padList.head; node; node = node.next) {
			var padPosition = chipmunk.cpBodyGetPos(node.body.body);
			var playerPosition = chipmunk.cpBodyGetPos(this.player.body.body);
			var playerPadOffset = chipmunk.cpvdist(padPosition, playerPosition);
			var maxDistance = node.pad.radius - this.player.player.radius;

			if(playerPadOffset < maxDistance){
				//Ti.API.info("PlayerSystem.update:TOUCHED_STATE: distance -> " + playerPadOffset );
				var timestamp = Date.now();
				node.pad.state = this.padStates.TOUCHED_STATE;
				node.pad.expirationTime = node.pad.encumberedDuration;
				//node.pad.expirationTime = -scene1;

				this.player.player.parentDistance = playerPadOffset;

				// used for pad intertia
				this.player.player.parentOffsetX = playerPosition.x - padPosition.x;
				this.player.player.parentOffsetY = playerPosition.y - padPosition.y;

				this.player.player.parentOffsetAngle  =  Math.atan2(this.player.player.parentOffsetY, this.player.player.parentOffsetX);
				this.player.player.lastParentAngle  =  node.display.view.angle;//store degrees for difference compare


				// apply intertia to pad
				chipmunk.cpBodyApplyImpulse(
					node.body.body,
					v(this.ring.jump.power* Math.cos(this.ring.jump.angle), -(this.ring.jump.power * Math.sin(this.ring.jump.angle))),
					v( this.player.player.parentOffsetX, this.player.player.parentOffsetY)
				);

				this.player.player.parent = node; // setting parent node will cause the toad to be placed in sync with that node
				break;
			}
		}
		if(this.player.player.parent == null){
			this.player.player.state = this.playerStates.SWIMMING_STATE;
			Ti.API.info("PLAYER STATE CHANGE: SWIMMING");
		}
	},

	processBadLanding : function(){
		//		removeLife();
//		showRipple(player);
//		showSplash();
		this.returnToStartingPoint();
	},

	returnToStartingPoint : function(){
		Ti.API.info("PlayerSystem.returnToStartingPoint");
//
//		var xdiff = (levelData.homex) - (player.x + player.width * 0.5);
//		var ydiff = (levelData.homey) - (player.y + player.height * 0.5);
//		var angle = Math.atan2(ydiff, xdiff);
//
//		player.rotateFrom(
//			angle * 180 / Math.PI,
//			player.width * 0.5,
//			player.height * 0.5);
//
//		playerTransform.duration = jumpPower*3;
//
//		playerTransform.x = levelData.homex - startSprite.width/s2 * startSprite.scaleX;
//		playerTransform.y = levelData.homey - startSprite.height/s2 * startSprite.scaleY;
//
//		playerTransform.addEventListener('complete', onReturnToStartingPointComplete);
//		player.clearTransforms();
//		player.transform(playerTransform);
//		gameModel.setCurrentState(gameModel.SWIMMING_STATE);
//		player.alpha = 0.5;
//		player.animate(0,6,10,0);
	},

	onReturnToStartingPointComplete : function(e){
//		player.alpha = scene1;
//		player.animate(6,11,10,0);
//		playerTransform.removeEventListener('complete', onReturnToStartingPointComplete);
//		if(gameModel.lives() >= 0)
//		{
//			if(pondComplete()){
//				levelModel.setNextLevel();
//				levelData = levelModel.getCurrentLevelData();
//				restartGame();
//			}
//			gameModel.setCurrentState(gameModel.WAITING_STATE);
//		}else{
//			gameModel.setCurrentState(gameModel.OVER_STATE);
//			var GameScene = require('GameScene');
//			game.currentScene = new GameScene(window, game);
//
//			game.replaceScene(game.currentScene);
//			//levelModel.reset();
//			//gameModel.reset();
//			//restartGame();
//		}
	},

	showSplash : function(){
//		splash.center = {
//			x:player.x + player.width * 0.5,
//			y:player.y + player.height * 0.5
//		}
//		splash.show();
//		splash.animate(0,5,33,scene1);
	},
	// chipmunk y-coordinates are reverse value of platino's, so use the following
	// function to convert chipmunk y-coordinate values to platino y-coordinates and vice versa

	cpY: function(y) {
		return (this.game.screen.height - y);
	},
	// convert chipmunk angle (radians) to platino angles (degrees)
	cpAngle: function(angle) {
		return -(angle) * (180/Math.PI);
	}
});

module.exports = PlayerSystem;

