define(function(require, exports, module) {
	var $ = require("jquery");
	var dataTable$ = require("dataTables");
    var uic$ = require("uic_Dropdown");
	require("DT_bootstrap");
	require("bootstrap");
	$= require("easyui");
	require("coverage");
	require("jquery.form");
	require("formSelect");
	function loadgrid(){
		
		//品牌列表
		table=dataTable$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource":ctx+"/deviceAssets/getAllList?tmp="+Math.random(), 
			"bRetrieve": true,
			"bSort": false,
			"bFilter": true,
			"sServerMethod": "POST",
			"oSearch" : true,
			"aoColumns": [
						    { "mData": "roomName","mRender":function(data,row,obj){
				          		  rstatus="<div style='float:left;' >" +
				          		  				"<div style='display:block;float:left;'>"+data+"&nbsp&nbsp&nbsp&nbsp&nbsp</div> " +
				          		  				"<div style='display:none;float:right;'>" +
				          		  					"<a  id ='"+obj.id+"'  href='#'  data-toggle='modal'  name='_edit'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				          		  					"<a  id = '"+obj.id+"' href='#' name='_del'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
				          		  				"</div>" +
				          		  		 "</div>" ; 
				          		 
				          		  return rstatus;
						    } },
							{ "mData": "assetsName" },
							{ "mData": "devicePower" },
							{ "mData": "staffName" },
							{ "mData": "latelyTime" }
						],
			"sDom": "<'row'<'bt5left'l><'bt5right partnersel'>r>t<'row'<'bt5left'i><'bt5right'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "页显示_MENU_ ",
				"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sSearch":"检索:",
				"sEmptyTable":"没有数据",
				"sInfoEmpty": "显示0条数据",
				"oPaginate":{
					"sPrevious": "",
					"sNext":''
				}

				
			},
			fnDrawCallback:function(){
				$('.partnersel').empty();
				$('.partnersel').append("<label class='control-label' for='_sino_partner'>机房名称：</label>");
				$('.partnersel').append('<div class="ultraselect-nms3" style="z-index:8"><input type="text" id="_sino_partner" data="0" /></div>');
				$('a[name="_edit"]').unbind('click').click(function () {
					var id =this.id;
					_edit(id);
				});
				$('a[name="_del"]').unbind('click').click(function () {
					var id =this.id;
					remove(id);
				});
				
				$('#taskTable tbody tr').each(function(){
					var tdd=$(this.childNodes[0]);
					var sss=$(tdd.children()[0]);
				    tdd.bind("mouseover",function(){
				    	$(sss.children()[1]).css('display','block'); 
				    });
				    
				    tdd.bind("mouseout",function(){
				    	$(sss.children()[1]).css('display','none'); 
				    });
				  
				})
			} 
		
		});
		$("#addbutton").append("<a id='createbutton' href='#myModal1' role='button'  data-toggle='modal'class='btn btn-primary'>添加机房资产设备清单</a>");
		$("#createbutton").unbind('click').click(function () {
//			_createOrEdit('');
			create();
		});
		/*
		 * 绑定触发事件
		 */
		 $("#_create_partner_brand").bind('click',function(){
			 create(ctx+"/deviceAssets/toAdd");
         });

	}
	
	function create () {
		var url = ctx+"/deviceAssets/toAdd?tmp="+Math.random();
		$('#edit_list').empty();
		$('#edit_list').load(url,function(){
			//加载机房信息
			$("#formSelectRoom").empty();
			var $fieldRoom = $("#formSelectRoom");
			$fieldRoom.addClass("li_form");
			var optionRoom = {
				url		  :  ctx+"/resourceDeviceprotocol/getAllRoomInfo",
				inputName : "room",
				writeType : 'show',
				showLabel : false,
				code : 'lightning',
				onSelect:function(node){
				$("#rommId").attr("value",node);
					
				},
				width : "280"
			};
			$fieldRoom.formSelect(optionRoom);
			
	    	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
	    				$.ajax({
	    					//?roomName="+$("#roomId").val()+"&assetsName="+$("#assetsName")+"&devicePower="+$("#devicePower").val()+"
	    					url: ctx+"/deviceAssets/add?tmp="+Math.random(),  // 提交的页面
	    					data: $('#addForm').serialize(),
	    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	    					beforeSend: function()          // 设置表单提交前方法
	    					{
	    						//  new screenClass().lock();
	    					},
	    					error: function(request) {      // 设置表单提交出错
	    						$('#alertMsg').empty();
    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
	    					},
	    					success: function(data) {
	    						// 设置表单提交完成使用方法
	    						if(data=="success"){
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>机房资产设备清单添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
	    							
	    						}else{
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房资产设备清单添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
	    						}  
	    					}
	    				});
	    				
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    		});
	    		
		    	
		    	$("#addSite").unbind("click").click(function(){
		    		var aa=$("#formSelectRoom").formSelect("getValue")[0];
		    		$("#rommId").attr("value",aa);
		    		$('#addForm').submit();
//		    		$("#addForm").ajaxSubmit(function(message) {  
//		    			async : false // 同步提交
//		    		});  
		    		//$('#edit_list').empty();
		    		//$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
		    		
		    	});
		    	$("#reset").unbind("click").click(function(){
		    		
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
		    	});
		});
	}
	
	function _createOrEdit(id){
		//$('.edit_list').load(ctx+'/base/partnerBrand/partnerBrand_saveOrUpdate?id='+id+'&tmp='+Math.random());
		var options = {};
		options.murl = 'deviceAssets/toAdd';
		options.keyName = 'id';
		options.keyValue = id;
		$.openurl(options);
	}
	
	function _edit(id){
		var murl = ctx+"/deviceAssets/toEdit?id="+id+"tmp="+Math.random();
//		$('#edit_list').empty();
//		$('#edit_list').load(url,function(){
		    var mid = id;
			$('.edit_list').empty();
			var url = ctx +"/deviceAssets/getAssets?id="+mid;
			$('.edit_list').load(murl,function(){
				//加载机房信息
				$("#formSelectRoom").empty();
				var $fieldRoom = $("#formSelectRoom");
				$fieldRoom.addClass("li_form");
				var optionRoom = {
					url		  :  ctx+"/resourceDeviceprotocol/getAllRoomInfo",
					inputName : "room",
					writeType : 'show',
					showLabel : false,
					onSelect:function(node){
					$("#rommId").attr("value",node);
					},
					width : "280"
				};
				$fieldRoom.formSelect(optionRoom);
				
				$.post(url,function(data){
					console.info(data);
					$("#assetsId").attr("value", mid);
					$("#rommId").attr("value", data.roomId);
					$("#formSelectRoom").formSelect("setValue",data.roomId);
				 	$("#assetsName").attr("value", data.assetsName);
				 	$("#devicePower").attr("value",data.devicePower);
					
	    	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
	    				$.ajax({
	    					//?roomName="+$("#roomId").val()+"&assetsName="+$("#assetsName")+"&devicePower="+$("#devicePower").val()+"
	    					url: ctx+"/deviceAssets/edit?tmp="+Math.random(),  // 提交的页面
	    					data: $('#addForm').serialize(),
	    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	    					beforeSend: function()          // 设置表单提交前方法
	    					{
	    						//  new screenClass().lock();
	    					},
	    					error: function(request) {      // 设置表单提交出错
	    						$('#alertMsg').empty();
    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
	    					},
	    					success: function(data) {
	    						// 设置表单提交完成使用方法
	    						if(data=="success"){
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>机房资产设备清单修改成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
	    							
	    						}else{
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房资产设备清单修改 失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
	    						}  
	    					}
	    				});
	    				
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    		});
	    		
		    	
		    	$("#addSite").unbind("click").click(function(){
		    		var aa=$("#formSelectRoom").formSelect("getValue")[0];
		    		$("#rommId").attr("value",aa);
		    		$('#addForm').submit();
		    		
		    	});
		    	$("#reset").unbind("click").click(function(){
		    		
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
		    	});
				});
			});
//		});
	}
	
	function remove(id){
//		$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
			if (confirm( '确定要删除这条信息吗?' )){
				$.ajax({
					url: ctx+"/deviceAssets/remove?id="+id,  // 提交的页面
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	searchTable('');
		            	$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();  
	         		    	
	         		    });
	         		   $('.edit_list').load(ctx + '/deviceAssets/resourceDeviceAssets_main?tmp=' + Math.random());
		            }
				});
			}
//		});
	}
	
	function searchTable(param){
		table.fnFilter(param,0 );
		//table.fnSort( [ [1,param] ] );
	}
	
	
	exports.init = function(){
		loadgrid();  
	}
});