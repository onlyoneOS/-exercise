define(function(require, exports, module) {
	var $ = require("jquery");
	require("changTag");
	(function($) {
		// 复用块
		$.fn.multiplexSection = function() {
			var sheet = arguments[0];
			var templateName = sheet.templateName;
			var action = sheet.action;
			var $sheet = $("<div>");
			// 复用块名称与历史记录里的名称相同，并且有数据时加载
			if (sheet.sheetModels) {
				// 列名
				var coloumNames = sheet.coloumNames;
				// 数据
				var sheetModels = sheet.sheetModels;
				// 加载复用块历史记录列表
				var $labelDiv = $("<div class='border01 handprocess_daily nbb nmt'>");
				var $label = $("<table  width='100%' cellspacing='0' border='0'>");
				var $thead = $("<thead>");
				var $theadTr = $("<tr>");
				// $label.append("<thead><tr>");
				// 加载列名
				for ( var i = 0; i < coloumNames.length; i++) {
					var coloumName = coloumNames[i];
					$theadTr.append("<th>" + coloumName + "</th>");
				}
				// $label.append("</tr></thead>");

				$thead.append($theadTr)
				$label.append($thead);

				// $label.append("<tbody>");
				var $tbody = $("<tbody>");

				// 加载数据
				for ( var j = 0; j < sheetModels.length; j++) {
					var sheetModel = sheetModels[j];
					$tbodyTr = $("<tr>");
					// 根据列名加载数据
					for ( var i = 0; i < coloumNames.length; i++) {
						var coloumName = coloumNames[i];
						var value = eval("sheetModel." + coloumName);
						if(value==null||value=='null'){
							value="&nbsp";
						}
						$tbodyTr.append("<td>"
								+ value.changeHtml()+ "</td>");
					}
					$tbody.append($tbodyTr);
				}
				$label.append($tbody);
				$labelDiv.append($label);
				$sheet.append($labelDiv);
			}

			return $sheet;
		}
	})($);
});