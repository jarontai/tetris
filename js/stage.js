(function() {

	window.game.stage = {
		canvas : null,
		context : null,
		matrix : null,
		gridPadding : null,
		gridWidth : null,

		// 初始化
		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');
			this.gridPadding = 10;
			this.gridWidth = 40;

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
			this.matrix = new Array(15);
			for (var i = 0; i < 15; i++) {
				this.matrix[i] = new Array(10);
			}

			console.log('init stage');
		},

		update : function() {
			// ------------TODO 删除测试代码-----------------
			this.matrix[0][0] = true;
			this.matrix[14][9] = true;
			// ------------TODO 删除测试代码-----------------

			this.context.fillStyle = "black";
			var x, y;
			for (var i = 0; i < 15; i++) {
				for (var j = 0; j < 10; j++) {
					if (this.matrix[i][j]) {
						x = 0.5 + j*this.gridWidth + this.gridPadding;
						y = 0.5 + i*this.gridWidth + this.gridPadding;
						this.context.fillRect(x, y, this.gridWidth, this.gridWidth);
					}
				}
			}
			console.log('update stage');
		}
	};

}());