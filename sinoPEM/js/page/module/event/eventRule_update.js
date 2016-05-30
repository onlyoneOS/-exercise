function load() {
			//加载事件类型
			var $eventTypeId=$("#eventTypeId");
			$eventTypeId.addClass("li_form");
			var eventTypeIdSelect=$("#eventTypeIdSelect").val();
			var eventTypeId = {
					inputName : "eventTypeId",
					writeType : 'show',
					showLabel : false,
					url : ctx+"/eventIndicator/getEventTypeId",
					width : "282",
					inputValue : eventTypeIdSelect
			};
			$eventTypeId.formSelect(eventTypeId);
			
			//加载事件级别
			var $eventLevel=$("#eventLevel");
			$eventLevel.addClass("li_form");
			var eventLevelSelect=$("#eventLevelSelect").val();
			var eventLevel = {
					inputName : "eventLevel",
					writeType : 'show',
					showLabel : false,
					code : 'eventLevel',
					//url : ctx+"/eventType/getIndicatorId",
					width : "282",
					inputValue : eventLevelSelect
			};
			$eventLevel.formSelect(eventLevel);

		
		
			$("#save").unbind("click").click(function(){
				$('input[name="eventTypeId"]').attr('value',$("#eventTypeId").formSelect("getValue")[0]); 
				$('input[name="eventLevel"]').attr('value',$("#eventLevel").formSelect("getValue")[0]); 
                $("#updateForm").ajaxSubmit(function(message) {  
                	 async : false // 同步提交
                 });  
                 
                 $('.edit_list').empty();
                 $('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random());
 			});
			$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventIndicator/manager?tmp=' + Math.random());
	    	});
	};

