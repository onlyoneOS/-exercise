
	    function loadgrid(){
	    	var url = ctx+"/configIndicator/findAllIndicatorCategroy";
  	    	var $field = $("#taskTable");
  			var options = {
  				url : url,
  				modiFun :update, 
//  				modiUrl : ctx+"/indicator/modiConfConfnorm",
//  				delUrl : ctx+"/configIndicator/delConfIndicatorCategory",
  				domainCode : [],
  				enableCRUD : false,
  				sSearchDef:"请输入指标分类名称",
  				enableDomain : [false,false],
  				dtCallBack:function(){
			 		 $("a[name='delIndicatorCategory']").unbind('click').bind("click",deldate);
			 		 $("a[name='modiIndicatorCategory']").unbind('click').bind('click',update);
					},
//  				mDataEX : ["id","categoryName","categoryOrderValue"]
  				mData : [
			              { "mData": "categoryName" },
			              { "mData": "categoryOrderValue" },
			              { "mData": "id","mRender": function (data) {
			            	  var rstatus='';
			            	  var id = data;
			          		  rstatus="<a name ='modiIndicatorCategory'   role='button' data-toggle='modal'  id='"+id+"'>" +
			          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
			          		  		"<a name='delIndicatorCategory' href='#' id='"+id+"'>&nbsp" +
			          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
			          		  return rstatus;
			          		  
			              } }
			          ]
  			};
  		   $field.dataTableEX(options);
  		   
  		   if($("#indicatorType").val()=="conf"){
  		     $("#backAddConfIndicator").text("添加性能指标/");
			 $('#backAddConfIndicator').unbind('click').click(function () {
				var frameSrc = ctx+"/configIndicator/addConfigIndicator"; 
				$('.edit_list').load(frameSrc);
			   });
  		   }else{
  			 $("#backAddConfIndicator").text("添加性能指标/");
			 $('#backAddConfIndicator').unbind('click').click(function () {
				var frameSrc = ctx+"/propertyIndicator/addPropertyIndicator"; 
				$('.edit_list').load(frameSrc);
			   });
  		   }

	  //新增指标分类提交&验证
		  $("#categroyAddBtnConfirm").unbind('click').click(function () {
				$.ajax({
					   type:"post",
					   data: $('#addConfCategoryForm').serialize(), 
					   url: ctx+"/configIndicator/saveIndicatorCategroy",
					   success: function(message){
							  if(message=="success"){
								  var url=ctx+"/configIndicator/indicatorCategroyManage";
								  $('#alertMsg').empty();
								  $('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>指标分类新增成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
								  $(".alert").delay(2000).hide(0);
								  $(".close").click(function(){
									  $(".alert").hide();
								  });
								  $('.edit_list').load(url);
							  }else{
								  $('#alertMsg').empty();
								  $('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>指标分类新增失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
								  $(".alert").delay(2000).hide(0);
								  $(".close").click(function(){
									  $(".alert").hide();
								  });
							  }
					   }
					});
		});
		  
		  /*修改*/
			function update(){
				
				var url=ctx+"/configIndicator/indicatorCategroyManage";
				$("#dailogs").empty();
				var categoryId=this.id;
				var categoryName=$(this).parent().parent().children().first().text();
				var categoryOrderValue=$(this).parent().parent().children().first().next().text();
				String.prototype.trim=function() {
				    return this.replace(/(^\s*)|(\s*$)/g,'');
				};
				categoryOrderValue=categoryOrderValue.trim();
				categoryName=categoryName.trim();
				var buffer = new StringBuffer();
				buffer.append('<div id="myModal2" class="modal hide fade" tabindex="-1" role="modifyCategory" aria-labelledby="myModalLabel" aria-hidden="true">');
				buffer.append('<div class="modal-header">');
				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
				buffer.append('<h3 id="myModalLabel">修改指标类别</h3 >');
				buffer.append('</div>');
				buffer.append('<div class="modal-body" style="height:140px;" >');
				buffer.append("<div>"+"<form id='modiForm'   class='form-horizontal'  method='post'  action="+ctx+"/configIndicator/modiConfIndicatorCategory> ");
				buffer.append("<input type='hidden' name='id' id='id' value='"+categoryId+"' />");
				buffer.append("<div class='control-group'><label class='control-label' for='categoryName'>指标分类名称</label><div class='controls'><input type='text' name='categoryName' value='"+categoryName+"' required data-validation-required-message='请输入指标类别名称！'/> <p class='help-block'></p> </div></div>");
				buffer.append("<div class='control-group'><label class='control-label' for='categoryOrderValue'>分类编号</label><div class='controls'><input type='text' name='categoryOrderValue' value='"+categoryOrderValue+"' required data-validation-required-message='请输入分类编号！'/> <p class='help-block'></p> </div></div>");
				buffer.append("</form>");
				buffer.append("</div>");
				buffer.append('</div >');
				buffer.append('<div class="modal-footer" >');
				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
				buffer.append('<button class="btn btn-primary" data-dismiss="modal" id="categoryBtnConfirm" >保存</button >');
				buffer.append('</div >');
				buffer.append('</div>');
				$("#dailogs").append(buffer.toString());
				$('#myModal2').modal('show');
				$('#categoryBtnConfirm').unbind('click').click(function () {
					
					$("#modiForm").ajaxSubmit(function(message) { 
			           	 async : false;// 同步提交
			           		if(message=="success"){
									$('#alertMsg').empty();
									$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>指标分类修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
									$(".alert").delay(2000).hide(0);
								 	$(".close").click(function(){
										$(".alert").hide();
								 	});
							    	 $('.edit_list').load(url);
								}else{
									$('#alertMsg').empty();
									$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>指标分类修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
									$(".alert").delay(2000).hide(0);
									$(".close").click(function(){
										$(".alert").hide();
									});
								}
			               $('#myModal2').modal('hide');
			            });  
				   });
				
			}
			
			

	   /*删除*/
			
		 function deldate(){
			 
			  if(!confirm("确定删除吗？")){
			        return;
		          }
			  
			  $.ajax({
	           	  url:ctx + "/configIndicator/delConfIndicatorCategory?id=" +$(this).attr("id"), 
		          data: "", // 从表单中获取数据
		          type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		          beforeSend: function()          // 设置表单提交前方法
		                {
		                  //  new screenClass().lock();
		                },		                		           		 
		               error: function(request) {     // 设置表单提交出错
	               	    RefreshTable();
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
		            		    RefreshTable();
		                		$('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		                 }
	             });
			  
			}
		 
			function RefreshTable(){
				$('#edit_list').empty();
				$('.edit_list').load(ctx + '/configIndicator/indicatorCategroyManage?tmp=' + Math.random());
				} 
			
			
	    };
loadgrid();