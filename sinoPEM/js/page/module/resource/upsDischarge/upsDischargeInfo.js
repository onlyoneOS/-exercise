
	
	function loadAll() {
		//放电类型
		var $fieldUserState = $("#_dischargeType");
		$fieldUserState.addClass("li_form");
		var optionUserState = {
				inputName : "dischargeType",
				writeType : "show",
				showLabel : false,
				code : "dischargeType",
				width : "250"
		};
		$fieldUserState.formSelect(optionUserState);
		//终止方式
		var $fieldUserState = $("#_terminationWay");
		$fieldUserState.addClass("li_form");
		var optionUserState = {
			inputName : "terminationWay", 
			writeType : "show",
			showLabel : false, 
			code : "terminationWay",  
			width : "250"
		};
		$fieldUserState.formSelect(optionUserState);
		
		var url = ctx+"/upsDischargeBak/getUpsDischargeInfo";
		getUpsDischargeInfo(url);
		
		$(document).ready(function() {
				
		});
		
		//按条件查询UPS信息
		$("#queryUps").unbind("click").click(function() {
			queryUpsDischargeInfo();
		});
		
	}
	function queryUpsDischargeInfo(){
		var dischargeType = $("#_dischargeType").formSelect("getValue")[0];
		var terminationWay = $("#_terminationWay").formSelect("getValue")[0];
		var url = ctx+"/upsDischargeBak/getUpsDischargeInfo?dischargeType="+dischargeType+"&terminationWay="+terminationWay;
		getUpsDischargeInfo(url);
	}
	
	 function getUpsDischargeInfo(url){
		 $("#taskTable").dataTable().fnDestroy();
			table=$("#taskTable").dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource":url, 
				"bRetrieve": true,
				"bSort": false,
				"bLengthChange" : true,
				"bFilter" : false,
				"aoColumns": [
				              //{"mData": "UpsDeviceId"},
				              { "mData": "DeviceName"},
				              { "mData": "RoomName"},
				              { "mData": "BeginTime"},
				              { "mData": "EndTime"},
				              { "mData": "RemainTime","mRender":function(data){
				            	  var rstatus="";
				            	  var remainTime = data;
				            	  if(remainTime!=null){
				            		  rstatus=remainTime+"分钟";
				            		  return rstatus;
				            	  }else{
				            		  return rstatus;
				            	  }
							  }},
				              { "mData": "DischargeType","mRender":function(data){
								  var rstatus="";
				            	  var DischargeType = data;
				            	  if(DischargeType==1){
				            		  rstatus="手动放电";
				            		  return rstatus;
				            	  }else if(DischargeType==2){
				            		  rstatus="停电放电";
				            		  return rstatus;
				            	  }else{
				            		  return rstatus;
				            	  }
							  }},
							  { "mData": "DischargeNum"},
							  { "mData": "Stoptype","mRender":function(data){
								  var rstatus="";
				            	  var stoptype = data;
				            	  if(stoptype==1){
				            		  rstatus="策略终止";
				            		  return rstatus;
				            	  }else if(stoptype==2){
				            		  rstatus="网络中断";
				            		  return rstatus;
				            	  }else if(stoptype==3){
				            		  rstatus="手工终止";
				            		  return rstatus;
				            	  }else{
				            		  return rstatus;
				            	  }
							  }},
							  { "mData": "StopCondition","mRender":function(data){
								  var stopType="";
								  var type=data;
								  if(type=="dischargeTime"){
									  stopType="放电时间终止";
				            		  return stopType;
								  }else if(type=="upsBatteryVoltage"){
									  stopType="电池电压终止";
				            		  return stopType;
								  }else if(type=="upsBatteryCapacity"){
									  stopType="电池容量终止";
				            		  return stopType;
								  } else if(type=="powerRecovery"){
									  stopType="断电恢复";
				            		  return stopType;
								  }else{
									  stopType="没有满足策略";
				            		  return stopType;
								  }
							  }}
							  //,
							  //{ "mData": "RecordeTime" }
							  ],
	            "aoColumnDefs": [
					//{ "bSearchable": false, "bVisible": false, "aTargets": [ 1 ] } //隐藏第[ 1 ]列
				] ,
				"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "页显示_MENU_ 个数",
					"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					"sSearch":"检索:",
					"sEmptyTable":"没有数据",
					"sInfoEmpty": "显示0条数据",
					"oPaginate":{
						"sPrevious": "",
						"sNext":"" 
					}
				}
			
			});

	 }
	
	//时间插件
	function  getTime(object){
		object.datetimepicker({
			pickTime: false
		});
	}
