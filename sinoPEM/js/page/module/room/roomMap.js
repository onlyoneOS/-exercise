
	var inter=null;
	function showMap(){
		/*if($("#roombg").find("a[id='_error_a']").length>0){
			$("#alarmDisplay").append("<a href='#' id='_error_a'>");
			$("#alarmDisplay").append("<img title='处理告警事件' src='images/gaojing_error.gif' style='margin-bottom: 10px; width: 50px; float: left;' />");
			$("#alarmDisplay").append("</a>");
		}*/
		//加载标头和背景图片
		$.ajax({
			type : "POST",
			dataType: "json",
			url : ctx+"/room/getTileInfo",
			async : false,
			success : function(result) {
				$("#divv").empty();
				var img_src = result.imageURL;
				$("#divv").css("background", "url(" + img_src + ") no-repeat");
				$("#roomName").append(result.roomName);
			}
		});
		filterMap();
		getErrorTableList();
			$("#_error_a").click(function(){
				$("#roombg").toggle(1000);
				$("#_error_div").toggle(1000);
			});
			$("#shengyin").click(function(){
				changeImag();
			})
			$("#_error_back").click(function(){
				$("#_error_div").toggle(1000);
				$("#roombg").toggle(1000);
				$(".maintop").load(ctx+"/room/roomMap?tmp="+Math.random());
			});
			
		
		clearInterval(inter);//每次刷新,清除上次数据
		//在别的页面刷新,清除自动刷新显示
        if ($("#flush").val() == undefined) {
            clearInterval(inter);
            return;
        }
        inter = setInterval(function(){
        	if($("#flush").val()== undefined){
        		clearInterval(inter);
        		return;
        	}
    		filterMap();
    		getErrorTableList();
    		getNewData();
        }, 60000); 
    	//点击机房状态复选框事件,
    	$("input[name=alarmStatus]").click(function() {
    		filterMap();
    	});
    	//进入列表页面
    	$("#listcontent").click(function(){
			$("#roombg").empty();
			$("#roombg").load(ctx+'/room/roomList?tmp='+Math.random());
		});
	};
	function changeImag(ids){
		var imgObj = $('a[id="'+ids+'"] img').attr("src");
		if(imgObj.indexOf("images/nosound.png")!=-1)
		{
			$.ajax({
				type : "POST",
				url : ctx+"/eventLatestDataInfo/modiStatus?id="+ids+"&isAlarm=0",
				success : function(result) {
				}
			  });
			$('a[id="'+ids+'"] img').attr("src","images/sound.png");
		}else{
			$.ajax({
				type : "POST",
				url : ctx+"/eventLatestDataInfo/modiStatus?id="+ids+"&isAlarm=1",
				success : function(result) {
				}
			});
			
			$('a[id="'+ids+'"] img').attr("src","images/nosound.png");
		 }
		}
	//map页面所有机房信息 机房状态 初始化时调用的方法；机房状态过滤时也调用这个方法；页面5秒自动刷新也调用这个方法
	function filterMap(){
		var alarmStatus = "";
		$("input[name=alarmStatus]").each(function() {
			if ($(this).attr("checked")) {
				alarmStatus += $(this).val() + ",";
			}
		});
		var normNum=0;
		var alarmNum=0;
		var seriousNum=0;
		var normRoomNames = new Array();
		
		var alarmRoomNames = new Array();
		var seriousRoomNames = new Array();
		var roomNameIds = new Map();
		var seriousRoomData = new Array();
	
		$.ajax({
			type : "POST",
			dataType: "json",//返回json格式的数据
			url : ctx+"/room/getAllRoomStateByOrg",
			async : false,
			data : {"alarmStatus":alarmStatus},
			success : function(result){
				$("#divv").empty();
				$.each(result,function(i,n){
					if(n.RoomAlarm==1){//先判断设备的通断状态
						if((n.TemAlarm==0||n.TemAlarm==1)&&(n.HumAlarm==0||n.HumAlarm==1)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&n.UpsAlarm==1&&n.AirConditionerAlarm==1&&n.VoltageboxAlarm==1){
							normNum+=1;
							normRoomNames.push(n.Name);
							roomNameIds.put(n.Name,n.RoomId);
							$("#divv").append($("<div id='divId"+n.RoomId+"' name='imgstat' class='imgstat"+i+" divimg' dis='1'   style='position:absolute;display:block;'></div>").append("<div style='color:green;'>"+n.Name+"</div><img src='"+ctx+"/images/roommonitor/green.png' name='ditu'  data-content='"+n.Location+"' data-original-title='adfadfadfa' rel='popover' class='trigerImg' id='trigger"+i+"' height='14px'>"));
						}else if((n.TemAlarm==0||n.TemAlarm==1||n.TemAlarm==2)&&(n.HumAlarm==0||n.HumAlarm==1||n.HumAlarm==2)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&(n.UpsAlarm==1||n.UpsAlarm==2)&&(n.AirConditionerAlarm==1||n.AirConditionerAlarm==2)&&(n.VoltageboxAlarm==1||n.VoltageboxAlarm==2)){
							alarmNum+=1;
							alarmRoomNames.push(n.Name);
							roomNameIds.put(n.Name,n.RoomId);
							$("#divv").append($("<div id='divId"+n.RoomId+"' name='imgstat' class='imgstat"+i+" divimg' dis='2'    style='position:absolute;display:block;'></div>").append("<div style='color:#fdb419;'>"+n.Name+"</div><img src='"+ctx+"/images/roommonitor/yellow.png' name='ditu'  data-content='"+n.Location+"' data-original-title='adfadfadfa' rel='popover' class='trigerImg' id='trigger"+i+"' height='14px'>"));
						}else{
							seriousNum+=1;
							seriousRoomNames.push(n.Name);
							roomNameIds.put(n.Name,n.RoomId);
							seriousRoomData.push(n);
							$("#divv").append($("<div id='divId"+n.RoomId+"' name='imgstat' class='imgstat"+i+" divimg' dis='3'   style='position:absolute;display:block;'></div>").append("<div style='color:red;'>"+n.Name+"</div><img src='"+ctx+"/images/roommonitor/red.png' name='ditu'  data-content='"+n.Location+"' data-original-title='adfadfadfa' rel='popover' class='trigerImg' id='trigger"+i+"' height='14px'>"));
						}
					}else{//不通则状态为故障，显示红色
						seriousNum+=1;
						seriousRoomNames.push(n.Name);
						roomNameIds.put(n.Name,n.RoomId);
						seriousRoomData.push(n);
						$("#divv").append($("<div id='divId"+n.RoomId+"' name='imgstat' class='imgstat"+i+" divimg'  dis='3'  style='position:absolute;display:block;'></div>").append("<div style='color:red;'>"+n.Name+"</div><img src='"+ctx+"/images/roommonitor/red.png' name='ditu'  data-content='"+n.Location+"' data-original-title='adfadfadfa' rel='popover' class='trigerImg' id='trigger"+i+"' height='14px'>"));
					}
					$(".imgstat"+i).css("left",n.PointX);
					$(".imgstat"+i).css("top",n.PointY);
					$(".imgstat"+i).css("cursor","pointer");
					$(".imgstat"+i).popover("destroy");//先销毁pop
					$(".imgstat"+i).popover({
						trigger:"hover",
						html:"true",
						placement:"right",
						title:n.Name+"情况一览",
						content:function(){
							var wd,sd,ls,ld,finalOut,ups;
							if(n.RoomAlarm==1){
								if(n.HumAlarm==1){//温度
									wd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">温度</div><img src="'+ctx+'/images/roommonitor/tip/wde1.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">正常</div></div>';
								}else if(n.HumAlarm==2){
									wd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">温度</div><img src="'+ctx+'/images/roommonitor/tip/wde2.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f9830d;font-weight:bold;">警告</div></div>';
								}else if(n.HumAlarm==3){
									wd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">温度</div><img src="'+ctx+'/images/roommonitor/tip/wde3.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">异常</div></div>';
								}else if(n.HumAlarm==0){
									wd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">温度</div><img src="'+ctx+'/images/roommonitor/tip/wde.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">未监控</div></div>';
								}
								if(n.TemAlarm==1){ //湿度
									sd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">湿度</div><img src="'+ctx+'/images/roommonitor/tip/sde1.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">正常</div></div>';
								}else if(n.TemAlarm==2){
									sd = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">湿度</div><img src="'+ctx+'/images/roommonitor/tip/sde2.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f9830d;font-weight:bold;">警告</div></div>';
								}else if(n.TemAlarm==3){
									sd = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">湿度</div><img src="'+ctx+'/images/roommonitor/tip/sde3.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">异常</div></div>';
								}else if(n.TemAlarm==0){
									sd = '<div style="float:left;width:81px;"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">湿度</div><img src="'+ctx+'/images/roommonitor/tip/sde.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">未监控</div></div>';
								}
								if(n.LeakAlarm==0){ //漏水
									ls = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">漏水</div><img src="'+ctx+'/images/roommonitor/tip/lse.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">未监控</div></div>';
								}else if(n.LeakAlarm==1){
									ls = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">漏水</div><img src="'+ctx+'/images/roommonitor/tip/lse1.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">无漏水</div></div>';
								}else{
									ls = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">漏水</div><img src="'+ctx+'/images/roommonitor/tip/lse2.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">已漏水</div></div>';
								}
				/*				if(n.ElecAlarm==0){ //断电
									ld = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">断电</div><img src="'+ctx+'/images/roommonitor/tip/shide.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">未监控</div></div>';
								}else if(n.ElecAlarm==1){ //断电
									ld = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">断电</div><img src="'+ctx+'/images/roommonitor/tip/shide1.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">已通电</div></div>';
								}else{
									ld = '<div style="float:left;width:81px"><div style="width:81px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">断电</div><img src="'+ctx+'/images/roommonitor/tip/shide2.png" style="margin-top:10px;"/><div style="width:81px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">已断电</div></div>';
								}*/
								if(n.UpsAlarm==1){ //UPS
									ups = '<div style="float:left;width:71px"><div style="width:71px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">UPS</div><img src="'+ctx+'/images/roommonitor/tip/ups1.png" style="margin-top:10px;"/><div style="width:71px;margin-top:10px;margin-left:5px;color:#93aa16;font-weight:bold;">正常</div></div>';
								}else if(n.UpsAlarm==3){
									ups = '<div style="float:left;width:71px"><div style="width:71px;margin-top:5px;margin-left:5px;color:#CDCDC1;font-weight:bold;">UPS</div><img src="'+ctx+'/images/roommonitor/tip/ups2.png" style="margin-top:10px;"/><div style="width:71px;margin-top:10px;margin-left:5px;color:#f30007;font-weight:bold;">警告</div></div>';
								}
								finalOut ='<div style="width:400px;height:127px;padding-top:10px;">'+wd+sd+ls+ups+'</div>';
							}else{
								wd = '<div style="float:left;width:71px;"><img src="'+ctx+'/images/roommonitor/tip/no.png" style="margin-top:10px;margin-left:63px;"/><div style="width:71px;margin-top:10px;margin-left:60px;color:#CDCDC1;font-weight:bold;">设备网络故障</div></div>';
								finalOut ='<div style="width:170px;height:127px;padding-top:10px;">'+wd+'</div>';
							}
							return finalOut;
						}
					});
					$(".imgstat"+i).click(function(){
						$("#_sino_roomId").val(n.RoomId);
						var m=$("#_sino_roomId").val();
						$(".maintop").load(ctx+"/room/detail?tmp="+Math.random()+"&roomId="+m,n);
					});
				});
				var normHtml= new StringBuffer();
				var alarmHtml= new StringBuffer();
				var seriousHtml= new StringBuffer();
				normHtml.append("<div class='pop'  value="+normNum+"><p></p>");
				alarmHtml.append("<div class='pop'  value="+alarmNum+"><p></p>");
				seriousHtml.append("<div class='pop'  value="+seriousNum+"><p></p>");
				$.each(normRoomNames,function(i,ch){
					normHtml.append("<p><a href='#' class='roomdef' name='"+roomNameIds.get(ch)+"' >"+ch+"</a></p>");
				});
				$.each(alarmRoomNames,function(i,ch){
					alarmHtml.append("<p><a href='#' class='roomdef' name='"+roomNameIds.get(ch)+"' >"+ch+"</a></p>");
				});
				$.each(seriousRoomNames,function(i,ch){
					seriousHtml.append("<p><a href='#' class='roomdef' name='"+roomNameIds.get(ch)+"' >"+ch+"</a></p>");
				});
				seriousHtml.append("</div>");
				$("#normNum").html(normHtml.toString());  
				$("#alarmNum").html(alarmHtml.toString());  
				$("#seriousNum").html(seriousHtml.toString());
				$(".roomdef").click(function(){
					$("#_sino_roomId").val(this.name);
					$(".maintop").load(ctx+"/room/detail?tmp="+Math.random(),'');
				});
				if(seriousRoomNames.length>0){
					var queList = "<div class='quetitle'>故障机房列表</div><ul>";
					$.each(seriousRoomNames,function(i,ch){
						queList+="<li><small><a herf='#' id='quesroom"+i+"' >"+ch+"</a></small></li>";
					});
					queList+="</ul></div>";
					$("#quesList").html(queList);
					$.each(seriousRoomNames,function(i,ch){
						$("#quesroom"+i).click(function(){
							$("#_sino_roomId").val(seriousRoomData[i].RoomId);
							$('.maintop').load(ctx+"/room/detail?tmp="+Math.random(),seriousRoomData[i]);
						});
					});
				}
			
				$(".divimg").hover(function(){
					$(this).css("z-index", 2);
					var imgsrc = $(this).find("IMG").attr("src");
					imgsrc = imgsrc.substring(0,imgsrc.lastIndexOf("/")+1)+""+imgsrc.substring(imgsrc.lastIndexOf("/")+1,imgsrc.lastIndexOf("."))+"2.png";
					$(this).find("IMG").attr("src",imgsrc);
				},function(){
					$(this).css("z-index", 0);
					var imgsrc = $(this).find("IMG").attr("src");
					if(imgsrc.substring(imgsrc.lastIndexOf("/")+1,imgsrc.lastIndexOf(".")).indexOf("2")!=-1){
						imgsrc = imgsrc.substring(0,imgsrc.lastIndexOf("/")+1)+imgsrc.substring(imgsrc.lastIndexOf("/")+1,imgsrc.lastIndexOf(".")-1)+".png";
					}
					$(this).find("IMG").attr("src",imgsrc);
				});
				$.pop();      
			}
		});
	}
	
	function animateB(obj) {
		$(obj).animate({height: "98",width: "70",left: "-=25",top: "-=25"}, "1000");
	}
	
	function setImg() {
		if($("#roombg").find("a[id='_error_a']").length==0){
			$("#roomNames").append($("<span id='alarmDisplay'> ")).append($("<a href='javascript:void(0);' onClick='getErrorTableList();' id='_error_a'><img title='处理告警事件' src='images/gaojing_error.gif' style='margin-bottom: 10px; width: 50px; float: left;' /></a>")).append($("</span>"));
		 }
	}
	function reversAnimationB(obj) {
		$(obj).animate({height: "73",width: "45",left: "+=25",top: "+=25"}, "1000"); 
	}
	//ajax对机房的状态图标、温湿度数据做实时更新。
	function getNewData() {
		$.ajax({
			type : "POST",
			dataType: "json",//返回json格式的数据
			url : ctx+"/room/getAllRoomState",
			data : {},
			success : function(result) {
				$.each(result,function(i,n){
					var divId="#divId"+n.RoomId;
					var obj=$(divId);//获得每个图标div
					var imgval = getImgByState(n);
					var imgUrl=ctx+"/images/roommonitor/"+imgval+".png";
					$(obj).find("img").attr("src",imgUrl);
					$(obj).find("div").css("color",imgval);
				});
				$(".maintop").load(ctx+"/room/roomMap?tmp="+Math.random());
			}
		});
	}
	
	//通过机房的各种状态，来返回图标颜色
	function getImgByState(obj){
		var imgUrl="red";
		if(obj.RoomAlarm=="1"){
			if((obj.TemAlarm==0||obj.TemAlarm==1)&&(obj.HumAlarm==0||obj.HumAlarm==1)&&(obj.LeakAlarm==0||obj.LeakAlarm==1)&&(obj.ElecAlarm==0||obj.ElecAlarm==1)&&obj.UpsAlarm==1&&obj.AirConditionerAlarm==1&&obj.VoltageboxAlarm==1){
				imgUrl="green";
			}
			else if((obj.TemAlarm==0||obj.TemAlarm==1||obj.TemAlarm==2)&&(obj.HumAlarm==0||obj.HumAlarm==1||obj.HumAlarm==2)&&(obj.LeakAlarm==0||obj.LeakAlarm==1)&&(obj.ElecAlarm==0||obj.ElecAlarm==1)&&(obj.UpsAlarm==1||obj.UpsAlarm==2)&&(obj.AirConditionerAlarm==1||obj.AirConditionerAlarm==2)&&(obj.VoltageboxAlarm==1||obj.VoltageboxAlarm==2)){
				imgUrl="yellow";
			}else{
				imgUrl="red";
			}
		}
		return imgUrl;
	}
	
	function getErrorTableList(){
		var url = ctx + "/eventLatestDataInfo/getAllEventLatestDataInfo?tmp=" + Math.random();
		$("#taskTable").dataTable().fnDestroy();
	    table = $("#taskTable").dataTable({
	    	"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":false,
			"bDestroy": true,
			"bSort": false,
			"bFilter":false,
			"sAjaxSource":url, 
			"bRetrieve": true,
			"sServerMethod": "POST",
			"aoColumns": [
			              { "mData": "eventLevel","sWidth": "50px","mRender": function (data,row,obj){
			            	  var rstatus = "";
			            	  if(data==5){
			            		  rstatus='<img src="'+ctx+'/images/roommonitor/event/red.png" title="故障" />';
			            	  }else if(data==4){
			            		  rstatus='<img src="'+ctx+'/images/roommonitor/yellow.png" title="重要" />';
			            	  }else if(data==3){
			            		  rstatus='<img src="'+ctx+'/images/roommonitor/yellowalarm.png" title="警告" />';
			            	  }else if(data==2){
			            		  rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="警告" />';
			            	  }else{
			            		  rstatus='<img src="'+ctx+'/images/roommonitor/event/green.png" title="正常" />';
			            	  }
			            	  return rstatus;
			              }},
			              { "mData": "roomName","sWidth": "50px",},
			              { "mData": "deviceName","sWidth": "50px",},
			              { "mData": "eventName","sWidth": "50px",},
			              { "mData": "eventContent","sWidth": "50px",},
			              { "mData": "produceTimeString","sWidth": "50px",},	
			              { "mData": "lastProduceTimeString","sWidth": "30px",},	
			              { "mData": "frequentlyNum","sWidth": "30px",},
			              {"mData": "id","sWidth": "30px","mRender": function (data,row,obj){
			            	  var str="";
			            	  var ids=data;
			            	  if(obj.isAlarm==0){
			            		  str = '<a class="btn" style="width:30px;" onclick="testttt(\''+data+'\')">确认</a>&nbsp'+
			            		  '<a  name="change" id="'+ids+'" ><img id="simg" title="声音" src="images/sound.png"  /></a>'
			            	  }else{
			            		  str = '<a class="btn" style="width:30px;" onclick="testttt(\''+data+'\')">确认</a>&nbsp'+
			            		  '<a name="change" id="'+ids+'"  ><img id="simg" title="声音" src="images/nosound.png"  /></a>'
			            	  }
			            	  return str;
			              }}],
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
			              },
			              fnDrawCallback:function(){
								$('a[name="change"]').unbind('click').click(function () {
									var mid =this.id;
										changeImag(mid);
								});;
							}
	    });
	    $(".row").css("margin-left","5%");
		$(".bt5right").css("margin-right","5%");
		$("#taskTable").css("width","88%");
		$("#taskTable").css("margin-left","5%");
		$("#taskTable").css("margin-right","10%");
		testttt= function(obj){
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url:ctx+"/eventLatestDataInfo/dealLatestEvent",
				data : {"eventId":obj},
				success : function(result) {
					if(result.rs==1){
						getErrorTableList();
					}else{
						
					}
				}
			});
		};
	}

