
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
		var surl=""
		if(searchType=='room'){
			surl= ctx+"/eventStatistics/getRoomChart4PieXml?tmp="+Math.random()+"&roomId="+$('#roomId').val()+"&startTime="+$('#startTime').val()+"&endTime="+$('#endTime').val();
		}else if(searchType=='dev'){
			surl= ctx+"/eventStatistics/getDevChart4PieXml?tmp="+Math.random()+"&devId="+$('#devId').val()+"&startTime="+$('#startTime').val()+"&endTime="+$('#endTime').val();
		}
		   $.ajax({
				type : "GET",
				async : false,
				dataType : "text",
				url :surl,
				success : function(msg) {
				    var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/Pie2D.swf",  Math.random(), "282", "282","0","1");
			        chart.setXMLData(msg);				   
				    chart.render("chartContainer");
				}
			});
	
	}
function dailyLoad(){
		loadDatagrid();
	};
