define(function(require, exports, module) {
	var $ = require("jquery");
	require("jquery.form");
	require("bootstrap");
	require("jqBootstrapValidation");
	require("formSelect");
	require("formTree");
	require("uic_Dropdown");
	
	exports.init = function() {
		
			/*//加载事件类型
			var $eventTypeCodeDiv=$("#eventTypeCodeDiv");
			$eventTypeCodeDiv.addClass("li_form");
			var eventLevel = {
					writeType : 'show',
					showLabel : false,
					code : 'eventTypeCode',
					width : "282",
					onSelect :function(){  
						$("#eventTypeCode").val($eventTypeCodeDiv.formSelect("getValue")[0]); 
						getEventType($eventTypeCodeDiv.formSelect("getValue")[0]);
					}
			};
			$eventTypeCodeDiv.formSelect(eventLevel);*/
		
			//加载事件
			var $eventTypeId=$("#eventTypeIdDiv");
			$eventTypeId.addClass("li_form");
			var eventTypeId = {
					writeType : 'show',
					showLabel : false,
					url : ctx+"/eventIndicator/getEventTypeId",
					width : "282",
					onSelect :function(){  
						$("#eventTypeId").val($eventTypeId.formSelect("getValue")[0]); 
					}
			};
			$eventTypeId.formSelect(eventTypeId);
			
			function getEventType(eventTypeCode){
				//加载事件
				var $eventTypeId=$("#eventTypeIdDiv");
				$eventTypeId.empty();
				$eventTypeId.addClass("li_form");
				var eventTypeId = {
						writeType : 'show',
						showLabel : false,
						url : ctx+"/eventIndicator/getEventTypeId?eventTypeCode="+eventTypeCode,
						width : "282",
						onSelect :function(){  
							$("#eventTypeId").val($eventTypeId.formSelect("getValue")[0]); 
						}
				};
				$eventTypeId.formSelect(eventTypeId);
			}
			
			
			//加载事件级别
			var $eventLevel=$("#eventLevelDiv");
			$eventLevel.addClass("li_form");
			var eventLevel = {
					writeType : 'show',
					showLabel : false,
					code : 'eventLevel',
					width : "282",
					onSelect :function(){  
						 $("#eventLevel").val($eventLevel.formSelect("getValue")[0]); 
					}
			};
			$eventLevel.formSelect(eventLevel);
		
			
			
			//验证数据并提交
			$(function() {
		    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    		     submitSuccess: function (form, event) {
	    		    	 
	    		         event.preventDefault();//indicatorDataType
	    		         $.ajax({
	 		               url: ctx+"/eventIndicator/add?tmp=" + Math.random(),  // 提交的页面
		 		            data: $('#addForm').serialize(), // 从表单中获取数据
	 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	 		                error: function(request) {      // 设置表单提交出错
	 		                	 $('#alertMsg').empty();
	 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件指标添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	 			         		    $(".alert").delay(2000).hide(0);
	 			         		    $(".close").click(function(){
	 			         		    	$(".alert").hide();
	 			         		    });
	 		                },
	 		                success: function(data) {
	 		                // 设置表单提交完成使用方法
//	 		                	alert("表单提交成功"+data);
	 		                   if(data=="success"){
	 		                	   $('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random(),{},function(){
	 		                			$('#alertMsg').empty();
	 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件指标添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	 				         		    $(".alert").delay(2000).hide(0);
	 				         		    $(".close").click(function(){
	 				         		    	$(".alert").hide();
	 				         		    });
	 		                	   });
	 		                   }else{
	 		                	   $('#alertMsg').empty();
	 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件指标添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	 			         		    $(".alert").delay(2000).hide(0);
	 			         		    $(".close").click(function(){
	 			         		    	$(".alert").hide();
	 			         		    });
	 		                   }
	 		                  
	 		                }
	 		            });
	    		   
	    		     },
	    		     submitError: function (form, event, errors) {
	    		         event.preventDefault();
	    		         }
	    	 	});

		    	 $("#save").unbind('click').click(function () {
		    		 	$("#addForm").submit();
		    	    });
			});
			
			
	    	$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random());
	    	});
				
	    	
	    	
				
	};
});