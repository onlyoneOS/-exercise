    var roomId = "";

    /**
	 *  获取所有机房信息
	 */
	 function  getRoomInfo(roomUrl){
		   
		 $("#roomInfo").empty();
			var $fieldCompDevType = $("#roomInfo");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : "show",
				width: "250", //高度
				showLabel : false,
				url : roomUrl,
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
				}
			});
			$("#roomInfo").formSelect("setValue",roomId);
				 
	 }

	    /**
		 *  获取所有比较机房信息
		 */
		 function  getRoomInfo1(roomUrl){
			   
			 $("#roomInfo1").empty();
				var $fieldCompDevType = $("#roomInfo1");
				$fieldCompDevType.addClass("li_form");
				var optionCompDevTypes = {
					inputName : "room1",
					writeType : "show",
					width: "250", //高度
					showLabel : false,
					url : roomUrl,
					inputValue:"all",
					onSelect :function(id){
						  getDevice1(id);
					}  
				};
				$fieldCompDevType.formSelect(optionCompDevTypes);
				var roomId = "";
				$("#roomInfo1").find("ul li").each(function(i,ele){
					if(i == 1){
						var obj = $(ele);
						roomId = obj.attr("infinityid");
					}
				});
				$("#roomInfo1").formSelect("setValue",roomId);
					 
		 }
	  /**
	     *  时间插件
	     */
	      function  getTime(object){
	     	  
	     	  object.datetimepicker({ 
	     	        format: "yyyy-MM-dd", 
	     	        pickTime: false
	     	      }); 
	      }
	 
	 /**
	  *  初始化页面
	  */	
 function loadDayIndicator(){

		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		getRoomInfo(rUrl);
		getDevice($("#roomInfo").formSelect("getValue")[0]);
		getRoomInfo1(rUrl);
		getDevice1($("#roomInfo1").formSelect("getValue")[0]);
		getIndicator($("#deviceInfo").formSelect("getValue")[0]);
		
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);

		 getDayIndicatorData();
		 
		 //导出Excel
		 $("#sino_excel").unbind("click").click(function () {
			 sino_excel();
		 });
		 $("#searchbtn").unbind("click").click(function () {
			 searchModelTable();
		 });
		 $("#compAnalysis").unbind("click").click(function () {
			
			 if(this.checked==true){
				 $("#compDiv").show();
			 }else{
				 $("#compDiv").hide();
			 }

		 });
		 renderFusionCharts();
	};
	function getDevice(id){
		$("#deviceInfo").empty();
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#deviceInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "deviceid",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
				getIndicator(id);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		
		$("#deviceInfo").find("ul li").each(function(i,ele){
			if(i == 0){
				var obj = $(ele);
				roomId = obj.attr("infinityid");
			}
		});
		$("#deviceInfo").formSelect("setValue",roomId);
	}
	/**
	 * 获取比较设备
	 */
	function getDevice1(id){
		$("#deviceInfo1").empty();
		var url = ctx + "/indicatorAnalysis/getDevice?roomId="+id+"&deviceId="+$("#deviceInfo").formSelect("getValue")[0];
		var $fieldCompDevType = $("#deviceInfo1");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "deviceid1",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$("#deviceInfo1").find("ul li").each(function(i,ele){
			if(i == 0){
				var obj = $(ele);
				roomId = obj.attr("infinityid");
			}
		});
		$("#deviceInfo1").formSelect("setValue",roomId);
	}
	function getIndicator(id){
		$("#indicatorInfo").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#indicatorInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "DevNormId",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$(".uicSelectData").height(160);
		
		$("#indicatorInfo").find("ul li").each(function(i,ele){
			if(i == 0){
				var obj = $(ele);
				roomId = obj.attr("infinityid");
			}
		});
		$("#indicatorInfo").formSelect("setValue",roomId);
	}
	
	function  getDayIndicatorData(){
		
		var param  = "";
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		var deviceId = $("#deviceInfo").formSelect("getValue")[0];
		var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
		var startTime = $("#beginTime").val();
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param += roomId+"_"+"roomId";
		}
		
		if(deviceId != null&&deviceId != ""){
			if(param == ""){
			    param += deviceId+"_"+"deviceid";
			}else{
				param +=  ","+deviceId+"_"+"deviceid";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"DevNormId";
			} else {
				param += ","+ devNormId+"_"+"DevNormId";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		
		 var url =  ctx+"/indicatorAnalysis/dayIndicatorData?param="+param;		 
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
				              { "mData": "roomName"},
				              { "mData": "DeviceName"},
				              { "mData": "IndicatorName"}, 
				              { "mData": "maxval"},
				              { "mData": "minval"},
				              { "mData": "avgval"},
				              { "mData": "createhour"}				              
				          ]
			});
		    $(".dataTables_filter").empty();
        }
	
	function renderFusionCharts(){
		
		var param  = "";
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		var deviceId = $("#deviceInfo").formSelect("getValue")[0];
		var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
		var startTime = $("#beginTime").val();
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param += roomId+"_"+"roomId";
		}
		
		if(deviceId != null&&deviceId != ""){
			if(param == ""){
			    param += deviceId+"_"+"deviceid";
			}else{
				param +=  ","+deviceId+"_"+"deviceid";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"DevNormId";
			} else {
				param += ","+ devNormId+"_"+"DevNormId";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}

		/**
		*HighCharts 分析报表
		*/
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : ctx+"/indicatorAnalysis/dayIndicatorDataCharts?tmp="+Math.random()+"&param="+param,
			success : function(msg) {
				$("#_sino_statistics_div").empty();
				$('#_sino_statistics_div').highcharts({
					title: msg.title,
					subtitle: msg.subtitle,
					xAxis: {
						categories: msg.xAxis.categories
					},
					yAxis: {
						title: msg.yAxis.title,
						plotLines: [{
							value: 0,
							width: 1,
							color: '#808080'
						}]
					},
					tooltip: {
						valueSuffix:' '
					},
					 legend: {
						layout: 'vertical',
						align: 'right',
						verticalAlign: 'middle',
						borderWidth: 0
					},
					series: msg.series
				});
			}
		});
	}
	
	
	function renderFusionCharts1(){
		var compareType = "";
		
		$('input[name="compareType"]:checked').each(function(i,ele){
			if(i == $('input[name="compareType"]:checked').length - 1){
				compareType+=$(ele).val();
			} else {
				compareType+=$(ele).val()+",";
			}
	   });  
		var param  = "";
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		var deviceId = $("#deviceInfo").formSelect("getValue")[0];
		var deviceId1 = $("#deviceInfo1").formSelect("getValue")[0];
		var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
		var startTime = $("#beginTime").val();
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param += roomId+"_"+"roomId";
		}
		if(deviceId != null&&deviceId != ""){
			if(param == ""){
			    param += deviceId+"_"+"deviceid";
			}else{
				param +=  ","+deviceId+"_"+"deviceid";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"DevNormId";
			} else {
				param += ","+ devNormId+"_"+"DevNormId";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		
		var param1  = "";
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param1 += roomId+"_"+"roomId";
		}
		
		if(deviceId1 != null&&deviceId1 != ""){
			if(param1 == ""){
			    param1 += deviceId1+"_"+"deviceid";
			}else{
				param1 +=  ","+deviceId1+"_"+"deviceid";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param1 += devNormId+"_"+"DevNormId";
			} else {
				param1 += ","+ devNormId+"_"+"DevNormId";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param1 == ""){
				param1 += startTime+"_"+"startTime";
			} else {
				param1 += ","+ startTime+"_"+"startTime";
			}
		}

		/**
		*compareDayIndicatorData  HighCharts分析比较
		*/
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : ctx+"/indicatorAnalysis/compareDayIndicatorHighCharts?tmp="+Math.random()+"&param="+param+"&deviceId="+deviceId+"&param1="+param1+"&deviceId1="+deviceId1+"&compareType="+compareType,
			success : function(msg) {
				$("#_compare_div").empty();
				console.info(msg);
				$('#_compare_div').highcharts({
					title: msg.title,
					subtitle: msg.subtitle,
					xAxis: msg.xAxis,
					yAxis: msg.yAxis,
					tooltip: {
						valueSuffix: msg.tooltip.valueSuffix
					},
					legend: msg.legend,
					series: msg.series
				});
			}
		});
		
	}
	
	function sino_excel(){
		var b = false;
		$("input[name=compAnalysis]").each(function(){ //遍历table里的全部checkbox
	        if($(this).attr("checked")){
	        	b = true;
	        }
	    });
		if(b){
			$("#_compare_div").show();
			$("#_ordinary_div").hide();
			renderFusionCharts1();
		} else {
			$("#_compare_div").hide();
			$("#_ordinary_div").show();
			renderFusionCharts();
			var param  = "";
			var roomId = $("#roomInfo").formSelect("getValue")[0];
			var deviceId = $("#deviceInfo").formSelect("getValue")[0];
			var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
			var startTime = $("#beginTime").val();
			if(roomId != null&&roomId != ""&&roomId != "all"){
				param += roomId+"_"+"roomId";
			}
			
			if(deviceId != null&&deviceId != ""){
				if(param == ""){
				    param += deviceId+"_"+"deviceid";
				}else{
					param +=  ","+deviceId+"_"+"deviceid";
				}
			}
			if(devNormId != null&&devNormId != ""){
				if(param == ""){
					param += devNormId+"_"+"DevNormId";
				} else {
					param += ","+ devNormId+"_"+"DevNormId";
				}
			}
			
			if(startTime != null&&startTime != ""){
				if(param == ""){
					param += startTime+"_"+"startTime";
				} else {
					param += ","+ startTime+"_"+"startTime";
				}
			}
			var url = ctx + "/indicatorAnalysis/sino_excel?param="+param;
			window.location.href= url;
		}
	}
	
	function searchModelTable(){
		var b = false;
		$("input[name=compAnalysis]").each(function(){ //遍历table里的全部checkbox
	        if($(this).attr("checked")){
	        	b = true;
	        }
	    });
		if(b){
			$("#_compare_div").show();
			$("#_ordinary_div").hide();
			renderFusionCharts1();
		} else {
			$("#_compare_div").hide();
			$("#_ordinary_div").show();
			renderFusionCharts();
			var param  = "";
			var roomId = $("#roomInfo").formSelect("getValue")[0];
			var deviceId = $("#deviceInfo").formSelect("getValue")[0];
			var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
			var startTime = $("#beginTime").val();
			if(roomId != null&&roomId != ""&&roomId != "all"){
				param += roomId+"_"+"roomId";
			}
			
			if(deviceId != null&&deviceId != ""){
				if(param == ""){
				    param += deviceId+"_"+"deviceid";
				}else{
					param +=  ","+deviceId+"_"+"deviceid";
				}
			}
			if(devNormId != null&&devNormId != ""){
				if(param == ""){
					param += devNormId+"_"+"DevNormId";
				} else {
					param += ","+ devNormId+"_"+"DevNormId";
				}
			}
			
			if(startTime != null&&startTime != ""){
				if(param == ""){
					param += startTime+"_"+"startTime";
				} else {
					param += ","+ startTime+"_"+"startTime";
				}
			}

			table.fnFilter(param,0 );
		}
	}
