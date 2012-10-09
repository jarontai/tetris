(function() {

	window.game.stage = {
		canvas : null,
		context : null,

		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');

			var gridWidth = 400;
			var gridHeight = 400;

			var gridPadding = 10;

			for (var x = 0; x <= gridWidth; x += 40) {
				this.context.moveTo(0.5 + x + gridPadding, gridPadding);
				this.context.lineTo(0.5 +x + gridPadding, gridHeight + gridPadding);
			}

			for (var y = 0; y <= gridHeight; y += 40) {
				this.context.moveTo(gridPadding, 0.5 + y + gridPadding);
				this.context.lineTo(gridWidth + gridPadding, 0.5 + y + gridPadding);
			}

			this.context.strokeStyle = "black";
			this.context.stroke();
			
			console.log('init stage');
		}
	};

}());