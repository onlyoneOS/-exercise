define(function(require, exports, module) {
			var $ = require("jquery");
			var formEvent = require("formEvent");
(function	($) {
				// 单选框
				$.fn.uflow_radio = function() {
					var self = $(this);
					if (typeof arguments[0] == 'object') {
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
							oldValue : '',
							inputChange : ''// Radio点击事件，只有值改变时才触发
						};
						var opts = $.extend(defaults, options);
						self.data("uflow_radio_option", opts);
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
							var $radioBlock = $("<div>").css("display", "inline-block");
							$radioBlock.addClass("f12");
							// var optionalData = opts.optionalData;
							// var dataString = optionalData.substr(0,
							// optionalData.length - 1);
							var optionDatas = opts.optionalData.split("#");
							for (var i = 0; i < optionDatas.length; i++) {
								if (!optionDatas[i]) {
									continue;
								}

								var $input = $("<input type='radio' name='" + opts.name + "' value='" + optionDatas[i] + "'>");//.attr("name", opts.name).attr("value", optionDatas[i]);
								if (optionDatas[i] == opts.value) {
									opts.oldValue = optionDatas[i];
									$input.attr("checked", "checked");
								}
								if (opts.boolRequire == true) {
									$input.addClass("required");
								}
								if (opts.inputChange) {
									$input.bind("click", function() {
												var option_ = self.data("uflow_radio_option");
												if (option_.oldValue_ != this.value && option_.inputChange) {
													formEvent[option_.inputChange]();
												}
												option_.oldValue_ = this.value;
											});
								}
								$radioBlock.append($input).append(optionDatas[i]);
							}
							$(this).append($radioBlock);
						} else {
							$(this).append(opts.value);
						}

					} else if (typeof arguments[0] == 'string') {
						var funName = arguments[0];
						if (funName == 'getValue') {
							if ($(this).find(':radio').size() > 0) {
								var value = "";
								$.each($(this).find(":radio"), function(i, val) {// 得到的val是DOM
											if (val.checked == true) {
												value = val.value;
												return false;// jquery的each跳出
											}
										});
								return value;
							}
						}
						if (funName == 'setValue') {
							if (arguments[1]) {
								var data = arguments[1];
								$(this).find(":radio").each(function(i, val) {
											if (val.value == data) {
												val.checked = true;
												return;
											}

										})
								var option_ = self.data("uflow_radio_option");
								if (option_.oldValue_ != this.value) {
									option_.inputChange();
								}
								option_.oldValue_ = this.value;
								// return $(this).find(':radio
								// [value="'+arguments[1]+'"]').atrr("checked",'checked');
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
									return;
								}
								// 控制必填或可写
								if (arguments[1] == "required") {
									$(this).find("label").children("span").remove();
									$(this).find("label").prepend('<span style="color: red;">*</span>');
									$(this).find(":radio").addClass("required");
								} else {
									if ($(this).find("label").find('span').size() > 0) {
										$(this).find("label").find('span').remove();
									}
									if ($(this).find(":radio").hasClass("required")) {
										$(this).find(":radio").removeClass("required");
									}
								}
							} else {
								alert('参数错误');
							}
						}

					}

				};
			})($);
		});