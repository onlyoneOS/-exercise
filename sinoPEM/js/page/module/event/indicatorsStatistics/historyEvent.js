function loadTemp(){
		$('.date').datetimepicker({
	    	pickTime: false
	    });
		 
		 $('#searchbtn').unbind('click').click(function () {
			 searchModelTable();
		});

		 var url =  ctx+"/eventConfirmData/getAllEventConfirm?deviceId="+$('#deviceId').val()+"&beginTime="+$('#beginTime').val()+"&endTime="+$('#endTime').val();
		 getIndicatorTableData(url);
		/* $('#taskTable_length').css("margin-top","-24px");
		 $('#taskTable_length').css("margin-left","-26px");*/
	};
	
	function  getIndicatorTableData(url){
		 		 
			$('#taskTable').dataTable().fnDestroy();
		    table = $('#taskTable').dataTable({
		    	"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
				"bPaginate":true,
				"bFilter":true,
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
	 	  			            
	 	  			              { "mData": "EventName"},	
	 	  			             // { "mData": "eventLevel"},	
	 	  			             
	 	  			              { "mData": "ProduceTime"},	
	 	  			              { "mData": "FrequentlyNum"},	
	 	  			              { "mData": "confirmTime"},	
	 	  			              { "mData": "EventContent"}				              
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
				}
			});
		    $('.dataTables_filter').empty();
//		    $('.bt5left').hide();
       }
	
	function searchModelTable(){
		
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		var deviceId=$('#_deviceId').val();
		var url =  ctx+"/eventConfirmData/getAllEventConfirm?deviceId="+$('#deviceId').val()+"&beginTime="+$('#beginTime').val()+"&endTime="+$('#endTime').val();
		getIndicatorTableData(url);
	
	}
	

	
