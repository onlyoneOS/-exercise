define(function(require, exports, module) {
			var $ = require("jquery");
			require("uic/table");
			var Map = require("map");
			relation = function() {

				relation.selectedMap = new Map();
				relation.creator = "";

				$.post("/uflow/relation.do?method=findProcessRelations", {
							processId : processId,
							relationType : 3
						}, function(data) {
							relation.creator = data.creator;

							if (data.rows) {
								for (var i = 0; i < data.rows.length; i++) {
									relation.selectedMap.put(data.rows[i].processId, data.rows[i].creator);
								}
							}
							relation.init();
						}, "json");

			}

			relation.init = function() {
				$("#relation_bottom_left").uicTable({
							//title : "查询结果",
							dataType : "json",
							id : 'PROCESS_ID',
							url : "/uflow/relation.do?method=queryProcess",
							showcheckbox : false,
							// striped : true,
							usePaging : true,
							addparams : [{
										name : '&ID_',
										value : processId
									}],
							pageNo : 1,
							pageSize : 7,
							columns : [{
										code : 'KEY_DEFAULT',
										name : '流程编号',
										width : '100',
										process : relation.view
									}, {
										code : 'TITLE_DEFAULT',
										name : '标题',
										width : '80'
									}, {
										code : 'PD_NAME_DEFAULT',
										name : '流程名称',
										width : '80'
									}, {
										code : 'CREATE_DEFAULT',
										name : '开始时间',
										width : '80'
									}, {
										code : 'END_DEFAULT',
										name : '结束时间',
										width : '80'
									}, {
										code : 'PROCESS_ID',
										name : '操作',
										width : '40',
										process : relation.process
									}]
						});

				// 查询条件
				var options = {
					name : "title",
					label : "工单标题",
					width : 400
				}
				$("#searchCon_title").uflow_textbox(options);
				options = {
					name : "key",
					label : "工单编号",
					width : 400
				}
				$("#searchCon_key").uflow_textbox(options);
				options = {
					inputName : "creator",
					labelName : "发起人",
					width : 400,
					radioStructure : true
				}
				$("#searchCon_creator").formUser(options);

				// 流程名
				$.ajax({
							url : "/uflow/flow.do?method=listAll",
							dataType : "json",
							success : function(data) {
								$("#searchCon_flowName").formSelect({
											inputName : "flowName",
											className : "uic_form_select",
											showLabel : true,
											labelName : "流程名",
											labelClass : '',
											inputClass : 'InpSelect',
											width : 400,
											writeType : 'show',
											valueDef : '',
											optionsData : data
										});
							}
						});

				// 时间组件
				options = {
					inputName : '',
					className : "uic_form_date",
					labelName : "发起时间",
					labelClass : '',
					inputClass : 'InpCalender',
					width : 400,
					writeType : 'show',
					selectChoose : true,
					numberOfMonths : 3,
					showTimeSlot : true
				};
				$("#searchCon_createTime").formDateTime(options);

			}

			/**
			 * 根据条件查询流程
			 */
			relation.queryProcess = function() {

				var addparams = [{
							name : '&KEY_',
							value : $("#searchCon_key").uflow_textbox('getValue')
						}, {
							name : '&TITLE_',
							value : $("#searchCon_title").uflow_textbox('getValue')
						}, {
							name : '&CREATOR_',
							value : $("#searchCon_creator").formUser('getValue')
						}, {
							name : 'createTime',
							value : $("#searchCon_createTime").formDateTime('getValue')
						}, {
							name : '&PD_NAME_',
							value : $("#searchCon_flowName").formSelect('getValue')[0]
						}, {
							name : '&ID_',
							value : processId
						}];

				$("#relation_bottom_left").tableOptions({
							addparams : addparams
						}).tableReload();
			}

			/**
			 * 添加关联关系
			 */
			relation.addProcessDependence = function(trid) {

				$.post("/uflow/relation.do?method=addProcessDependence", {
							dependProcessId : trid,
							primaryProcessId : processId
						}, function() {
						});
			}

			/**
			 * 删除关联关系
			 */
			relation.removeProcessDependence = function(trid) {

				$.post("/uflow/relation.do?method=removeProcessDependence", {
							dependProcessId : trid,
							primaryProcessId : processId
						}, function() {
						});
			}

			/**
			 * 根据id删除关联关系
			 */
			relation.removeById = function(id) {
				$.post("/uflow/relation.do?method=removeById", {
							id : id
						}, function() {
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
						});
			}

			/**
			 * 添加或删除
			 * 
			 * @param {}
			 *            divInner
			 * @param {}
			 *            trid
			 * @param {}
			 *            trContent
			 * @return {}
			 */
			relation.process = function(divInner, trid, trContent) {
				if (relation.selectedMap.containsKey(trid)) {
					if (relation.selectedMap.get(trid) == relation.creator) {
						return '<a class="operation" href="javascript:void(0)" onclick="relation.change(this,' + trid + ')">删除</a>';
					}
					return '已添加';
				}
				return '<a class="operation" href="javascript:void(0)" onclick="relation.change(this,' + trid + ')">添加</a>';
			}

			relation.change = function(aa, trid) {
				if (aa.innerHTML == "添加") {
					relation.selectedMap.put(trid, relation.creator);
					aa.innerHTML = "删除";
					relation.addProcessDependence(trid);
				} else {
					relation.selectedMap.remove(trid);
					aa.innerHTML = "添加";
					relation.removeProcessDependence(trid);

				}

			}

			relation.view = function(divInner, trid, trContent) {
				return '<a href="/uflow/process.do?method=view&processId=' + trid + '" target="_blank">' + trContent.KEY_DEFAULT + '</a>';
			}

			exports.init = relation;

		});