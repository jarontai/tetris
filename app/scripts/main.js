$(function() {
  'use strict';

  // single play
  $('#single-play-btn').click(function(event) {
    var inputHandler = new InputHandler();
    var grid = new Grid('canvas', inputHandler);

    grid.setEventHandler(function(event) {
      var score = +(event.data && event.data.score);
      alert('Game Over! Your score : ' + score);
      $('.canvas-panel').hide(400, function() {
        $('.menu-panel').show();
      });
    });

    $('.menu-panel').hide();
    $('.canvas-panel').show(400, function() {
      grid.start();
    });
  });

  // double play
  $('#double-play-btn').click(function(event) {
    /* Act on the event */
  });

  // about
  $('#about-btn').click(function(event) {
    /* Act on the event */
  });

});
