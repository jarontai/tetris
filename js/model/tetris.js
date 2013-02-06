(function(exports, $) {

	"use strict";
	
	function TetrominoBase() {
		this.locked = false;
		this.left = 3;
		this.top = 0;
		this.matrixNum = 4;
		this.matrix = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		this.rotateFlag = false;
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
			var newMatrix = utils.create2DArray(this.matrixNum, this.matrixNum);
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
			var newMatrix = utils.create2DArray(this.matrixNum, this.matrixNum);
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

//////////////////////////////////////////////////////////

	function ITetromino() {
		TetrominoBase.call(this);

		this.left = 2;
		this.top = -3;
		this.matrix[2][0] = 2;
		this.matrix[2][1] = 2;
		this.matrix[2][2] = 2;
		this.matrix[2][3] = 2;

		this.color = 2;
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


//////////////////////////////////////////////////////////

	function STetromino() {
		TetrominoBase.call(this);

		this.top = -2;
		this.matrix[0][2] = 3;
		this.matrix[1][2] = 3;
		this.matrix[1][1] = 3;
		this.matrix[2][1] = 3;

		this.color = 3;
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

//////////////////////////////////////////////////////////

	function OTetromino() {
		TetrominoBase.call(this);

		this.top = -2;
		this.matrix[1][1] = 4;
		this.matrix[1][2] = 4;
		this.matrix[2][1] = 4;
		this.matrix[2][2] = 4;

		this.color = 4;
	}

	OTetromino.prototype = new TetrominoBase();
	OTetromino.prototype.constructor = OTetromino;

	OTetromino.prototype.rotateRight = function() {
	};

	OTetromino.prototype.rotateLeft = function() {
	};

//////////////////////////////////////////////////////////

	function TTetromino() {
		TetrominoBase.call(this);

			this.matrixNum = 3;
			this.matrix = [[0, 0, 0],[0, 0, 0],[0, 0, 0]];
			this.top = -2;
			this.matrix[0][1] = 5;
			this.matrix[1][1] = 5;
			this.matrix[1][2] = 5;
			this.matrix[2][1] = 5;

			this.color = 5;
	}

	TTetromino.prototype = new TetrominoBase();
	TTetromino.prototype.constructor = TTetromino;

//////////////////////////////////////////////////////////

	function ZTetromino() {
		TetrominoBase.call(this);

		this.top = -2;
		this.matrix[0][1] = 6;
		this.matrix[1][1] = 6;
		this.matrix[1][2] = 6;
		this.matrix[2][2] = 6;

		this.color = 6;
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

//////////////////////////////////////////////////////////

	function LTetromino() {
		TetrominoBase.call(this);

		this.top = -2;
		this.matrix[0][2] = 7;
		this.matrix[1][2] = 7;
		this.matrix[2][2] = 7;
		this.matrix[2][1] = 7;

		this.color = 7;
	}

	LTetromino.prototype = new TetrominoBase();
	LTetromino.prototype.constructor = LTetromino;

//////////////////////////////////////////////////////////

	function JTetromino() {
		TetrominoBase.call(this);

		this.top = -2;
		this.matrix[1][1] = 8;
		this.matrix[1][2] = 8;
		this.matrix[2][2] = 8;
		this.matrix[3][2] = 8;

		this.color = 8;
	}

	JTetromino.prototype = new TetrominoBase();
	JTetromino.prototype.constructor = JTetromino;

//////////////////////////////////////////////////////////

	exports.Tetris = {
		create : function(num) {
			num = num || Math.floor(Math.random()*7);
			utils.log('create tetromino type no: ' + num);
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

})(this, jQuery);