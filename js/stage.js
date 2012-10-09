(function() {
	var stage = {
		canvas : null,
		context : null,

		init : function(canvasId) {
			this.canvas = document.getElementById(canvasId);
			this.context = this.canvas.getContext('2d');

			console.log('init stage');
		}
	};

	window.game.stage = stage;
}());