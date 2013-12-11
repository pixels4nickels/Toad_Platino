var Playfield = require('lib/ash/ash').Class.extend({
	screenWidth: null,
	screenHeight: null,
	screenCenter: null,
	bgWidth: null,
	bgHeight: null,
	bgCenter: null,
	xMax:0,
	xMin:0,
	yMax:0,
	yMin:0,
	constructor: function (bgWidth, bgHeight, screenWidth, screenHeight) {
		this.screenWidth = screenWidth;
		this.screenHeight = screenHeight;
		this.bgWidth = bgWidth;
		this.bgHeight = bgHeight;
		// derived
		this.bgCenter = {
			x:this.bgWidth * 0.5,
			y:this.bgHeight * 0.5
		}  ;
		this.screenCenter = {
			x:this.screenWidth * 0.5,
			y:this.screenHeight * 0.5
		};
		this.xMax = (this.bgWidth - this.screenWidth/2);
		this.xMin = this.screenWidth/2;
		this.yMax = (this.bgHeight - this.screenHeight/2);
		this.yMin = this.screenHeight/2;
		return this;
	},
	centerPointDiff : function(x, y) {
		var diffX = this.screenCenter.x - x; // screenCenter.x is also the width of the screen
		var diffY = this.screenCenter.y - y;
		return {x:diffX, y:diffY};
	}
});
module.exports = Playfield;