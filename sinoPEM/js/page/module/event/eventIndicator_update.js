define(function(require, exports, module) {
	var $ = require("jquery");
	require("bootstrap");
	require("jqBootstrapValidation");
	require("formSelect");
	require("formTree");
	require("uic_Dropdown");
	require("jquery.form");
	
	exports.init = function() {

/*			//加载事件类型
			var $eventTypeCodeDiv=$("#eventTypeCodeDiv");
			$eventTypeCodeDiv.addClass("li_form");
			var eventLevel = {
					writeType : 'show',
					showLabel : false,
					code : 'eventTypeCode',
					width : "282",
					inputValue : $("#eventTypeCode").val(),
					onSelect :function(){  
						$("#eventTypeCode").val($eventTypeCodeDiv.formSelect("getValue")[0]); 
						getEventType($eventTypeCodeDiv.formSelect("getValue")[0]);
					}
			};
			$eventTypeCodeDiv.formSelect(eventLevel);*/
		
		
			//加载事件
			var $eventTypeId=$("#eventTypeIdDiv");
			$eventTypeId.addClass("li_form");
			var eventTypeIdSelect=$("#eventTypeId").val();
			var eventTypeId = {
					writeType : 'show',
					showLabel : false,
					url : ctx+"/eventIndicator/getEventTypeId",
					width : "282",
					inputValue : eventTypeIdSelect,
					onSelect :function(){  
						$("#eventTypeId").val($eventTypeId.formSelect("getValue")[0]); 
					}
			};
			$eventTypeId.formSelect(eventTypeId);
			
			//加载事件级别
			var $eventLevel=$("#eventLevelDiv");
			$eventLevel.addClass("li_form");
			var eventLevelSelect=$("#eventLevel").val();
			var eventLevel = {
					writeType : 'show',
					showLabel : false,
					code : 'eventLevel',
					width : "282",
					inputValue : eventLevelSelect,
					onSelect :function(){  
						 $("#eventLevel").val($eventLevel.formSelect("getValue")[0]); 
					}
			};
			$eventLevel.formSelect(eventLevel);

		
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
			
			//验证数据并提交
			$(function() {
		    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    		     submitSuccess: function (form, event) {
	    		    	 
	    		         event.preventDefault();//indicatorDataType
	    		         $.ajax({
	 		               url: ctx+"/eventIndicator/update?tmp=" + Math.random(),  // 提交的页面
		 		            data: $('#updateForm').serialize(), // 从表单中获取数据
	 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	 		                error: function(request) {      // 设置表单提交出错
	 		                	 $('#alertMsg').empty();
	 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件指标修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	 			         		    $(".alert").delay(2000).hide(0);
	 			         		    $(".close").click(function(){
	 			         		    	$(".alert").hide();
	 			         		    });
	 		                },
	 		                success: function(data) {
	 		                // 设置表单提交完成使用方法
	 		               // 	alert("表单提交成功"+data);
	 		                   if(data=="success"){
	 		                	   $('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random(),{},function(){
	 		                			$('#alertMsg').empty();
	 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件指标修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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
		    		 	$("#updateForm").submit();
		    	    });
			});
		
			$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random());
	    	});
				
		
		
		
	};

});