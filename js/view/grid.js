(function(exports, $) {

	"use strict";
	
	var GridView = Backbone.View.extend({

		initialize : function(options) {
			_.bindAll(this);

			utils.log('init GridView');

			this.cols = 10;
			this.rows = 15;
			this.gridWidth = 300;
			this.gridHeight = 450;
			this.gridPadding = 10;
			this.cellWidth = 30;

			this.initGameData();

			this.initGrid();

			this.mediator = mediator;			
		},

		initGameData : function() {
			this.gameOver = false;
			this.tetrominoNew = true;
			this.score = 0;						

			this.matrix = utils.create2DArray(this.cols, this.rows);
			this.canvas = document.getElementById(this.id);			
			this.context = this.canvas.getContext('2d');
		},

		initGrid : function() {
			utils.log('init canvas - id : ' + this.id);

			this.cleanGrid();
		},

		cleanGrid: function() {
			this.context.fillStyle = "white";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

			for (var x = 0; x <= this.gridWidth; x += this.cellWidth) {
				this.context.moveTo(0.5 + x + this.gridPadding, this.gridPadding);
				this.context.lineTo(0.5 +x + this.gridPadding, this.gridHeight + this.gridPadding);
			}

			for (var y = 0; y <= this.gridHeight; y += this.cellWidth) {
				this.context.moveTo(this.gridPadding, 0.5 + y + this.gridPadding);
				this.context.lineTo(this.gridWidth + this.gridPadding, 0.5 + y + this.gridPadding);
			}

			this.context.strokeStyle = "black";
			this.context.stroke();
		},

		cleanFilledRows : function() {
			var fullRows = [];
			var i, j, m, n;
			for (i = 0; i < this.rows; i++) {
				var fullRow = true;
				for (j = 0; j < this.cols; j++) {
					if (!this.matrix[j][i]) {
						fullRow = false;
					}
				}

				if (fullRow) {
					this.score += 10;
					fullRows.push(i);
				}
			}

			for (i = 0, j = this.matrix.length; i < j; i++) {
				var column = this.matrix[i];
				for (m = 0, n = fullRows.length; m < n; m++) {
					var index = fullRows[m];
					column.splice(index, 1);
					column.unshift(0);	
				}
			}
		},

		hideTetromino : function() {
			var tetrominoPoints = this.tetromino.getPoints();
			for (var i = 0, max = tetrominoPoints.length; i < max; i++) {
				this.matrix[tetrominoPoints[i].x][tetrominoPoints[i].y] = 0;
			}
		},

		showTetromino : function() {
			var tetrominoPoints = this.tetromino.getPoints();
			for (var i = 0, max = tetrominoPoints.length; i < max; i++) {
				var newX = tetrominoPoints[i].x;
				var newY = tetrominoPoints[i].y;
				if (newX >= 0 && newY >= 0) {
					this.matrix[newX][newY] = 1;
				}
			}
		},

		checkValid : function() {
			var tetrominoPoints = this.tetromino.getPoints();
			for (var i = 0, max = tetrominoPoints.length; i < max; i++) {
				if ((tetrominoPoints[i].x == this.cols) || (tetrominoPoints[i].x == -1)) {
					return false;
				}

				if (this.matrix[tetrominoPoints[i].x][tetrominoPoints[i].y]) {
					return false;
				}

				if (tetrominoPoints[i].y >= this.rows) {
					return false;
				}
			}
			return true;
		},

		checkGameOver : function() {
			var tetrominoPoints = this.tetromino.getPoints();
			for (var i = 0, max = tetrominoPoints.length; i < max; i++) {
				if (tetrominoPoints[i].y <= 0 ) {
					this.gameOver = true;
					utils.log("Game over! Your score: " + this.score);
					return true;
				}
			}
			return false;
		},

		checkNewTetromino : function() {
			if(this.tetrominoNew) {
				this.cleanFilledRows();
				this.tetromino = this.mediator.getTetromino();				
			}
		},

		render : function() {
			this.cleanGrid();			

			this.context.fillStyle = "black";
			var x, y;
			for (var i = 0; i < this.cols; i++) {
				for (var j = 0; j < this.rows; j++) {
					if (this.matrix[i][j]) {
						x = 0.5 + i*this.cellWidth + this.gridPadding;
						y = 0.5 + j*this.cellWidth + this.gridPadding;
						this.context.fillRect(x - 1, y + 1, this.cellWidth - 1, this.cellWidth - 1);
					}
				}
			}
		},

		run : function() {
			if (!this.tetrominoNew) {
				this.hideTetromino();
				this.tetromino.moveDown();
				if (!this.checkValid()) {
					this.tetromino.moveUp();

					this.tetromino.moveDown();
					if (!this.checkValid()) {
						this.tetromino.moveUp();
						this.tetrominoNew = true;
						this.tetromino.locked = true;
						this.checkGameOver();
					}

				}
				this.showTetromino(); 
			} else {
				this.showTetromino(); 
				this.tetrominoNew = false;
			}
		},

		start : function() {
			this.mediator.init(this.handleInput);

			var that = this;
			var loopFun = function() {
				if (!that.gameOver) {
					that.checkNewTetromino();				
					that.run();
					that.render();
					setTimeout(loopFun, 500);
				} else {
					that.reset();
					that.trigger("finish", that.score);
				}
			}

			setTimeout(loopFun, 600);
		},

		reset : function() {
			this.cleanGrid();
			this.initGrid();
		},

		handleInput : function(event) {
			var key = event.keyCode;
			if (!key) {
				return;
			}

			utils.log('GridView handleInput : ' + key);

			if (!this.tetrominoNew) {
				switch(key) {
					// A and left 
					case 65:
					case 37:
						this.hideTetromino();
						this.tetromino.moveLeft();
						if (!this.checkValid()) {
							this.tetromino.moveRight();
						}
						this.showTetromino(); 
						break;

					// W and up
					case 87:
					case 38:
						this.hideTetromino();
						this.tetromino.rotateLeft();
						if (!this.checkValid()) {
							this.tetromino.rotateRight();
						}
						this.showTetromino(); 
						break;					

					// D and right
					case 68:
					case 39:
						this.hideTetromino();
						this.tetromino.moveRight();
						if (!this.checkValid()) {
							this.tetromino.moveLeft();
						}
						this.showTetromino(); 
						break;

					// down and s
					case 40:
					case 83:
						this.hideTetromino();
						this.tetromino.moveDown();
						if (!this.checkValid()) {
							this.tetromino.moveUp();
						}
						this.showTetromino(); 
						break;						

					default : ;
				}
			}

		},		
	});

	exports.GridView = GridView;

})(this, jQuery);