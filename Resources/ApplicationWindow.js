var platino = require('co.lanica.platino');
var TU = require ("/TitanUp/TitanUp");

(function()
{
	var ApplicationWindow = function()
	{
		var previousTime = 0;

		var window = Ti.UI.createWindow({
			backgroundColor: 'black',
			orientationModes: [Ti.UI.PORTRAIT, Ti.UI.UPSIDE_PORTRAIT], //others: Ti.UI.LANDSCAPE_LEFT, Ti.UI.LANDSCAPE_RIGHT
			fullscreen: true,
			navBarHidden: true
		});


		var game = platino.createGameView();
		game.fps = 30;
		//game.color(.s2, 0, scene1);
		game.debug = false; // disables debug logs (not to be used for production)

		var screenWidth = Ti.Platform.displayCaps.platformWidth;
		var screenHeight = Ti.Platform.displayCaps.platformHeight;

		game.TARGET_SCREEN = {
			width: screenWidth,
			height: screenHeight,
			density: Ti.Platform.displayCaps.density
		}

		game.touchScaleX = 1;
		game.touchScaleY = 1;

		// Loads MainScene.js as starting point to the app
		game.addEventListener('onload', function(e) {
			// set screen size for your game (TARGET_SCREEN size)
			var screenScale = game.size.height / game.TARGET_SCREEN.height;
			game.screen = {width:game.size.width / screenScale, height:game.size.height / screenScale};

			// Your game screen size is set here if you did not specifiy game width and height using screen property.
			// Note: game.size.width and height may be changed due to the parent layout so check them here.
			Ti.API.info("view size: " + game.size.width + "x" + game.size.height);
			Ti.API.info("game screen size: " + game.screen.width + "x" + game.screen.height);

			game.touchScaleX = game.screen.width  / game.size.width;
			game.touchScaleY = game.screen.height / game.size.height;

			game.screenScale = game.screenScaleY = game.screen.height / game.TARGET_SCREEN.height;
			game.screenScaleX = game.screen.width / game.TARGET_SCREEN.width;

			var GameScene  = require("GameScene");
			game.currentScene = new GameScene(window, game);
			var Signal = require('lib/ash/ash').Signals.Signal;
			game.touchSignal = new Signal();
			var Engine = require('lib/ash/ash').Engine;
			game.engine = new Engine();
			game.model = new GameModel();
			// push loading scene and start the game
			game.pushScene(game.currentScene);
			game.unpauseGame(); // adds touch listeners and enter frame handler
			game.start();
		});

		game.addEventListener('onsurfacechanged', function(e) {
			game.orientation = e.orientation;

		});

		game.setupSpriteSize = function(sprite) {
			var width = sprite.width / game.screenScaleX;
			var height = sprite.height / game.screenScaleY;
			sprite.width = (width < 1) ? 1 : width;
			sprite.height = (height < 1) ? 1 : height;
		};

		game.centerPointDiff = function(x, y) {
			var diffX = game.screen.width/2 - x;
			var diffY = game.screen.height/2 - y;
			return {x:diffX, y:diffY};
		};

		// Convenience function to convert Titanium coordinate from a Platino coordinate
		game.getTiScale = function(x, y) {
			return {
				x: (x / game.touchScaleX),
				y:(y / game.touchScaleY) }
		};

		game.pauseGame = function() {
			game.enableOnDrawFrameEvent = false;
			game.removeEventListener("enterframe", handleFrame);
			game.removeEventListener('touchstart', onTouch);
			game.removeEventListener('touchend', onTouch);
			game.removeEventListener('touchmove', onTouch);
		}
		game.unpauseGame = function() {
			game.enableOnDrawFrameEvent = true;
			game.addEventListener("enterframe", handleFrame);
			game.addEventListener('touchstart', onTouch);
			game.addEventListener('touchend', onTouch);
			game.addEventListener('touchmove', onTouch);
		}

		onTouch = function( event ) {
			var e = {
				type:event.type,
				source:event.source
			};
			var x = event.x / game.touchScaleX;
			var y = event.y / game.touchScaleY;

			e.x = x;
			e.y = y;

			game.touchSignal.dispatch( e );
		}

		handleFrame = function(e) {
			timestamp = Date.now();
			var tmp = previousTime || timestamp;
			previousTime = timestamp;
			var delta = (timestamp - tmp) * 0.001;
			if(game.engine)
			{
				game.engine.update(delta);
			}else{
				Ti.API.info("MainScene.handleFrame:no engine!!!");
			}
		};

		game.checkLineIntersection = function(line1StartX, line1StartY, line1EndX, line1EndY, line2StartX, line2StartY, line2EndX, line2EndY) {
			// if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment scene1 or line segment s2 contain the point
			var denominator, a, b, numerator1, numerator2, result = {
				x: null,
				y: null,
				onLine1: false,
				onLine2: false
			};
			denominator = ((line2EndY - line2StartY) * (line1EndX - line1StartX)) - ((line2EndX - line2StartX) * (line1EndY - line1StartY));
			if (denominator == 0) {
				return result;
			}
			a = line1StartY - line2StartY;
			b = line1StartX - line2StartX;
			numerator1 = ((line2EndX - line2StartX) * a) - ((line2EndY - line2StartY) * b);
			numerator2 = ((line1EndX - line1StartX) * a) - ((line1EndY - line1StartY) * b);
			a = numerator1 / denominator;
			b = numerator2 / denominator;

			// if we cast these lines infinitely in both directions, they intersect here:
			result.x = line1StartX + (a * (line1EndX - line1StartX));
			result.y = line1StartY + (a * (line1EndY - line1StartY));
			/*
			 // it is worth noting that this should be the same as:
			 x = line2StartX + (b * (line2EndX - line2StartX));
			 y = line2StartX + (b * (line2EndY - line2StartY));
			 */
			// if line1 is a segment and line2 is infinite, they intersect if:
			if (a > 0 && a < 1) {
				result.onLine1 = true;
			}
			// if line2 is a segment and line1 is infinite, they intersect if:
			if (b > 0 && b < 1) {
				result.onLine2 = true;
			}
			// if line1 and line2 are segments, they intersect if both of the above are true
			return result;
		};

		// shared view callback (for now)
		var closeTitleView = function(){
			window.remove(_titleView);
		};

		var returnTotitleView = function(){
			window.remove(_levelSelectView);
			game.openTitleView();
		};

		// setup  title view
		var handleContentSelected = function(e) {
			Ti.API.info("ApplicationWindow.handleContentSelected");
			closeTitleView();
			game.openLevelSelectView(e.source.data);
		};

		var TitleView = require('/views/TitleView')
		var _titleView = new TitleView(game.screenScaleX, game.screenScaleY, handleContentSelected, closeTitleView);

		game.openTitleView = function() {
			window.add(_titleView);
		};

		// setup  title view
		var handleLevelSelected = function(e) {
			Ti.API.info("ApplicationWindow.handleLevelSelected->" + e.rowData.data.label);
			Ti.API.info("ApplicationWindow.handleLevelSelected->" + e.rowData.data.data.fu);
			//Ti.API.info("ApplicationWindow.handleLevelSelected->" + e.rowData);
			window.remove(_levelSelectView);
		};

		var LevelSelectView = require('/views/LevelSelectView');
		var _levelSelectView = new LevelSelectView(game.screenScaleX, game.screenScaleY, handleLevelSelected, returnTotitleView);

		game.openLevelSelectView = function(content, context) {
			_levelSelectView.buildView(content, context);
			window.add(_levelSelectView);
		};

		//var _tryAgainView = null;
		//var _levelCompleteView = null;
		//var _sceneCompleteView = null;

		// Free up game resources when window is closed
		window.addEventListener('close', function(e) {
			game = null;
		});

		window.add(game);
		//window.add(_tv_menu);
		return window;
	};

	module.exports = ApplicationWindow;
})();