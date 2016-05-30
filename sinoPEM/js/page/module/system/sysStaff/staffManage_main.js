function loadStaffAll() {
	var url = ctx + "/staff/getAllStaff";
	$('#taskTable')
			.dataTable(
					{
						"bProcessing" : true,
						"bServerSide" : true,
						"sAjaxSource" : url,
						"bRetrieve" : true,
						"aoColumns" : [
								{
									"mData" : "staffCode"
								},
								{
									"mData" : "staffName"
								},
								{
									"mData" : "posing"
								},
								{
									"mData" : "orging"
								},
								{
									"mData" : "conactPhone"
								},
								{
									"mData" : "conactEmail"
								},
								{
									"mData" : "staffId",
									"mRender" : function(data) {
										var rstatus = '';
										var id = data;
										rstatus = "<a  id ='"
												+ id
												+ "'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>"
												+ "<a id = '"
												+ id
												+ "' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;";
										return rstatus;

									}
								}

						],
						"sDom" : "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
						"sPaginationType" : "bootstrap",
						"oLanguage" : {
							"sLengthMenu" : "页显示_MENU_ 个数",
							"sInfo" : "从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
							"sSearch" : "检索:",
							"sEmptyTable" : "没有数据",
							"sInfoEmpty" : "显示0条数据",
							"oPaginate" : {
								"sPrevious" : "上一页",
								"sNext" : '下一页'
							}

						},
						/*
						 * 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
						 */
						fnDrawCallback : function() {
							$('a[name="modibutton"]').unbind('click').click(
									function() {
										var mid = this.id;
										modiStaff(mid);
									});
							$('a[name="delbutton"]').unbind('click').click(
									function() {
										var mid = this.id;
										delStaff(mid);
									});

						}

					});

	$('a[name="createStaff"]').unbind('click').click(function() {
		create();
	});

};

/**
 * 删除员工
 */
function delStaff(id) {

	/*
	 * if(!confirm("确定删除吗？")){ return; }
	 */
	$.ajax({
		url : ctx + "/staff/delStaff?staffId=" + id, // 提交的页面
		data : "", // 从表单中获取数据
		type : "POST", // 设置请求类型为"POST"，默认为"GET"
		success : function(data) {
			if(data=="success"){
				$('#alertMsg').empty();
     			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
     		    $(".alert").delay(2000).hide(0);
     		    $(".close").click(function(){
     		    	$(".alert").hide();  
     		    	
     		    });
			}else{
				$('#alertMsg').empty();
     			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除失敗！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
     		    $(".alert").delay(2000).hide(0);
     		    $(".close").click(function(){
     		    	$(".alert").hide();  
     		    	
     		    });
			}
			$("#taskTable").dataTable().fnDraw(false);
			/*var pUrl = ctx + "/staff/manageStaff";
			$('#edit_list').empty();
			$('#edit_list').load(pUrl);*/
		}
	});
}

/**
 * 修改员工
 */
function modiStaff(id) {

	var mid = id;
	$("#dailogs1").empty();
	var str = '<div id="myModal2" name="myModal2" class="modal hide fade" tabindex="-1"  aria-labelledby="myModalLabel" aria-hidden="true"></div>';
	$("#dailogs1").append(str);
	var modiStaffUrl = ctx + "/staff/modiStaffPage?staffId=" + mid;
	$("#myModal2").load(modiStaffUrl);

}

/**
 * 新建员工信息(包括初始化)
 */
function create() {

	$("#dailogs1").empty();
	var str = '<div id="myModal1" name="myModal1" class="modal hide fade" tabindex="-1"  aria-labelledby="myModalLabel" aria-hidden="true"></div>';
	$("#dailogs1").append(str);
	var addStaffUrl = ctx + "/staff/addNewStaffPage";
	$("#myModal1").load(addStaffUrl);

}
