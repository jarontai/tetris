(function() {

	window.game = {};
	
	window.game.stage = {
					// 绘制格子
		gridWidth : 400,
		gridHeight : 600,
		canvas : null,
		context : null,
		matrix : null,
		gridPadding : null,
		factory : null,
		tetromino : null,

		// 初始化
		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');
			this.gridPadding = 10;
			this.cellWidth = 40;
			this.factory = window.game.tetrominoFactory;
			this.tetromino = this.factory.create();
			this.inputFlag = false;

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
			this.matrix = new Array();
			for (var i = 0; i < 15; i++) {
				this.matrix[i] = new Array();
				for (var j = 0; j < 10; j++) {
					this.matrix[i][j] = 0;
				}
			}

			console.log('init stage');
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

			for (var i = 0; i < 15; i++) {
				for (var j = 0; j < 10; j++) {
					this.matrix[i][j] = 0;
				}
			}
			console.log('clean stage');
		},

		redraw : function() {
			this.context.fillStyle = "black";

			var tetrominoPoints = this.tetromino.getPoints();
			var point;
			for (var n = 0, m = tetrominoPoints.length; n < m; n++) {
				point = tetrominoPoints[n];
				this.matrix[point.x][point.y] = 1;
			}

			var x, y;
			for (var i = 0; i < 15; i++) {
				for (var j = 0; j < 10; j++) {
					if (this.matrix[i][j]) {
						x = 0.5 + j*this.cellWidth + this.gridPadding;
						y = 0.5 + i*this.cellWidth + this.gridPadding;
						this.context.fillRect(x + 1, y - 1, this.cellWidth - 1, this.cellWidth - 1);
					}
				}
			}
			console.log('redraw stage');
		},

		run :function() {
			this.tetromino.moveDown();
		},

		userInput : function(e) {
			var key = e.keyCode;
			switch(key) {
				// left
				case 37:
					this.inputFlag = true;
					this.tetromino.moveLeft();
					console.log('press left');
					break;

				// right
				case 39:
					this.inputFlag = true;
					this.tetromino.moveRight();
					console.log('press right');
					break;

				// A
				case 65:
					this.inputFlag = true;
					this.tetromino.moveLeft();
					console.log('press A');
					break;

				// D
				case 68:
					this.inputFlag = true;
					this.tetromino.moveRight();
					console.log('press D');
					break;

				default : break;
			}
		}
	};

})();