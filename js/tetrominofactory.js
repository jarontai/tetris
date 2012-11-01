var tetrominoFactory = (function(win, $) {

    "use strict";
    
	var Teromino = Class.extend({
		init : function() {
			this.locked = false;
			this.left = 3;
			this.top = 0;
			this.matrixNum = 4;
			this.matrix = [[0, 0, 0, 0],
							 [0, 0, 0, 0],
							 [0, 0, 0, 0],
							 [0, 0, 0, 0]];
			this.rotateFlag = false;
		},

		moveLeft : function() {
			if (!this.locked) {
				this.left--;
			}
		},

		moveRight : function() {
			if (!this.locked) {			
				this.left++;
			}
		},

		moveUp : function() {
			this.top--;
		},

		moveDown : function() {
			if (!this.locked) {
				this.top++;
			}
		},

		rotateLeft : function() {
			if (!this.locked) {
				var newArray = utils.create2DArray(this.matrixNum, this.matrixNum);
				for (var i = 0; i < this.matrixNum; i++) {
					for (var j = 0; j <  this.matrixNum; j++) {
						newArray[i][j] = this.matrix[j][this.matrixNum - 1 -i];
					}
				}
				this.matrix = newArray;
			}	
		},

		rotateRight : function() {
			if (!this.locked) {
				var newArray = utils.create2DArray(this.matrixNum, this.matrixNum);
				for (var i = 0; i < this.matrixNum; i++) {
					for (var j = 0; j <  this.matrixNum; j++) {
						newArray[j][this.matrixNum - 1 -i] = this.matrix[i][j];
					}
				}
				this.matrix = newArray;
			}
		},

		getPoints : function() {
			var pointsArray = [];
			for (var i = 0; i < this.matrixNum; i++) {
				for (var j = 0; j <  this.matrixNum; j++) {
					if (this.matrix[i][j]) {
						pointsArray.push({'x' : this.left+i, 'y' : this.top+j});
					}
				}
			}
			return pointsArray;
		}		
	});

	var ITeromino = Teromino.extend({
		init : function() {
			this._super();

			this.left = 2;
			this.top = -3;
			this.matrix[2][0] = 1;
			this.matrix[2][1] = 1;
			this.matrix[2][2] = 1;
			this.matrix[2][3] = 1;
		},

		rotateLeft : function() {
			if (this.rotateFlag) {
				this.rotateFlag = false;
				this.rotateRight();
			} else {
				this._super();
				this.rotateFlag = true;
			}
		}
	});

	var OTeromino = Teromino.extend({
		init : function() {
			this._super();

			this.top = -2;
			this.matrix[1][1] = 1;
			this.matrix[1][2] = 1;
			this.matrix[2][1] = 1;
			this.matrix[2][2] = 1;
		},

		rotateRight : function() {
		},

		rotateLeft : function() {
		}
	});	

	var STeromino = Teromino.extend({
		init : function() {
			this._super();

			this.top = -2;
			this.matrix[0][2] = 1;
			this.matrix[1][2] = 1;
			this.matrix[1][1] = 1;
			this.matrix[2][1] = 1;
		},

		rotateLeft : function() {
			if (this.rotateFlag) {
				this.rotateFlag = false;
				this.rotateRight();
			} else {
				this._super();
				this.rotateFlag = true;
			}
		}
	});	

	var TTeromino = Teromino.extend({
		init : function() {
			this._super();

			this.matrixNum = 3;
			this.matrix = [[0, 0, 0],
							 [0, 0, 0],
							 [0, 0, 0]];
			this.top = -2;
			this.matrix[0][1] = 1;
			this.matrix[1][1] = 1;
			this.matrix[1][2] = 1;
			this.matrix[2][1] = 1;
		}
	});

	var ZTeromino = Teromino.extend({
		init : function() {
			this._super();

			this.top = -2;
			this.matrix[0][1] = 1;
			this.matrix[1][1] = 1;
			this.matrix[1][2] = 1;
			this.matrix[2][2] = 1;

			this.rotateFlag = false;
		},

		rotateLeft : function() {
			if (this.rotateFlag) {
				this.rotateFlag = false;
				this.rotateRight();
			} else {
				this._super();
				this.rotateFlag = true;
			}
		}
	});

	var LTeromino = Teromino.extend({
		init : function() {
			this._super();

			this.top = -2;
			this.matrix[0][2] = 1;
			this.matrix[1][2] = 1;
			this.matrix[2][2] = 1;
			this.matrix[2][1] = 1;
			this.rotateFlag = false;
		}
	});		

	var JTeromino = Teromino.extend({
		init : function() {
			this._super();

			this.top = -2;
			this.matrix[1][1] = 1;
			this.matrix[1][2] = 1;
			this.matrix[2][2] = 1;
			this.matrix[3][2] = 1;
			this.rotateFlag = false;
		}
	});				

	return {
		create : function() {
			var temp = Math.floor(Math.random()*7);
			utils.log('create tetromino type no: ' + temp);
			switch (temp) {
				case 0:
					return new ITeromino();
				break;

				case 1:
					return new OTeromino();
				break;

				case 2:
					return new LTeromino();
				break;

				case 3:
					return new JTeromino();
				break;

				case 4:
					return new STeromino();
				break;

				case 5:
					return new ZTeromino();
				break;

				case 6:
					return new TTeromino();
				break;				

				default : return null;
			}
		}
	};

})(this, jQuery);