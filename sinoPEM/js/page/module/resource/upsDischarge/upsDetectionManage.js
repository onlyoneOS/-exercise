 function loadUpsDetection(){
		load();  
		$("#reset").unbind('click').click(function(){
			$("#edit_list").empty();
			$("#edit_list").load(ctx+"/upsDischargeBak/upsDischargeManage");
		})
	};
	
	function load(){
		var upsIds=$("#upsIds").val();
		var url = ctx+"/upsDischarge/upsDetection?upsIds=" + upsIds;
		table = $("#taskTable").dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":false,
			"bDestroy": true,
			"bSort": false,
			"bPaginate" : false,
			"bInfo" : false,
			"bFilter":false,
			"sAjaxSource":url, 
			"bRetrieve": true,
			  "bSort" : true,
			"sServerMethod": "POST",
			"aoColumns": [
			              {"mData": "devId", "mRender": function(data,type,obj){
			            	  var ids = data.split("_");	
							  var isCheck = "";
							   if(ids.length>=2){
								   isCheck = "<input name='more' type='checkbox'  value='"+ids[0]+"_no' id='"+ids[0]+"'/><input name='no' type='hidden' />";
							   }else{
								   isCheck = "<input name='more' type='checkbox' value='"+ids+"' id='"+ids+"'/>"; 
						  	   
							   }				            	   
							   return  isCheck;
			              }},
			              { "mData": "roomName"},
			              { "mData": "upsName"},
			              { "mData": "upsStatus","mRender":function(data){
							  var rstatus="";
			            	  var status = data;
			            	  if(status==2){
			            		  rstatus="在线式";
			            	  }else if(status==3){
			            		  rstatus="处于电池状态";
			            	  }else if(status==5){
			            		  rstatus="睡眠";
			            	  }else if(status==6){
			            		  rstatus="旁路";
			            	  }else if(status==7){
			            		  rstatus="重启";
			            	  }else{
			            		  rstatus="未知状态";
			            	  }
			            	  return rstatus;
						  }},
			              { "mData": "batteryStatue","mRender":function(data){
							  var rstatus="";
			            	  var battery = data;
			            	  if(battery==2){
			            		  rstatus="正常";
			            	  }else if(battery==3){
			            		  rstatus="欠压";
			            	  }else{
			            		  rstatus="未知状态";
			            	  }
			            	  return rstatus;
						  }},	
			              { "mData": "upsBatteryVoltage","mRender":function(data){
							  var rstatus="";
			            	  var batteryVoltage = data;
			            	  if(batteryVoltage!=null){
			            		  rstatus=batteryVoltage/10+"V";
			            		  return rstatus;
			            	  }else{
			            		  return rstatus;
			            	  }
						  }},
			              { "mData": "upsBatteryCapacity","mRender":function(data){
							  var rstatus="";
			            	  var batteryCapacity = data;
			            	  if(batteryCapacity!=null){
			            		  rstatus=batteryCapacity+"%";
			            		  return rstatus;
			            	  }else{
			            		  return rstatus;
			            	  }
						  }},
			              { "mData": "endTime"}
						  ],
			              "sDom": "<'row'<l><'bt5right'f>r>t<'row'<i><'bt5right'p>>",
			              "sPaginationType": "bootstrap",
			              "oLanguage": {
			            	  "sLengthMenu": "页显示_MENU_ 个数",
			            	  "sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
			            	  "sSearch":"检索:",
			            	  "sEmptyTable":"没有数据",
			            	  "sInfoEmpty": "显示0条数据",
			            	  "oPaginate":{
			            		  "sPrevious": "上一页",
			            		  "sNext":"下一页"
			            	  }
			              },
			              fnDrawCallback:function(){
			            	  $("input[name='no']").parent().parent().css("color","red");
			              }
		});
		
		$("input[name='more']").unbind("click").click(function () {
			var mid =this.ids[0];
			//alert(mid);
		});
		
		//选中要放电的UPS
		$("#beganDischarge").unbind("click").click(function() {
			dischargeMore();
		});
	
	}
	
	function  dischargeMore(){
		var  ids = new Array();
		$('input[name="more"]').each(function(){
			var data = $(this);
			if(data.attr("checked")=="checked"){
				var id = data.val().split(",");
				ids.push(id[0]);
			}
		});
		if(ids.length==0){
			alert("请选择要放电的UPS！");
			return;
		}
		for(var i=0;i<ids.length;i++){
			var upsid = ids[i];
			if(upsid.split("_").length>=2){
				alert("红色字体UPS不满足放电操作，请重新选择！");
				return;
			}
		}
		var url = ctx+"/upsDischargeBak/upsStartDischarge?ids=" + ids;
		//$("#edit_list").empty();
		$("#edit_list").load(url, function(){
			
		});
		alert("已经开始放电，请进入“放电状态监控”页面查看放电状态！");
		var url = ctx+"/upsDischargeBak/upsMonitoringManage";
		$("#edit_list").load(url, function(){
			
		});
		
	}
	
