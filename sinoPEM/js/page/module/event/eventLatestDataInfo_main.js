
    var roomsel,devicesel;
	 function  loadAll(){
		var roomIdfind = $('#roomIdfind').val();
		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		getRoomInfo(rUrl);
		getDevice("");
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 var timeObject1 = $("#etime");
		 getTime(timeObject1);
		 
		var url = "";
		if(roomIdfind != null){
			url = ctx + "/eventLatestDataInfo/getAllEventLatestDataInfo?roomIdfind="+roomIdfind+"&tmp=" + Math.random();
	     }else{
	 		url = ctx + "/eventLatestDataInfo/getAllEventLatestDataInfo?tmp=" + Math.random();
	     }
		var $field = $("#taskTable");

		
		
		$('#taskTable').dataTable().fnDestroy();
	    table = $('#taskTable').dataTable({
	    	"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":false,
			"bDestroy": true,
			"bSort": false,
			"bFilter":false,
			"sAjaxSource":url, 
			"bRetrieve": true,
			"sServerMethod": "POST",
			"aoColumns": [
						   { "mData": "eventLevel","mRender": function (data,row,obj){
						  var rstatus = '';
						   if(data==5){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/red.png" title="故障" style="height:40px;margin-left:10px"/>';
						   }else if(data==4){
							   rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="重要" style="height:40px;margin-left:10px"/>';
						   }else if(data==3){
							   rstatus='<img src="'+ctx+'/images/roommonitor/yellowalarm.png" title="警告" style="height:40px;margin-left:10px"/>';
						   }else if(data==2){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="警告" style="height:40px;margin-left:10px"/>';
						   }else{
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/green.png" title="正常" style="height:40px;margin-left:10px"/>';
						   }
						   return rstatus;
						  }},
			              { "mData": "roomName"},
			              { "mData": "deviceName"},
			              { "mData": "eventName"},	
			             // { "mData": "eventLevel"},	
			              { "mData": "produceTimeString"},	
			              { "mData": "frequentlyNum"},	
			              { "mData": "lastProduceTimeString"},	
			              { "mData": "eventContent"}				              
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
					"sNext":'下一页'
				}
			}
		});

		// 查询
		$('#searchbtn').unbind('click').click(
				function() {
				//	alert(1);
					var url =  ctx + "/eventLatestDataInfo/getAllEventLatestDataInfo?tmp=" +Math.random();
				    var roomName = roomsel.getValue();
				    var deviceName = devicesel.getValue();
				    var beginTime = $("#beginTime").val();
				    var endTime = $("#endTime").val();
				 //   alert(roomName+"|"+deviceName+"|"+beginTime+"|"+endTime);
				    if(roomName!="all"){
				    	url=url+"&roomName="+roomName;
				    }
				    if(deviceName!=""){
				    	url=url+"&deviceName="+deviceName;
				    }
				    if(beginTime!=""){
				    	url=url+"&beginTime="+beginTime;
				    }
				    if(endTime!=""){
				    	url=url+"&endTime="+endTime;
				    }
				    
				    
				    $('#taskTable').dataTable().fnDestroy();
				    table = $('#taskTable').dataTable({
				    	"bProcessing": true,
						"bServerSide": true,
						"bLengthChange":false,
						"bDestroy": true,
						"bSort": false,
						"bFilter":false,
						"sAjaxSource":url, 
						"bRetrieve": true,
						"sServerMethod": "POST",
						"aoColumns": [
									   { "mData": "eventLevel","mRender": function (data,row,obj){
									  var rstatus = '';
									   if(data==5){
										   rstatus='<img src="'+ctx+'/images/roommonitor/event/red.png" title="故障" style="height:40px;margin-left:10px"/>';
									   }else if(data==4){
										   rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="重要" style="height:40px;margin-left:10px"/>';
									   }else if(data==3){
										   rstatus='<img src="'+ctx+'/images/roommonitor/yellowalarm.png" title="警告" style="height:40px;margin-left:10px"/>';
									   }else if(data==2){
										   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="警告" style="height:40px;margin-left:10px"/>';
									   }else{
										   rstatus='<img src="'+ctx+'/images/roommonitor/event/green.png" title="正常" style="height:40px;margin-left:10px"/>';
									   }
									   return rstatus;
									  }},
						              { "mData": "roomName"},
						              { "mData": "deviceName"},
						              { "mData": "eventName"},	
						             // { "mData": "eventLevel"},	
						              { "mData": "produceTimeString"},	
						              { "mData": "frequentlyNum"},	
						              { "mData": "lastProduceTimeString"},	
						              { "mData": "eventContent"}				              
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
								"sNext":'下一页'
							}
						}
					});
				});

	};

	/**
	 *  获取所有机房信息
	 */
	 function  getRoomInfo(roomUrl){
		   
			$('#roomInfo').empty();
			var $fieldCompDevType = $("#roomInfo");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : roomUrl,
				inputValue:"all",
				onSelect :function(id){
					getDevice(id);
					//$('#_roomId').val(id);
				}  
			   
			};
			roomsel =$fieldCompDevType.formSelect(optionCompDevTypes);
				 
	 }
	 
	 function getDevice(id){
			$("#_device").empty();
			var url = ctx + "/eventStatistics/getDevice?roomId="+id;
			var $fieldCompDevType = $("#_device");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "deviceName",
				writeType : 'show',
				showLabel : false,
				width:"250", //高度
				url : url,
				onSelect :function(id,obj){
					//getIndicator(id);
				}
			};
			devicesel = $fieldCompDevType.formSelect(optionCompDevTypes);
			//$("#_device").formSelect('setValue',$('#_device .uicSelectData').find('ul').find('li').attr('infinityid'));
		}
	 
	  /**
	     *  时间插件
	     */
	      function  getTime(object){
	     	  
	     	  object.datetimepicker({ 
	     	       // format: 'yyyy-MM-dd', 
	     	       // format:'MM/dd/yyyy hh:mm',
	     	      //  language: 'en', 
	     	      //  pickDate: true, 
	     	        pickTime: false
	     	      //  hourStep: 1, 
	     	      //  minuteStep: 15, 
	     	      //  secondStep: 30, 
	     	      //  inputMask: true,
	     	 
	     	      }); 

	      }
