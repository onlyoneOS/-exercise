
		  var roleId = $("#roleId").val();
		  var menuId='';
		  var ur = ctx+"/role/queryPowByRoleId?roleId="+roleId;
		  var powList='';	
		  
	function queryPow(){
		  $.ajax({
			  type:'post',
			  url:ur,
			  dataType:'json',
			  success:function(result){
				  powList=result;
			  }
		  });
	  }
	  queryPow();

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
			     width:$(this).width() * 0.18,
			     height:"500",
			     
			     columns:[[{
			    	 field:"menuName",
			    	 title:"菜单名称",
			    	 width:$(this).width() * 0.14
			     }]],
			     onSelect:function(){
					   queryPow();
			    	   var row = $("#menu").treegrid("getSelected");
			    	   if(row){
			    		   menuId = row.menuId;
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
				singleSelect: false,
				selectOnCheck: true,
				checkOnSelect: true,
		    	onLoadSuccess:function(row){
					$('a[name="update"]').unbind('click').click(function(){
						      editPower(this.id);
					  });
					  
					 $('a[name="delMenu"]').unbind('click').click(function(){
							 destroyPower(this.id);
					 });
					
				},
		    	columns:[[
				{
					field:"powId",
					title:"Id",
					width:$(this).width() * 0.070,
					formatter:function(value,row){
						var html='';
						if (powList.indexOf(value) != -1) {
							html='<input type="checkbox" name = "powId" checked=true value="'+value+'">';
							return html;
						}else {
							html='<input type="checkbox" name = "powId" value="'+value+'">';
							return html;
						}
					}
		    	},{
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
		    	}   		 
		    	]]
		    });
	  }
	  
	  $("#add").unbind('click').click(function(){   
		var checkboxList = $("input[name='powId']");
		var pows = [];
			$.each(checkboxList, function(index, item){
				if(item.checked){
					pows.push(item.value)
				}
			});
			addPower(pows);
      });
	 
	  
	  function addPower(pows){
		  var roleId = $("#roleId").val();
			  $.ajax({
				url: ctx+"/role/addRolePow?roleId="+roleId+"&menuId="+menuId+"&pows="+pows+"&random="+Math.random,
				type:'post',
				success:function(result){
					
					if ( result == "success") {
						alert('添加动作成功');
						var  querypowerUrl = ctx+"/role/setPowPage?roleId="+roleId;				  
						queryPow();
						getPowerAction(querypowerUrl);
					}
					else {
						alert('添加动作失败');
					}
					
			    },
				error:function (){
					alert('error');
				}
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
