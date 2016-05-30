	 function  getAllMonitorPolicy( ){
		 var url =  ctx+"/monitorPolicy/queryAllDeviceMonitorPolicy";		 
	//	 var url =  ctx+"/collectTask/queryAllDeviceMonitorPolicy";
			$('#taskTable').dataTable().fnDestroy();
			var taskTable = $('#taskTable').dataTable({
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
				              { "mData": "collectName","mRender": function (data){
				            	  
				            	  var  rstatus = "";
				            	  var  idAndName = data.split(",");
				            	  var  id = idAndName[0];
				            	  var  name = idAndName[1];
				            	  
				            	  rstatus="<div style='float:left;' >" +
		          		  				"<div style='display:block;float:left;'>"+
		          		  				"<span  name='roomInfo' >"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</span></div> ";
	          		              return rstatus;
				              }},	
				              { "mData": "cronMsg"},
				              { "mData": "id", "mRender": function (data){
				            	  
				            	       var  id = data;
				            	       var str = '<a href="#" id= "'+id+'"  name="detail"><span  class="icon-cog"></span>采集指标明细</a>';
				            	       return str;
				                 }			            	  
				              }	,
				              { "mData": "remark", "mRender":function (data){
				            	      	
				            	      var id = data.split(",")[0];
				            	      var remark = data.split(",")[1];
				            	      var str = '';
				            	      if( remark == "1"){ //1代表已停止,可以启动操作
				            	    	 /* str += '<a href="#" id= "'+id+'"  name="taskStart">开始</a>';				            	      
				            	          str += '&nbsp;&nbsp;&nbsp;&nbsp;停止';*/
				            	    	  str=' 未执行';
				            	      }
				            	      else if(remark == "0"){ //0代表已启动，可以停止操作
				            	    	 /*// str += "";
				            	    	  str += '开始&nbsp;&nbsp;&nbsp;&nbsp;';
				            	    	  str += '<a href="#"  id= "'+id+'"   name="taskStop">停止</a>';		*/		 
				            	    	  str="正在执行";
				            	          				            	      
				            	      }
				            	      return str;
				                 } 
				              }, { "mData": "id", "mRender":function (data){
				            	  var rstatus='';
				            	  var id = data;
				          		  rstatus="<a name ='modibutton'   role='button' data-toggle='modal'  id='"+id+"'>" +
				          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				          		  		"<a name='delbutton' href='#' id='"+id+"'>&nbsp" +
				          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
				          		  return rstatus;
			                 } 
			              }
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
					$('a[name="modibutton"]').unbind('click').click(function () {
						
						var mid =this.id;
						modiMonitorPolicy(mid);
	
					});
					$('a[name="delbutton"]').unbind('click').click(function () {
						var mid =this.id;
						delMonitorPolicy(mid);
					});
					
					 $('a[name="detail"]').unbind('click').click(function () {
							
							var policyId =this.id;
							getDetail(policyId);
		
					    });		
					
				    $('a[name="taskStart"]').unbind('click').click(function () {
							if(confirm("确认开始该任务？")){
								var policyId =this.id;							
								$.ajax({
									type:'post',
									url: ctx + "/monitorPolicy/taskManage?policyId="+policyId+"&remark="+0,
									success: function(data){
										//  str += '开始&nbsp;&nbsp;&nbsp;&nbsp;';
										//  str += '<a href="#" id= "'+id+'"  name="taskStart"><span  class="icon-cog"></span>停止</a>';				            	      				            	         				            	      		            	    
										var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
										$('#edit_list').empty();
										$('#edit_list').load(pUrl);
									}
								});
							}
		
					});
				    
                   $('a[name="taskStop"]').unbind('click').click(function () {
                	   if(confirm("确认停止该任务？")){
							var policyId =this.id;
							$.ajax({
						    	type:'post',
						    	url: ctx + "/monitorPolicy/taskManage?policyId="+policyId+"&remark="+1,
							    success: function(data){
							    	//  str += '开始&nbsp;&nbsp;&nbsp;&nbsp;';
			            	    	//  str += '<a href="#" id= "'+id+'"  name="taskStart"><span  class="icon-cog"></span>停止</a>';				            	      				            	         				            	      		            	    
						    		var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
									$('#edit_list').empty();
									$('#edit_list').load(pUrl);
							    }
						    });
                	    }
				    });
	
				    
				   
		
					$('#taskTable tbody tr').each(function(){
						var tdd=$(this.childNodes[0]);
						var sss=$(tdd.children()[0]);
					    tdd.bind("mouseover",function(){
					    	$(sss.children()[1]).css('display','block'); 
					    });
					    
					    tdd.bind("mouseout",function(){
					    	$(sss.children()[1]).css('display','none'); 
					    });
					  
					})

				}
			
			});
			
		
			$("#query").unbind('click').click(function(){
				  addMonitorPolicy();
			});	 
 }
     /**
      *  增加策略配置
      */
     function addMonitorPolicy(){
			 
			var url = ctx+"/monitorPolicy/addMonitorPolicyPage";
			$('#edit_list').empty();
			$('#edit_list').load(url);
	 }
		 
		 
		 
	/**
	 *  修改策略配置
	 */
	 function  modiMonitorPolicy(id){
		 
		   var  monitorPolicyId = id;
		   var  modiUrl = ctx+"/monitorPolicy/modiMonitorPolicyPage?monitorPolicyId="+monitorPolicyId;
		   $('#edit_list').empty();
		   $('#edit_list').load(modiUrl);

	 }
		 
	
	 
	  /**
	   * 删除策略配置
	   */
	 function  delMonitorPolicy(id){
			  var policyId = id;
			  var url = ctx+"/monitorPolicy/delMonitorPolicy?monitorPolicyId="+ policyId;
			  $.post(url,function(data){
					var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
					$('#edit_list').empty();
					$('#edit_list').load(pUrl, function(){
						
						 $("#msg").empty();
		 				 $("#msg").show();
		 				 var str = '<div class="alert alert-success"><strong>提示: </strong>删除成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>'
		 				 $("#msg").append(str);
		 				 $("#msg").delay(2000).hide(0);
		 				
					});			
			  });
		 }
	 
	 /**
      *  获取采集明细
      */
     function getDetail(policyId){		 
			var url = ctx+"/collectTask/collectTaskDetailPage?policyId="+policyId;
			$('#edit_list').empty();
			$('#edit_list').load(url);
	 }
		 

