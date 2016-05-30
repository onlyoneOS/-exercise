function detail(){
		/* Table initialisation */
		$(document).ready(function() {
			var devName=$('#devName').val();
			var startTime=$('#beginTime').val();
			var endTime=$('#endTime').val();
			var url = ctx+"/eventMouthManageInfo/getDevAll?devName="+devName+"&startTime="+startTime;
			
			
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
				             
				              { "mData": "roomName"},
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
							
				 var surl="";
				 var  startTime= $('#beginTime').val();
				surl=ctx+"/eventMouthManageInfo/manager?startTime="+startTime;
			
				$('#edit_list').empty();
				$('#edit_list').load(surl,function(){
					
				});
		    });
				
		});
	}

	
	function export_Page() {
		
		var url = ctx + "/eventMouthManageInfo/exportExcel?tmp="+ Math.random() + "&startTime="+ $('#beginTime').val()+"&devName="+ $('#devName').val();
		window.location.href= url;
		}
