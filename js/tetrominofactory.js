(function() {

	var Teromino = Class.extend({
		init : function() {
			this.left = 0;
			this.top = 0;
			this.matrixNum = 4;
			this.matrix = [[0, 0, 0, 0], 
							 [0, 0, 0, 0], 
							 [0, 0, 0, 0], 
							 [0, 0, 0, 0]];
		},

		moveLeft : function() {
			this.left--;
		},

		moveRight : function() {
			this.left++;
		},

		moveUp : function() {
			this.top--;
		},

		moveDown : function() {
			this.top++;
		},

		rotateLeft : function() {
			var newArray = utils.create2DArray(this.matrixNum, this.matrixNum);
			for (var i = 0; i < this.matrixNum; i++) {
				for (var j = 0; j <  this.matrixNum; j++) {
					newArray[i][j] = this.matrix[j][this.matrixNum - 1 -i];
				}
			}
			this.matrix = newArray;
		},

		rotateRight : function() {
			var newArray = utils.create2DArray(this.matrixNum, this.matrixNum);
			for (var i = 0; i < this.matrixNum; i++) {
				for (var j = 0; j <  this.matrixNum; j++) {
					newArray[j][this.matrixNum - 1 -i] = this.matrix[i][j];
				}
			}
			this.matrix = newArray;
		},

		getPoints : function() {
			var pointsArray = new Array();
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

			this.matrix[2][0] = 1;
			this.matrix[2][1] = 1;
			this.matrix[2][2] = 1;
			this.matrix[2][3] = 1;

			this.rotateFlag = false;
		},

		rotateRight : function() {
			if (this.rotateFlag) {
				this.rotateFlag = false;
				this.rotateLeft();
			} else {
				this._super();
				this.rotateFlag = true;
			}
		}
	});

	window.game.tetrominoFactory = {
		create : function() {
			var temp = Math.floor(Math.random()*7);
			utils.log('create tetromino type no: ' + temp);
			switch (temp) {
				case 0:
					return new ITeromino();
				break;

				case 1:
					return new ITeromino();
				break;

				case 2:
					return new ITeromino();
				break;

				case 3:
					return new ITeromino();
				break;

				case 4:
					return new ITeromino();
				break;

				case 5:
					return new ITeromino();
				break;

				case 6:
					return new ITeromino();
				break;				

				default : return null;
			}
		}
	};

})();