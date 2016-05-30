	function loadDatagrid(){
		if(window.opener != null){
			var startTime = window.opener.document.getElementById('startTime').value;
			var endTime = window.opener.document.getElementById('endTime').value;
			$('#startTime').val(startTime);
			$('#endTime').val(endTime);
		}
		$('.date').datetimepicker({
	    	pickTime: false
	    });
	    $('#_sino_partner_line_search').unbind('click').click(function () {
	    	search();
	    });
//	    renderFusionCharts();
	    search();
	}
	
	function renderFusionCharts(){
		$.ajax({
			type : "GET",
			async : false,
			dataType : "text",
			url : ctx+"/eventStatistics/getDeviceEventXml?roomId="+$('#_roomId').val(),
			success : function(msg) {
				$('#_sino_eventStatistics_div').empty();
				var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/StackedColumn3D.swf", Math.random(), "90%", "400","0","1");
				   chart.setXMLData(msg);		   
				   chart.render("_sino_eventStatistics_div");
			}
		});
//		var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/MSCombi3D.swf", "ChartId", "90%", "400","0","1");
//		   chart.setXMLUrl(ctx+"/eventStatistics/getDeviceEventXml?roomId="+$('#_roomId').val());		   
//		   chart.render("_sino_eventStatistics_div");
	}
	function search(){
		var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/StackedColumn3D.swf", Math.random(), "90%", "400","0","1");
		var url = ctx+"/eventStatistics/getDeviceEventXml?roomId="+$('#_roomId').val();
		var startTime = $('#startTime').val();
		var endTime = $('#endTime').val();
		
		if(startTime != null&&endTime != null){
			url+="&startTime="+startTime+"&endTime="+endTime;
		} else if(startTime != null){
			url+="&startTime="+startTime;
		} else if(endTime != null){
			url+="&endTime="+endTime;
		}
		
		$.ajax({
			type : "GET",
			async : false,
			dataType : "text",
			url : url,
			success : function(msg) {
				   chart.setXMLData(msg);		   
			}
		});
		
		//chart.setXMLUrl(url);		   
		chart.render("_sino_eventStatistics_div");
	}
	function _remove(){
		var selections = $("#_sino_partner_datagrid").datagrid('getSelections');
		if(selections.length <= 0){
			$.messager.alert('提示','请选择数据!');
			return;
		}
		var id = '';
		for(var i = 0;i < selections.length;i++){
			id+=selections[i].id+",";
		}
		$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
			if (r){
				$.ajax({
					url: ctx+"/base/partnerInfo/remove?id="+id,  // 提交的页面
		            data: "", // 从表单中获取数据
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	//$.messager.alert('提示','删除成功!');
		            	$('#_sino_partner_datagrid').datagrid('reload');
		            	
		            }
				});
			}
		});
	}
	
function deviceEvent(){
		loadDatagrid();
	}
