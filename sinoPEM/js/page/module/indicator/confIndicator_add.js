
		load();

	function load() {
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
				$('#productType').val(node.id);
				$('#partnerId').val('');
				$('#productLine').val('');
				$('#productLineName').val('');
				getPartnerInfo(node.id);
				getProductLine('');
			},
			addparams : [{
						name : "productTypeId",
						value : "root"
					}],
			async : true
		});

		//系列
		var productUrl = '';
			if($('#partnerId').val() != ""&&$('#partnerId').val() != null){
				productUrl = ctx+'/base/productline/getTree?partnerId='+$('#partnerId').val();
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
		
		//加载数据类型
		var $fieldDataTypes = $("#formSelectDataType");
		$fieldDataTypes.addClass("li_form");
		var optionDataTypes = {
			inputName : "indicatorDataTypeValue",
			writeType : 'show',
			showLabel : false,
			code : 'indicatorDataType',
			onSelect:function(){
				var indicatorDataTypeId = $("#formSelectDataType").formSelect("getValue")[0];
				if(indicatorDataTypeId == 4){
					$('#_typeCode').show();
				} else {
					$('#_typeCode').hide();
				}
				$('#indicatorDataType').val(indicatorDataTypeId); 
			},
			width : "282"
		};
		$fieldDataTypes.formSelect(optionDataTypes);
		
		//加载数据类型code
		var $typeCode = $("#typeCode");
		$typeCode.addClass("li_form");
		var typeCodes = {
			inputName : "typeCode",
			writeType : 'show',
			showLabel : false,
			onSelect:function(){
				var domainCode = $("#typeCode").formSelect("getValue")[0];
				$('#domainCode').val(domainCode); 
			},
			width : "282",
			url : ctx+"/base/productModelData/getSysDomainType?tmp="+Math.random()
		};
		$typeCode.formSelect(typeCodes);
		
		//加载指标分类
		var $formSelectIndicatorCategory=$("#formSelectIndicatorCategory");
		$formSelectIndicatorCategory.addClass("li_form");
		var indicatorCategoryUrl=ctx+"/configIndicator/findIndicatorCategroy";
		var optionIndicatorCategory = {
				inputName : "indicatorCategoryValue",
				writeType : 'show',
				showLabel : false,
				url : indicatorCategoryUrl,
				onSelect:function(node){
					var IndicatorCategoryId = $("#formSelectIndicatorCategory").formSelect("getValue")[0];
					var IndicatorCategoryName =$("#formSelectIndicatorCategory").formSelect("getValue")[1];
					$('#indicatorCategory').val(IndicatorCategoryId); 
					$('#indicatorCategoryName').val(IndicatorCategoryName);
				},
				width : "282"
			};
		$formSelectIndicatorCategory.formSelect(optionIndicatorCategory);
		
		//加载指标单位
		var $selectIndicatorUnite = $("#selectIndicatorUnite");
		$selectIndicatorUnite.addClass("li_form");
		var optionIndicatorUnite = {
			inputName : "indicatorUniteValue",
			writeType : 'show',
			showLabel : false,
			code : 'indicatorUnit',
			onSelect:function(node){
				var indicatorUniteId = $("#selectIndicatorUnite").formSelect("getValue")[0];
				$('#indicatorUnit').val(indicatorUniteId); 
			},
			width : "282"			
		};
		$selectIndicatorUnite.formSelect(optionIndicatorUnite);
		
		//绑定分类管理按钮
		$("#indicatorCategoryManage").unbind('click').click(function(){
			var categoryUrl = ctx+"/configIndicator/indicatorCategroyManage?urltype=menu&indicatorType=conf&tmp=" + Math.random();
			$('.edit_list').load(categoryUrl);
		});
		
		//绑定返回按钮
		$("#reset").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx + '/configIndicator/configIndicatorManage?tmp=' + Math.random());
    	});
		
		//验证数据并提交
		$(function() {
	    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();//indicatorDataType
    		         $.ajax({
 		                url: ctx+"/configIndicator/saveConfigIndicator",  // 提交的页面
	 		                data: $('#addForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>配置指标添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){
 		                	   $('.edit_list').load(ctx + '/configIndicator/configIndicatorManage?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>配置指标添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>配置指标添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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

	    	 $("#dsave").unbind('click').click(function () {
	    		//验证
	    		 if($('#indicatorDataType').val()==''){
	    			 alert("请选择数据类型");
	    			 return;
	    		 }
	    		 if($('#indicatorUnit').val()==''){
	    			 alert("请选择指标单位");
	    			 return;
	    		 }
	    		 if($('#indicatorCategory').val()==''){
	    			 alert("请选择指标分类");
	    			 return;
	    		 }
	    		 if($('#productType').val()==''){
	    			 alert("请选择设备类型");
	    			 return;
	    		 }
	    	       $("#addForm").submit();
	    	    });
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
		                	$('#productLineName').val(jsonStr[0].text);
		                	$('#productLine').val(jsonStr[0].id);
		                }
		            });
					$('#partnerId').val(id);
					getProductLine(productLineUrl);
				}
			});
		}
		function getProductLine(url){
			var beforProductLineName=$('#productLineName').val();
			$("#_sino_product_line").empty();
			$("#_sino_product_line").formTree({	
				inputName : 'productLine',
				inputValue :beforProductLineName,
				Checkbox : false,
				animate : true,
				searchTree : true,
				width:"282px", //宽度
				tree_url : url,// 顶层
				search_url : url,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					$('#productLine').val(node.id);
					getProductModel();
				},
				async : true
			});	
			//如果系列有默认值，那么要加载设备型号下拉框
			if(beforProductLineName!=''){
				getProductModel();
			}
		}
		function getProductModel(){
			$("#formSelectProductModel").empty();
			var $formSelectProductModel=$("#formSelectProductModel");
			var productTypeId = $('#productType').val();
			var partnerId = $('#partnerId').val();
			var productLineId = $('#productLine').val();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+productTypeId+"&partnerId="+partnerId+"&productLineId="+productLineId;
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
	}
