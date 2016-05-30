
	function loadDatagrid(){
		$('.date').datetimepicker({
	    	pickTime: false
	    });
	   	//将“日期选择”项置为今天
	    var myDate = new Date().format("yyyy-MM-dd");
	    $('#startTime').val(myDate);

	    $('#_sino_eventStatistics_daily_search').unbind('click').click(function () {
	    	var searchType="";
	    	if($('input:radio[name="searchType"]:checked').val()==0){
				searchType="room";
	    	}else if($('input:radio[name="searchType"]:checked').val()==1){
				searchType="dev";
	    	}
	    	renderFusionCharts(searchType);
	    });
	    renderFusionCharts("room");
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
		var surl=""
		if(searchType=='room'){
			surl=ctx+"/eventStatistics/getRoomDatas?tmp="+Math.random();
		}else if(searchType=='dev'){
			surl=ctx+"/eventStatistics/getDeviceDatas?tmp="+Math.random();
		}
		   $.ajax({
				type : "GET",
				async : false,
				dataType : "json",
				url :surl,
				success : function(msg) {
						$("#_sino_eventStatistics_div").empty();
						var str = "";
						if(searchType=='room'){
							for(var i=0;i<msg.length;i++){
								str+="<div style='float:left;margin-left:30px;margin-bottom: 10px;'><iframe src='"+ctx+"/eventStatistics/loadRoomPieCharts?roomId="+msg[i].id+"&startTime="+$("#startTime").val()+"' frameborder='0'   style='height:300px;width:300px;'></iframe></div>";
							}
						}else if(searchType=='dev'){
							for(var i=0;i<msg.length;i++){
								str+="<div style='float:left;margin-left:30px;margin-bottom: 10px;'><iframe src='"+ctx+"/eventStatistics/loadDevPieCharts?devId="+msg[i].id+"&startTime="+$("#startTime").val()+"' frameborder='0' style='height:300px;width:300px;'></iframe></div>";
							}
						}

						$("#_sino_eventStatistics_div").append(str);
				}
			});
	
	}
	function _remove(){
		var selections = $("#_sino_partner_datagrid").datagrid('getSelections');
		if(selections.length <= 0){
			$.messager.alert('提示','请选择数据!');
			return;
		}
		var id = '';
		for(var i = 0;i < selections.length;i++){
			id+=selections[i].id+",";
		}
		$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
			if (r){
				$.ajax({
					url: ctx+"/base/partnerInfo/remove?id="+id,  // 提交的页面
		            data: "", // 从表单中获取数据
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	$('#_sino_partner_datagrid').datagrid('reload');
		            	
		            }
				});
			}
		});
	}
function dailyManage(){
		loadDatagrid();
	};
