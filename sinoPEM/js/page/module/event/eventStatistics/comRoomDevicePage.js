	function loadDatagrid() {
		$('.date').datetimepicker({
			viewMode:1,
    		minViewMode:1,
	    	pickTime: false
		});
		$('#_sino_partner_line_search').unbind('click').click(function() {
			renderFusionCharts();
			getComPareTableData();
		});
		$('#_sino_partner_line_search_back').unbind('click').click(function() {
			$('#edit_list').empty();
			var url = ctx+"/eventStatistics/compareManage";
			$('#edit_list').load(url,function(){
			});
		});
		
		$('#back').unbind('click').click(function() {
			$('#edit_list').empty();
			var url = ctx+"/eventStatistics/compareManage";
			$('#edit_list').load(url,function(){
			});
		});
		renderFusionCharts();
		getComPareTableData();
	}



	function renderFusionCharts() {
		var roomName = $('#_roomName').val();
		var url = ctx + "/eventStatistics/getComRoomDeviceXml?tmp="+ Math.random() + "&startTime="+$('#startTime').val()+"&roomName="+roomName;
		var urlA = encodeURI(encodeURI(url));
		$.ajax({
					type : "GET",
					async : false,
					dataType : "text",
					url : urlA,
					success : function(msg) {
						$('#_sino_eventStatistics_div').empty();
						var chart = new FusionCharts(ctx+ "/js/plugins/FusionCharts_XTV3.2/swf/MSCombiDY2D.swf",Math.random(), "94%", "400", "0", "1");
						chart.setXMLData(msg);
						chart.render("_sino_eventStatistics_div");
					}
				});

	}
	
	function getComPareTableData(){
		var startTime = $('#startTime').val();
		var roomName = $('#_roomName').val();
		var url =  ctx+"/eventStatistics/getComRoomDeviceData?startTime="+startTime+"&roomName="+roomName;		 
		var urlA = encodeURI(encodeURI(url));
		$('#taskTable').dataTable().fnDestroy();
	    table = $('#taskTable').dataTable({
	    	"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":true,
			"bDestroy": true,
			"bSort": false,
			"bPaginate" : false,
			"bInfo" : false,
			"bFilter":true,
			"sAjaxSource":urlA, 
			"bRetrieve": true,
			"sServerMethod": "POST",
			"aoColumns": [
			              { "mData": "DeviceName"},
			              { "mData": "curMon"},
			              { "mData": "lastMon"}, 
			              { "mData": "lastyear"},
			              { "mData": "c1","mRender": function (data,row,obj){
			            	  var rstatus = '';
			            	  if(obj.c1 == null||obj.c1 == ""){
			            		  rstatus = 0+"%";
			            	  } else {
			            		  rstatus+=obj.c1+"%"; 
			            	  }
          		              return rstatus;
			              }},
			              { "mData": "c2","mRender": function (data,row,obj){
			            	  var rstatus = '';
			            	  if(obj.c2 == null||obj.c2 == ""){
			            		  rstatus = 0+"%";
			            	  } else {
			            		  rstatus+=obj.c2+"%"; 
			            	  }
          		              return rstatus;
			              }}			              
			          ],
			          fnDrawCallback:function(){
			        	  var tCurMon = 0;
			        	  var tLastMon = 0;
			        	  var tLastyear = 0;
			        	  $("#taskTable tbody").find("tr").each(function(i,ele){
			        		  $(this).find("td").each(function(j,elem){
			        			  if(j == 1){
			        				  tCurMon+=Number($(this).html());
			        			  }
			        			  if(j == 2){
			        				  tLastMon+=Number($(this).html());
			        			  }
			        			  if(j == 3){
			        				  tLastyear+=Number($(this).html());
			        			  }
			        		  });
			        	  });
			        	  totalFun(tCurMon,tLastMon,tLastyear);
			          }
		});
	    $('.dataTables_filter').empty();
	}
	
	function totalFun(tCurMon,tLastMon,tLastyear){
		var c1 = ((tCurMon - tLastMon)/tCurMon).toFixed(2)*100+"%";
		var c2 = ((tCurMon - tLastyear)/tCurMon).toFixed(2)*100+"%";
		if(c1 == 'NaN%'){
			c1 = "0%";
		}
		if(c2 == 'NaN%'){
			c2 = "0%";
		}
		var buffer = new StringBuffer();
		buffer.append('<tr style="">');
		buffer.append('<td class="" style="">合计:</td>');
		buffer.append('<td class="">'+tCurMon+'</td>');
		buffer.append('<td class="">'+tLastMon+'</td>');
		buffer.append('<td class="">'+tLastMon+'</td>');
		buffer.append('<td class="">'+c1+'</td>');
		buffer.append('<td class="">'+c2+'</td>');
		buffer.append('</tr>');
		$("#taskTable tbody").append(buffer.toString());
	}
 function loadRoomDevice() {
		loadDatagrid();
	};
