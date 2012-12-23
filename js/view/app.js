(function(exports, $) {

	"use strict";
	
	var GridView = Backbone.View.extend({
		initialize : function(options) {
			_.bindAll(this, "render");

		},

		render : function() {

		},
	});

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