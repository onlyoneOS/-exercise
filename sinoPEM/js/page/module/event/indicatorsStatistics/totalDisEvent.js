function load() {
		$(".tab-content").load(ctx+"/indicatorsStatistics/historyEvent?deviceId="+$('#deviceId').val());
		//设备生成的事件
		$("#event").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/indicatorsStatistics/historyEvent?deviceId="+$('#deviceId').val());
		});
		//设备数据查询
		$("#indicator").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/indicatorsStatistics/tempShowPage?deviceId="+$('#deviceId').val());
		});
		//设备数据查询
		$("#devicemonitor").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/show/master/realCollect?deviceId="+$('#deviceId').val());
		});
		 $('#reset').unbind('click').click(function () {
				window.open(ctx+"/show/master/master_main?roomName="+$('#roomName').val(),"_self");
		 });
	
	};
