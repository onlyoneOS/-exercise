
    /**
	 *  获取所有机房信息
	 */
	 function  getRoomInfo(roomUrl){
		   var room="";
		 $('#roomInfo').empty();
			var $fieldCompDevType = $("#roomInfo");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : roomUrl,
				inputValue:"all",
				onSelect :function(id){
					  getDevice(id);
				}  
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			var roomId = "";
			$("#roomInfo").find("ul li").each(function(i,ele){
				if(i == 1){
					var obj = $(ele);
					roomId = obj.attr("infinityid");
					room=roomId;
				}
			});
			$("#roomInfo").formSelect('setValue',roomId);
			return room;
	 }
	 
	 /**
	  *  初始化页面
	  */	
 function loadTrend(){
		//获取所有机房信息
		var rUrl = ctx+"/roomDevice/getAllRoomInfo";
		var id=getRoomInfo(rUrl);
		var od=getDevice(id);
		getIndicator(od);
		$('.date').datetimepicker({
	    	pickTime: false
	    });
		 
		 $('#searchbtn').unbind('click').click(function () {
			 renderFusionCharts();
		});
		 renderFusionCharts();
	};
	function getDevice(id){
		$("#deviceInfo").empty();
		var od="";
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#deviceInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
				getIndicator(id);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		var deviceId = "";
		$("#deviceInfo").find("ul li").each(function(i,ele){
			if(i == 1){
				var obj = $(ele);
				deviceId = obj.attr("infinityid");
				od=deviceId;
			}
		});
		$("#deviceInfo").formSelect('setValue',deviceId);
		return od;
	}
	function getIndicator(id){
		$("#indicatorInfo").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#indicatorInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$(".uicSelectData").height(160);
		$("#indicatorInfo").formSelect('setValue',$('#indicatorInfo .uicSelectData').find('ul').find('li').attr('infinityid'));
	}
	
	
	function renderFusionCharts(){
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var devNormId = $('#indicatorInfo').formSelect("getValue")[0];
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		$.ajax({
			type:'GET',
			async:'false',
			dataType:'json',
			url:ctx+"/indicatorsStatistics/indicatorHighCharts?tmp="+Math.random()+"&startTime="+startTime+"&endTime="+endTime+"&devNormId="+devNormId+"&deviceId="+deviceId,
			success:function(msg){
				$('#_sino_eventStatistics_div').highcharts({
					title: msg.title,
					subtitle: msg.subtitle,
					xAxis: msg.xAxis,
					yAxis: msg.yAxis,
					tooltip: {
						valueSuffix:msg.tooltip.valueSuffix
					},
					legend:msg.legend,
					series: msg.series
				});
			}
		});
	}
	
