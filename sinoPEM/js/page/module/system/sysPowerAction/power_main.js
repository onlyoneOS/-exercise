  /**
   *  页面初始化方法
   */
   function  loadAll(){
	   
		//菜单列表
	    getMenu();
	     
	    //动作列表
	    getPowerAction();
	    		    
	    //动态调整窗口大小
		$(window).resize(function(){
			//$('#domainDG').datagrid('resize');
			$('#menu').treegrid('resize');
			$('#powerAction').datagrid('resize');
		});
	   
   }
	


	  
	  /**
	   *  菜单列表
	   */
	  function  getMenu(){
		  
		  $("#menu").treegrid({
			     title:"菜单列表",
			     method:"post",
			     url:ctx+"/power/queryAllMenus",
			     rownumbers:true,
			     idField:"menuId",
			     treeField:"menuName",
			   //  width:"160",
			     width:$(this).width() * 0.18,
			     height:"500",
			     
			     columns:[[{
			    	 field:"menuName",
			    	 title:"菜单名称",
			    	// width:"120"
			    	 width:$(this).width() * 0.14
			     }]],
			     onSelect:function(){

			    	   var row = $("#menu").treegrid("getSelected");
			    	   if(row){
			    		   var menuId = row.menuId;
			    		   // var menuType = row.menuType;
			    		   // if(menuType=='0') return;
			    	
			    		   var  querypowerUrl = ctx+"/power/queryPower?menuId="+menuId;			    		   
			    		   getPowerAction(querypowerUrl);
			    		 
			    	    }    			    				         
			     }
		   });
			  
	  }
	  
	  /**
	   *  动作列表
	   */
	  function  getPowerAction(querypowerUrl){
		  
		  $("#powerAction").empty();
		  $("#powerAction").datagrid({
		    	title:"动作列表",
		    	method:"post",
		    	loadMsg:"",
		    	url:querypowerUrl,
		    	rownumbers:true,
		    	fitColumns:true,
		    	pagination:true,
		    	singleSelect:true,
		    	plain:true,
		    	height:"500",
		    	onLoadSuccess:function(){
					$('a[name="update"]').unbind('click').click(function(){
						      editPower(this.id);
					  });
					  
					 $('a[name="delMenu"]').unbind('click').click(function(){
							 destroyPower(this.id);
					 });
					
				},
		    	columns:[[
				{
		    		field:"powName",
		    		title:"动作名称",
		    		width:$(this).width() * 0.15
		    	},{		    		
		    		field:"powCode",
		    		title:"动作编码",
		    		width:$(this).width() * 0.15
		    	},{
		    		field:"description",
		    		title:"动作描述",
		    		width:$(this).width() * 0.15
		    	},{
		    		field:"remark",
		    		title:"动作标识",
		    		width:$(this).width() * 0.15
		    	},{
					  field:"powId",
					  title:"操作",
					  width:$(this).width() * 0.070,
					  formatter: function(value, row){
						fm= "<a  id ='"+value+"'  href='#myModal2'  data-toggle='modal'  name='update'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
							"<a  id = '"+value+"' href='#' name='delMenu'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " ;
					    return fm;
					  }
				  }   		 
		    	]]
		    			    	
		    });
	  }
	  
	   $("#add").unbind('click').click(function(){   
	              newPower();
        });

	  
      /**
       *  新建动作
       */
	  function newPower(){
		   var row = $("#menu").treegrid("getSelected");  
		   if(row==null){
				  alert("请选择菜单!"); 
				  return;
			   }
		   var menuType = row.menuType;
		   var menuId = row.menuId;
		   if(!row) return;
		   if(menuType=="0") return;		
	  
	        var sr = "<div id='myModal1' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>";
	        $("#dlg").empty();
	        $("#dlg").append(sr);
	       
	        var addUrl = ctx+"/power/addPowerPage";
	        $("#myModal1").load(addUrl, function(){
	        	//格式验证
	          	 var powName = $("#myModal1").contents().find("#powName");
	          	 var nameMsg = $("#myModal1").contents().find("#nameMsg");
	          	 var msg = '<font size="2" color="red">不能为空!</font>';
	          	 validatorOnBlur(powName, nameMsg, msg);
	          	 
	             var code = $("#myModal1").contents().find("#code");
	          	 var codeMsg = $("#myModal1").contents().find("#codeMsg");
	          	 validatorOnBlur(code, codeMsg, msg);
	          	 
	          	//提交 
	        	 var formObject = $("#myModal1").contents().find("#addPowerForm");
	         	 var addPowerObject = $("#myModal1").contents().find("#savePower");	
	
	         	 addPowerObject.unbind('click').click(function(){
	
	         		//提交时格式验证
	                var flag = false;         		
  	         	    flag = validatorOnSubmit(powName, nameMsg, msg);
  	         	    flag = validatorOnSubmit(code, codeMsg, msg);
  	         	    
  	         	    if(flag) return;
	         		var url = ctx+'/power/addPowAction?menuId='+menuId;;		  
	             	formObject.ajaxSubmit({
	        			  url:url,
	        			  type:"post",
	        			  success : function(re){
	 			    		 var  querypowerUrl = ctx+"/power/queryPower?menuId="+menuId;
							  $("#myModal1").modal('hide');
							  
	 			    		 getPowerAction(querypowerUrl);			    		
	 			    		
	        			  }
	        		 });
		        
	         	 });    	
	        });

      }
	  
	 /**
	  * 修改
	  */
      function editPower(powId){
          var sr = "<div id='myModal2' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>";
  	        $("#dlg").empty();
  	        $("#dlg").append(sr);
  	        $('#myModal2').modal('show');
  	      var updateUrl = ctx+"/power/updatePowerPage?powId="+powId;
  	        $("#myModal2").load(updateUrl, function(){
  	        	
  	         	//填写时的格式格式验证
	          	 var powName = $("#myModal2").contents().find("#powName");
	          	 var nameMsg = $("#myModal2").contents().find("#nameMsg");
	          	 var msg = '<font size="2" color="red">不能为空!</font>';	          
	          	 validatorOnBlur(powName, nameMsg, msg);
	          	 
	          	 var code = $("#myModal2").contents().find("#code");
	          	 var codeMsg = $("#myModal2").contents().find("#codeMsg");	          
	          	 validatorOnBlur(code, codeMsg, msg); 
	          	 
  	        	 var updateformObject = $("#myModal2").contents().find("#updatePowerForm");
  	         	 var updatePowerObject = $("#myModal2").contents().find("#updatePower");	
  	
  	         	 updatePowerObject.unbind('click').click(function(){
  	                
  	            	//提交前格式验证
  	         		var flag = false;         		
  	         	    flag = validatorOnSubmit(powName, nameMsg, msg);
  	         	    flag = validatorOnSubmit(code, codeMsg, msg);
  	         	    
  	         	    if(flag) return;
  	         		var url = ctx+'/power/updatePowAction?powId='+powId;	  
  	         	    updateformObject.ajaxSubmit({
  	        			  url:url,
  	        			  type:"post",
  	        			  success : function(re){
  	        				var menuId = $("#menu").treegrid("getSelected").menuId;
  	 			    		 var  querypowerUrl = ctx+"/power/queryPower?menuId="+menuId;
							  $("#myModal2").modal('hide');
  	 			    		 getPowerAction(querypowerUrl);			    		
  	 			    		
  	        			  }
  	        		 });
  		        
  	         	 });    	
  	        });
                   
      }
            
         
      /**
       *  删除
       */
      function destroyPower(powId){
    
          if(!confirm("确定删除吗？")) return;
         
          var delUrl = ctx+"/power/delPow?powId="+powId;
          $.post(delUrl,function(data){
        	  
        	  var menuId = $("#menu").treegrid("getSelected").menuId;
        	  var  querypowerUrl = ctx+"/power/queryPower?menuId="+menuId;
	    	  getPowerAction(querypowerUrl);
          });
                  
      }
      
      /**
       *  格式验证
       */
      function   validatorOnBlur(object, objectMsg, msg){
    	  
    	  object.unbind('blur').blur(function(){       	     
        		if(object.val()==""){
        			objectMsg.empty();
        			objectMsg.show();	          			          		
        			objectMsg.append(msg);
        			objectMsg.delay(2000).hide(0);
        		}
        	 }); 
      }
      
     /**
      *  提交前的格式验证
      */
      function   validatorOnSubmit(object, objectMsg, msg){
          
    	  if(object.val()==""){
  			objectMsg.empty();
  			objectMsg.show();	          			          		
  			objectMsg.append(msg);
  			objectMsg.delay(2000).hide(0);
  			return  true;
  		 }
    	   return false;
      }
