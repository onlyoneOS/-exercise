function loadTemp(){

		var id=$('#deviceId').val();
		getIndicator(id);
	
		$('.date').datetimepicker({
	    	pickTime: false
	    });
		 
		 $('#searchbtn').unbind('click').click(function () {
			 searchModelTable();
		});
		 $('#btn_back').unbind('click').click(function () {
			 var options = {};
				options.keyName = "roomId";
				options.keyValue = $('#_sino_roomId').val();
				options.murl = "show/master/master_main";
				$.openurl(options);
		 });
		 var devNormId = $("#_indicator").formSelect("getValue")[0];
		 var url =  ctx+"/indicatorsStatistics/getTempShowList?deviceId="+$('#deviceId').val()+"&startTime="+$('#beginTime').val()+"&endTime="+$('#endTime').val()+"&devNormId="+devNormId;
		 getIndicatorTableData(url);
		/* $('#taskTable_length').css("margin-top","-24px");
		 $('#taskTable_length').css("margin-left","-26px");*/
	};
	
	function  getIndicatorTableData(url){
		 		 
			$('#taskTable').dataTable().fnDestroy();
		    table = $('#taskTable').dataTable({
		    	"bProcessing": true,
				"bServerSide": true,
				"bLengthChange":true,
				"bDestroy": true,
				"bSort": false,
				"bPaginate":true,
				"bFilter":true,
				"sAjaxSource":url, 
				"bRetrieve": true,
				"sServerMethod": "POST",
				"aoColumns": [
				              { "mData": "deviceName"},
				              { "mData": "indicatorName"},	 
				              { "mData": "DataValue","mRender": function (data,row,obj){
	          		              var str = obj.DataValue+""+obj.indicatorUnit;
				            	  return str;
				              }},
				              { "mData": "CreateTime"},	
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
				}
			});
		    $('.dataTables_filter').empty();
//		    $('.bt5left').hide();
       }
	
	function searchModelTable(){
		
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		var deviceId=$('#_deviceId').val();
		var devNormId = $("#_indicator").formSelect("getValue")[0];
		
		var url =  ctx+"/indicatorsStatistics/getTempShowList?deviceId="+$('#deviceId').val()+"&startTime="+$('#beginTime').val()+"&endTime="+$('#endTime').val()+"&devNormId="+devNormId;
		getIndicatorTableData(url);
		
	/*	var param  = "";
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		if(startTime != null&&startTime != ""){
			if(param == ""){
				param += startTime+" 00:00:00_"+"startTime";
			} else {
				param += ","+ startTime+" 00:00:00_"+"startTime";
			}
		}
		if(endTime != null&&endTime != ""){
			if(param == ""){
				param += endTime+" 23:59:59_"+"endTime";
			} else {
				param += ","+ endTime+" 23:59:59_"+"endTime";
			}
		}
		var deviceId=$('#_deviceId').val();
		var devNormId = $("#_indicator").formSelect("getValue")[0];
		if(devNormId == null||devNormId == ""){
			$.messager.alert("提示","请选择指标!");
			return;
		}
		param+= ","+deviceId;
		param+= ","+devNormId;
		table.fnFilter(param,0 );*/
	}
	
	function getIndicator(id){
		$("#_indicator").empty();
		var url = ctx + "/indicatorsStatistics/getIndicator?deviceId="+id;
		var $fieldCompDevType = $("#_indicator");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : "show",
			showLabel : false,
			width:"250", //高度
			url : url,
			checkbox : true,
			inputChange:false,
			onSelect :function(){
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		devNormId=$("#_indicator .uicSelectData").find("ul").find("li").attr("infinityid");
		$("#_indicator").formSelect("setValue",$("#_indicator .uicSelectData").find("ul").find("li").attr("infinityid"));
		$(".uicSelectData").height(160);
	}
	
