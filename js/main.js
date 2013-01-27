$(function() {
 
   var appView;

	if (utils.oldIE) {
		$("#start-menu").hide();	
		$("#ie-info").show();
		return;
	} else {
		appView = new AppView();
	}

});