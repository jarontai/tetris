$(function() {
 
   var appView;

	if (utils.oldIE) {
		$("#single-info").fadeOut();	
		$("#ie-info").fadeIn();
		return;
	}

	appView = new AppView();

});