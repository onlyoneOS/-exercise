    var g_roomId = "";
	var g_deviceId = "";
	var g_indicatorId="";
    var time="";
    var times="";
	getIndicator("");	
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
				width: "250", //高度
				showLabel : false,
				url : roomUrl,
				inputValue:"all",
				onSelect :function(id){
					  getDeviceName(id);
				}  
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			
			
	 }
	
	
	//加载设备类型
	function  getDeviceType(){
			$("#deviceType").empty();
			var $fieldDevType = $("#deviceType");	 		  
			$fieldDevType.addClass("li_form");
			var optionDevTypes = {
				inputName : "deviceTypeName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+'/base/productType/getProType',
				inputValue:"all",
				onSelect :function(id){
					var  id = id;
					$("#devTypeId").attr("value", id);
					getDeviceName(id);
				}  
			};
			$fieldDevType.formSelect(optionDevTypes);
			var devTypeId;
			$("#deviceType").find("ul li").each(function(i,ele){
				if(i == 0){
					var obj = $(ele);
					devTypeId = obj.attr("infinityid");
				}
			});
			$("#deviceType").formSelect("setValue",devTypeId);

	}
	function getDeviceName(id){
		 $("#deviceInfo").empty();
		 var url = ctx + "/eventStatistics/getDeviceName?productTypeId="+id+"&roomId="+ g_roomId;
		 var $fieldCompDevType = $("#deviceInfo");
		 $fieldCompDevType.addClass("li_form");
		 var optionCompDevTypes = {
				 inputName : "deviceName",
				 writeType : "show",
				 showLabel : false,
				 width:"280", //高度
				 url : url,
				 onSelect :function(id,obj){
					 getIndicator(id);
				 }
		 };
		 devicesel = $fieldCompDevType.formSelect(optionCompDevTypes);
	}
	
	//时间插件
	function  getTime(){
		$('#btime').datetimepicker({
			pickTime: false
		}).on('changeDate', function(ev){
			 time=new Date(ev.date.getTime()+24*60*60*1000).format("yyyy-MM-dd");
			$('#beginTime').val(time);
			
		});
		$('#etime').datetimepicker({
			pickTime: false
		}).on('changeDate', function(ev){
			 times=new Date(ev.date.getTime()+24*60*60*1000).format("yyyy-MM-dd");
			$('#endTime').val(times);
			
		});
	}
	
	//初始化页面
function loadIndicator(){
		//获取所有机房信息
		var rUrl = ctx+"/resourceDeviceprotocol/getAllRoomInfo";
		getRoomInfo(rUrl);
		getDeviceType();
		getIndicator(' ');
		var deviceTypeId = $("#deviceType").formSelect("getValue")[0];
		getDeviceName(deviceTypeId);
		 getTime();
		 getAllAlarmLog();
		 
		 //查询
		 $("#searchbtn").unbind("click").click(function () {
			 searchModelTable();
		 });
		//导出Excel
		 $('#export_Excel').unbind('click').click(function () {
			export_Page();
		});
	};
	
	function getIndicator(id){
		$("#indicatorInfo").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#indicatorInfo");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$(".uicSelectData").height(160);
		
		
	}
	
	function  getAllAlarmLog(){
		var startTime = $("#beginTime").val();
		var endTime = $("#endTime").val();
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		 var url =  ctx+"/indicatorAnalysis/queryAllMonitorIndicatorData?startTime="+startTime+"&endTime="+endTime;		 
			$("#taskTable").dataTable().fnDestroy();
		    table = $("#taskTable").dataTable({
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
				              { "mData": "RoomName"},
				              { "mData": "deviceName"},
				              { "mData": "indicatorName"},
				              { "mData": "DataValue"},	 
				              { "mData": "indicatorUnit"},	
				              { "mData": "CreateTime"}				              
				          ],
				"sDom": "<'row'<l><'bt5right'f>r>t<'row'<i><'bt5right'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "页显示_MENU_ 个数",
					"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
					"sSearch":"检索:",
					"sEmptyTable":"没有数据",
					"sInfoEmpty": "显示0条数据",
					"oPaginate":{
						"sPrevious": "上一页",
						"sNext":"下一页"
					}
				}
			});
		    $(".dataTables_filter").empty();
        }
	
	function searchModelTable(){
		var param  = "";
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		var deviceId = $("#deviceInfo").formSelect("getValue")[0];
		var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
		var deviceTypeId = $("#devTypeId").val();
		var startTime = time;
		var endTime = times;
		var val1=  $("#val1").val();
		var val2=  $("#val2").val();
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param += roomId+"_"+"roomId";
		}
		//设备类型
		if(deviceTypeId!=null&&deviceTypeId!=""){
			if(param == ""){
			    param += deviceTypeId+"_"+"deviceTypeId";
			}else{
				param +=  ","+deviceTypeId+"_"+"deviceTypeId";
			}
		}
		
		if(deviceId != null&&deviceId != ""){
			if(param == ""){
			    param += deviceId+"_"+"deviceId";
			}else{
				param +=  ","+deviceId+"_"+"deviceId";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"devNormId";
			} else {
				param += ","+ devNormId+"_"+"devNormId";
			}
		}
		
		if(val1 != null&&val1 != ""){
			if(param == ""){
			    param += val1+"_"+"val1";
			}else{
				param += ","+ val1+"_"+"val1";
			}
		}
		
		if(val2 != null&&val2 != ""){
			if(param == ""){
			  param += val2+"_"+"val2";
			}else{
			  param += ","+val2+"_"+"val2";	
			}
		}
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(endTime != null&&endTime != ""){
			if(param == ""){
				param += endTime+"_"+"endTime";
			} else {
				param += ","+ endTime+"_"+"endTime";
			}
		}
		table.fnFilter(param,0 );
	}
	
	//导出Excel
  	function export_Page() {
  		var param  = "";
		var roomId = $("#roomInfo").formSelect("getValue")[0];
		var deviceId = $("#deviceInfo").formSelect("getValue")[0];
		var devNormId = $("#indicatorInfo").formSelect("getValue")[0];
		var deviceTypeId = $("#deviceType").formSelect("getValue")[0];
		var startTime = $("#beginTime").val();
		var endTime = $("#endTime").val();
		var val1=  $("#val1").val();
		var val2=  $("#val2").val();
		if(roomId != null&&roomId != ""&&roomId != "all"){
			param += roomId+"_"+"roomId";
		}
		//设备类型
		
		if(deviceTypeId!=null&&deviceTypeId!=""){
			if(param == ""){
			    param += deviceTypeId+"_"+"deviceTypeId";
			}else{
				param +=  ","+deviceTypeId+"_"+"deviceTypeId";
			}
		}
		
		if(deviceId != null&&deviceId != ""){
			if(param == ""){
			    param += deviceId+"_"+"deviceId";
			}else{
				param +=  ","+deviceId+"_"+"deviceId";
			}
		}
		if(devNormId != null&&devNormId != ""){
			if(param == ""){
				param += devNormId+"_"+"devNormId";
			} else {
				param += ","+ devNormId+"_"+"devNormId";
			}
		}
		
		if(val1 != null&&val1 != ""){
			if(param == ""){
			    param += val1+"_"+"val1";
			}else{
				param += ","+ val1+"_"+"val1";
			}
		}
		
		if(val2 != null&&val2 != ""){
			if(param == ""){
			  param += val2+"_"+"val2";
			}else{
			  param += ","+val2+"_"+"val2";	
			}
		}
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+"_"+"startTime";
			} else {
				param += ","+ startTime+"_"+"startTime";
			}
		}
		if(endTime != null&&endTime != ""){
			if(param == ""){
				param += endTime+"_"+"endTime";
			} else {
				param += ","+ endTime+"_"+"endTime";
			}
		}
  		url = ctx + "/indicatorAnalysis/exportExcelIndex?tmp="+ Math.random() + "&param="+ param;
		window.location.href= url;
  	}
	
