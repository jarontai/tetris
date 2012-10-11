(function() {

	function Teromino() {
		this.top = 0;
		this.matrix = [[0, 0, 0, 0], 
						 [0, 0, 0, 0], 
						 [0, 0, 0, 0], 
						 [0, 0, 0, 0]];
	}

	Teromino.prototype.moveLeft = function() {
		this.left--;
	}

	Teromino.prototype.moveRight = function() {
		this.left++;
	}

	Teromino.prototype.moveUp = function() {
		this.top--;
	}

	Teromino.prototype.moveDown = function() {
		this.top++;
	}

	Teromino.prototype.getPoints = function() {
		var pointsArray = new Array();
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if (this.matrix[i][j]) {
					pointsArray.push({'y' : this.left+i, 'x' : this.top+j});
				}
			}
		}
		return pointsArray;
	}

	function ITeromino() {
		this.left = 2;

		this.matrix[2][0] = 1;
		this.matrix[2][1] = 1;
		this.matrix[2][2] = 1;
		this.matrix[2][3] = 1;
	}
	ITeromino.prototype = new Teromino();

	window.game.tetrominoFactory = {
		create : function() {
			var temp = Math.floor(Math.random()*7);
			console.log('create tetromino type no: ' + temp);
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