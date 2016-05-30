define(function(require, exports, module) {

	 var $ = require("jquery");
	 require("uic_Dropdown");
	 require("formTree");
	 require("bootstrap-datetimepicker");
	 require("jquery.form");
	
	 require("formUser");
//	 require("formStaff");
	 
	 require("formSelect");
	 require("easyui");
	 //页面接口	
	 exports.init = function(){
		 var flag=0;
		 
	
	 $("document").ready(function(){
		 
		 $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
			 if($('#deviceName').val() != null&&$('#deviceName').val() != ""){
				 $(this).tab('show');
			 } else {
				 $.messager.alert('提示','请先填写基本信息!');
				 $('.nav-tabs a:first').tab('show');
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
	
		
		
		//所属组织及机房下拉树
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
		
			optionsOrg.resIds = $('#roomNameId').val();
			optionsOrg.inputValue = $('#roomName').val();
			
			orgTree.formTree(optionsOrg);



			//加载配电柜类型
			$("#productTypeDiv").formTree({	
				inputName : 'productTypeValue',
				inputValue : $('#productTypeName').val(),
				Checkbox : false,
				animate : true,
				searchTree : true,
				tree_url : ctx+"/base/productType/getTreeResource?resourceId=010101&tmp="+Math.random(),// 顶层
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
				url:ctx+"/base/partnerInfo/getAll?productTypeId="+15,	 //型号分组数据
				checkbox:false,
				branchtype:true,
				search:false,
				width:"300px",
				onSelect:function(id,value){
//					getPartnerBrand(ctx+"/base/partnerBrand/getSelectListByPartner?partnerId="+id+"&tmp="+Math.random());
					getProductLine(ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random());
					$('#partnerId').val(id);
//					$('#brandId').val('');
					$('#productLine').val('');
					$('#productModelId').val('');
				}
			});
			
			//选择厂商信息
	    	function getPartnerInfo(productTypeId){
	 			$("#_sino_partner_div").empty();
	 			$("#_sino_partner_div").append('<input id="_sino_partner" name="_sino_partner" type="text" class="ultra-select-input3" data="0" />');
	 			
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
		 				//Ajax查出配电柜系列的默认值选中第一个
						$.ajax({
			                url:productLineUrl,  // 提交的页面
			                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
			                async:false,
			                success: function(data) {
								if(data!=null){
									
									var jsonStr = data;
									$('#productLineName').val(jsonStr[0].text);
									$('#productLine').val(jsonStr[0].id);
								}
			                }
			            });
	 				
	 					getProductLine(productLineUrl);
	 					$('#partnerId').val(id);
	 					$('#brandId').val('');
	 					$('#productLine').val('');
	 				}
	 			});
	 		}
	    	

			//系列初始化
			var productUrl = '';
				if($('#brandId').val() != ""&&$('#brandId').val() != null){
					productUrl = ctx+'/base/productline/getTree?partnerBrandId='+$('#brandId').val();
				}
			var beforeProductLineName=$("#productLineName").val();
			$("#_sino_product_line").formTree({	
				inputName : '_sino_product_line',
				Checkbox : false,
				animate : true,
				searchTree : true,
				inputValue : beforeProductLineName,
				tree_url : productUrl,// 顶层
				search_url : productUrl,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					$('#productLine').val(node.id);
					getProductModel(node.id);
 					$('#productModelId').val('');
				},
				async : true
			});	
			
			//系列选择
	 		function getProductLine(url){
	 			var beforProductLineName=$('#productLineName').val();
	 			$("#_sino_product_line").empty();
	 			$("#_sino_product_line").formTree({	
	 				inputValue :beforProductLineName,
	 				inputName : 'productLine',
	 				Checkbox : false,
	 				animate : true,
	 				searchTree : true,
	 			
	 				tree_url : url,// 顶层
	 				search_url : url,// 搜索
	 				asyncParam : ["id"],
	 				onSelect:function(node){
	 					$('#productLine').val(node.id);
	 					getProductModel(node.id);
	 					$('#productModelId').val('');
	 					
	 				},
	 				async : true
	 			});	
	 			
	 			//如果系列有默认值，那么要加载配电柜型号下拉框
				if(beforProductLineName!=''){
					getProductModel();
				}
	 		}
			
	 		

			//初始化配电柜型号
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
		
			//配电柜型号选择
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
				optionsOrg.resIds = $('#manageDeptId').val();
				optionsOrg.inputValue = $('#orgNameString').val();	
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
				optionss.resIds = $('#devicePrincipalId').val();
				optionss.inputValue = $('#staffNameString').val();
				$field1.formUser(optionss);
				
					
	    	/*
	    	 * 配电柜管理基本信息表单提交
	    	 */
	    		
	    		$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
	    			
	    			submitSuccess: function (form, event)
	    			{
	    				event.preventDefault();
	    					if(form.attr("id")=='updateDevForm'){
		    				$.ajax({
		    					
			    					url: ctx+"/powerCabinet/modiPowerDev",  // 提交的页面
		
			    					data: $('#updateDevForm').serialize(), // 从表单中获取数据
			    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			    					beforeSend: function()          // 设置表单提交前方法
			    					{
			    						//  new screenClass().lock();
			    					},
			    					error: function(request) {      // 设置表单提交出错
			    						
			    					},
			    					success: function(data) {
			    						
			    						// 设置表单提交完成使用方法
			    						if(data.id!=null){
//			    							 $('#deviceName').val(data)
			    		                	 $('.nav-tabs a:last').tab('show');
			    							 $('#devId').attr('value',data.id);
			    							 
			    						}else{
			    							
			    						}  
			    					}
			    					
		    				});
	    			}
	    			if(form.attr("id")=='updateDevManagForm'){
	    				$.ajax({
	    					
	    					url: ctx+"/powerCabinet/modiPowerDevManage",  // 提交的页面

	    					data: $('#updateDevManagForm').serialize(), // 从表单中获取数据
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
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>配电柜添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
								    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
	    							$('.edit_list').load(ctx + '/powerCabinet/powerCabinetManager?tmp=' + Math.random());
	    							
	    							 
	    						}else{
	    							
	    						}  
	    					}
	    					
    				});
	    			}
	    				
	    			},submitError: function (form, event, errors) {
	    				event.preventDefault();
	    			}
	    			
	    		});
	    		
	    	  	$("#basicSave").unbind("click").click(function(){
	    	  	 	   console.info($("#roomId").formTree("getValue"));
	    	  		$("#roomIdValue").attr("value",$("#roomId").formTree("getValue"));
	    	  		
		    		$('#updateDevForm').submit();
		    	
		    		
		    	});
	    	  	
	    		/*
		    	 * 配电柜管理管理信息表单提交
		    	 */
	    	  	$("#modiSite").unbind("click").click(function(){
	    	  		$("#orgValue").attr("value",$("#orgId").formTree("getValue"));
		    		$("#staffValue").attr("value",$("#formUser").formUser("getValue"));
		    		
		    
		    		$('#updateDevManagForm').submit();
//		    		flag=0;
//		    		$("#modiDevManagForm").ajaxSubmit(function(message) { 
//		    			async : false // 同步提交
//		    			
//		    		});  
//		    		$('#edit_list').empty();
//		    		$('.edit_list').load(ctx + '/roomDevice/roomDeviceManager?tmp=' + Math.random());
		    		
		    	});
	    		
	    	  	$("#reset").unbind("click").click(function(){
		    		
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx + '/powerCabinet/powerCabinetManager?tmp=' + Math.random());
		    	});
	    	  	
	    	  
	 });

  }	  

})