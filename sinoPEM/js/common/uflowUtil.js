/**
 * 工具类，一些公用方法
 */
define(function(require, exports, module) {
	var uflowUtil = {};
	
	/**
	 * IE下无提示关闭窗口
	 */
	uflowUtil.closeWindow = function(){
		var isIE = navigator.appName == "Microsoft Internet Explorer";

		if (isIE) {
			window.open('','_top');
		}
		window.top.close();
	}
	
	uflowUtil.closeOpenerWindow = function(){
		var isIE = navigator.appName == "Microsoft Internet Explorer";

		if (isIE) {
			window.opener.open('','_top');
		}
		window.opener.top.close();
	}
	
	
	return uflowUtil;
});
