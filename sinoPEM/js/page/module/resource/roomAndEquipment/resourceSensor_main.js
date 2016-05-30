define(function(require, exports, module) {
	var $ = require("jquery");
	var dataTable = require("dataTables");
	require("bootstrap-datetimepicker");
	require("jquery.form");
	require("formTree");
	require("formUser");
	require("DT_bootstrap");
	
		var table='';
		
			
		var ids;
		var dm;	
		exports.init = function(){
			/* Table initialisation */
			$(document).ready(function() {
				
				
				var url = ctx+"/sensor/getAll";
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
					          		  				"<div style='display:block;float:left;'>"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</div> " +
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
					              { "mData": "staffNameString" }
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
					$("#addbutton").append("<a id='createbutton' href='#myModal1' role='button'  data-toggle='modal'class='btn btn-primary'>添加探头</a>");
					$("#createbutton").unbind('click').click(function () {
						create();
					});
					
					
					
			});
		}

		  	function RefreshTable(){
			table.fnSort( [ [1,'asc'] ] );
			table.fnSort( [ [1,'desc'] ] );
			} 
		
	
  
	
    /*
     *   删除探头
     * 
     */

	function delRoomDevice(id){

		      // confirm("确定删除吗？");
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sino/sensor/delSensor?Id="+id,  // 提交的页面
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
	 *  修改探头
	 */
	function modiRoomDevice(id){
		 
	    var mid = id;
	    var murl = ctx+"/sensor/modi?deviceId="+mid;
		$('.edit_list').empty();
//		var url = ctx+"/roomDevice/getAllRoomDev?roomdevId="+mid;
		$('.edit_list').load(murl,function(){
			/*$.post(url,function(){
				
			})*/
		});
	}
	
	
	/*
	 * 添加探头
	 * 
	 */
		    
	function create(options){
		
				var url = ctx+"/sensor/add?tmp="+Math.random();
				$('#edit_list').empty();
				$('#edit_list').load(url,function(){
					
				});
			
		}
		
	
		
});
