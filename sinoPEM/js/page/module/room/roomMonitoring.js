
	function showMenu(){
		$(document).ready(function(){
		    $(".menu2_title_sub").click(function () {  // $("li")选择范围根据情况自己改一下
		    	$(".menu2_title_sub").removeClass('active');
			   $(this).addClass('active');
			   var options = {};
				options.murl = $(this).children().first().attr("name");
				options.keyName = 'roomId';
				options.keyValue = $("#_sino_roomId").val();
				// console.info(options.murl);
				// $.openurl(options);
				var url = ctx+"/"+options.murl+"?roomId="+options.keyValue;
				$('#edit_list').empty();
				$('#edit_list').load(url,function(){
				});
			  }); 
		    
			$(".menu2_title_sub").first().children().first().click();
		});
		
	     
	     setTimeout(function () {
	    	 //alert(0);
	    	  $('.bs-docs-sidenav').affix(); 
	    	 //alert(1);
	    	 }, 200);
	    
		
	}
	
	

