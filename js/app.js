(function() {

	var stage = window.game.stage;

	stage.init('canvas');

	function main() {
		stage.clean();
		stage.redraw();
		stage.run();
		setTimeout(main, 1000);
	}

	setTimeout(main, 1000);
	
})();