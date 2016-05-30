    /**
	 *  获取所有机房信息
	 */
	 function  getRoomInfo(roomUrl){
		   
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
					var foid=getDevice(id);
					getIndicator(foid)
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
			$("#roomInfo").formSelect('setValue',roomId); 
	 }

	 /*
	  * 获取设备信息
	  * 
	  */
	function getDevice(id){
		if(id == 'all'){
			id = "";
		}
		$("#deviceInfo").empty();
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#deviceInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "deviceid",
			writeType : 'show',
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
				getIndicator(id);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		var roomId = "";
		$("#deviceInfo").find("ul li").each(function(i,ele){
			if(i == 0){
				var obj = $(ele);
				roomId = obj.attr("infinityid");
			}
		});
		$("#deviceInfo").formSelect('setValue',roomId);
		
		return roomId;
	}
		
		 //获取指标
		function getIndicator(id){
			$("#indicatorNameInfo").empty();
			var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
			var $fieldCompDevType = $("#indicatorNameInfo");
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
			var v=$("#indicatorNameInfo .uicSelectData").find("ul").find("li").attr("infinityid");
			if(null!=v&&v!=""&&v!=undefined){
				$("#indicatorNameInfo").formSelect("setValue",$("#indicatorNameInfo .uicSelectData").find("ul").find("li").attr("infinityid"));
			}
			
			$(".uicSelectData").height(160);
		}

	/**
     *  时间插件
     */
      function  getTime(object){
     	  
     	  object.datetimepicker({ 
     	        format: 'yyyy-MM-dd', 
     	        pickTime: false
     	 
     	      }); 
      }
 
	 
	 /**
	  *  初始化页面
	  */	
function load(){

		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		getRoomInfo(rUrl);
		var oid=getDevice($("#roomInfo").formSelect("getValue")[0]);
		getIndicator(oid);
		
		
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 $('.yeear_time').datetimepicker({
     		viewMode:2,
    		minViewMode:2,
	    	pickTime: false
	    });
		 
		 $("#_tabLine").unbind("click").click(function(){
			 getLineChart();
		 })
		 
		  $("#_tabChart").unbind("click").click(function(){
			  getBarChart();
		 })
		  $("#_tabPie").unbind("click").click(function(){
			  getPieChart();
		 })
		 getDayIndicatorData();
		 
		 $('#searchbtn').unbind('click').click(function () {
			 $("#tableTitle").empty();
				var roomId = $('#roomInfo').formSelect("getValue")[1];
			   var deviceName = $('#deviceInfo').formSelect("getValue")[1];
				var repType = $("input[name='repType']:checked+span").text();
			 $('#deviceIndicatortaskTable').dataTable().fnDestroy();
			    var startTime="";
				var endTime="";
				var roomId = $('#roomInfo').formSelect("getValue")[0];
				var deviceId = $('#deviceInfo').formSelect("getValue")[0];
				var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
				var repType = $("input[name='repType']:checked").val();
				if(repType==1){
					startTime = $('#beginTime').val();
					
				}else if(repType==2){
					startTime = $('#startTime').val();
					endTime = $('#endTime').val();
					
				} else if(repType==3){
					startTime = $('#mouth_Time').val();
					
				} else if(repType==4){
					startTime = $('#quarter_Time').val()+"-"+$("input[name='quarterInput']:checked").val();
					
				} else if(repType==5){
					startTime = $('#yeear_Time').val();
					
				}
				$("#deviceIndicatortaskTable").empty();
				$("#deviceIndicatortaskTable").append('<thead><tr><th width="10%">机房名称</th> <th width="10%" id="deviceName">设备名称</th>');
				var arr=deviceNormId.split(',');
				var array=new Array();
				var ds;
				for(var m = 0;m < arr.length; m++){
					var name=$("div li [infinityid='"+arr[m]+"']").attr("infinityname");
					array.push(name);
					$("#deviceIndicatortaskTable tr").append('<th width="10%">'+array[m]+'</th>');
					if(m==arr.length){
						ds+='{"mData":"normName'+m+'"}';
					}else{
						ds+='{"mData":"normName'+m+'"},';
					}
				}
				ds=ds.substring(9,ds.length-1);
				datas='[{"mData":"roomName"},{"mData": "deviceName"},'+ds+',{"mData": "createtime"}]';
				datas = eval(datas);
				$("#deviceIndicatortaskTable tr").append('<th width="10%">时间</th></tr></thead>');
				$('#deviceIndicatortaskTable').dataTable().fnDestroy();
				var url =  ctx+"/indicatorAnalysis/deviceIndicatorData?roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType;	
				   table = $('#deviceIndicatortaskTable').dataTable({
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
						"aoColumns":datas,
						fnDrawCallback:function(){
						        	 // getPieChart();
									} 
					});
				    $('.dataTables_filter').empty();
				 //   getLineChart();
					//getBarChart();
					//getPieChart();
		});
		 //导出Excel
		 $('#export_Excel').unbind('click').click(function () {
			export_Page();
		});
		 
		 
		 
		 
		 $("input[name=repType]").unbind('click').click(function(){
			 
			  showCont($("input[name=repType]:checked").attr("id"));
		 }); 
		 showCont("daily");
		 function showCont(param){
			 switch(param){
			  case "daily":
			   $("#mouthDiv").hide(); 
			   $("#weekDiv").hide();
			   $("#dailyDiv").show();
			   $("#quarterDiv").hide();
			   $("#yeearDiv").hide();
			   break;
			  case "week":
				  
			   $("#mouthDiv").hide(); 
			   $("#weekDiv").show();
			   $("#dailyDiv").hide();
			   $("#quarterDiv").hide();
			   $("#yeearDiv").hide();
			   weekdisplay();
			   break;
			  case "mouth":
			   $("#mouthDiv").show(); 
			   $("#weekDiv").hide();
			   $("#dailyDiv").hide();
			   $("#quarterDiv").hide();
			   $("#yeearDiv").hide();
			   mounthdisplay();
			   break;
			  case "quarter":
			   $("#mouthDiv").hide(); 
			   $("#weekDiv").hide();
			   $("#dailyDiv").hide();
			   $("#quarterDiv").show();
			   $("#yeearDiv").hide();
			   seasondisplay();
			   break;
			  case "yeear":
			   $("#mouthDiv").hide(); 
			   $("#weekDiv").hide();
			   $("#dailyDiv").hide();
			   $("#quarterDiv").hide();
			   $("#yeearDiv").show();
			   yeardisplay();
			   break;
			   default:
			   break;
			 }
		 } 
		 function weekdisplay()
		 {

				if($('#startTime').val()==null||$('#startTime').val()==""){
					var daytime=getWeekStartDate();
					$("#startTime").val(daytime);
					var time=getWeekEndDate();
					$('#endTime').val(time);
					$('#weektime').datetimepicker({
						pickTime: false
					}).on('changeDate', function(ev){
						
						var time=new Date(ev.date.getTime()+604800000).format("yyyy-MM-dd");
						$('#endTime').val(time);
						
					});
					$('#weektime1').datetimepicker({
						pickTime: false
					}).on('changeDate', function(ev){
						
						var time=new Date(ev.date.getTime()-604800000).format("yyyy-MM-dd");
						$('#startTime').val(time);
						
					});
				}else{
					$('#weektime').datetimepicker({
						pickTime: false
					}).on('changeDate', function(ev){
						
						var time=new Date(ev.date.getTime()+604800000).format("yyyy-MM-dd");
						$('#endTime').val(time);
						
					});
					$('#weektime1').datetimepicker({
						pickTime: false
					}).on('changeDate', function(ev){
						
						var time=new Date(ev.date.getTime()-604800000).format("yyyy-MM-dd");
						$('#startTime').val(time);
						
					});
					var start=$('#start').val();
					var end=$('#end').val();
					$('#startTime').val(start);
					$('#endTime').val(end);
				}
		 }
		 function mounthdisplay(){
			 if($('#mouth_Time').val()==null||$('#mouth_Time').val()==""){
				  var nowMonth=getMonthStartDate();
				  var time=nowMonth.substring(0,nowMonth.lastIndexOf("-"))
				  $("#mouth_Time").val(time);
					$('#mouthtime').datetimepicker({
						viewMode:1,
			    		minViewMode:1,
				    	pickTime: false
					});
			}else{
				$('#mouthtime').datetimepicker({
					viewMode:1,
		    		minViewMode:1,
			    	pickTime: false
				});
				var start=$('#start').val();
				$('#startTime').val(start);
			}
				
		 }
		 function seasondisplay(){
			 if($("#quarter_Time").val()==null||$("#quarter_Time").val()==""){
					var times=getMonthStartDate();
					var time=times.substring(0,times.indexOf('-'))
					 var sea=getQuarterStartMonth();
					 getCheck(sea);
					$("#quarter_Time").val(time);
					$("#quartertime").datetimepicker({
						pickTime: false
					}).on("changeDate", function(ev){
						var time=new Date(ev.date.getTime()+604800000).format("yyyy");
						$("#quarter_Time").val(time);
					});
				}
		 }
		 
		 function yeardisplay(){
			 if($("#yeear_Time").val()==null||$("#yeear_Time").val()==""){
					var times=getMonthStartDate();
					var time=times.substring(0,times.indexOf('-'))
					$("#yeear_Time").val(time);
					$("#yeearTime").datetimepicker({
						pickTime: false
					}).on("changeDate", function(ev){
						var time=new Date(ev.date.getTime()+604800000).format("yyyy");
						$("#yeear_Time").val(time);
					});
				}
		 }
		 
		 //日期时间格式化
		 Date.prototype.format =function(format){
				var o = {
					"M+" : this.getMonth()+1, //month
					"d+" : this.getDate(), //day
					"h+" : this.getHours(), //hour
					"m+" : this.getMinutes(), //minute
					"s+" : this.getSeconds(), //second
					"q+" : Math.floor((this.getMonth()+3)/3), //quarter
					"S" : this.getMilliseconds() //millisecond
				};
				if(/(y+)/.test(format))
					format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
				for(var k in o){
					if(new RegExp("("+ k +")").test(format))
						format = format.replace(RegExp.$1,RegExp.$1.length==1? o[k] :("00"+ o[k]).substr((""+ o[k]).length));
				}
				return format;
			};
	
			//  getLineChart();
			//getBarChart();
			//  getPieChart();
	};

	//线状图
	function getLineChart(){
		var startTime="";
		var endTime="";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
		var repType = $("input[name='repType']:checked").val();
		var deviceName = $('#deviceInfo').formSelect("getValue")[1];
		var roomName = $('#roomInfo').formSelect("getValue")[1];
		var rptName="";
		if(repType==1){
			startTime = $('#beginTime').val();
			rptName="日报表";
		}else if(repType==2){
			startTime = $('#startTime').val();
			endTime = $('#endTime').val();
			rptName="周报表";
		}else if(repType==3){
			startTime = $('#mouth_Time').val();
			rptName="月报表";
		} else if(repType==4){
			startTime = $('#quarter_Time').val()+"-"+$("input[name='quarterInput']:checked").val();
			rptName="季报表";
		} else if(repType==5){
			startTime = $('#yeear_Time').val();
			rptName="年报表";
		}
		var arr=deviceNormId.split(',');
		var array=new Array();
		for(var m in arr){
			var name=$("div li [infinityid='"+arr[m]+"']").attr("infinityname");
			array.push(name);
		}
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : ctx+"/indicatorAnalysis/getLineChart?tmp="+Math.random()+"&roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType+"&devNormName="+array,
			success : function(msg) {
				$('#_sino_statistics_div').empty();
					$('#_sino_statistics_div').highcharts({
						title: {
				            text: ''+roomName+''+deviceName+'性能'+rptName+'',
				            x: -20 
				        },
						xAxis: {
							categories: msg.xAxis.categories
						},
						yAxis: msg.yAxis,
						tooltip: {
							enabled: 'false'
							/*formatter: function() {
								return '<b>'+ this.series.name +'</b><br/>'+this.x +': ';
							}*/
						},
						
						series: msg.series
					});
			}
		});
	}
	//柱状图
	function getBarChart(){
		var startTime="";
		var endTime="";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
		var repType = $("input[name='repType']:checked").val();
		var deviceName = $('#deviceInfo').formSelect("getValue")[1];
		var roomName = $('#roomInfo').formSelect("getValue")[1];
		var rptName="";
		if(repType==1){
			startTime = $('#beginTime').val();
			rptName="日报表";
		}else if(repType==2){
			startTime = $('#startTime').val();
			endTime = $('#endTime').val();
			rptName="周报表";
		}else if(repType==3){
			startTime = $('#mouth_Time').val();
			rptName="月报表";
		} else if(repType==4){
			startTime = $('#quarter_Time').val()+"-"+$("input[name='quarterInput']:checked").val();
			rptName="季报表";
		} else if(repType==5){
			startTime = $('#yeear_Time').val();
			rptName="年报表";
		}
		var arr=deviceNormId.split(',');
		var array=new Array();
		for(var m in arr){
			var name=$("div li [infinityid='"+arr[m]+"']").attr("infinityname");
			array.push(name);
		}
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : ctx+"/indicatorAnalysis/getBarChart?tmp="+Math.random()+"&roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType+"&devNormName="+array,
			success : function(msg) {
				//msg=eval("("+msg+")");
				$('#_sino_statistics_div_columnar').empty();
					$('#_sino_statistics_div_columnar').highcharts({
						chart: msg.chart,
						title: {
				            text: ''+roomName+''+deviceName+'性能'+rptName+'',
				            x: -20 
				        },
						subtitle: msg.subtitle,
						xAxis: msg.xAxis,
						yAxis: msg.yAxis,
						tooltip: msg.tooltip,
						plotOptions:msg.plotOptions,
						series: msg.series
					});
			}
		});
	}
	//饼图
	function getPieChart(){
		  var roomId = $('#roomInfo').formSelect("getValue")[1];
		   var deviceName = $('#deviceInfo').formSelect("getValue")[1];
		   var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
			var repType = $("input[name='repType']:checked+span").text();
		    var startTime="";
			var endTime="";
			var roomId = $('#roomInfo').formSelect("getValue")[0];
			var deviceId = $('#deviceInfo').formSelect("getValue")[0];
			
			var repType = $("input[name='repType']:checked").val();
			var array=new Array();
			
			var roomName = $('#roomInfo').formSelect("getValue")[1];
			var rptName="";
			if(repType==1){
				startTime = $('#beginTime').val();
				rptName="日报表";
			}else if(repType==2){
				startTime = $('#startTime').val();
				endTime = $('#endTime').val();
				rptName="周报表";
			}else if(repType==3){
				startTime = $('#mouth_Time').val();
				rptName="月报表";
			} else if(repType==4){
				startTime = $('#quarter_Time').val()+"-"+$("input[name='quarterInput']:checked").val();
				rptName="季报表";
			} else if(repType==5){
				startTime = $('#yeear_Time').val();
				rptName="年报表";
			}
			var arr=deviceNormId.split(',');
			var array=new Array();
			for(var m in arr){
				var name=$("div li [infinityid='"+arr[m]+"']").attr("infinityname");
				array.push(name);
			}
			var url =  ctx+"/indicatorAnalysis/getPie?roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType+"&devNormName="+array;
			$.ajax({
				type : "POST",
				dataType: "json",
				url : url,
				async : false,
				success : function(msg) {
					$("#_sino_statistics_div_pie").empty();
					$("#_sino_statistics_div_pie").highcharts({
					title: {
			            text: '',
			            x: -20 
			        },
			        chart: msg.chart,
			        title: msg.title,
			        tooltip: {
						pointFormat: msg.series[0].name+': <b>{point.percentage:.1f}%</b>'
					},
			        plotOptions: msg.plotOptions,
			        series: [{
			            type: 'pie',
			            name: msg.series.name,
			            data: msg.series[0].piedata
			        }]
					});
				}
			});
		
	    
		
	}
	
	
	//table初始化方法
	function  getDayIndicatorData(){
			var roomId = $('#roomInfo').formSelect("getValue")[0];
			var deviceId = $('#deviceInfo').formSelect("getValue")[0];
			var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
			var repType = $("input[name='repType']:checked").val();;
			var startTime = $('#beginTime').val();
			var endTime="";
			var name=$("div li [infinityid='"+deviceNormId+"']").attr("infinityname");
			$("#deviceIndicatortaskTable").append('<thead><tr><th width="10%">机房名称</th> <th width="10%">设备名称</th><th width="10%">'+name+'</th><th width="10%">时间</th></tr></thead>');
			 var url =  ctx+"/indicatorAnalysis/deviceIndicatorData?roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType;		 
			$('#deviceIndicatortaskTable').dataTable().fnDestroy();
			   table = $('#deviceIndicatortaskTable').dataTable({
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
					              { "mData": "deviceName"},
					              {"mData":"normName0"},
					              { "mData": "createtime"}				              
					          ],fnDrawCallback:function(){
					        	
								} 
				});
			    $('.dataTables_filter').empty();
	   }
	//时间
	
	function getCheck(sea){
		var els =document.getElementsByName("quarterInput");
		for (var i = 0, j = els.length; i < j; i++){
		var v=els[i].value;
		 if(v==sea)
		 {
			 document.getElementById(v).checked=true;
		 }
		}
	}
	function formatDate(date) {  
		var myyear = date.getFullYear();  
		var mymonth = date.getMonth()+1;  
		var myweekday = date.getDate();  
		  
		if(mymonth < 10){  
		mymonth = "0" + mymonth;  
		}  
		if(myweekday < 10){  
		myweekday = "0" + myweekday;  
		}  
		return (myyear+"-"+mymonth + "-" + myweekday);  
		}  
	function getMonthStartDate(){  
		var now = new Date();  
		var nowYear = now.getFullYear(); 
		  var nowMonth = now.getMonth();
	    var monthStartDate = new Date(nowYear, nowMonth, 1);      
	    return formatDate(monthStartDate);     
	}  
	function getQuarterStartMonth(){  
		var now = new Date();
		var nowMonth = now.getMonth(); 
		var quarterStartMonth = 0;  
		if(nowMonth<3){  
		quarterStartMonth = 1;  
		}  
		if(2<nowMonth && nowMonth<6){  
		quarterStartMonth = 2;  
		}  
		if(5<nowMonth && nowMonth<9){  
		quarterStartMonth = 3;  
		}  
		if(nowMonth>8){  
		quarterStartMonth = 4;  
		}  
		return quarterStartMonth;  
		} 
	function getWeekEndDate() 
	{
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年 
		var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
		return formatDate(weekEndDate);
		}
	function getWeekStartDate() {
		var now = new Date(); //当前日期
		var nowDayOfWeek = now.getDay(); //今天本周的第几天
		var nowDay = now.getDate(); //当前日
		var nowMonth = now.getMonth(); //当前月
		var nowYear = now.getFullYear(); //当前年 
		var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);
		return formatDate(weekStartDate);
		}

	
 	//导出Excel
  	function export_Page() {
		var param  = "";
		var startTime="";
		var endTime="";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var deviceNormId=$("#indicatorNameInfo").formSelect("getValue")[0];
		var arr=deviceNormId.split(',');
		var array=new Array();
		for(var m in arr){
			var name=$("div li [infinityid='"+arr[m]+"']").attr("infinityname");
			array.push(name);
		}
		var repType = $("input[name='repType']:checked").val();
		if(repType==1){
			startTime = $('#beginTime').val();
			
		}else if(repType==2){
			startTime = $('#startTime').val();
			endTime = $('#endTime').val();
			
		} else if(repType==3){
			startTime = $('#mouth_Time').val();
			
		} else if(repType==4){
			startTime = $('#quarter_Time').val()+"-"+$("input[name='quarterInput']:checked").val();
			
		} else if(repType==5){
			startTime = $('#yeear_Time').val();
			
		}
		
		
		if(roomId != null&&roomId != ""&&roomId != 'all'){
		}else{
			roomId="";
		}
		
	
  		  url =  ctx+"/indicatorAnalysis/exportExcel?roomId="+roomId+"&deviceId="+deviceId+"&deviceNormId="+deviceNormId+"&startTime="+startTime+"&endTime="+endTime+"&repType="+repType+"&devNormName="+array;	
		window.location.href= url;
  	}
