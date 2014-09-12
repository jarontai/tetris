(function(exports) {
  'use strict';

  /*
   * Grid constructor
   */
  function Grid(id) {
    console.log('Grid constructor');

    this.canvasId = id;
    this.cols = 10;
    this.rows = 15;
    this.gridWidth = 300;
    this.gridHeight = 450;
    this.gridPadding = 10;
    this.cellWidth = 30;
    this.paused = false;

    this.KEY_UP = 38;
    this.KEY_DOWN = 40;
    this.KEY_RIGHT =  39;
    this.KEY_LEFT = 37;

    this.colorMap = {
      0: "",
      1: "",
      2: "Aqua",
      3: "green",
      4: "Gold",
      5: "Indigo",
      6: "red",
      7: "blue",
      8: "Darkorange"
    };

    this.gameOver = false;
    this.tetrominoNew = true;
    this.score = 0;
    this.matrix = util.create2DArray(this.cols, this.rows);
    this.canvas = document.getElementById(this.canvasId);
    this.context = this.canvas && this.canvas.getContext('2d');

    this.cleanGrid();
  }


  /*
   * Clean grid
   */
  Grid.prototype.cleanGrid = function() {
    this.context.fillStyle = "white";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    for (var x = 0; x <= this.gridWidth; x += this.cellWidth) {
      this.context.moveTo(0.5 + x + this.gridPadding, this.gridPadding);
      this.context.lineTo(0.5 +x + this.gridPadding, this.gridHeight + this.gridPadding);
    }

    for (var y = 0; y <= this.gridHeight; y += this.cellWidth) {
      this.context.moveTo(this.gridPadding, 0.5 + y + this.gridPadding);
      this.context.lineTo(this.gridWidth + this.gridPadding, 0.5 + y + this.gridPadding);
    }

    this.context.strokeStyle = "black";
    this.context.stroke();
  };


  /*
   * exports
   */
   exports.Grid = Grid;

})(window);
