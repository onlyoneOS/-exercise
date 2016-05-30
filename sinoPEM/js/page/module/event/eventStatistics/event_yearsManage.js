function loadEventYear(){
		$("#dateTimeStartSevDate").datetimepicker({
			viewMode:2,
			minViewMode:2,
			pickTime: false
		});
		loadDatagrid();
	};
	
	function loadDatagrid(){
		if($("#yeear_Time").val()==null||$("#yeear_Time").val()==""){
			var time=getMonthStartDate();
			$("#yeear_Time").val(time);
			$("#dateTimeStartSevDate").datetimepicker({
				pickTime: false
			}).on("changeDate", function(ev){
				var time=new Date(ev.date.getTime()+604800000).format("yyyy");
				$("#yeear_Time").val(time);
			});
		}
		function formatDate(date) {      
		    var myyear = date.getFullYear();     
		    var mymonth = date.getMonth()+1;     
		    var myweekday = date.getDate();      
		    if(mymonth < 10){     
		        mymonth = "0" + mymonth;     
		    }      
		      
		    return (myyear);      
		}   
		function getMonthStartDate(){  
			var now = new Date();  
			var nowYear = now.getFullYear(); 
			  var nowMonth = now.getMonth();
		    var monthStartDate = new Date(nowYear, nowMonth, 1);      
		    return formatDate(monthStartDate);     
		}  
		//查询
		$("#_sino_eventStatistics_daily_search").unbind("click").click(function () {
			var searchType = $('input:radio[name="searchType"]:checked').val();
	    	if(searchType==0){
				renderFusionTableCharts();
				document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
				document.getElementById("chartContainer").style.display = "none";//隐藏
	    	}else if(searchType==1){
	    		renderFusionTableCharts();
				renderFusionPieCharts();
				document.getElementById("_sino_eventStatistics_div").style.display = "none";//隐藏
				document.getElementById("chartContainer").style.display = "block";//显示
	    	}
	    	renderFusionCharts(searchType);
	    });
	    
	    //导出excel
	    $("#_sino_eventStatistics_daily_exportExcel").unbind("click").click(function() {
			export_Page();
	    });
	    
	    //柱状显示
	    $("#_sino_eventStatistics_picture").unbind("click").click(function() {
			char_PageView();
	    });
	}
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
	
	function renderFusionCharts(searchType){
		var yeear_Time= $("#yeear_Time").val();
		if(yeear_Time!=null&&yeear_Time!=""){
			$("#yearTime").val(yeear_Time);
			$("#queryType").val(searchType);
			if(searchType==0){
				var surl = ctx+"/eventYearsManageInfo/getRoomEvent?yeear_Time="+yeear_Time+"&queryType="+searchType;
				document.getElementById("datadisplyroom").style.display = "block";//显示
				document.getElementById("datadisply").style.display = "none";//隐藏
				$("#taskTable").dataTable().fnDestroy();
				table = $("#taskTable").dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"bLengthChange":false,
					"bDestroy": true,
					"bSort": false,
					"bPaginate" : false,
					"bInfo" : false,
					"bFilter":false,
					"sAjaxSource":surl, 
					"bRetrieve": true,
					"sServerMethod": "POST",
					"bSort" : true,
					"aoColumns": [
					              { "mData": "roomName","mRender": function (data,row,obj) {
					            	  var str = "<a href='#' id='"+obj.roomName+"' name='_roomName_'>"+obj.roomName+"</a>";
					            	  return str;
					              }},
					              { "mData": "allnum"},
					              { "mData": "yesdeal"},	
					              { "mData": "nodeal"},	
					              { "mData": "greatEvent"},	
					              { "mData": "smallEvent"},	
					              { "mData": "duration"}],
					              "sDom": "<'row'<l><'bt5right'f>r>t<'row'<i><'bt5right'p>>",
					              "sPaginationType": "bootstrap",
					              "oLanguage": {
					            	  "sLengthMenu": "页显示_MENU_ 个数",
					            	  "sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					            	  "sSearch":"检索:",
					            	  "sEmptyTable":"没有数据",
					            	  "sInfoEmpty": "显示0条数据",
					            	  "oPaginate":{
					            		  "sPrevious": "上一页",
					            		  "sNext":"下一页"
					            	  }
					              },fnDrawCallback:function(){
					            	  $('a[name="_roomName_"]').unbind("click").click(function () {
					            		  var mid =this.id;
					            		  detailInfo(mid);
					            	  });
					              } 
				});
			}else if(searchType==1){
				surl=ctx+"/eventYearsManageInfo/getRoomDevType?yeear_Time="+yeear_Time+"&queryType="+searchType;
				document.getElementById("datadisplyroom").style.display = "none";//隐藏
				document.getElementById("datadisply").style.display = "block";//显示
				$("#taskTable1").dataTable().fnDestroy();
				table = $("#taskTable1").dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"bLengthChange":false,
					"bDestroy": true,
					"bSort": false,
					"bPaginate" : false,
					"bInfo" : false,
					"bFilter":false,
					"sAjaxSource":surl, 
					"bRetrieve": true,
					 "bSort" : true,
					"sServerMethod": "POST",
					"aoColumns": [
					              { "mData": "roomName","mRender":function(data,row,obj){
					            	  var str="<a href='#' id='"+obj.roomName+"' name='_roomName_'>"+obj.roomName+"</a>";
					            	  return str;
					              }},
					              { "mData": "allnum"},
					              { "mData": "yesdeal"},	
					              { "mData": "nodeal"},	
					              { "mData": "greatEvent"},	
					              { "mData": "smallEvent"},	
					              { "mData": "rate"},
					              { "mData": "duration"}],
					              "sDom": "<'row'<l><'bt5right'f>r>t<'row'<i><'bt5right'p>>",
					              "sPaginationType": "bootstrap",
					              "oLanguage": {
					            	  "sLengthMenu": "页显示_MENU_ 个数",
					            	  "sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					            	  "sSearch":"检索:",
					            	  "sEmptyTable":"没有数据",
					            	  "sInfoEmpty": "显示0条数据",
					            	  "oPaginate":{
					            		  "sPrevious": "上一页",
					            		  "sNext":"下一页"
					            	  }
					              },fnDrawCallback:function(){
						  				$('a[name="_roomName_"]').unbind("click").click(function () {
						  					var mid =this.id;
						  					devTypeDetailInfo(mid);
						  				});
					              } 
				});
			}
		}
	}
	
	/**
	 * 机房名称获取详细事件
	 */
	function detailInfo(mid){
		var  yearTime= $("#yearTime").val();
		var  queryType= $("#queryType").val();
		var id = mid;
		var url = ctx+"/eventYearsManageInfo/getDeviceName?roomName="+id+"&yearTime="+yearTime+"&queryType="+queryType;
		var murl=encodeURI(encodeURI(url));;
		$("#edit_list").empty();
		$("#edit_list").load(murl,function(){
			
		});
	}
	
	/**
	 * 设备名称获取机房详细事件
	 */
	function devTypeDetailInfo(mid){
		var  yearTime= $("#yearTime").val();
		var  queryType= $("#queryType").val();
		var id = mid;
		var url = ctx+"/eventYearsManageInfo/getRoomName?devName="+id+"&yearTime="+yearTime+"&queryType="+queryType;
		var murl = encodeURI(encodeURI(url));
		$("#edit_list").empty();
		$("#edit_list").load(murl,function(){
			
		});
	
	}
	
	/**
	 * 导出excel
	 */
	function export_Page() {
		var exportId = $("#_exportId").val();
		var yeear_Time= $("#yeear_Time").val();
		var queryType = $('input:radio[name="searchType"]:checked').val();
		var url="";
		if(queryType!=null&&queryType!=""){
			url = ctx + "/eventYearsManageInfo/exportExcel?tmp="+Math.random()+"&exportId="+exportId+ "&yeear_Time="+yeear_Time+"&queryType="+queryType;
		}
		window.location.href= url;
	}

	/**
	 * 柱状展示
	 */
	function renderFusionTableCharts() {
		document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
		var yeear_Time = $("#yeear_Time").val();
		var searchType = $('input:radio[name="searchType"]:checked').val();
		if(yeear_Time!=null&&yeear_Time!=""){
			/**
			*可点击柱状图
			*/
			$.ajax({
				type : "GET",
				async : false,
				dataType : "json",
				url : ctx + "/eventYearsManageInfo/getEventHighCharts?yeear_Time="+yeear_Time+"&queryType="+searchType+"&tmp="+ Math.random(),
				success : function(msg) {
					var a = msg.tooltip.pointFormat;
					$('#_sino_eventStatistics_div').empty();
					categories = msg.xAxis.categories;
					data = msg.series[0].drillData;
					
					function setChart(name, categories, data, color) {
						chart.xAxis[0].setCategories(categories, false);
						chart.series[0].remove(false);
						chart.addSeries({
							name: msg.series[0].name,
							data: data,
							color: color || 'yellow'
						}, false);
						chart.redraw();
					}

					var chart = $('#_sino_eventStatistics_div').highcharts({
						chart: {
							type: msg.chart.type
						},
						title: msg.title,
						subtitle: msg.subtitle,
						xAxis: {
							categories: categories
						},
						yAxis: {
							title: msg.yAxis.title
						},
						plotOptions: {
							column: {
								cursor: 'pointer',
								point: {
									events: {
										click: function() {
											var drilldown = this.drilldown;
											if (drilldown) { // drill down
												setChart(drilldown.name, drilldown.categories, drilldown.data, drilldown.color);
											} else { // restore
												setChart(name, categories, data);
											}
										}
									}
								},
								dataLabels: {
									enabled: true,
									color: 'red',
									style: {
										fontWeight: 'bold'
									},
									formatter: function() {
										return this.y +'个';
									}
								}
							}
						},
						tooltip: {
							formatter: function() {
								var point = this.point,
									s = this.x +':<b>'+ this.y +'个事件</b><br/>';
								if (point.drilldown) {
									s += '点击查看 '+ point.category +' 信息';
								} else {
									s += '点击返回';
								}
								return s;
							}
						},
						series: [{
							name: msg.series[0].name,
							data: data,
							color: 'white'
						}],
						exporting: msg.exporting
					})
					.highcharts(); // return chart			
				}
			});
			
		}
	}

	/**
	 * 饼状展示
	 */
	function renderFusionPieCharts() {
		var yeear_Time = $("#yeear_Time").val();
		if(yeear_Time!=null&&yeear_Time!=""){
			/**
			 * HighChartx饼图
			 */
			$.ajax({
				type:"GET",
				async:false,
				dataType:"json",
				url:ctx+"/eventYearsManageInfo/getEventPieHighCharts?tmp="
					+ Math.random() + "&yeear_Time="+yeear_Time,
				success : function ( msg ) {
					$('#chartContainer').empty();
					$('#chartContainer').highcharts({
						chart: msg.chart,
						title: msg.text,
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
	}
