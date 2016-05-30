	var jsonData = [];
	function loadTreegrid(){
		$("#_sino_devicetype_treegrid").treegrid({
	        	title:"设备分类表",
	        	loadMsg : "数据加载中，请稍后......",
	        	method:"post",
	        	url:ctx+"/base/productType/getTreegrid",
	        	rownumbers:true,
	        	idField:"id",
	        	treeField:"name",
	        	fitColumns:true,
	        	height:'auto',
	        	onBeforeLoad:function(row,param){
				},	
	        	onLoadSuccess:function(row){
	        		jsonData = $('#_sino_devicetype_treegrid').treegrid('getData');
					$('#_sino_devicetype_treegrid').treegrid('options').jsonData = row;
					
					$('a[name="_sino_devicetype_edit"]').unbind('click').click(function(){
						update(this.id);
					});
					  
					$('a[name="_sino_devicetype_del"]').unbind('click').click(function(){
						del(this.id);
					});
					
				},
	        	columns:[[
	        	  {
	        		 field:"name",
	        		 title:"名称",
	        		 width:$(this).width() * 0.25,
	        		 height:50
	        	  },{
	        		  field:"isModule",
	        		  title:"是否可用",
	        		  width:$(this).width() * 0.25,
	        		  formatter:module
	        	  },{
	        		  field:"isLogic",
	        		  title:"是否逻辑设备",
	        		  width:$(this).width() * 0.25,
	        		  formatter:logic
	        	  },{
					  field:"id",
	        		  title:"操作",
	        		  width:$(this).width() * 0.25,
					  formatter: function(value, row){
						fm="<a name ='_sino_devicetype_edit' role='button' data-toggle='modal'  id='"+value+"'>" +
							"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
							"<a name='_sino_devicetype_del'  id='"+value+"'>&nbsp" +
							"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>";
						return fm;
					  }
				  }
	        	 ]]
		});
/*		function formatProgress(value){
			if (value != null&&value != ""){
				return '<img width="20px" height="20px;" src="'+ctx+value+'">';
	    	} else {
		    	return '';
	    	}
		}
		function bgImage(value){
			if (value != null&&value != ""){
				return '<img width="20px" height="20px;" src="'+ctx+value+'">';
	    	} else {
		    	return '';
	    	}
		}*/
		
		function module(value){
			if(value == 1){
				return "是";
			} else {
				return "否";
			}
		}
		
		function logic(value){
			if(value == 1){
				return "逻辑";
			} else {
				return "物理";
			}
		}
		
		/*
		 * 绑定触发事件
		 */
		 $("#_sino_devicetype_add").bind('click',function(){
              create();
         });
	}
	
	function create(){
		$('#alertMsg').empty();
		var row = $("#_sino_devicetype_treegrid").treegrid("getSelected"); 
		$("#_sino_devicetype_loadurl").empty();
		
		var parentId,parentName,typeCode;
		if(row){				
		   parentId = row.id;			   
		   parentName= "<strong>父菜单为："+row.name+"</strong>";
		   typeCode = row.typeCode;
		} else {
			parentId = "";
			parentName = "空";
			typeCode = "";
		}
		
		var str =  "<ul class='breadcrumb'><li class='active'>配置管理<span class='divider'>/</span></li><a style='color:#0088cc' class='active' herf='#' id='cancle'>设备类别<span class='divider'>/</span></a><li class='active'>添加设备类别</li></ul>"
			+"<div class='padding:10px 0 10px 60px;text-align: center;' margin: 0 auto>"		
			+"<form id='_sino_devicetype_create' name='_sino_devicetype_create' method='post' class='form-horizontal'>"
			+"<input type='hidden' name='parentId' value='"+parentId+"'>"
			+"<center>"
			+"<div class='alert'><strong>提示：</strong>当前父节点为："+parentName+"</div>"
			+"</center>"
			+"<div style='background:rgba(0,0,0,0.4); padding-top:40px; padding-bottom:40px;'>"
			+"<table align='center'>"
			+"<tr><td algin='right'>"
			+"<div class='control-group' style='margin-bottom:15px;'><label class='control-label' for='TypeName'>类别名称</label></td><td algin='left'><div class='controls'><input type='text' style='margin-left:-160px ' id='typeName' name='typeName' data-validation-required-message='请输入菜单名称！' data-content='请输入菜单名称！' required /> <p class='help-block'></p></div></td></div></tr>"
			+"<tr><td>"
			+"<div class='control-group' style='margin-bottom:0px;margin-top:-38px;'><label class='control-label' for='TypeName'>分类编码</label></td><td algin='left'><div class=''><span class='add-on' style='margin-left:20px;'>"+typeCode+"</span><input style='width: 206px' typeCode ='"+typeCode+"' type='text' name='typeCode' id='_typeCode' data-validation-required-message='请输入分类编码！' data-content='编码已存在！' required /> <p class='help-block' style='font-size:12px;margin-top:3px;margin-top:10px;margin-left:20px;color:red;'>注：编码需要唯一</p></div></td></div></tr>"
			+"<tr><td algin='right'>"
			+"<div class='control-group' ><label class='control-label' for='IsModule' >是否可用</label></td><td algin='left'><div class='controls' style='margin-left: 22px ;'><label class='radio inline'>是<input type='radio' name='isModule' value='1' checked/></label>"
			+"<label class='radio inline'>否<input type='radio' name='isModule' value='0'/></label></div></td></div></tr>"
			+"<tr><td algin='right'>"
			+"<div class='control-group' ><label class='control-label' for='IsLogic'>是否逻辑设备</label></td><td algin='left'><div class='controls' style='margin-left: 22px ;'><label class='radio inline'>逻辑<input type='radio' name='isLogic' value='1' checked/></label>"
			+"<label class='radio inline'>物理<input type='radio' name='isLogic' value='2'/></label></div></td></div></tr>"
			+"<tr><td algin='right'>"
			+"<div class='control-group'><label class='control-label' for='Icon'>排序字段</label></td><td algin='left'><div class='controls' style='margin-left: 23px;'><input type='number' id='orderValue' name='orderValue' data-validation-number-message='请输入排序字段整数！' data-content='请输入排序字段整数！' required/><p class='help-block'></p></div></td></div></tr>"				
			+"</table>"
			+"</form>"
			
			+"<center>"
			+"<a id='btnConfirm' role='button'  data-toggle='modal' class='btn btn-small btn-primary'>保存</a>"
			+"<a  id='cancle1' role='button' data-toggle='modal' class='btn  btn-small  btn-default' style='margin-left: 22px;'>取消</a>"
			+"</div>"
			+"</center>"
			;

		    $("#_sino_devicetype_loadurl").append(str);
            
		    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
				submitSuccess: function (form, event){
					event.preventDefault();
	    				$.ajax({
		    					url: ctx+"/base/productType/add?tmp="+Math.random(),  // 提交的页面

		    					data: $('#_sino_devicetype_create').serialize(), // 从表单中获取数据
		    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		    					beforeSend: function()          // 设置表单提交前方法
		    					{
		    						var typeCodes = [];
		    						var _typeCode = $('#_typeCode').val();
		    						var _typeName=$("#typeName").val();
		    						var orderValue=$("#orderValue").val();
		    						if(orderValue==""){
		    							$('#orderValue').popover({trigger:'focus',animation:true,placement:'left',delay:{ show: 100, hide: 100 }});
	    								$('#orderValue').focus();
	    								return false;
		    						}
		    						if(_typeName==""){
		    							$('#typeName').popover({trigger:'focus',animation:true,placement:'left',delay:{ show: 100, hide: 100 }});
	    								$('#typeName').focus();
	    								return false;
		    						} 
		    						_typeCode+=$('#_typeCode').attr('typeCode');
		    						for(var i in jsonData){
		    							var code = jsonData[i].typeCode;
		    							typeCodes.push(code);
		    							addTypeCode(jsonData[i],typeCodes);
		    						}
		    						for(var j in typeCodes){
		    							if(_typeCode == typeCodes[j]){
		    								$('#_typeCode').popover({trigger:'focus',animation:true,placement:'left',delay:{ show: 100, hide: 100 }});
		    								$('#_typeCode').focus();
		    								return false;
		    							}
		    						}
		    					},
		    					error: function(request) {      // 设置表单提交出错
		    					},
		    					success: function(data) {
		    						var mainUrl ='base/productType/productType_main';
									$('#edit_list').load(mainUrl)
		    					}
	    				});
					
				},submitError: function (form, event, errors) {
					event.preventDefault();
				}
			});
		    
	        $("#btnConfirm").unbind('click').click(function(){
	        	$('#_sino_devicetype_create').submit();
	          });
	        $("#cancle").unbind('click').click(function(){
				var mainUrl ='base/productType/productType_main';
				$('#edit_list').load(mainUrl)        	  	    
	        });
	        $("#cancle1").unbind('click').click(function(){
				var mainUrl ='base/productType/productType_main';
				$('#edit_list').load(mainUrl)        	  	    
	        });			
		}
	
	function isChildren(obj){
		if(obj.children){
			if(obj.children.length > 0){
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
	
	function addTypeCode(obj,typeCodes){
		if(isChildren(obj)){
			for(var j in obj.children){
				var code = obj.children[j].typeCode;
				typeCodes.push(code);
				if(isChildren(obj.children[j])){
					addTypeCode(obj.children[j],typeCodes);
				}
			}
		}
	}
	
	
	function save(){
		$("#_sino_devicetype_create").form('submit',{
	    	url:'',
	    	onSubmit:function(){
	    		return false;
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data=="success"){
                	  //  alert("ss3ss");
                		$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>操作成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		       $(".alert").hide();
	         		    });	
	         		   openurl('base/productType/productType_main');
                    }else{
                	   $('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>操作失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();
	         		    });
                   }  
  
                    
                }
	    });
	}
	
	function update(id){
		$.ajax({
			type:'post',
			url:ctx+'/base/productType/getTypeById?id='+id,
			dataType:'json',
			success:function(row){
				$('#alertMsg').empty();
				$("#_sino_devicetype_loadurl").empty();
			
				var isLogic=row.isLogic;
				var isModule=row.isModule;
				var str =  "<ul class='breadcrumb'><li class='active'>配置管理<span class='divider'>/</span></li><a style='color:#0088cc' class='active' herf='#' id='cancle'>设备类别<span class='divider'>/</span></a><li class='active'>修改设备类别</li></ul>"
					+"<div class='padding:100px 0 10px 60px;text-align: center;'>"		
					+"<form id='_sino_devicetype_editform' name='_sino_devicetype_editform' method='post' class='form-horizontal'>"
					+"<input type='hidden' name='id' value='"+id+"'>"
					+"<table align='center'>"
					+"<tr><td algin='right'>"
					+"<div class='control-group' style='margin-bottom:0px;'><label class='control-label' for='TypeName'>类别名称</label></td><td algin='left'><div class='controls'><input type='text' style='margin:40px 0 25px -158px ' name='typeName' value='"+row.typeName+"'  data-validation-required-message='请输入菜单名称！' required /> <p class='help-block'></p></div></td></div></tr>"
					+"<tr><td>"
					+"<div class='control-group' style='margin-bottom:0px;margin-top:-33px;'><label class='control-label' for='TypeName'>分类编码</label></td><td algin='left'><div class='input-prepend' style='margin-left: 20px'><input typeCode ='"+row.typeCode+"' value='"+row.typeCode+"' type='text' name='typeCode' id='_typeCode' data-validation-required-message='请输入分类编码！' data-content='编码已存在！' required /> <p class='help-block' style='font-size:12px;margin-top:3px;margin-top:10px;margin-left:20px;color:red;'>注：编码需要唯一</p></div></td></div></tr>"
					+"<tr><td algin='right'>"
					+"<div class='control-group'><label class='control-label' for='IsModule'>是否可用</label></td><td algin='left'><div class='controls' style='margin-left: 22px ;margin-top: -5px'><label class='radio inline'>是<input type='radio' name='isModule' value='1' checked/></label>"
					+"<label class='radio inline'>否<input type='radio' name='isModule' value='0'/></label></div></td></div></tr>"
					+"<tr><td algin='right'>"
					+"<div class='control-group'><label class='control-label' for='IsLogic'>是否逻辑设备</label></td><td algin='left'><div class='controls' style='margin-left: 22px ;margin-top: -7px'><label class='radio inline'>逻辑<input type='radio' name='isLogic' value='1' checked/></label>"
					+"<label class='radio inline'>物理<input type='radio' name='isLogic' value='2'/></label></div></td></div></tr>"
					+"<tr><td algin='right'>"
					+"<div class='control-group'><label class='control-label' for='Icon'>排序字段</label></td><td algin='left'><div class='controls' style='margin-left: 23px;margin-top: -5px'><input type='number' name='orderValue' value='"+row.orderValue+"' data-validation-number-message='请输入排序字段整数！'/><p class='help-block'></p></div></td></div></tr>"				
					+"</table>"
					+"</form>"
					+"</div>"
					+"<center>"
					+"<a href='#' id='btnConfirm' role='button'  data-toggle='modal' class='btn btn-small btn-primary'>保存</a>"
					+"<a href='#' id='cancle' role='button' data-toggle='modal' class='btn  btn-small  btn-default' style='margin-left: 22px;'>取消</a>"
					+"</center>"
					;
					
					$("#_sino_devicetype_loadurl").append(str);
					
					if(isModule == 1){
						$("#isModule_true").attr("checked","checked");
					} else {
						$("#isModule_false").attr("checked","checked");
					}
					if(isLogic == 1){
						$("#isLogic_true").attr("checked","checked");
					} else {
						$("#isLogic_false").attr("checked","checked");
					}

					$("#btnConfirm").unbind('click').click(function(){
							url = ctx+"/base/productType/edit?tmp="+Math.random();
							edit();
					  });
					$('a[id="cancle"]').unbind('click').click(function(){
						var mainUrl ='base/productType/productType_main';
						$('#edit_list').load(mainUrl)         	  	        	
					});
			}
		});
	}
	
	function edit(){
		$("#_sino_devicetype_editform").form('submit',{
	    	url:url,
	    	onSubmit:function(){
	    		return $(this).form('validate');
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data=="success"){
                	  //  alert("ss3ss");
                		$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>操作成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		       $(".alert").hide();
	         		    });	
					   	var mainUrl ='base/productType/productType_main';
						$('#edit_list').load(mainUrl) 
                    }else{
                	   $('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>操作失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();
	         		    });
                   }  
  
                    
                }
	    });
	}
	
	function del(id){
		$.ajax({
			type:'post',
			url:ctx+'/base/productType/getTypeById?id='+id,
			dataType:'json',
			success:function(row){
				$('#alertMsg').empty();
				var row = $("#_sino_devicetype_treegrid").treegrid("getSelected"); 
				if(row.children.length != 0){
					$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>不能直接删除父节点信息！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					$(".alert").delay(2000).hide(0);
					$(".close").click(function(){
						$(".alert").hide();
					});
					return;
				}
				$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
					if (r){
						$.ajax({
							url: ctx+"/base/productType/del?devicetypeId="+row.id,  // 提交的页面
							data: "", // 从表单中获取数据
							type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
							error: function(request) {     // 设置表单提交出错
								 $('#alertMsg').empty();
									$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
									$(".alert").delay(2000).hide(0);
									$(".close").click(function(){
										$(".alert").hide();
									});
							},
							success: function(data) {
									$('#alertMsg').empty();
									$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
									$(".alert").delay(2000).hide(0);
									$(".close").click(function(){
										$(".alert").hide();  
									});
								   $('#_sino_devicetype_treegrid').treegrid('reload',row.target);
							}
						});
					}
				});
			}
		});
		
	}





	
