var stage = (function(win, $) {

    "use strict";
	
	return {
		// 绘制格子
		cols : 10,
		rows : 15,
		gridWidth : 300,
		gridHeight : 450,
		canvas : null,
		context : null,
		matrix : null,
		gridPadding : null,
		terominoFactory : null,
		tetromino : null,
		tetrominoNew : false,
		score : 0,
		gameOver : false,

		// 初始化
		init : function(canvasId) {
			this.score = 0;
			this.canvas = win.document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');
			this.gridPadding = 10;
			this.cellWidth = 30;
			this.terominoFactory = win.tetrominoFactory;
			this.tetromino = this.terominoFactory.create();

			// 白色背景
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
			
			// 初始化矩阵
			this.matrix = utils.create2DArray(this.cols, this.rows);

			this.showTetromino(); 
			
			utils.log('init stage');
		},

		clean: function() {
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

		redraw : function() {
			this.clean();			

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

		cleanGrid : function() {
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

		handleInput : function(key) {
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

		update : function() {
			if(this.tetrominoNew) {
				this.cleanGrid();
				this.tetromino = this.terominoFactory.create();				
			}
		}
	};

})(this, jQuery);