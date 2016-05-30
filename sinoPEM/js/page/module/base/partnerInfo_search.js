    var scrWidth = screen.width;
    
	   
	function loadSearch(){
//		$('input:radio[name="type"]').bind('click',function(){
//			typeCheck(this);
//       });
		$('#_sino_device_search').bind('click',function(){
			search();
       });
		
	}
	function typeCheck(obj){
//		var param = {};
//		var val=$('input:radio[name="type"]:checked').val();
//		if(val == 3000){
//			$("#_sino_device_serviceType").show();
//			var val = $('#serviceType').combobox('getValue');
//			var partnerType = $('input:radio[name="type"]:checked').val();
//			param.partnerType = "%"+partnerType+"%";
//			param.servicePartnerType = val;
//			$("#_sino_partner_datagrid").datagrid('reload', param);
//			
//		} else {
//			param.partnerType = "%"+val+"%";
//			$("#_sino_partner_datagrid").datagrid('reload', param);
//			$("#_sino_device_serviceType").hide();
//		}
	}
	function search(){
		var param = {};
//		var val = $('#serviceType').combobox('getValue');
//		var partnerType = $('input:radio[name="type"]:checked').val();
		var partnerName = $("#_sino_partner").val();
//		servicePartnerType = val;
//		partnerType = "%"+partnerType+"%";
		partnerName = "%"+partnerName+"%";
//		$("#_sino_partner_datagrid").datagrid('reload', {partnerType:partnerType,partnerName:partnerName,servicePartnerType:servicePartnerType});
		$("#_sino_partner_datagrid").datagrid('reload', {partnerName:partnerName});
	}
	

	
	function _edit(id){
		$('.edit_list').load(ctx+'/confPartner/edit?id='+id+'&tmp='+Math.random());
	}

		loadSearch();





	
