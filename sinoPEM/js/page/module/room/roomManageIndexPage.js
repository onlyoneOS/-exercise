function showMap(){
	
		var normNum=0;
		var alarmNum=0;
		var seriousNum=0;
		getIndicatorName();	
		var normRoomNames = new Array();
	/*	$.ajax({
			type : 'POST',
			dataType: "json",//返回json格式的数据
			//url : "${ctx}/room/getAllState",
			url : ctx+"/room/getAllRoomState",
			data : {},
			async : false,
			success : function(result) {
				$.each(result,function(i,n){
						normNum+=1;
						normRoomNames.push(n.Name);
						 $("#divv").append($("<div id="+n.RoomId+" class='imgstat"+i+" divimg'  name='imgRoom' style='position:absolute;display:block;'></div>").append("<img src='"+ctx+"/images/roommonitor/green.png' name='ditu'  data-content='"+n.Location+"' title='"+n.Name+"' data-original-title='adfadfadfa' rel='popover' class='trigerImg' id='trigger"+i+"' height='14px'>"));
						$(".imgstat"+i).css("left",n	.PointX);
						$(".imgstat"+i).css("top",n.PointY);
						$(".imgstat"+i).css("cursor","pointer");
						$(".imgstat"+i).unbind("click").click(function(){ 
							 $('.edit_list').empty();
	                		 $('.edit_list').load(ctx + '/room/masterManage?roomId='+n.RoomId+'&tmp=' + Math.random());
						});
				});
				
			}
		});*/
		var imgRoom=$("div[name='imgRoom']");
		$("#editButton").unbind("click").click(function(){ 
			$.each(imgRoom,function(i,n){
				$(this).unbind("click");
				easyUi$($(this)).draggable();
			});
		});
			
		//机房坐标修改
		 $("#saveButton").unbind("click").click(function(){ 
			var x="";
			var y="";
			var roomId="";
			$(".divimg").each(function(){
					x=x+$(this).css("left").split("px")[0]+",";
					y=y+$(this).css("top").split("px")[0]+",";
					roomId=roomId+$(this).attr("id")+",";
			  });
			x=x.substring(0, x.length-1);
			y=y.substring(0, y.length-1);
			roomId=roomId.substring(0, roomId.length-1);
			var objs={roomId:roomId,pointX:x,pointY:y};
			$.ajax({
                url: ctx+"/room/saveIndexPage",   
                data: objs, 
                type: "POST",                   
                error: function(request) {       
                },
                success: function(data) {
                // 设置表单提交完成使用方法
                   if(data=="success"){
                	   alert("保存成功！");
                	   $('.edit_list').load(ctx + '/room/manageIndexPage?tmp=' + Math.random());
                   }else{
                	   alert("保存失败！");
                   }
                }	
			});
		});
		 
		 $("#cancelButton").unbind("click").click(function(){ 
			 alert("操作成功")
		 });
			
  /*      //进入背景图片选择
		$("#roomName").click(function(){
			sysrooms();
		})
		function sysrooms(mid){
			var id = mid;
			var url = ctx+"/sysRoomMatching/manage?roomId="+id;
			$('#edit_list').empty();
			$('#edit_list').load(url,function(){
				
			});
		}*/
		
		
		//机房名称
		
		 function  getIndicatorName(){
			   
			 $('#roomName').empty();
				var $fieldCompDevType = $("#roomName");
				$fieldCompDevType.addClass("li_form");
				var optionCompDevTypes = {
					inputName : "room",
					writeType : 'show',
					width: "250", //高度
					showLabel : false,
					url : ctx+'/room/getRoomName',
					inputValue:"all",
					onSelect :function(id){
						getRoomBasckGround(id);
					}  
				};
				$fieldCompDevType.formSelect(optionCompDevTypes);
				
				var roomId = "";
				$("#roomName").find("ul li").each(function(i,ele){
					if(i == 0){
						var obj = $(ele);
						roomId = obj.attr("infinityid");
						$("#room_id").val(roomId);
					}
				});
				$("#roomName").formSelect('setValue',roomId); 
		 }
		 getRoomBasckGround($("#room_id").val());
		 function getRoomBasckGround(id){
			 $('#divv').empty();
			 $('#divv').load(ctx+'/room/masterManage?roomId='+id);
			/*	$.ajax({
	                url:ctx+'/room/getRoomImage?roomId='+id,  // 提交的页面
	                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
	                async:false,
	                success: function(data) {
	                	
	                	if(data!=""){
		                	var jsonStr = data;
		                	sourceImage=jsonStr[0].image;
		                	
		                	var img_src="";
		            		img_src=$("#imageURL").val();
		            		$("#divv").css("background","url("+img_src+") no-repeat");
		            		
		                	
	                	}
	                }
	            });*/
		 }
	
  }
	



	
