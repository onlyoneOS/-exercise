define(function(require, exports, module) {
	var $ = require("jquery");
	var DT_bootstrap = require("DT_bootstrap");
	var StringBuffer = require("stringBuffer");
	var dataTable = require("dataTables");
	require("jqBootstrapValidation");
	require("bootstrap");
	require("formDataTable");

	exports.init = function() {

		var url = ctx + "/eventRule/getAllEventRules?tmp=" + Math.random();
		var $field = $("#taskTable");

		var options = {
			url : url,
			modiUrl : ctx + "/eventRule/updateEventRule",
			delUrl : ctx + "/eventRule/delEventRule",
			enableDomain : [false,false,true,false,false],
			domainCode : ["ruleType"],
			enableCRUD : true,
			mDataEX : [ "id", "eventNormIdMeaning", "ruleType", "ruleExpression", "algorithmName" ]
		}
		$field.dataTableEX(options);

		// 添加
		$('#add').unbind('click').click(
				function() {
					$('#edit_list').load(ctx + "/eventRule/addEventRule?tmp=" + Math.random());
				});

	};

});