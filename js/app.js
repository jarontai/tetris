'use strict';

$(function() {

	var stage = window.game.stage;

	function doKeyDown(e) {
		stage.userInput(e);
	}
	window.addEventListener("keydown", doKeyDown, false);

	$("#start").click(function() {
		alert('Start game!');
	});

	stage.init('canvas');
	stage.redraw();	
	
	function main() {
		stage.update();
		stage.run();
		stage.redraw();		
		setTimeout(main, 600);
	}

	setTimeout(main, 600);
	
});