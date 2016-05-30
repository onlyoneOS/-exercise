

    var roomsel,devicesel;
    
	 function  loadAll() {
		var roomIdfind = $("#roomIdfind").val();
		var url = "";
		url = ctx + "/eventLatestDataInfo/getAllEventLatestDataInfo?tmp=" + Math.random();
		var $field = $("#taskTable");
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
						   { "mData": "eventLevel","mRender": function (data,row,obj){
						  var rstatus = "";
						   if(data==5){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/red.png" title="故障" />';
						   }else if(data==4){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="重要" />';
						   }else if(data==3){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellowalarm.png" title="警告" />';
						   }else if(data==2){
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/yellow.png" title="警告" />';
						   }else{
							   rstatus='<img src="'+ctx+'/images/roommonitor/event/green.png" title="正常" />';
						   }
						   return rstatus;
						  }},
			              { "mData": "roomName"},
			              { "mData": "deviceName"},
			              { "mData": "eventName"},	
			             // { "mData": "eventLevel"},	
			              { "mData": "produceTimeString"},	
			              { "mData": "frequentlyNum"},	
			              { "mData": "lastProduceTimeString"},	
			              { "mData": "eventContent"},
			              {"mData": "id","mRender": function (data,row,obj){
			            	  var str = '<a class="btn" style="width:30px;" onclick="test(\''+data+'\')">处理完成</a>';
			            	  return str;
			            	  }
			              }				              
			          ],
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
			}
		});

		test= function(obj){
			$.ajax({
				 type : "POST",
				 dataType: "json",//返回json格式的数据
				  url:ctx+"/eventLatestDataInfo/dealLatestEvent",
					data : {"eventId":obj},
					success : function(result) {
						if(result.rs==1){
							 $(".edit_list").load(ctx + "/eventLatestDataInfo/optEvent?tmp=" + Math.random(),{},function(){
		                			$("#alertMsg").empty();
				         			$("#alertMsg").append('<div class="alert alert-success"><strong>提示：</strong>事件处理成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
		                	   });
						}else{
							   $("#alertMsg").empty();
			         			$("#alertMsg").append('<div class="alert alert-error"><strong>错误：</strong>事件处理失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
						}
					}
			});
		};
	};
