(function() {

	function Teromino() {
		this.left = 0;
		this.top = 0;
	}

	Teromino.prototype.goLeft = function() {
		this.left--;
	}

	Teromino.prototype.goRight = function() {
		this.left++;
	}

	Teromino.prototype.goUp = function() {
		this.top--;
	}

	Teromino.prototype.goDown = function() {
		this.top++;
	}

	function ITeromino() {
		this.matrix = [[0, 1, 0, 0], 
									 [0, 1, 0, 0], 
									 [0, 1, 0, 0], 
									 [0, 1, 0, 0]];
	}
	ITeromino.prototype = new Teromino();

	window.game.tetrominoFactory = {
		create : function() {
			var temp = Math.floor(Math.random()*7);
			console.log('create teromino type no: ' + temp);
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