
	function loadAll() {
		//绑定批量设置事件
		$("#dischargeMore").unbind("click").click(function(){
			dischargeMore();
		});
		//绑定全选事件
		$("#selAll").unbind("click").click(function(){
			  var isChecked = $("#selAll").attr("checked");
			  if(isChecked == "checked"){
				  $('input[name="more"]').each(function(){
					    var data = $(this);
					    data.attr("checked", "checked"); 
				   });	  
			  }else{
				  $('input[name="more"]').each(function(){
					    var data = $(this);
					    data.attr("checked", null);
				   });
			  }
		});
		getPlan();
		load();
		
	};
	
	function load() {
		
		/*
		//放电时长
		var $fieldUserState = $("#_remainTime");
		$fieldUserState.addClass("li_form");
		var optionUserState = {
			inputName : "remainTime",
			writeType : "show",
			showLabel : false,
			code : "remainTime",
			width : "250"
		};
		$fieldUserState.formSelect(optionUserState);
		//放电类型
		var $fieldUserState = $("#_dischargeType");
		$fieldUserState.addClass("li_form");
		var optionUserState = {
			inputName : "dischargeType",
			writeType : "show",
			showLabel : false,
			code : "dischargeType",
			width : "250"
		};
		$fieldUserState.formSelect(optionUserState);*/
		var ids= $('#_dischargeInterval').formSelect("getValue")[0];
		var url = ctx+"/upsDischargeBak/getUpsInfo?planId="+ids;
		getUpsInfo(url);
		
	
		
		//按条件查询UPS信息
		$("#queryUps").unbind("click").click(function() {
			queryUps();
		});
		//导出Excel表格
		$("#excel").unbind("click").click(function() {
			export_Excel();
	    });
		
	}
	function queryUps(){
		/*var dischargeInterval = $("#_dischargeInterval").formSelect("getValue")[0];
		var remainTime = $("#_remainTime").formSelect("getValue")[0];
		var dischargeType = $("#_dischargeType").formSelect("getValue")[0];
		var url = ctx+"/upsDischargeBak/getUpsInfo?dischargeInterval="+dischargeInterval+"&remainTime="+remainTime+"&dischargeType="+dischargeType;*/
		var ids= $('#_dischargeInterval').formSelect("getValue")[0];
		var url = ctx+"/upsDischargeBak/getUpsInfo?planId="+ids;
		getUpsInfo(url);
	}
	
	function export_Excel(){
		var dischargeInterval = $("#_dischargeInterval").formSelect("getValue")[0];
		var remainTime = $("#_remainTime").formSelect("getValue")[0];
		var dischargeType = $("#_dischargeType").formSelect("getValue")[0];
		var url="";
		if((dischargeInterval==null||dischargeInterval=="")&&(remainTime==null||dischargeInterval=="")&&(dischargeType==null||dischargeInterval=="")){
			 url = ctx + "/upsDischargeBak/exportExcel";
		}else if((dischargeInterval!=null||dischargeInterval!="")||(remainTime!=null||dischargeInterval!="")||(dischargeType!=null||dischargeInterval!="")){
			 url = ctx + "/upsDischargeBak/exportExcel?dischargeInterval="+dischargeInterval+"&remainTime="+remainTime+"&dischargeType="+dischargeType;
		}
		window.location.href= url;
	}
	
	 function getUpsInfo(url){
		 $("#taskTable").dataTable().fnDestroy();
			table=$("#taskTable").dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource":url, 
				"bRetrieve": true,
				"bSort": false,
				"bLengthChange" : false,
				"bFilter" : false,
				"aoColumns": [
				              {"mData": "Id",  "mRender": function(data,Obj){
								  var ids = data.split(",");	
								  var isCheck = "";
								   if(ids.length>2){
									  // isCheck = "<input name='more' type='checkbox' checked='checked' value='"+deviceIds+"'/>";
									   isCheck = "<input name='more' type='checkbox'  value='"+ids+"' id='"+ids+"'/>";
								   }else{
									  // isCheck = "<input name='more' type='checkbox' value='"+deviceIds+"'/>"; 
									   isCheck = "<input name='more'  type='checkbox' value='"+ids+"' id='"+ids+"'/>"; 
							  	   
								   }				            	   
								   return  isCheck;			            	   				            	  
				              }},
				              { "mData": "DeviceName"/*,"mRender":function(data,row,obj){
								  var rstatus="";
								  var UpsDeviceId = obj.Id;
				            	  var DeviceName = data;
				            	  rstatus="<a name='DeviceName' href='#' id='"+UpsDeviceId+"'>"+DeviceName+"</a>";
				            	  return rstatus;
							  }*/},
				              { "mData": "RoomName" },
				              //{ "mData": "ProduceDate" },
				              { "mData": "EndTime" },
				              { "mData": "RemainTime","mRender":function(data){
				            	  var rstatus="";
				            	  var remainTime = data;
				            	  if(remainTime!=null){
				            		  rstatus=remainTime+"分钟";
				            		  return rstatus;
				            	  }else{
				            		  return rstatus;
				            	  }
							  }},
				              { "mData": "DischargeNum" },
				              { "mData": "DischargeType","mRender":function(data){
								  var rstatus="";
				            	  var DischargeType = data;
				            	  if(DischargeType==1){
				            		  rstatus="手动放电";
				            	  }else if(DischargeType==2){
				            		  rstatus="停电放电";
				            	  }
				            	  return rstatus;
							  }}],
	            "aoColumnDefs": [
					//{ "bSearchable": false, "bVisible": false, "aTargets": [ 4 ] } //隐藏第[ 4 ]列
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
						"sNext":"" 
					}
				},
				fnDrawCallback:function(){
					$("a[name='DeviceName']").unbind("click").bind("click",function(){
						var upsId = this.id;
						//alert(upsId);
						var url = ctx+"/upsDischarge/getUpsInfo?upsId=" + upsId;	   
				 		   $("#edit_list").empty();
				 		   $("#edit_list").load(url, function(){
				 		
				 		   });
					});
					
					$("input[name='more']").unbind("click").click(function () {
							var mid =this.id;
					});
					
					$('a[name="roomInfo"]').unbind("click").click(function () {
						var mid =this.id;
						showRoomInfo(mid);
					});
					
					$('a[name="isPartButton"]').unbind("click").click(function () {
						var mid =this.id;
						addPart(mid);
					});
					
					$('a[name="modibutton"]').unbind("click").click(function () {
						var mid =this.id;
						modiRoom(mid);
					});
					
					$('a[name="delbutton"]').unbind("click").click(function () {
						var mid =this.id;
						delRoom(mid);
					});
					
					$("#taskTable tbody tr").each(function(){
						var tdd=$(this.childNodes[0]);
						var sss=$(tdd.children()[0]);
					    tdd.bind("mouseover",function(){
					    	$(sss.children()[1]).css("display","block"); 
					    });
					    
					    tdd.bind("mouseout",function(){
					    	$(sss.children()[1]).css("display","none"); 
					    });
					  
					});
				} 
			
			});


	 }
	
	//时间插件
	function  getTime(object){
		object.datetimepicker({
			pickTime: false
		});
	}
	
	//批量进行放电检测
	function  dischargeMore(){
		var  ids = new Array();
		$('input[name="more"]').each(function(){
			var data = $(this);
			if(data.attr("checked")=="checked"){
				var id = data.val().split(",");
				//ids.push(data.val());
				ids.push(id[0]);
			}
		});
		if(ids.length==0){
			alert("请选择要放电的UPS！");
			return;
		}
		$.ajax({
			type : "GET",
			async : false,
			dataType : "text",
			url : ctx+"/upsDischargeBak/upsStartDischarge?ids=" + ids,
			success : function(data) {
				if(data=="success"){
						   $(".menu2_title_sub").removeClass('active');
						   $('li a[name="upsDischargeBak/upsMonitoringManage"]').addClass('active');
						   $('li a[name="upsDischargeBak/upsMonitoringManage"]').click();
				}else{
					var url=ctx+"/upsDischargeBak/upsDischargeManage"
					$("#edit_list").empty();
					$("#edit_list").load(url);
				}
			}
		});
	}
	
	 function getPlan(){
		 $('#_dischargeInterval').empty();
			var $fieldCompDevType = $("#_dischargeInterval");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "260", //高度
				showLabel : false,
				url : ctx+"/upsDischargePlan/getPlan",
				onSelect :function(id){
					 
				}  
			   
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			var intervalValue = "";
			$("#_dischargeInterval").find("ul li").each(function(i,ele){
				if(i == 0){
					var obj = $(ele);
					intervalValue = obj.attr("infinityid");
				}
			});
			//设置默认值
			$("#_dischargeInterval").formSelect("setValue",intervalValue);
	 }
