define(function(require, exports, module) {
	var $ = require("jquery");
	
	(function($) {
				// 富文本
				$.fn.uflow_richText = function() {
					if (typeof arguments[0] == 'object') {
						var defaults = {
							name : '',
							showLabel : true,
							label : '',
							labelClass : '',
							inputClass : '',
							width : 200,
							boolWrite : true,
							boolRequire : false
						};
						var options = arguments[0];
						var opts = $.extend(defaults, options);

						if (opts.showLabel) {
							var $label = $("<label>").attr("for", opts.name).attr("class", "vt");
							if (opts.boolWrite == true) {
								$label.addClass("editableLabel");
							}
							$label.addClass(opts.labelClass);
							if (opts.boolRequire == true) {
								$label.append($("<span>").attr("class", "red").append("*"));
							}
							$label.append(opts.label).append("：");
							$(this).append($label);
						}

						var $richText = $("<div>");
						$richText.attr("id", "richText_" + opts.name).css("display", "inline-block");
						var richText_width;
						if (opts.showLabel) {
							richText_width = opts.width - 154 + 10;
						} else {
							richText_width = opts.width - 74 + 10;
						}
						$richText.css("width", richText_width);

						var editor = richTextStore.get(opts.name);
						editor.render("richText_" + opts.name);
						if (opts.value) {
							editor.ready(function() {
										editor.setContent(opts.value);
									});
						}
						
//						if (opts.boolWrite) {
//						} else {
//							editor.ready(function() {
//										editor.disable(['bold','insertimage']);
//									});
//						}
						if (opts.boolRequire == true) {
							editor.required = true;
						}
						$(this).append($richText);
					} else if (typeof arguments[0] == 'string') {
						var funName = arguments[0];
						if (funName == 'getValue') {// 取值
							var editor = richTextStore.get(arguments[1]);
							return editor.getContent();
						} else if (funName == 'setValue') {// 赋值
							alert("富文本组件不提供setValue方法");
							// if (arguments[1]) {
							// editor.ready(function() {
							// editor.setContent(arguments[1]);
							// })
							// } else {
							// alert("参数错误");
							// }
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
									$(this).find("label").html("<span class=\"red\">*</span>" + $(this).find("label").text());
								} else {
									if ($(this).find("label").find('span').size() > 0) {
										$(this).find("label").find('span').remove();
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