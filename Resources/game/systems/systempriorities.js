var SystemPriorities = function(){
    this.preUpdate = 1;
	this.physics = 8;
	this.jump = 3;
	this.player = 4;
	this.pads = 5;
    this.camera = 6;
	this.render = 7;
	return this;
};
module.exports = SystemPriorities;
