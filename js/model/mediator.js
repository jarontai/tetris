(function(exports, $) {

	"use strict";

	function Mediator() {
		this.inputQueue = [];
		this.currentTetrimino = null;
		this.nextTetrimino = null;
	};

	Mediator.prototype.init = function(keydownHandler) {
		this.handler = keydownHandler;

		this.currentTetrimino = Tetris.create();
		this.nextTetrimino = Tetris.create();

		this.inputQueue = [];

		if (this.handler) {
			$(exports.window).bind("keydown", this.handler)		
		}
	};

	Mediator.prototype.reset = function() {
		this.currentTetrimino = null;
		this.nextTetrimino = null;
		this.inputQueue = null;

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
		
	};

	///////////////////////////////////////////////	
	exports.Mediator = Mediator;

})(this, jQuery);