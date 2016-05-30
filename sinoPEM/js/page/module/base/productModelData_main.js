define(function(require, exports, module) {
	var $ = require("jquery");
	require("bootstrap");
	require("jqBootstrapValidation");

	exports.init = function() {
		load();
	};

	function load() {
		//alert($('#_sino_productModel_strInt').val());
		//加载数据类型
		var $fieldDataTypes = $("#formSelectDataType");
		$fieldDataTypes.addClass("li_form");
		var optionDataTypes = {
			inputName : "indicatorDataType",
			writeType : 'show',
			showLabel : false,
			url : ctx+'/base/productModelData/getDataType?tmp='+Math.random(),
			width : "282",
			onSelect :function(){
			var id = $("#formSelectDataType").formSelect("getValue")[0];
				if(id == 9){
					$('#_typeCode').show();
				} else {
					$('#_typeCode').hide();
				}
			}
		};
		$fieldDataTypes.formSelect(optionDataTypes);
		
		//加载数据类型code
		var $typeCode = $("#typeCode");
		$typeCode.addClass("li_form");
		var typeCodes = {
			inputName : "typeCode",
			writeType : 'show',
			showLabel : false,
			width : "282",
			url : ctx+"/base/productModelData/getSysDomainType?tmp="+Math.random()
		};
		$typeCode.formSelect(typeCodes);
		
		
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
		//加载组件类型
//		var $fieldCompDevType = $("#formSelectCompDevType");
//		$fieldCompDevType.addClass("li_form");
//		var optionCompDevTypes = {
//			inputName : "compDevType",
//			writeType : 'show',
//			showLabel : false,
//			code : 'compDevType',
//			width : "282"			
//			//checkbox : true
//		};
//		$fieldCompDevType.formSelect(optionCompDevTypes);
		
		//加载指标分类
		var $formSelectIndicatorCategory=$("#formSelectIndicatorCategory");
		$formSelectIndicatorCategory.addClass("li_form");
		var indicatorCategoryUrl=ctx+"/configIndicator/findIndicatorCategroy";
		var optionIndicatorCategory = {
				inputName : "indicatorCategory",
				writeType : 'show',
				showLabel : false,
				url : indicatorCategoryUrl,
				width : "282"
			};
		$formSelectIndicatorCategory.formSelect(optionIndicatorCategory);
		
	}

});