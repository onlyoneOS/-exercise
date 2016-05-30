/**
 * Uflow表单组件
 */
define(function(require,exports,module) {
	var $ = require("jquery");
	require("uic/dialog");
	require("uic/message_dialog");
	require("json2");
	(function($) {
		// 表格行
		$.fn.uflow_grid = function(name, grid, field, gridType) {
			return new $.grid(name, grid, field ,gridType, this);
		}

		// 表格行
		$.grid = function() {
			if (typeof arguments[0] == 'object') {
				var self = this;
				var row = arguments[0];
				var rowCount = row.defaultAmount;
				var name = row.name;
				gridFieldStore.put(row.name, row.fieldList);
				var field = row.fieldList; // 列名称数组
				var dataList = row.dataList; // 数据数组
				//如果dataList不为空，或者为可写或必填 表格行div显示
				if(this.validate(row.fieldList)||dataList.length!=0){
					var $labelDiv = $("<div class='form_table clearfix'></div>");
					$labelDiv.css('position','relative').css('z-index',$(arguments[4]).css('z-index'));
					var $label = $("<table  width='100%' cellspacing='0' border='0' id=" + name + "/>");
					$thead = $("<thead>");
					$tr=$("<tr>");
					// 判断添加和删除行是否显示
					if (this.validate(row.fieldList)) {
						var $optTr = $('<tr/>');
						var $optTd = $('<td colspan=4 class="tdoperagroup">');
						
						$addRowButton = $('<span class="add"></span>');
						$adda = $('<a>').attr("href","javascript:void(0)").bind('click',function(){
							self.addRow(name)
						});
						$adda.append("添加行");
						$addRowButton.append($adda);
						$optTd.append($addRowButton);
						
						$delRowButton = $('<span class="del"></span>');
						$dela = $('<a>').attr("href","javascript:void(0)").bind('click',function(){
							self.delRow(name)
						});
						$dela.append("删除行");
						$delRowButton.append($dela);
						$optTd.append($delRowButton);
						$optTr.append($optTd);
						$thead.append($optTr);
					}
	
					
					//var isCheck=false;//是否全选
					if(!this.isShowTitle(dataList,field)){
						//复选框是否显示
						if(this.validate(row.fieldList)){
							
							$tr.append("<th  style='width:30px;'><input type='checkbox' name='all'></th>");
							$("input[type=checkbox][name='all']").live('click',function(){
								var isCheck=$("input[type=checkbox][name='all']").prop('checked');
								if(isCheck){
									$("input[type=checkbox][name=" + name + "]").each(function() {
										this.checked=true;
									})
									//isCheck=false;
								}else{
									$("input[type=checkbox][name=" + name + "]").each(function() {
										this.checked=false;
									})
									//isCheck=true;
								}
									
							});
						
						}
							//$thead.append("<th  style='width:0px;'></th>");
							for (var i = 0; i < field.length; i++) {
								var clumnName = field[i].label;
								$tr.append("<th>" + clumnName + "</th>");
							}
						$thead.append($tr);
					}
					$label.append($thead);
					if (dataList.length > 0) { // have data
						// 生成表格行
						for (var m = 0; m < dataList.length; m++) {
							if(this.validate(row.fieldList)){
								$tr = $("<tr><td><input type='checkbox' name='" + name + "'></td>");
							}else{
								//$tr = $("<tr><td></td>");
								$tr=$("<tr>");
							}
							for (var k = 0; k < field.length; k++) {
								// $td=$("<td>");
								var fields = field[k];
								var column = fields.name; // 字段名称
								fields.value = eval("dataList[" + m + "]." + column); // 赋值
								$tr.append(this.selectField(fields, field.length,true));
							}
							$label.append($tr);
	
						}
	
					} else {
						//为可写状态并且初始行为0时，添加一个默认行
						if(this.validate(row.fieldList)&&rowCount==0){
							rowCount=1;
						}
						for (var m = 0; m < rowCount; m++) { // create row
							$tr = $("<tr><td><input type='checkbox' name='" + name + "' ></td>");
							for (var k = 0; k < field.length; k++) {
								$tr.append(this.selectField(field[k], field.length,true));
							}
							$label.append($tr);
	
						}
	
					}
	
					$labelDiv.append($label);
					return $labelDiv;
				}
			} else if (typeof arguments[0] == 'string') {
				// getValue
				if (arguments[0] == 'getValue') {
					// 获取数据
					var columns = arguments[1]; // 列name
					var rowName = arguments[2];
					var columnsType=arguments[3];
					
					// tr
					var trs = arguments[4];
					var array = [];
					//有数据行
					if($(trs).length>0){
						//td的个数等于列的个数（即表示没有复选框）
						if($(trs)[0].childNodes.length==columns.length){
							// 循环tr
							$(trs).each(function() {
										var t = '{';
										$('td', this).each(function(i) {
//											if($(this).attr('name')==rowName){
//												return;
//											}
												var value;
													// 判断td里面是否有input元素，如果有，取input的value,否则直接去td的内容
											if ($(this).has('input').length > 0) {
//												
												if(columnsType[i]=='userchoice'){
													value=$('.uicAreali').find('div').text();
												}else if(columnsType[i]=='dropdown'){
													value=$('.uicSelectData .licheck').attr('infinityname');
												}else{
													value = $(this).find('input').val();
												}
														
												} else {
														value = $(this).text();
												}
													t += columns[i] + '=' + value + ',';
												})
										var st = t.substring(0, t.length - 1) + '}';
										array.push(st);
									})
						}else{//有复选框
							// 循环tr
						$(trs).each(function() {
									var t = '{';
									$('td:not(:first)', this).each(function(i) {
												var value;
												
												// 判断td里面是否有input元素，如果有，取input的value,否则直接去td的内容
											if ($(this).has('input').length > 0) {
													id=$(this).attr('id');
	//												if(columnsType[i]=='string'){
	//													value=$('#'+id).uflow_textbox('getValue');
	//												}else if(columnsType[i]=='number'){
	//													value=$('#'+id).uflow_number('getValue');
	//												}else if(columnsType[i]=='textarea'){
	//													value=$('#'+id).uflow_textarea('getValue');
	//												}else if(columnsType[i]=='datetime'){
	//													value=$('#'+id).formDateTime('getValue');
	//												}else if(columnsType[i]=='dropdown'){
	//													value=$('#'+id).formSelect('getValue');		
	//												}else if(columnsType[i]=='multiCombo'){
	//													value=$('#'+id).formSelect('getValue');	
	//												}else if(columnsType[i]=='radio'){
	//													value=$('#'+id).uflow_radio('getValue');
	//												}else if(columnsType[i]=='checkbox'){
	//													value=$('#'+id).uflow_checkbox('getValue');
	//												}else if(columnsType[i]=='pagechoice'){
	//													value=$('#'+id).formTree("getValue");
	//												}else if(columnsType[i]=='userchoice'){
	//													value=$('#'+id).formUser("getValue");
	//												}
	//													if(columnsType[i]=='userchoice'){
	//															var id=$(this).attr('id');
	//															value=$('#'+id).getValue();
	//													}else{
	//														value = $(this).find('input').val();
	//													}
														if(columnsType[i]=='userchoice'){
														value=$('#'+id+ ' .uicAreali').find('div').text();
													}else if(columnsType[i]=='dropdown'){
															value=$('#'+id+ ' .uicSelectData .licheck').attr('infinityname');
													}else if(columnsType[i]=='textarea'){
														value=$(this).find('textarea').text();
													}else{
														value = $(this).find('input').val();
													}
												} else  if(columnsType[i]=='textarea'){
													value=$(this).find('textarea').val();
												}else{
													value = $(this).text();
												}
												t += columns[i] + '=' + value + ',';
											})
									var st = t.substring(0, t.length - 1) + '}';
									array.push(st);
								})
						}
					}
					
					return array;

				}

			}
		}
		var k = 0;// 避免field的name重复，否则提交时验证会出问题
		$.grid.prototype = {
			// 判断添加删除行按钮是否显示
			validate : function(field) {
				var fields = field;
				for (var i = 0; i < fields.length; i++) {
					if (fields[i].boolWrite == false) {
						return false;
					}
				}
				return true;
			},
			//标题是否显示（只读并且没数据情况下隐藏）
			isShowTitle:function(dataList,field){
				var fields=field;
				if(dataList.length==0){
					for (var i = 0; i < fields.length; i++) {
						if (fields[i].boolWrite == false) {
							return true;
						}
					}
				}
				return false;
				
			},
			// 添加行
			addRow : function(name) {
				var field = gridFieldStore.get(name);
				$tr = $("<tr><td><input type='checkbox' name='" + name + "'/></td>");
				var check=$("input[type=checkbox][name='all']").prop('checked');
				if(check){
					$tr.find('input').attr('checked',true);
				}
				for (var k = 0; k < field.length; k++) {
					$tr.append(this.selectField(field[k], field.length,false));
				}
				$("#" + name).append($tr);
			},
			//判断是否有选中的
			isChecked:function(name){
				var status='false'
				$("input[type=checkbox][name=" + name + "]").each(function() {
							if ($(this).is(':checked')) {
								status='check'
								return ;
							}
						})
						return status;
			},
			// 删除行
			delRow : function(name) {
				if(this.isChecked(name)=='check'){
					UicDialog.Confirm('确定删除选中行？', function() {
						$("input[type=checkbox][name=" + name + "]").each(function() {
							if ($(this).is(':checked')) {
								$(this).parent().parent().remove();
							}
									
						})
								//表头的checkbox修改成不选中
					$("input[type=checkbox][name='all']").prop('checked',false);
					},function(){
						dialogRemove("dialog-only");
					})
				}
			},
			selectField : function(field, num,showValue) {
				k++;
				var $field = $("<td>").attr("id", "field_" + field.name+k);
				var field_width = 924 / num;
				if (field.width) {
					field_width = field.width;
				}
				$field.css("width", field_width);
				switch (field.type) {

					// 普通文本框
					case "string" :
//						require("");
						var options = {
							name : field.name + "_" + k,
							label : field.label,
							labelClass : '',
							inputClass : '',
							width : field_width,
							showLabel : false
						}
						if(showValue==true){
							if (field.value) {
								options.value = field.value;
							}
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
						var options = {
							name : field.name + "_" + k,
							label : field.label,
							labelClass : '',
							inputClass : '',
							width : field_width,
							showLabel : false
						}
						if(showValue==true){
							if (field.value) {
								options.value = field.value;
							}
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
						var options = {
							name : field.name + "_" + k,
							label : field.label,
							width : field_width,
							showLabel : false
						}
						if(showValue==true){
							if (field.value) {
								options.value = field.value;
							}
						}	
						if (field.prompt) {
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
						var options = {
							inputName : field.name + "_" + k,
							className : "uic_form_date",
							labelName : field.label,
							width : field_width,
							showLabel:false
						};
						if(showValue==true){
							if (field.value) {
								options.inputValue = field.value;
							}
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

						var options = {
							inputName : field.name + "_" + k,
							labelName : field.label,
							width : field_width,
							showLabel : false
						}
						
						if (field.optionalDatas) {
							//给下拉值赋check=true属性
							for(var i =0;i<field.optionalDatas.length;i++){
								field.optionalDatas[i].check=false;
								if(field.optionalDatas[i].name==field.value){
									field.optionalDatas[i].check=true;
								}
							}
							//避免添加行时把上一行的选中值赋到添加的新行中
							if(showValue==false){
								for(var i =0;i<field.optionalDatas.length;i++){
									if(field.optionalDatas[i].name==field.value){
										field.optionalDatas[i].check=false;
									}
							}
							}	
							options.optionsData = field.optionalDatas;
						}
						if(showValue==true){
							if (field.value) {
								options.inputValue = field.value;
							}
						}
						if (field.boolWrite == false) {
							options.writeType = 'read';
						}
						if (field.boolRequire == true) {
							options.writeType = 'required';
						}
						if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
							options.inputChange = eval(field.uflowFieldEvent.action);
						}
						$field.formSelect(options);
						break;
					// 复选下拉框
					case "multiCombo" :

						var options = {
							inputName : field.name + "_" + k,
							labelName : field.label,
							width : field_width,
							checkbox : true,
							showLabel : false
						};
						if (field.optionalDatas) {
							options.optionsData = field.optionalDatas;
						}
						if(showValue==true){
							if (field.displayValue) {
								options.inputValue = field.displayValue;
							}
						}
						if (field.boolWrite == false) {
							options.writeType = 'read';
						}
						if (field.boolRequire == true) {
							options.writeType = 'required';
						}
						if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
							options.inputChange = eval(field.uflowFieldEvent.action);
						}
						$field.formSelect(options);

						break;
					// 单选框
					case "radio" :
						var options = {
							name : field.name + "_" + k,
							label : field.label,
							width : field_width,
							optionalData : field.optionalData,
							showLabel : false
						};
						if(showValue==true){
							if (field.value) {
								options.value = field.value;
							}
						}	
						if (field.boolWrite == false) {
							options.boolWrite = field.boolWrite;
						}
						if (field.boolRequire == true) {
							options.boolRequire = field.boolRequire;
						}
						if (field.uflowFieldEvent && field.uflowFieldEvent.action) {
							options.inputChange = eval(field.uflowFieldEvent.action);
						}
						$field.uflow_radio(options);

						break;
					// 复选框
					case "checkbox" :
						var options = {
							name : field.name + "_" + k,
							label : field.label,
							width : field_width,
							opt : field.options,
							showLabel : false
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
						if (field.columns) {
							options.columns = field.columns;
						}
						$field.uflow_checkbox(options);
						break;
					// 下拉树
					case "pagechoice" :

						var options = {
							showLabel : false,
							inputName : field.name + "_" + k,
							labelName : field.label,
							Checkbox : field.checkable,
							// onlyLeafCheck : true,
							animate : true,
							searchTree : true,
							tree_url : '/uflow/formTree.do?method=getTree',// 顶层
							asyncUrl : '/uflow/formTree.do?method=getTree',// 异步
							search_url : '/uflow/formTree.do?method=searchTree',// 搜索
							find_url : '/uflow/formTree.do?method=findTree',
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
							// options.optionsData = field.optionalDatas;
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
							options.inputChange = eval(field.uflowFieldEvent.action);
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
						break;// 选人组件
						case "userchoice" :

							var options = {
								inputName : field.name+ "_" + k,
								labelName : field.label,
								width : field_width,
								radioStructure :true,
								showLabel:false
							}
							if(showValue==true){
								if (field.value) {
									options.resIds = field.value;
									options.inputValue = field.value;
								}
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
					case "fileField" :
						$field.fileField(field);
						break;
				}
				return $field;
			}
		}

	})($);
});
