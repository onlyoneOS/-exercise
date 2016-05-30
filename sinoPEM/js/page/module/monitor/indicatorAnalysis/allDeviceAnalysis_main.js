    var selectDeviceId="";
    var selectDeviceName="";
    var selDevNormId = "";

  //时间插件
    function  getTime(object){
		object.datetimepicker({ 
			format: 'yyyy-MM-dd ', 
//			format:'MM/dd/yyyy hh:mm',
//			language: 'en', 
//			pickDate: true, 
			pickTime: false
//			hourStep: 1, 
//			minuteStep: 15, 
//			secondStep: 30, 
//			inputMask: true,
	      }); 
      }
    
    //初始化页面
 function  loadAllDevice(){
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 var timeObject1 = $("#etime");
		 getTime(timeObject1);
		 getAllDeviceEvents();
		 getProductType();
		 $("#sino_excel").unbind("click").click(function () {
			 sino_excel();
		 });
		 
		 $("#searchbtn").unbind("click").click(function () {
			 searchModelTable();
		 });
		 
		 $("#devIndData").unbind("click").click(function(){
			 $("#chartContainer").show();
				var startTime = $("#beginTime").val().trim();
				var endTime = $("#endTime").val().trim();
				var minVal = $("#minval1").val();
				var maxVal = $("#maxval1").val();
				var url = ctx+"/indicatorAnalysis/devIndDataAnalysis?startTime="+startTime+"&endTime="+endTime+"&selectDeviceId="+selectDeviceId+"&selDevNormId="+selDevNormId+"&minVal="+minVal+"&maxVal="+maxVal;
				var murl=ctx+"/indicatorAnalysis/devIndData?startTime="+startTime+"&endTime="+endTime+"&selectDeviceId="+selectDeviceId+"&selDevNormId="+selDevNormId+"&minVal="+minVal+"&maxVal="+maxVal;
				 $.ajax({	type : "GET",
						async : false,
						dataType : "text",
						url : url,
						success : function(msg) {
							$("#_iframe").hide();
						    var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/Pie2D.swf",  Math.random(), "282", "282","0","1");
					        chart.setXMLData(msg);				   
						    chart.render("chartContainer");
						}
					});
				 $.ajax({	type : "GET",
						async : false,
						dataType : "json",
						url : murl,
						success : function(data) {
							$("#ct").empty();
							$("#ct1").empty();
							$("#ct2").empty();
							$("#ct3").empty();
							$("#ct").append(data.totalnum);
							$("#ct1").append(data.normalnum);
							$("#ct2").append(data.maxnum);
							$("#ct3").append(data.minnum);
						}
					});
				 
		 });
	};
	
	//加载设备类型
	function  getProductType(){
		  $("#productTypeTree").empty();
		  var productTypeTree = $("#productTypeTree");	 		  
		  var optionsProductType = {
				inputName : "deviceTypeName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+'/base/productType/getProType',
				inputValue:"all",
				onSelect :function(id){
					var  typeId = id;
					$("#typeValue").attr("value", typeId);
				}  
		    };
			productTypeTree.formSelect(optionsProductType);

	}
	 function  getAllDeviceEvents(){
		var startTime = $("#beginTime").val();
		var endTime = $("#endTime").val();
		 var url =  ctx+"/indicatorAnalysis/allDeviceIndicatorData?startTime="+startTime+"&endTime="+endTime;		 
			$("#taskTable").dataTable().fnDestroy();
		    table = $("#taskTable").dataTable({
		    	"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
				"bFilter":true,
				"bPaginate" : false,
				"bInfo" : false,
				"sAjaxSource":url, 
				"bRetrieve": true,
				"sServerMethod": "POST",
				"aoColumns": [
				              { "mData": "RoomName"},
				              { "mData": "DeviceName","mRender": function (data,row,obj){
				            	  var str = "<a href='#' onclick=devcieindicaters('"+obj.DeviceId+"','"+data+"') />"+data+"</a>";
				            	  return str;
				              }},
				              { "mData": "yianzhong"},
				              { "mData": "qingwei"},	 
				              { "mData": "totals"}
//				              { "mData": "DataValue","mRender": function (data,row,obj){
//				            	  var rstatus = '';
//				            	  rstatus+=obj.DataValue;
//				            	  rstatus+=obj.IndicatorUnit;
//	          		              return rstatus;
//				              }},
				          ]
			});
		    $('.dataTables_filter').empty();
		    searchModelTable();
        }
	devcieindicaters = function(deviceId,deviceName){
	//	alert(deviceId);
		$("#indicatorAnalysis").hide();
		selectDeviceId = deviceId;
		 selectDeviceName=deviceName;
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		 var url =  ctx+"/indicatorAnalysis/oneDeviceIndicatorData?startTime="+startTime+"&endTime="+endTime+"&deviceId="+deviceId;		 
			$('#deviceIndicatorTable').dataTable().fnDestroy();
			$('#deviceIndicatorTable').css("width","100%");
			$("#deviceIndicatorTitle").empty();
			$("#deviceIndicatorTitle").append("<h4>"+deviceName+"指标分析</h4>");
			$("#deviceIndicator").show(1000,function(){
	        var    tabledeviceIndicator = $('#deviceIndicatorTable').dataTable({
			    	"bProcessing": true,
					"bServerSide": true,
					"bLengthChange":true,
					"bDestroy": true,
					"bSort": false,
					"bFilter":false,
					"bPaginate" : false,
					"bInfo" : false,
					"sAjaxSource":url, 
					"bRetrieve": true,
					"sServerMethod": "POST",
					"aoColumns": [
					             
					              { "mData": "indicatorName","mRender": function (data,row,obj){
					            	  var str = "<a href='#' onclick=renderChart('"+obj.devNormId+"','"+data+"') />"+data+"</a>";
					            	  return str;
					              }},
					              { "mData": "maxd"},
					              { "mData": "mind"},	 
					              { "mData": "avgd"},
					              { "mData": "rate"}

					          ]
				});
				
			});
		
	};
	
	renderChart = function(devNormId,normName){
		$('#_iframe').show();
		$("#deviceIndicator").hide();
		$("#chartContainer").hide();
		selDevNormId = devNormId;
		//alert(devNormId);
		var startTime = $('#beginTime').val().trim();
		var endTime = $('#endTime').val().trim();
		$("#deviceNormTitle").empty();
		$("#deviceNormTitle").append("<h4>"+selectDeviceName+"--"+normName+" 取值区间统计分析</h4>");
		$("#indicatorAnalysis").show(1000,function(){
			$('#_iframe').attr("src",ctx+"/indicatorsStatistics/trendSearchIframe?createTime="+startTime+"&endTime="+endTime+"&deviceId="+selectDeviceId+"&devNormId="+devNormId);
		});
	};
	
	function sino_excel(){
		var param  = "";
		var deviceType = $("#typeValue").val();
		var eventLevel = $("#eventLevel").val();
		var eventNum = $("#eventNum").val();
		var startTime = $("#beginTime").val().trim();
		var endTime = $("#endTime").val().trim();
		if(deviceType != null&&deviceType != ""){
			param += deviceType+"_"+"deviceType";
		}
		
		if(eventLevel != null&&eventLevel != ""){
			if(param == ""){
			    param += eventLevel+"_"+"eventLevel";
			}else{
				param +=  ","+eventLevel+"_"+"eventLevel";
			}
		}
		if(eventNum != null&&eventNum != ""){
			if(param == ""){
				param += eventNum+"_"+"eventNum";
			} else {
				param += ","+ eventNum+"_"+"eventNum";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(endTime != null&&endTime != ""){
			if(param == ""){
				param += endTime+"_"+"endTime";
			} else {
				param += ","+ endTime+"_"+"endTime";
			}
		}
		var url = ctx + "/indicatorAnalysis/sino_excel?param="+param+"&startTime="+startTime+"&endTime="+endTime;
		window.location.href= url;
	}
	
	function searchModelTable(){
		var param  = "";
		var deviceType = $("#typeValue").val();
		var eventLevel = $("#eventLevel").val();
		var eventNum = $("#eventNum").val();
		var startTime = $("#beginTime").val().trim();
		var endTime = $("#endTime").val().trim();

		if(deviceType != null&&deviceType != ""){
			param += deviceType+"_"+"deviceType";
		}
		
		if(eventLevel != null&&eventLevel != ""){
			if(param == ""){
			    param += eventLevel+"_"+"eventLevel";
			}else{
				param +=  ","+eventLevel+"_"+"eventLevel";
			}
		}
		if(eventNum != null&&eventNum != ""){
			if(param == ""){
				param += eventNum+"_"+"eventNum";
			} else {
				param += ","+ eventNum+"_"+"eventNum";
			}
		}
		
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(endTime != null&&endTime != ""){
			if(param == ""){
				param += endTime+"_"+"endTime";
			} else {
				param += ","+ endTime+"_"+"endTime";
			}
		}
		table.fnFilter(param,0 );
	}
	
