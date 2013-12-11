var platino = require('co.lanica.platino');
var CameraControlSystem = require('lib/ash/ash').System.extend({
	playerStates: require('game/model/states').playerStates,
	game: null,
	playfield: null,
	touchEvent: null,
	cameraTransform: null,
	inited: false,
	cameraControl: null,
	screenCenter: {},
	playfieldCenter: {},
	homeTransform: null,
	xMax:0,
	xMin:0,
	yMax:0,
	yMin:0,
	nodeList: null,
	playereList: null,
	player: null,
	playerState: null,
	constructor: function (game, touchSignal) {
	    this.game = game;
		touchSignal.add(this.handleTouch, this);
		Ti.API.info("CameraControlSystem.constructor:done");
	    return this;
    },
    addToEngine: function (engine) {
        this.nodeList = engine.getNodeList(require('game/nodes/playfield'));
	    for(var node = this.nodeList.head; node; node = node.next) {
		    this.addPlayfield(node);
	    }
	    this.nodeList.nodeAdded.add(this.addPlayfield, this);

        this.playerList = engine.getNodeList(require('game/nodes/player'));
	    for(var node = this.playerList.head; node; node = node.next) {
		    this.addPlayer(node);
	    }
	    this.playerList.nodeAdded.add(this.addPlayer, this);
    },
	addPlayfield: function (node) {
		Ti.API.info("CameraControlSystem.addPlayfield");
		this.playfield = node.playfield;
		this.cameraMoveTransform = platino.createTransform();
//		this.cameraMoveTransform.duration = 300+this.player.transform.transform.duration/s2;
//		this.cameraMoveTransform.delay = this.player.transform.transform.duration/s2;
//		this.cameraMoveTransform.easing = platino.ANIMATION_CURVE_SINE_IN_OUT;
//		this.homeTransform = platino.createTransform();
//		this.homeTransform.lookAt_eyeX = this.playfield.bgCenter.x;
//		this.homeTransform.lookAt_eyeY = this.playfield.bgCenter.y;
//		this.homeTransform.duration = scene1;
		//this.game.moveCamera(this.homeTransform);
	},
	addPlayer: function (node) {
		Ti.API.info("CameraControlSystem.addPlayer");
		this.player = node;
		this.playerState = node.player.state;
	},
    removeFromEngine: function (engine) {
        this.nodeList = null;
    },
	handleTouch: function (event) {

		if(event.type == "touchend" && this.inited){
			this.touchEvent = event;
			//Ti.API.info("CameraControlSystem.handleTouch:start a new camera move!");
		}else{
			this.touchEvent = null;
		}
	},
    update: function (time) {
	    if( this.playerList.head && this.player.player){
			if( // we just went from jumping to sitting, move camera.
		        this.playerList.head.player.state == this.playerStates.JUMPING_STATE &&
	            this.playerState == this.playerStates.POWERING_STATE
		    ){
				//Ti.API.info("CameraControlSystem.update:start a new camera move!");
			    var newX = this.player.transform.transform.lookAt_eyeX-this.player.display.view.width * 0.5;
			    var newY = this.player.transform.transform.lookAt_eyeY-this.player.display.view.height * 0.5;
			    if(newX > this.playfield.xMax){
				    this.cameraMoveTransform.lookAt_eyeX = this.playfield.xMax;
			    }
			    else if(newX < this.playfield.xMin){
				    this.cameraMoveTransform.lookAt_eyeX = this.playfield.xMin;
			    }else{
				    this.cameraMoveTransform.lookAt_eyeX = newX;
			    }
			    if(newY > this.playfield.yMax){
				    this.cameraMoveTransform.lookAt_eyeY = this.playfield.yMax;
			    }
			    else if(newY < this.playfield.yMin){
				    this.cameraMoveTransform.lookAt_eyeY = this.playfield.yMin;
			    }else{
				    this.cameraMoveTransform.lookAt_eyeY = newY;
			    }
				this.cameraMoveTransform.duration = this.player.transform.transform.duration/2;
				this.cameraMoveTransform.delay = this.player.transform.transform.duration/2;
				this.cameraMoveTransform.easing = platino.ANIMATION_CURVE_EASE_IN_OUT;
			    this.game.moveCamera(this.cameraMoveTransform);
		    }
		    this.playerState = this.playerList.head.player.state;
	    }
	}
});
module.exports = CameraControlSystem;