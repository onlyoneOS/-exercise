
 /**
  *  修改采集策略页面初始化接口
  */
function loadAll(){
	 //取消
	 $("#cansle").unbind('click').click(function(){	
		 var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
			$('#edit_list').empty();
			$('#edit_list').load(pUrl);
	 });
	 $("#addMore").empty();
	 $("#addMore").append("<a href='#myModal1' id='add' role='button' data-toggle='modal' style='font-size:13px;' >新增+</a>");
	 //取消
	 $("#goback").unbind('click').click(function(){	
		 var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
			$('#edit_list').empty();
			$('#edit_list').load(pUrl);
	 }); 
	 // getOrgTree();	  
	  //跳转到获取设备及指标页面
	  $("#addMore").unbind("click").click(function(){
		  getDeviceAndIndex();		  
	  });
	  //提交表单	     
	   $("#modiCollectRule").unbind('click').click(function(){
		  var policyId = $("#policyId").val();		  
		  var deviceIds = new Array();
		  var hasIn = $("#nomsg").html();
		  if( hasIn == ""){
			  deviceIds = $("#device").datagrid("getRows");
		  }
		  
		  var flag = validatorOnsubmit(deviceIds);
		  if(flag) {
			  return;
		  }
		  var dIds = new Array();
		  for(var i=0; i<deviceIds.length; i++){
				 dIds.push(deviceIds[i].id);
			 }
		//  var  orgValue = $("#orgTree").formTree("getValue");		
		//  $("#realOrg").attr("value", orgValue);
		  $("#deviceIds").attr("value",dIds);
		  var url = ctx+"/monitorPolicy/modiMonitorPolicy?policyId="+policyId;		  	  
		  $("#modiForm").ajaxSubmit({
			  url:url,
			  type:"post",
			  success : function(re){
				var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
			  }
		 });
		  
	  });
	  var notEmpty = $("#NotEmpty").attr("id");
	  if(notEmpty == "NotEmpty"){
		  var policyId = $("#policyId").val();
		  var deviceUrl = ctx+"/monitorPolicy/getResourceDeviceManagesByPolicyId?policyId="+policyId;
		  getDevice(deviceUrl);
   }
		 $("#addRule").append('<a href="#myModal2" id="rule" class="btn"  data-toggle="modal" style="width:10%;margin-bottom:10px;">请选择</a>');
		/*  
		 //采集规则设置
		 $("#rule").unbind('click').click(function(){	
			 getCollectRule();
		 });
		*/
		 var rUrl = ctx+"/monitorPolicy/getCronMsg";
			getCronMsg(rUrl);
			var rUrl = ctx+"/monitorPolicy/getCollectEx";
			getCollect(rUrl);

 }


//采集规则

function getCronMsg(url){
	 $('#CronMsg').empty();
		var $fieldCompDevType = $("#CronMsg");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "room",
			writeType : 'show',
			width: "260", //高度
			inputValue:$("#cronType").val(),
			showLabel : false,
			url : url,
			onSelect :function(id){
				  $("#cronValue").attr("value",id);
			}  
		   
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
}

function getCollect(url){
	 $('#Collect').empty();
		var $fieldCompDevType = $("#Collect");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "room",
			writeType : 'show',
			width: "260", //高度
			showLabel : false,
			inputValue:$("#excute").val(),
			url : url,
			onSelect :function(id){
				  $("#remarks").attr("value",id);
			}  
		   
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
}

 
/*  
   function  getOrgTree(){
	   
	    var orgTree = $("#orgTree");
	    var orgId = $("#orgId").val();
	    var orgName = $("#orgName").val();
		var optionsOrg = {
				animate : true,
				searchTree : true,
				tree_url : ctx+'/formTree/getTreeOrg?random=1',// 顶层
				asyncUrl : ctx+'/formTree/getTreeOrg?random=1',// 异步
				search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
				find_url : ctx+'/formTree/getTreeOrg?random=1',// 精确定位
				url : '',
				asyncParam : ["id"],
				addparams : [{
							name : "orgParentId",
							value : "root"
						}],
				async : true,
				onSelect:function(){
					
					var  orgSelectId = orgTree.formTree("getValue");
					$("#realOrg").attr("value", orgSelectId);
				}
			};
		optionsOrg.resIds = orgId;
		optionsOrg.inputValue = orgName;
	
	 	orgTree.formTree(optionsOrg);
	 	
   }*/
   
   var deviceIds = new Array();
   var indexIds = new Array();
   
   /**
    *  获取设备及指标弹出框
    */
    function  getDeviceAndIndex(){
  	
      var sr = "<div id='myModal1' style='width:700px;' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>"
          $("#addDeviceAndIndex").empty();
          $("#addDeviceAndIndex").append(sr);      
          var url = ctx+"/monitorPolicy/getDeviceAndIndexPage";
          $("#myModal1").load(url, function(){
          	
          	 var saveObject = $("#myModal1").contents().find("#save");         
               //获取设备及指标提交表单信息
             saveObject.unbind('click').click(function(){
   	                 	        
               	 var deviceObject = $("#myModal1").contents().find("#dev");
               	 var indexObject = $("#myModal1").contents().find("#ind");
         			 var devIds = deviceObject.datagrid("getSelections");
         			 var dIds = new Array();
         			 for(var i=0; i<devIds.length; i++){
         				 dIds.push(devIds[i].id);
         			 }
         			 var policyId = $("#policyId").val();
         			 var deviceUrl = ctx+"/monitorPolicy/getResourceDeviceManagesByDeviceId?id="+dIds+"&policyId="+policyId;
         		     getDevice(deviceUrl);
         			 $("#nomsg").empty();      			 
         			 $("#myModal1").modal('hide');
         			            	               	
         		  });      	
          });
              
          
    }
    
    

    /**
     *  设备列表
     */
    function  getDevice(deviceUrl){
 	   
 	   $("#device").datagrid({
 		    
           title:'设备列表',  
	       height:300,  
	       width:560,
           nowrap: true,  
	       autoRowHeight: false,  
           striped: true,  
           collapsible:false,  
	       url:deviceUrl,  
	       sortOrder: 'desc',  
	       remoteSort: false,  
	       pagination:true,  
	       rownumbers:true,
	    frozenColumns:[[  
                  {field:'id',checkbox:true}
              ]],
	     columns:[[
	    	 {
	    		  field:"deviceName",
	    		  title:"设备名称",
	    	      width:"120"
	    	  },{		    		
	    		  field:"productTypeName",
	    		  title:"设备类型",
	    		  width:"120"
	    	  },{
	    		  field:"roomName",
	    		  title:"所属机构",
	    		  width:"120"
	    	  },{
	    		  field:"manageIp",
	    		  title:"管理地址",
	    	      width:"120"
	    	  }    		 
	    	  ]],
	    	
	         toolbar:[
	               {
	        	    id:"remove",
	        	    text: "<a href='#'>删除设备</a>",
	        	    handler:function(){
	        	    	var allIds = $("#device").datagrid("getRows");
	        	    	var selectedIds = $("#device").datagrid("getSelections");
	        	    	var allDeviceIds = new Array();
	        	    	var selectedDeviceIds = new Array();
	        	    	
	        	    	for(var i=0; i<allIds.length; i++){
	        	    		allDeviceIds.push(allIds[i].id);
	        	    	}
	        	    	for(var i=0; i<selectedIds.length; i++){
	        	    		selectedDeviceIds.push(selectedIds[i].id);
	        	    	}
	        	    	delDevice(allDeviceIds, selectedDeviceIds);
	        	    }
	            }
	        ],
	    onLoadSuccess:function(row){
		      	$("#device").datagrid("clearSelections");//清除所选行
		      	   var rowData = row.rows;
		      	   var devicesIds = [];
		            $.each(rowData,function(idx,val){//遍历JSON
		                      if(val.id!=null){
		                        $("#device").datagrid("selectRow", idx);//如果数据行为已选中则选中改行
		                        devicesIds.push(val.id+"-"+val.address);
		                      }
		                });
		          var policyId = $("#policyId").val();
		          var indectorUrl = ctx+"/monitorPolicy/getIndicatorManagesByPolicyId?policyId="+policyId+"&devicesIds="+devicesIds;
		      	}
 	   
	    			    	
	    
	    });
    }
 	  
 	  
 /**
  *  删除device
  */	  
 	  function  delDevice(allDeviceIds, selectedDeviceIds){
 		   var deviceUrl = ctx +"/monitorPolicy/delDeviceByDeviceIds?allDeviceIds="+allDeviceIds+"&selectedDeviceIds="+selectedDeviceIds;
 		   getDevice(deviceUrl);
 	  }


   

    /**
     *  获取采集规则
     */
    function  getCollectRule(){
   	 
	      var sr = "<div id='myModal2' style='width:630px;' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>"; 
	          $("#ruleFrame").empty();
	          $("#ruleFrame").append(sr);      
	          var url = ctx+"/monitorPolicy/config";
	          $("#myModal2").load(url, function(){
	          	
	          	var saveObject = $("#myModal2").contents().find("#saveRule");     	          	 
	            saveObject.unbind('click').click(function(){ 
	            	 
	            	 $("#myModal2").contents().find("#tes").submitEvent();   
	  		         var cornValue =  $("#myModal2").contents().find(".cornValue").val();
	  		         var type =  $("#myModal2").contents().find(".cornType").val(); 
	  		         var desc =  $("#myModal2").contents().find(".cornDescription").val();
	  		         var startTime =  $("#myModal2").contents().find(".inputBe").val();
	  		         var endTime =  $("#myModal2").contents().find(".inputEnd").val();                   
               
                    $("#cronMsg").attr("value", desc);
                    $("#cronType").attr("value", type);
                    $("#cronValue").attr("value", cornValue);
                    $("#startTime").attr("value", startTime);
                    $("#endTime").attr("value", endTime); 
                    $("#myModal2").modal('hide');
	
	          });
	              
	       });  
		  	 	    		    	 
    }
    
    /**
	 *  提交时表单格式验证
	 */
	   function   validatorOnsubmit(deviceIds){
		   
		      var colName = $("#collectName").val();
			  var colNameMsg = $("#colNameMsg");
			  var colNameStr = "";		 
			  if(colName == ""){
				  colNameStr = "<font size='2' color='red'>不能为空!</font>";				             
				  colNameMsg.empty();
				  colNameMsg.show();
				  colNameMsg.append(colNameStr);
				  colNameMsg.delay(2000).hide(0);			  			  			  
			  }
			  var devStr = "";
			  var msg = $("#msg");
			  var indStr = "";
			  var nomsg = $("#nomsg");
			  nomsg.hide();			  
			  if(deviceIds.length == 0){
				  
				  devStr = '<P><CENTER><FONT style="FONT-SIZE: 30pt; FILTER: glow(color=red); WIDTH: 100%; COLOR: red; LINE-HEIGHT: 150%; FONT-FAMILY: 华文新魏"><B>必须添加设备!</B></FONT></CENTER></P>';    		  				   				  				  
				  msg.empty();
				  msg.show();
				  msg.append(devStr);
				  nomsg.hide(0);
				  msg.delay(2000).hide(0);						
			  }else{
			  }
			  nomsg.show();
			  if((colNameStr!="")||(devStr != ""))
				  return true;
			  
			  return false;
	   }
