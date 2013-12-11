require('co.lanica.chipmunk2d');

var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var RenderSystem = require('lib/ash/ash').System.extend({
	scene: null,
	game: null,
	debugDraw: null,
	//nodes: null,
	physicsNodes: null,
	constructor: function (scene, game, debugDraw) {
		Ti.API.info("RenderSystem.constructor:done");
		this.debugDraw = debugDraw;
		this.scene = scene;
		this.game = game;
		return this;
	},

	addToEngine: function (engine) {
		this.physicsNodes = engine.getNodeList(require('game/nodes/physicsrender'));
		for(var node = this.physicsNodes.head; node; node = node.next) {
			this.addToDisplay(node);
		}
		this.physicsNodes.nodeAdded.add(this.addToDisplay, this);
		this.physicsNodes.nodeRemoved.add(this.removeFromDisplay, this);

		this.nodes = engine.getNodeList(require('game/nodes/render'));
		for(var node = this.nodes.head; node; node = node.next) {
			this.addToDisplay(node);
		}
		this.nodes.nodeAdded.add(this.addToDisplay, this);
		this.nodes.nodeRemoved.add(this.removeFromDisplay, this);
	},

	removeFromEngine: function (engine) {
		this.nodes = null;
		this.physicsNodes = null;
	},

	addToDisplay: function (node) {
		//Ti.API.info("RenderSystem.addToDisplay:"+node.display.view);
		if(node){
			this.scene.add(node.display.view);
		}

	},

	removeFromDisplay: function (node) {
		this.scene.remove(node.display.view);
	},

	update: function (time) {

		for (node = this.physicsNodes.head; node; node = node.next) {
			if (!chipmunk.cpBodyIsSleeping(node.body.body)) {
				view = node.display.view;
				position = chipmunk.cpBodyGetPos(node.body.body);
				view.x = position.x - view.width/2;
				view.y = this.cpY(position.y + view.height/2);
				view.angle = this.cpAngle(chipmunk.cpBodyGetAngle(node.body.body));
				//padSprite.width/s2*padSprite.scaleX, padSprite.height/s2*padSprite.scaleY
			}
		}
		if ((this.debugDraw != null) && (this.debugDraw.active)) {
			this.debugDraw.update();
		}

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

//	syncSpritesWithPhysics: function() {
//		var i, pos, angle;
//
//		for (i = 0; i < pSprites.length; i++) {
//			if (!chipmunk.cpBodyIsSleeping(pBodies[i])) {
//				pos = chipmunk.cpBodyGetPos(pBodies[i]);
//				angle = cpAngle(chipmunk.cpBodyGetAngle(pBodies[i]));
//
//				pSprites[i].x = pos.x - (pSprites[i].width * 0.5);
//				pSprites[i].y = cpY(pos.y) - (pSprites[i].height * 0.5);
//				pSprites[i].angle = angle;
//			}
//		}
//
//		if ((debugDraw != null) && (debugDraw.active)) {
//			debugDraw.update();
//		}
//
//	};


});

module.exports = RenderSystem;

