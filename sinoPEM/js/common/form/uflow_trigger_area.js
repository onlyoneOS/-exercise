define(function(require,exports,module) {
	var $ = require("jquery");
	(function($) {
				// 提示文本域
				$.fn.trigger_area = function() {
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
							var $outDiv = $('<div style="*float:left;display: inline-block;"></div>');
							$outDiv.attr("class", "quickway");
							$outDiv.css("width", textarea_width);
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
							//快捷回复不能超过256个字符
							$input.attr("maxlength",256);

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
							$outDiv.append($input);
							$(this).append($outDiv);

							var $innerDiv = $("<div></div>");
							$innerDiv.attr("class", "quickway_text");

							var $trigger = $("<a href='javascript:void(0);'></a>");
							$trigger.attr("class", "btn_recall");

							$innerDiv.append($trigger);
							$outDiv.append($innerDiv);

							var $triggerUl = $("<ul></ul>");
							$innerDiv.append($triggerUl);

							$.loadTrigger($triggerUl, $input);

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
							if ($(this).find('textarea').size() > 0)
								return $(this).find('textarea').val();
						}
						if (funName == 'setValue') {
							if (typeof arguments[1] == 'string') {
								return $(this).find('textarea').val(arguments[1]);
							} else {
								alert('快捷回复组件赋值参数错误');
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

				// 加载数据
				$.loadTrigger = function($triggerUl, $input) {
					// $triggerUl.empty();

					$.ajax({
						url : '/uflow/formTrigger.do?method=listAll',
						method : 'post',
						dataType : 'json',
						success : function(data) {

							for (var i = 0; i < data.length; i++) {
								var $li = $("<li></li>");
								$li.text(data[i].content);
								$li.attr("class", "quickwaytext_txt");
								$li.bind('click', function() {
											$input.val($input.val() + $(this).text());
											$input.focus();
											$input.blur();
										});

								var $a = $("<a href='javascript:void(0)'></a>");
								$a.attr("class", "blue_close");
								$a.attr("tri_id", data[i].id);
								$a.bind("click", function(e) {
											$.removeTrigger($(this));
										});

								$li.append($a);
								$triggerUl.append($li);

							}

							var $addLi = $("<li></li>");
							var $addInput = $("<input type='text'/>");
							$addInput.attr("class", "InpText");

							var $addA = $("<a href='javascript:void(0)'>保存</a>");
							$addA.click(function() {
								if (!$addInput.val()) {
									return;
								}
								for(var i = 0; i < $triggerUl.children().size(); i++){
									if($triggerUl.children().eq(i).text() == $addInput.val()){
										$addInput.val("");
										return;
									}
								}
								$.addTrigger($addInput, $triggerUl,$input);
							});

							$addLi.append($addInput).append($addA);
							$triggerUl.append($addLi);

						}
					});
				}

				// 添加一条记录
				$.addTrigger = function($addInput, $triggerUl,$input) {
					$.ajax({
								url : '/uflow/formTrigger.do?method=add',
								method : 'post',
								dataType : 'json',
								data : {
									content : $addInput.val()
								},
								success : function(data) {

									var $li = $("<li></li>");
									$li.text($addInput.val());
									$li.attr("class", "quickwaytext_txt");
									$li.bind('click', function() {
										$input.val($input.val() + $(this).text());
										$input.focus();
										$input.blur();
									});
									var $a = $("<a href='javascript:void(0)'></a>");
									$a.attr("tri_id", data);
									$a.attr("class", "blue_close");
									$a.click(function() {								
												$.removeTrigger($(this));
											});

									$li.append($a);
									$triggerUl.prepend($li);
									$addInput.val("");
								}
							});
				}

				// 删除
				$.removeTrigger = function($a) {
					$a.parent().remove();
					$.ajax({
								url : '/uflow/formTrigger.do?method=remove',
								method : 'post',
								dataType : 'json',
								data : {
									id : $a.attr("tri_id")
								},
								success : function(data) {

								}
							});
				}
			})($);
		});