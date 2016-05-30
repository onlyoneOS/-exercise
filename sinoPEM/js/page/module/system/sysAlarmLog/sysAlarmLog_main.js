
	 function  getAllAlarmLog(){
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 var timeObject1 = $("#etime");
		 getTime(timeObject1);
		 
		 getDeviceType();
		 
		 var url =  ctx+"/sysAlarmLog/queryAllAlarmLog";	
		 getAlarmLog(url);
		 function getAlarmLog(url){
			 
			 $('#taskTable').dataTable().fnDestroy();
			    $('#taskTable').dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"bLengthChange":true,
					"bDestroy": true,
					"bSort": false,
				//	"bStateSave":false,
					"bFilter":false,
					"sAjaxSource":url, 
					//"fnServerData": fnDataTablesPipeline,
					"bRetrieve": true,
					"aoColumns": [
					              { "mData": "alarmTitle"},
					              { "mData": "alarmTypeString"},
					              { "mData": "alarmContent"},	 
					              { "mData": "alarmTarget"},
					              { "mData": "sendStatusString"},
					              { "mData": "alarmTimeString"},
					              { "mData": "remark"}
					              
					          ],
					"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
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
		
					},
					/*
					 * 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
					*/
					fnDrawCallback:function(){
					
						$('a[name="modibutton"]').unbind('click').click(function () {
							
							var mid =this.id;
							modiAlarmInfo(mid);
		
						});
						$('a[name="delbutton"]').unbind('click').click(function () {
						//	alert("del");
							var mid =this.id;
							delAlarmInfo(mid);
						});

					}
			
				
				});
			 
		 }
			
		    
	  /**
	   *  时间插件
	   */
      function  getTime(object){
     	  
     	  object.datetimepicker({ 
     	
     	        pickTime: false
     	 
     	      }); 

      }
      
  	//加载告警类型
		function  getDeviceType(){
			$("#deviceType").empty();
			var $fieldDevType = $("#alarmType");	 		  
			$fieldDevType.addClass("li_form");
			var optionDevTypes = {
				inputName : "deviceTypeName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+'/sysAlarmLog/getAlarmType',
				inputValue:"all",
				onSelect :function(id){
					$("#alarmType").attr("value", id);
					
				}  
			   
			};
			$fieldDevType.formSelect(optionDevTypes);
		}
		
	// 查询
	    
		$('#searchbtn').unbind('click').click(
			function(){
				searchModelTable();
			}
		);
					
		//查询
		function searchModelTable(){
			var alarmType = $('#alarmType').formSelect("getValue")[0];
			var beginTime = $("#beginTime").val();
			var endTime = $("#endTime").val();
			
			var murl=ctx+"/sysAlarmLog/queryAllAlarmLog?beginTime="+beginTime+"&endTime="+endTime+"&alarmType="+alarmType;	
			getAlarmLog(murl);
		}
		
 }
	 
			
	    
	 


  


 

