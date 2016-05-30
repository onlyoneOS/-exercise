	function loadDatagrid(){
		$('.date').datetimepicker({
	    	pickTime: false
	    });
	   	//将“日期选择”项置为今天
		if($('#startTime').val() == null||$('#startTime').val() == ''){
			var myDate = new Date().format("yyyy-MM-dd");
		    $('#startTime').val(myDate);
		}
	   //查询
	    $('#_sino_eventStatistics_daily_search').unbind('click').click(function () {
	    	
	    	var searchType="";
	    	if($('input:radio[name="searchType"]:checked').val()==0){
				searchType="room";
				renderFusionTableCharts();
				document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
				document.getElementById("chartContainer").style.display = "none";//显示
				
				
	    	}else if($('input:radio[name="searchType"]:checked').val()==1){
				searchType="dev";
				renderFusionPieCharts();
				
				document.getElementById("chartContainer").style.display = "block";//显示
				document.getElementById("_sino_eventStatistics_div").style.display = "none";//显示
	    	}
	    	renderFusionCharts(searchType);
	    	
	    	
	    });
	    renderFusionCharts("room");
	    renderFusionTableCharts();
	    
	    //导出Excel
	    $('#_sino_eventStatistics_daily_exportExcel').unbind('click').click(function() {
			export_Page();
	    });
	    
	    //柱状显示
	    $('#_sino_eventStatistics_picture').unbind('click').click(function() {
			char_PageView();
	    });
	    
	    
	}
	Date.prototype.format =function(format){
		var o = {
			"M+" : this.getMonth()+1, //month
			"d+" : this.getDate()-1, //day
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
	    var  startTime= $('#startTime').val();
	    
		var surl="";
		if(searchType=='room'){
			
			surl=ctx+"/eventDailyManageInfo/getRoomEvent?startTime="+startTime;
			document.getElementById("datadisplyroom").style.display = "block";//显示
			document.getElementById("datadisply").style.display = "none";//显示
			
			$('#taskTable').dataTable().fnDestroy();
			table = $('#taskTable').dataTable({
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
				              
				              { "mData": "roomName","mRender": function (data,row,obj) {
				            	  var str = "<a href='#' id='"+obj.roomName+"' name='_roomName_'>"+obj.roomName+"</a>";
				            	 
				          		  return str;
		              			}},
				              { "mData": "allnum"},
				              { "mData": "yesdeal"},	
				              { "mData": "nodeal"},	
				              { "mData": "greatEvent"},	
				              { "mData": "smallEvent"},	
				             
				              { "mData": "duration"}
				              
				              ],
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
				            		  "sNext":'下一页'
				            	  }
				              },fnDrawCallback:function(){
				  				
				  				$('a[name="_roomName_"]').unbind('click').click(function () {
				  					var mid =this.id;
				  					
				  					detailInfo(mid);
				  				});
				  			} 
			});

		}else if(searchType=='dev'){
			surl=ctx+"/eventDailyManageInfo/getRoomDevType?startTime="+startTime;
			document.getElementById("datadisply").style.display = "block";//显示
			document.getElementById("datadisplyroom").style.display = "none";//显示
				
			$('#taskTable1').dataTable().fnDestroy();
			table = $('#taskTable1').dataTable({
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

				              { "mData": "productTypeName","mRender":function(data,row,obj){
				            	  var str="<a href='#' id='"+obj.productTypeName+"' name='_productTypeName_'>"+obj.productTypeName+"</a>";
				            	  return str;
				              }},
				             
				              { "mData": "allnum"},
				              { "mData": "yesdeal"},	
				              { "mData": "nodeal"},	
				              { "mData": "greatEvent"},	
				              { "mData": "smallEvent"},	
				              { "mData": "rate"},
				              { "mData": "duration"}
				              
				              ],
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
				            		  "sNext":'下一页'
				            	  }
				              },fnDrawCallback:function(){
					  				
					  				$('a[name="_productTypeName_"]').unbind('click').click(function () {
					  					var mid =this.id;
					  					devTypeDetailInfo(mid);
					  				});
					  			} 
			});
		}
	
	
	}
		
	

	/*
	 * 机房名称获取详细事件
	 * 
	 */
	function detailInfo(mid){
		var  startTime= $('#startTime').val();
		var id = mid;
		var url = ctx+"/eventDailyManageInfo/getDeviceName?roomName="+id+"&startTime="+startTime;
		var murl = encodeURI(encodeURI(url));
		$('#edit_list').empty();
		$('#edit_list').load(murl,function(){
			
		});
	
	}
	
	/*
	 * 设备名称获取机房详细事件
	 * 
	 */
	function devTypeDetailInfo(mid){
		var  startTime= $('#startTime').val();
		var id = mid;
		var url = ctx+"/eventDailyManageInfo/getRoomName?devName="+id+"&startTime="+startTime;
		var murl = encodeURI(encodeURI(url));
		$('#edit_list').empty();
		$('#edit_list').load(murl,function(){
			
		});
	
	}
	
	function export_Page() {
		
		var url="";
			if($('input:radio[name="searchType"]:checked').val()==0){
			
				 url = ctx + "/eventDailyManageInfo/exportExcel?tmp="+ Math.random() + "&startTime="+ $('#startTime').val();
			}
			 if($('input:radio[name="searchType"]:checked').val()==1){
				
				 url = ctx + "/eventDailyManageInfo/exportExcel?tmp="+ Math.random() + "&startTime="+ $('#startTime').val()+"&exportId="+ $('#_exportId').val();
			}
			
			window.location.href= url;
		}
	

	
	function renderFusionTableCharts() {
		document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : ctx + "/eventDailyManageInfo/getEventHighCharts?tmp="
					+ Math.random() + "&startTime="
					+ $('#startTime').val() ,
			success : function(msg) {
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

	

	function renderFusionPieCharts() {

		/**
		 * HighChartx饼图
		 */
		$.ajax({
			type:"GET",
			async:false,
			dataType:"json",
			url:ctx+"/eventDailyManageInfo/getEventPieHighCharts?tmp="+Math.random()+"&startTime="+ $('#startTime').val(),
			success : function ( msg ) {
				$('#chartContainer').empty();
				$('#chartContainer').highcharts({
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

	

		
	 function loadEventDail(){
		loadDatagrid();
	};
