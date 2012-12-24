(function(exports, $) {

	"use strict";
	
	var AppView = Backbone.View.extend({
		el : "body",

		events : {
			"click #start1" : "singlePlay",
			"click #start2" : "doublePlay",
			"keydown" : "handleInput"
		},

		initialize : function(options) {
			_.bindAll(this, "render", "handleInput");

			this.gridView = new GridView();
		},

		render : function() {

		},

		singlePlay : function() {
			utils.log("singlePlay!!!");
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");
		},

		handleInput : function(event) {
			utils.log("press key : " + event.keyCode);
		}
	});

	exports.AppView = AppView;

})(this, jQuery);