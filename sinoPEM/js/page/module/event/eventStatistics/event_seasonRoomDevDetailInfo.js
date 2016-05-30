function loadseasoon(){
			var roomName=$("#roomName").val();
			var yearTime=$("#yearTime").val();
			var quarter=$("#quarter").val();
			var url = ctx+"/eventSeasonManageInfo/getAll?roomName="+roomName+"&yearTime="+yearTime+"&quarter="+quarter;
			$("#taskTable").dataTable().fnDestroy();
			table=$("#taskTable").dataTable({
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
				"sServerMethod": "POST",
				"aoColumns": [
				              { "mData": "deviceName"},
				              { "mData": "allnum"},
				              { "mData": "yesdeal"},	
				              { "mData": "nodeal"},	
				              { "mData": "greatEvent"},	
				              { "mData": "smallEvent"},	
				              { "mData": "rate"},
				              { "mData": "duration"}],
				              "aoColumnDefs": [{ "bSearchable": true, "bVisible": true, "aTargets": [ 4 ] }] ,
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
			});
			//导出excel
			$("#_sino_partner_exportExcel").unbind("click").click(function() {
				var yearTime=$("#yearTime").val();
				var roomName = $("#roomName").val();
				var exportId = $("#_exportId").val();
				var queryType = $("#queryType").val();
				var quarter=$("#quarter").val();
				var url = ctx + "/eventSeasonManageInfo/exportExcel?tmp="+ Math.random() + "&roomName="+roomName+"&exportId="+exportId+"&yeear_Time="+yearTime+"&queryType="+queryType+"&quarter="+quarter;
				window.location.href= url;
		    });
			//返回
			$("#_sino_back").unbind("click").click(function() {
				var yearTime= $("#yearTime").val();
				var surl = ctx + "/eventSeasonManageInfo/manager?yeear_Time="+yearTime;
				$("#edit_list").empty();
				$("#edit_list").load(surl,function(){
					
				});
		    });
				
	};
	
