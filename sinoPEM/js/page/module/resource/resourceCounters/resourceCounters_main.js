define(function(require, exports, module) {
	
	var $ = require("jquery");
	var dataTable = require("dataTables");
	require("DT_bootstrap");
	require("bootstrap");

	 function  getCountersMessage( ){
		 
		 var url =  ctx+"/counters/queryCountersMessage?typeId="+16;		 
			$('#taskTable').dataTable().fnDestroy();
			var taskTable = $('#taskTable').dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
			//	"bStateSave":false,
				"bFilter":true,
				"sAjaxSource":url, 
				//"fnServerData": fnDataTablesPipeline,
				"bRetrieve": true,
				"aoColumns": [
				              { "mData": "id","mRender": function (data){
				            	  
				            	  var  rstatus = "";
				            	  var  idAndName = data.split(",");
				            	  var  id = idAndName[0];
				            	  var  name = idAndName[1];
				            	  
				            	  rstatus="<div style='float:left;' >" +
		          		  				"<div style='display:block;float:left;color:blue;'>"+
		          		  				"<a  id ='"+id+"'  href='#'  name='roomInfo' >"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</a></div> " +
		          		  				"<div style='display:none;float:right;'>" +
		          		  					
		          		  					"<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
		          		  					"<a  id ='"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
		          		  				"</div>" +
		          		  		      "</div>" ; 
	          		              return rstatus;
				              }},	
				              { "mData": "productTypeName"},
				              { "mData": "roomName"},	            
				              { "mData": "createDate"},
				              { "mData": "createStaff" }
				             // ,{ "mData": "deviceRemark" }	
				          ],
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
				
				 // 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
				fnDrawCallback:function(){
					$('a[name="modibutton"]').unbind('click').click(function () {
						
						var mid =this.id;
					//	modiMonitorPolicy(mid);	
						modiCounters(mid);
					});
					$('a[name="delbutton"]').unbind('click').click(function () {
						var mid =this.id;
						delCounters(mid);
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
			
		
			//增加列头柜信息按钮
			$("#query").unbind('click').click(function(){
				
				addCounters();		
			});	 
			
 }
	 

 function RefreshTable(){
	  			table.fnSort( [ [1,'asc'] ] );
				table.fnSort( [ [1,'desc'] ] );
		  } 
	 
	
 /**
  *  初始化页面接口
  */
  exports.init = function(){
     	  
	  getCountersMessage( );

  }
  



     /**
      *  增加列头柜信息
      */
     function addCounters(){
			 
			var addUrl = ctx+"/counters/addCountersPage";
			$('#edit_list').empty();
			$('#edit_list').load(addUrl);
	 }
		 
		 
		 
	/**
	 *  修改列头柜信息
	 */
	 function  modiCounters(id){
		 
		   var  counterId = id;
		   var  modiUrl = ctx+"/counters/updateCountersPage?counterId="+counterId;
		   $('#edit_list').empty();
		   $('#edit_list').load(modiUrl);

	 }
		 
	
	 
	  /**
	   * 删除列头柜信息
	   */
	 function  delCounters(id){
			
			  var countersId = id;
			  var delUrl = ctx+"/counters/delCountersById?countersId="+ countersId;
			  $.post(delUrl,function(data){
					var pUrl = ctx+"/counters/counterManagePage";					
					$('#edit_list').empty();
					$('#edit_list').load(pUrl);			
			  });
		 }
	 
		 

	 
 
});
