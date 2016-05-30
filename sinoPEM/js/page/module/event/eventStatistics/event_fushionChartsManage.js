	function loadDatagrid() {
		
		$('#_sino_partner_line_search').unbind('click').click(function() {
			renderFusionCharts();
		});
		
		$('#_sino_eventStatistics').unbind('click').click(function() {
			
		
				 var surl="";
				 var  startTime= $('#beginTime').val();
				surl=ctx+"/eventDailyManageInfo/manager?startTime="+startTime;
			
				$('#edit_list').empty();
				$('#edit_list').load(surl,function(){
					
				});
				
			
		});
		

		renderFusionCharts();
		exportFusionCharts();
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



	function renderFusionCharts() {

		$.ajax({
					type : "GET",
					async : false,
					dataType : "text",
					url : ctx + "/eventDailyManageInfo/getRoomChartsXml?tmp="
							+ Math.random() + "&startTime="
							+ $('#beginTime').val() ,
					success : function(msg) {
						$('#_sino_eventStatistics_div').empty();
						var chart = new FusionCharts(ctx+ "/js/plugins/FusionCharts_XTV3.2/swf/MSCombiDY2D.swf",Math.random(), "90%", "400", "0", "1");
						chart.setXMLData(msg);
						chart.render("_sino_eventStatistics_div");
					}
				});

	}
	function exportFusionCharts() {

		$('#fcexpDiv').empty();
		var myExportComponent = new FusionChartsExportObject( ctx
				+ "/js/plugins/FusionCharts_XTV3.2/swf/MSCombiDY2D.swf");
		myExportComponent.componentAttributes.width = '1024';
		myExportComponent.componentAttributes.height = '60';
		// Background color
		myExportComponent.componentAttributes.bgColor = 'ffffdd';
		// Border properties
		myExportComponent.componentAttributes.borderThickness = '2';
		myExportComponent.componentAttributes.borderColor = '0372AB';
		// Font properties
		myExportComponent.componentAttributes.fontFace = 'Arial';
		myExportComponent.componentAttributes.fontColor = '0372AB';
		myExportComponent.componentAttributes.fontSize = '12';
		// Message - caption of export component
		myExportComponent.componentAttributes.showMessage = '1';
		myExportComponent.componentAttributes.message = '先右击图表导出,再点击下边按钮进行保存.';
		// Button visual configuration
		myExportComponent.componentAttributes.btnWidth = '200';
		myExportComponent.componentAttributes.btnHeight = '25';
		myExportComponent.componentAttributes.btnColor = 'E1f5ff';
		myExportComponent.componentAttributes.btnBorderColor = '0372AB';
		// Button font properties
		myExportComponent.componentAttributes.btnFontFace = 'Verdana';
		myExportComponent.componentAttributes.btnFontColor = '0372AB';
		myExportComponent.componentAttributes.btnFontSize = '15';
		// Title of button
		myExportComponent.componentAttributes.btnsavetitle = '保存图表';
		myExportComponent.componentAttributes.btndisabledtitle = '等待导出...';
		myExportComponent.Render("event_fcexpDiv");
	}
	


function eventFushion() {
		loadDatagrid();
	};

