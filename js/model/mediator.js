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

	///////////////////////////////////////////////
	function MainMediator() {
		Mediator.call(this);
	}

	MainMediator.prototype = new Mediator();
	MainMediator.prototype.constructor = MainMediator;

	MainMediator.prototype.update = function(subMediator) {
		// body...
	};

	///////////////////////////////////////////////
	function SubMediator() {
		Mediator.call(this);
	}

	SubMediator.prototype = new Mediator();
	SubMediator.prototype.constructor = SubMediator;

	///////////////////////////////////////////////	
	exports.MainMediator = MainMediator;
	exports.SubMediator = SubMediator;

})(this, jQuery);