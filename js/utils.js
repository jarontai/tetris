var utils = (function(win, $) {

    "use strict";

	var ieFlag = '__proto__' in {} ? false : true;

	var result = {};

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
		if (!ieFlag && console && console.log) {
			console.log(str);
		}
	};

	return result;

})(this, jQuery);