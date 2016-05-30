
	 function  getAllAlarmInfo( ){
		 
		 var url =  ctx+"/alarmInfo/queryAllAlarmInfo";		 
			$('#taskTable').dataTable().fnDestroy();
		    $('#taskTable').dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
			//	"bStateSave":false,
				"bFilter":true,
				"sAjaxSource":url, 
				//"fnServerData": fnDataTablesPipeline,
				"bRetrieve": true,
				"aoColumns": [
				              {"mData":"alarmInfoId","mRender": function(data,row,obj){
					          	  var ids = data;
						          	var isCheck = "";
						          	  if(obj.remark==1)
						          	  {
						          		isCheck = '<input type="checkbox" checked="checked" value="'+obj.remark+'" class="btn" id="'+ids+'" style="width:30px;" ></input>&nbsp;'
						          	  }
						          	  	if(obj.remark==0)
						          	  	{
						          	  	isCheck = '<input type="checkbox" value="'+obj.remark+'" class="btn" id="'+ids+'" style="width:30px;" ></input>&nbsp;'
						          	  	}
						          	   return  isCheck;		            	   				            	  
						            }},
				              { "mData": "alarmType","mRender":function(data,row,obj){
				            	  var type=data;
				            	  var ids=obj.alarmInfoId;
				            		var  ch='<a  name="update" id="'+ids+'" href="#myModal1" role="button" target="_self"  data-toggle="modal" >&nbsp<span style="color:#ffffff">'+type+'</span></a>&nbsp;'
				            	  return ch;
				              }},
				              { "mData": "alarmTarget"},
				              { "mData": "alarmContent"}
				          ],
				"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
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
				/*
				 * 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
				*/
				fnDrawCallback:function(){
					$("input[type='checkbox']").unbind("click").bind("click",addAlarmInfo);
					$('a[name="delbutton"]').unbind('click').click(function () {
							var mid =this.id;
							delAlarmInfo(mid);
						});
					$('a[name="update"]').unbind('click').bind("click",addAlarmInfo);
				
					$('#taskTable tbody tr').each(function(){
						var tdd=$(this.childNodes[0]);
						var sss=$(tdd.children()[0]);
					    tdd.bind("mouseover",function(){
					    	$(sss.children()[1]).css('display','block'); 
					    });
					    
					    tdd.bind("mouseout",function(){
					    	$(sss.children()[1]).css('display','none'); 
					    });
					  
					});

				}
			});
		    $("#createbutton").unbind('click').click(function(){
				addAlarmInfo();
			});
 }
	
  
     /**
      *  告警信息
      */
     function addAlarmInfo(){
    	 	 var id=$(this).attr("id");
    	     var remark=$(this).val();
    	 		if(remark==1){
    	 			var alarmInfoId=id;
    	 			delAlarmInfo(id);
    	 		}else{
    	 			$("#dailogs1").empty(); 				    
         	         var str = '<div id="myModal1" name="myModal1" class="modal hide fade" tabindex="-1"  aria-labelledby="myModalLabel" aria-hidden="true"></div>';				    
         			 $("#dailogs1").append(str);
         			 var url = ctx+"/alarmInfo/addAlarmInfoPage?id="+id;
         			 $("#myModal1").load(url);
    	 		}
    	 		
	 }
     /**
      * 取消告警信息
      */
     function  delAlarmInfo(id){
			  var alarmInfoId = id;
			  var url = ctx+"/alarmInfo/delAlarmInfo?alarmInfoId="+ alarmInfoId;
			  $.post(url,function(data){
					var pUrl = ctx+"/alarmInfo/alarmInfoManagePage" ;
					$('#edit_list').empty();
					$('#edit_list').load(pUrl, function(){
						
						 $("#msg").empty();
		 				 $("#msg").show();
		 				 var str = '<div class="alert alert-error"><strong>提示: </strong>取消成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>'		 			
		 				 $("#msg").append(str);
		 				 $("#msg").delay(2000).hide(0);
		 				
					});			
			  });
		 }
	 
