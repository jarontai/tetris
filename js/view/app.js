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

			this.$menu = $("#menu");
			this.$main = $("#main");

			this.gridView = null;

			this.render();
		},

		render : function() {
			this.$main.hide();
			this.$menu.fadeIn();
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.$menu.hide();
			this.$main.fadeIn();

			this.gridView = new GridView();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");
		},

		handleInput : function(event) {
			utils.log("press key : " + event.keyCode);

			if (this.gridView) {
				this.gridView.handleInput(event.keyCode);
			}
		}
	});

	exports.AppView = AppView;

})(this, jQuery);