(function(exports, $) {

  "use strict";

  function Mediator() {
    this.currentTetrimino = null;
    this.nextTetrimino = null;
    this.newTetris = true;
    this.gameEnd = false;
    this.inputQueue = [];
    this.handleContext = null;
  };

  Mediator.prototype.reset = function() {
    this.currentTetrimino = null;
    this.nextTetrimino = null;
    this.gameEnd = false;
    this.newTetris = false;
    this.inputQueue = [];

    if (this.inputHandler) {
      $(exports.window).unbind("keydown", this.inputHandler)
    }
  };

  Mediator.prototype.getTetromino = function() {
    var temp = this.currentTetrimino;
    this.currentTetrimino = this.nextTetrimino;
    this.nextTetrimino = Tetromino.create();
    this.newTetris = true;
    return temp;
  };

  Mediator.prototype.update = function() {
  };


  /*
   * Main Mediator
   */
  function MainMediator() {
    Mediator.call(this);
  }

  MainMediator.prototype = new Mediator();
  MainMediator.prototype.constructor = Mediator;

  MainMediator.prototype.init = function(keydownHandler, context) {
    var that = this;
    this.inputHandler = function(event) {
      var key = event.keyCode;
      if (key) {
        that.inputQueue.push(key);
        keydownHandler.apply(context, [event]);
      }
    };

    this.currentTetrimino = Tetromino.create();
    this.nextTetrimino = Tetromino.create();
    this.newTetris = true;
    this.gameEnd = false;
    this.inputQueue = [];

    if (this.inputHandler) {
      $(exports.window).on("keydown", this.inputHandler);
    }
  };

  MainMediator.prototype.getGameData = function() {
    if (this.gameEnd) {
      return "end";
    }

    var result = {};
    if (this.newTetris) {
      result.tetris = this.currentTetrimino.num;
      this.newTetris = false;
    }
    if (this.inputQueue.length > 0) {
      result.input = this.inputQueue.join();
    }
    return JSON.stringify(result);
  };


  /*
   * Sub Mediator
   */
  function SubMediator() {
    Mediator.call(this);
  }

  SubMediator.prototype = new Mediator();
  SubMediator.prototype.constructor = Mediator;

  SubMediator.prototype.init = function(keydownHandler) {
    this.currentTetrimino = null;
    this.nextTetrimino = null;
    this.inputHandler = keydownHandler;
    this.newTetris = true;
    this.gameEnd = false;
    this.inputQueue = [];
  };

  SubMediator.prototype.getTetromino = function() {
    var temp = this.currentTetrimino;
    this.currentTetrimino = this.nextTetrimino;
    this.nextTetrimino = null;
    this.newTetris = true;
    return temp;
  };

  SubMediator.prototype.setGameData = function(receivedData) {
    if (receivedData && receivedData.data) {
      utils.log("Receive data : " + $.param(receivedData));
      if (receivedData.data == "end") {
        this.gameEnd = true;
      } else {
        var terisNumber = receivedData.tetris;
        var input = receivedData.input;
        if (terisNumber) {
          if (this.currentTetrimino) {
            this.nextTetrimino = Tetromino.create(terisNumber);
          } else {
            this.currentTetrimino = Tetromino.create(terisNumber);
          }
        }

        if (input && this.inputHandler) {
          this.inputHandler({ "keyCode" : input });
        }
      }
    }
  };


  /*
   * exports
   */
  exports.MainMediator = MainMediator;
  exports.SubMediator = SubMediator;

})(window, jQuery);
