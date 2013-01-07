(function(exports, $) {

	"use strict";
	
	var AppView = Backbone.View.extend({
		el : "body",

		events : {
			"click #start1" : "singlePlay",
			"click #start2" : "doublePlay",
			"click #cancelDouble" : "processCanelDouble"
		},

		initialize : function(options) {
			_.bindAll(this);

			this.$startMenu = $("#start-menu");
			this.$doubleMenu = $("#double-menu");
			this.$singleCanvas = $("#singleCanvas");
			this.$doubleCanvas = $("#doubleCanvas");
			

			this.startFlag = false;
			this.render();
		},

		render : function() {
			this.$singleCanvas.hide();
			this.$doubleCanvas.hide();
			this.$startMenu.fadeIn();
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.gridView = new GridView({id : "grid"});
			this.gridView.setMediator(new Mediator());
			this.listenTo(this.gridView, 'finish', this.processFinish);
			this.gridView.initialize();			

			this.$startMenu.hide();
			this.$singleCanvas.fadeIn();
			this.startFlag = true;

			this.gridView.start();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");

			this.$startMenu.hide();
			this.$doubleMenu.fadeIn();

			var that = this;

			tgs.requestGame(function(data) {
				utils.log(data);

				if (data && data.status == "ok") {
					tgs.exchangeData({
						provider : that.processDataSend,
						process : that.processDataReceived,
						finish : that.processEndGame
					});
				}

            });						
		},

		processDataSend : function() {
			return 	"" + (Math.random() * 10);
		},

		processDataReceived : function(data) {
			utils.log("receive exchange data: " + $.param(data));
		},

		processEndGame : function(data) {
			utils.log("exchange data is finish!!!");
			alert("You " + data + "!");
		},

		processCanelDouble : function() {
			this.$doubleMenu.hide();			
			this.$startMenu.fadeIn();

			tgs.resetGame(function() {
                console.log("reset remote game ok");
            });
		},

		processDoublePlay : function() {
			var mediator = new Mediator();

			this.gridView1 = new GridView({id : "grid1"});
			this.listenTo(this.gridView1, 'finish', this.processFinish);
			this.gridView1.setMediator(mediator);
			this.gridView1.initialize();


			this.gridView2 = new GridView({id : "grid2"});
			this.listenTo(this.gridView2, 'finish', this.processFinish);
			this.gridView2.setMediator(mediator);			
			this.gridView2.initialize();

			this.$menu.hide();
			this.$double.fadeIn();
			this.startFlag = false;
		},

		processFinish : function(score) {
			alert("Game over! Your score :" + score);
			this.render();
		}
	});

	exports.AppView = AppView;

})(this, jQuery);