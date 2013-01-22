var utils = (function(win, $) {

    "use strict";

	var result = {};

	result.oldIE = $('html').is('.ie6, .ie7, .ie8');
	
	result.create2DArray = function(x, y, data) {
		var resultArray = [];
		for (var i = 0; i < x; i++) {
				resultArray[i] = new Array();
				for (var j = 0; j < y; j++) {
					if (data && data[i][j]) {
						resultArray[i][j] = 1;
					} else {
						resultArray[i][j] = 0;
					}
				}
			}
		return resultArray;
	};

	result.log = function(str) {
		if (win.console && win.console.log) {
			win.console.log(str);
		}
	};

	return result;

})(this, jQuery);