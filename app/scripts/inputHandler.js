(function(exports, $) {

  'use strict';

  /*
   * InputHandler
   */
  function InputHandler(type) {
    var INPUT_KEYBOARD = 'keyboard';
    var INPUT_TOUCH = 'touch';
    if (!type || (type !== INPUT_KEYBOARD) || (type !== INPUT_TOUCH)) {
      type = INPUT_KEYBOARD;
    }

    this.type = type ;
    this.receiver = null;
    this.receiverContext = null;

    // init
    if (this.type === INPUT_KEYBOARD) {
      var that = this;
      $(window).on('keydown', function(event) {
        if (that.receiver && that.receiverContext) {
          that.receiver.apply(that.receiverContext, [event]);
        }
      });
    } else if (this.type === INPUT_TOUCH) {
      // TODO - add touch handle
    }
  }

  InputHandler.prototype.setReceiver = function(receiver, context) {
    this.receiver = receiver;
    this.receiverContext = context;
  };

  /*
   * exports
  */
  exports.InputHandler = InputHandler;

})(window, jQuery);
