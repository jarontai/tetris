(function(exports, $) {

	"use strict";

	function Mediator() {
		this.inputQueue = [];
		this.currentTetrimino = null;
		this.nextTetrimino = null;
		this.gameEnd = null;
		this.newTetris = null;
	};

	Mediator.prototype.init = function(keydownHandler) {
		var that = this;
		this.handler = function() {
			var key = event.keyCode; 
			that.inputQueue.push(key);
			keydownHandler(event);
		};

		this.newTetris = true;
		this.gameEnd = false;
		this.inputQueue = [];

		if (this.handler) {
			$(exports.window).bind("keydown", this.handler);		
		}
	};

	Mediator.prototype.reset = function() {
		this.currentTetrimino = null;
		this.nextTetrimino = null;
		this.gameEnd = false;
		this.newTetris = false;				
		this.inputQueue = [];

		if (this.handler) {
			$(exports.window).unbind("keydown", this.handler)		
		}
	};

	Mediator.prototype.getTetromino = function() {
		var temp = this.currentTetrimino;
		this.currentTetrimino = this.nextTetrimino;
		this.nextTetrimino = Tetris.create();
		this.newTetris = true;
		return temp;
	};

	Mediator.prototype.update = function() {

	};

/////////////////////////////////////////////////////////////////

	function MainMediator() {
		Mediator.call(this);

		this.currentTetrimino = Tetris.create();
		this.nextTetrimino = Tetris.create();		
	}

	MainMediator.prototype = new Mediator();
	MainMediator.prototype.constructor = Mediator;

	MainMediator.prototype.getGameData = function() {
		if (this.gameEnd) {
			return "end";
		}

		var result = {};
		if (this.newTetris) {
			result.tetris = this.currentTetrimino.num;
			this.newTetris = false;
		}
		if (this.inputQueue.length > 0) {
			result.input = this.inputQueue.join();
		}
		return JSON.stringify(result);
	};

/////////////////////////////////////////////////////////////////

	function SubMediator() {
		Mediator.call(this);	
	}

	SubMediator.prototype = new Mediator();
	SubMediator.prototype.constructor = Mediator;

	SubMediator.prototype.setGameData = function(receivedData) {
		if (receivedData && receivedData.data) {
			if (receivedData.data == "end") {
				this.gameEnd = true;
			} else {
				var object = JSON.parse(unescape(receivedData.data));
				utils.log("Receive data : " + "tetris-" + object.tetris + " input-" + object.input);

				var terisNumber = object.tetris;
				if (terisNumber) {
					if (this.currentTetrimino) {
						this.nextTetrimino = Tetris.create(terisNumber);
					} else {
						this.currentTetrimino = Tetris.create(terisNumber);
					}
				}

			}
		}
	};

/////////////////////////////////////////////////////	

	exports.MainMediator = MainMediator;
	exports.SubMediator = SubMediator;

})(this, jQuery);