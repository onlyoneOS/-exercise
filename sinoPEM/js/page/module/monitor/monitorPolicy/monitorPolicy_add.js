
	   var deviceDatas=null;
	   var realdeviceDatas=null;
 /**
  *  增加采集策略页面初始化接口
  */
 function loadAll(){
	  //跳转到获取设备及指标页面
	  $("#addMore").unbind("click").click(function(){		
		  getDeviceAndIndex();		  
	  });
	    
	  //提交表单	     
	   $("#addCollectRule").unbind('click').click(function(){
		  		 
		  var dev = $("#device").css("display");
		  var deviceIds = new Array();
		  if(dev=="none"){
			  deviceIds = $("#device").datagrid("getRows");
			  
			}
		  
		  var ind = $("#index").css("display");
		  var indictorIds = new Array();
		  if(ind == "none"){
			  indictorIds =$("#index").datagrid("getRows");
		  }
		  
		  //提交时表单验证
		  var flag = validatorOnsubmit(deviceIds, indictorIds);
		  if(flag){
			  alert("请您填写策略名称");
			  return;
		  } 
		     		  
		  var dIds = new Array();
		  var iIds = new Array();
		  for(var i=0; i<deviceIds.length; i++){
				 dIds.push(deviceIds[i].id);
			 }
		  for(var i=0; i<indictorIds.length; i++){
				 iIds.push(indictorIds[i].id);
			 }
			
		//  $("#realOrg").attr("value", $("#orgTree").formTree("getValue"))
		  var  text = JSON.stringify(deviceDatas);
		  var url = ctx+"/monitorPolicy/addNewMonitorPolicy";
		  $("#deviceIds").attr("value",text);
		  $("#indictorIds").attr("value",iIds);
		  $("#addForm").ajaxSubmit({
			  url:url,
			  type:"post",
			  success : function(re){
				var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
			  }
		 });
		  
	  });

		 //取消
		 $("#reset").unbind('click').click(function(){	
			 var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
		 });
		 
		 $("#goback").unbind('click').click(function(){	
			 var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
		 });
		 
		 $("#addMore").append("<a href='#myModal1' id='add' role='button' data-toggle='modal' style='font-size:13px;' >新增</a>");

		 $("#addRule").append('<a href="#myModal2" id="rule" class="btn"  data-toggle="modal" style="width:10%;margin-bottom:10px;">请选择</a>');
		 		  
		 //采集规则设置
		 $("#rule").unbind('click').click(function(){	
			
			 getCollectRule();
		 });
		 
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
			url : url,
			onSelect :function(id){
				  $("#remarks").attr("value",id);
			}  
		   
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
 }
 
 
 /**
  *  获取设备及指标弹出框
  */
  function  getDeviceAndIndex(){
	
    var sr = "<div id='myModal1' style='width:700px' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>"
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
       			 var iIds = new Array();
       			 for(var i=0; i<devIds.length; i++){
       				 dIds.push(devIds[i].id);
       			 }
  
       			 var deviceUrl = ctx+"/monitorPolicy/getResourceDeviceManagesByDeviceId?id="+dIds;
       			
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
	    	title:"已选择的设备列表",
	    	method:"post",
	    	loadMsg:"数据加载中，请稍后……",
	    	url: deviceUrl,
	    	rownumbers:true,
	    	fitColumns:true,
	    	pagination:true,
	    	singleSelect:false,
	    	plain:true,
	    	height:"300",
	    	width:560,
	    	//width: $(this).width() * 0.39,
	     frozenColumns:[[  
	    	              {field:'id',checkbox:true}
	    	                   //,{title:'Code',field:'code',width:80,sortable:true}  
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
	        	    text:"<a href='#'>删除设备</a>",
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
	        onSelect:function(){
	        	//去掉指标的配置

	        },
	        onSelectAll:function(rows){
			},
			onLoadSuccess:function(data){
				deviceDatas=data.rows;
			},
			onUnselectAll:function(rows){

				 $("#index").datagrid("unselectAll");
			},
		   onUnselect:function(rowIndex,rowData){
		    	var devUnSelectedId =rowData.id;
		    	clearSelectIndector(devUnSelectedId);
	    	}

	    
	    });
   }
 
   
   /**
    *  清除选中的指标列表
    */
   function  clearSelectIndector(id){
	  
	   var rowDates=$("#index").datagrid("unselectAll");
	
        $.each(rowDates,function(idx,val){//遍历Indector列表
	          if(val.productType == id){
	        	  $("#index").datagrid("unselectRow",$("#index").datagrid("getRowIndex",val));//如果数据行为已选中则取消选中
	          }
        }); 
		
   }
	  
	  del = function (index,devid,indid){

		  $.messager.confirm('确认','确认删除?',function(row){  
			  if(row){  
				  var selectedRow = $('#index').datagrid('getSelected');  //获取选中行 
				  alert(selectedRow);
	
				    $.each(deviceDatas,function(idx,val){//遍历JSON
					      if(val.id!=null){
					    	  if(devid==val.id){
					    		  $.each(deviceDatas,function(idx1,val1){//遍历JSON
					    			  if(val1.id==indid){
					    				  deviceDatas.remove(idx1);
					    			  }
					    		  });
					    	  }
					      }
				    	}); 
					  			$('#index').datagrid('deleteRow',index); 
			  }

		  });
	
		    	
		    }
	  /**
	   *  删除device
	   */	  
	  	  function  delDevice(allDeviceIds, selectedDeviceIds){
	  		   var deviceUrl = ctx +"/monitorPolicy/delDeviceByDeviceIds?allDeviceIds="+allDeviceIds+"&selectedDeviceIds="+selectedDeviceIds;
	  		   getDevice(deviceUrl);
	  		   $('#index').datagrid('loadData', { total: 0, rows: []});
	  	  }

	     /**
	      *  获取采集规则
	      */
	   /*  function  getCollectRule(){
	    	 
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
    	    
  		  	 	    		    	 
	     }*/
	     
	/**
	 *  提交时表单格式验证
	 */
	   function   validatorOnsubmit(deviceIds, indictorIds){
		   
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
