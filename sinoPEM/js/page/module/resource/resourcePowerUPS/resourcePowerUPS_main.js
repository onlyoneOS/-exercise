
	
	var table='';

	
	var ids;
	var dm;	

	function loadAll(){
		var url = ctx+"/powerUPS/getAll";
		$('#taskTable').dataTable().fnDestroy();
		table=$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource":url, 
			"bRetrieve": true,
			"bSort": false,
			"aoColumns": [
						  
			              { "mData": "deviceNameString","mRender": function (data) {
//			            	  console.info(data);
			            	  var rstatus='';
			            	  var nameAndId = data.split(",");
			            	  var name = nameAndId[0];
			            	  var id = nameAndId[1];
			          		  rstatus="<div style='float:left;' >" +
			          		"<div style='display:block;float:left;color:blue;'>" +
			          		  			    "<a  id ='"+id+"'  href='#'  name='roomDetail' >"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</a></div> " +			          		  				
			          		  				"<div style='display:none;float:right;'>" +
			          		  					"<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
			          		  					"<a  id = '"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
			          		  				"</div>" +
			          		  		 "</div>" ; 
			          		 
			          		  return rstatus;
			          		
			              		} },
			              { "mData": "productTypeName" },
			              { "mData": "roomName" },
			              { "mData": "createDate" },
			              { "mData": "staffNameString" },
			          ],
			"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "页显示_MENU_ 条",
				"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sSearch":"检索:",
				"sEmptyTable":"没有数据",
				"sInfoEmpty": "显示0条数据",
				"oPaginate":{
					"sPrevious": "上一页",
					"sNext":'下一页'
				}

				
			},
			/*
			 * 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
			*/
			fnDrawCallback:function(){
				
				  $('a[name="roomDetail"]').unbind('click').click(function () {
						
	                    //	alert("info     click ");
							var deviceId =this.id;
							//获取设备的详细配置信息
							getDeviceInfo(deviceId);
						
	                    });												
				
				$('a[name="modibutton"]').unbind('click').click(function () {
					var mid =this.id;
					modiRoomDevice(mid);
				});
				
				$('a[name="delbutton"]').unbind('click').click(function () {
					var mid =this.id;
					delRoomDevice(mid);
				});
				$('a[name="_ups_a"]').unbind('click').click(function () {
					var id =this.id;
					upsHandlerA(id);
				});
				
				$('#taskTable tbody tr').each(function(){
					var tdd=$(this.childNodes[0]);
					var sss=$(tdd.children()[0]);
				    tdd.bind("mouseover",function(){
				    	$(sss.children()[1]).css('display','block'); 
				    });
				    
				    tdd.bind("mouseout",function(){
				    	$(sss.children()[1]).css('display','none'); 
				    });
				  
				});
			} 
		
		});
		
		$("#createbutton").unbind('click').click(function () {
			create();
		});
		
	};

		  	function RefreshTable(){
			table.fnSort( [ [1,'asc'] ] );
			table.fnSort( [ [1,'desc'] ] );
			} 
	function upsHandlerA(id){
		$("#_ups_div").empty();
		var path = ctx;
		var buffer = new StringBuffer();
		buffer.append('<div id="_ups_a" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="_ups_a" aria-hidden="true">');
		buffer.append('<div class="modal-header">');
		buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
		buffer.append('<h3 id="myModalLabel">充放电管理</h3 >');
		buffer.append('</div >');
		buffer.append('<div class="modal-body" >');
		
		buffer.append('<form id="_sino_eoss_article_advice" method="post" >');
		buffer.append('<input type="hidden" value="'+id+'" name="id" />');
		buffer.append('<table class="table table-hover">');
		buffer.append('<tr><td><a href="#" role="button" class="btn btn-primary" id="_discharge_a">放电</a></td>');
		buffer.append('<td><img style="width:130px;height:130px;" src="'+path+'/images/roommonitor/tip/ups-png.png" id="_ups_handler_img"><a href="#" role="button" class="btn btn-primary" style="display:none;" id="_stop_a">停止</a><div id="_div_value_" style="float:right;font-size:40px;"></div></td></tr>');
		buffer.append('</table>');
		buffer.append('</form>');
		
		buffer.append("</div>");	
		buffer.append('<div class="modal-footer" >');
		buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
		buffer.append('<button class="btn btn-primary"  id="btnConfirmq" data-dismiss="modal">确定</button >');
		buffer.append('</div >');
		buffer.append('</div>');
		
		$("#_ups_div").append(buffer.toString());
		var inter = null;
//		$('#_charging_a').unbind('click').click(function () {
//			$('#_ups_handler_img').attr("src",ctx+"/images/charging.gif");
//			$('#_stop_a').show();
//			$('#_stop_a').html("停止充电");
//			
//			clearInterval(inter);
//			$('#_div_value_').html(getUpsValues()+"%");
//			
//			
//			inter = setInterval(function() {
//	           var value = getUpsValues()+"%";
//	           $('#_div_value_').html(value);
//	        },5000);
//			
//		});
		$('#_discharge_a').unbind('click').click(function () {
			$.ajax({
				url:ctx+"/ups/outUse",
				success:function(result){
					$('#_ups_handler_img').attr("src",ctx+"/images/discharge.gif");
					$('#_stop_a').show();
					$('#_stop_a').html("停止放电");
					
					$('#_div_value_').html(getUpsValues()+"%");
					inter = setInterval(function() {
			           var value = getUpsValues()+"%";
			           $('#_div_value_').html(value);
			        },3000);
				}
			});
		
		});
		$('#_stop_a').unbind('click').click(function () {
			clearInterval(inter);
			$('#_div_value_').html("");
			$.ajax({
				url:ctx+"/ups/outUseStop",
				success:function(){
					$('#_ups_handler_img').attr("src",ctx+"/images/roommonitor/tip/ups-png.png");
					$('#_stop_a').hide();
				}
			});
		});
	}
	
	function getUpsValues(){
		//return GetRandomNum(50,100);
		var value = "";
		$.ajax({
			url:ctx+"/ups/upsBattaryValue",
			async : false,
			success:function(data){
				value = data;
			}
		});
		return value;
	}
	
	function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    /*
     *   删除UPS
     * 
     */

	function delRoomDevice(id){

		      // confirm("确定删除吗？");
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sinoPEM/powerUPS/delUPSDev?Id="+id,  // 提交的页面
		                data: "", // 从表单中获取数据
		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		                beforeSend: function()          // 设置表单提交前方法
		                {
		                  //  new screenClass().lock();
		                },		                		           		 
		               error: function(request) {     // 设置表单提交出错
	                	    RefreshTable();
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
		            		    RefreshTable();
		                		$('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();  
			         		    	
			         		    });
		                 }
	              });
	  }
	
	
	
	/*
	 *  修改UPS
	 */
	function modiRoomDevice(id){
		 
	    var mid = id;
	    var murl = ctx+"/powerUPS/modi?deviceId="+mid;
		$('.edit_list').empty();
//		var url = ctx+"/roomDevice/getAllRoomDev?roomdevId="+mid;
		$('.edit_list').load(murl,function(){
			/*$.post(url,function(){
				
			})*/
		});
	}
	
	
	/*
	 * 添加UPS
	 * 
	 */
	function create(options){
				var url = ctx+"/powerUPS/add?tmp="+Math.random();
				$('#edit_list').empty();
				$('#edit_list').load(url,function(){
					
				});
				$("#site").unbind("click").click(function(){
			 		 $('#edit_list').empty();					
			 		 $('#edit_list').load(ctx + '/powerUPS/powerUPSManager?tmp=' + Math.random());     					 	    	
			 	
			  });
			
		}
	
	/**
	 *  获取设备详细信息
	 */	 
     function   getDeviceInfo(deviceId){
    	 
    	 // var options = {};
 		 // options.murl = '/powerUPS/getDeviceInfoOnProductModel';
 		 // options.keyName = 'detailId';
 		 // options.keyValue = deviceId;
 		 // $.openurl(options); 
		 
			var url = ctx+"/powerUPS/getDeviceInfoOnProductModel?detailId="+deviceId;
			$('#edit_list').empty();
			$('#edit_list').load(url,function(){
				
			});
	 
	 
	 }
     
