
	 /**
	  *  初始化页面
	  */	
function loadIndicatorTable(){
		 /**
		 *  获取所有机房信息
		 */
		 
		 function  getRoomInfo(roomUrl){
			 var room="";
			 $('#roomInfo').empty();
				var $fieldCompDevType = $("#roomInfo");
				$fieldCompDevType.addClass("li_form");
				var optionCompDevTypes = {
					inputName : "room",
					writeType : 'show',
					width: "250", //高度
					showLabel : false,
					url : roomUrl,
					inputValue:"all",
					onSelect :function(id){
						  getDevice(id);
					}  
				};
				$fieldCompDevType.formSelect(optionCompDevTypes);
				
				var roomId = "";
				$("#roomInfo").find("ul li").each(function(i,ele){
					if(i == 1){
						var obj = $(ele);
						roomId = obj.attr("infinityid");
						room=roomId;
					}
				});
				$("#roomInfo").formSelect('setValue',roomId);
				return room;
		 }
		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		var id=getRoomInfo(rUrl);
		getDevice(id);
		getIndicator("");
		$('.date').datetimepicker({
	    	pickTime: false
	    });
		 
		 $('#searchbtn').unbind('click').click(function () {
			 $("#tableTitle").empty();
			 var deviceName = $('#deviceInfo').formSelect("getValue")[1];
			 var startTime = $('#beginTime').val();
			 $("#tableTitle").append("<h4>"+deviceName+"("+startTime+") 性能指标峰值统计表</h4>");
			 searchModelTable();
		});
		 getIndicatorTableData();
		 
		//导出Excel
		 $('#export_Excel').unbind('click').click(function () {
			export_Page();
		});
	};
	function getDevice(id){
		$("#deviceInfo").empty();
		if(id=="all"){
			id="";
		}
		var url = ctx + "/eventStatistics/getDevice?roomId="+id;
		var $fieldCompDevType = $("#deviceInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(id,obj){
					getIndicator(id);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		var s=$('#deviceInfo .uicSelectData').find('ul').find('li').attr('infinityid');
		if(s!=undefined){
			$("#deviceInfo").formSelect('setValue',s);
		}
	}
	function getIndicator(id){
		$("#indicatorInfo").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#indicatorInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$(".uicSelectData").height(160);
		$("#indicatorInfo").formSelect('setValue',$('#indicatorInfo .uicSelectData').find('ul').find('li').attr('infinityid'));
	}
	
	function  getIndicatorTableData(){
		
		var param  = "";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var devNormId = $('#indicatorInfo').formSelect("getValue")[0];
		var startTime = $('#beginTime').val();
		if(deviceId != null&&deviceId != ""){
			param += deviceId+"_"+"deviceId";
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"devNormId";
			} else {
				param += ","+ devNormId+"_"+"devNormId";
			}
		}
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(roomId != null&&roomId != ""&&roomId != "all"){
			if(param == ""){
				param += roomId+"_"+"roomId";
			} else {
				param += ","+ roomId+"_"+"roomId";
			}
		}
		
		 var url =  ctx+"/indicatorsStatistics/getIndicatorTableData?param="+param;		 
			$('#taskTable').dataTable().fnDestroy();
		    table = $('#taskTable').dataTable({
		    	"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
				"bFilter":true,
				"sAjaxSource":url, 
				"bRetrieve": true,
				"sServerMethod": "POST",
				"aoColumns": [
				              { "mData": "roomName"},
				              { "mData": "deviceName"},
				              { "mData": "indicatorName"},	 
				              { "mData": "maxd"},
				              { "mData": "mind"},			              
				              { "mData": "avgd","mRender": function (data,row,obj){
	          		              var str = obj.avgd+"";
				            	  return str.split(".")[0];
				              }},
				              { "mData": "rate"},	
				          ],
				"sDom": "<'row'<''l><'bt5right'f>r>t<'row'<''i><'bt5right'p>>",
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
				}
			});
		    $('.dataTables_filter').empty();
       }
	
	function searchModelTable(){
		var param  = "";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var devNormId = $('#indicatorInfo').formSelect("getValue")[0];
		var startTime = $('#beginTime').val();
		if(deviceId != null&&deviceId != ""){
			param += deviceId+"_"+"deviceId";
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"devNormId";
			} else {
				param += ","+ devNormId+"_"+"devNormId";
			}
		}
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(roomId != null&&roomId != ""&&roomId != "all"){
			if(param == ""){
				param += roomId+"_"+"roomId";
			} else {
				param += ","+ roomId+"_"+"roomId";
			}
		}
		
		table.fnFilter(param,0 );
	}
	
	//导出Excel
  	function export_Page() {

  		var param  = "";
		var roomId = $('#roomInfo').formSelect("getValue")[0];
		var deviceId = $('#deviceInfo').formSelect("getValue")[0];
		var devNormId = $('#indicatorInfo').formSelect("getValue")[0];
		var startTime = $('#beginTime').val();
		if(deviceId != null&&deviceId != ""){
			param += deviceId+"_"+"deviceId";
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"devNormId";
			} else {
				param += ","+ devNormId+"_"+"devNormId";
			}
		}
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(roomId != null&&roomId != ""&&roomId != "all"){
			if(param == ""){
				param += roomId+"_"+"roomId";
			} else {
				param += ","+ roomId+"_"+"roomId";
			}
		}
  		url = ctx + "/indicatorsStatistics/exportExcel?tmp="+ Math.random() + "&param="+ param;
		window.location.href= url;
  	}
