$(function() {
  'use strict';

  /*
   * UI control
   */
  $('#single-play-btn').click(function(event) {
    var grid = new Grid('canvas');
    $('.menu-panel').hide();
    $('.canvas-panel').show(400);
  });

  $('#double-play-btn').click(function(event) {
    /* Act on the event */
  });

  $('#about-btn').click(function(event) {
    /* Act on the event */
  });

});
