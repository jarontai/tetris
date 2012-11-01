$(function() {

	"use strict";

	function handleKeyDown(e) {
		stage.handleInput(e.keyCode);
	}
	window.addEventListener("keydown", handleKeyDown, false);

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