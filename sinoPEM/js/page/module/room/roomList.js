define(function(require, exports, module) {
	var $ = require("jquery");
	require("zTree_core");
	require("zTree_excheck");

	contOver =  function(o){
		o.style.border="1px solid #6b8e23";
	};
	contOut =  function(o){
		o.style.border="1px solid #add8e6";
	};
	var menu_Tree;
	exports.init = function(){
		addMenu();
		showContent();
		$.ajax({
			type : "POST",
			dataType: "json",
			url : ctx+"/room/getTileInfo",
			async : false,
			success : function(result) {
				$("#divv").empty();
				$("#roomName").append(result.roomName);
			}
		});
		//点击机房状态复选框事件
		$("input[name=alarmStatus]").click(function() {
			bindClick();
		});
		//点击设备类型
		$("input[name=atype]").click(function() {
			bindClick();
		});
	};
	
	function addMenu(){
		var setting = {
	    		data: {
	    			key : {
						name: "orgName",
						title: "orgName"
					},
					simpleData: {
						enable: true,
						idKey: "orgId",
						pIdKey : "parentId",
						rootPId: -1
					}
				},
				view: {
					selectedMulti: true
				},
				check: {
					enable: true
					//enable: true,
					//chkStyle:"checkbox",
					//autoCheckTrigger: true,
					//nocheckInherit: true,
					//chkDisabledInherit: true,
					//chkboxType: { "Y": "ps", "N": "s" }
				},
				callback: {
	                onCheck: onCheck
				},
				treeNode:{
					nocheck: false
				}
	    };
		$.ajax({
			type : "POST",
			url : ctx+"/room/getSysOrg",
			async:false,
			success : function(result) {
				menu_Tree = $.fn.zTree.init($("#resourcesTree"), setting,result);
				menu_Tree.expandAll(true);
			},
			error: function(request){
				
			}
		});
		function beforeClick(treeId, treeNode) {  
            var zTree = $.fn.zTree.getZTreeObj("resourcesTree");  
            zTree.checkNode(treeNode, !treeNode.checked, null, true);  
            return false;  
        }
		//点击树形复选框事件
		function onCheck(e, treeId, treeNode) {
			bindClick();
		}	
	}
	
	function bindClick() {
		var alarmStatus = "";
		var orgId = "";
		var deviceType = "";
		$("input[name=alarmStatus]").each(function() {
			if ($(this).attr("checked")) {
				alarmStatus += $(this).val() + ",";
			}
		});
		var menuChildNodes = menu_Tree.getCheckedNodes(true);
		for(var i =0;i<menuChildNodes.length;i++){
			if(menuChildNodes[i].children == undefined){//如果当前节点下没有元素则为叶子节点
				//if(menuChildNodes[i].parentId != -1){
					orgId+=menuChildNodes[i].orgId +",";
				//}
			}
		}
		$("input[name=alarmStatus]").each(function() {
			var val=$(this).val();
			if ($(this).attr("checked")) {
				$(".divimg").each(function() {
					var divv=$(this).attr("dis");
					if(divv==val){
						$(this).show();
					}
				});
			}else{
				$(".divimg").each(function() {
					var divv=$(this).attr("dis");
					if(divv==val){
						$(this).hide();
						}
					});
			}
		});
		$("input[name=atype]").each(function() {
			if ($(this).attr("checked")) {
				deviceType= $(this).val() ;
			}
		});
		filterContent(alarmStatus,orgId,deviceType);
	}
	
	//根据组织和设备类型进行过滤
	function filterContent(alarmStatus,orgId,deviceType){
//		alert(deviceType);
	//	alert(deviceType);
		var list = "list";
		if(deviceType=="1"){ 	//机房
				$.ajax({
					type : "POST",
					dataType: "json",//返回json格式的数据
					url : ctx+"/room/getAllRoomStateByOrg",
					data : {"orgId":orgId,"alarmStatus":alarmStatus,"list":list},
					success : function(result) {
						$(".roomContents").empty();
						
						$.each(result,function(i,n){
							var str = "";	
							if(n.RoomAlarm==1){//先判断设备的通断状态
								str='<div class="element" >'
					                   +'<div class="contentone">';
								str+='机房名称：<a href="#" class="roomdef" name="'+n.RoomId+'" >'+n.Name+'</a><br/>';
								str+='所属机构：'+n.OrgName+'<br/>';
								str+='机房状态：';
								if((n.TemAlarm==0||n.TemAlarm==1)&&(n.HumAlarm==0||n.HumAlarm==1)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&n.UpsAlarm==1&&n.AirConditionerAlarm==1&&n.VoltageboxAlarm==1){
									str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
								}else if((n.TemAlarm==0||n.TemAlarm==1||n.TemAlarm==2)&&(n.HumAlarm==0||n.HumAlarm==1||n.HumAlarm==2)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&(n.UpsAlarm==1||n.UpsAlarm==2)&&(n.AirConditionerAlarm==1||n.AirConditionerAlarm==2)&&(n.VoltageboxAlarm==1||n.VoltageboxAlarm==2)){
									str+='<img src="'+ctx+'/images/state/state_yellow.gif"><br/>';
								}else{
									str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
								}
								str+='</div>';
							}else{
								str='<div class="element" >'
					                   +'<div class="contentone">';
								str+='机房名称：<a href="#" class="roomdef" name="'+n.RoomId+'" >'+n.Name+'</a><br/>';
								str+='所属机构：'+n.OrgName+'<br/>';
								str+='机房状态：<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}
							$(".roomContents").append(str);
						});
						//跳转到机房
						$(".roomdef").click(function(){
							//alert(this.name);
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					}
				});
		}else if(deviceType=="3"){	//UPS
			$(".roomContents").empty();
			var typeName = "UPS";
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='UPS名称：<a href="#" class="upsInfo" name="" >'+n.deviceName+'</a><br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='UPS状态：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_yellow.gif"><br/>';
							}else if(n.deviceIndicatorState==3){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='UPS名称：<a href="#" class="upsInfo" name="" >'+n.deviceName+'</a><br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='UPS状态：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
						//跳转到UPS页面
						$(".upsInfo").click(function(){
							//$(".maintop").load(ctx+"/room/detail?tmp="+Math.random(),'');
							$(".maintop").load(ctx+"/show/ups/ups_main?roomId="+n.roomId+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}else if(deviceType=="6"){	//空调
			$(".roomContents").empty();
			var typeName = "AHU";
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='空调名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='空调状态：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_yellow.gif"><br/>';
							}else if(n.deviceIndicatorState==3){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='空调名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='空调状态：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}else if(deviceType=="1407394735480"){	//烟感
			
			$(".roomContents").empty();
			var typeName = "smoke";
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='机房烟感：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='机房烟感：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}else if(deviceType=="1387432711692"){	//温湿度
			$(".roomContents").empty();
			var typeName = "WSdegree";
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){ 
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_yellow.gif"><br/>';
							}else if(n.deviceIndicatorState==3){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}else if(deviceType=="1407394761407"){	//漏水
			$(".roomContents").empty();
			var typeName = "leaking";
			//alert(alarmStatus+"|"+orgId+"|"+deviceType);
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}else if(deviceType=="断电"){	//断电
			$(".roomContents").empty();
			var typeName = "outages";
			//alert(alarmStatus+"|"+orgId+"|"+deviceType);
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getDeviceManageByDeviceType",
				data : {"orgId":orgId,"alarmStatus":alarmStatus,"deviceType":deviceType,"typeName":typeName,"list":list},
				success : function(result) {
					$.each(result,function(i,n){
						var str = "";
						if(n.roomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：';
							if(n.deviceIndicatorState==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if(n.deviceIndicatorState==2){
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}else{
								str+='未监控<br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='设备名称：'+n.deviceName+'<br/>';
							str+='所属机房：<a href="#" class="roomdef" name="'+n.roomId+'" >'+n.roomName+'</a><br/>';
							str+='监控状态：未监控<br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.name);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.name+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		}
	}
	
	//列表初始化页面
	function showContent(){
		$(document).ready(function(){
			$.ajax({
				type : "POST",
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getAllRoomState",
				data : {},
				success : function(result) {
					$.each(result,function(i,n){
						var str = '';	
						if(n.RoomAlarm==1){//先判断设备的通断状态
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='机房名称：<a class="roomdef" href="#" id='+n.RoomId+' name="roomName" >'+n.Name+'</a><br/>';
							str+='所属机构：'+n.OrgName+'<br/>';
							str+='机房状态：';
							if((n.TemAlarm==0||n.TemAlarm==1)&&(n.HumAlarm==0||n.HumAlarm==1)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&n.UpsAlarm==1&&n.AirConditionerAlarm==1&&n.VoltageboxAlarm==1){
								str+='<img src="'+ctx+'/images/state/state_green.png"><br/>';
							}else if((n.TemAlarm==0||n.TemAlarm==1||n.TemAlarm==2)&&(n.HumAlarm==0||n.HumAlarm==1||n.HumAlarm==2)&&(n.LeakAlarm==0||n.LeakAlarm==1)&&(n.ElecAlarm==0||n.ElecAlarm==1)&&(n.UpsAlarm==1||n.UpsAlarm==2)&&(n.AirConditionerAlarm==1||n.AirConditionerAlarm==2)&&(n.VoltageboxAlarm==1||n.VoltageboxAlarm==2)){
								str+='<img src="'+ctx+'/images/state/state_yellow.gif"><br/>';
							}else{
								str+='<img src="'+ctx+'/images/state/state_red.gif"><br/>';
							}
							str+='</div>';
						}else{
							str='<div class="element" >'
				                   +'<div class="contentone">';
							str+='机房名称：<a class="roomdef" href="#" id='+n.RoomId+' name="roomName" >'+n.Name+'</a><br/>';
							str+='所属机构：'+n.OrgName+'<br/>';
							str+='机房状态：<img src="'+ctx+'/images/state/state_red.gif"><br/>';
						}
						$(".roomContents").append(str);
						//跳转到机房
						$(".roomdef").click(function(){
							$("#_sino_roomId").val(this.id);
							$(".maintop").load(ctx+"/room/detail?roomId="+this.id+"&tmp="+Math.random(),'');
						});
					});
				}
			});
		});
		//bindClick();
	}
	
	//显示隐藏机房过滤
	dynamicShow =function(){
		$("#resourcesTree").toggle(1000);
	};
	
});