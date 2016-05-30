 /**
  *  增加采集策略页面初始化接口
  */
function  loadAll(){

	    
	  //提交表单	     
	   $("#addSite").unbind('click').click(function(){		
		   
	      var  alarmInfoId = $("#alarmInfoId").val();
		  var url = ctx+"/alarmInfo/modiAlarmInfo?alarmInfoId="+alarmInfoId;		  
		  $("#addForm").ajaxSubmit({
			  url:url,
			  type:"post",
			  success : function(re){
				var pUrl = ctx+"/alarmInfo/alarmInfoManagePage" ;
				 $("#myModal2").modal('hide');
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
			  }
		 });
		  
	   });
	   	   
	
		 //获取告警类型
		 getAlarmInfoType();

  };
  
  
  
    /**
	  *  获取告警类型
	  */
	  function  getAlarmInfoType(){

		   // alert("eduId         "+idParam);
		    var  typeValue = $("#type").val();
		    var alarmInfoTypeUrl = ctx +"/alarmInfo/getAlarmType";
			$('#alarmType').empty();
			var $fieldCompDevType = $("#alarmType");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				//inputName : "education",
				writeType : 'show',
				width: "280", //高度
				showLabel : false,
				url : alarmInfoTypeUrl,
				//checkValue : ["idParam", "博士"],
				inputValue:typeValue,
				onSelect:function(node){
					var eduId = $("#alarmType").formSelect("getValue")[0];
					//var eduId = node.id;	
					//alert("eduId       "+eduId);
					$('#type').val(eduId); 
				}
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
		   
	   		  
	  } 
	  
	  

