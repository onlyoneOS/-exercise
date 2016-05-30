var msgJson = null;
function init(){
		 //返回
		 $("#cansle").unbind('click').click(function(){	
			 var pUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
				$('#edit_list').empty();
				$('#edit_list').load(pUrl);
		 });
		 //根据policyId获取设备
		 var  policyId = $("#policyId").val();
		 var  deviceUrl =  ctx+"/collectTask/queryResourceDevicesByPolicyId?policyId="+policyId;
		 getDeviceList(deviceUrl);
		 //获取指标
		 getIndictorList();
		 
    }
 
 /**
  *  设备列表
  */
 function  getDeviceList(deviceUrl){
	   	
	    $("#deviceList").datagrid({
	    
            title:'设备列表',  
            iconCls:'icon-save',  
            width:"340",
            height:"480", 
            nowrap: true,  
	        autoRowHeight: false,  
            striped: true,  
            collapsible:false,  
	    	url:deviceUrl,  
	        sortOrder: 'desc',  
	    	remoteSort: false,  
	        pagination:true,  
	        rownumbers:true,
	        singleSelect:true,

	        frozenColumns:[[  
                  {field:'id',checkbox:true}
              ]],
	        columns:[[
		    	 {
		    		  field:"deviceName",
		    		  title:"设备名称",
		    		//  checkbox:true,
		    	    width:"120"
		    	  },{
		    		  field:"manageIp",
		    		  title:"管理地址",
		    		  width:"150"
		    	  }   /*,{		    		
		    		  field:"productTypeName",
		    		  title:"设备类型",
		    		  //width:"160"
		    		  width:$(this).width() * 0.06
		    	  },{
		    		  field:"roomName",
		    		  title:"所属机构",
		    		  //width:"160"
		    		  width:$(this).width() * 0.08
		    	  }, */ 		 
		      ]],
		      onSelect: function(){
		    	   
		    	   var  policyId = $("#policyId").val();
		    	   var  deviceId =  $("#deviceList").datagrid("getSelected").id;
		    	   var  address	 =	$("#deviceList").datagrid("getSelected").address;
		    	   var  indicatorMark = $("#deviceList").datagrid("getSelected").indicatorMark;
		    	   loadData(deviceId);
		    	   var  indictorUrl = ctx+"/collectTask/queryIndictorsByDeviceId?deviceId="+deviceId+"&policyId="+policyId+"&address="+address+"&indicatorMark="+indicatorMark;
		    	   $("#deviceIndicatorValue").empty();
		    	   getIndictorList(indictorUrl);
		      }	    			    	    
	    });
	    
	    
	    var p = $("#deviceList").datagrid('getPager');  
	    $(p).pagination({  
	        pageSize: 10,//每页显示的记录条数，默认为10  
	        pageList: [10,20,30,40,50],//可以设置每页记录条数的列表  
	        beforePageText: '第',//页数文本框前显示的汉字  
	        afterPageText: '页    共 {pages} 页',  
	      //  displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录',  
	        displayMsg:""
	    }); 

	    	    
}
 
 /**
  *  根据deviceId获取指标列表
  */
function  getIndictorList(indictorUrl){
	    	   	
	    $("#indictorList").datagrid({	
	         title:'指标列表',  
	         iconCls:'icon-save',
	       //  width:$(this).width() *0.14, //0.26,   
	         width:"150",
             nowrap: true,  
	         autoRowHeight: false,  
             striped: true,  
             collapsible:false,  
	         url:indictorUrl,
	         sortOrder: 'desc',  
	         remoteSort: false, 
	         singleSelect:true,
	         rownumbers:true,
		     idField:'id',
		     frozenColumns:[[  
	              {field:'id',checkbox:true}
	          ]],
		     columns:[[
		    	 {
		    		  field:"indicatorName",
		    		  title:"指标名称",
		    	 	 // width:$(this).width() * 0.08
		    		  width:"90",
		    		  formatter:module
		    	  }/*,{		    		
		    		  field:"indicatorCategoryName",
		    		  title:"指标类型",
		    		  //width:"160"
		    		  width:$(this).width() * 0.10
		    	  }   */		 
		    	  ]],
		    	  toolbar:[
			               {
			        	  //  id:"more",
			        	   // title:"新增指标",
			        	    text: "<a href='#myModal1' id='more' data-toggle='modal' style='font-size:13px;' >添加指标</a>",
			        	 //   iconCls:"icon-remove",
			        	    handler:function(){
			        	    	var deviceId = $("#deviceList").datagrid("getSelected").id;
			        	    	var policyId = $("#policyId").val();
			        	    	var address  = $("#deviceList").datagrid("getSelected").address;
			        	    	var indicatorMark  = $("#deviceList").datagrid("getSelected").indicatorMark;
			        	      	var allRows	 = $("#indictorList").datagrid("getRows");			        	      
			        	      	var indicatorIds = new Array();
 			        	    	
 			        	    	for(var i=0; i<allRows.length; i++){
 			        	    		indicatorIds.push(allRows[i].id);
 			        	    	}
 			        	    	
 			        	    	
 			        	    	var str = "<div id='myModal1' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>";			        	    	
 			        	    	$("#moreIndicator").empty();
 			        	    	$("#moreIndicator").append(str);
 			        	    	
 			        	    	var moreUrl = ctx +"/collectTask/getMoreIndicatorPage?deviceId="+deviceId+"&indicatorIds="+indicatorIds;
 			        	    	$("#myModal1").load(moreUrl,function(){
 			        	    	
 			        	    		 var  moreIndicatorIds = new Array();			        	        	    		
 			        	    		 var  saveObject = $("#myModal1").contents().find("#getMoreIndicator");		        	    		
 			        	    		 saveObject.unbind('click').click(function(){
                                            
  			        	    		        $("#myModal1").contents().find("input[name='moreIndicators']").each(function(){
  			        	    		        
  			        	    		        	if($(this).attr("checked")=="checked"){
  			        	    		        		var id = $(this).val();
  			        	    		        		moreIndicatorIds.push(id); 			        	    		        	
  	  			        	    		          }			        	    		           			        	    		       
  			        	    		        });
  			        	    		        
  			        	    		        var allIndicatorsByDeviceUrl = ctx +"/collectTask/queryAllIndicatorByDeviceId?policyId="+policyId+"&moreIndicatorIds="+moreIndicatorIds+"&deviceId="+deviceId+"&address="+address+"&indicatorMark="+indicatorMark;
  			        	    		        getIndictorList(allIndicatorsByDeviceUrl);
  			        	    		        $("#myModal1").modal('hide');
			        	    		    
 			        	    		 });
 			        	    	
 			        	    	});			        	    	
 			        	    	
			        	    }
			            },{
			        	    text: "<a href='#'>删除指标</a>",
			        	    handler:function(){
 			        	    	var  policyId = $("#policyId").val();
 						    	var  deviceId =  $("#deviceList").datagrid("getSelected").id;						    	  
 			        	    	var selectedIndicators = $("#indictorList").datagrid("getSelections");
			        	    	var selectedIndictorIds = new Array();
			        	    	for(var i=0; i<selectedIndicators.length; i++){
			        	    		selectedIndictorIds.push(selectedIndicators[i].id);
 			        	    	}
			        	    	delIndicator(policyId, deviceId, selectedIndictorIds);
			        	    }
			            
			            }
			        ],
			   
		     onSelect: function(){
			    	   var  indicatorId =  $("#indictorList").datagrid("getSelected").id;	
			    	   var  policyId = $("#policyId").val();
			    	   var  deviceId =  $("#deviceList").datagrid("getSelected").id;
			    	   var  address	 =	$("#deviceList").datagrid("getSelected").address;
			    	   var  indicatorMark  = $("#deviceList").datagrid("getSelected").indicatorMark;
			    	   var  deviceIndicatorValveUrl = ctx+"/collectTask/deviceIndicatorValuePage?indicatorId="+indicatorId+"&policyId="+policyId+"&deviceId="+deviceId+"&address="+address+"&indicatorMark="+indicatorMark;				    	  		    	  
			    	   getDeviceIndicatorValve(deviceIndicatorValveUrl);
			      }
		    });

     }

		function module(id,obj){
			var b = false;
			for(var i in msgJson){
				if(obj.id == msgJson[i].dispIndicatorId){
					b = true;
				}
			}
			if(b){
				return "<span style='color:red;'>" +obj.indicatorName+"</span>";
			} else {
				return obj.indicatorName;
			}
		}
  /**
   *  根据indicatorId获取阀值
   */
  function  getDeviceIndicatorValve(deviceIndicatorValveUrl){
	    
	       $("#deviceIndicatorValue").load(deviceIndicatorValveUrl,function(){
	    	   if($('#importIndicator').val() == "checked"){
	    		   $("#disIndicator").attr("checked",true);
	    	   }
//	    	   if($('#picIndicator').val() == "1"){
//	    		   $("#picDisIndicator").attr("checked",true);
//	    	   }
	    	   var update =  $("#deviceIndicatorValue").contents().find("#update");	    	   
	    	   update.unbind('click').click(function(){
	    		   //判断是否选中
	    		   var enableDel = "";
	    		   var enablePic = 0;
	    		   var polId = $("#policyId").val();
	    		   var deviceId =  $("#deviceList").datagrid("getSelected").id;
	    		   var indicatorId =  $("#indictorList").datagrid("getSelected").id;
	    		   if($("#disIndicator").attr("checked")){
	    			   enableDel = "1";
	    			   enablePic = "1";
	    		   }
//	    		   if($("#picDisIndicator").attr("checked")){
//	    			   enablePic = "1";
//	    		   }
	    		   var formObject = $("#deviceIndicatorValue").contents().find("#modiDeviceIndicateValue");
	    		   var url = ctx+"/collectTask/modiDeviceIndicatorValue?deviceId="+deviceId+"&indicatorId="+indicatorId+"&policyId="+polId+"&enableDel="+enableDel+"&enablePic="+enablePic;		  
	    		   formObject.ajaxSubmit({
	 	 			  url:url,
	 	 			  type:"post",
	 	 			  success : function(re){
	 	 				 var rUrl = ctx+"/monitorPolicy/monitorPolicyManagePage" ;
	 	 				 
	 	 				 var  indicatorId =  $("#indictorList").datagrid("getSelected").id;	
				    	 var  policyId = $("#policyId").val();
				    	 var  deviceId =  $("#deviceList").datagrid("getSelected").id;
				    	 var  address	 =	$("#deviceList").datagrid("getSelected").address;
				    	 var  indicatorMark	 =	$("#deviceList").datagrid("getSelected").indicatorMark;
				    	 var  deviceIndicatorValveUrl2 = ctx+"/collectTask/deviceIndicatorValuePage?indicatorId="+indicatorId+"&policyId="+policyId+"&deviceId="+deviceId+"&address="+address+"&indicatorMark="+indicatorMark;				    	  		    	  
	 	 			     getDeviceIndicatorValve(deviceIndicatorValveUrl2);
	 	 			   if(re=='success')
	 	 				{
	 	 					alert("更新成功")
	 	 				}
	 	 				 
	 	 			  }
	 	 		 });
	    	   });	    	   
	    	 
	       });
  }
	  /**
	   *  采集策略明细页面初始化接口
	   */
  
  function loadData(deviceId){
		 msgJson = null;
		 $.ajax({
			   type: "GET",
			   url: ctx+"/collectTask/getAllRoomDevicedispindicator?deviceId="+deviceId+"&tmp="+Math.random(),
			   success: function(msg){
				   msgJson = msg;
			   }
		 });
		 return true;
 	}
  
  
  /**
   *  删除指标
   *  
   */
   function  delIndicator(policyId, deviceId, selectedIndictorIds){
	   
	   var indicatorUrl = ctx+"/collectTask/delIndicatorByIndicatorId?policyId="+policyId+"&deviceId="+deviceId+"&selectedIndictorIds="+selectedIndictorIds;
	   getIndictorList(indicatorUrl);
	   $("#deviceIndicatorValue").empty();
		 
   }
