		 /**
		  *  初始化页面
		  */	
		function loadAll(){
		
			//获取所有机房信息
			var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
			getRoomInfo(rUrl);
			
			//获取产品类型树
			getProductTypeTree( );
			
			//绑定批量添加事件
			$("#addMore").unbind('click').click(function(){
				
				// addMoreSite();		
				addMoreResourceDeviceprotocol();
			});
			
			//绑定批量删除事件
			$("#delMore").unbind('click').click(function(){
				
				delMoreResourceDeviceprotocol();
			});
				
			
			//绑定全选事件
			$("#selAll").unbind("click").click(function(){
		
				  var isChecked = $("#selAll").attr("checked");
				  if(isChecked == "checked"){
					  
					  $('input[name="more"]').each(function(){
						    var data = $(this);
						    data.attr("checked", "checked"); 
					   });	  
				  }else{
					  $('input[name="more"]').each(function(){
						    var data = $(this);
						    data.attr("checked", null);
					   });
				  }
			
			});
			
		    getAllResourceDeviceprotocol("all", "all");
			  
		
		}




	 function  getAllResourceDeviceprotocol(roomId, typeId){
		 
		 var url = ctx+"/resourceDeviceprotocol/getAllResourceDeviceprotocol?roomId="+roomId+"&typeId="+typeId;
			$('#taskTable').dataTable().fnDestroy();
			var taskTable = $('#taskTable').dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
			//	"bStateSave":false,
				"bFilter":false,
				"sAjaxSource":url, 
				//"fnServerData": fnDataTablesPipeline,
				"bRetrieve": true,
				"aoColumns": [                             
				              {"mData": "deviceIdAndProtocolId",  "mRender": function(data){
				            	  
				            	  var ids = data.split(",");		
				            	  var deviceId = ids[0];
				            	  var isCheck = "";
				            	   if(ids.length>2){
				            		  // isCheck = "<input name='more' type='checkbox' checked='checked' value='"+deviceIds+"'/>";
				            		   isCheck = "<input name='more' type='checkbox'  value='"+ids+"'/>";
				            	   }else{
				            		  // isCheck = "<input name='more' type='checkbox' value='"+deviceIds+"'/>"; 
				            		   isCheck = "<input name='more' type='checkbox' value='"+ids+"'/>"; 
					            	   
				            	   }				            	   
				            	   return  isCheck;			            	   				            	  
				              }},
				              { "mData": "deviceName"},
				              { "mData": "roomName"},
				              { "mData": "productTypeName"},
				              { "mData": "manageIp"},	            
				              { "mData": "deviceprotocolId", "mRender": function(data){
				            	  //stu
				            	  var rstu = "";
				            	  var deviceprotocolId = data;
				            	  if(deviceprotocolId != null){
				            		  rstu = "已授权";
				            	  }else{
				            		  rstu = "未授权";
				            	  }
				            	  return rstu;
				            	  			 
				              }},
				              { "mData": "deviceIdAndProtocolId", "mRender": function (data) {
				            	  var rstatus='';	
				            	  var ids = data.split(",");
				            	  var id="";
				            	 if(ids.length>2){			            		  
				            		  id = ids[2];
				            		  rstatus = '<a href="#" id="'+id+'" name="modibutton"  class="roommodi" >修改授权</a> | <a href="#" id="'+id+'" name="delbutton" class="roomdel">删除授权</a>';
				            	  }else{
				            		  id = ids[0];
				            		  rstatus = '<a href="#" id="'+id+'" name="addbutton"  class="openBtn">填写授权信息</a>';
				            	  }
				           
				          		  return rstatus;
				          		
				              		}}
				                   
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
				
				// 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载				
				fnDrawCallback:function(){
					$('a[name="modibutton"]').unbind('click').click(function () {
						var mid =this.id;
			           // modiSite(mid);
			            modiResourceDeviceprotocol(mid);
			            
					});
					$('a[name="delbutton"]').unbind('click').click(function () {
					//	alert("del");
						var mid =this.id;
						//delSite(mid);
						delResourceDeviceprotocol(mid);
						
					});
					$('a[name="addbutton"]').unbind('click').click(function () {
						var mid =this.id;
						//addSite(mid);	
						addResourceDeviceprotocol(mid);
					});
		
				}
			
			}); 
				 		 
 }

	/*function RefreshTable(){
	  			table.fnSort( [ [1,'asc'] ] );
				table.fnSort( [ [1,'desc'] ] );
		  } */
	


    /**
     *  批量添加DeviceProtocol
     */
     function  addMoreResourceDeviceprotocol(){
        	
 		   var  ids = new Array();
 		   var  types = new Array();
 		   var  datas =  $('input[name="more"]').each(function(){
 			    var data = $(this);
 			    if(data.attr("checked")=="checked"){
 			    	var id = data.val().split(",");			    				    	
 			    	//ids.push(data.val()); 
 			    	ids.push(id[0]);
 			    	types.push(id[1]);
 			    }  
 		   });
 		   
 		   if(ids.length==0) return;
 		   for(var i=0; i<types.length; i++){
 			   alert("type     "+types[i]);
 			   if(types[i] != types[0]){			   
 				 $("#mesg").empty();
 				 $("#mesg").show();
 				 var str = '<div class="alert alert-error"><strong>提示: </strong>必须是同一类型的设备!<button type="button" class="close" data-dismiss="alert">&times;</button></div>'
 				// var str = '<font color="red" size="2">必须是同一类型的设备!</font>';
 				 $("#mesg").append(str);
 				 $("#mesg").delay(2000).hide(0);
 				 return;
 			   }
 				
 		   }
 		   
 		   
 		   
 		   var url = ctx+"/resourceDeviceprotocol/addMoreResourceDeviceprotocolPage?tmp=" + Math.random();	   
 		   $('#edit_list').empty();
 		   $('#edit_list').load(url, function(){
 			   
 			  //设置div的隐藏及显示
				$("#authorizeType").unbind("change").change(function(){
					
					  var typeVal = $("#authorizeType").val();
					  if(typeVal == "telnet"){
						   $("#snmp").hide();
						   $("#telnet").show();
					  }else{
						   $("#snmp").show();
						   $("#telnet").hide();
					  }
				});
				
				//sshport的隐藏及显示
				$("#isSsh").unbind("click").click(function(){
					
					 var isSsh = $("#isSsh").attr("checked");
					 if(isSsh == "checked"){			 
						  $("#sshPort").show();
					 }else{
						  $("#sshPort").hide();
						  $("#ssh").attr("checked", "checked");		  
					 }
					
				});
				
				
				if($("#snmpRo").val()==""){
					$("#snmpRo").val("public");
				}
				if($("#snmpRw").val()==""){
					$("#snmpRw").val("public");
				}
				
 			   
 			   var mUrl = ctx+"/resourceDeviceprotocol/addNewResourceDeviceprotocol?ids="+ids;
 			 	$("#addMoreSite").unbind("click").click(function(){
 			 		// alert("add more in");
 			 	     $.ajax({
 			 	    	 url:mUrl,
 			 	    	 type:"post",
 			 	    	 data:$("#addMoreForm").serialize(),
 			 	    	 async:false,
 			 	    	 success:function(data){
 				 	    	 $('#edit_list').empty();									 	    	 
 				 	    	 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());
 			 	    	 }
 			 	     }); 	                
 			 	});
 			 	
 			 $("#site").unbind("click").click(function(){
			 		 $('#edit_list').empty();					
			 		 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
			 	
			  });
 			 $("#reset").unbind("click").click(function(){
		 		 $('#edit_list').empty();					
		 		 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
		 	
		  });
 			 
 		   });
    	
   }


     /**
      * 添加DevicePrococol
      */
	 function addResourceDeviceprotocol(mid){
              
                var deviceId = mid.split(",")[0];
				var url = ctx+"/resourceDeviceprotocol/addResourceDeviceprotocolPage?tmp=" + Math.random();
			//	$('#taskTable').dataTable();
				$('#edit_list').empty();
				$('#edit_list').load(url,function(){
					var deviceUrl = ctx+"/resourceDeviceprotocol/queryDeviceByDeviceId?deviceId="+deviceId;
					$.post(deviceUrl, function(data){
                         var deviceName = data.deviceName;
                         var devId = data.id;
                         var deviceType = data.deviceType;
                         var manageIp = data.manageIp;

						 $("#deviceName").attr("value", deviceName);
						 $("#deviceId").attr("value", devId);
						// $("#deviceType").attr("value", deviceType);
			    		 $("#deviceManageIp").attr("value", manageIp);
									
				  //设置div的隐藏及显示
					$("#authorizeType").unbind("change").change(function(){
						
						  var typeVal = $("#authorizeType").val();
						  if(typeVal == "telnet"){
							   $("#snmp").hide();
							   $("#telnet").show();
						  }else{
							   $("#snmp").show();
							   $("#telnet").hide();
						  }
					});
					
					//判断是否为snmpV3版本
					$("#snmpVersion").unbind('change').change(function(){
						 var isSnmpV3 = $("#snmpVersion").val();
						 if(isSnmpV3 == "version3"){
							  $("#isSnmpV3").show();
						 }else{
							 $("#isSnmpV3").hide();
						 }
						
					});
					
					if($("#snmpRo").val()==""){
						$("#snmpRo").val("public");
					}
					if($("#snmpRw").val()==""){
						$("#snmpRw").val("public");
					}
					
					
					
					//sshport的隐藏及显示
					$("#isSsh").unbind("click").click(function(){
						
						 var isSsh = $("#isSsh").attr("checked");
						 if(isSsh == "checked"){			 
							  $("#sshPort").show();
						 }else{
							  $("#sshPort").hide();
							  $("#ssh").attr("checked", "checked");		  
						 }
						
					});
					

					//添加----------提交
					var url = ctx+"/resourceDeviceprotocol/addNewResourceDeviceprotocol?ids="+deviceId;
					$("#addSite").unbind("click").click(function(){

				 		     $.ajax({
					 	    	 url:url,
					 	    	 type:"post",
					 	    	 data:$("#addForm").serialize(),
					 	    	 async:false,
					 	    	 success:function(data){
					 	    		 
						 	    	 $('#edit_list').empty();					
						 	    	 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     
					 	    	
					 	    	 }		 	    	
					 	     });
					 	    
					 	});
			
					 	
					 	$("#site").unbind("click").click(function(){
					 		 $('#edit_list').empty();					
					 		 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
					 	
					 	});	
						$("#reset").unbind("click").click(function(){
					 		 $('#edit_list').empty();					
					 		 $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
					 	
					 	});	
					
				
					});
				});
		 }
	
	
    /**
     *  修改DeviceProtocol
     */
    function  modiResourceDeviceprotocol(id){
			    
			    var mid = id;
			    var murl = ctx+"/resourceDeviceprotocol/modiResourceDeviceprotocolPage?deviceProtocolId="+mid;
				$('.edit_list').empty();
				var qurl = ctx +"/resourceDeviceprotocol/queryResourceDeviceprotocolById?siteId="+mid;
				$('.edit_list').load(murl,function(data){
				//	alert(" modi  in");
				//	$.post(qurl,function(data){
					//类型初始化
					  var type = $("#type").val();
					  if(type == "0"){
						  $("#authorizeType").attr("value", "snmp");
						  $("#snmp").show();
						  $("#telnet").hide();
					  }else{
						  $("#authorizeType").attr("value", "telnet");
						  $("#snmp").hide();
						  $("#telnet").show();
					  }
					//版本初始化
					   var version = $("#version").val();
					   if(version == "1"){
						   $("#snmpVersion").attr("value", "version1");
					   }else{
						   $("#snmpVersion").attr("value", "version2"); 
					   }					   
					//ssh初始化
					   var isSsh = $("#is").val();
					   if(isSsh == "1"){
						   $("#isSsh").attr("checked", "checked");
						   $("#sshPort").show();
					   }else{
						   $("#ssh").attr("checked", "checked");
						   $("#sshPort").hide();
					   }
					   					   
					 	//设置div的显示及隐藏
						$("#authorizeType").unbind("change").change(function(){
							
							  var typeVal = $("#authorizeType").val();
							  if(typeVal == "telnet"){
								   $("#snmp").hide();
								   $("#telnet").show();
							  }else{
								   $("#snmp").show();
								   $("#telnet").hide();
							  }
						});
						
						//sshport的隐藏及显示
						$("#isSsh").unbind("click").click(function(){
							
							 var isSsh = $("#isSsh").attr("checked");
							 if(isSsh == "checked"){			 
								  $("#sshPort").show();
							 }else{
								  $("#sshPort").hide();
								  $("#ssh").attr("checked", "checked");		  
							 }
							
						});
					 					 	
					 	//修改提交
					 	$("#modiSite").unbind("click").click(function(){
	
					 		 var url = ctx+"/resourceDeviceprotocol/modiResourceDeviceprotocol?deviceProtocolId="+mid;
					 	     $.ajax({
					 	    	 url:url,
					 	    	 type:"post",
					 	    	 async:false,
					 	    	 data:$("#modiForm").serialize(),
					 	    	 success:function(data){ 		 
					 	    		$('#edit_list').empty();					
							 		$('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
							 	
					 	    	 } 	    	
					 	     });            
					 	});
	 	
					 	$("#site").unbind("click").click(function(){
					 		$('#edit_list').empty();					
					 	    $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
					 	
					 	}); 
						$("#back").unbind("click").click(function(){
							$('#edit_list').empty();					
					 	    $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
					 	
					 	});	
					//});
				});
			
		 }
		 
		 
    /**
     * 删除DeviceProtocol
     */
	function  delResourceDeviceprotocol(id){
			//  alert("del in");
			 // alert("id        "+id);
			  var protocolId = id;
			  var url = ctx+"/resourceDeviceprotocol/delResourceDeviceprotocol?protocolId="+protocolId;
			  $.post(url,function(data){
				  $('#edit_list').empty();					
			      $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
			 	
			  });
		 }
		 
	/**
	 *  批量删除deviceProtocol
	 */
	function  delMoreResourceDeviceprotocol(){
			 
			   var  ids = new Array();
	 		   var  datas =  $('input[name="more"]').each(function(){
	 			    var data = $(this);
	 			    if(data.attr("checked")=="checked"){
	 			    	
	 			    	var values = data.val().split(",");
	 			    	if(values.length > 2)
	 			    		 ids.push(values[2]); 			    	
	 			    }  
	 		   });
	 		   
	 		  if(ids.length == 0) return;
	 		   
			  var url = ctx+"/resourceDeviceprotocol/delMoreResourceDeviceprotocol?protocolIds="+ids;
			  $.post(url,function(data){
				  $('#edit_list').empty();					
			 	  $('#edit_list').load(ctx + '/resourceDeviceprotocol/manageResourceDeviceprotocolPage?tmp=' + Math.random());     					 	    	
			 	
			  });
			 
		 }
	
	/**
	 *  获取产品类型
	 */
	function getProductTypeTree( ){

		  $("#type").empty();
		  var productTypeTree = $("#type");	 
		  
		  var optionsProductType = {
				inputName : "deviceTypeName",
				writeType : 'show',
				width: "200", //高度
				showLabel : false,
				url : ctx+'/base/productType/getProType',
				inputValue:"all",
				onSelect :function(id){
					var  roomId = $("#roomInfo").formSelect("getValue")[0]; 					 
				    var  typeId = productTypeTree.formSelect("getValue")[0];
				    if(roomId == "")
				    	 roomId = "all";
				     getAllResourceDeviceprotocol(roomId, typeId);
				}  
		    };
		  
			productTypeTree.formSelect(optionsProductType);

	  }

	
	/**
	 *  获取所有机房信息
	 */
	 function  getRoomInfo(roomUrl){
		   
			$('#roomInfo').empty();
			var $fieldCompDevType = $("#roomInfo");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "200", //高度
				showLabel : false,
				url : roomUrl,
				inputValue:"all",
				onSelect :function(id){
					
					  var  roomId = id;						
					  var  typeId = $("#type").formTree("getValue");
					  if(typeId=="")
						    typeId = "all";
					  
				 	  getAllResourceDeviceprotocol(roomId, typeId);
					
				}  
			   
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
				 
	 }
