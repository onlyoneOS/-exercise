	function loadAll(){
	
		//设置策略
		$("#_ups_set").unbind("click").click(function() {
			var upsId = $("#upsId").val();
			upsSetControl(upsId);
		});
		//保存设置策略
		$("#saveControl").unbind("click").click(function() {
			var upsId = $("#upsId").val();
			saveControl(upsId);
		});
		//放电检测
		$("#_ups_dck").unbind("click").click(function() {
			var upsId = $("#upsId").val();
			upsDetection(upsId);
		});
		//开始放电
		$("#_upsdischarge").unbind("click").click(function() {
			$(".discharge").css("color","#ddd");
			$(".discharge").css("cursor","nw-resize");
			$(".discharge").unbind("click");
			var upsId = $("#upsId").val();
			var upsControlId = $("#upsControlId").val();
			discharge(upsId,upsControlId);
		});
	}
	
	function upsSetControl(upsId){
		$("#dailogs").on("show", function (){
			$("#dtitle").html("设置控制策略");
			$.ajax({
				type : "GET",
				async : false,
				dataType : "json",
				url : ctx+"/upsDischarge/getUpsControl?upsId="+upsId,
				success : function(upsControl) {
					$("#default_batteryVoltage").val(upsControl.batteryVoltage);		//电池电压
					$("#default_batteryCapacity").val(upsControl.batteryCapacity);		//电池容量
					$("#default_dischargeTime").val(upsControl.dischargeTime);		//放电时间
					$("#default_remainTime").val(upsControl.remainTime);					//剩余时间
				}
			});
//			$.ajax({
//				type : "GET",
//				async : false,
//				dataType : "json",
//				url : ctx+"/***/***?upsId="+upsId,
//				success : function(upsControl) {
//					$("#snmp_batteryVoltage").val(upsControl.batteryVoltage);		//当前电池电压
//					$("#snmp_batteryCapacity").val(upsControl.batteryCapacity);	//当前电池容量
//					$("#snmp_dischargeTime").val(upsControl.dischargeTime);		//当前放电时间
//					$("#snmp_remainTime").val(upsControl.remainTime);				//当前剩余时间
//				}
//			});
			$("#dsave").unbind("click");
			$("#dsave").click(function (){
				//$("#addForm").submit();
				$("#dailogs").modal("hide");
			});
		});
		$("#dailogs").on("hidden", function (){$("#dailogs").unbind("show");});
		$("#dailogs").modal({show:true});
		$("#dailogs").off("show");
	}
	
	function saveControl(upsId){
		var batteryVoltage = $("#default_batteryVoltage").val();		//电池电压
		var batteryCapacity = $("#default_batteryCapacity").val();	//电池容量
		var dischargeTime = $("#default_dischargeTime").val();		//放电时间
		var remainTime = $("#default_remainTime").val();				//剩余时间
		//alert(remainTime);
		var url = ctx+"/upsDischarge/saveControl?upsId="+upsId+"&batteryVoltage="+batteryVoltage+"&batteryCapacity="+batteryCapacity+"&dischargeTime="+dischargeTime+"&remainTime="+remainTime;
		
		$.ajax({
			url: url,
			data: "",				// 从表单中获取数据
			type: "POST",		// 设置请求类型为"POST"，默认为"GET"
			beforeSend: function(){		// 设置表单提交前方法
				
            },error: function(request){	// 设置表单提交出错
            	alert("设置失败");
            	$(".edit_list").load(ctx + "/upsDischarge/getUpsInfo?upsId="+upsId);
            },success: function(data) {
            	alert("设置成功");
            	$(".edit_list").load(ctx + "/upsDischarge/getUpsInfo?upsId="+upsId);
            }
		});
	}
	
	function upsDetection(upsId){
		var url = ctx+"/upsDischarge/upsDetection?upsIds="+upsId;
		var batteryVoltage = $("#batteryVoltage").val();		//策略电池电压
		var batteryCapacity = $("#batteryCapacity").val();	//策略电池容量
		var remainTime = $("#remainTime").val();				//策略剩余时间
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : url,
			success : function(msg) {
				var jsonData = msg.aaData;
				if(jsonData.length>0){
					document.getElementById("myContent").style.display="none";	//隐藏后释放占用的页面空间
					//document.getElementById("myContent").style.visibility="hidden";	//隐藏
				}
				//jsonData[0].upsStatus	UPS状态
				//jsonData[0].batteryStatue	电池状态
				//jsonData[0].upsBatteryVoltage	电池电压
				//jsonData[0].upsBatteryCapacity	电池容量
				//jsonData[0].upsRemainTime	剩余时间
				var upsStatus = jsonData[0].upsStatus;	//UPS状态
				var batteryStatue = jsonData[0].batteryStatue;	//电池状态
				var upsBatteryVoltage = jsonData[0].upsBatteryVoltage;	//电池电压
				var t = jsonData[0].t;
				//alert(upsStatus);
				//alert(batteryStatue);
				//alert(upsBatteryVoltage);
				//alert(batteryVoltage);
				if(upsStatus!=null&&batteryStatue!=null&&upsBatteryVoltage>=batteryVoltage){
					document.getElementById("mains_OK").style.display="";
					document.getElementById("bypass_OK").style.display="";
					document.getElementById("batteryVoltage_OK").style.display="";
					document.getElementById("batteryPack_OK").style.display="";
					document.getElementById("inverter_OK").style.display="";
						}else{
					document.getElementById("mains_NO").style.display="";
					document.getElementById("bypass_NO").style.display="";
					document.getElementById("batteryVoltage_NO").style.display="";
					document.getElementById("batteryPack_NO").style.display="";
					document.getElementById("inverter_NO").style.display="";
				}
				if(upsBatteryVoltage>=batteryVoltage){
					if(t<3){
						if(confirm("该UPS距上次放电小于3个月，确定继续放电操作吗？")){
							document.getElementById("stadesc").style.display="";//显示放电按钮
						}
					}else{
						document.getElementById("stadesc").style.display="";//显示放电按钮
					}
				}
				
//				document.getElementById("stadesc").style.display="";//显示放电按钮
			}
		});
	}
	
	function discharge(upsId,upsControlId){
		var url = ctx+"/upsDischarge/controlData?tmp="+Math.random()+"&upsId="+upsId+"&upsControlId="+upsControlId;
		var str = '<iframe id="userListFrame" name="userListFrame" height="100%" width="100%" frameborder="0" src="'+url+'"></iframe>';
		$("#_div").empty();
		$("#_div").append(str);
	}
	
