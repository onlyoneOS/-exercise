

	function load(){
	    	var url = ctx+"/configIndicator/findAllConfIndicator";
	    	var $field = $("#taskTable");
			var options = {
				url : url,
				modiUrl : ctx+"/configIndicator/modiConfigIndicator",
				delUrl : ctx+"/configIndicator/delConfIndicator",
				domainCode : ["indicatorDataType","indicatorUnit"],
				enableCRUD : true,
				sSearchDef:"请输入指标名称",
				enableDomain : [false,false,false,false,true,true,false],
				mDataEX : ["id","indicatorName","productTypeName","indicatorCategoryName","indicatorDataType","indicatorUnit","indicatorDesc"] //,"productLineName","productModelName"
			};
			$field.dataTableEX(options);
			
			$('#creatConfConfnorm').unbind('click').click(function () {
				var frameSrc = ctx+"/configIndicator/addConfigIndicator"; 
				$('.edit_list').load(frameSrc);
			});
	 };
					          
