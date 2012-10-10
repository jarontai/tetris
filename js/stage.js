(function() {

	window.game.stage = {
		canvas : null,
		context : null,
		matrix : null,
		gridPadding : null,
		gridWidth : null,
		factory : null,
		tetromino : null,

		// 初始化
		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');
			this.gridPadding = 10;
			this.gridWidth = 40;
			this.factory = window.game.tetrominoFactory;
			this.tetromino = this.factory.create();

			// 白色背景
			this.context.fillStyle = "white";
			this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);


			// 绘制格子
			var gridWidth = 400;
			var gridHeight = 600;

			for (var x = 0; x <= gridWidth; x += this.gridWidth) {
				this.context.moveTo(0.5 + x + this.gridPadding, this.gridPadding);
				this.context.lineTo(0.5 +x + this.gridPadding, gridHeight + this.gridPadding);
			}

			for (var y = 0; y <= gridHeight; y += this.gridWidth) {
				this.context.moveTo(this.gridPadding, 0.5 + y + this.gridPadding);
				this.context.lineTo(gridWidth + this.gridPadding, 0.5 + y + this.gridPadding);
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

		update : function() {
			this.context.fillStyle = "black";

			var tetrominoPoints = this.tetromino.getPoints();
			console.log(tetrominoPoints);
			var point;
			for (var n = 0, m = tetrominoPoints.length; n < m; n++) {
				point = tetrominoPoints[n];
				this.matrix[point.x][point.y] = 1;
			}

			var x, y;
			for (var i = 0; i < 15; i++) {
				for (var j = 0; j < 10; j++) {
					if (this.matrix[i][j]) {
						x = 0.5 + j*this.gridWidth + this.gridPadding;
						y = 0.5 + i*this.gridWidth + this.gridPadding;
						this.context.fillRect(x + 1, y - 1, this.gridWidth - 1, this.gridWidth - 1);
					}
				}
			}
			console.log('update stage');
		}
	};

})();