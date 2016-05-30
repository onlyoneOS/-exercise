define(function(require, exports, module) {
			var $ = require("jquery");
(function	($) {
				// 复选框
				$.fn.uflow_checkbox = function() {
					if (typeof arguments[0] == 'object') {
						var defaults = {
							name : '',
							showLabel : true,
							label : '',
							labelClass : '',
							inputClass : '',
							width : 200,
							boolWrite : true,
							boolRequire : false,
							value : ''
						};
						var options = arguments[0];
						var opts = $.extend(defaults, options);

						if (opts.showLabel) {
							var $label = $("<label>").attr("for", opts.name);
							if (opts.boolWrite == true) {
								$label.attr("class", "vt editableLabel");
							}
							$label.addClass(opts.labelClass);
							if (opts.boolRequire == true) {
								$label.append($("<span>").attr("class", "red").append("*"));
							}
							$label.append(opts.label).append("：");
							$(this).append($label);
						}

						if (opts.boolWrite == true) {
							var $checkBlock = $("<div>").css("display", "inline-block");
							$checkBlock.addClass("f12");
							var optionData = opts.opt;
							var value;
							if (opts.value) {
								value = opts.value.split(",");
							}
							for (var i = 0; i < optionData.length; i++) {
								var data = optionData[i];
								var $input = $("<input>").attr("id", data.id).attr("name", opts.name).attr("type", "checkbox").attr("value", data.id);
								if (value) {
									if ($.inArray(data.id, value) >= 0) {// 判断该项的值是否在复选框值的数组中
										$input.attr("checked", "checked");
									}
								}
								if (opts.boolRequire == true) {
									$input.addClass("required");
								}
								$checkBlock.append($input).append(data.name);
								if (opts.columns && opts.columns != 0 && (i + 1) % opts.columns == 0) {
									$checkBlock.append($("<br>"));
								}
							}
							$(this).append($checkBlock);
						} else {
							var text_width;
							if (opts.showLabel) {
								text_width = opts.width - 154;
							} else {
								text_width = opts.width - 74;
							}
							$(this).append($("<p>").css("width", text_width).append(opts.displayValue));
						}

					}
					if (typeof arguments[0] == 'string') {
						var funName = arguments[0];
						if (funName == 'getValue') {
							if ($(this).find(':checkbox').size() > 0) {
								var value = "";
								$.each($(this).find(":checkbox"), function(i, val) {
											if (val.checked == true) {
												value += val.value + ",";
											}
										});
								return value.substring(0, value.length - 1);
							}
						}
						if (funName == 'setValue') {
							if (arguments[1]) {
								var data = arguments[1].split(',');
								$(this).find(':checkbox').attr('checked', false);// 清空以前选中
								for (var j = 0; j < data.length; j++) {
									$.each($(this).find(":checkbox"), function(i, val) {
												if (val.value == data[j]) {
													val.checked = true;
												}
											});
								}
							}
						}
						if (funName == 'setPerm') {
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
								}
								// 控制必填或可写
								if (arguments[1] == "required") {
									$(this).find("label").children("span").remove();
									$(this).find("label").prepend('<span style="color: red;">*</span>');
									$(this).find(":checkbox").addClass("required");
								} else {
									if ($(this).find("label").find('span').size() > 0) {
										$(this).find("label").find('span').remove();
									}
									if ($(this).find(":checkbox").hasClass("required")) {
										$(this).find(":checkbox").removeClass("required");
									}
								}
							} else {
								alert("参数错误");
							}
						}
					}

				};
			})($);
		});