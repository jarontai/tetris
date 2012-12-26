$(function() {

	if ($.browser.msie) {
		var version = parseInt($.browser.version);
		if (version < 9) {
			alert("您的IE浏览器不支持HTML5，请升级至IE9或以上版本");
		}
	}

	var appView = new AppView();
});