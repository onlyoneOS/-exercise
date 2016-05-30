define(function(require, exports, module) {
	var $ = require("jquery");
	var dataTable = require("dataTables");
	require("jquery.pop");
	exports.init = function(){
		manage();
	};

	
	function manage(){
		$("#save").unbind("click").click(function() {
			//var id = $("#titleId").val();
			//save(id);
			save();
		});
		$("#add").unbind("click").click(function() {
			add();
		});
		//返回
		$("#returns").unbind("click").click(function(){
			
			 $('#edit_list').empty();
		     $('#edit_list').load(ctx + '/room/manageIndexPage?tmp=' + Math.random());
			
		});
		//ajax提交form，上传文件
		 $("#upButton").unbind("click").click(function(){
			 $.ajaxSetup ({ 
				 cache: false 
			 });
			 
            $("#submit_form").ajaxSubmit({
           	 async : false,
           	 success:function (msg) { 
           		 if(msg!=null){
           			
           			 $('#imageURL').val(msg);
               		   alert("图片上传成功！");
           		}else{
           			alert("图片上传失败！");
                  }
           	 }
            });  
        });
		 
		 $("#cancelButton").unbind("click").click(function(){ 
			 $.ajax({
				 url: ctx+"/room/deleIndexPage",   
				 async : false,
				 type: "POST",                   
				 error: function(request) { 
					 
				 },
			 });
		 });
	
		var url = ctx+"/sysRoomMatching/getRoomMatchingInfo";
		table = $("#taskTable").dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":false,
			"bDestroy": true,
			"bSort": false,
			"bPaginate" : false,
			"bInfo" : false,
			"bFilter":false,
			"sAjaxSource":url, 
			"bRetrieve": true,
			 "bSort" : true,
			"sServerMethod": "POST",
			"aoColumns": [
			              {"sWidth": "100px","mData": "id",  "mRender": function(data,row,obj){
				          	  var ids = obj.id+","+obj.imageURL;
				          	var isCheck = "";
				          	  if(obj.state==1)
				          	  {
				          		isCheck = '<input type="radio" checked="checked" class="btn" style="width:30px;" name="updates" id="'+ids+'"></input>&nbsp;'
				          	  }
				          	  	if(obj.state==0)
				          	  	{
				          	  	isCheck = '<input type="radio" class="btn" style="width:30px;" name="updates" id="'+ids+'"></input>&nbsp;'
				          	  	}
				          	   return  isCheck;			            	   				            	  
				            }},
			              { "mData": "roomName"},
			              { "mData": "imageURL"}],
					"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
					"sPaginationType": "bootstrap",
					"oLanguage": {
						"sLengthMenu": "页显示_MENU_ 个数",
						"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
						"sSearch":"检索:",
						"sEmptyTable":"没有数据",
						"sInfoEmpty": "显示0条数据",
						"oPaginate":{
							"sPrevious": "",
							"sNext":"" 
						}
					},
					fnDrawCallback:function(){
		            	  $(".partnersel").empty();
		            	  $("a[name='edit']").unbind("click").bind("click",edit);
		            	  $("a[name='del']").unbind("click").bind("click",del);
		            	  $("input[type='radio']").unbind("click").bind("click",updates);
		            	  $("#taskTable tbody tr").each(function(){
		            		  
		            	  });
		              }
		
		});
		
	}
	
	function updates(){
		var ids = $(this).attr("id");
		var id=ids.substring(0,ids.lastIndexOf(","));
		var im=ids.substring(ids.lastIndexOf(",")+1,ids.length);
		if(ids.indexOf(".")==-1){
			alert("请先上传图片")
		}else{
			var d=1;
		    var url = ctx+"/sysRoomMatching/enable?id="+id+"&state="+d;
		    $.ajax({
		    	type : "GET",
		    	async : false,
		    	dataType : "text",
		    	url : url,
		    	success : function(msg) {
		    		if(msg){
		    			if(msg="success"){
		    				var url = ctx + '/room/manageIndexPage?tmp=' + Math.random()+'&id='+id;
		    				$("#edit_list").empty();
		    				$(".edit_list").load(url,function(){
		    					
		    				});
		    			}else if(msg="failure"){
		    				alert("启用失败，请重新操作！");
		    				var url= ctx+"/sysRoomMatching/manage";
		    				$("#edit_list").empty();
		    				$(".edit_list").load(url,function(){
		    					
		    				});
		    			}
		    		}
		    	}
		    });
		}
	
	}
	
	function add(){
		
		$("#dailogs").on("show", function (){
			
			$("#dtitle").html("添加");
			
			$("#dsave").unbind("click");
			$("#dsave").click(function (){
				$("#dailogs").modal("hide");
			});
		});
		$("#dailogs").on("hidden", function (){$("#dailogs").unbind("show");});
		$("#dailogs").modal({show:true});
		$("#dailogs").off("show");
	}
	
	function edit(){
		var id = $(this).attr("id");
		$("#dailogs").on("show", function (){
			$("#dtitle").html("编辑");
			$.ajax({
				type : "GET",
				async : false,
				dataType : "json",
				url : ctx+"/sysRoomMatching/getTitleInfo?id="+id,
				success : function(title) {
					$("#titleId").val(title.id);
					$("#roomName").val(title.roomName);
					$("#imageURL").val(title.imageURL);
					var yourVal = title.state;
					$("input[name='state']").each(function(index) {
						if ($("input[name='state']").get(index).value == yourVal) {
							$("input[name='state']").get(index).checked = true;
						}
					});
				}
			});
			$("#dsave").unbind("click");
			$("#dsave").click(function (){
				$("#dailogs").modal("hide");
			});
		});
		$("#dailogs").on("hidden", function (){$("#dailogs").unbind("show");});
		$("#dailogs").modal({show:true});
		$("#dailogs").off("show");
	}
	
	function save(){
		var titleId = $("#titleId").val();
		var roomName = $("#roomName").val();
		//var imageURL = $("#imageURL").val();
		var imageURL = $('#imageURL').val();
		var state = $("input[name='state']:checked").val();
		var rom = encodeURI(encodeURI(roomName));
		var url = ctx+"/sysRoomMatching/saveOrUpdateTitle?titleId="+titleId+"&roomName="+rom+"&imageURL="+imageURL+"&state="+state;
		$.ajax({
			url: url,
			data: "",				// 从表单中获取数据
			type: "POST",		// 设置请求类型为"POST"，默认为"GET"
			beforeSend: function(){		// 设置表单提交前方法
				
            },error: function(request){	// 设置表单提交出错
            	alert("保存失败");
            	$(".edit_list").load(ctx + "/sysRoomMatching/manage");
            },success: function(data) {
            	alert("保存成功");
            	$(".edit_list").load(ctx + "/sysRoomMatching/manage");
            }
		});
		 $("#save").unbind("click").click(function(){ 
				var x="";
				var y="";
				var roomId="";
				$(".divimg").each(function(){
						x=x+$(this).css("left").split("px")[0]+",";
						y=y+$(this).css("top").split("px")[0]+",";
						roomId=roomId+$(this).attr("id")+",";
				  });
				x=x.substring(0, x.length-1);
				y=y.substring(0, y.length-1);
				roomId=roomId.substring(0, roomId.length-1);
				var objs={roomId:roomId,pointX:x,pointY:y};
				$.ajax({
	                url: ctx+"/room/saveIndexPage",   
	                data: objs, 
	                type: "POST",                   
	                error: function(request) {       
	                },
	                success: function(data) {
	                // 设置表单提交完成使用方法
	                   if(data=="success"){
	                	   alert("保存成功！");
	                	   $('.edit_list').load(ctx + '/room/manageIndexPage?tmp=' + Math.random());
	                   }else{
	                	   alert("保存失败！");
	                   }
	                }	
				});
			});
	}
	
	
	function del(){
		var id = $(this).attr("id");
		if(confirm("确定要删除吗？")){
		    var url = ctx+"/sysRoomMatching/delInfo?id="+id;
		    $.ajax({
		    	type : "GET",
		    	async : false,
		    	dataType : "text",
		    	url : url,
		    	success : function(msg) {
		    		if(msg){
		    			if(msg="success"){
		    				var url= ctx+"/sysRoomMatching/manage";
		    				$("#edit_list").empty();
		    				$(".edit_list").load(url,function(){
		    					
		    				});
		    			}else if(msg="failure"){
		    				alert("删除失败，请重新操作！");
		    				var url= ctx+"/sysRoomMatching/manage";
		    				$("#edit_list").empty();
		    				$(".edit_list").load(url,function(){
		    					
		    				});
		    			}
		    		}
		    	}
		    });
		}
	}

});