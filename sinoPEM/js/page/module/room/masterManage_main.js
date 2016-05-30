define(function(require, exports, module) {
	
	var $ = require("jquery");
	require("bootstrap");
	var easyUi$ = require("easyui");
	require("coverage");
	require("jquery.pop");
	exports.init = function() {
		
		$(document).ready(function() {
			 var imgDevice=$("div[name='imgDevice']");

			 $.each(imgDevice,function(i,n){
				var productTypeId=$(this).attr("productTypeId");
				var deviceName=$(this).attr("title");
				var deviceId=$(this).attr("id");
			});
			 
			 
			$.each(imgDevice,function(i,n){
				easyUi$($(this)).draggable();
			});
			
			
			//取消
			$("#cancelButton").unbind("click").click(function(){ 
				var options = {};
				options.keyName = "roomId";
				options.keyValue = $("#_sino_roomId").val();
				options.murl = "show/master/master_main";;
				$.openurl(options);
			});
			
			//保存
			$("#saveButton").unbind("click").click(function(){ 
				var x="";
				var y="";
				var deviceId="";
				imgDevice.each(function(){
					x=x+$(this).css("left").split("px")[0]+",";
					y=y+$(this).css("top").split("px")[0]+",";
					deviceId=deviceId+$(this).attr("id")+",";
				});
				x=x.substring(0, x.length-1);
				y=y.substring(0, y.length-1);
				deviceId=deviceId.substring(0, deviceId.length-1);
				var objs={deviceId:deviceId,pointX:x,pointY:y};
				$.ajax({
					url: ctx+"/room/saveDevicePoint",   
					data: objs, 
					type: "POST",                   
					error: function(request) {       
					},
					success: function(data) {
						// 设置表单提交完成使用方法
						if(data=="success"){
							alert("保存成功！");
							var options = {};
							options.keyName = "roomId";
							options.keyValue = $("#_sino_roomId").val();
							options.murl = "show/master/master_main";;
							//$.openurl(options);
						}else{
							alert("保存失败！");
							var options = {};
							options.keyName = "roomId";
							options.keyValue = $("#_sino_roomId").val();
							options.murl = "show/master/master_main";;
							//$.openurl(options);
						}
					}	
				});
			});
		});
	};
});