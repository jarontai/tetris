(function(exports, $) {

	"use strict";
	
	var AppView = Backbone.View.extend({
		el : "body",

		events : {
			"click #start1" : "singlePlay",
			"click #start2" : "doublePlay"
		},

		initialize : function(options) {
			_.bindAll(this);

			this.$menu = $("#menu");
			this.$single = $("#single");
			this.$double = $("#double");
			this.startFlag = false;
			this.render();
		},

		render : function() {
			this.$single.hide();
			this.$menu.fadeIn();
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.gridView = new GridView({id : "grid"});
			this.gridView.setMediator(new Mediator());
			this.listenTo(this.gridView, 'finish', this.processFinish);
			this.gridView.initialize();			

			this.$menu.hide();
			this.$single.fadeIn();
			this.startFlag = true;

			this.gridView.start();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");

			this.gridView1 = new GridView({id : "grid1"});
			this.listenTo(this.gridView1, 'finish', this.processFinish);
			this.gridView1.initialize();


			this.gridView2 = new GridView({id : "grid2"});
			this.listenTo(this.gridView2, 'finish', this.processFinish);
			this.gridView2.initialize();								

			this.$menu.hide();
			this.$double.fadeIn();
			this.startFlag = true;
		},

		processFinish : function(score) {
			alert("Game over! Your score :" + score);
			this.render();
		}
	});

	exports.AppView = AppView;

})(this, jQuery);