
var table='';
var oCache = {
		iCacheLower: -1
	};


	function fnSetKey( aoData, sKey, mValue )
	{
		for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name == sKey )
			{
				aoData[i].value = mValue;
			}
		}
	}
	
	function fnGetKey( aoData, sKey )
	{
		for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name == sKey )
			{
				return aoData[i].value;
			}
		}
		return null;
	}
	
	function fnDataTablesPipeline ( sSource, aoData, fnCallback, oSettings ) {
		var iPipe = 5; /* Ajust the pipe size */
	
		var bNeedServer = false;
		var sEcho = fnGetKey(aoData, "sEcho");
		var iRequestStart = fnGetKey(aoData, "iDisplayStart");
		var iRequestLength = fnGetKey(aoData, "iDisplayLength");
		var iRequestEnd = iRequestStart + iRequestLength;
		oCache.iDisplayStart = iRequestStart;
		//alert(sEcho+"|"+iRequestStart+"|"+iRequestLength+"|"+iRequestEnd);
		/* outside pipeline? */
		if ( oCache.iCacheLower < 0 || iRequestStart < oCache.iCacheLower || iRequestEnd > oCache.iCacheUpper )
		{
			bNeedServer = true;
		}
		
		/* sorting etc changed? */
		if ( oCache.lastRequest && !bNeedServer )
		{
			for( var i=0, iLen=aoData.length ; i<iLen ; i++ )
			{
				if ( aoData[i].name != "iDisplayStart" && aoData[i].name != "iDisplayLength" && aoData[i].name != "sEcho" )
				{
					if ( aoData[i].value != oCache.lastRequest[i].value )
					{
						bNeedServer = true;
						break;
					}
				}
			}
		}
		
		/* Store the request for checking next time around */
		oCache.lastRequest = aoData.slice();
		if ( bNeedServer )
		{
			if ( iRequestStart < oCache.iCacheLower )
			{
				iRequestStart = iRequestStart - (iRequestLength*(iPipe-1));
				if ( iRequestStart < 0 )
				{
					iRequestStart = 0;
				}
			}
			
			oCache.iCacheLower = iRequestStart;
			oCache.iCacheUpper = iRequestStart + (iRequestLength * iPipe);
			oCache.iDisplayLength = fnGetKey( aoData, "iDisplayLength" );
			fnSetKey( aoData, "iDisplayStart", iRequestStart );
			fnSetKey( aoData, "iDisplayLength", iRequestLength*iPipe );
			
			oSettings.jqXHR = $.getJSON( sSource, aoData, function (json) { 
	//			json={"sEcho":0,"iTotalRecords":"57","iTotalDisplayRecords":"57","aaData":


				/* Callback processing */
				oCache.lastJson = jQuery.extend(true, {}, json);
				
				if ( oCache.iCacheLower != oCache.iDisplayStart )
				{
					json.aaData.splice( 0, oCache.iDisplayStart-oCache.iCacheLower );
				}
				json.aaData.splice( oCache.iDisplayLength, json.aaData.length );
				
				fnCallback(json);
			} );
		
		}
		else
		{
			json = jQuery.extend(true, {}, oCache.lastJson);
			json.sEcho = sEcho; /* Update the echo for each response */
			json.aaData.splice( 0, iRequestStart-oCache.iCacheLower );
			json.aaData.splice( iRequestLength, json.aaData.length );
			fnCallback(json);
			return;
		}
	}
	

//var domainData;
//var dm;	
function loadAll(){
	/* Table initialisation */
		pdfMap =  new Map();	
		var url = ctx+"/role/findAllRoles";
				table=$('#taskTable').dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"sAjaxSource":url, 
					"fnServerData": fnDataTablesPipeline,
					"bRetrieve": true,
					"aoColumns": [
					              { "mData": "roleName" },				  	
					              { "mData": "description"},
					              { "mData": "roleId","mRender": function (data) {
					            	  var rstatus='';
					            	  var id = data;
					          		  rstatus="<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
					          		  		  "<a id = '"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" +
					          		  		  "<a id = '"+id+"' href='#myModal2'  data-toggle='modal' name='menubutton'>配置菜单</a>&nbsp;&nbsp"+
											  "<a id = '"+id+"' href='#myModal2'  data-toggle='modal' name='powbutton'>配置动作</a>"; 
					          		  return rstatus;
					          		
					              } }
					            
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
							modiRole(mid);
						});
						$('a[name="delbutton"]').unbind('click').click(function () {
							var mid =this.id;
							delRole(mid);
						});
						$('a[name="menubutton"]').unbind('click').click(function () {
							var mid =this.id;
							addMenu(mid);
						});
						$('a[name="powbutton"]').unbind('click').click(function () {
							var mid =this.id;
							addPow(mid);
						});
					}
				
				});
		
		};

  function RefreshTable(){
		  			table.fnSort( [ [1,'asc'] ] );
					table.fnSort( [ [1,'desc'] ] );
			} 
		
		  	
   /**
    *  配置菜单
    */
	function addMenu(id){
		    	var mid =id;
				$("#dailogs1").empty();
			   var buffer = new StringBuffer();
			   
		        buffer.append('<div id="myModal2" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
				buffer.append('<div class="modal-header">');
				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
				buffer.append('<h3 id="myModalLabel">配置菜单</h3 >');
				buffer.append('</div >');
				buffer.append('<div class="modal-body" >');
				
				buffer.append("<div id='resourcesTree' class='ztree'></div>");
				buffer.append("</div>");	
	
				buffer.append('<div class="modal-footer" >');
				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
				buffer.append('<button class="btn btn-primary"  id="btnConfirmq" data-dismiss="modal">确定</button >');
				buffer.append('</div >');
				buffer.append('</div>');
				
				$("#dailogs1").append(buffer.toString());
	
		
				var setting = {
		    		data: {
		    			key : {
							name: "menuName",
							title: "menuName"
						},
						simpleData: {
							enable: true,
							idKey: "menuId",
							pIdKey : "parentId",
							rootPId: -1
						}
					},
					view: {
						selectedMulti: true
					},
					check: {
						enable: true,
						chkStyle:"checkbox",
						autoCheckTrigger: true,
						nocheckInherit: true,
						chkDisabledInherit: true,
						chkboxType: { "Y": "ps", "N": "s" }
					},
		    	treeNode:{
		    			nocheck: false
		    	}
		    };
		    
			$.ajax({
				type : 'POST',
				url : ctx+"/menu/getMenuTreeData?roleId="+id,
				success : function(result) {
					menu_Tree = $.fn.zTree.init($("#resourcesTree"), setting,result);
					menu_Tree.expandAll(true);
			
				},
				error: function(request){
				}
			});
			
					
		$("#btnConfirmq").click(function () {
			 
			      //  alert("add menu id");
				    var menuIds="";
					var menuChildNodes = menu_Tree.getCheckedNodes(true);
					 
					for(var i =0;i<menuChildNodes.length;i++){
						
						 menuIds+=menuChildNodes[i].menuId +",";
					}
       				  
				   $.ajax({
						  type : 'POST',
						  url : ctx+"/role/addMenu?menuIds="+menuIds+"&roleId="+mid,
						  success: function(data){
		                // 设置表单提交完成使用方法
		               // 	alert("表单提交成功"+data);
		                     if(data=="success"){
		                         RefreshTable();
		                		 $('#alertMsg').empty();
			         			 $('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>菜单配置成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		     $(".alert").delay(2000).hide(0);
			         		     $(".close").click(function(){
			         		    	 $(".alert").hide();
			         		     });
			         		    $("#example-advanced").treetable("destroy");
		                    }else{
		                	    $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>菜单配置失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
		                   }
		                }
						
								
					   });
			   });				
					

	}
	
	/**
    *  配置动作
    */
	function addPow(id){
		$('#edit_list').empty();
		$('#edit_list').load(ctx+"/role/setPowPage?roleId="+id);
	}
	
	
	
    /**
     *  删除角色
     */
	function delRole(id){

		      // confirm("确定删除吗？");
		        if(!confirm("确定删除吗？")){
			        return;
		          }
		        
	            $.ajax({
	     			    url: ctx+"/role/delRole?roleId="+id,  // 提交的页面
		                data: "", // 从表单中获取数据
		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		                beforeSend: function()          // 设置表单提交前方法
		                {
		                  //  new screenClass().lock();
		                },		                		           		 
		               error: function(request) {     // 设置表单提交出错
	                	    RefreshTable();
	                	    $('#alertMsg').empty();		                	 
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
	                   },
		               success: function(data) {
		                // 设置表单提交完成使用方法
		               // 	alert("表单提交成功"+data);
		            		    RefreshTable();
		                		$('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		                 }
	              });
	  }
	
	
	
	
	
  /**
   * 修改角色
   */
  function modiRole(id){
	  
	var mid = id;
	var pdfMap =  new Map();
	$.ajax({
    			url:ctx+"/role/getRoleById?roleId="+mid, 
    			async:false,
    			dataType:"json", 
    			type: "POST",   
    			success:function(data){
    			var result = data; 
    			var mdef=new Object();
    	            mdef.roleId=result.roleId;
    	            mdef.roleName=result.roleName;
    	            mdef.description = result.description;
    	 	       pdfMap.put(result.roleId,mdef);
    	 	       
    	 	  /*  
    	 	  	$.each(domainData, function(i, n){
    	 			if(pdfMap.get(mid).roleType==n.dmValue){
    	 				optionValue+="<option value="+"'"+n.dmValue+"' selected='selected'>"+n.dmValueMeaning+"</option>";
    	 			}else{
    	 				optionValue+="<option value="+"'"+n.dmValue+"'>"+n.dmValueMeaning+"</option>";
    	 			}
    	 			
    	 	     }); 
    	 	  	*/
    	 	  	
    			$("#dailogs1").empty();
    			var buffer = new StringBuffer();
    		       buffer.append('<div id="myModal2" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    				buffer.append('<div class="modal-header">');
    				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
    				buffer.append('<h3 id="myModalLabel">修改角色</h3 >');
    				buffer.append('</div >');
    				buffer.append('<div class="modal-body" >');
    				buffer.append("<div>"+"<form id='modiForm'  name='modiForm' class='form-horizontal' action='${ctx}/org/modi' method='post'> ");
    
    				buffer.append("<div class='control-group'><label class='control-label' for='roleName'>角色名称</label><div class='controls'><input type='text' name='roleName' value='"+pdfMap.get(mid).roleName+"' required data-validation-required-message='请输入角色名称！'/> <p class='help-block'></p></div></div>");
    				buffer.append("<div class='control-group'><label class='control-label' for='description'>角色描述</label><div class='controls'><input type='text' name='description' value='"+pdfMap.get(mid).description+"'/></div></div>");
    				  				
    				buffer.append("</form>");
    				buffer.append("</div>");
    				buffer.append('</div >');
    				buffer.append('<div class="modal-footer" >');
    				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
    				buffer.append('<button class="btn btn-primary" data-dismiss="modal"  id="btnConfirm" >保存角色</button >');
    				buffer.append('</div >');
    				buffer.append('</div>');
    			
    			$("#dailogs1").append(buffer.toString());
    			$("input,textarea").not("[type=submit]").jqBootstrapValidation({
    			   submitSuccess: function (form, event)
    	    		 {
    		        	event.preventDefault();
    		            $.ajax({
    		                url: ctx+"/role/modi?roleId="+mid,  // 提交的页面
    		                data: $('#modiForm').serialize(), // 从表单中获取数据
    		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
    		                beforeSend: function()          // 设置表单提交前方法
    		                {
    		                  //  new screenClass().lock();
    		                },
    		                error: function(request) {      // 设置表单提交出错
    		                	 $('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>角色修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    		                },
    		                success: function(data) {
    		                // 设置表单提交完成使用方法
    		               // 	alert("表单提交成功"+data);
    		                   if(data=="success"){
    		                  		 RefreshTable();
    		                		$('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>角色修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    			         		   $("#example-advanced").treetable("destroy");
    			         		   
    		                   }else{
    		          	         RefreshTable();	
    		                	   $('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>角色修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    		                   }
    		                   
    		                     $('#myModal2').modal('hide');
    		                }
    		            });
    	    		 },submitError: function (form, event, errors) {
    			         event.preventDefault();
    		         }
    			  });  
    				$("#btnConfirm").click(function () {
    						
    					$('#modiForm').submit();
    			    });   
    	 	  	
    	        }
    	            });
	
				
				return false;
		    }
	
	
	/**
	 *  添加角色
	 */
     function create(){
			
			   $("#dailogs1").empty();
				
				var buffer = new StringBuffer();
		        buffer.append('<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
				
		        buffer.append('<div class="modal-header">');
				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
				buffer.append('<h3 id="myModalLabel">新建角色</h3 >');
				buffer.append('</div >');
				
				buffer.append('<div class="modal-body" >');			
				buffer.append("<div>"+"<form id='addForm' name='addForm' class='form-horizontal' action='${ctx}/role/addRole' method='post'> ");				
				buffer.append("<div class='control-group'><label class='control-label' for='roleName'>角色名称</label><div class='controls'><input type='text' name='roleName' required data-validation-required-message='请输入角色名称！'/> <p class='help-block'></p></div></div>");
				buffer.append("<div class='control-group'><label class='control-label' for='description'>角色描述</label><div class='controls'><input type='text' name='description' /></div></div>");
			
				buffer.append("</form>");
				buffer.append("</div>");
				buffer.append('</div >');
				
				buffer.append('<div class="modal-footer" >');
				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
				buffer.append('<button class="btn btn-primary" data-dismiss="modal"  id="btnConfirm" >保存角色</button >');
				buffer.append('</div >');
				buffer.append('</div>');
				
				
				$("#dailogs1").append(buffer.toString());
		
		
 			$("input,textarea").not("[type=submit]").jqBootstrapValidation({
         	   submitSuccess: function (form, event)
	    		 {
		        		 event.preventDefault();						
			            $.ajax({
			            	url: ctx+"/role/addRole",  // 提交的页面
			                data: $('#addForm').serialize(), // 从表单中获取数据
			                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			                beforeSend: function()          // 设置表单提交前方法
			                {
			                  //  new screenClass().lock();
			                },
			                error: function(request) {      // 设置表单提交出错
			                	$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                },
			                success: function(data) {
			                // 设置表单提交完成使用方法
			               // 	alert("表单提交成功"+data);
			                   if(data=="success"){
			                        RefreshTable();
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>角色添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(5000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                   }else{
			                   		RefreshTable();
			                	   $('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>角色添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                   }
			                   $('#myModal1').modal('hide');
			                }
			         });
	    		 },submitError: function (form, event, errors) {
			         event.preventDefault();
		         }
			  });  
 			
				$("#btnConfirm").click(function () {
						
					$('#addForm').submit();
			    });   
			
				return false;
		    }

