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
			_.bindAll(this);

			this.$menu = $("#menu");
			this.$main = $("#main");
			this.startFlag = false;
			this.gridView = new GridView();
			this.render();

			this.listenTo(this.gridView, 'finish', this.processFinish);
		},

		render : function() {
			this.$main.hide();
			this.$menu.fadeIn();
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.$menu.hide();
			this.$main.fadeIn();
			this.startFlag = true;

			this.gridView.initialize();
			this.gridView.start();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");

			alert("双人对战开发中...");
		},

		handleInput : function(event) {
			utils.log("press key : " + event.keyCode);

			if (this.startFlag) {
				this.gridView.handleInput(event.keyCode);
			}
		},

		processFinish : function(score) {
			alert("Game over! Your score :" + score);
			this.render();
		}
	});

	exports.AppView = AppView;

})(this, jQuery);