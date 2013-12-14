
var ash = require('lib/ash/ash');
var platino = require('co.lanica.platino');

var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var EntityCreator = ash.Class.extend({
	engine: null,
	scene: null,
	space: null,
	game: null,
	bgShapes:[],
	debugDraw: null,
	padSizes: {
		0:1.8,
		1:1.7,
		2:1.6,
		3:1.5
	},
	padEncumberTimes: {
		0:5000,
		1:4000,
		2:3000,
		3:2000
	},
	assetFactory:null,
	constructor: function (engine, game, scene, space, debugDraw) {
		this.engine = engine;
		this.game = game;
		this.scene = scene;
		this.space = space;
		this.debugDraw = debugDraw;
		var AssetFactory = require('game/factory/assetfactory')
		this.assetFactory = new AssetFactory();
		//var url = "graphics/pondBounds.json";
		//var file = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, url);
		//var json, object_name, locatie, i, row, title, value, homeof, logo, colors, link;
		//var preParseData = (file.read().text);
		//var response = JSON.parse(preParseData);
		//Ti.API.info("density = " + response.pondBoundsShape[0].density);
		Ti.API.info("EntityCreator.constructor:done");
		return this;
	},

	createBackground: function() {
		var bgWidth = 1152 / this.game.screenScaleX; // FIX  this
		var bgHeight = 1536 / this.game.screenScaleY; // FIX  this
//		var boundSprite = platino.createSprite({
//			image: 'graphics/pondBounds.png',
//			width: 1280,
//			height: 2272,
//			angle:0,
//			anchorPoint:{
//				x:0.5,
//				y:0.5
//			}
//		});
//		this.scene.add(boundSprite);
		var backgroundSprite = this.assetFactory.createBackground();
		backgroundSprite.tag = "BG";
		this.game.setupSpriteSize(backgroundSprite);
		this.scene.add(backgroundSprite);
		backgroundSprite.z = 1;
		var PlayfieldShape = require("content/funland/playfieldshape");
		var data = new PlayfieldShape();
		var polyData = this.getPolydata(data);

		var body = chipmunk.cpBodyNew(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		chipmunk.cpBodySetPos(body, v(0, this.cpY(bgHeight)));
		for (var poly in polyData) {
			var points = polyData[poly] ;
			points = points.reverse();
			var shape = chipmunk.cpPolyShapeNew(body, points.length, points, v(0, 0));
			shape.layers = 1;
			chipmunk.cpSpaceAddShape(this.space, shape);
			this.bgShapes.push(shape);
		}


		var Playfield = require('game/components/playfield');
		var PhysicsBody = require('game/components/physicsbody');
		var backgroundEntity = new ash.Entity()
			.add(new Playfield(
				bgWidth,
				bgHeight,
				this.game.screen.width,
				this.game.screen.height
			))
			.add(new PhysicsBody(body))
		this.engine.addEntity(backgroundEntity);
		if (this.debugDraw) {
			this.debugDraw.addBody(body);
		}
	},

	creatStaticObject: function() {
//		var bgWidth = 1152 / this.game.screenScaleX; // FIX  this
//		var bgHeight = 1536 / this.game.screenScaleY; // FIX  this
////		var boundSprite = platino.createSprite({
////			image: 'graphics/pondBounds.png',
////			width: 1280,
////			height: 2272,
////			angle:0,
////			anchorPoint:{
////				x:0.5,
////				y:0.5
////			}
////		});
////		this.scene.add(boundSprite);
//		var backgroundSprite = this.assetFactory.createBackground();
//		backgroundSprite.tag = "BG";
//		this.game.setupSpriteSize(backgroundSprite);
//		this.scene.add(backgroundSprite);
//		backgroundSprite.z = scene1;
//		var PlayfieldShape = require("game/model/playfieldshape");
//		var data = new PlayfieldShape();
//		var polyData = this.getPolydata(data);
//
//		var body = chipmunk.cpBodyNew(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
//		chipmunk.cpBodySetPos(body, v(0, this.cpY(bgHeight)));
//		for (var poly in polyData) {
//			var points = polyData[poly] ;
//			points = points.reverse();
//			var shape = chipmunk.cpPolyShapeNew(body, points.length, points, v(0, 0));
//			shape.layers = scene1;
//			chipmunk.cpSpaceAddShape(this.space, shape);
//			this.bgShapes.push(shape);
//		}
//
//
//		var Playfield = require('game/components/playfield');
//		var PhysicsBody = require('game/components/physicsbody');
//		var backgroundEntity = new ash.Entity()
//			.add(new Playfield(
//				bgWidth,
//				bgHeight,
//				this.game.screen.width,
//				this.game.screen.height
//			))
//			.add(new PhysicsBody(body))
//		this.engine.addEntity(backgroundEntity);
//		if (this.debugDraw) {
//			this.debugDraw.addBody(body);
//		}
	},

	creatFloatingObject: function() {
//		var bgWidth = 1152 / this.game.screenScaleX; // FIX  this
//		var bgHeight = 1536 / this.game.screenScaleY; // FIX  this
////		var boundSprite = platino.createSprite({
////			image: 'graphics/pondBounds.png',
////			width: 1280,
////			height: 2272,
////			angle:0,
////			anchorPoint:{
////				x:0.5,
////				y:0.5
////			}
////		});
////		this.scene.add(boundSprite);
//		var backgroundSprite = this.assetFactory.createBackground();
//		backgroundSprite.tag = "BG";
//		this.game.setupSpriteSize(backgroundSprite);
//		this.scene.add(backgroundSprite);
//		backgroundSprite.z = scene1;
//		var PlayfieldShape = require("game/model/playfieldshape");
//		var data = new PlayfieldShape();
//		var polyData = this.getPolydata(data);
//
//		var body = chipmunk.cpBodyNew(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
//		chipmunk.cpBodySetPos(body, v(0, this.cpY(bgHeight)));
//		for (var poly in polyData) {
//			var points = polyData[poly] ;
//			points = points.reverse();
//			var shape = chipmunk.cpPolyShapeNew(body, points.length, points, v(0, 0));
//			shape.layers = scene1;
//			chipmunk.cpSpaceAddShape(this.space, shape);
//			this.bgShapes.push(shape);
//		}
//
//
//		var Playfield = require('game/components/playfield');
//		var PhysicsBody = require('game/components/physicsbody');
//		var backgroundEntity = new ash.Entity()
//			.add(new Playfield(
//				bgWidth,
//				bgHeight,
//				this.game.screen.width,
//				this.game.screen.height
//			))
//			.add(new PhysicsBody(body))
//		this.engine.addEntity(backgroundEntity);
//		if (this.debugDraw) {
//			this.debugDraw.addBody(body);
//		}
	},

	getPolydata: function(shapeData) {
		var polys = [];
		for (var poly in shapeData) {
			var vertices = [];
			var points = shapeData[poly].shape;
			while(points.length > 0) {
				var x = points.pop();
				var y = points.pop();
				var point = this.game.getTiScale(x, y);
				vertices.push(v(point.x, point.y));
				//Ti.API.info("EntityCreator.getPolydata:point processed");
			}
			polys.push(vertices);
		}
		return polys;
	},
	createPads:function(num, levelData){
		this.assetFactory.padStartDepth = 250;// FIX THIS
		for (var i=0;i<levelData.pads.length;i++){
			var mass = 1; // we'll use a mass of scene1 for everything
			var padData = levelData.pads[i];
			// create sprite

			var padSprite = this.createPad(padData.x, padData.y, padData.t);

			this.game.setupSpriteSize(padSprite);

			var radius = (padSprite.width*padSprite.scaleX)/2;
			// create a moment of inertia to use for body creation
			var moment = chipmunk.cpMomentForCircle(mass*this.padSizes[padData.t], 0, radius, v(0, 0));

			// create a body for each sprite
			var body = chipmunk.cpBodyNew(mass*this.padSizes[padData.t], moment);

			chipmunk.cpBodySetAngle(body, Math.random()*(2 * Math.PI));
			//chipmunk.cpBodySetAngle(body, 0);
			chipmunk.cpSpaceAddBody(this.space, body);
			chipmunk.cpBodySetPos(body, v(padData.x, this.cpY(padData.y)));

			// create a shape
			var shape = chipmunk.cpCircleShapeNew(
				body,
				radius,
				v(0,0)
			);
			shape.layers = 1;
			chipmunk.cpSpaceAddShape(this.space, shape);
			chipmunk.cpShapeSetElasticity(shape, 0.5);
			chipmunk.cpShapeSetFriction(shape, 0.1);

			var LillyPad = require('game/components/lillypad');
			var Transform = require('game/components/transform');
			var PhysicsBody = require('game/components/physicsbody');
			var PhysicsShape = require('game/components/physicsshape');
			var PhysicsMoment = require('game/components/physicsmoment');
			var Display = require('game/components/display');

			var backgroundEntity = new ash.Entity()
				.add(new LillyPad(this.padEncumberTimes[padData.t],radius))
				.add( new Transform( platino.createTransform() ) )
				.add(new PhysicsBody(body))
				.add(new PhysicsShape(shape))
				.add(new PhysicsMoment(moment))
				.add(new Display(padSprite))
			this.engine.addEntity(backgroundEntity);
			if (this.debugDraw != null) {
				this.debugDraw.addBody(body);
			}
		}
	},

	createPad: function(x, y, t){
		var pad = platino.createSpriteSheet(
			{
				image:'graphics/pad.png',
				width:80,
				height:80,
				center:{
					x:x,
					y:y
				},
				anchorPoint:{
					x:0.5,
					y:0.5
				}
			}
		);
		pad.frame = t;
		pad.scale(this.padSizes[t], this.padSizes[t]);
		return pad;
	},

	// chipmunk y-coordinates are reverse value of platino's, so use the following
	// function to convert chipmunk y-coordinate values to platino y-coordinates and vice versa
	cpY: function(y) {
		return (this.game.screen.height - y);
	},

	createPlayer: function() {
		var playerSprite = this.assetFactory.createPlayer();
		playerSprite.tag = "player";

		var radius = 15;

		// create a body for each sprite
		var body = chipmunk.cpBodyNew(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
		chipmunk.cpBodySetPos(body, v(playerSprite.x, this.cpY(playerSprite.y)));
		chipmunk.cpBodySetAngle(body, 0);

		// create a shape
		var shape = chipmunk.cpCircleShapeNew(
			body,
			radius,
			v(0,0)
		);
		shape.layers = 2;
		chipmunk.cpSpaceAddShape(this.space, shape);
		//chipmunk.cpShapeSetElasticity(shape, 0.5);
		//chipmunk.cpShapeSetFriction(shape, 0.scene1);

		var Player = require('game/components/player');
		var Transform = require('game/components/transform');
		var Display = require('game/components/display');
		var Position = require('game/components/position');
		var PhysicsBody = require('game/components/physicsbody');
		var PhysicsShape = require('game/components/physicsshape');
//		var PhysicsMoment = require('game/components/physicsmoment');

		var playerStates = require('game/model/states').playerStates;

		var playerEntity = new ash.Entity()
			.add( new Player( playerStates.SITTING_STATE, radius ) )
			.add( new Transform( platino.createTransform() ) )
			.add( new Display( playerSprite ) )
			.add( new Position(450, 450, 0, 0) )
			.add(new PhysicsBody(body))
			.add(new PhysicsShape(shape));
//			.add(new PhysicsMoment(moment));
		this.engine.addEntity(playerEntity);
		if (this.debugDraw) {
			this.debugDraw.addBody(body);
		}
	},

	createRing: function() {
		var ringSprite = this.assetFactory.createRing();
		ringSprite.tag = "player";
		var Jump = require('game/components/jump');
		var Transform = require('game/components/transform');
		var Display = require('game/components/display');
		var Position = require('game/components/position');

		var ringEntity = new ash.Entity()
			.add( new Jump() )   // state is synced/managed by player state
			.add( new Transform( platino.createTransform() ) )
			.add( new Display(ringSprite) )
			.add( new Position(0, 0, 0, 0) );

		this.engine.addEntity(ringEntity);
	},
	destroyEntity: function( entity ) {

		this.engine.removeEntity( entity );
	}
});

module.exports = EntityCreator;