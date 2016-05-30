define(function(require, exports, module) {
	
	var $ = require("jquery");
	require("jquery.pop");
	var StringBuffer = require("stringBuffer");
	
	
	function showDetail(){
		var roomId = "${MotorRoomId }";
		$(document).ready(function() {
			var lefts = [100,250];
			var tops =[200,290];
			$.ajax({
				type : 'POST',
				dataType: "json",//返回json格式的数据
				url : ctx+"/room/getRoomUps?roomId="+roomId,
				data : {},
				success : function(result) {
					$.each(result,function(i,n){
						var upsimg="ups.png";
						/*if(n.CfgItemStatus>2){//2以下表示正常
							upsimg="upsAlarm.png";
						}*/
						$("#ups").append('<div class="divups'+i+'" style="left:'+lefts[i]+'px;top:'+tops[i]+'px;position:absolute;"><img src="'+ctx+'/images/roommonitor/detail/'+upsimg+'"/></div>');
						//$("#ups").append('		 <div style="left:250px;top:290px;position:absolute;"><img src="${ctx }/images/roommonitor/detail/ups.png"/></div>');
						   $(".divups"+i).popover({ 
								  trigger:'hover',
								   html:'true',
								   title:n.CfgItemName+'情况一览',
								  content:function(){
									  var ct = "";
									  $.each(n.normvals,function(j,normval){
										 // alert(normval.normName);
										  ct+="<div>"+normval.normName+":"+normval.normValue+""+normval.unitmean+"</div>";
									  });
									  return ct;
								  }
								  });
					});
				 }
			});
			
		});
		
	}
	
	exports.showDetail = function(){showDetail();}
	
});





	
