
 function  loadAll(){

	    
	  //提交表单	     
	   $("#addSite").unbind('click').click(function(){	
		   var ty=$('#type').val();
		   var ta=$("#alarmTarget").val();
		   var alarmId=$("#alarmId").val();
			  var url = ctx+"/alarmInfo/addAlarmInfo?alarmId="+alarmId;	
			   $("#addForm").ajaxSubmit({
					  url:url,
					  type:"post",
					  success : function(re){
						var pUrl = ctx+"/alarmInfo/alarmInfoManagePage" ;
						$("#myModal1").modal('hide');
						$('#edit_list').empty();
						$('#edit_list').load(pUrl);
					  }
				 });
	   });
	   
	   $("#cancel").unbind('click').click(function(){
		   var ur=ctx + '/alarmInfo/alarmInfoManagePage?tmp=' + Math.random()
			$('#edit_list').load(ur);
	   })
	   	   
		 //获取告警类型
		 getAlarmInfoType();

  };
  
  
  
    /**
	  *  获取告警具体方式
	  */
	  function  getAlarmInfoType(){
		    var  typeValue = $("#type").val();
		    var way=$("#val").val();
		    var alarmInfoTypeUrl = ctx +"/alarmInfo/getAlarmType?val="+way;
			$('#alarmType').empty();
			var $fieldCompDevType = $("#alarmType");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				//inputName : "education",
				writeType : 'show',
				width: "280", //高度
				showLabel : false,
				url : alarmInfoTypeUrl,
				inputValue:typeValue,
				onSelect:function(node){
					var eduId = $("#alarmType").formSelect("getValue")[0];
					$('#type').val(eduId); 
				}
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			var alway=$("#alway").val();
			$fieldCompDevType.formSelect("setValue",''+alway+'');
	  } 
