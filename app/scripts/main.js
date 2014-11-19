$(function() {
  'use strict';

  // requestAnimationFrame polyfill
  (function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); },
          timeToCall);
        lastTime = currTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
      };
    }
  })();

  var grid1, grid2;
  var gameStatus = {
    gameMode: ''
  };

  // single play
  $('#single-play-btn').click(function() {
    var inputHandler = new InputHandler();
    grid1 = new Grid('canvas', inputHandler);
    grid1.setInputType(1);

    grid1.setEventHandler(function(event) {
      var score = +(event.data && event.data.score);
      if (event.data && !event.data.forceStop) {
        window.alert('Game Over! Your score : ' + score);
      }
      $('.canvas-panel').hide(400, function() {
        $('.menu-panel').show();
      });
    });

    gameStatus.gameMode = 'single';
    $('.menu-panel').hide();
    $('.one-canvas-panel').show(400, function() {
      grid1.start();
    });
  });

  // double play
  $('#double-play-btn').click(function() {
    var inputHandler1 = new InputHandler();
    var inputHandler2 = new InputHandler();
    grid1 = new Grid('canvas1', inputHandler1);
    grid2 = new Grid('canvas2', inputHandler2);
    grid1.setInputType(2);
    grid2.setInputType(1);

    grid1.setEventHandler(function(event) {
      var score = +(event.data && event.data.score);
      if (event.data && !event.data.forceStop) {
        window.alert('Game Over! Player1 score : ' + score);
      }
      $('.canvas-panel').hide(400, function() {
        $('.menu-panel').show();
      });
    });

    grid2.setEventHandler(function(event) {
      var score = +(event.data && event.data.score);
      if (event.data && !event.data.forceStop) {
        window.alert('Game Over! Player2 score : ' + score);
      }
      $('.canvas-panel').hide(400, function() {
        $('.menu-panel').show();
      });
    });

    gameStatus.gameMode = 'double';
    $('.menu-panel').hide();
    $('.two-canvas-panel').show(400, function() {
      grid1.start();
      grid2.start();
    });
  });

  // pause game
  $('button.pause-game').click(function(event) {
    var status, text;
    switch (gameStatus.gameMode) {
      case 'single' :
        status = grid1.togglePause(event.pause);
      break;

      case 'double' :
        status = grid1.togglePause(event.pause);
        status = grid2.togglePause(event.pause);
      break;

      default : break;
    }

    if (!!status) {
      text = '继续';
    } else {
      text = '暂停';
    }
    $('button.pause-game').text(text);
  });

  // return home
  $('button.return-home').click(function() {
      var sure, paused;
      switch (gameStatus.gameMode) {
        case 'single' :
          paused = grid1.togglePause(true);
          sure = window.confirm('确定要中断游戏并返回菜单?');
          if (sure) {
            $('button.pause-game').text('暂停');
            grid1.forceStop(true);
            gameStatus.gameMode = '';
          } else {
            paused = this.togglePause(false);
          }
        break;

        case 'double' :
          paused = grid1.togglePause(true) && grid2.togglePause(true);
          sure = window.confirm('确定要中断游戏并返回菜单?');
          if (sure) {
            $('button.pause-game').text('暂停');
            grid1.forceStop(true);
            grid2.forceStop(true);
            gameStatus.gameMode = '';
          } else {
            paused = this.togglePause(false);
          }
        break;

        default : break;
      }
  });

  // about
  $('#about-btn').click(function() {
    // TODO - add about page
  });

});
