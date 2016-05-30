define(function(require, exports, module) {
	var $ = require("jquery");
	require("bootstrap");
	require("coverage");
	require("highcharts-for-seajs");
	var battery_value=null;
	var battery_capacity=null;
	var battery_name=null;
	var upsCurrentState = null;
	
	exports.init = function() {
		load();
	};
	
	function load() {
		var url = ctx+"/upsDischarge/upsControl?upsControlId="+$("#upsControlId").val();
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : url,
			success : function(msg) {
				battery_value=msg.batteryVoltage;
				battery_capacity=msg.batteryCapacity;
				battery_times=msg.remainTime;
				battery_name=msg.upsDeviceId;
			}
		});
		
		loadData();
		
		$("#_stop_ups").unbind("click").click(function () {
			if(confirm("确定要停止吗？")){
				var url = ctx+"/upsDischarge/stopUpsControl?upsControlId="+$(this).attr("stopUpdId");
				$.ajax({
					type : "GET",
					async : false,
					dataType : "json",
					url : url,
					success : function(msg) {
						if(msg){
							$("#startUpsCtontrol").empty();
							$("#startUpsCtontrol").append(msg.name+"放电完成");
						}
					}
				});
			}
		});
	}

	function loadData() {
		
		$("#ups_controle_div").highcharts(
				{
					colors : [ "#FFFFFF" ],
					height:"70",
					width:"250",
					chart : {
						type : "spline",
						animation : Highcharts.svg, // don"t
						marginRight : "5",
						backgroundColor : "#0000EE",
						events : {
							load : function() {
								var series = this.series[0];
								var url = ctx+"/upsDischarge/getUpsControlData?upsId="+$("#upsId").val();
								interHighChar = setInterval(function() {
									$.ajax({
										type : "GET",
										async : false,
										dataType : "json",
										url : ctx+"/upsDischarge/getUpsDischargeState?upsControlId="+$("#upsId").val(),
										success : function(msg) {
											upsCurrentState = msg.currentState;
										}
									});
									var x = (new Date()).getTime();// current
									var y = "";
									$.ajax({
						    			type : "GET",
						    			async : false,
						    			dataType : "json",
						    			url : url,
						    			success : function(msg) {
						    			/*	alert(msg.upsBatteryVoltage);
						    				alert(battery_value);
						    				alert(msg.upsBatteryCapacity);
						    				alert(battery_capacity);*/
						    				
						    				if(parseInt(msg.upsBatteryVoltage)/10<=parseInt(battery_value)||parseInt(msg.upsBatteryCapacity)<=parseInt(battery_capacity)||upsCurrentState=="end"){
						    					$("#startUpsCtontrol").empty();
						    					$("#startUpsCtontrol").append(battery_name+"放电完成");
						    				} else {
						    					y = msg.upsBatteryVoltage;
						    					//alert(upsCurrentState);
						    					$("#upsBatteryCapacity").html(msg.upsBatteryCapacity);
						    					$("#upsRemainTime").html(msg.upsRemainTime/10);
						    				}
						    			}
						    		});
									series.addPoint([ x, parseInt(y)/10 ], true, true);
								}, 5000);
							}
						}
					},
					title : {
						text : $(this).find("p").text(),
						style : {
							color : "#FFFFFF"
						}
					},
					xAxis : {
						type : "datetime",
						tickPixelInterval : 150,
						tickColor : "#FFFFFF",
						labels : {
							style : {
								color : "#FFFFFF"
							}
						}
					},
					yAxis : {
						title : {
							text : "单位:V",
							style : {
								color : "#FFFFFF"
							}
						},
						plotLines : [ {
							value : 0,
							width : 1,
							color : "#FFFFFF"
						} ],
						gridLineColor : "#FFFFFF",
						labels : {
							style : {
								color : "#FFFFFF"
							}
						}
					},
					tooltip : {
						animation : false,
						formatter : function() {
							var newTime = new Date(this.x);
							var hour = newTime.getHours();
							var min = newTime.getMinutes();
							var miao = newTime.getSeconds();
							return '<b>时间：' + hour + ":" + min + ":" + miao
									+ '</b><br />' + '<b>数值：' + this.y
									+ '</b><br />';
						}
					},
					legend : {
						enabled : false
					},
					exporting : {
						enabled : false
					},
					credits : {
						enabled : true,
						style : {
							color : "#FFFFFF"
						},
						text : "UPS电池电压"
					},
					series : [ {
						name : $(this).find("p").text(),
						data : (function() {
							var data = [], time = (new Date()).getTime(), i;
							for (i = -5; i <= 0; i++) {
								data.push({
									x : time + i * 10000,
									//y : 300 + GetRandomNum(0, 15)
								});
							}
							return data;
						})()
					} ]
				});
	}

	function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
	
});