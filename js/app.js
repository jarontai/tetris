(function() {

	var stage = window.game.stage;

	function doKeyDown(e) {
		stage.userInput(e);
	}
	window.addEventListener("keydown", doKeyDown, false);

	stage.init('canvas');
	function main() {
		stage.clean();
		stage.redraw();
		stage.run();
		setTimeout(main, 600);
	}

	setTimeout(main, 600);
	
})();