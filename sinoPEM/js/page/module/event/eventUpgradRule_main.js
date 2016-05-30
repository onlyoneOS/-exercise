define(function(require, exports, module) {
	var $ = require("jquery");
	var DT_bootstrap = require("DT_bootstrap");
	var StringBuffer = require("stringBuffer");
	var dataTable = require("dataTables");
	require("jqBootstrapValidation");
	require("bootstrap");
	require("formDataTable");

	exports.init = function() {
		var url = ctx + "/eventUpgradRule/getAllEventUpgradRules?tmp=" + Math.random();
		var $field = $("#taskTable");
		var options = {
			url : url,
			modiUrl : ctx + "/eventUpgradRule/updateEventUpgradRule",
			delUrl : ctx + "/eventUpgradRule/delEventUpgradRule",
			enableCRUD : true,
			mDataEX : [ "id", "eventTypeIdMeaning", "runPeriod", "runTimes", "upgradeParam", "upgradeDesc" ]
		}
		$field.dataTableEX(options);

		// 添加
		$('#add').unbind('click').click(
				function() {
					$('#edit_list').empty();
					$('#edit_list').load(ctx + "/eventUpgradRule/addEventUpgradRule?tmp=" + Math.random());
				});

	};

});