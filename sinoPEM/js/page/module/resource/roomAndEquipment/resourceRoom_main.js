var table='';
var PersonSelect;
var ids;
var dm;	
function loadAll(){
		var url = ctx+"/room/getAll";
		loadRoom(url);
		var paramId = '';
			$("#createbutton").unbind('click').click(function () {
				create();
			});
			$('a[name="delRoom"]').unbind('click').click(function () {
				delRoom();
			});
			$('a[name="modiRoom"]').unbind('click').click(function () {
				delRoom();
			});
}

function loadRoom(url){
	var $field = $("#taskTable");
	var options = {
		url : url,
		enableCRUD : false,
		bFilter:true,
		dtCallBack:function(){
	 		 $("a[name='delRoom']").unbind('click').bind("click",delRoom);
	 		 $("a[name='modiRoom']").unbind('click').bind('click',modiRoom);
			},
	    mData : [
              { "mData": "roomName" },
              { "mData": "orgNameing" },
              { "mData": "staffIding" },
              { "mData": "roomDesc" },
              { "mData": "id","mRender": function (data) {
            	  var rstatus='';
            	  var id = data;
          		  rstatus="<a name ='modiRoom'   role='button' data-toggle='modal'  id='"+id+"'>" +
          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
          		  		"<a name='delRoom' href='#' id='"+id+"'>&nbsp" +
          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
          		  return rstatus;
          		  
              } }
          ]
	}
	$field.dataTableEX(options);
}
		/*
		 * 机房详细页面
		 * 
		 */
		function showRoomInfo(mid){
			var id = mid;
			var url = ctx+"/room/roomDetailInfo?roomId="+id;
			$('#edit_list').empty();
			$('#edit_list').load(url,function(){
				
			});
			
		}
  
	
    /*
     *   删除机房
     * 
     */

	function delRoom(){

		      // confirm("确定删除吗？");
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sinoPEM/room/delRoom?roomId="+$(this).attr("id"),  // 提交的页面
		                data: "", // 从表单中获取数据
		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		                beforeSend: function()          // 设置表单提交前方法
		                {
		                  //  new screenClass().lock();
		                },		                		           		 
		               error: function(request) {     // 设置表单提交出错
		            	   $("#taskTable").fnDraw(false);
	                	    $('#alertMsg').empty();		                	 
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
	                   },
		               success: function(data) {
		                // 设置表单提交完成使用方法
		               // 	alert("表单提交成功"+data);
		            	   if(data=="success"){
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		            	   }else if(data=="false"){
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失败，机房下有设备！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		            	   }else{
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		            	   }
		            	   $("#taskTable").dataTable().fnDraw(false);
		                 }
	              });
	  }
	
	
	
	/*
	 *  修改机房
	 */
	function modiRoom(){
	    var murl = ctx+"/room/modi?id="+$(this).attr("id");
		$('.edit_list').empty();
		$('.edit_list').load(murl,function(){
			getOrgs();
			getUserGroups();
			function getOrgs(){
				var orgTree = $("#orgId");
				var orgId=$("#orgIds").val();
				var orgName=$("#orgName").val();
				var optionsOrg = {	
					animate : true,
					searchTree : true,
					folderChoose:false,
					tree_url : ctx + '/formTree/getTreeOrg?random=1',// 顶层
					asyncUrl : ctx + '/formTree/getTreeOrg?random=1',// 异步
					search_url : ctx + '/formTree/searchTreeOrg?random=1',// 搜索
					find_url : ctx + '/formTree/getTreeOrg?random=1',// 精确定位
					url : '',
					asyncParam : [ "id" ],
					addparams : [ {
						name : "orgParentId",
						value : "root"
					} ],
					async : true,
					inputChange : function() {
						var orgId = $("#orgId").formTree("getValue");
						$("#orgValue").attr("value", orgId);
					}
				};
				optionsOrg.resIds = orgId;
		 		optionsOrg.inputValue = orgName;
		 		optionsOrg.inputRealValue = orgId;
				orgTree.formTree(optionsOrg);
			}
			
			function getUserGroups(){
				var $userGroup = $("#userGroupss");
				$userGroup.addClass("li_form");
				var options = {
					inputName : "roles",
					url : ctx + "/userGroup/getAllUserGroup",
					showLabel : false,
					inputChange : false,
					width : "282",
					inputValue:$("#staffValue").val(),
					checkbox : false
				};
				options.writeType = 'show';
				$userGroup.formSelect(options);
			}
			$("#modiRoomSite").unbind("click").click(function(){
				$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
	    				$("#orgValue").attr("value",$("#orgId").formTree("getValue")); //所属组织
			    		 $("#staffId").attr("value",$("#userGroupss").formSelect("getValue"));//用户选择
	    				$.ajax({
	    					url: ctx+"/room/modiRoom?tmp=" + Math.random(),  // 提交的页面
	    					data: $('#modiForm').serialize(), // 从表单中获取数据
	    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	    					beforeSend: function()          // 设置表单提交前方法
	    					{
	    						//  new screenClass().lock();
	    					},
	    					error: function(request) {      // 设置表单提交出错
	    						$('#alertMsg').empty();
    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房修改失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
	    					},
	    					success: function(data) {
	    						// 设置表单提交完成使用方法
	    						if(data=="success"){
//	    							RefreshTable();
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>机房修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();  
				         		    	
				         		    });
				         		    
	    				    		$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
	    							
	    						}else{
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房修改失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    			         			$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
	    						}  
	    					}
	    				});
	    				
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    		});
				$('#modiForm').submit();
		});
				
				$("#resets").unbind("click").click(function(){
		    		
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
		    	});
				
					
				});
			}
	
	
	/*
	 * 添加机房
	 * 
	 */
		    
	function create(options){
		var url = ctx+"/room/add?tmp="+Math.random();
		$('#edit_list').empty();
		$('#edit_list').load(url,function(){
			getOrg();
			getUserGroup();
			function getOrg(){
				var orgTree = $("#orgId");
				var optionsOrg = {	
					animate : true,
					searchTree : true,
					folderChoose:false,
					tree_url : ctx + '/formTree/getTreeOrg?random=1',// 顶层
					asyncUrl : ctx + '/formTree/getTreeOrg?random=1',// 异步
					search_url : ctx + '/formTree/searchTreeOrg?random=1',// 搜索
					find_url : ctx + '/formTree/getTreeOrg?random=1',// 精确定位
					url : '',
					asyncParam : [ "id" ],
					addparams : [ {
						name : "orgParentId",
						value : "root"
					} ],
					async : true,
					inputChange : function() {
						var orgId = $("#orgId").formTree("getValue");
						$("#orgValue").attr("value", orgId);
					}
				};
				orgTree.formTree(optionsOrg);
			    	
			}
			
			function getUserGroup(){
				var $userGroup = $("#userGroup");
				$userGroup.addClass("li_form");
				var options = {
					inputName : "roles",
					url : ctx + "/userGroup/getAllUserGroup",
					showLabel : false,
					inputChange : false,
					width : "282",
					checkbox : false
				};

				options.writeType = 'show';

				$userGroup.formSelect(options);
				
			}
$("#addRoomSite").unbind("click").click(function(){
	    	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
			    		$("#orgValue").attr("value",$("#orgId").formTree("getValue")); //所属组织
			    		  $("#staffValue").attr("value",$("#userGroup").formSelect("getValue"));//用户选择
	    				$.ajax({
	    					url: ctx+"/room/addRoom?tmp="+Math.random(),  // 提交的页面
	    					data: $('#addForm').serialize(), // 从表单中获取数据
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
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>机房添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
	    							
	    						}else{
	    							$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    							    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
	    							$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
	    						}  
	    					}
	    				});
	    				
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    		});
    		    $('#addForm').submit();
		   });
		    	$("#reset").unbind("click").click(function(){
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
		    	});
		    	$('button[id="reset"]').unbind("click").click(function(){
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/room/roomManager?tmp=' + Math.random());
		    	});
		});
	
	}
