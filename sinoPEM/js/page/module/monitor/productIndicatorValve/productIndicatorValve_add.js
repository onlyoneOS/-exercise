function load() {
		
		$("#addressId").hide();
		//加载设备类型
		$("#productTypeDiv").formTree({	
			inputName : 'productTypeValue',
			Checkbox : false,
			animate : true,
			searchTree : true,
			tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
			asyncUrl : ctx+"/base/productType/getTree",// 异步
			search_url : ctx+"/base/productType/getTree",// 搜索
			find_url :ctx+"/base/productType/getTree",// 精确定位
			url : '',
			asyncParam : ["id"],
			onSelect:function(node){
				if (node.id=='3') {
					$("#addressId").hide();
				}
				else if (node.id=='1387432711692') {
					$("#addressId").show();
				}
				else {
					$("#addressId").hide();
				}
				$('#productType').val(node.id);
				$('#partnerId').val('');
				getPartnerInfo(node.id);
				// indicatorNameSelect();
			},
			addparams : [{
						name : "productTypeId",
						value : "root"
					}],
			async : true
		});

	/*	//系列
		var productUrl = '';
		if($('#partnerId').val() != ""&&$('#partnerId').val() != null){
			productUrl = ctx+'/base/productline/getTree?partnerBrandId='+$('#partnerId').val();
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
		});*/
		
		//初始化设备型号
		var $formSelectProductModel=$("#formSelectProductModel");
		$formSelectProductModel.addClass("li_form");
		var optionProductModel = {
				inputName : "productModel",
				writeType : 'show',
				showLabel : false,
				width : "282"
			};
		$formSelectProductModel.formSelect(optionProductModel);
		
		//初始化指标地址位
		var $formSelectAddr = $("#formSelectAddr");
		$formSelectAddr.addClass("li_form");
		var optionAddr = {
				url:ctx+'/sysDomain/getAddr',
				writeType : 'show',
				inputValue:'0',
				showLabel : false,
				width : "282",
				onSelect:function(){
					$("#address").val($("#formSelectAddr").formSelect("getValue")[0]);
				}
			};
		$formSelectAddr.formSelect(optionAddr);
		$("#address").val($("#formSelectAddr").formSelect("getValue")[0]);
		
		//初始化UPS标志位
		var $mark = $("#formSelectIndicatorMark");
		$mark.addClass("li_form");
		var optionMark = {
				url:ctx+'/sysDomain/getIndicatorMark',
				writeType : 'show',
				inputValue:'0',
				showLabel : false,
				width : "282",
				onSelect:function(){
					$("#indicatorMark").val($("#formSelectIndicatorMark").formSelect("getValue")[0]);
				}
			};
		$mark.formSelect(optionMark);
		$("#indicatorMark").val($("#formSelectIndicatorMark").formSelect("getValue")[0]);
		
		//初始化采集方式
		var $formSelectGetType = $("#formSelectGetType");
		$formSelectGetType.addClass("li_form");
		var optionCollectionValueType = {
			inputName : "getTypeValue",
			writeType : 'show',
			showLabel : false,
			code : 'collectionType',
			onSelect:function(node){
				var formSelectGetTypeId = $("#formSelectGetType").formSelect("getValue")[0];
				$('#getTypeValue').val(formSelectGetTypeId); 
				
				if(formSelectGetTypeId==0){
					$('#snmpDisplay').show();
				}else{
					//socket;
					$('#snmpDisplay').hide();
					return;
				}
			},
			width : "282"			
		};
		$formSelectGetType.formSelect(optionCollectionValueType);
		
		//加载SNMP返回值
		var $selectSnmpValueType = $("#selectSnmpValueType");
		$selectSnmpValueType.addClass("li_form");
		var optionSnmpValueType = {
			inputName : "SnmpValueTypeValue",
			writeType : 'show',
			showLabel : false,
			code : 'valueType',
			onSelect:function(node){
				var snmpValueTypeId = $("#selectSnmpValueType").formSelect("getValue")[0];
				$('#snmpValueType').val(snmpValueTypeId); 
			},
			width : "282"			
		};
		$selectSnmpValueType.formSelect(optionSnmpValueType);
		
		//加载Telnet返回值
		var $selectTelnetValueType = $("#selectTelnetValueType");
		$selectTelnetValueType.addClass("li_form");
		var optionTelnetValueType = {
			inputName : "TelnetValueTypeValue",
			writeType : 'show',
			showLabel : false,
			code : 'valueType',
			onSelect:function(node){
				var telnetValueTypeId = $("#selectTelnetValueType").formSelect("getValue")[0];
				$('#telnetValueType').val(telnetValueTypeId); 
			},
			width : "282"			
		};
		$selectTelnetValueType.formSelect(optionTelnetValueType);
		
		//初始化性能指标名称
		var $formSelectIndicatorName=$("#formSelectIndicatorName");
		$formSelectIndicatorName.addClass("li_form");
		var optionIndicatorName = {
				inputName : "indicatorCategoryValue",
				writeType : 'show',
				showLabel : false,
				width : "282"
			};
		$formSelectIndicatorName.formSelect(optionIndicatorName);
		 
		//绑定返回按钮
		$("#reset").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx + '/indicatorProduct/indicatorProductManage?tmp=' + Math.random());
    	});
		
		//绑定返回按钮
		$("#resetback").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx + '/indicatorProduct/indicatorProductManage?tmp=' + Math.random());
    	});

		//初始化-------snmp与telnet
		$("#snmpDisplay").hide();
//		$(".telnetDispaly").hide();
		
		
		//隐藏SNMP
		/*$("#getEngineSnmp").unbind("click").click(function(){
    		if($("#getEngineSnmp").attr("checked")=='checked'){
    			$("#snmpDisplay").show();
    		}else{
    			$("#snmpDisplay").hide();
    		}
    	});
		//Telnet方式点击时下面Div的隐藏 与显示
		$("#getEngineTelnet").unbind('click').click(function () {
    		if($("#getEngineTelnet").attr("checked")=='checked'){
    			$(".telnetDispaly").show();
    		}else{
    			$(".telnetDispaly").hide();
    		}
	    });*/
		//验证数据并提交
		 $("#dsave").unbind('click').click(function () {
	    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();
    		         $.ajax({
 		                url: ctx+"/indicatorProduct/saveIndicatorProduct",  // 提交的页面
 		                data: $('#addForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>采集指标配置添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){
 		                	   $('.edit_list').load(ctx + '/indicatorProduct/indicatorProductManage?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>采集指标配置添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>采集指标配置添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                   }
 		                  
 		                }
 		            });
    		   
    		     },
    		     submitError: function (form, event, errors) {
    		         event.preventDefault();
    		         }
    	 	});

	    		 //验证
	    		/* if($('#productModelId').val()==''){
	    			 alert("请选择设备型号");
	    			 return;
	    		 }*/
	    		 
	    		 if($('#productType').val()==''){
	    			 alert("请选择设备类型");
	    			 return;
	    		 }
	    		 	    		 
	    		
	    		 if($('#indicatorId').val()==''){
	    			 alert("请选择指标名称");
	    			 return;
	    		 }
	    		 
	    		 
	    	/*	 if(($("#getEngineTelnet").attr("checked")!='checked') && ($("#getEngineSnmp").attr("checked")!='checked')){
	    			 alert("Telnet,Snmp请至少选择一种获取方式");
	    			 return;
	    		 }*/
	    		 
	    		/* if($("#getEngineSnmp").attr("checked") =='checked'){
	    			 
	    			   var  snmpOid = $("#snmpOid").val();
	    			   var  snmpValueType = $("#snmpValueType").val();
	    			   if(snmpOid == ''){
	    					 alert("Snmp OID 不能为空!");
	    					 return;
	    			    }
	    			   if(snmpValueType == ''){
	    				   alert("Snmp返回值类型不能为空!");
	    				   return;
	    			   }
	    		 }*/
	    		 
	    		 if($('#getTypeValue').val()!=null){
	    			 var  snmpOid = $("#snmpOid").val();
	    			   var  snmpValueType = $("#snmpValueType").val();
	    			   if(snmpOid == ''){
	    					 alert("Snmp OID 不能为空!");
	    					 return;
	    			    }
	    			   if(snmpValueType == ''){
	    				   alert("Snmp返回值类型不能为空!");
	    				   return;
	    			   }
	    		 }else{
	    			 alert("选择采集方式");
					 return;
	    		 }
	    	     $("#addForm").submit();
/*	    		 if($("#getEngineTelnet").attr("checked") =='checked'){
	    			 
	    			   var  telnetGetRule = $("#telnetGetRule").val();
	    			   var  telnetValueType = $("#telnetValueType").val();
	    			   if(telnetGetRule == ''){
	    					 alert("提取规则不能为空!");
	    					 return;
	    			    }
	    			   if(telnetValueType == '')
	    				     alert("telnet返回值类型不能为空!");
	    			   return;
	    		 }*/
	    		 
	    		 
		    	//如果telnet获取方式未选中则清除里面的值
//	    		 if(($("#getEngineTelnet").attr("checked")!='checked')){
//	    			 	$('#telnetCmd').val('');
//	    			 	$('#telnetGetRule').val('');
//	    			 	$('#telnetValueType').val('');
//	    			 	$('#telnetBeginFlag').val('');
//	    			 	$('#telnetEndFlag').val('');
//	    		 }
	    		 //如果SNMP获取方式未选中则清除里面的值
	    		//、 if(($("#getEngineSnmp").attr("checked")!='checked')){c}
	    	
		});

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
				width:"300px",
				onSelect:function(id,value){
					var productLineUrl=ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random();
					//Ajax查出设备系列的默认值选中第一个
					$.ajax({
		                url:productLineUrl,  // 提交的页面
		                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
		                async:false,
		                success: function(data) {
		                	var jsonStr = data;
		                	if(jsonStr!=''&&jsonStr!=null){
		                		$('#productLineName').val(jsonStr[0].text);
		                	}
		                }
		            });
					$('#partnerId').val(id);
					
					getProductModel();
				}
			});
		}

		function getProductModel(){
			$("#formSelectProductModel").empty();
			var $formSelectProductModel=$("#formSelectProductModel");
			var productTypeId = $('#productType').val();
			var partnerId = $('#partnerId').val();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+productTypeId+"&partnerId="+partnerId+"&tmp="+Math.random();
			$formSelectProductModel.addClass("li_form");
			var optionProductModel = {
					inputName : "productModel",
					writeType : 'show',
					showLabel : false,
					url : productModelurl,
					onSelect:function(node){
						var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
						$('#productModelId').val(productModelId);
						
						indicatorNameSelect();
					},
					width : "282"
				};
			$formSelectProductModel.formSelect(optionProductModel);
		}
		
		//性能指标下拉框
		function indicatorNameSelect(){
			$("#formSelectIndicatorName").empty();
			var $formSelectIndicatorName=$("#formSelectIndicatorName");
			$formSelectIndicatorName.addClass("li_form");
			var productTypeId4IndicatorName=$('#productType').val();
			var partnerId = $('#partnerId').val();
			var productModelId = $('#productModelId').val();
			
			var modelId = $()
			
			var indicatorNameUrl=ctx+"/propertyIndicator/findAllPropertyIndicatorList?productTypeId="+productTypeId4IndicatorName+"&partnerId="+partnerId
									+"&productModelId="+productModelId;
			var optionIndicatorName = {
					inputName : "indicatorCategoryValue",
					writeType : 'show',
					showLabel : false,
					url : indicatorNameUrl,
					onSelect:function(node){
												
						var indicatorId = $("#formSelectIndicatorName").formSelect("getValue")[0];
						var indicatorName = $("#formSelectIndicatorName").formSelect("getValue")[1];
						$('#indicatorId').val(indicatorId); 
						$('#indicatorName').val(indicatorName); 
						//canShowValveTable(indicatorId);
					},
					width : "282"
				};
			$formSelectIndicatorName.formSelect(optionIndicatorName);
		}
	}
