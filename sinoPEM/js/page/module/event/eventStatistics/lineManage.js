function loadLinemanage(){
		loadDatagrid();
	};
	var dod="";
	function loadDatagrid(){
		$(".date").datetimepicker({
			pickTime: false
		});
		var id=getRoom();
		getDevice(id);
		//导出Excel
		$("#_sino_partner_line_excel").unbind("click").click(function () {
			var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var deviceId = $("#_device").formSelect("getValue")[0];
			if(startTime == null||startTime == ""){
				$.messager.alert("提示","请输入开始时间!");
				return;
			}
			if(endTime == null||endTime == ""){
				$.messager.alert("提示","请输入结束时间!");
				return;
			}
			if(deviceId == null||deviceId == ""){
				$.messager.alert("提示","请选择设备!");
				return;
			}
	    	sino_excel(startTime,endTime,deviceId);
	    });
		//查询
	    $("#_sino_partner_line_search").unbind("click").click(function () {
	    	var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var roomId = $("#_roomId").val();
			var deviceId = $("#_device").formSelect("getValue")[0];
			if(startTime == null||startTime == ""){
				$.messager.alert("提示","请输入开始时间!");
				return;
			}
			if(endTime == null||endTime == ""){
				$.messager.alert("提示","请输入结束时间!");
				return;
			}
			if(deviceId == null||deviceId == ""){
				$.messager.alert("提示","请选择设备!");
				return;
			}
	    	renderFusionCharts(startTime,endTime,deviceId);
	    });
	    renderFusionCharts(startTime,endTime,dod);
	}
	
	function getRoom(){
		var rUrl = ctx+"/roomDevice/getAllRoomInfo";
		var room="";
		 $('#roomId').empty();
			var $fieldCompDevType = $("#roomId");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : rUrl,
				inputValue:"all",
				onSelect :function(id){
					  getDevice(id);
				}  
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			
			var roomId = "";
			$("#roomId").find("ul li").each(function(i,ele){
				if(i == 1){
					var obj = $(ele);
					roomId = obj.attr("infinityid");
					room=roomId;
				}
			});
			$("#roomId").formSelect('setValue',roomId);
			return room;
		
	}
	
	function getDevice(id){
		$("#_device").empty();
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#_device");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		var sid=$("#_device .uicSelectData").find("ul").find("li").attr("infinityid");
		if(sid!=undefined){
			dod=sid;
			$("#_device").formSelect("setValue",sid);
		}
		
	}
	
	function sino_excel(startTime,endTime,deviceId){
		var url = ctx + "/eventStatistics/sino_excel?startTime="+startTime+"&endTime="+endTime+"&deviceId="+deviceId;
		window.location.href= url;
	}
	
	function renderFusionCharts(startTime,endTime,deviceId){
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		var roomId = $("#_roomId").val();
		var deviceId = $("#_device").formSelect("getValue")[0];
		/**
		*highCharts曲线图
		*/
		$.ajax({
			type:'GET',
			async:false,
			dataType:'json',
			url:ctx+"/eventStatistics/getSingleDeviceEventCharts?tmp="+Math.random()+"&startTime="+startTime+"&endTime="+endTime+"&roomId="+roomId+"&deviceId="+deviceId,
			success:function(msg){
				if(null!=msg){
					$('#_sino_eventStatistics_div').highcharts({
						chart: msg.chart,
						title: msg.title,
						subtitle: msg.subtitle,
						xAxis: {
							categories: msg.xAxis.categories
						},
						yAxis: msg.yAxis,
						tooltip: {
							enabled: 'false',
							formatter: function() {
								return '<b>'+ this.series.name +'</b><br/>'+this.x +': '+ this.y +'°C';
							}
						},
						plotOptions: {
							line: {
								dataLabels: {
									enabled: true
								},
								enableMouseTracking: false
							}
						},
						series: msg.series
					});
				}
			}
		});
		
	}
	
