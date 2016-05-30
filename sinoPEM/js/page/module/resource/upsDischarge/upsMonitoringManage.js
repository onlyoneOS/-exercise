
	function loadAll(){
		//load();
		 var deviceStart=$("a[name='_start_ups']");
		 $.each(deviceStart,function(i,n){
			 $(this).unbind("click").click(function(){
				 var id=$(this).attr("id");
					startDischarge(id);
				})
				
		 });
		
		$('input[id="stopRefresh"]').each(function(){
			var stop=$(this).val();
			if(stop=="running"||stop=="abnormal"){
				var inter = setInterval(function(){
					clearInterval(inter);
					refreshPage();
				}, 5000); 
			}
		});
		
	    	
		$("#finishbutton").unbind("click").click(function(){
			var devids="";
			var m=0;
			var n = 0;
			$("input[name=currentStatus]").each(function(i){
				//alert($(this).val());
				if($(this).val()=="end"){
					m=m+1;
				}else{
					n=n+1;
				}
			});
			
			$("input[name=devid]").each(function(i){
				devids=devids+$(this).val()+",";
			});

			alert("放电报告:正常:"+m+"个,异常:"+n+"个!");
			
			var url = ctx+"/upsDischargeBak/saveUpsDischargeInfo?devids="+devids;
			$.ajax({
				type : "GET",
				async : false,
				dataType : "text",
				url : url,
				success : function(msg) {
					if(msg="success"){
						var url= ctx+"/upsDischargeBak/upsMonitoringManage?tmp="+Math.random();
						$("#edit_list").empty();
						$(".edit_list").load(url,function(){
							
						});
					}
				},
			});
		});
		
		//停止放电
		 var device=$("a[name='_stop_ups']");
		 $.each(device,function(i,n){
				$(this).unbind("click").click(function () {
					if(confirm("确定要停止吗？")){
						var stopType="3";
					    var devId= $(this).attr("id");
					    var url = ctx+"/upsDischargeBak/upsStopDischarge?devId="+devId+"&stopType="+stopType;
					    $.ajax({
					    	type : "GET",
					    	async : false,
					    	dataType : "text",
					    	url : url,
					    	success : function(msg) {
					    		if(msg){
					    			if(msg="success"){
					    				//document.getElementById(devId).style.display="none";
					    				var url= ctx+"/upsDischargeBak/upsMonitoringManage?tmp="+Math.random();
					    				$("#edit_list").empty();
					    				$(".edit_list").load(url,function(){
					    					
					    				});
					    			}
			    					
			    				/*	$(".finish").empty();
			    					$(".finish").append(msg+"放电完成");*/
					    		}
					    	}
					    });
					}
				});
		 });
	};
	
	function refreshPage(){
		var url= ctx+"/upsDischargeBak/upsMonitoringManage?tmp="+Math.random();
		$("#discharge").empty();
		$("#discharge").load(url,function(){
			
		});
	}
	//开启放电
	function startDischarge(id){
		var url= ctx+"/upsDischargeBak/upsStartDischarge?ids="+id;
		$.ajax({
			type : "GET",
			async : false,
			dataType : "text",
			url : url,
			success : function(msg) {
				if(msg="success"){
					var url= ctx+"/upsDischargeBak/upsMonitoringManage?tmp="+Math.random();
					$("#edit_list").empty();
					$("#edit_list").load(url,function(){
						
					});
				}
			},
		});
	}
		
	/*var url = ctx+"/upsDischargeBak/upsStartDischarge?devId="+$("#devId").val();
		$.ajax({
			type : "GET",
			async : false,
			dataType : "json",
			url : url,
			success : function(msg) {
			
			}
		});*/

		//setInterval("startDischarge()",10000);//3秒一次执行
		//定时取最新数据
		//int=setInterval(refreshPage, 10000); 
		//clearInterval(int);
