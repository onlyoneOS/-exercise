
	function loadAll(){
		
		 $("#_sino_partner_product_back").bind('click',function(){
			 openurl();
        });
	  }	;
	  
	function openurl(){
		//$('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
		$('.edit_list').empty();
		$('.edit_list').load(ctx + '/powerUPS/powerUPSManager?tmp=' + Math.random());
	}
