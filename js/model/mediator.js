(function(exports, $) {

	"use strict";

	function Mediator() {
		this.inputQueue = [];
		this.currentTetrimino = null;
		this.nextTetrimino = null;
	};

	Mediator.prototype.init = function(keydownHandler) {
		var that = this;
		this.handler = function() {
			var key = event.keyCode; 
			that.inputQueue.push(key);
			keydownHandler(event);
		};
			
		this.currentTetrimino = Tetris.create();
		this.nextTetrimino = Tetris.create();

		this.inputQueue = [];

		if (this.handler) {
			$(exports.window).bind("keydown", this.handler);		
		}
	};

	Mediator.prototype.reset = function() {
		this.currentTetrimino = null;
		this.nextTetrimino = null;
		this.inputQueue = [];

		if (this.handler) {
			$(exports.window).unbind("keydown", this.handler)		
		}
	};

	Mediator.prototype.getTetromino = function() {
		var temp = this.currentTetrimino;
		this.currentTetrimino = this.nextTetrimino;
		this.nextTetrimino = Tetris.create();
		return temp;
	};

	Mediator.prototype.update = function() {

	};

	Mediator.prototype.getGameData = function() {
		var tetrisNum = this.currentTetrimino.num;
		var input = this.inputQueue.join();
		var result = {
			'tetris' : tetrisNum,
			'input' : input
		};
		return JSON.stringify(result);
	};

	Mediator.prototype.setGameData = function(receivedData) {
		if (receivedData && receivedData.data) {
			var object = JSON.parse(unescape(receivedData.data));
			utils.log("Receive data : " + "tetris-" + object.tetris + " input-" + object.input);
		}
	};

	exports.Mediator = Mediator;

})(this, jQuery);