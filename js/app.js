$(function() {

	"use strict";

	function handleKeyDown(e) {
		stage.handleInput(e.keyCode);
	}
	window.addEventListener("keydown", handleKeyDown, false);

	stage.init('canvas');
	stage.redraw();	
	
	function main() {
		if (!stage.gameOver) {
			stage.update();
			stage.run();
			stage.redraw();		
			setTimeout(main, 600);
		} else {
			alert("Game over! Your score: " + stage.score);
		}

	}

	setTimeout(main, 600);
	
});