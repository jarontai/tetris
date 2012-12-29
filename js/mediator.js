(function(exports, $) {

	"use strict";

	
	var inputQueue = [];
	var currentTetrimino, nextTetrimino;

	var mediator = {
		init : function(keydownHandler) {
			this.handler = keydownHandler;

			currentTetrimino = Tetris.create();
			nextTetrimino = Tetris.create();

			inputQueue = [];

			if (this.handler) {
				$(exports.window).bind("keydown", this.handler)		
			}
		},

		reset : function() {
			currentTetrimino = null;
			nextTetrimino = null;
			inputQueue = null;

			if (this.handler) {
				$(exports.window).unbind("keydown", this.handler)		
			}
		},

		getInput : function() {
			return inputQueue.shift();
		},

		getTetromino : function() {
			var temp = currentTetrimino;
			currentTetrimino = nextTetrimino;
			nextTetrimino = Tetris.create();
			return temp;
		}
	};

	exports.mediator = mediator;

})(this, jQuery);