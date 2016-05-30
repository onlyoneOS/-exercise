var charts;	
function loadDatagrid() {
		$('.date').datetimepicker({
			pickTime : false
		});
		$('#_sino_partner_line_search').unbind('click').click(function() {
			renderFusionCharts();
		});
		$('#_sino_partner_exportExcel').unbind('click').click(function() {
			exportPage();
		});
		renderFusionCharts();
		exportFusionCharts();
		$('#R0').on('change', function(){
			charts.options.chart.options3d.alpha = this.value;
			showValues();
			charts.redraw(false);
		});
		$('#R1').on('change', function(){
		 	charts.options.chart.options3d.beta = this.value;
			showValues();
			charts.redraw(false);
		});
		function showValues() {
			   $('#R0-value').html(charts.options.chart.options3d.alpha);
			   $('#R1-value').html(charts.options.chart.options3d.beta);
		     }
		showValues();
	}

	function FC_Exported(objRtn) {
		alert(objRtn.statusCode);
		if (objRtn.statusCode == "1") {
			alert("The chart was successfully saved on server. The file can be accessed from "
					+ objRtn.fileName);
		} else {
			alert("The chart could not be saved on server. There was an error. Description : "
					+ objRtn.statusMessage);
		}
	}

	function exportPage() {
		
		var url = ctx + "/eventStatistics/exportExcel?tmp="
		+ Math.random() + "&startTime="
		+ $('#startTime').val() + "&endTime="
		+ $('#endTime').val() + "&exportId="
		+ $('#_exportId').val();
		window.location.href= url;
	}

	function renderFusionCharts() {
		$("#_sino_eventStatistics_div").empty();
		 $.ajax({
			 type:'GET',
			 async:false,
			 dataType:'json',
			 url:ctx + "/eventStatistics/getRoomHighCharts?tmp="
							+ Math.random() + "&startTime="
							+ $('#startTime').val() + "&endTime="
							+ $('#endTime').val() + "&exportId="
							+ $('#_exportId').val(),
			 success:function(msg){
			var	 chart = new Highcharts.Chart({
					chart: {
						renderTo: '_sino_eventStatistics_div',
						type: msg.chart.type,
						margin: 75,
						options3d: {
							enabled: true,
							alpha: 15,
							beta: 15,
							depth: 50,
							viewDistance: 25
						},
						
					},

					title: msg.title,

					xAxis: msg.xAxis,

					yAxis: msg.yAxis,

					tooltip: {
						headerFormat: '<b>{point.key}</b><br>',
						pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} 个事件'
					},
					credits: {//不显示highchart超链接
                        enabled: false
                    },
	
					plotOptions: {
						column: {
							//stacking: 'normal',
							depth: 25
						}
					},

					series: msg.series
					
				});
			charts=chart;
			 }
		 });

	}
	function exportFusionCharts() {
		var _exportId = $('#_exportId').val();
		$('#fcexpDiv').empty();
	}

function loadEvent() {
		loadDatagrid();
	};

