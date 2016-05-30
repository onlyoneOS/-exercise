function loadAll(){

	    	var url = ctx+"/userGroup/findAllUserGroups";
	    	loadTable(url);
};
function creat(){
	var frameSrc = ctx+"/userGroup/addUserGroupView"; 
	$('#dailogs1').on('show', function () {
		$(".modal-header").empty();
		$(".modal-header").append("<a class='close' aria-hidden='true' data-dismiss='modal' type='button'>×</a><h3 >添加用户组</h3>");
		//$('#dtitle').html("添加用户组");
	     $('#dialogbody').load(frameSrc,function(){
	    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    		
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();
    		         $("#hideUsers").attr("value",$("#formStaff").formUser("getValue"));
    		         if($("#formRole").formSelect("getValue")!=",")
    		        	 $("#hideRoles").attr("value",$("#formRole").formSelect("getValue"));
    		                 $.ajax({
 		                url: ctx+"/userGroup/saveUserGroup",  // 提交的页面
 		                data: $('#addForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>创建用户组失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){
 		                	   $('.edit_list').load(ctx + '/userGroup/manageUserGroup?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>用户组添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                
 			         		 
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户组添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                   }
 		                  $('#dailogs1').modal('hide');
 		                }
 		            });
    		   
    		     },
    		     submitError: function (form, event, errors) {
    		         event.preventDefault();
    		         }
    	 	});
	     }); 
		     $("#dsave").unbind('click');
		     $('#dsave').click(function () {
				$('#addForm').submit();
		     });
		
	 });
		    $('#dailogs1').on('hidden', function () {
		    	$('#dailogs1').unbind("show");
		    	});
			$('#dailogs1').modal({show:true});
			$('#dailogs1').off('show');
}

			  	function destoryUsers(){
			  		
			  		$(this).poshytip('destroy'); 
			  	}
			  	function findUsers(){
			  		//$(this).attr("id")
			  		var userNames=$(this).attr("value").replace(",","<br>");
			  		var options = {
			  				content: userNames,
			  				className: 'tip-skyblue',
			  				showOn: 'none',
			  				alignTo: 'target',
			  				alignX: 'inner-left',
			  				offsetX: 0,
			  				offsetY: 5

						}
			  		$(this).poshytip(options); 
			  		$(this).poshytip('show'); 

			  	}
				function delUserGroup(){
					$.ajax({
		     			    url: ctx+"/userGroup/delUserGroup?userGroupId="+$(this).attr("id"),  // 提交的页面
			                data: "", // 从表单中获取数据
			                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			                beforeSend: function()          // 设置表单提交前方法
			                {
			                  //  new screenClass().lock();
			                },
			                error: function(request) {     // 设置表单提交出错
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
			            		   //RefreshTable();

	 		                	   $('.edit_list').load(ctx + '/userGroup/manageUserGroup?tmp=' + Math.random(),{},function(){
	 		                			$('#alertMsg').empty();
	 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>用户组删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	 				         		    $(".alert").delay(2000).hide(0);
	 				         		    $(".close").click(function(){
	 				         		    	$(".alert").hide();
	 				         		    });
	 		                	   });				         		    	
				         		    
			            }
		});
		}
		//修改用户		
					function modiUserGroup(){
						var frameSrc = ctx+"/userGroup/editUserGroupView?userGroupId="+$(this).attr("id"); 
						$('#dailogs1').on('show', function () {
							$(".modal-header").empty();
							$(".modal-header").append("<a class='close' aria-hidden='true' data-dismiss='modal' type='button'>×</a><h3 >修改用户组</h3>");
						     $('#dialogbody').load(frameSrc,function(){
						    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
						    		
					    		     submitSuccess: function (form, event) {
					    		         event.preventDefault();
					    		        
					    		         $("#hideUsers").attr("value",$("#formStaff").formUser("getValue"));
					    		         if($("#formRole").formSelect("getValue")!=",")
					    		        	 $("#hideRoles").attr("value",$("#formRole").formSelect("getValue"));
					    		         $.ajax({
					 		                url: ctx+"/userGroup/editUserGroup",  // 提交的页面
					 		                data: $('#editForm').serialize(), // 从表单中获取数据
					 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
					 		                beforeSend: function()          // 设置表单提交前方法
					 		                {
					 		                  //  new screenClass().lock();
					 		                },
					 		                error: function(request) {      // 设置表单提交出错
					 		                	 $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户组修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
					 		                },
					 		                success: function(data) {
					 		                // 设置表单提交完成使用方法
					 		               // 	alert("表单提交成功"+data);
					 		                   if(data=="success"){
					 		                	   $('.edit_list').load(ctx + '/userGroup/manageUserGroup?tmp=' + Math.random(),{},function(){
					 		                			$('#alertMsg').empty();
					 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>用户组修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 				         		    $(".alert").delay(2000).hide(0);
					 				         		    $(".close").click(function(){
					 				         		    	$(".alert").hide();
					 				         		    });
					 		                	   });
					 		                
					 			         		 
					 		                   }else{
					 		                	   $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户组添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
					 		                   }
					 		                  $('#dailogs1').modal('hide');
					 		                }
					 		            });
					    		   
					    		     },
					    		     submitError: function (form, event, errors) {
					    		         event.preventDefault();
					    		         }
					    	 	});
						     }); 
							     $("#dsave").unbind('click');
							     $('#dsave').click(function () {
									$('#editForm').submit();
							     });
							
						 });
							    $('#dailogs1').on('hidden', function () {$('#dailogs1').unbind("show");
							    });
								$('#dailogs1').modal({show:true});
								$('#dailogs1').off('show');
			}
function loadTable(url){
	var $field = $("#taskTable");
	var options = {
		url : url,
		enableCRUD : false,
		bFilter:true,
		dtCallBack:function(){
	 		 $("a[name='delUserGroup']").unbind('click').bind("click",delUserGroup);
	 		 $("a[name='modiUserGroup']").unbind('click').bind('click',modiUserGroup);
			},
	    mData : [
              { "mData": "userGroupName" },
              { "mData": "roleNames" },
              { "mData": "userNames"},
              { "mData": "userGroupId","mRender": function (data) {
            	  var rstatus='';
            	  var id = data;
          		  rstatus="<a name ='modiUserGroup'   role='button' data-toggle='modal'  id='"+id+"'>" +
          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
          		  		"<a name='delUserGroup' href='#' id='"+id+"'>&nbsp" +
          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
          		  return rstatus;
          		  
              } }
          ]
	}
	$field.dataTableEX(options);
}