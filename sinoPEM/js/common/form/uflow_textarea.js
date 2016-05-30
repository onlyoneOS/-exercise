define(function(require,exports,module) {
	var $ = require("jquery");
	(function($) {
				// 文本域
				$.fn.uflow_textarea = function() {
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
							height : '',
							prompt : ''
						};

						var opts = $.extend(defaults, options);
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
							var $input = $("<textarea>");
							var textarea_width;
							if (opts.showLabel) {
								textarea_width = opts.width - 154;
							} else {
								textarea_width = opts.width - 74;
							}
							$input.attr("id", opts.name).attr("name", opts.name).css("width", textarea_width);
							$input.attr("class", "Textarea");
							$input.addClass("f12");
							$input.addClass(opts.inputClass);
							if (opts.height) {
								$input.attr("rows", opts.height);
							}
							if (opts.value) {
								$input.val(opts.value);
							} else if (opts.prompt) {// 当不存在默认值并且有提示信息的情况
								$input.val(opts.prompt);
								$input.addClass("grey");
							}
							if (opts.boolRequire == true) {
								$input.addClass("required");
							}
							
							//文本域长度不能超过2000
							$input.attr("maxlength",2000);

							$input.bind('focus', function() {
										$(this).addClass("TextareaSuccess");
										if ($(this).hasClass("grey")) {
											$(this).removeClass("grey");
											$(this).data("prompt", $(this).val());
											$(this).val("");
										}
									});

							$input.bind('blur', function() {
										$(this).removeClass("TextareaSuccess");
										if (!$(this).val() && $(this).data("prompt")) {
											$(this).addClass("grey");
											$(this).val($(this).data("prompt"));
										}
									});
							$(this).append($input);
						} else {
							var textarea_width;
							if (opts.showLabel) {
								textarea_width = opts.width - 154;
							} else {
								textarea_width = opts.width - 74;
							}
							
							$(this).append($("<p>").css("width",textarea_width).text(opts.value));
						}

					}
					if (typeof arguments[0] == 'string') {
						var funName = arguments[0];
						if (funName == 'getValue') {
							if ($(this).find('textarea').size() > 0 && !$(this).find('textarea').hasClass("grey"))
								return $(this).find('textarea').val();
						}
						if (funName == 'setValue') {
							if (typeof arguments[1] == 'string') {
								return $(this).find('textarea').val(arguments[1]);
							} else {
								alert('文本域赋值参数错误');
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
									$(this).find("textarea").addClass("required");
								} else {
									if ($(this).find("label").find('span').size() > 0) {
										$(this).find("label").find('span').remove();
									}
									if ($(this).find("textarea").hasClass("required")) {
										$(this).find("textarea").removeClass("required");
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