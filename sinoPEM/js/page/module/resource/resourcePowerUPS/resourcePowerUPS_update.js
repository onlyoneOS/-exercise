
	 //页面接口	
	 function loadAll(){
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
				required : true,
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
				onSelect:function(node){
						$("#roomIdValue").val(node.id);
						$("#roomName").val(node.text);
						},
				async : true
			};
				orgTree.formTree(optionsOrg);

				
				

				//加载UPS类型
				$("#productTypeDiv").formTree({
					
					inputName : 'productTypeName',
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
						$("#productTypeName").val(node.text);
						$('#partnerId').val('');
						$('#productLine').val('');
						temp=1;
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
					url:ctx+"/base/partnerInfo/getAll?productTypeId="+$('#productType').val(),	 //型号分组数据
					checkbox:false,
					branchtype:true,
					search:false,
					required : true,
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
		 				required : true,
		 				width:"300px",
		 				onSelect:function(id,value){
		 				 var productLineUrl=ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random();
		 					
		 					//Ajax查出设备系列的默认值选中第一个
							$.ajax({
				                url:productLineUrl,  // 提交的页面
				                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
				                async:false,
				                success: function(data) {
//									console.info(data);
				                	var jsonStr = data;
//				                	console.info($('#productLineName').val(jsonStr[0].text));
				                	$('#productLineName').val(jsonStr[0].text);
				                	$('#productLine').val(jsonStr[0].id);
				                }
				            });
		 					
		 					$('#partnerId').val(id);
		 					$("#partnerIdValue").val(value)
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
					required : true,
					tree_url : productUrl,// 顶层
					search_url : productUrl,// 搜索
					asyncParam : ["id"],
					onSelect:function(node){
						
						$('#productLine').val(node.id);
						
					},
					async : true
				});
				
				//初始化UPS标志位
				var $mark = $("#formSelectIndicatorMark");
				$mark.addClass("li_form");
				var markVal = $("#indicatorMark").val();
				var optionMark = {
						url:ctx+'/sysDomain/getIndicatorMark',
						writeType : 'show',
						inputValue:markVal,
						showLabel : false,
						width : "282",
						onSelect:function(){
							$("#indicatorMark").val($("#formSelectIndicatorMark").formSelect("getValue")[0]);
						}
					};
				$mark.formSelect(optionMark);
				$("#indicatorMark").val($("#formSelectIndicatorMark").formSelect("getValue")[0]);
				
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
		 				required : true,
		 				tree_url : url,// 顶层
		 				search_url : url,// 搜索
		 				asyncParam : ["id"],
		 				onSelect:function(node){
		 					$('#productLine').val(node.id);
		 					$('#productLineName').val(node.text);
		 					getProductModel();
		 					
		 					
		 				},
		 				async : true
		 			});
		 			//如果系列有默认值，那么要加载设备型号下拉框
					if(beforProductLineName!=''){
						getProductModel();
					}
		 		}
		 		
				

				//初始化设备型号
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
							var product= $("#formSelectProductModel").formSelect("getValue")[1];
							$('#productModelId').val(productModelId); 
							$("#productModelName").val(product);
						}
					};
				$formSelectProductModel.formSelect(optionProductModel);
			
				//设备型号选择
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
								var product= $("#formSelectProductModel").formSelect("getValue")[1];
								$('#productModelId').val(productModelId); 
								$("#productModelName").val(product);
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
					required : true,
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
					onSelect:function(node){
						$("#orgValue").val(node.id)
							},
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
						width : 280,
						onSelect:function(node){
						//	$("#staffValue").val(node.id)
							},
					}

					optionss.addparams = [ {
						name : "code",
						value : "root"
					} ];

					$field1.formUser(optionss);
					
						
		    	/*
		    	 * 设备管理基本信息表单提交
		    	 */
		    		
		    		$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
		    			
		    			submitSuccess: function (form, event)
		    			{
		    				event.preventDefault();
		    			},submitError: function (form, event, errors) {
		    				event.preventDefault();
		    			}
		    			
		    		});
		
		    		
		    	  	$("#basicSave").unbind("click").click(function(){
		    	  		 $('.nav-tabs a:last').tab('show');
			    	});
		    	  	
		    	  	$("#modiSite").unbind("click").click(function(){
		    	  		$("#staffValue").attr("value",$("#formUser").formUser("getValue"));
		    	  	    flag=true;
		   			 if($('#manageIp').val() != null&&$('#manageIp').val() != ""){
		   				    var id=$("#roomDevid").val();
			    	  		var deviceName=$("#deviceName").val();
			    	  		var roomIdValue=$("#roomIdValue").val();
			    	  		var roomName=$("#roomName").val();
			    	  		var productLine=$("#productLine").val();
			    	  		var productLineName=$("#productLineName").val();
			    	  		var partnerIdValue=$("#partnerIdValue").val();
			    	  		var partnerId=$("#partnerId").val();
			    	  		var productModelId=$("#productModelId").val();
			    	  		var productModelName=$("#productModelName").val();
			    	  		var deviceCode=$("#deviceCode").val();
			    	  		var deviceSerial=$("#deviceSerial").val();
			    	  		var deviceDesc=$("#deviceDesc").val();
			    	  		var address=$("#indicatorMark").val();
			    	  		var manageIp=$("#manageIp").val();
			    	  		var dateTimeInstall=$("#dateTimeInstalls").val();
			    	  		var dateTimeProduct=$("#dateTimeProducts").val();
			    	  		var trapOn=$("#trapOn").val();
			    	  		var trapOff=$("#trapOff").val();
			    	  		var staff=$("#staffValue").val();
			    	  		var org=$("#orgValue").val();
			    	  		var param={deviceName:""+deviceName+"",roomId:""+roomIdValue+"",
			    	  		productLine:""+productLine+"",productLineName:""+productLineName+"",partnerIdValue:""+partnerIdValue+"",partnerId:""+partnerId+"",	
			    	  		productModelId:""+productModelId+"",productModelName:""+productModelName+"",deviceCode:""+deviceCode+"",deviceSerial:""+deviceSerial+"",
			    	  		deviceDesc:""+deviceDesc+"",address:""+address+"",manageIp:""+manageIp+"",dateTimeInstall:""+dateTimeInstall+"",
			    	  		dateTimeProduct:""+dateTimeProduct+"",staff:""+staff+"",org:""+org+"",roomName:""+roomName+"",id:""+id+""
			    	  		};
			    	  		$.ajax({
		    					url: ctx+"/powerUPS//modiUPSDevManage",  // 提交的页面
		    					data: param, 
		    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		    					success: function(data) {
		    						// 设置表单提交完成使用方法
		    						if(data=="success"){
		    							$('#alertMsg').empty();
		    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>UPS修改成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
									    $(".alert").delay(2000).hide(0);
					         		    $(".close").click(function(){
					         		    	$(".alert").hide();
					         		    });
		    							$('.edit_list').load(ctx + '/roomDevice/roomDeviceManager?tmp=' + Math.random());
		    							
		    							 
		    						}else{
		    							
		    						}  
		    					}
		    				});
		   			 } else {
		   				 if(flag){
		   					 $.messager.alert('提示','请您填写IP!');
		   					 flag=false;
		   				 }
		   			 }
			    	});
		    	  	
		    	  	$("#reset").unbind("click").click(function(){
			    		$('#edit_list').empty();
			    		$('.edit_list').load(ctx + '/roomDevice/roomDeviceManager?tmp=' + Math.random());
			    	});
		 });

	  }	  
