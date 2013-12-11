var JumpSystem = require('lib/ash/ash').System.extend({
    playerStates: require('game/model/states').playerStates,
	playerList: null,
	playfieldList: null,
	ringList: null,
	player: null,
	ring: null, // jump ring for player
	touchEvent: null,
	jumpTransformListener: null,
    constructor: function (game, touchSignal) {
	    touchSignal.add(this.handleTouch, this);
	    this.game = game;
	    return this;
    },

    addToEngine: function (engine) {
        this.playerList = engine.getNodeList(require('game/nodes/player'));
        this.ringList = engine.getNodeList(require('game/nodes/ring'));
	    this.playfieldList = engine.getNodeList(require('game/nodes/playfield'));
	    for(var node = this.playfieldList.head; node; node = node.next) {
		    this.addPlayfield(node);
	    }
	    this.playfieldList.nodeAdded.add(this.addPlayfield, this);
    },

	addPlayfield: function (node) {
		Ti.API.info("CameraControlSystem.addPlayfield");
		this.playfield = node.playfield;
	},

    removeFromEngine: function (engine) {
        this.playerList = null;
		this.player = null;

	    this.ringList = null;
        this.ring = null;

	    this.playfieldList = null;
	    this.playfield = null
    },

	handleTouch: function (event) {
		if(this.player.player.state == this.playerStates.SITTING_STATE && event.type == "touchstart" ){
			//Ti.API.info("JumpSystem.handleTouch:touchstart");
			this.touchEvent = event;
			var ringView = this.ring.display.view;
			var ringTransform = this.ring.transform.transform;
			var playerView = this.player.display.view;
			ringView.scaleX = 0.01;
			ringView.scaleY = 0.01;

			ringTransform.duration = 2000;
			//ringTransform.easing = platino.ANIMATION_CURVE_EASE_IN;
			ringTransform.scaleX = 1.5;
			ringTransform.scaleY = 1.5;
			ringView.show();
			ringView.transform(ringTransform);
			this.player.player.state = this.playerStates.POWERING_STATE;
			Ti.API.info("PLAYER STATE CHANGE: POWERING");
		}
		if(this.player.player.state == this.playerStates.POWERING_STATE && event.type == "touchend"){
			//Ti.API.info("JumpSystem.handleTouch:touchend");
			this.touchEvent = null;

			var ringView = this.ring.display.view;
			ringView.hide();
			ringView.clearTransforms();

			var playerView = this.player.display.view;
			var playerTransform = this.player.transform.transform;

			var jumpPower = this.ring.jump.power =  Math.floor(ringView.width * 0.5 * ringView.scaleX);
			//Ti.API.info("JumpSystem.handleTouch:jumpPower " + jumpPower);
			playerView.anchorPoint = {
				x:0.5,
				y:0.5
			}
			playerTransform.duration = jumpPower * 1.5;

			var px1 = this.player.display.view.x;
			var py1 = this.player.display.view.y;
			var px2 = this.player.display.view.x  + (jumpPower * Math.cos(this.ring.jump.angle));
			var py2 = this.player.display.view.y  + (jumpPower * Math.sin(this.ring.jump.angle));

			var x1, y1, x2, y2, result;
			var BUFFER = 10;
			var newX = this.player.display.view.x  + (jumpPower * Math.cos(this.ring.jump.angle));
			var newY = this.player.display.view.y  + (jumpPower * Math.sin(this.ring.jump.angle));

			if(newX >= this.playfield.bgWidth){
				x1 = this.playfield.bgWidth - this.player.display.view.width - BUFFER;
				y1 = 0;
				x2 = this.playfield.bgWidth - this.player.display.view.width - BUFFER;
				y2 = this.playfield.bgHeight;
				result = this.game.checkLineIntersection(px1, py1, px2, py2, x1, y1, x2, y2);
				//if(result.onLine1 && result.onLine2){
					newX = result.x;
					newY = result.y;
				//}
			}

			if(newX <= 0){
				x1 = BUFFER;
				y1 = 0;
				x2 = BUFFER;
				y2 = this.playfield.bgHeight;
				result = this.game.checkLineIntersection(px1, py1, px2, py2, x1, y1, x2, y2);
				//if(result.onLine1 && result.onLine2){
				newX = result.x;
				newY = result.y;
				//}
			}

			if(newY >= this.playfield.bgHeight){
				x1 = 0;
				y1 = this.playfield.bgHeight - this.player.display.view.width - BUFFER;
				x2 = this.playfield.bgWidth;
				y2 = this.playfield.bgHeight - this.player.display.view.width - BUFFER;
				result = this.game.checkLineIntersection(px1, py1, px2, py2, x1, y1, x2, y2);
				//if(result.onLine1 && result.onLine2){
				newX = result.x;
				newY = result.y;
				//}
			}

			if(newY <= 0){
				x1 = 0;
				y1 = BUFFER;
				x2 = this.playfield.bgWidth;
				y2 = BUFFER;
				result = this.game.checkLineIntersection(px1, py1, px2, py2, x1, y1, x2, y2);
				//if(result.onLine1 && result.onLine2){
				newX = result.x;
				newY = result.y;
				//}
			}
			playerTransform.x = newX;
			playerTransform.y = newY;

			this.jumpTransformListener = this.onJumpComplete( this );
			playerTransform.addEventListener( 'complete', this.jumpTransformListener );
			playerView.transform(playerTransform);
			playerView.animate(0,6,10,0);

			this.player.player.parent = null;
			this.player.player.state = this.playerStates.JUMPING_STATE;
			Ti.API.info("PLAYER STATE CHANGE: JUMPING");
		}
		if(this.player.player.state == this.playerStates.POWERING_STATE && event.type == "touchmove"){
			this.touchEvent = event;
		}
	},

	syncRingToPlayer: function(){
		var ringView = this.ring.display.view;
		var playerView = this.player.display.view;
		ringView.angle = playerView.angle;
		ringView.x = playerView.x + playerView.width * playerView.anchorPoint.x - ringView.width * 0.5;
		ringView.y = playerView.y + playerView.height * playerView.anchorPoint.y - ringView.height * 0.5;
	},

	updateJumpAngle : function(event) {  // the magic
		var diff = this.game.centerPointDiff( event.x, event.y );
		var globalX = this.game.camera.centerX - diff.x;
		var globalY = this.game.camera.centerY - diff.y;
		var xdiff = globalX - (this.player.display.view.x + this.player.display.view.width * 0.5);
		var ydiff = globalY - (this.player.display.view.y + this.player.display.view.height * 0.5);
		this.ring.jump.angle = Math.atan2(ydiff, xdiff);
	},

	updatePlayer : function(event) {
		this.updateJumpAngle(event)
		this.player.display.view.rotateFrom(this.ring.jump.angle * 180 / Math.PI, this.player.display.view.width * 0.5, this.player.display.view.height * 0.5);
	},

	onJumpComplete : function(system)
	{
		var system = system;
		var onRingTransformComplete = function(e){
			system.player.display.view.animate(6,11,10,0);
			system.player.transform.transform.removeEventListener('complete', system.jumpTransformListener);
			system.player.player.state = system.playerStates.SITTING_STATE;
			Ti.API.info("PLAYER STATE CHANGE: SITTING");
		}
		return onRingTransformComplete;
	},

    update: function (time) {
	    if(this.playerList){
		    this.player = this.playerList.head;
		}
	    if(this.ringList){
		    this.ring = this.ringList.head;
	    }
	    if(this.touchEvent){
		    this.syncRingToPlayer();
	    }
	    if(this.player && this.player.player.state == this.playerStates.POWERING_STATE){
		    this.updatePlayer(this.touchEvent);
	    }
    }

});

module.exports = JumpSystem;
