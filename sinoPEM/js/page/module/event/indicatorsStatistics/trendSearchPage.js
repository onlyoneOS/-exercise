function loadDataGrid(){
		loadDatagrid();
	};
	   var devNormId="";
	function loadDatagrid(){
		$(".date").datetimepicker({
	    	pickTime: false
	    });
		$("#_sino_partner_line_excel").unbind("click").click(function () {
			var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var deviceId = $("#_device").formSelect("getValue")[0];
			var devNormId = $("#_indicator").formSelect("getValue")[0];
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
			if(devNormId == null||devNormId == ""){
				$.messager.alert("提示","请选择指标!");
				return;
			}
	    	sino_excel(startTime,endTime,deviceId,devNormId);
	    });
	    $("#_sino_partner_line_search").unbind("click").click(function () {
	    	var startTime = $("#startTime").val();
			var endTime = $("#endTime").val();
			var deviceId = $("#_device").formSelect("getValue")[0];
			var devNormId = $("#_indicator").formSelect("getValue")[0];
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
			if(devNormId == null||devNormId == ""){
				$.messager.alert("提示","请选择指标!");
				return;
			}
	    	renderFusionCharts(startTime,endTime,deviceId,devNormId);
	    });
	   var id= getRoom();
	   var od= getDevice(id);
	    getIndicator(od);
	    renderFusionCharts(startTime,endTime,od,devNormId);
	}
	
	function getRoom(){
		var rUrl = ctx+"/roomDevice/getAllRoomInfo";
		$("#roomId").empty();
		var room="";
		var $fieldCompDevType = $("#roomId");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "room",
			writeType : "show",
			width: "250", //高度
			showLabel : false,
			url : rUrl,
			inputValue:"all",
			onSelect :function(id){
				getDevice(id);
				$("#_roomId").val(id);
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
		var od="";
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#_device");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
				getIndicator(id);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		var deviceId = "";
		$("#_device").find("ul li").each(function(i,ele){
			if(i == 1){
				var obj = $(ele);
				deviceId = obj.attr("infinityid");
				od=deviceId;
			}
		});
		$("#_device").formSelect('setValue',deviceId);
		return od;
		//$("#_device").formSelect("setValue",$("#_device .uicSelectData").find("ul").find("li").attr("infinityid"));
	}
	function getIndicator(id){
		$("#_indicator").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#_indicator");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			checkbox : true,
			inputChange:false,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		devNormId=$("#_indicator .uicSelectData").find("ul").find("li").attr("infinityid");
		$("#_indicator").formSelect("setValue",$("#_indicator .uicSelectData").find("ul").find("li").attr("infinityid"));
		$(".uicSelectData").height(160);
	}
	
	//导出Excel
	function sino_excel(startTime,endTime,deviceId,devNormId){
		var url = ctx + "/indicatorsStatistics/sino_excel?createTime="+startTime+"&endTime="+endTime+"&deviceId="+deviceId+"&devNormId="+devNormId;
		window.location.href= url;
	}
	
	//查询
	function renderFusionCharts(startTime,endTime,deviceId,devNormId){
		var startTime = $("#startTime").val();
		var endTime = $("#endTime").val();
		var deviceId = $("#_device").formSelect("getValue")[0];
		var devNormId = $("#_indicator").formSelect("getValue")[0];
		$("#_iframe").attr("src",ctx+"/indicatorsStatistics/trendSearchIframe?createTime="+startTime+"&endTime="+endTime+"&deviceId="+deviceId+"&devNormId="+devNormId);
	}
