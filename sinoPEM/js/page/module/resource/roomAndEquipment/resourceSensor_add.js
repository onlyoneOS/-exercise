define(function(require, exports, module) {

	 var $ = require("jquery");
	 require("uic_framework");
	 require("formTree");
	 require("bootstrap-datetimepicker");
	 require("jquery.form");
	 require("formTree");
	 require("formUser");
	 require("formSelect");
	 require("easyui");
	 //页面接口	
	 exports.init = function(){
		
		 
	
	 $("document").ready(function(){
		var flag=true; 
		 
	 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		 flag=true;
		 if($('#deviceName').val() != null&&$('#deviceName').val() != ""){
			 $(this).tab('show');
		 } else {
			 
			 $('.nav-tabs a:first').tab('show');
			 if(flag){
				 $.messager.alert('提示','请您先保存基本信息!');
				 flag=false;
			 }
		 }

	  })
		
		

		//datatime日期组件
	 $(function() {
		    $('#dateTimeInstall').datetimepicker({
		    	pickTime: false

		    });
		    $('#dateTimeProduct').datetimepicker({
		    	pickTime: false

		    });
	  });
	
		/*
		 * 所属机房
		 */
		
		//orgAndRoom所属组织机房
	    var orgTree = $("#roomId");
		var optionsOrg = {
			inputName : 'roomId',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			tree_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 顶层
			asyncUrl : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 异步
			search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
			find_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 精确定位
			url : '',
			asyncParam : ["id"],
			addparams : [{
						name : "orgParentId",
						value : "root"
					}],
			async : true
		};
			orgTree.formTree(optionsOrg);

			
			//加载探头类型
			$("#productTypeDiv").formTree({
				
				inputName : 'productTypeValue',
				inputValue : $('#productTypeName').val(),
				Checkbox : false,
				animate : true,
				searchTree : true,
				tree_url : ctx+"/base/productType/getTreeResource?resourceId=0106&tmp="+Math.random(),// 顶层
				asyncUrl : ctx+"/base/productType/getTree",// 异步
				search_url : ctx+"/base/productType/getTree",// 搜索
				find_url :ctx+"/base/productType/getTree",// 精确定位
				url : '',
				asyncParam : ["id"],
				onSelect:function(node){
					getPartnerInfo(node.id);

					getProductLine('');
					$('#productType').val(node.id);
					$('#partnerId').val('');
					$('#productLine').val('');
				},
				addparams : [{
							name : "productTypeId",
							value : "root"
						}],
				async : true
			});
			
			
			
			//初始化厂商
			$(".ultra-select-input3").uic_Dropdown({
				inputName : '_sino_partner',
				height:"auto",// 宽度
				title: "厂商",
				selecttitle:"从下列选择", //标题
				url:ctx+"/base/partnerInfo/getAll?productTypeId="+1389581265050,	 //型号分组数据
				checkbox:false,
				branchtype:true,
				search:false,
				width:"300px",
				onSelect:function(id,value){
					getProductLine(ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random());
					$('#partnerId').val(id);
					$('#productLine').val('');
					$('#productModelId').val('');
				}
			});
			
			//选择厂商信息
	    	function getPartnerInfo(productTypeId){
	 			$("#_sino_partner_div").empty();
	 			$("#_sino_partner_div").append('<input id="_sino_partner" name="_sino_partner" type="text" class="ultra-select-input3"  data="0" />');
	 			
	 			//加载厂商
	 			$(".ultra-select-input3").uic_Dropdown({
	 				inputName : '_sino_partner',
	 				height:"auto",// 宽度
	 				title: "厂商",
	 				selecttitle:"从下列选择", //标题
	 				url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
	 				checkbox:false,
	 				branchtype:true,
	 				search:false,
	 				width:"300px",
	 				onSelect:function(id,value){
	 				 var productLineUrl=ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random();
	 					
	 					//Ajax查出UPS系列的默认值选中第一个
						$.ajax({
			                url:productLineUrl,  // 提交的页面
			                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
			                async:false,
			                success: function(data) {
								if(data!=null){
									
//									console.info(data);
									var jsonStr = data;
									$('#productLineName').val(jsonStr[0].text);
									$('#productLine').val(jsonStr[0].id);
								}
			                }
			            });
	 					
	 					$('#partnerId').val(id);
	 					getProductLine(productLineUrl);
	 				}
	 			});
	 		}
	    	

			
			//系列初始化
			var productUrl = '';
				if($('#brandId').val() != ""&&$('#brandId').val() != null){
					productUrl = ctx+'/base/productline/getTree?partnerBrandId='+$('#brandId').val();
				}
				
			$("#_sino_product_line").formTree({	
				inputName : '_sino_product_line',
				Checkbox : false,
				animate : true,
				searchTree : true,
				tree_url : productUrl,// 顶层
				search_url : productUrl,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					
					$('#productLine').val(node.id);
					
				},
				async : true
			});	
			
			//系列选择
	 		function getProductLine(url){
	 			var beforProductLineName=$('#productLineName').val();
	 			$("#_sino_product_line").empty();
	 			$("#_sino_product_line").formTree({	
	 				inputName : '_sino_product_line',
	 				inputValue :beforProductLineName,
	 				Checkbox : false,
	 				animate : true,
	 				searchTree : true,
	 				tree_url : url,// 顶层
	 				search_url : url,// 搜索
	 				asyncParam : ["id"],
	 				onSelect:function(node){
	 					$('#productLine').val(node.id);
	 					getProductModel();
	 					
	 					
	 				},
	 				async : true
	 			});
	 			//如果系列有默认值，那么要加载探头型号下拉框
				if(beforProductLineName!=''){
					getProductModel();
				}
	 		}
	 		
			
	

			//初始化探头型号
			var $formSelectProductModel=$("#formSelectProductModel");
			$formSelectProductModel.addClass("li_form");
			var productTypeId = $('#productType').val();
			var partnerId = $('#partnerId').val();
			var brandId = $('#brandId').val();
			var productLineId = $('#productLine').val();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+productTypeId+"&partnerId="+partnerId+"&brandId="+brandId+"&productLineId="+productLineId;
			var optionProductModel = {
					inputName : "productModel",
					writeType : 'show',
					url:productModelurl,
					inputValue : $("#productModelId").val(),
					showLabel : false,
					width : "282",
					onSelect:function(node){
						var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
						$('#productModelId').val(productModelId); 
					}
				};
			$formSelectProductModel.formSelect(optionProductModel);
		
			//探头型号选择
			function getProductModel(){
				$("#formSelectProductModel").empty();
				var $formSelectProductModel=$("#formSelectProductModel");
				var productTypeId = $('#productType').val();
				var partnerId = $('#partnerId').val();
				var brandId = $('#brandId').val();
				var productLineId = $('#productLine').val();
				var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+productTypeId+"&partnerId="+partnerId+"&brandId="+brandId+"&productLineId="+productLineId;
				$formSelectProductModel.addClass("li_form");
				var optionProductModel = {
						inputName : "productModel",
						writeType : 'show',
						showLabel : false,
						url : productModelurl,
						onSelect:function(node){
							var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
							$('#productModelId').val(productModelId); 
						},
						width : "282"
					};
				$formSelectProductModel.formSelect(optionProductModel);
			}
			
	    	//org所属组织
		    var orgTree = $("#orgId");
			var optionsOrg = {
				inputName : 'orgId',
				//labelName : 'formTree',
				Checkbox : false,
				// onlyLeafCheck : true,
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
				async : true
			};
				orgTree.formTree(optionsOrg);
				
				
				//选人组件
				var $field1 = $("#formUser");
				var optionss = {
					inputName : "userValues",
					showLabel : false,
					selectUser: false,
					name : "code",
					value : "root",
					width : 280
				}

				optionss.addparams = [ {
					name : "code",
					value : "root"
				} ];

				$field1.formUser(optionss);
				
					
	    	/*
	    	 * 探头管理基本信息表单提交
	    	 */
	    		
	    		$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
	    			
	    				if(form.attr("id")=='addDevForm'){
	    					
	    					devFormAjax();
	    				}
	    				if(form.attr("id")=='addDevManagForm'){
	    					devManagFormAjax();
	    				}
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    			
	    		});
	    		function  devFormAjax(){
//	    			alert('devFormAjax');
    				$.ajax({
    					url: ctx+"/sensor/addSensor",  // 提交的页面
    					data: $('#addDevForm').serialize(), // 从表单中获取数据
    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
    					beforeSend: function()          // 设置表单提交前方法
    					{
    						//  new screenClass().lock();
    					},
    					error: function(request) {      // 设置表单提交出错
    						
    					},
    					success: function(data) {
//    						console.info(data);
    						// 设置表单提交完成使用方法
    						if(data.id!=null){
//    							 $('#deviceName').val(data)
    		                	 $('.nav-tabs a:last').tab('show');
    							 $('#devId').attr('value',data.id);
    							 
    						}else{
    							$('#alertMsg').empty();
    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>探头添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
    							$('.edit_list').load(ctx + '/sensor/sensorManager?tmp=' + Math.random());
    							
    						}  
    					}
    				});
	    		}
	    		
	    		function  devManagFormAjax(){
//	    			alert('devManagFormAjax');
    				$.ajax({
    					url: ctx+"/sensor/addSensorManage",  // 提交的页面
    					data: $('#addDevManagForm').serialize(), // 从表单中获取数据
    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
    					beforeSend: function()          // 设置表单提交前方法
    					{
    						//  new screenClass().lock();
    					},
    					error: function(request) {      // 设置表单提交出错
    						
    					},
    					success: function(data) {
    						// 设置表单提交完成使用方法
    						if(data=="success"){
    							$('#alertMsg').empty();
    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>探头添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
    							$('.edit_list').load(ctx + '/sensor/sensorManager?tmp=' + Math.random());
    							
    							 
    						}else{
    							
    						}  
    					}
    				});
	    			
	    		}
	    		
	    	  	$("#basicSave").unbind("click").click(function(){
	    	  		
	    	  		$("#productTypeIdValue").attr("value",$("#productTypeDiv").formTree("getValue"));
	    	  		$("#roomIdValue").attr("value",$("#roomId").formTree("getValue"));
		    		$('#addDevForm').submit();
		    	});
	    	  	
	    	  	$("#addSite").unbind("click").click(function(){
	    	  		
	    	  		$("#orgValue").attr("value",$("#orgId").formTree("getValue"));
		    		$("#staffValue").attr("value",$("#formUser").formUser("getValue"));
		    		$("#addDevManagForm").submit();
		    	});
	    	  	
	    	  	$("#reset").unbind("click").click(function(){
		    		
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/sensor/sensorManager?tmp=' + Math.random());
		    	});
	 });

  }	  

})