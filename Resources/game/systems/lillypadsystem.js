var platino = require('co.lanica.platino');
require('co.lanica.chipmunk2d');
var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var LillyPadSystem = require('lib/ash/ash').System.extend({
	playerStates: require('game/model/states').playerStates,
	padStates: require('game/model/states').padStates,
	game: null,
	debugDraw: null,
	space: null,
	creator: null,
	padList: null,
	playerList: null,
	sinkTransformListener: null,
	constructor: function (game, space, creator, debugDraw) {
		Ti.API.info("LillyPadSystem.constructor ");
		this.game = game;
		this.debugDraw = debugDraw;
		this.space = space;
		this.creator = creator;
		return this;
	},

	addToEngine: function (engine) {
		this.padList = engine.getNodeList(require('game/nodes/lillypad'));

		this.playerList = engine.getNodeList(require('game/nodes/player'));
		for(var node = this.playerList.head; node; node = node.next) {
			this.addPlayer(node);
		}
		this.playerList.nodeAdded.add(this.addPlayer, this);
	},

	addPlayer: function (node) {
		Ti.API.info("LillyPadSystem.addPlayer");
		this.player = node;
		this.playerState = node.player.state;  // using value here to store value instead of reference..VERY IMPORTANT for testing state changes!
	},

	removeFromEngine: function (engine) {
		this.nodeList = null;
	},

	update: function (time) {
		if( this.padList.head ){
			var timestamp = Date.now();
			for (node = this.padList.head; node; node = node.next) {
				 if(
					 node.pad.state == this.padStates.TOUCHED_STATE &&
					 node.pad.expirationTime <= timestamp &&
					 node.pad.expirationTime >= 0
				 ){
					 Ti.API.info("LillyPadSystem.update:SINKING");
					 node.pad.state = this.padStates.SINKING_STATE;
					 this.sinkPad(node);
				 }
			}
		}
	},

	sinkPad : function(node){

		node.transform.transform.duration = 3000;
		node.transform.transform.alpha = 0;
		node.transform.transform.easing = platino.ANIMATION_CURVE_BOUNCE_IN_OUT;
		this.sinkTransformListener = this.onSinkComplete( this, node );
		node.transform.transform.addEventListener( 'complete', this.sinkTransformListener );
		node.display.view.transform(node.transform.transform);
	},

	onSinkComplete : function(system, node)
	{
		var system = system;
		var node = node;
		var onSinkTransformComplete = function(e){
			//system.player.display.view.animate(6,11,10,0);
			if(node.transform.transform){
				node.transform.transform.removeEventListener('complete', system.sinkTransformListener);
			}
			if(system.player.player.parent === node){
				system.player.player.state = system.playerStates.SWIMMING_STATE;
				Ti.API.info("PLAYER STATE CHANGE: SWIMMING");
			}
			system.destroyPad(node);
		}
		return onSinkTransformComplete;
	},
	destroyPad : function(node){
		if (this.debugDraw != null) {
			this.debugDraw.removeBody(node.body.body);
		}
		chipmunk.cpSpaceRemoveBody(this.space, node.body.body);
		chipmunk.cpBodyFree(node.body.body);
		chipmunk.cpSpaceRemoveShape(this.space, node.shape.shape);
		chipmunk.cpShapeFree(node.shape.shape);
		this.creator.destroyEntity(node.entity);
		Ti.API.info("LillyPadSystem.destroyPad:SUNK");
	}
});

module.exports = LillyPadSystem;

