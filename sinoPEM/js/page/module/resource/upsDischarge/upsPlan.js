 var  ids = new Array();
 var year;
 var month;
function loadAll(){
		 year=$("#time").val();
		 month=$('input:radio[name="monthSelect"]:checked').val();
		loadPlan(year,month);
		var paramId = '';
			$("#excel").unbind('click').click(function () {
				excel();
				 $("#taskTable").dataTable().fnDraw(false);
			});
			$("#selAll").unbind("click").click(function(){
				  var isChecked = $("#selAll").attr("checked");
				  if(isChecked == "checked"){
					  $('input[name="more"]').each(function(){
						    var data = $(this);
						    data.attr("checked", "checked"); 
					   });	  
				  }else{
					  $('input[name="more"]').each(function(){
						    var data = $(this);
						    data.attr("checked", null);
					   });
				  }
			});
			$('input:radio[name="monthSelect"]').change(
					function() {
						 year=$("#time").val();
						 month=$('input:radio[name="monthSelect"]:checked').val();
						$(".edit_list").load(ctx+"/upsDischargePlan/upsPlan?year="+year+"&month="+month);
					});
			$('a[name="confirmPlan"]').unbind("click").click(function(){
		 		   var  datas =  $('input[name="more"]').each(function(){
		 			    var data = $(this);
		 			    if(data.attr("checked")=="checked"){
		 			    	var id = data.val().split(",");			    				    	
		 			    	ids.push(id[0]);
		 			    }  
		 		   });
		 		   if(ids.length==0) return;
		 		  $.ajax({
		            	 url:"/sinoPEM/upsDischargePlan/confirmPlan?planId="+ids,  // 提交的页面
			                data: "", // 从表单中获取数据
			                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			                beforeSend: function()          // 设置表单提交前方法
			                {
			                  //  new screenClass().lock();
			                },		                		           		 
			              
			               success: function(data) {
			            	   if(data=="success"){
			            		   $('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>操作成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();  
				         		    	
				         		    });
			            	   }
			            	   $("#taskTable").dataTable().fnDraw(false);
			                 }
		              });
			})
			
			 $('.date').datetimepicker({
				 viewMode:2,
		    	minViewMode:2,
				 pickTime: false
			    });
			
}

function loadPlan(year,month){
	var url = ctx+"/upsDischargePlan/getAll?year="+year+"&month="+month;
	var $field = $("#taskTable");
	var options = {
		url : url,
		enableCRUD : false,
		bFilter:true,
		dtCallBack:function(){
	 		 $("a[name='delPlan']").unbind('click').bind('click',delPlan);
			},
	    mData : [
                {"mData": "id",  "mRender": function(data,Obj){
                	  var ids = data;
                	  var isCheck = "";
                	   if(ids.length>2){
                		   isCheck = "<input name='more' type='checkbox'  value='"+ids+"' id='"+ids+"'/>";
                	   }else{
                		   isCheck = "<input name='more' type='checkbox' value='"+ids+"' id='"+ids+"'/>"; 
                	   }				            	   
                	   return  isCheck;			            	   				            	  
                }},
              { "mData": "dischargePlanName" },
              { "mData": "planTime" ,"mRender":function(data){
            	  var st=data;
             	  st=format(st);
             	  return st;
              }},
              { "mData": "planState","mRender": function(data){
            	  var state="";
            	  if(data==1){
            		  state="未审核";
            	  }else if(data==2){
            		  state="已审核";
            	  }else{
            		  state="已放电";
            	  }
            	  return state;
              }},
              { "mData": "createTime","mRender":function(data){
            	  var st=data;
             	  st=format(st);
             	  return st;
              }},
              { "mData": "id","mRender": function (data) {
            	  var rstatus='';
            	  var id = data;
            	  rstatus=	"<a name='delPlan' href='#' id='"+id+"'>&nbsp" +
          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
          		  return rstatus;
          		  
              } }
          ]
	}
	$field.dataTableEX(options);
}
	
  
	
    

	function delPlan(){
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sinoPEM/upsDischargePlan/delPlan?planId="+$(this).attr("id"),  // 提交的页面
		                data: "", // 从表单中获取数据
		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		                beforeSend: function()          // 设置表单提交前方法
		                {
		                  //  new screenClass().lock();
		                },		                		           		 
		               error: function(request) {     // 设置表单提交出错
		            	   $("#taskTable").fnDraw(false);
	                	    $('#alertMsg').empty();		                	 
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
	                   },
		               success: function(data) {
		                // 设置表单提交完成使用方法
		               // 	alert("表单提交成功"+data);
		            	   if(data=="success"){
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		            	   }else if(data=="false"){
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失败<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    });
		            	   }else{
		            		   $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    });
		            	   }
		            	   $("#taskTable").dataTable().fnDraw(false);
		                 }
	              });
	  }
 function format(time){
   	    var datetime = new Date();
   	    datetime.setTime(time);
   	    var year = datetime.getFullYear();
   	    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
   	    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
   	    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
   	    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
   	    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
   	    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
   	}
 
 function excel(){
	   var  datas =  $('input[name="more"]').each(function(){
		    var data = $(this);
		    if(data.attr("checked")=="checked"){
		    	var id = data.val().split(",");			    				    	
		    	ids.push(id[0]);
		    }  
	   });
	
	   if(ids.length==0) return;
	   url = ctx + "/upsDischargePlan/excel?planId="+ids;
	window.location.href= url;
 }
 
