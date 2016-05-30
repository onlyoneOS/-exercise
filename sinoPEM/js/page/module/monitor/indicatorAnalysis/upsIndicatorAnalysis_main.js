	  /**
	     *  时间插件
	     */
	      function  getTime(object){
	     	  
	     	  object.datetimepicker({ 
	     	       // format: 'yyyy-MM-dd', 
	     	       // format:'MM/dd/yyyy hh:mm',
	     	      //  language: 'en', 
	     	      //  pickDate: true, 
	     	        pickTime: false
	     	      //  hourStep: 1, 
	     	      //  minuteStep: 15, 
	     	      //  secondStep: 30, 
	     	      //  inputMask: true,
	     	 
	     	      }); 
	      }
	 
	 /**
	  *  初始化页面
	  */	
function loadUPSAnalysis(){		
		//时间选择框
		 var timeObject = $("#btime");
		 getTime(timeObject);
		 var timeObject1 = $("#etime");
		 getTime(timeObject1);
		 getAllAlarmLog();
		 
		 $('#searchbtn').unbind('click').click(function () {
			 searchModelTable();
		});
		$('#searchType').change(function(){
			 if($('#searchType').val()==2){
				$('#loadRanges').show();
			}else{
				$('#loadRanges').hide();
			}
		});
	};
	function  getAllAlarmLog(){
		 
		 var url =  ctx+"/indicatorAnalysis/queryAllMonitorUPSIndicatorData";		 
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
				              { "mData": "RoomName"},
				              { "mData": "deviceName"},
				              { "mData": "indicatorName"},
				              { "mData": "DataValue"},	 
//				              { "mData": "DataValue","mRender": function (data,row,obj){
//				            	  var rstatus = '';
//				            	  rstatus+=obj.DataValue;
//				            	  rstatus+=obj.IndicatorUnit;
//	          		              return rstatus;
//				              }},
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
						"sNext":'下一页'
					}
				}
			});
		    $('.dataTables_filter').empty();
        }
	
	function searchModelTable(){
		var param  = "";
		var searchType = $('#searchType').val();
		var lowerLimit = $('#lowerLimit').val();
		var startTime = $('#beginTime').val();
		var endTime = $('#endTime').val();
		
		if(searchType != null&&searchType != ""&&searchType !=0){
			if(param == ""){
			    param += searchType+"_"+"searchType";
			}else{
				param +=  ","+searchType+"_"+"searchType";
			}
		}
		if(lowerLimit != null&&lowerLimit != ""&&searchType !=1){
			if(param == ""){
				param += lowerLimit+"_"+"lowerLimit";
			} else {
				param += ","+ lowerLimit+"_"+"lowerLimit";
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

