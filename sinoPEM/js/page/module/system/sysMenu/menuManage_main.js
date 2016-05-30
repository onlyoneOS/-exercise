
	/**
	 *  页面加载时初始化方法
	 */
    function loadAll(){
            /*
             *  树形表
             */
	        $("#treeMenu").treegrid({
	        	title:"菜单列表",
	        	method:"post",
	        	url:ctx+"/menu/getAll",
	        	rownumbers:true,
	        	idField:"menuId",
	        	treeField:"menuName",
	        	fitColumns:true,
	        	width:$(this).width(),
	        //	height:"500",
	        	onBeforeLoad:function(row,param){
					$("#treeMenu").resizeTreeGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
					var w = $(".datagrid").width();
					$(".panel-header").css('width',w-0);
					$(".datagrid-wrap").css('width',w-0);
				},	
	        	onLoadSuccess:function(row){
					$(window).bind('resize', function () {
						$("#treeMenu").resizeTreeGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
						var w = $(".datagrid").width();
						$(".panel-header").css('width',w-30);
						$(".datagrid-wrap").css('width',w-20);
					});
					 $('a[name="update"]').unbind('click').click(function(){
						//  alert("up in");
						
						      update(this.id);
					  });
					  
					 $('a[name="delMenu"]').unbind('click').click(function(){
						// alert(" del in");
							 del(this.id);
					 });
				},
	        	
	        	columns:[[
	        	  {
	        		 field:"menuName",
	        		 title:"菜单名称",
	        		// width:"120"
	        		   width:$(this).width() * 0.18
	        		// width:"auto"
	        	  },{
	        		  field:"menuUrl",
	        		  title:"URL",
	        		//  width:"220"
	        		  width:$(this).width() * 0.205
	        	  },{
	        		  field:"menuOrder",
	        		  title:"排序号",
	        		 // width:"40"
	        		  width:$(this).width() * 0.04
	        	  },{
	        		  field:"urlParam",
	        		  title:"参数",
	        		 // width:"40"
	        		  width:$(this).width() * 0.05
	        	  },{
					  field:"menuId",
					  title:"操作",
					  width:$(this).width() * 0.070,
					  formatter: function(value, row){
	
						fm="<a name ='update'  href='#myModal1' role='button' data-toggle='modal'  id='"+value+"'>" +
							"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
							"<a name='delMenu' href='#' id='"+value+"'>&nbsp" +
							"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>";
						return fm;
					  }
				  }
	        	 ]]
	        });
	    	
	    	
 		      
   		   $("#example-advanced tbody tr").mousedown(function() {
			//	alert("class select");
				$("tr.selected").removeClass("selected");
				$(this).addClass("selected");
			});  

			$("#example-advanced tr").click(function(){
			//	alert("value select");
				var actionId = $(this).attr("name");
				$('#menuId').val(actionId);
			});
			   
   	  		        	    	  
	    	//  $("#myButton").append("<a href='#myModal1' id='add' role='button' data-toggle='modal' class='btn btn-primary'>新增</a>&nbsp;"+
		     //          "<a href='#myModal2' id='update' role='button' class='btn' data-toggle='modal' >修改</a>&nbsp;"+
		      //         "<a href='#' id='dele' role='button' data-toggle='modal' class='btn'>删除</a>") ; 
	    	
	    	  
		/*  
		 *  初始化触发事件
		 *  		
		 */
          $("#add").unbind('click').click(function(){   
        	    //  alert("in");
	              create();
            });
 
         
          
         
          
          /*
           *  取消树形选中的节点
           */
          $("body").unbind('click').click(function(){
        	  $("#treeMenu").treegrid("unselectAll");
          });
          
        /*
         * 增、删、改按钮背景色事件
         */
      /*    $("a").unbind('mouseover').mouseover(function(tag){
        	   $("#add").removeClass("btn-primary");
        	   $(this).addClass("btn-primary");
        	    
          });
          $("a").unbind('mouseout').mouseout(function(tag){
       	      
               $(this).removeClass("btn-primary");  
       	       $("#ad d").addClass("btn-primary");
       	  
         });*/
         	    	      
    }
	    
	    

	    function openurl1(murl){
			   $('.edit_list').load(ctx+'/'+murl);
		     }
	    
	    
	    
	    
	    
	  /**
	   *  添加菜单
	   */		
   function create() {
			
			$("#dailog").empty();
			var mid = "";
			var row = $("#treeMenu").treegrid("getSelected"); 		
//			console.info(row);
			if(row){
				 if(row.menuType=='1') return;	
				 mid = row.menuId;
//				 alert(mid);
			}							   
			  		  									
	        var str =  "<div id='myModal1'  class='modal hide fade'  tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>";
			   
	        var addMenuPageUrl = ctx +"/menu/addMenuPage?menuId="+mid;
		    $("#dailog").append(str);
			//$("#myModal1").modal('show');
			
		    $("#myModal1").load(addMenuPageUrl,function(){
		    	
		    	 var saveObject = $("#myModal1").contents().find("#btnConfirm");
				 var formObject = $("#myModal1").contents().find("#fm");

				 saveObject.unbind('click').click(function(){
					 	 				 
					 var addMenuUrl = ctx+"/menu/addMenu";
					 formObject.ajaxSubmit({
						  url:addMenuUrl,
						  type:"post",
						  success : function(re){				  
										
					//		$("#myModal1").modal('hide');
							
							var mUrl = ctx+"/menu/manageMenu" ;							
							$('#edit_list').empty();
							$('#edit_list').load(mUrl);	

						  }
					 					 
					 });
				 
				 });
				
		    });
             		        
	 }
	
	
	
   /**
    *  修改菜单
    */
	function update(mid) {
				
			$("#dailog").empty();		
	        var str = '<div id="myModal1" backdrop="false" class="modal hide fade" data-dismiss="modal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"  aria-hidden="true"></div>';
	       
			$("#dailog").append(str);
			$('#myModal1').modal('show');
			var updateMenuPageUrl = ctx +"/menu/updateMenuPage?menuId="+mid;
			$("#myModal1").load(updateMenuPageUrl,function(){
		    	 var saveObject = $("#myModal1").contents().find("#btnConfirm");
				 var formObject = $("#myModal1").contents().find("#fm");
				
				 saveObject.unbind('click').click(function(){
				
					 var updateMenuUrl = ctx+"/menu/modi?menuId="+mid;
					 formObject.ajaxSubmit({
						  url:updateMenuUrl,
						  type:"post",
						  success : function(re){					  
							var mUrl = ctx+"/menu/manageMenu" ;							
							$("#myModal1").modal('hide');
							$('#edit_list').empty();
							$('#edit_list').load(mUrl);						
							
						  }
					 					 
					 });
				 
				 });
				
		    });

			
						
  }
	    

	/**
	 *  删除菜单
	 */
	function del(mid){
                /*
                    var row = $("#treeMenu").treegrid("getSelected");                    
		     		if(!row){
		     			$('#alertMsg').empty();
		     			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>请选择一个菜单！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		     		    $(".alert").delay(2000).hide(0);
		     		    $(".close").click(function(){
		     		    	$(".alert").hide();
		     		    });
		         		return;
		     		}
		     		*/
		     		 // confirm("确定删除吗？");
		     		  if(!confirm("确定删除吗？")){
		     			  return;
		     		  }
		     		  
		     		  var  menuId = mid;
		     		  $.ajax({
			                url: ctx+"/menu/del?menuId="+menuId,  // 提交的页面
			                data: "", // 从表单中获取数据
			                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			                beforeSend: function()          // 设置表单提交前方法
			                {
			                  //  new screenClass().lock();
			                },
			                error: function(request) {      // 设置表单提交出错
			                	 $('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>菜单删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                },
			                success: function(data) {
			                // 设置表单提交完成使用方法
			                   if(data=="success"){
			                	   // alert("suc inn");
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>菜单删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
				         		   changeData();

			                   }else{
			                	   $('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>菜单添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                   }
			                }
			            });
		     }
		
		  /*
	       *  刷新数据
	       */
	      function changeData(){
	    	//  alert("ss");
	    	  $.post(ctx+"/menu/getAll", function(data){
				  $("#treeMenu").treegrid("loadData", data); 
				   
			   }, "json");
	    	  
	      }

