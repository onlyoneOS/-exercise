define(function(require, exports, module) {
	var $ = require("jquery");
	var DT_bootstrap = require("DT_bootstrap");
	var StringBuffer = require("stringBuffer");
	var dataTable = require("dataTables");
	require("jqBootstrapValidation");
	require("bootstrap");
	require("formDataTable");

	exports.init = function() {

		var url = ctx + "/eventIndicator/getAllEventIndicators?tmp=" + Math.random();
		var $field = $("#taskTable");

		var options = {
			url : url,
			modiUrl : ctx + "/eventIndicator/updateEventIndicator",
			delUrl : ctx + "/eventIndicator/delEventIndicator",
			enableDomain : [false,false,true,false,false,false,false],
			domainCode : ["eventLevel"],
			enableCRUD : true,
			mDataEX : [ "id","eventTypeIdMeaning", "eventLevel", "eventRuleId", "eventDescCh", "eventDescEn", "eventReason" ]
		}
		$field.dataTableEX(options);

		// 添加
		$('#add').unbind('click').click(
				function() {
					$('#edit_list').load(ctx + "/eventIndicator/addEventIndicator?tmp=" + Math.random());
				});

	};

});