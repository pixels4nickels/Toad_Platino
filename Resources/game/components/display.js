var Display = require('lib/ash/ash').Class.extend({
    view: null,
	constructor: function (view) {
        this.view = view;
	    return this;
    }
});

module.exports = Display;

