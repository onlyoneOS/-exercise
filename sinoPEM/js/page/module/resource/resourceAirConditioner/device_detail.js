define(function(require, exports, module) {
	var $ = require("jquery");

	exports.init = function(){
		
		 $("#_sino_partner_product_back").bind('click',function(){
			 openurl();
        });
	  }	;
	  
	function openurl(){
		//$('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
		var options = {};
		options.murl = 'airConditioner/airConditionalManagePage';
		$.openurl(options);
	}
	
});