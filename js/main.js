$(function() {
 
   var appView;

	if ($.browser.msie) {
		var version = parseInt($.browser.version);
		if (version < 9) {
			$("#info").fadeOut();	
			$("#ie-info").fadeIn();
			return;
		}
	}

	appView = new AppView();

});