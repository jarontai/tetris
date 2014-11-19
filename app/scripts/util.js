(function(exports) {
  'use strict';

  /*
   * util functions
   */
  function create2DArray(x, y, data) {
    var resultArray = [];
    for (var i = 0; i < x; i++) {
      resultArray[i] = [];
      for (var j = 0; j < y; j++) {
        if (data && data[i][j]) {
          resultArray[i][j] = 1;
        } else {
          resultArray[i][j] = 0;
        }
      }
    }
    return resultArray;
  }

  /*
   * exports
   */
  exports.Util = {
    create2DArray: create2DArray
  };

})(window);
