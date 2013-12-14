var platino = require('co.lanica.platino');

require('co.lanica.chipmunk2d');
var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var DebugDraw = require("co.lanica.chipmunk2d.debugdraw");

var GameScene = function(window, game) {
	var scene = platino.createScene();
	var engine = null;
	var previousTime = 0;
	var SystemPriorities = null;
	var Signal = require('lib/ash/ash').Signals.Signal;
	var touchSignal = new Signal();

	var onSceneActivated = function(e) {

		SystemPriorities = require('game/systems/systempriorities');

		var EntityCreator = require('game/factory/entitycreator');
		var Engine = require('lib/ash/ash').Engine;

		var GameManager = require('game/systems/gamemanager');
		var JumpSystem = require('game/systems/jumpsystem');
		var RenderSystem = require('game/systems/rendersystem');
		var PhysicsSystem = require('game/systems/physicssystem');
		var LillyPadSystem = require('game/systems/lillypadsystem');
		var PlayerSystem = require('game/systems/playersystem');
		var CameraControlSystem = require('game/systems/cameracontrolsystem');

		var debugDraw = null;//new DebugDraw(platino, chipmunk, game, scene, {BB:false, Circle:true, Vertex:false, Poly:true, Constraint:true, ConstraintConnection:true});
		//debugDraw.active = true;
		var space = chipmunk.cpSpaceNew();
		engine = new Engine();
		var creator = new EntityCreator(engine, game, scene, space, debugDraw);



		var gameManager = new GameManager(
			game.screen.width,
			game.screen.height,
			creator
		);

		engine.addSystem(
			gameManager,
			SystemPriorities.preUpdate
		);
		engine.addSystem(
			new PhysicsSystem(space, touchSignal),
			SystemPriorities.physics
		);
		engine.addSystem(
			new CameraControlSystem(game, touchSignal),
			SystemPriorities.camera
		);
		engine.addSystem(
			new JumpSystem(game, touchSignal),
			SystemPriorities.jump
		);
		engine.addSystem(
			new PlayerSystem(game, space),
			SystemPriorities.player
		);
		engine.addSystem(
			new LillyPadSystem(game, space, creator, debugDraw),
			SystemPriorities.pads
		);
		engine.addSystem(
			new RenderSystem(scene, game, debugDraw),
			SystemPriorities.render
		);

		game.enableOnDrawFrameEvent = true;
		game.addEventListener("enterframe", handleFrame);
		game.addEventListener('touchstart', onTouch);
		game.addEventListener('touchend', onTouch);
		game.addEventListener('touchmove', onTouch);

		game.startCurrentScene();

	};

	var onSceneDeactivated = function(e) {
		game.enableOnDrawFrameEvent = false;
		game.removeEventListener("enterframe", handleFrame);
		game.removeEventListener('touchstart', onTouch);
		game.removeEventListener('touchend', onTouch);
		game.removeEventListener('touchmove', onTouch);
	};


	function onTouch( event ) {
		var e = {
			type:event.type,
			source:event.source
		};
		var x = event.x / game.touchScaleX;
		var y = event.y / game.touchScaleY;

		e.x = x;
		e.y = y;

		touchSignal.dispatch( e );
	}

	var handleFrame = function(e) {
		timestamp = Date.now();
		var tmp = previousTime || timestamp;
		previousTime = timestamp;
		var delta = (timestamp - tmp) * 0.001;
		if(engine)
		{
			engine.update(delta);
		}else{
			Ti.API.info("MainScene.handleFrame:no engine!!!");
		}
	};

	scene.addEventListener('activated', onSceneActivated);
	scene.addEventListener('deactivated', onSceneDeactivated);
	return scene;
};

module.exports = GameScene;
// ANIMATION_CURVE_EASE_IN_OUT
// ANIMATION_CURVE_EASE_IN
// ANIMATION_CURVE_EASE_OUT
// ANIMATION_CURVE_LINEAR
// ANIMATION_CURVE_CUBIC_IN_OUT
// ANIMATION_CURVE_CUBIC_IN
// ANIMATION_CURVE_CUBIC_OUT
// ANIMATION_CURVE_BACK_IN_OUT
// ANIMATION_CURVE_BACK_IN
// ANIMATION_CURVE_BACK_OUT
// ANIMATION_CURVE_ELASTIC_IN_OUT
// ANIMATION_CURVE_ELASTIC_IN
// ANIMATION_CURVE_ELASTIC_OUT
// ANIMATION_CURVE_BOUNCE_IN_OUT
// ANIMATION_CURVE_BOUNCE_IN
// ANIMATION_CURVE_BOUNCE_OUT
// ANIMATION_CURVE_EXPO_IN_OUT
// ANIMATION_CURVE_EXPO_IN
// ANIMATION_CURVE_EXPO_OUT
// ANIMATION_CURVE_QUAD_IN_OUT
// ANIMATION_CURVE_QUAD_IN
// ANIMATION_CURVE_QUAD_OUT
// ANIMATION_CURVE_SINE_IN_OUT
// ANIMATION_CURVE_SINE_IN
// ANIMATION_CURVE_SINE_OUT
// ANIMATION_CURVE_CIRC_IN_OUT
// ANIMATION_CURVE_CIRC_IN
// ANIMATION_CURVE_CIRC_OUT
// ANIMATION_CURVE_QUINT_IN_OUT
// ANIMATION_CURVE_QUINT_IN
// ANIMATION_CURVE_QUINT_OUT
// ANIMATION_CURVE_QUART_IN_OUT
// ANIMATION_CURVE_QUART_IN
// ANIMATION_CURVE_QUART_OUT