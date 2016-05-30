define(function(require, exports, module) {
	var $ = require("jquery");
	require("easyui");
	var dataTable$ = require("dataTables");
	require("formTree");
	require("formSelect");
	var uic$ = require("uic_Dropdown");
	require("DT_bootstrap");
	require("bootstrap");
	require("coverage");

	exports.init = function() {
		var url = ctx + "/eventLatestDataInfo/getAllEventLatestDataInfoRoom?tmp=" + Math.random();

		table = dataTable$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource":url, 
			"bRetrieve": true,
			"bSort": false,
			"bFilter": true,
			"sServerMethod": "POST",
			"aoColumns": [
							{ "mData": "roomName" },
							{ "mData": "count" ,"mRender":function(data,row,obj){
				          		  rstatus="<a href='#' name='roomName' id='"+obj.id+"#"+obj.roomName+"'>"+obj.count+"</a>"; 	          		 
	          		  return rstatus;
			    } }
						],
			"sDom": "<'row'<'bt5left'l><'bt5right partnersel'>r>t<'row'<'bt5left'i><'bt5right'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "页显示_MENU_ ",
				"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sSearch":"检索:",
				"sEmptyTable":"没有数据",
				"sInfoEmpty": "显示0条数据",
				"oPaginate":{
					"sPrevious": "",
					"sNext":''
				}

				
			},
			fnDrawCallback:function(){
				$('.bt5right').hide();
				$('.bt5left').hide();
				$('a[name="roomName"]').unbind('click').click(function () {
					var idStr =this.id;
				    var ids= idStr.split("#");
				    var id = ids[0];
				    var roomName = ids[1];
					$('#edit_list').load(ctx + "/eventLatestDataInfo/roomTable?tmp=" + Math.random()+"&roomName="+roomName+"&id="+id);
				});
			} 
		
		});
		


	};

});