
		var table='';
		var ids;
		var dm;	
		function loadAll(){
			//获取所有机房信息
			var rUrl = ctx+"/roomDevice/getAllRoomInfo";
			getRoomInfo(rUrl);
			getProductType();
			$("#searchRoom_id").unbind("click").click(function(){
				var room=$("#roomIdValue").val();
				var type=$("#typeValue").val();
				url = ctx+"/roomDevice/getSearchByRoomId?id="+room+"&productTypeId="+type+"&tmp=" + Math.random();
				innitPage(url);
				//$("#taskTable").dataTableEX("ReDraw",url);
	    	});
			$('#reload').unbind("click").click(function() {
				$('#edit_list').empty();
	    		$('.edit_list').load(ctx+"/roomDevice/roomDeviceManager");
			});
				var url = ctx+"/roomDevice/getAll";
					innitPage(url);
					$("#createbutton").unbind('click').click(function () {
						create();
					});
		}
				  	function RefreshTable(){
					table.fnSort( [ [1,'asc'] ] );
					table.fnSort( [ [1,'desc'] ] );
					} 
				  	/**
					 *  获取所有机房信息
					 */
					 function  getRoomInfo(roomUrl){
							$('#roomInfo').empty();
							var $fieldCompDevType = $("#roomInfo");
							$fieldCompDevType.addClass("li_form");
							var optionCompDevTypes = {
								inputName : "room",
								writeType : 'show',
								width: "260", //高度
								showLabel : false,
								url : roomUrl,
								inputValue:"all",
								onSelect :function(id){
									  $("#roomIdValue").attr("value",id);
								}  
							   
							};
							$fieldCompDevType.formSelect(optionCompDevTypes);
					 }
					 
					 
					//加载设备类型
						function  getProductType(){
							
							  $("#productTypeTree").empty();
							  var productTypeTree = $("#productTypeTree");
							  productTypeTree.addClass("li_form");							  
							  var optionsProductType = {
									inputName : "deviceTypeName",
									writeType : 'show',
									width: "250", //高度
									showLabel : false,
									url : ctx+'/base/productType/getProType',
									inputValue:"all",
									onSelect :function(id){
										var  typeId = id;
										$("#typeValue").attr("value", typeId);
									}  
							    };
								productTypeTree.formSelect(optionsProductType);

						}
						 
		  
			
		    /*
		     *   删除设备
		     * 
		     */
		
			function delRoomDevice(id){
		
				      // confirm("确定删除吗？");
				        if(!confirm("确定删除吗？")){
					        return;
				          }
			            $.ajax({
			            	 url:"/sinoPEM/roomDevice/delRoomDev?Id="+id,  // 提交的页面
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
			 *  修改设备
			 */
			function modiRoomDevice(id){
				 
			    var mid = id;
			    var murl = ctx+"/roomDevice/modi?deviceId="+mid;
				$('.edit_list').empty();
		//		var url = ctx+"/roomDevice/getAllRoomDev?roomdevId="+mid;
				$('.edit_list').load(murl,function(){
					/*$.post(url,function(){
						
					})*/
				});
			}
			
			
			/*
			 * 添加设备
			 * 
			 */
				    
			function create(){
				
						var url = ctx+"/roomDevice/add?tmp="+Math.random();
						$('#edit_list').empty();
						$('#edit_list').load(url);
				}
			
			
			function innitPage(url){
				$('#taskTable').dataTable().fnDestroy();
				table=$('#taskTable').dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"sAjaxSource":url, 
					"bRetrieve": true,
					"bSort": false,
					"bFilter":false,
					"aoColumns": [
					              { "mData": "deviceName"},
					              { "mData": "productTypeName" },
					              { "mData": "roomName" },
					              { "mData": "createDate" },
					              { "mData": "staffNameString" },
					              { "mData": "id","mRender": function (data) {
					            	  var rstatus='';
					            	  var id = data;
					          		  rstatus="<a name ='modibutton'   role='button' data-toggle='modal'  id='"+id+"'>" +
					          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
					          		  		"<a name='delbutton' href='#' id='"+id+"'>&nbsp" +
					          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
					          		  return rstatus;
					              		}}
					          ],
		//            "aoColumnDefs": [
		//				{ "bSearchable": false, "bVisible": false, "aTargets": [ 4 ] }
		//			] ,
					"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
					"sPaginationType": "bootstrap",
					"oLanguage": {
						"sLengthMenu": "页显示_MENU_ 个数",
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
						
						
						$('a[name="modibutton"]').unbind('click').click(function () {
							var mid =this.id;
							modiRoomDevice(mid);
						});
						
						$('a[name="delbutton"]').unbind('click').click(function () {
							var mid =this.id;
							delRoomDevice(mid);
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
						  
						})
					} 
				
				});
			}
				

