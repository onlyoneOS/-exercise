	function loadDatagrid(){
		var searchType="";
	    if($('#roomId').val()!=null&&$('#roomId').val()!=''){
				searchType="room";
	    }else if($('#devId').val()!=null&&$('#devId').val()!=''){
				searchType="dev";
	    }
	    renderFusionCharts(searchType);
	}
	
	function renderFusionCharts(searchType){
		   $.ajax({	type : "GET",
				async : false,
				dataType : "text",
				url : ctx + "/eventDailyManageInfo/getRoomPieChartsXml?tmp="
				+ Math.random() + "&beginTime="
				+ $('#beginTime').val()+"&devType="
				+ $('#devType').val(),
				success : function(msg) {
				    var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/Pie2D.swf",  Math.random(), "282", "282","0","1");
			        chart.setXMLData(msg);				   
				    chart.render("chartContainer");
				}
			});
	
	}
function eventPie(){
		loadDatagrid();
	};
