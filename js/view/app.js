(function(exports, $) {

	"use strict";
	
	var AppView = Backbone.View.extend({
		el : "body",

		events : {
			"click #start1" : "singlePlay",
			"click #start2" : "doublePlay",
			"click #start3" : "remotePlay",			
			"click #cancelDouble" : "processCanelDouble"
		},

		initialize : function(options) {
			_.bindAll(this);

			this.$startMenu = $("#start-menu");
			this.$doubleMenu = $("#double-menu");
			this.$singleCanvas = $("#singleCanvas");
			this.$doubleCanvas = $("#doubleCanvas");
			this.$singleInfo = $("#single-info");
			this.$doubleInfo = $("#double-info");

			this.lose = "lose";
			this.win = "win";
			this.gameModel = "";

			this.mainMediator = null;
			this.subMediator = null;

			tgs.resetGame(function(data) {
                console.log("Reset remote game ok");
            }, true);

			this.counter = 0;
			this.gameStarted = false;
			this.render();	
		},

		render : function() {
			this.$singleCanvas.hide();
			this.$doubleCanvas.hide();
			this.$startMenu.fadeIn();
			this.$singleInfo.show();
			this.$doubleInfo.hide();			
		},

		singlePlay : function() {
			utils.log("singlePlay!!!");

			this.gameModel = "single";
			this.mainMediator = new MainMediator();
			this.gridView = new GridView({id : "grid"});
			this.gridView.setMediator(this.mainMediator);
			this.listenTo(this.gridView, 'finish', this.processFinish);	

			this.$startMenu.hide();
			this.$singleCanvas.fadeIn();
			this.gameStarted = true;
			this.doubleModel = false;

			this.gridView.start();
		},

		doublePlay : function() {
			utils.log("doublePlay!!!");
			this.$singleInfo.hide();
			this.$doubleInfo.show();	
			this.gameModel = "double";
			this.mainMediator = new MainMediator();
			this.gridView1 = new GridView({id : "grid1", name : "1"});
			this.gridView1.setInputType(2);			
			this.listenTo(this.gridView1, 'finish', this.processFinish);
			this.gridView1.setMediator(this.mainMediator);

			this.subMediator = new MainMediator();
			this.gridView2 = new GridView({id : "grid2", name : "2"});
			this.gridView2.setInputType(1);
			this.listenTo(this.gridView2, 'finish', this.processFinish);
			this.gridView2.setMediator(this.subMediator);			

			this.$startMenu.hide();
			this.$doubleMenu.hide();
			this.$singleCanvas.hide();
			this.$doubleCanvas.fadeIn();

			this.gridView1.start();
			this.gridView2.start();

			this.gameStarted = true;
		},		

		remotePlay : function() {
			utils.log("remotePlay!!!");

			this.gameModel = "remote";
			this.mainMediator = new MainMediator();
			this.subMediator = new SubMediator();
			this.doubleModel = true;
			this.$startMenu.hide();
			this.$doubleMenu.fadeIn();

			var that = this;
			tgs.requestGame(function(data) {
				utils.log(data);
				if (data && data.status == "ok") {
					that.processRemotePlay();
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
			utils.log("receive data: " + $.param(receivedData));
			var data = null;
			if (this.gameStarted && receivedData && receivedData.data) {
				data = receivedData.data;
				if (data == this.lose) {
					alert("You lose!");
					this.gridView1.forceStop(false);
					this.gridView2.forceStop(true);
					this.initialize();
				} else if (data == this.win) {
					alert("You win!");
					this.gridView1.forceStop(true);
					this.gridView2.forceStop(false);					
					this.initialize();
				} else {
					this.subMediator.setGameData(JSON.parse(unescape(data)));
				}
			}
		},

		processEndGame : function(data) {
			utils.log("exchange data is finish!!!");
			//alert("You " + data + "!");
		},

		processCanelDouble : function() {
			this.$doubleMenu.hide();			
			this.$startMenu.fadeIn();

			tgs.resetGame(function() {
                console.log("reset remote game ok");
            }, true);
		},

		processRemotePlay : function() {
			this.gridView1 = new GridView({id : "grid1"});
			this.listenTo(this.gridView1, 'finish', this.processFinish);
			this.gridView1.setMediator(this.mainMediator);
			this.gridView1.initialize();

			this.gridView2 = new GridView({id : "grid2"});
			this.listenTo(this.gridView2, 'finish', function(){});
			this.gridView2.setMediator(this.subMediator);			
			this.gridView2.initialize();

			this.$startMenu.hide();
			this.$doubleMenu.hide();
			this.$singleCanvas.hide();
			this.$doubleCanvas.fadeIn();


			this.gridView1.start();
			this.gridView2.setQuiet(true);
			this.gridView2.start();

			this.gameStarted = true;
		},

		processFinish : function(data) {
			switch (this.gameModel) {
				case "single" :
					alert("Game over! Your score :" + data.score);
					this.render();
					this.gameModel = "";
					this.gameStarted = false;					
				break;

				case "double" :
					var name = (data.name == 1 ? "one" : "two");
					alert("Player " + name + " game over! Your score :" + data.score);
					this.counter++;

					if (this.counter == 2) {
						this.render();
						this.gameModel = "";
						this.gameStarted = false;							
					}
				break;

				case "remote" :
					alert("Game over! You " + data.data + "! Your score :" + data.score);
					this.render();
					this.gameModel = "";
					this.gameStarted = false;						
				break;

				default : break;
			}
		}
	});

	exports.AppView = AppView;

})(this, jQuery);