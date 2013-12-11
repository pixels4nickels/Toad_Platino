var levelModel = require('game/model/levelmodel');
var GameManager = require('lib/ash/ash').System.extend({
	creator: null,
	padNodes: null,
	levelData: null,
	playerStates: require('game/model/states').playerStates,
    constructor: function (width, height, creator){
	    this.width = width;
	    this.height = height;
	    this.creator = creator;
	    levelModel.reset();
	    this.levelData = levelModel.getCurrentLevelData();
	    Ti.API.info("GameManager.constructor:done");
	    return this;
    },

    addToEngine: function (game) {
	    this.player = game.getNodeList(require('game/nodes/player'));
	    this.jumpring = game.getNodeList(require('game/nodes/ring'));
	    this.playfield = game.getNodeList(require('game/nodes/playfield'));
	    this.padNodes = game.getNodeList(require('game/nodes/lillypad'));
    },

    update: function (time) {
	    var Point = require('lib/ash/ash').Point;

        //if(this.UIControls.empty()){
	    //    this.creator.createControls();  // add ship control entities
        //}

        if(this.playfield.empty())
        {
	        Ti.API.info("GameManager.update:createBackground");
            this.creator.createBackground();
        }
	    if(this.padNodes.empty())
	    {
		    this.creator.createPads(5, this.levelData);
	    }
	    if(this.jumpring.empty())
        {
	        Ti.API.info("GameManager.update:createRing");
            this.creator.createRing();
        }
	    if(this.player.empty())
        {
	        Ti.API.info("GameManager.update:createPlayer");
            this.creator.createPlayer();
        }else{
			    //Ti.API.info("GameManager.update:player state: " + this.player.head.player.state);
		    if(this.player.head.player.state == this.playerStates.SITTING_STATE && !this.player.head.player.parent){
		    }
	    }

    },

    removeFromEngine: function (game) {
	   // this.UIControls = null;
	    this.player = null;
	    this.playfield = null;
	    this.creator = null;
    }
});

module.exports = GameManager;
