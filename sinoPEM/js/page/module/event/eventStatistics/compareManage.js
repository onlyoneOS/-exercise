	function loadDatagrid() {
		$(".date").datetimepicker({
			viewMode:1,
    		minViewMode:1,
	    	pickTime: false
		});
		//导出Excel
		$("#_sino_partner_line_excel").unbind("click").click(function() {
			sino_excel();
		});
		$("#_sino_partner_line_search").unbind("click").click(function() {
			renderFusionCharts();
			getComPareTableData();
		});
		renderFusionCharts();
		getComPareTableData();
	}


	function exportPage() {
		
		var url = ctx + "/eventStatistics/exportExcel?tmp="
		+ Math.random() + "&startTime="
		+ $("#startTime").val() + "&endTime="
		+ $("#endTime").val() + "&exportId="
		+ $("#_exportId").val();
		window.location.href= url;
	}
	
	//导出Excel
	function sino_excel(){
		var startTime = $("#startTime").val();
		var url="";
		if(startTime!=null&&startTime!=""){
			url = ctx + "/eventStatistics/sinoExcel?tmp="+Math.random()+"&startTime="+startTime;
		}
		window.location.href= url;
	}

	function renderFusionCharts() {
		
		/**
		*HighChart事件对比报表
		*/
		$.ajax({
			type:'GET',
			async:'false',
			dataType:'json',
			url:ctx + "/eventStatistics/getCompareHighCharts?tmp="+ Math.random() + "&startTime="+ $("#startTime").val(),
			success:function(msg){
				$('#_sino_eventStatistics_div').highcharts({
					chart: msg.chart,
					title: msg.title,
					subtitle: msg.subtitle,
					xAxis: msg.xAxis,
					yAxis: msg.yAxis,
					tooltip: msg.tooltip,
					plotOptions:msg.plotOptions,
					series: msg.series
				});
			}
		});
	}
	
	function getComPareTableData(){
		var startTime = $("#startTime").val();
		var url =  ctx+"/eventStatistics/getComPareTableData?startTime="+startTime;		 
		$("#taskTable").dataTable().fnDestroy();
	    table = $("#taskTable").dataTable({
	    	"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":true,
			"bDestroy": true,
			"bSort": false,
			"bPaginate" : false,
			"bInfo" : false,
			"bFilter":true,
			"sAjaxSource":url, 
			"bRetrieve": true,
			"sServerMethod": "POST",
			"aoColumns": [
			              { "mData": "roomName","mRender": function (data,row,obj){
			            	  var rstatus = "";
			            	  rstatus+="<a href='#' name='_roomName' aName='"+obj.roomName+"'>"+obj.roomName+"</a>";
			            	  return rstatus;
			              }},
			              { "mData": "curMon"},
			              { "mData": "lastMon"}, 
			              { "mData": "lastyear"},
			              { "mData": "c1","mRender": function (data,row,obj){
			            	  var rstatus = "";
			            	  if(obj.c1 == null||obj.c1 == ""){
			            		  rstatus = 0+"%";
			            	  } else {
			            		  rstatus+=obj.c1+"%"; 
			            	  }
          		              return rstatus;
			              }},
			              { "mData": "c2","mRender": function (data,row,obj){
			            	  var rstatus = "";
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
			        	  
			        	  $('a[name="_roomName"]').unbind("click").click(function () {
								var roomName = $(this).attr("aName");
								devTypeDetailInfo(roomName);
						});
			          }
	    
		});
	    $(".dataTables_filter").empty();
	}
	
	function devTypeDetailInfo(roomName){
		var  startTime= $("#startTime").val();
		var url = ctx+"/eventStatistics/getComRoomDevicePage?roomName="+roomName+"&startTime="+startTime;
		var murl = encodeURI(encodeURI(url));
		$("#edit_list").empty();
		$("#edit_list").load(murl,function(){
			
		});
	}
	
	function totalFun(tCurMon,tLastMon,tLastyear){
		var c1 = ((tCurMon - tLastMon)/tCurMon).toFixed(2)*100+"%";
		var c2 = ((tCurMon - tLastyear)/tCurMon).toFixed(2)*100+"%";
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
 function loadCompare() {
		loadDatagrid();
	};
