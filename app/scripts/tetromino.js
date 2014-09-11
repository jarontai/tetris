(function(exports) {
  'use strict';

  /*
   * util functions
   */
   function create2DArray(x, y, data) {
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

  /*
   * TetrominoBase
   */
  function TetrominoBase() {
    this.left = 3;
    this.top = 0;
    this.locked = false;
    this.matrixNum = 4;
    this.rotateFlag = false;
    this.matrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  }

  TetrominoBase.prototype.moveLeft = function() {
    if (!this.locked) {
      this.left--;
    }
  };

  TetrominoBase.prototype.moveRight = function() {
    if (!this.locked) {
      this.left++;
    }
  };

  TetrominoBase.prototype.moveUp = function() {
    if (!this.locked) {
      this.top--;
    }
  };

  TetrominoBase.prototype.moveDown = function() {
    if (!this.locked) {
      this.top++;
    }
  };

  TetrominoBase.prototype.rotateLeft = function() {
    if (!this.locked) {
      var newMatrix = create2DArray(this.matrixNum, this.matrixNum);
      for (var i = 0; i < this.matrixNum; i++) {
        for (var j = 0; j < this.matrixNum; j++) {
          newMatrix[i][j] = this.matrix[j][this.matrixNum - 1 - i];
        }
      }
      this.matrix = newMatrix;
    }
  };

  TetrominoBase.prototype.rotateRight = function() {
    if (!this.locked) {
      var newMatrix = create2DArray(this.matrixNum, this.matrixNum);
      for (var i = 0; i < this.matrixNum; i++) {
        for (var j = 0; j < this.matrixNum; j++) {
          newMatrix[j][this.matrixNum - 1 - i] = this.matrix[i][j];
        }
      }
      this.matrix = newMatrix;
    }
  };

  TetrominoBase.prototype.getPoints = function() {
    var pointsArray = [];
    for (var i = 0; i < this.matrixNum; i++) {
      for (var j = 0; j < this.matrixNum; j++) {
        if (this.matrix[i][j]) {
          pointsArray.push({'x' : this.left + i, 'y' : this.top + j});
        }
      }
    }
    return pointsArray;
  };

  TetrominoBase.prototype.getColor = function() {
    return this.color || 0;
  };


  /*
   * ITetomino
   */
  function ITetromino() {
    TetrominoBase.call(this);

    this.left = 2;
    this.top = -3;
    this.color = 2;
    this.matrix[2][0] = this.color;
    this.matrix[2][1] = this.color;
    this.matrix[2][2] = this.color;
    this.matrix[2][3] = this.color;
  }

  ITetromino.prototype = new TetrominoBase();
  ITetromino.prototype.constructor = ITetromino;

  ITetromino.prototype.rotateLeft = function() {
    if (this.rotateFlag) {
      this.rotateFlag = false;
      TetrominoBase.prototype.rotateRight.call(this);
    } else {
      TetrominoBase.prototype.rotateLeft.call(this);
      this.rotateFlag = true;
    }
  };


  /*
   * STetromino
   */
  function STetromino() {
    TetrominoBase.call(this);

    this.top = -2;
    this.color = 3;
    this.matrix[0][2] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[1][1] = this.color;
    this.matrix[2][1] = this.color;
  }

  STetromino.prototype = new TetrominoBase();
  STetromino.prototype.constructor = STetromino;

  STetromino.prototype.rotateLeft = function() {
    if (this.rotateFlag) {
      this.rotateFlag = false;
      TetrominoBase.prototype.rotateRight.call(this);
    } else {
      TetrominoBase.prototype.rotateLeft.call(this);
      this.rotateFlag = true;
    }
  };


  /*
   * OTetromino
   */
  function OTetromino() {
    TetrominoBase.call(this);

    this.top = -2;
    this.color = 4;
    this.matrix[1][1] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[2][1] = this.color;
    this.matrix[2][2] = this.color;
  }

  OTetromino.prototype = new TetrominoBase();
  OTetromino.prototype.constructor = OTetromino;

  OTetromino.prototype.rotateRight = function() {
  };

  OTetromino.prototype.rotateLeft = function() {
  };


  /*
   * TTetromino
   */
  function TTetromino() {
    TetrominoBase.call(this);

    this.matrixNum = 3;
    this.matrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
    this.top = -2;
    this.color = 5;
    this.matrix[0][1] = this.color;
    this.matrix[1][1] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[2][1] = this.color;
  }

  TTetromino.prototype = new TetrominoBase();
  TTetromino.prototype.constructor = TTetromino;


  /*
   * ZTetromino
   */
  function ZTetromino() {
    TetrominoBase.call(this);

    this.top = -2;
    this.color = 6;
    this.matrix[0][1] = this.color;
    this.matrix[1][1] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[2][2] = this.color;
  }

  ZTetromino.prototype = new TetrominoBase();
  ZTetromino.prototype.constructor = ZTetromino;

  ZTetromino.prototype.rotateLeft = function() {
    if (this.rotateFlag) {
      this.rotateFlag = false;
      TetrominoBase.prototype.rotateRight.call(this);
    } else {
      TetrominoBase.prototype.rotateLeft.call(this);
      this.rotateFlag = true;
    }
  };


  /*
   * LTetromino
   */
  function LTetromino() {
    TetrominoBase.call(this);

    this.top = -2;
    this.color = 7;
    this.matrix[0][2] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[2][2] = this.color;
    this.matrix[2][1] = this.color;
  }

  LTetromino.prototype = new TetrominoBase();
  LTetromino.prototype.constructor = LTetromino;


  /*
   * JTetromino
   */
  function JTetromino() {
    TetrominoBase.call(this);

    this.top = -2;
    this.color = 8;
    this.matrix[1][1] = this.color;
    this.matrix[1][2] = this.color;
    this.matrix[2][2] = this.color;
    this.matrix[3][2] = this.color;
  }

  JTetromino.prototype = new TetrominoBase();
  JTetromino.prototype.constructor = JTetromino;


  /*
   * exports
   */
  exports.Tetromino = {
    create : function(num) {
      num = num || Math.floor(Math.random()*7);
      console.log('create tetromino type no: ' + num);
      var result = null;
      switch (num) {
        case 0:
          result = new ITetromino();
        break;

        case 1:
          result = new OTetromino();
        break;

        case 2:
          result = new LTetromino();
        break;

        case 3:
          result = new JTetromino();
        break;

        case 4:
          result = new STetromino();
        break;

        case 5:
          result = new ZTetromino();
        break;

        case 6:
          result = new TTetromino();
        break;

        default : return null;
      }

      result.num = num;
      return result;
    }
  };

})(window);
