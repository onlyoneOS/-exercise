function loadSeason(){
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
			var sea=getQuarterStartMonth();
			getCheck(sea);
			$("#yeear_Time").val(time);
			$("#dateTimeStartSevDate").datetimepicker({
				pickTime: false
			}).on("changeDate", function(ev){
				var time=new Date(ev.date.getTime()+604800000).format("yyyy");
				$("#yeear_Time").val(time);
			});
		}
		
		//查询
		$("#_sino_eventStatistics_daily_search").unbind("click").click(function () {
			var searchType = $('input:radio[name="searchType"]:checked').val();
			var seasson = $('input:radio[name="seasson"]:checked').val();
	    	if(searchType==0){
	    		renderFusionTableCharts();
	    		document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
				document.getElementById("chartContainer").style.display = "none";//隐藏
	    	}else if(searchType==1){
	    		renderFusionTableCharts();
				renderFusionPieCharts();
				document.getElementById("chartContainer").style.display = "block";//显示
				document.getElementById("_sino_eventStatistics_div").style.display = "none";//显示
	    	}
	    	renderFusionCharts(searchType,seasson);
	    });
		function formatDate(date) {      
		    var myyear = date.getFullYear();     
		    var mymonth = date.getMonth()+1;     
		    var myweekday = date.getDate();      
		    if(mymonth < 10){     
		        mymonth = "0" + mymonth;     
		    }      
		      
		    return (myyear);      
		}   
		function getCheck(sea){
			var els =document.getElementsByName("seasson");
			for (var i = 0, j = els.length; i < j; i++){
			var v=els[i].value;
			 if(v==sea)
			 {
				 $("input[value='"+v+"']").attr("checked","checked");
			 }
			}
		}
		function formatDates(date) {  
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
		function getseason(){
			var now = new Date();
			var nowMonth = now.getMonth(); 
			var nowYear = now.getYear();
			var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);  
			return formatDates(quarterStartDate); 
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
	
	function renderFusionCharts(searchType,seasson){
		var yeear_Time= $("#yeear_Time").val();
		if(yeear_Time!=null&&yeear_Time!="" && seasson!=null&&seasson!=""){
			$("#yearTime").val(yeear_Time);
			$("#queryType").val(searchType);
			$("#quarter").val(seasson);
			if(searchType==0){
				var surl = ctx+"/eventSeasonManageInfo/getRoomEvent?yeear_Time="+yeear_Time+"&queryType="+searchType+"&seasson="+seasson;
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
				var surl = ctx+"/eventSeasonManageInfo/getRoomDevType?yeear_Time="+yeear_Time+"&queryType="+searchType+"&seasson="+seasson;
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
					              { "mData": "productTypeName","mRender":function(data,row,obj){
					            	  var str="<a href='#' id='"+obj.productTypeName+"' name='_roomName_'>"+obj.productTypeName+"</a>";
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
		var seasson = $('input:radio[name="seasson"]:checked').val();
		var queryType= $("#queryType").val();
		var id = mid;
		var url = ctx+"/eventSeasonManageInfo/getDeviceName?roomName="+id+"&yearTime="+yearTime+"&seasson="+seasson+"&queryType="+queryType;
		var murl=encodeURI(encodeURI(url));;
		$("#edit_list").empty();
		$("#edit_list").load(murl,function(){
			
		});
	}
	
	/**
	 * 设备名称获取机房详细事件
	 */
	function devTypeDetailInfo(mid){
		var yearTime= $("#yearTime").val();
		var seasson = $('input:radio[name="seasson"]:checked').val();
		var queryType= $("#queryType").val();
		var id = mid;
		var url = ctx+"/eventSeasonManageInfo/getRoomName?devName="+id+"&yearTime="+yearTime+"&seasson="+seasson+"&queryType="+queryType;
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
		var yearTime= $("#yearTime").val();
		var quarter = $('input:radio[name="seasson"]:checked').val();
		var queryType= $("#queryType").val();
		var url="";
		if(queryType!=null&&queryType!=""){
			url = ctx + "/eventSeasonManageInfo/exportExcel?tmp="+Math.random()+"&exportId="+exportId+ "&yeear_Time="+yearTime+"&queryType="+queryType+"&quarter="+quarter;
		}
		window.location.href= url;
	}

	/**
	 * 柱状展示
	 */
	function renderFusionTableCharts() {
		document.getElementById("_sino_eventStatistics_div").style.display = "block";//显示
		var yeear_Time = $("#yeear_Time").val();
		var seasson = $('input:radio[name="seasson"]:checked').val();
		if(yeear_Time!=null&&yeear_Time!=""){
			$.ajax({
				type : "GET",
				async : false,
				dataType : "text",
				url : ctx + "/eventSeasonManageInfo/getRoomChartsXml?tmp="+ Math.random() + "&yeear_Time="+yeear_Time+"&seasson="+seasson,
				success : function(msg) {
					$("#_sino_eventStatistics_div").empty();
					var chart = new FusionCharts(ctx+ "/js/plugins/FusionCharts_XTV3.2/swf/MSCombiDY2D.swf",Math.random(), "90%", "400", "0", "1");
					chart.setXMLData(msg);
					chart.render("_sino_eventStatistics_div");
				}
			});
		}
	}

	/**
	 * 饼状展示
	 */
	function renderFusionPieCharts() {
		var yeear_Time = $("#yeear_Time").val();
		var seasson = $('input:radio[name="seasson"]:checked').val();
		if(yeear_Time!=null&&yeear_Time!=""){
			$.ajax({
				type : "GET",
				async : false,
				dataType : "text",
				url : ctx + "/eventSeasonManageInfo/getRoomPieChartsXml?tmp="+ Math.random() + "&yeear_Time="+yeear_Time+"&seasson="+seasson,
				success : function(msg) {
					var chart = new FusionCharts(ctx+"/js/plugins/FusionCharts_XTV3.2/swf/Pie2D.swf",  Math.random(), "282", "282","0","1");
					chart.setXMLData(msg);
					chart.render("chartContainer");
				}
			});
		}
	}
