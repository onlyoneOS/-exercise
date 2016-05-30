
define(function(require, exports, module) {
	  
     //  require("jquery");
       var $ = require("jquery");
	   require("easyui");
	
	
	  
	  var menuId;
	
	  /*
	   *  页面加载时，初始化方法
	   */
	   function  loadAll(){
		   /*
		    *  菜单列表
		    */
		   $("#menu").treegrid({
			     title:"菜单列表",
			     method:"post",
			     url:ctx+"/power/queryAllMenus",
			     rownumbers:true,
			     idField:"menuId",
			     treeField:"menuName",
			   //  width:"160",
			     width:$(this).width() * 0.145,
			     height:"500",
			     
			     columns:[[{
			    	 field:"menuName",
			    	 title:"菜单名称",
			    	// width:"120"
			    	 width:$(this).width() * 0.12
			     }]]			   
		   });
		
		     /*
		      *   动作列表
		      */
		    $("#powerAction").datagrid({
		    	title:"动作列表",
		    	method:"post",
		    	loadMsg:"数据加载中，请稍后……",
		    //	url:"power/queryPower",
		    	rownumbers:true,
		    	fitColumns:true,
		    	pagination:true,
		    	singleSelect:true,
		    	plain:true,
		    	height:"500",
		    	//width:"600",
		    	
		    	columns:[[
		    	{
		    		field:"powName",
		    		title:"动作名称",
		    	//	width:"160"
		    		width:$(this).width() * 0.15
		    	},{		    		
		    		field:"powCode",
		    		title:"动作编码",
		    		//width:"160"
		    		width:$(this).width() * 0.15
		    	},{
		    		field:"description",
		    		title:"动作描述",
		    		//width:"160"
		    		width:$(this).width() * 0.15
		    	},{
		    		field:"remark",
		    		title:"动作标识",
		    		//width:"160"	
		    		width:$(this).width() * 0.15
		    	}    		 
		    	]],
		    	
		         toolbar:[
		          {
		        	 id:"add",
		        	 title:"新建",
		        	 iconCls:"icon-add",
		        	 handler:function(){
		        		 newPower();
		        	 }
		        	 
		         },'-',{
		        	    id:"update",
		        	    title:"修改",
		        	    iconCls:"icon-edit",
		        	    handler:function(){
		        		  editPower();
		        	    }
		         },'-',{
		        	    id:"remove",
		        	    title:"删除",
		        	    iconCls:"icon-remove",
		        	    handler:function(){
		        		    destroyPower(); 
		        	    }
		            }
		        ]
		    			    	
		    });
		    
		    /*
		     *  编辑窗口初始化
		     */
		   
		 //   editWin();
		    
		    		    		    		   
	       /*
	        *  初始化保存事件
	        */
		    $("#save").unbind("click").click(function(){	
		    	  savePower();
		    });
		    
		    
		    
		    /*
		     * 选中菜单列表时触发的事件
		     */
		    $("#menu").treegrid({onSelect:
		    	function(){
		    	   var row = $("#menu").treegrid("getSelected");   	  
		    	   if(row){
		    		   menuId = row.menuId;
		    		   var menuType = row.menuType;
		    		   if(menuType=='0') return;	
		 		          $.post("power/queryPower?menuId="+menuId, function(data){
		    			  $("#powerAction").datagrid("loadData", data); 
		    			   
		    		   }, "json");
		    		   
		    	    }    
		    	
		         }
		    });
		    
		    /*
		     *  根据窗口大小调整
		     */
			$(window).resize(function(){
				//$('#domainDG').datagrid('resize');
				$('#menu').treegrid('resize');
				$('#powerAction').datagrid('resize');
			});
		   
	   }
	
	   
	  /*
	   *  模块接口
	   */
	  exports.init = function(){

		  loadAll();
		  
	  }
	  
	 
	/*
	 *   动作的增、删、改操作
	 * 
	 */  
	  
      var url;
      //新建
	  function newPower(){
		//  alert("crsss11");
		 // alert($("#menu"));
		  var row = $("#menu").treegrid("getSelected");   	
		 // alert("row1  "+row);
		  var menuType = row.menuType;
		  if(!row) return;
		  if(row.menuType=="0") return;		 
          $('#dlg').dialog('open').dialog('setTitle','新建动作');
          $('#fm').form('clear');
          url = ctx+'power/addPowAction?menuId='+menuId;
      }
	  
	 //修改
      function editPower(){
    	//  alert("edit in");
          var row = $('#powerAction').datagrid('getSelected');                 
          if (row){
              $('#dlg').dialog('open').dialog('setTitle','修改动作');
              $('#fm').form('load',row);
              url = ctx+'/power/updatePowAction?powId='+row.powId;
          }
      }
            
      function savePower(){
    	//  alert("save qq in");
          $('#fm').form('submit',{
              url: url,
              onSubmit: function(){
                  return $(this).form('validate');
              },
              success: function(result){
            	//  alert("aaaa in");
            	  $('#dlg').dialog('close'); 
            	  $('#powerAction').datagrid('reload');
            	  changeData();
            	  /*
                  var result = eval('('+result+')');
                  if (result.errorMsg){
                      $.messager.show({
                          title: 'Error',
                          msg: result.errorMsg
                      });
                  } else {
                	  alert("su in");
                      $('#dlg').dialog('close');        // close the dialog
                      $('#powerAction').datagrid('reload');    // reload the user data
                  }*/
              }
          });
      }
          
      //删除
      function destroyPower(){
          var row = $('#powerAction').datagrid('getSelected');
       //   alert("del in");
          if(!row) return;
       //   alert("del be");
          if(!confirm("确定删除吗？")) return;
          $.post(ctx+'power/delPow?powId='+row.powId, function(data){               
                   // changeData();                  
               },'json');
          
           changeData();

      }
	  
	  
	
      /*
       *  刷新数据
       */
      function changeData(){
    	  
    	  $.post(ctx+"/power/queryPower?menuId="+menuId, function(data){
    		//  alert("wel back");
			  $("#powerAction").datagrid("loadData", data); 
			   
		   }, "json");
    	  
      }
      

      /*
       *  编辑窗口
       */
	  
	  function  editWin(){
		  
	    var  str =  '<div id="dlg" class="easyui-dialog" style="width:400px;height:400px;padding:10px 20px"'
	                + 'closed="true" buttons="#dlg-buttons">'
	                + '<form id="fm" method="post" novalidate>'
	                + ' <div class="fitem">'
	                +   ' <label>动作名称:</label>'
	                +   ' <input name="powName" class="easyui-validatebox"  required="true">'
                    +  '</div>'
	                +' <div class="fitem">'
	                +   '<label>动作编码:</label>'
	                +   '<input name="powCode" class="easyui-validatebox"  required="true">'
	                + '</div>'
	                +' <div class="fitem">'
	                +   '<label>动作描述:</label>'
	                +   '<input name="description" >'
	                + '</div>'
	                +' <div class="fitem">'
	                +   '<label>动作标识:</label>'
	                +   '<input name="remark" class="easyui-validatebox" >'
	                + '</div>'
	                +'</form>'
	               +'</div>'
 	               +'<div id="dlg-buttons">'	       
	               +  '<a id="save" href="javascript:void(0)" class="easyui-linkbutton" iconCls="icon-ok">保存</a>'
	               +  "<a href='javascript:void(0)' class='easyui-linkbutton' iconCls='icon-cancel'>取消</a>" 
	               +  '</div>' ;
	    
	   // onclick='javascript:$('#dlg').dialog('close')'
	           $("#editWin").append(str);
	           alert($("#editWin").html());
		    			  
	  }
	  
	  
	
});