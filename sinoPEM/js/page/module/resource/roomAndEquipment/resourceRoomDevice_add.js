function loadAll(){
	 $("#addrId").hide();
		var flag=true; 
		 var b = true;
		 var bt = true;
		//datatime日期组件
	 $(function() {
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
			folderChoose:false,
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
			

			//加载设备类型
			$("#productTypeDiv").formTree({	
				inputName : 'productTypeValue',
				inputValue : $('#productTypeName').val(),
				Checkbox : false,
				animate : true,
				searchTree : true,
				required : true,
				tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
				asyncUrl : ctx+"/base/productType/getTree",// 异步
				search_url : ctx+"/base/productType/getTree",// 搜索
				find_url :ctx+"/base/productType/getTree",// 精确定位
				url : '',
				asyncParam : ["id"],
				onSelect:function(node){
					
					if (node.id==3) {
						$("#addrId").hide();
					}
					else if (node.id==1387432711692) {
						$("#addrId").show();
					}
					else {
						$("#addrId").hide();
					}
					getPartnerInfo(node.id);
					getProductModel();
					$('#productType').val(node.id);
					$("#productTypeIdValue").val(node.text)
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
				url:ctx+"/base/partnerInfo/getAll?productTypeId="+$('#productType').val(),	 //型号分组数据
				checkbox:false,
				branchtype:true,
				search:false,
				required : true,
				width:"300px",
				onSelect:function(id,value){
					$('#partnerId').val(id);
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
	 					$('#partnerId').val(id);
	 					$("#partnerIdValue").val(value)
	 					getProductModel();
	 				}
	 			});
	 		}
			//地址位初始化
			var $formSelectAddr = $("#formSelectAddr");
			$formSelectAddr.addClass("li_form");
			var optionAddr = {
					url:ctx+'/sysDomain/getAddr',
					writeType : 'show',
					inputValue:'1',
					showLabel : false,
					width : "282",
					onSelect:function(){
						$("#address").val($("#formSelectAddr").formSelect("getValue")[0]);
					}
				};
			$formSelectAddr.formSelect(optionAddr);
			$("#address").val($("#formSelectAddr").formSelect("getValue")[0]);
			var $mark = $("#formSelectMark");
			$mark.addClass("li_form");
			var optionMark = {
					url:ctx+'/sysDomain/getIndicatorMark',
					writeType : 'show',
					inputValue:'0',
					showLabel : false,
					width : "282",
					onSelect:function(){
						$("#indicatorMark").val($("#formSelectMark").formSelect("getValue")[0]);
					}
				};
			$mark.formSelect(optionMark);
			$("#indicatorMark").val($("#formSelectMark").formSelect("getValue")[0]);
			//初始化设备型号
			var $formSelectProductModel=$("#formSelectProductModel");
			$formSelectProductModel.addClass("li_form");
			var productTypeId = $('#productType').val();
			var partnerId = $('#partnerId').val();
			var brandId = $('#brandId').val();
			var productLineId ="";
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
					radioStructure : true,
					name : "code",
					value : "root",
					width : 280
				}

				optionss.addparams = [ {
					name : "code",
					value : "root"
				} ];

				$field1.formUser(optionss);
				$("#saveRoomDevice").unbind("click").click(function(){
					  $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
				  			submitSuccess: function (form, event)
				  			{
				  				event.preventDefault();
				  			
				  				$("#staffValue").attr("value",$("#formUser").formUser("getValue"));
				    	  		$("#roomIdValue").attr("value",$("#roomId").formTree("getValue"));
				    	  		 $.ajax({
				    					url: ctx+"/roomDevice/addRoomDevManage",  // 提交的页面
				    					data:$('#addDevForm').serialize(), 
				    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
				    				  beforeSend: function()          // 设置表单提交前方法
				  		                {
				    					 
				  		                },
				    					success: function(data) {
				    						// 设置表单提交完成使用方法
				    						if(data=="success"){
				    							$('#alertMsg').empty();
				    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>设备添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				    						    $(".alert").delay(2000).hide(0);
				    		         		    $(".close").click(function(){
				    		         		    	$(".alert").hide();
				    		         		    });
				    							$('.edit_list').load(ctx + '/roomDevice/roomDeviceManager?tmp=' + Math.random());
				    						}else{
				    							$('#alertMsg').empty();
				    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>设备添加失败!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				    						    $(".alert").delay(2000).hide(0);
				    		         		    $(".close").click(function(){
				    		         		    	$(".alert").hide();
				    		         		    });
				    							$('.edit_list').load(ctx + '/roomDevice/roomDeviceManager?tmp=' + Math.random());
				    						}  
				    					}
				    				});
				  			},submitError: function (form, event, errors) {
				  				event.preventDefault();
				  			}
				  		 });
					  $('#addDevForm').submit();
				  });
				$("#goback").unbind("click").click(function(){
		    		$('#edit_list').empty();
		    		$('.edit_list').load(ctx+"/roomDevice/roomDeviceManager?tmp="+ Math.random());
		    	});
  }	  
