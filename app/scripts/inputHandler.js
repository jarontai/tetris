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
    }
  }

  InputHandler.prototype.setReceiver = function(receiver, context) {
    this.receiver = receiver;
    this.receiverContext = context;
  };

  InputHandler.prototype.setInputType = function(type) {
    if (type === 1) {
      this.KEY_UP = 38;
      this.KEY_DOWN = 40;
      this.KEY_RIGHT = 39;
      this.KEY_LEFT = 37;
    } else if (type === 2) {
      this.KEY_UP = 87;
      this.KEY_DOWN = 83;
      this.KEY_RIGHT = 68;
      this.KEY_LEFT = 65;
    }
  };

  /*
   * exports
  */
  exports.InputHandler = InputHandler;

})(window, jQuery);
