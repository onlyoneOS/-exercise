	
    var devicesel;
	 function loadAll(){

		getDeviceType();
		var roomIdfind = $('#roomIdfind').val();
		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		getRoomInfo(rUrl);
		getDevice("");
		getEventType("");
		geteventLevel();
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 var timeObject1 = $("#etime");
		 getTime(timeObject1);
		 
		var url = "";
		
	 		url = ctx + "/eventConfirmData/getAllEventConfirmDataInfo?activeEvent="+$('#activeEvent').val()+"&tmp=" + Math.random();
	     
		var $field = $("#taskTable");
		getAll_active(url);
		

	    //活动事件查询
	    $('#activeEvent').unbind('click').click(
    		function(){
    			if($('input:checkbox[name="compAnalysis"]:checked').val()!=0&&$('input:checkbox[name="compAnalysis1"]:checked').val()!=1){
    				$('#active_event').hide();
			    	$('#all_event').hide();
    			
    			}
    			else if($('input:checkbox[name="compAnalysis"]:checked').val()!=0){
    			
    				var url =  ctx + "/eventConfirmData/getAllEventConfirmDataInfo?historyEvent="+$('#historyEvent').val()+"&tmp=" +Math.random();
					getAll_history(url);
					
					}
    			else if($('input:checkbox[name="compAnalysis"]:checked').val()==0&&$('input:checkbox[name="compAnalysis1"]:checked').val()==1){
    				
    				url = ctx + "/eventConfirmData/getAllEventConfirmDataInfo?tmp=" + Math.random();
					getAll_active(url);
						
					}
    			else if($('input:checkbox[name="compAnalysis1"]:checked').val()!=1&&$('input:checkbox[name="compAnalysis"]:checked').val()==0){
    				var url =  ctx + "/eventConfirmData/getAllEventConfirmDataInfo?activeEvent="+$('#activeEvent').val()+"&tmp=" +Math.random();
					getAll_active(url);
    			}
			
    			
    		}
	    );
	    //历史事件查询
	    $('#historyEvent').unbind('click').click(
	    		function(){

	    			if($('input:checkbox[name="compAnalysis"]:checked').val()!=0&&$('input:checkbox[name="compAnalysis1"]:checked').val()!=1){
	    				$('#active_event').hide();
				    	$('#all_event').hide();
	    			
	    			}
	    			else if($('input:checkbox[name="compAnalysis1"]:checked').val()!=1){
	    				var url =  ctx + "/eventConfirmData/getAllEventConfirmDataInfo?activeEvent="+$('#activeEvent').val()+"&tmp=" +Math.random();
						getAll_active(url);
						
						}
	    			else if($('input:checkbox[name="compAnalysis"]:checked').val()==0&&$('input:checkbox[name="compAnalysis1"]:checked').val()==1){
	    				url = ctx + "/eventConfirmData/getAllEventConfirmDataInfo?tmp=" + Math.random();
						getAll_active(url);
							
						}
	    			else if($('input:checkbox[name="compAnalysis1"]:checked').val()==1&&$('input:checkbox[name="compAnalysis"]:checked').val()!=0){
	    				var url =  ctx + "/eventConfirmData/getAllEventConfirmDataInfo?historyEvent="+$('#historyEvent').val()+"&tmp=" +Math.random();
						getAll_history(url);
	    			}
				
	    		}
		    );
	    
	    
		// 查询
	    
		$('#searchbtn').unbind('click').click(
				function(){
					searchModelTable();
				}
		);
 
		//重置
		
		$('#resetbtn').unbind('click').click(
				function(){
					var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
					getRoomInfo(rUrl);
					getDevice("");
					getDeviceType();
					getEventType("");
					geteventLevel();
					
				/*	$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/eventConfirmData/manager?tmp=' + Math.random());
				*/
				}
		);
		
	    
	    function getAll_active(url){
	    	
	    	$('#active_event').hide();
	    	$('#all_event').show();
	    	
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
	  						   { "mData": "EventLevel","mRender": function (data,row,obj){
	  						  var rstatus = '';
	  						   if(data==5){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/event/red.png" title="故障" style="height:40px;margin-left:10px"/>';
	  						   }else if(data==4){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="重要" style="height:73px;"/>';
	  						   }else if(data==3){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/yellowalarm.png" title="警告" style="height:73px;"/>';
	  						   }else if(data==2){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="警告" style="height:40px;margin-left:10px"/>';
	  						   }else{
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/event/green.png" title="正常" style="height:40px;margin-left:10px"/>';
	  						   }
	  						   return rstatus;
	  						  }},
	  			              { "mData": "RoomName"},
	  			              { "mData": "DeviceName"},
	  			              { "mData": "EventName"},	
	  			             // { "mData": "eventLevel"},	
	  			             
	  			              { "mData": "ProduceTime"},	
	  			              { "mData": "FrequentlyNum"},	
	  			              { "mData": "confirmTime"},	
	  			              { "mData": "EventContent"}				              
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
	      }
	    
	    function getAll_history(url){
	    	$('#active_event').show();
	    	$('#all_event').hide();
	  		$('#taskTable1').dataTable().fnDestroy();
	  	    table1 = $('#taskTable1').dataTable({
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
	  						   { "mData": "EventLevel","mRender": function (data,row,obj){
	  						  var rstatus = '';
	  						   if(data==5){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/red.png" title="故障" style="height:40px;margin-left:10px"/>';
	  						   }else if(data==4){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="重要" style="height:73px;"/>';
	  						   }else if(data==3){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/yellowalarm.png" title="警告" style="height:73px;"/>';
	  						   }else if(data==2){
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="警告" style="height:40px;margin-left:10px"/>';
	  						   }else{
	  							   rstatus='<img src="'+ctx+'/images/roommonitor/green.png" title="正常" style="height:40px;margin-left:10px"/>';
	  						   }
	  						   return rstatus;
	  						  }},
	  			              { "mData": "RoomName"},
	  			              { "mData": "DeviceName"},
	  			              { "mData": "EventName"},	
	  			             // { "mData": "eventLevel"},	
	  			             
	  			              { "mData": "ProduceTime"},	
//	  			              { "mData": "FrequentlyNum"},	
	  			              { "mData": "confirmTime"},	
	  			              { "mData": "EventContent"}				              
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
	      }
	    //查询
	    function searchModelTable(){
	    	var url="";
	    	var roomNameId="";
	    	var activeEvent=$('#activeEvent').val();
	    	var historyEvent=$('#historyEvent').val();
	    	var roomName = $('#roomInfo').formSelect("getValue")[0];
	    	if(roomName=="all"){
	    		roomNameId="";
			  }else{
				roomNameId=roomName;
				  
			  }
	    	
//	    	 var deviceName = devicesel.getValue();
	    	var deviceName = $('#devNameId').val();
	    	var deviceType=$('#devTypeId').val();
	    	
//	    	var eventType=$('#eventTypeId').val();
	    	var eventType = $('#eventType').formSelect("getValue")[0];
	    
	    	var eventLevel=$('#eventLevelId').val();
	    	
			var beginTime = $("#beginTime").val();
			var endTime = $("#endTime").val();
			//历史事件
			if($('input:checkbox[name="compAnalysis"]:checked').val()!=0&&$('input:checkbox[name="compAnalysis1"]:checked').val()==1){
				
				url = ctx + "/eventConfirmData/getAllEventConfirm?historyEvent="+historyEvent+"&roomId="+roomNameId+"&deviceId="+deviceName+"&beginTime="+beginTime+"&endTime="+endTime+"&deviceTypeId="+deviceType+"&eventTypeId="+eventType+"&eventLevelId="+eventLevel;
				getAll_history(url);
			}
			
			//活动事件
			else if($('input:checkbox[name="compAnalysis1"]:checked').val()!=1&&$('input:checkbox[name="compAnalysis"]:checked').val()==0){
				url = ctx + "/eventConfirmData/getAllEventConfirm?activeEvent="+activeEvent+"&roomId="+roomNameId+"&deviceId="+deviceName+"&beginTime="+beginTime+"&endTime="+endTime+"&deviceTypeId="+deviceType+"&eventTypeId="+eventType+"&eventLevelId="+eventLevel;
				getAll_active(url);
			}
			
			//全选或都不选
			else if(($('input:checkbox[name="compAnalysis1"]:checked').val()==1&&$('input:checkbox[name="compAnalysis"]:checked').val()==0)||($('input:checkbox[name="compAnalysis1"]:checked').val()!=1&&$('input:checkbox[name="compAnalysis"]:checked').val()!=0)){
				if(roomNameId!=""||deviceName!=""||beginTime!=""||endTime!=""||deviceType!=""|| eventType!=""||eventLevel!=""){
				
					url = ctx + "/eventConfirmData/getAllEventConfirm?roomId="+roomNameId+"&deviceId="+deviceName+"&beginTime="+beginTime+"&endTime="+endTime+"&deviceTypeId="+deviceType+"&eventTypeId="+eventType+"&eventLevelId="+eventLevel;
				}else{
					
					url = ctx + "/eventConfirmData/getAllEventConfirmDataInfo?tmp=" + Math.random();
					
				}
				
				getAll_active(url);
			}
			
			
	    }

	
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
					var productTypeId = $("#deviceType").formSelect("getValue")[0];
					if(productTypeId==""){  //如果设备类型为空,则直接显示机房内所有设备!
						getDevice(id);
					}else{//否者,根据机房Id和设备类型过略显示设备
						getDeviceTwo(productTypeId);
						getEventType(productTypeId);
					}
					
					//$('#_roomId').val(id);
				}  
			   
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
				 
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
					$('#devNameId').val(id);
					getEventTypes(id);
				}
			};
			devicesel = $fieldCompDevType.formSelect(optionCompDevTypes);
			//$("#_device").formSelect('setValue',$('#_device .uicSelectData').find('ul').find('li').attr('infinityid'));
		}

	//加载设备类型
		function  getDeviceType(){
			$("#deviceType").empty();
			var $fieldDevType = $("#deviceType");	 		  
			$fieldDevType.addClass("li_form");
			var optionDevTypes = {
				inputName : "deviceTypeName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+'/base/productType/getProType',
				inputValue:"all",
				onSelect :function(id){
					$("#devTypeId").attr("value", id);
					getDeviceTwo(id);
					getEventType(id);
				}  
			   
			};
			$fieldDevType.formSelect(optionDevTypes);
		}
	 
	 function getDeviceTwo(id){
		 
		 	var roomName = $('#roomInfo').formSelect("getValue")[0];
		 	
	    	if(roomName=="all"){
	    		roomNameId="";
			  }else{
				roomNameId=roomName;
				  
			  }
		 
		 
			$("#_device").empty();
			var url = ctx + "/eventStatistics/getDeviceName?productTypeId="+id+"&roomId="+ roomNameId;
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
					$('#devNameId').val(id);
					getEventTypes(id);
				}
			};
			devicesel = $fieldCompDevType.formSelect(optionCompDevTypes);
			//$("#_device").formSelect('setValue',$('#_device .uicSelectData').find('ul').find('li').attr('infinityid'));
		}
	 /**
	  * 事件类型:
	  */
	 function getEventType(id){
			$("#eventType").empty();
			var url = ctx + "/eventStatistics/getEventType?eventTypeId="+id;
			var $fieldCompDevType = $("#eventType");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "eventTypeName",
				writeType : 'show',
				showLabel : false,
				width:"250", //高度
				url : url,
				onSelect :function(id,obj){
					//getIndicator(id);
					$('#eventTypeId').val(id);
				}
			};
			eventTypesel = $fieldCompDevType.formSelect(optionCompDevTypes);
			//$("#_device").formSelect('setValue',$('#_device .uicSelectData').find('ul').find('li').attr('infinityid'));
		}
	 /**
	  * 依据设备名称选事件类型
	  */
	 function getEventTypes(id){
			$("#eventType").empty();
			
			var url = ctx + "/eventStatistics/getEventType?deviceId="+id+"&eventTypeId="+$('#devTypeId').val();
			var $fieldCompDevType = $("#eventType");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "eventTypeName",
				writeType : 'show',
				showLabel : false,
				width:"250", //高度
				url : url,
				onSelect :function(id,obj){
					//getIndicator(id);
//					$('#eventTypeId').val(id);
				}
			};
			 $fieldCompDevType.formSelect(optionCompDevTypes);
			//$("#_device").formSelect('setValue',$('#_device .uicSelectData').find('ul').find('li').attr('infinityid'));
		}
	 
	 /**
	  * 事件级别
	  */
	 function  geteventLevel(){
		 
			$('#eventLevel').empty();
			var $fieldCompDevType = $("#eventLevel");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "eventLevelName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+"/js/page/module/event/eventLevel.json",
				inputValue:"all",
				onSelect :function(id){
//					getDeviceTwo(id);
					
					$('#eventLevelId').val(id);
				}  
			   
			};
			eventLevelsel =$fieldCompDevType.formSelect(optionCompDevTypes);
				 
	 }
	 
		  /**
		   *  时间插件
		   */
	      function  getTime(object){
	     	  
	     	  object.datetimepicker({ 
	     	
	     	        pickTime: false
	     	 
	     	      }); 

	      }
	      
	    
