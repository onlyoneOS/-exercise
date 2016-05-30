
function loadMounth(){
		/* Table initialisation */
			var roomName=$('#roomName').val();
			var startTime=$('#beginTime').val();
			var endTime=$('#endTime').val();
			
			
			var url = ctx+"/eventMouthManageInfo/getAll?roomName="+roomName+"&startTime="+startTime+"&endTime="+endTime;
			
			
			$('#taskTable').dataTable().fnDestroy();
			table=$('#taskTable').dataTable({
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
				              { "mData": "duration"}
				          ],
	            "aoColumnDefs": [
					{ "bSearchable": true, "bVisible": true, "aTargets": [ 4 ] }
				] ,
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
						"sNext":''
					}
	
					
				},
		
			
			});
			$('#_sino_partner_exportExcel').unbind('click').click(function() {
				
				export_Page();
		    });	
			$('#_sino_back').unbind('click').click(function() {
//				history.go(-1);
				
				
				 var surl="";
				 var  startTime= $('#beginTime').val();
				
				surl=ctx+"/eventMouthManageInfo/manager?startTime="+startTime+"&endTime="+endTime;
			
				$('#edit_list').empty();
				$('#edit_list').load(surl,function(){
					
				});
		    });
				
	}

	
	function export_Page() {
		
		var url = ctx + "/eventMouthManageInfo/exportExcel?tmp="+ Math.random() + "&startTime="+ $('#beginTime').val()+"&roomName="+ $('#roomName').val()+"&exportId="+$('#_exportId').val()+ "&endTime="+ $('#endTime').val();
		window.location.href= url;
		}
	
		
