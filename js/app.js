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
			stage.reset();				
			$("#main").hide();
			$("#menu").show();
		}

	}

	$("#main").hide();
	$("#menu").show();
    
	$("#start1").click(function() {
		$("#main").show();
		$("#menu").hide();
		setTimeout(main, 600);
	});
    
    $("#start2").click(function() {
        alert("双人对战功能开发中...");
	});
	
});