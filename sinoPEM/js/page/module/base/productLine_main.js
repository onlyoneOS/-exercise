function loadTreegrid(){
		$("#_sino_devicetype_treegrid").treegrid({
	        	title:"产品系列表",
	        	loadMsg : "数据加载中，请稍后......",
	        	method:"post",
	        	url:ctx+"/base/productline/getTreegrid",
	        	rownumbers:true,
	        	fitColumns:true,
	        	onBeforeLoad:function(row,param){
					$("#_sino_devicetype_treegrid").resizeTreeGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
					var w = $(".datagrid").width();
					$(".panel-header").css('width',w-30);
					$(".datagrid-wrap").css('width',w-20);
				},	
		    	onLoadSuccess:function(row){
					$(window).bind('resize', function () {
						$("#_sino_devicetype_treegrid").resizeTreeGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
						var w = $(".datagrid").width();
						$(".panel-header").css('width',w-30);
						$(".datagrid-wrap").css('width',w-20);
					});
				},
	        	idField:"id",
	        	treeField:"name",
	        	columns:[[
	        	  {
	        		 field:"name",
	        		 title:"名称",
	        		 width:$(this).width() * 0.11,
	        		 height:50
	        	  },{
	        		  field:"productLineDesc",
	        		  title:"系列描述",
	        		  width:$(this).width() * 0.24
	        	  },{
	        		  field:"productTypeName",
	        		  title:"产品类别",
	        		  width:$(this).width() * 0.1
	        	  },{
	        		  field:"partnerName",
	        		  title:"厂商名称",
	        		  width:$(this).width() * 0.1
	        	  }
	        	 ]],
	        	 toolbar :[{
	 				id : '_add',
	 				text : '增加',
	 				iconCls : 'icon-add',
	 				handler : function() {
	        		 create();
	 				}
	 			},{
	 				id : '_edit',
	 				text : '修改',
	 				iconCls : 'icon-edit',
	 				handler : function() {
	 					update();
	 				}
	 			},{
	 				id : '_remove',
	 				text : '删除',
	 				iconCls : 'icon-remove',
	 				handler : function() {
	 					del();
	 				}
	 			}]
		});
		
		var partnerHref = '';
		
		$("#_sino_product_type").formTree({
			
			inputName : '_sino_product_type',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
		
			tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
			asyncUrl : ctx+"/base/productType/getTree",// 异步
			search_url : ctx+"/base/productType/getTree",// 搜索
			find_url :ctx+"/base/productType/getTree",// 精确定位
			url : '',
			asyncParam : ["id"],
			onSelect:function(node){
				getPartnerInfo(node.id);
				//getPartnerBrand('');
			},
			addparams : [{
						name : "productTypeId",
						value : "root"
					}],
			async : true
		});
		
		//初始化厂商下拉框
		getPartnerInfo('');
		
		//品牌
		var $fieldCompDevType = $("#_sino_partner_brand");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"280", //高度
			url : ''
			//checkbox : true
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		
		/*
		 * 绑定触发事件
		 */
		 $("#_sino_devicetype_add").bind('click',function(){
              create();
         });

		 $("#_sino_devicetype_edit").bind('click',function(){
    	      update();
		 });
      
		 $("#_sino_devicetype_del").bind('click',function(){
	         del();
		 });
		 $("#_sino_partner_line_search").bind('click',function(){
			 search();
		 });
		 $("#_sino_partner_line_reload").bind('click',function(){
			 openurl('/base/productline/productLine_main');
		 });
	}
	
	function brandName(value){
		if(value == ''||value == null){
			return "默认品牌";
		} else {
			return value;
		}
	}
	function getPartnerInfo(productTypeId){
		$("#_sino_partner_div").empty();
		$("#_sino_partner_div").append('<input id="_sino_partner" type="text" class="ultra-select-input3" id="_sino_partner" data="0" />');
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			width:'280px',
			onSelect:function(id,value){
				//getPartnerBrand(ctx+"/base/partnerBrand/getSelectListByPartner?partnerId="+id+"&tmp="+Math.random());
				//reloadTree("partnerId",id);
			$("#_sino_partner_partnerId").val(id);
			}
		});
	}
	function getPartnerBrand(url){
		$('#_sino_partner_brand').empty();
		var $fieldCompDevType = $("#_sino_partner_brand");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"280", //高度
			url : url,
			inputChange : true,
			onSelect :function(){
			//alert($("#_sino_partner_product").formSelect("getValue"));
			//reloadTree("brandId",$("#_sino_partner_brand").formSelect("getValue"));
		}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
	}
	function search(){
		var productType = $("#_sino_product_type").formTree('getValue');
		var partner = $(".ultra-select-input3").uic_Dropdown('getValue').id;
//		var brand = $("#_sino_partner_brand").formSelect("getValue");
		if(partner!= null&&partner != ""){
			reloadTree("partnerId",partner);
		} else if(productType!= null&&productType != ""){
			reloadTree("productTypeId",productType);
		} else { 
//			$("#_sino_devicetype_treegrid").treegrid('reload');
//			exports.init();
			reloadTree(null,null);
		}
	}
	function reloadTree(fildName,id){
		var str = id+"_"+fildName;
		$("#_sino_devicetype_treegrid").treegrid('reload',{IdAndName:str});
	}
	function create(){
		$('#alertMsg').empty();
		$('#typeName').show();
		$('#partnerName').show();
		$('#brandName').show();
		var row = $("#_sino_devicetype_treegrid").treegrid("getSelected"); 
		$("#_sino_devicetype_loadurl").empty();
		$(".page-header").empty();
		var titleStr = '<h2 id="myModalLabel">新建系列'
			+'<div class="pull-right"><button id="cancle" type="button" class="btn btn-default btn-lg">'
			+' <span class="icon-repeat"></span>'
			+'返回'
			+'</button></div>'
			+'</h2>'
		$(".page-header").append(titleStr);
		$("#_search").remove();
		var parentId,parentName;
		if(row){				
		   parentId = row.id;			   
		   parentName= "<strong>父菜单为："+row.name+"</strong>";
		} else {
			parentId = "";
			parentName = "空";
		}
		
		var str =  ""
			+"<form id='_sino_partnerBrand_create'  name='_sino_devicetype_create' method='post' class='form-horizontal'>"
			+"<input type='hidden' name='parentId' value='"+parentId+"'>"
			+"<input type='hidden' name='productType' id='_sino_productTypeId'>"
			+"<input type='hidden' name='partnerId' id='_sino_partner_partnerId'>"
			+"<input type='hidden' name='brandId' id='_sino_partner_brandId'>"
			
			+"<div class='alert'><strong>提示：</strong>当前父节点为："+parentName+"</div>"
			
			+"<div class='control-group' id='typeName'><label class='control-label' for='typeName'>产品分类:</label><div id='_sino_product_type' class='controls'><p class='help-block'></p></div></div>"
			+"<div class='control-group' id='partnerName' ><label class='control-label' for='partnerName'>厂商:</label><div class='controls' id='_sino_partner_div' ><input id='_sino_partner' type='text' class='ultra-select-input3' data='0' /><p class='help-block'></p></div></div>"
			+"<div class='control-group' id='brandName' style='margin-top:-15px; display:none;'><label class='control-label' for='brandName'>品牌:</label><div id='_sino_partner_brand'  class='controls'><p class='help-block'></p></div></div>"
			+"<div class='control-group' style='margin-bottom:0px;'><label class='control-label' for='TypeName'>系列名称:</label><div class='controls'><input type='text' name='productLine' data-validation-required-message='请输入菜单名称！'required/> <p class='help-block'></p></div></div>"
			+"<div class='control-group' style='margin-bottom:0px;'><label class='control-label' for='TypeName'>系列描述:</label><div class='controls'><textarea type='text' name='productLineDesc'></textarea <p class='help-block'></p></div></div>"
			
						
			+"</form>"
			+"<div class='modal-footer'>"				
			+"<button class='btn btn-primary' id='btnConfirm'>保存系列</button ></div>"
						
			;

		    $("#_sino_devicetype_loadurl").append(str);
            
		    $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
				submitSuccess: function (form, event){
					event.preventDefault();
	    				$.ajax({
		    					url: ctx+"/base/productline/save?tmp="+Math.random(),  // 提交的页面

		    					data: $('#_sino_partnerBrand_create').serialize(), // 从表单中获取数据
		    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		    					beforeSend: function()          // 设置表单提交前方法
		    					{
		    					},
		    					error: function(request) {      // 设置表单提交出错
		    					},
		    					success: function(data) {
		    						openurl('/base/productline/productLine_main');
		    					}
	    				});
					
				},submitError: function (form, event, errors) {
					event.preventDefault();
				}
			});
		    
		    $("#_sino_product_type").formTree({	
				
				inputName : '_sino_product_type',
				//labelName : 'formTree',
				Checkbox : false,
				// onlyLeafCheck : true,
				animate : true,
				searchTree : true,
			
				tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
				asyncUrl : ctx+"/base/productType/getTree",// 异步
				search_url : ctx+"/base/productType/getTree",// 搜索
				find_url :ctx+"/base/productType/getTree",// 精确定位
				url : '',
				asyncParam : ["id"],
				onSelect:function(node){
					getPartnerInfo(node.id);
					$("#_sino_productTypeId").val(node.id);
					//getPartnerBrand('');
				},
				addparams : [{
							name : "productTypeId",
							value : "root"
						}],
				async : true
			});
			
			//品牌
			/*var $fieldCompDevType = $("#_sino_partner_brand");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "partnerBrand",
				writeType : 'show',
				showLabel : false,
				width:"206px", //高度
				url : ''
				//checkbox : true
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);*/
		    
	        $("#btnConfirm").unbind('click').click(function(){
	        	$('#_sino_partnerBrand_create').submit();
	        		//url = ctx+"/base/productline/save?tmp="+Math.random();
	        	    //save();
	          });
	        $("#cancle").unbind('click').click(function(){
	        	openurl('/base/productline/productLine_main');
        	  	        	
	        });
		}
	
	
	function save(){
		$("#_sino_partnerBrand_create").form('submit',{
	    	url:url,
	    	onSubmit:function(){
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
	         		   openurl('/base/productline/productLine_main');
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
	
	function update(){
		$('#alertMsg').empty();
		var row = $("#_sino_devicetype_treegrid").treegrid("getSelected"); 
		if(row == null){
			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>请选择要修改的数据！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			$(".alert").delay(2000).hide(0);
 		    $(".close").click(function(){
 		    	$(".alert").hide();
 		    });
			return;
		}
		$("#_sino_devicetype_loadurl").empty();
		$(".page-header").empty();
		$("#_search").remove();
		var titleStr = '<h2 id="myModalLabel">编辑系列'
			+'<div class="pull-right"><button id="cancle" type="button" class="btn btn-default btn-lg">'
			+' <span class="icon-repeat"></span>'
			+'返回'
			+'</button></div>'
			+'</h2>'
		$(".page-header").append(titleStr);
		var str =  ""
		$.ajax({
			url : ctx+"/base/productline/edit?id="+row.id+"&tmp="+Math.random(),
			dataType : "json",
			success : function(data) {
			str = "<div class='modal-body'>"		
				+"<div>"
				+"<form id='_sino_devicetype_editform' name='_sino_devicetype_editform' method='post' class='form-horizontal'>"
				+"<input type='hidden' name='id' value='"+row.id+"'>"
				
				+"<div class='control-group'><label class='control-label' for='Icon'>系列名称:</label><div class='controls'><input type='text' name='productLine' value='"+data.productLine+"' data-validation-required-message='请输入系列名称！'required/><p class='help-block'></p></div></div>" 				
				+"<div class='control-group' style='margin-bottom:0px;'><label class='control-label' for='TypeName'>系列描述:</label><div class='controls'><textarea type='text' name='productLineDesc'>"+data.productLineDesc+"</textarea <p class='help-block'></p></div></div>"			
							
				+"</form>"
				+"</div>"
				+"</div>"
				+"<div class='modal-footer'>"				
				+"<button class='btn btn-primary' id='btnConfirm'>保存系列</button >"
				;
				
				$("#_sino_devicetype_loadurl").append(str);
	            
		        $("#btnConfirm").unbind('click').click(function(){
		        	    url = ctx+"/base/productline/update?tmp="+Math.random();
		        	    edit();
		          });
		        $("#cancle").unbind('click').click(function(){
		        	openurl('/base/productline/productLine_main');
	        	  	        	
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
	         		   openurl('base/productline/productLine_main');
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
	
	function del(){
		$('#alertMsg').empty();
		var row = $("#_sino_devicetype_treegrid").treegrid("getSelected"); 
		if(row == null){
			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>请选择要删除的数据！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			$(".alert").delay(2000).hide(0);
 		    $(".close").click(function(){
 		    	$(".alert").hide();
 		    });
			return;
		}
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
					url: ctx+"/base/productline/del?id="+row.id,  // 提交的页面
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
		         		   openurl('base/productline/productLine_main');
		            }
				});
			}
		});
	}
		loadTreegrid();  
