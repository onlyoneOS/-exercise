define(function(require, exports, module) {
			var $ = require("jquery");
			var Map = require("map");
			var uflowForm = require("uflowForm");

			require("json2");
			require("uflow_textbox");
			require("uflow_number");
			require("uflow_radio");
			require("uflow_checkbox");
			require("uflow_textarea");
			require("uflow_trigger_area");
			require("uflow_richText");
			require("uflow_grid");
			require("uflow_multiplexSection");
			require("uflow_fileField");
			require("uflow_url");

			require("uic/formDateTime");
			require("uic/formSelect");
			require("uic/formTree");
			require("uic/formUser");

			// 保存表单字段名的数组，用于快捷取表单所有字段值,每次重新构造表单都会清空
			fieldNameStore = new Array();
			fieldTypeStore = new Map();
			gridStore = new Map();//
			gridTypeStore=new Map();//表格行列类型
			gridFieldStore = new Map();
			richTextStore = new Map();
			// 表单常量
			var FIELD_AUTHORITY = {
				HIDDEN : "hidden",
				READONLY : "read",
				WRITE : "write",
				REQUIRED : "required"
			};
			/**
			 * 表单工厂
			 * 
			 * @author guitar
			 */
			var formFactory = {
				/**
				 * 创建流转路线块
				 * 
				 * @param {}
				 *            trans 可选路线
				 */
				createTransition : function(trans) {
					var $transDiv = $("<div>").attr("id", "uflowTrans").attr("class", "w960 bc");
					if (trans.length > 1) {// 有多条路线的情况下

						var $transLabel = $("<b>").append("流转控制：");
						$transDiv.append($transLabel);

						var flag = 0;
						$.each(trans, function() {
									var $tranSpan = $("<span>");
									var $tranRadio = $("<input>").attr("type", "radio").attr("name", "transition").attr("value", this.name);
									$tranSpan.append($tranRadio).append(this.name);
									$transDiv.append($tranSpan);
									var fieldControls = [];
									if(this.fieldControl){
										fieldControls = this.fieldControl.split(",");
									}
									
									if (flag == 0) {// 将第一条线设为默认路线
										$tranRadio.attr("checked", "checked");
										for (var i = 0; i < fieldControls.length; i++) {
											var fieldControl = fieldControls[i].split("|");
											uflowForm.setPerm(fieldControl[0], fieldControl[1]);
										}
										flag = 1;
									}
									$tranRadio.change(function() {// 给元素绑定change事件
												for (var i = 0; i < fieldControls.length; i++) {
													var fieldControl = fieldControls[i].split("|");
													uflowForm.setPerm(fieldControl[0], fieldControl[1]);
												}
											});
								});
						// 有两条路线时要把提交按钮加在路线后面
						var $submitButton = $('<span class="submit01 cp"> &nbsp; </span>');
						$submitButton.bind('click', {}, _submitProcess);
						$transDiv.append($submitButton);
					} else {// 只有一条路线，只执行路线上的字段控制，不生成fieldset
						if (trans[0].fieldControl) {
							var fieldControls = trans[0].fieldControl.split(",");
							for (var i = 0; i < fieldControls.length; i++) {
								var fieldControl = fieldControls[i].split("|");
								uflowForm.setPerm(fieldControl[0], fieldControl[1]);
							}
						}
					}
					return $transDiv;
				},
				createForm : function(form, container) {
					//初始化rowNum
					formFactory.rowNum = 0;
					fieldNameStore = new Array();
					var $form = $(container);
					$.each(form.sheetList, function() {
								$form.append(formFactory.createSheet(this));
							});
					// return $form;

				},
				createSheet : function(sheet) {
					
					//根据SHEET块的名称来判断复用块是否生成过sheet块，如果生成过，就把数据与表单放到一个sheet中
					var sheetDivName = 'SheetDiv_'+sheet.templateName;
					var $sheet = $("#"+sheetDivName);
					if($sheet.length<=0){
						$sheet = $("<div>").attr("class", "handprocess_order").attr('id',sheetDivName);
						var $sheetLabel = $("<h3>");
						$sheetLabel.append(sheet.templateName);
						$sheet.append($sheetLabel);					
						// 添加锚点定位元素
						var anchorName = 'sheetAnchor_' + sheet.templateName;
						var $sheetAnchor = $("<div>").attr("id", anchorName);
						$sheet.append($sheetAnchor);					
					}
					
					if (sheet.editable) {
						$sheet.addClass("bg_orag");
					}
					
					if (sheet.sheetModels) {
						$sheet.append($sheet.multiplexSection(sheet));
						return $sheet;
					} else if (sheet.rowList) {
						$.each(sheet.rowList, function() {
									$sheet.append(formFactory.createRow(this));
								});
						return $sheet;
					}
				},
				rowNum : 0,
				createRow : function(row) {
					var $row = $("<ul>").attr("class", "clearfix");
					//为每一行设置z-index样式，保证在IE7下上面的浮出层能高于下面的行
					$row.css("position","relative").css("z-index",300-formFactory.rowNum);
					formFactory.rowNum++;
					var fieldNum = row.fieldList.length;
					// 表格行
					if (row.boolGrid == true) {
						var grid = new Array();
						var gridType=new Array();
						var field = row.fieldList;// 列数组
						for (var i = 0; i < field.length; i++) {
							grid.push(field[i].name);
							gridType.push(field[i].type);
						}
						fieldTypeStore.put(row.name, 'uflow_grid');
						fieldNameStore.push(row.name);
						gridStore.put(row.name, grid);// 表格行
						gridTypeStore.put(row.name,gridType)//类型
						return $row.uflow_grid(row);

					} else {
						$.each(row.fieldList, function() {
									$row.append(formFactory.createField(this, fieldNum));
								});
					}
					return $row;
				},
				createField : function(field, num) {

					if (field.boolWrite) {
						fieldNameStore.push(field.name);// 把字段名保存到fieldNameStore中
					}
					var fieldName = field.name.replaceAll('\@', '').replaceAll('&', '');
					var $field = $("<li>").attr("id", "field_" + fieldName);
					$field.addClass("li_form");
					var field_width = 924 / num;
					if (field.width) {
						field_width = field.width;
					}
					$field.css("width", field_width);
					switch (field.type) {
						// 普通文本框
						case "string" :
							fieldTypeStore.put(field.name, 'uflow_textbox');
							var options = {
								name : field.name,
								label : field.label,
								width : field_width
							}
							if (field.value) {
								options.value = field.value;
							} else if (field.prompt) {
								options.prompt = field.prompt;
							}
							if (field.boolWrite == false) {
								options.boolWrite = field.boolWrite;
							}
							if (field.boolRequire == true) {
								options.boolRequire = field.boolRequire;
							}
							$field.uflow_textbox(options);
							break;
						// 数字框
						case "number" :
							fieldTypeStore.put(field.name, 'uflow_number');
							var options = {
								name : field.name,
								label : field.label,
								labelClass : '',
								inputClass : '',
								width : field_width
							}
							if (field.value) {
								options.value = field.value;
							} else if (field.prompt) {
								options.prompt = field.prompt;
							}
							if (field.boolWrite == false) {
								options.boolWrite = false;
							}
							if (field.boolRequire == true) {
								options.boolRequire = true;
							}
							$field.uflow_number(options);
							break;
						// 文本域
						case "textarea" :
							fieldTypeStore.put(field.name, 'uflow_textarea');
							var options = {
								name : field.name,
								label : field.label,
								labelClass : 'vt',
								width : field_width
							}

							if (field.value) {
								options.value = field.value;
							} else if (field.prompt) {
								options.prompt = field.prompt;
							}
							if (field.height) {
								options.height = field.height;
							}
							if (field.boolWrite == false) {
								options.boolWrite = false;
							}
							if (field.boolRequire == true) {
								options.boolRequire = true;
							}

							$field.uflow_textarea(options);
							break;
						// 日期选择
						case "datetime" :
							fieldTypeStore.put(field.name, 'formDateTime');
							var options = {
								inputName : field.name,
								className : "uic_form_date",
								labelName : field.label,
								width : field_width							
								};

							if (field.value) {
								options.inputValue = field.value;
							}

							if (field.boolWrite == false) {
								options.writeType = 'read';
							}
							if (field.boolRequire == true) {
								options.writeType = 'required';
							}

							$field.formDateTime(options);
							break;
						// 单选下拉框
						case "dropdown" :
							fieldTypeStore.put(field.name, 'formSelect');

							var options = {
								inputName : field.name,
								labelName : field.label,
								width : field_width
							}
							if (field.optionalDatas) {
								options.optionsData = field.optionalDatas;
							}
							if (field.displayValue) {
								options.inputValue = field.displayValue;
							}
							if (field.boolWrite == false) {
								options.writeType = 'read';
							}
							if (field.boolRequire == true) {
								options.writeType = 'required';
							}
							if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
								options.inputChange = field.uflowFieldEvent.action;
							}
							$field.formSelect(options);
							break;
						// 复选下拉框
						case "multiCombo" :
							fieldTypeStore.put(field.name, 'formSelect');

							var options = {
								inputName : field.name,
								labelName : field.label,
								width : field_width,
								checkbox : true
							};
							if (field.optionalDatas) {
								options.optionsData = field.optionalDatas;
							}
							if (field.displayValue) {
								options.inputValue = field.displayValue;
							}
							if (field.boolWrite == false) {
								options.writeType = 'read';
							}
							if (field.boolRequire == true) {
								options.writeType = 'required';
							}
							if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
								options.inputChange = field.uflowFieldEvent.action;
							}
							$field.formSelect(options);

							break;
						// 单选框
						case "radio" :
							fieldTypeStore.put(field.name, 'uflow_radio');
							var options = {
								name : field.name,
								label : field.label,
								width : field_width,
								optionalData : field.optionalData
							};
							if (field.value) {
								options.value = field.value;
							}
							if (field.boolWrite == false) {
								options.boolWrite = field.boolWrite;
							}
							if (field.boolRequire == true) {
								options.boolRequire = field.boolRequire;
							}
							if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
								options.inputChange = field.uflowFieldEvent.action;
							}

							$field.uflow_radio(options);
							break;
						// 复选框
						case "checkbox" :
							fieldTypeStore.put(field.name, 'uflow_checkbox');
							var options = {
								name : field.name,
								label : field.label,
								labelClass : 'vt',
								width : field_width,
								opt : field.options
							}

							if (field.value) {
								options.value = field.value;
							}
							if (field.displayValue) {
								options.displayValue = field.displayValue;
							}
							if (field.boolWrite == false) {
								options.boolWrite = field.boolWrite;
							}
							if (field.boolRequire == true) {
								options.boolRequire = field.boolRequire;
							}
							if (field.columns) {
								options.columns = field.columns;
							}
							$field.uflow_checkbox(options);
							break;
						// 下拉树
						case "pagechoice" :
							fieldTypeStore.put(field.name, 'formTree');

							var options = {
								inputName : field.name,
								labelName : field.label,
								Checkbox : field.checkable,
								// onlyLeafCheck : true,
								animate : true,
								searchTree : true,
								tree_url : '/uflow/formTree.do?method=getTree',// 顶层
								asyncUrl : '/uflow/formTree.do?method=getTree',// 异步
								search_url : '/uflow/formTree.do?method=searchTree',// 搜索
								find_url : '/uflow/formTree.do?method=findTree',// 精确定位
								url : '',
								asyncParam : ["id"],
								addparams : [{
											name : "domainCode",
											value : field.dataDict
										}],
								width : field_width,
								async : true
							}
							if (field.value) {
								options.resIds = field.value.split(",");
								options.inputValue = field.displayValue;
							}
							if (field.boolWrite == false) {
								options.writeType = 'read';
							}
							if (field.boolRequire == true) {
								options.writeType = 'required';
							}
							if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
								options.inputChange = field.uflowFieldEvent.action;
							}

							if (field.dataDict.indexOf("class:") == 0) {// 自定义树，把表单传过去
								options.beforeExp = function() {
									options.addparams[1] = {
										name : "formData",
										value : JSON.stringify(uflowForm.getAllData())
									};
									options.addparams[2] = {
										name : "processId",
										value : processId
									};
									if ("undefined" != typeof taskId && taskId) {
										options.addparams[3] = {
											name : "formData",
											value : taskId
										};
									}
								}
							}
							$field.formTree(options);
							break;
						// 选人组件
						case "userchoice" :
							fieldTypeStore.put(field.name, 'formUser');

							var options = {
								inputName : field.name,
								labelName : field.label,
								width : field_width,
								radioStructure : field.single
							}

							if (field.value) {
								options.resIds = field.value;
								options.inputValue = field.displayValue;
							}
							if (field.roleCode) {
								options.addparams = [{
											name : "code",
											value : field.roleCode
										}];
							}
							if (field.boolWrite == false) {
								options.writeType = 'read';
							}
							if (field.boolRequire == true) {
								options.writeType = 'required';
							}
							if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
								 options.submitFun = eval(field.uflowFieldEvent.action);
							}

							$field.formUser(options);
							break;
						// 提示文本域
						case "qTextArea" :
							fieldTypeStore.put(field.name, 'trigger_area');
							var options = {
								name : field.name,
								label : field.label,
								labelClass : 'vt',
								width : field_width
							}

							if (field.value) {
								options.value = field.value;
							} else if (field.prompt) {
								options.prompt = field.prompt;
							}
							if (field.height) {
								options.height = field.height;
							}
							if (field.boolWrite == false) {
								options.boolWrite = false;
							}
							if (field.boolRequire == true) {
								options.boolRequire = true;
							}

							$field.trigger_area(options);
							break;
						// 附件
						case "fileField" :
							fieldTypeStore.put(field.name, 'fileField');
							$field.fileField(field);
							break;
						// 富文本
						case "richText" :
							fieldTypeStore.put(field.name, 'uflow_richText');
							require.async("ueditor", function(ueditor) {
										var toolbars = [
												['undo', 'redo', 'fontfamily', 'fontsize', 'bold', 'italic', 'underline', 
														'strikethrough', 'forecolor', 'backcolor', 'link', 'unlink','|',
														'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify',
														'lineheight', '|', 'insertunorderedlist', 'insertorderedlist', '|',
														 'searchreplace', 'insertimage', 'snapscreen']];
										var config = {
											toolbars : field.boolWrite ? toolbars : [],
											readonly : !field.boolWrite
										}

										var editor = new ueditor.ui.Editor(config);
										richTextStore.put(field.name, editor);
										var options = {
											name : field.name,
											label : field.label,
											labelClass : 'vt',
											width : field_width
										}
										if (field.value) {
											options.value = field.value;
										}
										if (field.boolWrite == false) {
											options.boolWrite = field.boolWrite;
										}
										if (field.boolRequire == true) {
											options.boolRequire = field.boolRequire;
										}
										$field.uflow_richText(options);
									});

							break;
						case 'urlControls' :
							fieldTypeStore.put(field.name, 'uflow_url');
							var options = {
								name : field.name,
								label : field.label,
								height : field.height,
								width : field_width,
								url : field.url
							}
							$field.uflow_url(options);
					}
					return $field;
				}
			};

			// 批量替换字符
			String.prototype.replaceAll = function(s1, s2) {
				return this.replace(new RegExp(s1, "gm"), s2);
			}

			testEvent = function() {

			}

			test = function() {
				uflowForm.setFieldValue('url', 'http://www.qq.com');
				// uflowForm.setPerm('test11', FIELD_AUTHORITY.REQUIRED);
			}
			user_test = function() {
				alert(uflowForm.getFieldValue('userName'));
			}

			exports.createForm = formFactory.createForm;
			exports.createTransition = formFactory.createTransition;
			exports.createRow = formFactory.createRow;

		})