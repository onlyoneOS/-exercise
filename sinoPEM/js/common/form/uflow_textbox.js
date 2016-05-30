define(function(require,exports,module) {
	var $ = require("jquery");
	(function($) {
		// 文本框
		$.fn.uflow_textbox = function() {

			if (typeof arguments[0] == 'object') {// 创建
				var options = arguments[0];
				var defaults = {
					name : '',
					showLabel : true,
					label : '',
					labelClass : '',
					inputClass : '',
					width : 200,
					boolWrite : true,
					boolRequire : false,
					value : '',
					prompt : ''
				};
				// Extend our default options with those provided.
				var opts = $.extend(defaults, options);

				// Our plugin implementation code goes here.
				if (opts.showLabel) {
					var $label = $("<label>").attr("for", opts.name);
					if (opts.boolWrite == true) {
						$label.attr("class", "editableLabel");
					}
					$label.addClass(opts.labelClass);
					if (opts.boolRequire == true) {
						$label.append($("<span>").attr("class", "red").append("*"));
					}
					$label.append(opts.label).append("：");
					$(this).append($label);
				}

				if (opts.boolWrite) {
					var $input = $("<input>");
					var text_width;
					if (opts.showLabel) {
						text_width = opts.width - 154;
					} else {
						text_width = opts.width - 74;
					}
					$input.attr("id", opts.name).attr("name", opts.name).attr("type", "text").css("width", text_width);
					$input.attr("class", "InpText");
					$input.addClass("f12");
					$input.addClass(opts.inputClass);
					if (opts.value) {
						$input.attr("value", opts.value);
					} else if (opts.prompt) {// 当不存在默认值并且有提示信息的情况
						$input.attr("value", opts.prompt);
						$input.addClass("grey");
					}
					if (opts.boolRequire == true) {
						$input.addClass("required");
					}
					//文本框长度不能超过256
					$input.attr("maxlength",256);

					$input.bind('focus', function() {
								$(this).addClass("InpTextSucess");
								if ($(this).hasClass("grey")) {
									$(this).removeClass("grey");
									$(this).data("prompt", $(this).val());
									$(this).val("");
								}
							});

					$input.bind('blur', function() {
								$(this).removeClass("InpTextSucess");
								if (!$(this).val() && $(this).data("prompt")) {
									$(this).addClass("grey");
									$(this).val($(this).data("prompt"));
								}
							});

					$(this).append($input);
				} else {
					var text_width;
					if (opts.showLabel) {
						text_width = opts.width - 154;
					} else {
						text_width = opts.width - 74;
					}
					$(this).append($("<p>").css("width",text_width).text(opts.value));
				}

			} else if (typeof arguments[0] == 'string') {
				var funName = arguments[0];
				if (funName == 'getValue') {// 取值
					if ($(this).find(":text").size() > 0 && !$(this).find(":text").hasClass("grey")) {
						return $(this).find(":text").val();
					}
				} else if (funName == 'setValue') {// 赋值
					if (typeof arguments[0] == 'string') {
						return $(this).find(":text").val(arguments[1]);
					} else {
						alert("文本框赋值参数错误");
					}
				} else if (funName == 'setPerm') {// 设置权限
					if (arguments[1]) {
						// 控制是否显示
						if (arguments[1] == "hidden") {
							$(this).hide();
							return;
						} else {
							$(this).show();
						}
						// 控制只读或可写
						if (arguments[1] == "read") {
							return;
						}
						// 控制必填或可写
						if (arguments[1] == "required") {
							$(this).find("label").children("span").remove();
							$(this).find("label").prepend('<span style="color: red;">*</span>');
							$(this).find(":text").addClass("required");
						} else {
							if ($(this).find("label").find('span').size() > 0) {
								$(this).find("label").find('span').remove();
							}
							if ($(this).find(":text").hasClass("required")) {
								$(this).find(":text").removeClass("required");
							}
						}
					} else {
						alert("参数错误");
					}
				}
			} else {
				alert("参数错误");
			}
		};
	})($);
});