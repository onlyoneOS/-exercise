
	
	    function loadAll(){

	    	var url = ctx+"/user/findAllUsers";
	    	var $field = $("#taskTable");
			
			var options = {
				
				url : url,
				domainCode : ['userType','state'],//需要获取字典值的domainCode
				enableDomain : [false,true,false,true,false],//指定需要转义的字段
				dtCallBack:function(){
			 		 $("a[name='delUser']").unbind('click').bind("click",delUser);
			 		 $("a[name='modiUser']").unbind('click').bind('click',modiUser);
			 		 $("a[name='modiOrg']").unbind('click').bind("click",modiOrg);
					},

				mData : [
				         
			              { "mData": "userName" },
			              { "mData": "userType" },
			              { "mData": "sysStaff","mRender":function(data, type, full){
			            	  if(data!=null){
			            		  return data.staffName;
			            	  }else{
			            		  return "";
			            	  }
			              } },
			              	{ "mData": "state"},
			                { "mData": "userId","mRender": function (data) {
			            	  var rstatus='';
			            	  var id = data;
			          		  rstatus="<a name ='modiUser'  href='#myModal1' role='button' data-toggle='modal'  id='"+id+"'>" +
			          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
			          		  		"<a name='delUser' href='#' id='"+id+"'>&nbsp" +
			          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" +
			          		  		"<a href='#myModal3'  name='modiOrg'  data-toggle='modal' id='"+id+"'>配置机构</a>&nbsp;&nbsp;" ; 
			          	
			          		  return rstatus;
			          		  
			              } }
			          ]
			}
			$field.dataTableEX(options);
			
			
			$('a[name="addUser"]').unbind('click').click(function(){
				creatUser();
			});
							
	   }
		function creatUser(){
					var frameSrc = ctx+"/user/addUserView"; 
					$('#dailogs1').on('show', function () {
						$('#dtitle').html("添加用户");
					     $('#dialogbody').load(frameSrc,function(){
					    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
					    		
				    		     submitSuccess: function (form, event) {
				    		         event.preventDefault();
				    		         var sff=$("#formStaff").formUser("getValue");
				    		         $("#hideRoles").attr("value",$("#formRole").formSelect("getValue"));    		     
				    		         $("#hideUserType").attr("value",$("#formUserType").formSelect("getValue")); 
				    		         $("#hideUserState").attr("value",$("#formUserState").formSelect("getValue"));
				    		         $.ajax({
				 		                url: ctx+"/user/saveUser?hideStaffs="+sff,  // 提交的页面
				 		                data: $('#addForm').serialize(), // 从表单中获取数据
				 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
				 		                beforeSend: function()          // 设置表单提交前方法
				 		                {
				 		                },
				 		                error: function(request) {      // 设置表单提交出错
				 		                	 $('#alertMsg').empty();
				 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 			         		    $(".alert").delay(2000).hide(0);
				 			         		    $(".close").click(function(){
				 			         		    	$(".alert").hide();
				 			         		    });
				 		                },
				 		                success: function(data) {
				 		                // 设置表单提交完成使用方法
				 		               // 	alert("表单提交成功"+data);
				 		                   if(data=="success"){
				 		                	   $('.edit_list').load(ctx + '/user/manageUser?tmp=' + Math.random(),{},function(){
				 		                			$('#alertMsg').empty();
				 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>用户添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 				         		    $(".alert").delay(2000).hide(0);
				 				         		    $(".close").click(function(){
				 				         		    	$(".alert").hide();
				 				         		    });
				 		                	   });
				 		                
				 			         		 
				 		                   }else{
				 		                	   if(data="flag"){
				 		                		  $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>一个账号只能有一个用户！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
				 		                	   }else{
				 		                		  $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
				 		                	   }
				 		                	  
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
				    $('#dailogs1').on('hidden', function () {$('#dailogs1').unbind("show");});
					$('#dailogs1').modal({show:true});
					$('#dailogs1').off('show');

				}
			  	function RefreshTable(){
//						table.fnSort( [ [1,'asc'] ] );
//						table.fnSort( [ [1,'desc'] ] );
				} 
		
				
				function delUser(){
					$.ajax({
		     			    url: ctx+"/user/delUser?userId="+$(this).attr("id"),  // 提交的页面
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
//			            		   RefreshTable();
			                	if(data=="success"){
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();  
				         		    	
				         		    });
			                	}else{
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失敗！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();  
				         		    	
				         		    });
			                	}
			                	 $("#taskTable").dataTable().fnDraw(false);
				         	//	   $('.edit_list').load(ctx + '/user/manageUser?tmp=' + Math.random());
			            }
		});
		}
		//修改用户		
		function modiUser(){
						var frameSrc = ctx+"/user/editUserView?userId="+$(this).attr("id");
					$('#dailogs1').on('show', function () {
						$('#dtitle').html("修改用户");
					     $('#dialogbody').load(frameSrc,function(){
					    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
					    		
				    		     submitSuccess: function (form, event) {
				    		         event.preventDefault();

				    		         $("#hideUserState").attr("value",$("#formUserState").formSelect("getValue"));
				    		         $("#hideUserType").attr("value",$("#formUserType").formSelect("getValue"));
				    		         $("#hideStaffs").attr("value",$("#formStaff").formUser("getValue"));
				    		         $("#hideRoles").attr("value",$("#formSelect").formSelect("getValue"));
				    		         $.ajax({
				 		                url:  ctx+"/user/editUser", 
				 		                data: $('#editForm').serialize(), // 从表单中获取数据
				 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
				 		                beforeSend: function()          // 设置表单提交前方法
				 		                {
				 		                  //  new screenClass().lock();
				 		                },
				 		                error: function(request) {      // 设置表单提交出错
				 		                	 $('#alertMsg').empty();
				 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 			         		    $(".alert").delay(2000).hide(0);
				 			         		    $(".close").click(function(){
				 			         		    	$(".alert").hide();
				 			         		    });
				 		                },
				 		                success: function(data) {
				 		                // 设置表单提交完成使用方法
				 		               // 	alert("表单提交成功"+data);
				 		                   if(data=="success"){
				 		                	   $('.edit_list').load(ctx + '/user/manageUser?tmp=' + Math.random(),{},function(){
				 		                			$('#alertMsg').empty();
				 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>用户修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 				         		    $(".alert").delay(2000).hide(0);
				 				         		    $(".close").click(function(){
				 				         		    	$(".alert").hide();
				 				         		    });
				 		                	   });
				 		                
				 			         		 
				 		                   }else{
				 		                	  if(data="flag"){
				 		                		  $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>一个账号只能有一个用户！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
				 		                	   }else{
				 		                		  $('#alertMsg').empty();
					 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>用户添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					 			         		    $(".alert").delay(2000).hide(0);
					 			         		    $(".close").click(function(){
					 			         		    	$(".alert").hide();
					 			         		    });
				 		                	   }
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
					    $('#dailogs1').on('hidden', function () {$('#dailogs1').unbind("show");});
						$('#dailogs1').modal({show:true});
						$('#dailogs1').off('show');
					}
			//修改角色	
			function modiOrg(){
			    	var frameSrc = ctx+"/user/editUserOrg?userId="+$(this).attr("id");; 
			    	
			    	$('#dailogs1').on('show', function () {
						$('#dtitle').html("配置机构");
					     $('#dialogbody').load(frameSrc,function(){
					    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
				    		     submitSuccess: function (form, event) {
				    		         event.preventDefault();
				    		         $.ajax({
				 		                url:  ctx+"/user/modiOrg", 
				 		                data: $('#editForm').serialize(), // 从表单中获取数据
				 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
				 		                beforeSend: function()          // 设置表单提交前方法
				 		                {
				 		                  //  new screenClass().lock();
				 		                },
				 		                error: function(request) {      // 设置表单提交出错
				 		                	 $('#alertMsg').empty();
				 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>配置机构失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 			         		    $(".alert").delay(2000).hide(0);
				 			         		    $(".close").click(function(){
				 			         		    	$(".alert").hide();
				 			         		    });
				 		                },
				 		                success: function(data) {
				 		                // 设置表单提交完成使用方法
				 		               // 	alert("表单提交成功"+data);
				 		                   if(data=="success"){
				 		                	   $('.edit_list').load(ctx + '/user/manageUser?tmp=' + Math.random(),{},function(){
				 		                			$('#alertMsg').empty();
				 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>配置机构成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				 				         		    $(".alert").delay(2000).hide(0);
				 				         		    $(".close").click(function(){
				 				         		    	$(".alert").hide();
				 				         		    });
				 		                	   });
				 		                
				 			         		 
				 		                   }else{
				 		                	   $('#alertMsg').empty();
				 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>配置机构失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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
				    $('#dailogs1').on('hidden', function () {$('#dailogs1').unbind("show");});
					$('#dailogs1').modal({show:true});
					$('#dailogs1').off('show');
							
				}
