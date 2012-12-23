(function(exports, $) {

	"use strict";
	
	var AppView = Backbone.View.extend({
		el : "body",

		events : {
			"keydown" : "handleInput"
		},

		initialize : function(options) {
			_.bindAll(this, "render", "handleInput");

		},

		render : function() {

		},

		handleInput : function(event) {
			utils.log("press key : " + event.keyCode);
		}
	});

	exports.AppView = AppView;

})(this, jQuery);