var platino = require('co.lanica.platino');

require('co.lanica.chipmunk2d');
var chipmunk = co_lanica_chipmunk2d;
var v = chipmunk.cpv;

var PhysicsSystem = require('lib/ash/ash').System.extend({
	space: null,
	touchEvent: null,
	inited: false,
	nodeList: null,
	TICKS_PER_SECOND: 160.0, // recommended between 60 and 240; higher = more accuracy (but higher CPU load)
	accumulator: 0.0,

	constructor: function (space, touchSignal) {
		Ti.API.info("PhysicsSystem.constructor:done");
		this.space = space;
		// Create chipmunk space
		chipmunk.cpInitChipmunk();
		this.space.damping = 0.5;
		//var data = new chipmunk.cpSpaceAddCollisionHandlerContainer();
		//chipmunk.cpSpaceAddCollisionHandler(space, 0, 0, begin, preSolve, postSolve, separate, data);
		chipmunk.cpSpaceSetGravity(this.space, v(0, 0));
		chipmunk.cpSpaceSetSleepTimeThreshold(this.space, 0.5);
		chipmunk.cpSpaceSetCollisionSlop(this.space, 0.5);
	    return this;
    },

    addToEngine: function (engine) {

    },

    removeFromEngine: function (engine) {
        //this.nodeList = null;
    },

	handleTouch: function (event) {
		//if(event.type == "touchend" && this.inited){
		//}
	},

    update: function (time) {
	    this.stepPhysics(time);
	},

	stepPhysics: function(delta) {
		var dt = delta/10.0;
		var fixed_dt = 1.0/this.TICKS_PER_SECOND;

		// add the current dynamic timestep to the accumulator
		this.accumulator += dt;

		while(this.accumulator > fixed_dt) {
			chipmunk.cpSpaceStep(this.space, fixed_dt);
			this.accumulator -= fixed_dt;
		}
	}
});
module.exports = PhysicsSystem;