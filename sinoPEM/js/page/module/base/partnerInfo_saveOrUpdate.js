
	function loadAll(){
			var type = $('#_model_partnerType').val();
			$("#_sino_product_type").formTree({
				
				inputName : '_sino_product_type_name',
				inputValue : $('#_sino_productType_names').val(),
				//labelName : 'formTree',
				Checkbox : true,
				// onlyLeafCheck : true,
				animate : true,
				searchTree : true,
			
				tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
				asyncUrl : ctx+"/base/productType/getTree",// 异步
				search_url : ctx+"/base/productType/getTree",// 搜索
				find_url :ctx+"/base/productType/getTree",// 精确定位
				url : '',
				asyncParam : ["id"],
				addparams : [{
							name : "productTypeId",
							value : "root"
						}],
				async : true
			});
			
		}
		$("#cancle1").bind('click',function(){
			$('.edit_list').empty();
			$('.edit_list').load(ctx+'/base/partnerInfo/partnerInfo_main?tmp='+Math.random());
       });
		$("#cancle").bind('click',function(){
			$('.edit_list').empty();
			$('.edit_list').load(ctx+'/base/partnerInfo/partnerInfo_main?tmp='+Math.random());
       });
		$("#_sino_partner_add_partner").bind('click',function(){
			addPartner();
       });
	
	
	var editIndex = undefined;
	
	function addPartner(){
		var url = ctx+'/base/partnerInfo/saveOrUpdate?tmp='+Math.random();
		$("#_sino_partner_add_form").form('submit',{
	    	url:url,
	    	onSubmit:function(){
	    		if($('#_partner_id').val() != null&&$('#_partner_id').val() != ""){
					var newTypeId = $("#_sino_product_type").formTree('getValue');
					if(newTypeId !=""){
						var oldTypeId = $("#_sino_productType").val();
						var ids = "";
						var newTypeIds = newTypeId.split(",");
						var oldTypeIds = oldTypeId.split(",");
						for(var i = 0;i < newTypeIds.length;i++){
							var b = isNew(newTypeIds[i],oldTypeId);
							if(b){
								ids+=newTypeIds[i]+"_true,";
							}
						}
						
						for(var i = 0;i < oldTypeIds.length;i++){
							var b = isOld(oldTypeIds[i],newTypeId);
							if(b){
								ids+=oldTypeIds[i]+"_false,";
							}
						}
						
						$("#_sino_productType").val(ids);
		    		} else {
		    			var typeIds = $("#_sino_product_type").formTree('getValue');
						$("#_sino_productType").val(typeIds);
		    		}
	    		} else {
	    			var typeIds = $("#_sino_product_type").formTree('getValue');
					$("#_sino_productType").val(typeIds);
	    		}
				var options = {};
				options.formId = "_sino_partner_add_form";
				return $.formSubmit.doHandler(options);
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data != "fail"){
                	   $('.edit_list').load(ctx+'/base/partnerInfo/partnerInfo_main?tmp='+Math.random());
                    }
                }
	    });
	}
	
	function isNew(id,obj){
		var b = true;
		var oldIds = obj.split(",");
		for(var i = 0;i< oldIds.length;i++){
			if(id == oldIds[i]){
				b = false;
			}
		}
		return b;
	} 
	
	function isOld(id,obj){
		var b = true;
		var oldIds = obj.split(",");
		for(var i = 0;i< oldIds.length;i++){
			if(id == oldIds[i]){
				b = false;
			}
		}
		return b;
	}
	







	
