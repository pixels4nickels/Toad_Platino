var ash = require('lib/ash/ash');
var platino = require('co.lanica.platino');

var AssetFactory = ash.Class.extend({
	rippleObjectPool: null,
	ripplesInUseObjectPool:null,
	padSizes: {
		0:1.8,
		1:1.7,
		2:1.6,
		3:1.5
	},
	bgDepth : 0,
	padStartDepth : 103,
	ringDepth : 100,
	playerDepth: 1,
	constructor: function () {
		Ti.API.info("AssetFactory.constructor:done");
		return this;
	},

	initializeRippleObjectPool : function(scene, num){
		var rippleNum = num?num:10;
		rippleObjectPool = new Array();
		ripplesInUseObjectPool = new Array();
		for (var i=0;i<rippleNum;i++){
			var ripple = platino.createSpriteSheet({image:'graphics/ripple.png', width:190, height:188, frames:37});
			rippleObjectPool.push(ripple);
			scene.add(ripple);
		}
	},
	updateRipplePools : function(){
		for (var i=0;i<ripplesInUseObjectPool.length;i++){
			Ti.API.info("AssetFactory:updateRipplePools ripple with frame of " + ripplesInUseObjectPool[i].frame);
			if(ripplesInUseObjectPool[i].frame >= 36){
				returnRippleToObjectPool(ripplesInUseObjectPool[i]);
			}
		}
	},
	getRipple : function(){
		var ripple = rippleObjectPool.pop();
		ripplesInUseObjectPool.push(ripple);
		Ti.API.info("AssetFactory:getRipple  AVAILABLE->" + rippleObjectPool.length);
		Ti.API.info("AssetFactory:getRipple     IN USE->" + ripplesInUseObjectPool.length);
		updateRipplePools();
		return ripple;
	},

	returnRippleToObjectPool : function(item){
		var index = ripplesInUseObjectPool.indexOf(item);
		var ripple = ripplesInUseObjectPool.splice(index, 1)[0];
		if(ripple && index > -1){
			rippleObjectPool.push(ripple);
			Ti.API.info("AssetFactory:returnRippleToObjectPool AVAILABLE->" + rippleObjectPool.length);
			Ti.API.info("AssetFactory:returnRippleToObjectPool    IN USE->" + ripplesInUseObjectPool.length);
		}else{
			Ti.API.info("AssetFactory:returnRippleToObjectPool no item found in ripplesInUseObjectPool--------------------------------------------------!!!!!!!!!!");
		}

	},

	createStartingPoint : function(center) {
		var startingPoint = platino.createSprite({
			image: 'graphics/island.png',
			width: 242,
			height: 255,
			anchorPoint:{
				x:0.5,
				y:0.5
			}
		});
		if(center){
			startingPoint.center = center;
		}
		startingPoint.scale(0.4, 0.4);

		return startingPoint;
	},

	createPlayer : function(center) {
		var player = platino.createSpriteSheet({
			image: 'graphics/toad.png',
			width: 75,
			height: 75,
			frames:11,
			z:this.playerDepth,
			anchorPoint:{
				x:0.5,
				y:0.5
			}
		});
		//player.scale(0.5, 0.5);
		if(center){
			player.center = center;
		}
		return player;
	},

	createBackground: function() {
		var backgroundSprite = platino.createSprite({
			image: 'graphics/pondArt.png',
			width: 1152,
			height: 1536,
			alpha:0.5,
			anchorPoint:{
				x:0.5,
				y:0.5
			}
		});
		return backgroundSprite;
	},

	createLives : function(){
		var lives = platino.createSpriteSheet({image:'graphics/lives.xml'});
		return lives;
	},

	createSplash : function(){
		var splash = platino.createSpriteSheet({image:'graphics/splash.png', width:50, height:50, frames:5, alpha:0});
		return splash;
	},

	createStartButton : function(){
		var startButton = platino.createSprite({image:'graphics/startButton.png'});
		return startButton;
	},

	createRing : function(){
		var ring = platino.createSprite({
			image: 'graphics/jumpRing2.png',
			width: 800,
			height: 800,
			z:this.ringDepth,
			anchorPoint:{
				x:0.5,
				y:0.5
			},
			alpha:0
		});
		//ring.setStrokeWidth(3);
		//ring.color(scene1,0.5,0.5);
		//ring.drawCircle(400, 400, 398);
		return ring;
	},

	 createPad : function(x, y, t){
		 this.padStartDepth++ ;
		 var pad = platino.createSpriteSheet(
			{
				image:'graphics/pad.png',
				width:80,
				height:80,
				z:this.padStartDepth,
				alpha:1,
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
		pad.scale(padSizes[t], padSizes[t]);
		pad.angle = Math.random()*359 +1;
		return pad;
	}

});
module.exports = AssetFactory;

