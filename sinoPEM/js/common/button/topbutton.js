define(function(require, exports, module) {

	var $ = require("jquery");
	var uflowUtil = require("uflowUtil");

	require("uic/formUser");
	require("uflow_textarea");
	require("uflow_checkbox");
	require("uic/dialog");
	require("uic/message_dialog");
	/**
	 * 一切与顶部按钮相关功能
	 * 
	 * @type
	 */
	var topButton = {};

	/**
	 * 显式定义全局变量，同一时间只能有一个DIV浮出
	 * 
	 * @type
	 */
	topButton.buttonDiv = null;
	topButton.buttonDivName = null;

	var extButton = require("extButton");
	/**
	 * 所有功能类都写这下面
	 * 
	 * @type
	 */
	topButton.fn = $.extend({}, extButton);

	/**
	 * 工具类
	 * 
	 * @type
	 */
	topButton.util = {};

	/**
	 * 根据传进来的对象数组生成按钮并添加事件
	 * 
	 * @param {}
	 *            buttons
	 * @param {}
	 *            topdiv
	 */
	topButton.create = function(buttons, topdiv) {

		// 先添加一些特殊按钮
		if ("undefined" != typeof canRead && canRead) {// 已阅
			var b = $("<a href='javascript:void(0);'> 已阅</a>");
			b.attr("id", 'tb_read');
			b.attr("title", "已阅");
			b.attr("class", "default");

			b.bind('click', {}, function(e) {
						topButton.fn.read({
									id : 'tb_read',
									tooltip : '已阅'
								});
					});
			topdiv.append(b);
		}

		if ("undefined" != typeof canClaim && canClaim) {// 认领
			var b = $("<a href='javascript:void(0);'> 认领</a>");
			b.attr("id", 'tb_claim');
			b.attr("title", "认领");
			b.attr("class", "renl");

			b.bind('click', {}, function(e) {
						topButton.fn.claim({
									id : 'tb_claim',
									tooltip : '认领'
								});
					});
			topdiv.append(b);
		}

		if (!buttons || buttons.length == 0) {
			return;
		}

		for (var i = 0; i < buttons.length; i++) {
			var button = buttons[i];

			var b = $("<a href='javascript:void(0);'>" + button.text + "</a>");
			b.attr("id", 'tb_' + button.id);
			b.attr("title", button.tooltip);
			if (button.icon) {
				b.attr("class", button.icon);
			} else {
				b.attr("class", "default");
			}

			b.bind('click', {
						button : button,
						self : b
					}, function(e) {

						topdiv.children().each(function() {
									$(this).removeClass("sel");
								});
						$(this).addClass("sel");

						var param = {};
						if (e.data.button.params && e.data.button.params.length > 0) {
							for (var i = 0; i < e.data.button.params.length; i++) {
								param[e.data.button.params[i].name] = e.data.button.params[i].value;
							}
						}

						if (topButton.buttonDiv) {

							if (e.data.button.actionClass == topButton.buttonDivName) {
								return;
							}

							topButton.buttonDiv.slideToggle("normal", function() {
										topButton.buttonDiv.remove();
										topButton.buttonDiv = null;
										topButton.buttonDivName = e.data.button.actionClass;
										topButton.fn[e.data.button.actionClass](e.data.button, param, e.data.self);
									});

						} else {
							if (topButton.util.hasTransition()) {
								$("#transitionContainer").slideToggle("normal");
							}
							topButton.buttonDivName = e.data.button.actionClass;
							topButton.fn[e.data.button.actionClass](e.data.button, param, e.data.self);
						}

					});

			topdiv.append(b);
		}

		return topdiv;
	}

	// 创建右侧按钮
	topButton.createRight = function(topdiv) {

		var b = $("<a href='javascript:void(0);'></a>");
		b.attr("id", 'tb_graph');
		b.attr("title", "流程图");
		b.attr("class", "lctu");
		b.bind('click', {}, function(e) {
					topButton.fn.graph();
				});
		topdiv.append(b);

		if (pageType == 1 || pageType == 2) {// 处理和查看页面才展示打印、导出按钮
			b = $("<a href='javascript:void(0);'></a>");
			b.attr("id", 'tb_print');
			b.attr("title", "打印");
			b.attr("class", "prit");
			b.bind('click', {}, function(e) {
						topButton.fn.print();
					});
			topdiv.append(b);

			b = $("<a href='javascript:void(0);'></a>");
			b.attr("id", 'tb_exportWord');
			b.attr("title", "导出word");
			b.attr("class", "daoc");
			b.bind('click', {}, function(e) {
						topButton.fn.exportWord();
					});
			topdiv.append(b);
		}

		return topdiv;
	}

	// 创建提交按钮
	topButton.createSubmit = function(topdiv) {

		var b = $("<a href='javascript:void(0)'>提交</a>");
		b.attr("id", 'tb_submit');
		b.attr("title", "提交");
		b.attr("class", "smit");
		b.bind('click', {}, _submitProcess);

		topdiv.append(b);

		return topdiv;
	}

	// 创建暂存按钮
	topButton.createSave = function(topdiv) {

		var b = $("<a href='javascript:void(0)'>暂存</a>");
		b.attr("id", 'tb_save');
		b.attr("title", "暂存");
		b.attr("class", "zanc");
		b.bind('click', {}, _saveProcess);
		topdiv.append(b);

		return topdiv;
	}

	// 创建保存草稿按钮
	topButton.createSaveDraft = function(topdiv) {

		var b = $("<a href='javascript:void(0)'>保存草稿</a>");
		b.attr("id", 'tb_saveDraft');
		b.attr("title", "保存草稿");
		b.attr("class", "zanc");
		b.bind('click', {}, _saveDraft);
		topdiv.append(b);

		return topdiv;
	}

	// 改派
	topButton.fn.reassign = function(button, param , self) {
		
		topButton.buttonDiv = $('<div class="top_buttoncn" style="display:none;"></div>');
		topButton.util.position(topButton.buttonDiv,self);
		var options = {
			inputName : "user",
			labelName : "改派给",
			labelClass : "w80 tr vt",
			width : 500,
			radioStructure : true
		}
		
		if(param.scope){
			options.addparams = [{name : 'code', value : param.scope}];
		}
		
		var user = $("<div class='topformlist mb10 clearfix'></div>")
		user.formUser(options);
		topButton.buttonDiv.append(user);

		options = {
			inputName : "message",
			label : "改派原因",
			labelClass : "w80 tr vt",
			width : 500
		}
		var message = $("<div class='topformlist mb10 clearfix'></div>")
		message.uflow_textarea(options);
		topButton.buttonDiv.append(message);

		var $buttonDiv = $("<div>").addClass("tc").addClass("mt10");
		var okButton = $('<input type="button" class="blue_btn33 mr5" value="确定">');
		okButton.bind('click', function() {
					if (!user.formUser('getValue')) {
						UicDialog.Alert("请选择改派人");
						return false;
					}
					if (!message.uflow_textarea('getValue')) {
						UicDialog.Alert("请输入改派原因");
						return;
					}
					if (message.uflow_textarea('getValue').length > 200) {
						UicDialog.Alert("改派原因不能超过200字！");
						return false;
					}

					$.post("/uflow/process.do?method=reassign", {
								user : user.formUser('getValue'),
								message : message.uflow_textarea('getValue'),
								taskId : taskId,
								processId : processId
							}, function() {
								UicDialog.Success("改派成功", function() {
											uflowUtil.closeWindow();
										});
							});
				});
		$buttonDiv.append(okButton);
		var cancelButton = $('<input type="button" class="grey_btn33" value="取消">');
		cancelButton.bind('click', function() {
					topButton.util.collapse(button);
				});
		$buttonDiv.append(cancelButton);
		topButton.buttonDiv.append($buttonDiv);
		$("#top_button_left").parent().append(topButton.buttonDiv);
		topButton.buttonDiv.css("float", $("#tb_" + button.id).css("float"));
		topButton.buttonDiv.slideToggle("normal");

	}

	// 回退
	topButton.fn.callTaskBack = function(button, param, self) {

		var text = "";
		var a = $.ajax({
					url : "/uflow/process.do?method=canTaskBack",
					async : false,
					method : "post",
					dataType : "text",
					data : {
						taskId : taskId,
						processId : processId
					},
					success : function(data) {
						text = data;
					}
				});

		if (text) {
			UicDialog.Error(text);
			topButton.util.collapse(button);
			return;
		}

		topButton.buttonDiv = $('<div class="top_buttoncn" style="display:none"></div>');
		topButton.util.position(topButton.buttonDiv,self);

		var options = {
			inputName : "message",
			label : "回退原因",
			labelClass : "w80 tr vt",
			width : 500
		}
		var message = $("<div class='topformlist mb10 clearfix'></div>");
		message.uflow_textarea(options);
		topButton.buttonDiv.append(message);

		var $buttonDiv = $("<div>").addClass("tc").addClass("mt10");
		var okButton = $('<input type="button" class="blue_btn33 mr5" value="确定">');
		okButton.bind('click', function() {
					if (!message.uflow_textarea('getValue')) {
						UicDialog.Alert("请输入回退原因！");
						return false;
					}
					if (message.uflow_textarea('getValue').length > 200) {
						UicDialog.Alert("回退原因不能超过200字！");
						return false;
					}

					$.post("/uflow/process.do?method=callTaskBack", {
								backReason : message.uflow_textarea('getValue'),
								taskId : taskId,
								processId : processId
							}, function() {
								UicDialog.Success("回退成功！", function() {
											uflowUtil.closeWindow();
										});
							});

					return false;
				});
		$buttonDiv.append(okButton);

		var cancelButton = $('<input type="button" class="grey_btn33" value="取消">');
		cancelButton.bind('click', function() {
					topButton.util.collapse(button);
				});
		$buttonDiv.append(cancelButton);
		topButton.buttonDiv.append($buttonDiv);

		$("#top_button_left").parent().append(topButton.buttonDiv);
		topButton.buttonDiv.slideToggle("normal");
	}

	// 添加关联关系
	topButton.fn.relation = function(button, param) {
		var medom = $('<div class="dialog_message_box"></div>');
		medom.load('/uflow/views/process/button/relation.jsp?processId=' + processId, {}, function() {
					medom.ultraDialog({
								id : "relationDialog",
								bgiframe : true,
								height : 540,
								width : 800,
								contentOverflow : true,
								zIndex : 999999,
								more : false,
								closeed : true,
								buttons : [[]],
								closeevent : function() {
									topButton.util.collapse(button);
									topButton.util.closeDialog("relationDialog");
									medom.remove();
									// 刷新列表
									$.post('/uflow/relation.do?method=toRelation', {
												processId : processId
											}, function(data) {
												if ($("#relationAnchor").size() > 0) {
													$("#relationAnchor").replaceWith(data);
												} else {
													$("#processLogAnchor").after(data);
												}

											}, 'html');
								}
							});
				});

	}

	// 抄送
	topButton.fn.addAttention = function(button, param , self) {

		topButton.buttonDiv = $('<div class="top_buttoncn" style="display:none"></div>');
		topButton.util.position(topButton.buttonDiv,self);
		var options = {
			inputName : "user",
			labelName : "人员选择",
			labelClass : "w80 tr",
			width : 500,
			radioStructure : false
		}
		var user = $("<div class='topformlist mb10 clearfix'></div>");
		user.formUser(options);
		topButton.buttonDiv.append(user);

		options = {
			inputName : "message",
			label : "备注",
			labelClass : "w80 tr vt",
			width : 500
		}
		var message = $("<div class='topformlist mb10 clearfix'></div>");
		message.uflow_textarea(options);
		topButton.buttonDiv.append(message);

		var $buttonDiv = $("<div>").addClass("tc").addClass("mt10");
		var okButton = $('<input type="button" class="blue_btn33 mr5" value="确定">');
		okButton.bind('click', function() {
					if (!user.formUser('getValue')) {
						UicDialog.Alert("请选择抄送人！");
						return false;
					}

					if (message.uflow_textarea('getValue').length > 200) {
						UicDialog.Alert("备注不能超过200字！");
						return false;
					}

					$.post("/uflow/process.do?method=addAttention", {
								users : user.formUser('getValue'),
								message : message.uflow_textarea('getValue'),
								processId : processId
							}, function() {
								UicDialog.Success("抄送成功！");
								topButton.util.collapse(button);
								divShow = null;// 我管理的工单用
							});
				});
		$buttonDiv.append(okButton);

		var cancelButton = $('<input type="button" class="grey_btn33" value="取消">');
		cancelButton.bind('click', function() {
					topButton.util.collapse(button);
					divShow = null;// 我管理的工单用
				});
		$buttonDiv.append(cancelButton);
		topButton.buttonDiv.append($buttonDiv);

		$("#top_button_left").parent().append(topButton.buttonDiv);
		topButton.buttonDiv.slideToggle("normal");

	}

	// 强制关单
	topButton.fn.closeProcess = function(button, param) {
		var domstr = '<div class="dialog_message_box"><div class="dialog_message_title"><h4>确认信息</h4></div><div class="dialog_message_content"><table class="dialog_message_table"><tr><td><s class="dialog_icon dialog_confirm"></s></td><td><p class="dialog_text">确认要强制关闭此工单吗？</p></td></tr></table></div></div>'

		$(domstr).ultraDialog({
					id : 'closeProcess',
					bgiframe : true,
					resizable : false,
					more : false,
					height : 200,
					width : 350,
					modal : true,
					contentOverflow : true,
					zIndex : 999999,
					overlay : {
						backgroundColor : '#000',
						opacity : 0.5
					},
					moreEvenTobig : function() {
					},
					moreEvenTosmall : function() {
					},
					closeevent : function() {
						topButton.util.collapse(button);
						topButton.util.closeDialog('closeProcess');
					},
					buttons : [['确定', function() {
										$.post("/uflow/process.do?method=closeProcess", {
													processId : processId
												}, function() {
													UicDialog.Success("关单成功！", function() {
																uflowUtil.closeWindow();
															});
												});
									}], ['取消', function() {
										topButton.util.collapse(button);
									}]]
				});

	}

	// 认领
	topButton.fn.claim = function(button) {
		var domstr = '<div class="dialog_message_box"><div class="dialog_message_title"><h4>确认信息</h4></div><div class="dialog_message_content"><table class="dialog_message_table"><tr><td><s class="dialog_icon dialog_confirm"></s></td><td><p class="dialog_text">确定认领工单？</p></td></tr></table></div></div>'

		$(domstr).ultraDialog({
					id : 'claim',
					bgiframe : true,
					resizable : false,
					more : false,
					height : 200,
					width : 350,
					modal : true,
					contentOverflow : true,
					zIndex : 999999,
					overlay : {
						backgroundColor : '#000',
						opacity : 0.5
					},
					moreEvenTobig : function() {
					},
					moreEvenTosmall : function() {
					},
					closeevent : function() {
						topButton.util.collapse(button);
						topButton.util.closeDialog('claim');
					},
					buttons : [['确定', function() {
										$.post("/uflow/process.do?method=claim", {
													processId : processId,
													taskId : taskId
												}, function() {
													window.open("/uflow/process.do?method=prepareHandle&taskId=" + taskId + "&processId=" + processId, "_self");
												});
									}], ['取消', function() {
										topButton.util.collapse(button);
									}]]
				});

	}

	// 催办
	topButton.fn.urge = function(button, param ,self) {

		topButton.buttonDiv = $('<div class="top_buttoncn" style="display:none"></div>');
		topButton.util.position(topButton.buttonDiv,self);
		var options = {
			name : "mode",
			label : "催办方式",
			labelClass : "w80 tr",
			width : 500,
			opt : [{
						id : 1,
						name : '短信'
					}, {
						id : 7,
						name : '邮件'
					}]
		}

		var mode = $("<div class='topformlist mb10 clearfix'></div>");
		mode.uflow_checkbox(options);
		topButton.buttonDiv.append(mode);

		options = {
			inputName : "message",
			label : "催办信息",
			labelClass : "w80 tr vt",
			width : 500
		}
		var message = $("<div class='topformlist mb10 clearfix'></div>");
		message.uflow_textarea(options);
		topButton.buttonDiv.append(message);

		var $buttonDiv = $("<div>").addClass("tc").addClass("mt10");
		var okButton = $('<input type="button" class="blue_btn33 mr5" value="确定">');
		okButton.bind('click', function() {
					if (!mode.uflow_checkbox('getValue')) {
						UicDialog.Alert("请选择催办方式！");
						return false;
					}

					if (!message.uflow_textarea('getValue')) {
						UicDialog.Alert("请输入催办信息！");
						return false;
					}
					if (message.uflow_textarea('getValue').length > 200) {
						UicDialog.Alert("催办信息不能超过200字！");
						return false;
					}
					$.post("/uflow/process.do?method=urge", {
								mode : mode.uflow_checkbox('getValue'),
								message : message.uflow_textarea('getValue'),
								processId : processId
							}, function(data) {
								if (data) {
									UicDialog.Alert(data);
									return;
								}
								UicDialog.Success("催办成功！");
								topButton.util.collapse(button);
								divShow = null;// 我管理的工单用
							}, 'json');

				});
		$buttonDiv.append(okButton);

		var cancelButton = $('<input type="button" class="grey_btn33" value="取消">');
		cancelButton.bind('click', function() {
					topButton.util.collapse(button);
					divShow = null;// 我管理的工单用
				});
		$buttonDiv.append(cancelButton);
		topButton.buttonDiv.append($buttonDiv);

		$("#top_button_left").parent().append(topButton.buttonDiv);
		topButton.buttonDiv.slideToggle("normal");

	}

	// 已阅
	topButton.fn.read = function() {
		$.post("/uflow/process.do?method=read", {
					processId : processId
				}, function() {
					UicDialog.Success("已阅工单成功！",function(){
						//点击已阅后刷新当前页面，保证不能重复阅读，并刷新日志等内容
						window.location.reload();
						window.opener.location.reload();
						//$(window.opener.document).find('.toread').click();
					});
				});
	}

	// 发起子工单
	topButton.fn.createSubflow = function(button, param) {
		window.open("/uflow/process.do?method=prepareCreateSubProcess&flowName=" + param.flowName + "&flowType=" + param.flowType + "&processId=" + processId
				+ "&taskId=" + taskId);
	}

	// 打印
	topButton.fn.print = function() {
		window.open("/uflow/print.jsp?processInfoId=" + processId + "&taskId=" + taskId, "print",
				"location=yes,menubar=yes,resizable=yes,scrollbars=yes,status=yes,titlebar=yes");
	}

	// 流程图
	topButton.fn.graph = function() {
		if (pageType == 0 || pageType == 3) {// 新建或者草稿页面
			window.open("/uflow/Designer/FlowView.html?pdName=" + flowName);
		} else {
			window.open("/uflow/Designer/FlowShowView.html?piId=" + processId + "&piName=" + title);
		}
	}

	// 导出word
	topButton.fn.exportWord = function() {
		window.open("/uflow/exportFormController.do?method=exportWord&processId=" + processId + "&taskId=" + taskId);
	}

	/**
	 * 判断是否有线路选择
	 */
	topButton.util.hasTransition = function() {
		return $("#transitionContainer").find("[name=transition]").size() > 0;
	}

	topButton.util.closeDialog = function(id) {
		dialogRemove("dialog-" + id);
	}

	/**
	 * 收起浮动的div
	 */
	topButton.util.collapse = function(button) {
		if (!topButton.buttonDiv) {
			$("#tb_" + button.id).removeClass("sel");
			return;
		}
		topButton.buttonDiv.slideToggle("normal", function() {
					topButton.buttonDiv.remove();
					topButton.buttonDiv = null;
					$("#tb_" + button.id).removeClass("sel");
				});
		if (topButton.util.hasTransition()) {
			$("#transitionContainer").slideToggle("normal");
		}
	}
	
	/**
	 * 定位浮出层
	 */
	topButton.util.position = function(buttonDiv,button) {
		var left = $(button).offset().left-$(".center").offset().left;
		if(left < 480){
			buttonDiv.css("left",left);
		}else{
			buttonDiv.css("right",960 - left - $(button).outerWidth(false));
		}
		
	}

	module.exports = topButton;
});
