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

			this.lose = "lose";
			this.win = "win";
			this.doubleModel = false;

			this.mainMediator = null;
			this.subMediator = null;

			tgs.resetGame(function(data) {
                console.log("Reset remote game ok");
            }, true);

			this.gameStarted = false;
			this.render();	
		},

		render : function() {
			this.$singleCanvas.hide();
			this.$doubleCanvas.hide();
			this.$startMenu.fadeIn();
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.mainMediator = new MainMediator();

			this.gridView = new GridView({id : "grid"});
			this.gridView.setMediator(this.mainMediator);
			this.listenTo(this.gridView, 'finish', this.processFinish);
			this.gridView.initialize();			

			this.$startMenu.hide();
			this.$singleCanvas.fadeIn();
			this.gameStarted = true;
			this.doubleModel = false;

			this.gridView.start();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");

			this.mainMediator = new MainMediator();
			this.subMediator = new SubMediator();
			this.doubleModel = true;
			this.$startMenu.hide();
			this.$doubleMenu.fadeIn();

			var that = this;
			tgs.requestGame(function(data) {
				utils.log(data);
				if (data && data.status == "ok") {
					that.processDoublePlay();
					tgs.exchangeData({
						provider : that.processDataSend,
						process : that.processDataReceived,
						finish : that.processEndGame
					});
				}
            });						
		},

		processDataSend : function() {
			if (!this.gameStarted) {
				return "end";
			}
			return 	this.mainMediator.getGameData();
		},

		processDataReceived : function(receivedData) {
			var data = null;
			if (receivedData && receivedData.data) {
				data = receivedData.data;
				if (data == this.lose) {
					alert("You lose!");
					this.initialize();
				} else if (data == this.win) {
					alert("You win!");
					this.initialize();
				} else {
					this.subMediator.setGameData(JSON.parse(unescape(data)));
				}
			}
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
			this.gridView1 = new GridView({id : "grid1"});
			this.listenTo(this.gridView1, 'finish', this.processFinish);
			this.gridView1.setMediator(this.mainMediator);
			this.gridView1.initialize();

			this.gridView2 = new GridView({id : "grid2"});
			this.listenTo(this.gridView2, 'finish', this.processFinish);
			this.gridView2.setMediator(this.subMediator);			
			this.gridView2.initialize();

			this.$startMenu.hide();
			this.$doubleMenu.hide();
			this.$singleCanvas.hide();
			this.$doubleCanvas.fadeIn();

			this.gridView1.start();
			this.gridView2.start();

			this.gameStarted = true;
		},

		processFinish : function(score) {
			this.gameStarted = false;

			if (!this.doubleModel) {
				alert("Game over! Your score :" + score);
				this.render();
			}
		}
	});

	exports.AppView = AppView;

})(this, jQuery);