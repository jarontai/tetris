(function() {

	window.utils = {};

	window.utils.create2DArray = function(x, y) {
		var resultArray = new Array();
		for (var i = 0; i < x; i++) {
				resultArray[i] = new Array();
				for (var j = 0; j < y; j++) {
					resultArray[i][j] = 0;
				}
			}
		return resultArray;
	}

})();