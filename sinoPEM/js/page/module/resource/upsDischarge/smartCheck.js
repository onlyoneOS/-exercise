 var  ids = new Array();
	function loadAll() {

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
		$('a[name="createPlan"]').unbind("click").click(function(){
	 		   var  datas =  $('input[name="more"]').each(function(){
	 			    var data = $(this);
	 			    if(data.attr("checked")=="checked"){
	 			    	var id = data.val().split(",");			    				    	
	 			    	ids.push(id[0]);
	 			    }  
	 		   });
	 		
	 		   if(ids.length==0) return;
	 		   if(ids.length>10){
	 			   alert("最多10台设备")
	 			   return;
	 		   }else{
	 			  createPlan();
	 		   }
		})
		
		load();
	};
	
	function load() {
		
		//放电区间
		var $fieldUserState = $("#_dischargeInterval");
		$fieldUserState.addClass("li_form");
		var optionUserState = {
			inputName : "dischargeInterval", 
			writeType : "show",
			showLabel : false, 
			code : "dischargeInterval",  
			width : "250"
		};
		$fieldUserState.formSelect(optionUserState);
		var intervalValue = "";
		$("#_dischargeInterval").find("ul li").each(function(i,ele){
			if(i == 0){
				var obj = $(ele);
				intervalValue = obj.attr("infinityid");
			}
		});
		//设置默认值
		$("#_dischargeInterval").formSelect("setValue",intervalValue);
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
		$fieldUserState.formSelect(optionUserState);
		
		var url = ctx+"/upsDischarge/getDisChargeUpsInfo";
		queryUps();
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
		var dischargeInterval = $("#_dischargeInterval").formSelect("getValue")[0];
		var remainTime = $("#_remainTime").formSelect("getValue")[0];
		var dischargeType = $("#_dischargeType").formSelect("getValue")[0];
		var url = ctx+"/upsDischargeBak/getIntelligentCheck?dischargeInterval="+dischargeInterval+"&remainTime="+remainTime+"&dischargeType="+dischargeType;
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
									   isCheck = "<input name='more' type='checkbox' value='"+ids+"' id='"+ids+"'/>"; 
							  	   
								   }				            	   
								   return  isCheck;			            	   				            	  
				              }},
				              { "mData": "DeviceName","mRender":function(data,row,obj){
								  var rstatus="";
								  var UpsDeviceId = obj.Id;
				            	  var DeviceName = data;
				            	  rstatus="<a name='DeviceName' href='#' id='"+UpsDeviceId+"'>"+DeviceName+"</a>";
				            	  return rstatus;
							  }},
				              { "mData": "RoomName" },
				              { "mData": "ProduceDate" },
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

	 function createPlan(){
			var frameSrc = ctx+"/upsDischargePlan/addPlan"; 
			$('#dailogs1').on('show', function () {
				$(".modal-header").empty();
				$(".modal-header").append("<a class='close' aria-hidden='true' data-dismiss='modal' type='button'>×</a><h3 >添加放电计划</h3>");
			     $('#dialogbody').load(frameSrc,function(){
			    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
			    		
		    		     submitSuccess: function (form, event) {
		    		         event.preventDefault();
		    		                 $.ajax({
		 		                url: ctx+"/upsDischargePlan/savePlan?deviceIds="+ids,  // 提交的页面
		 		                data: $('#addForm').serialize(), // 从表单中获取数据
		 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		 		                beforeSend: function()          // 设置表单提交前方法
		 		                {
		 		                  //  new screenClass().lock();
		 		                },
		 		                error: function(request) {      // 设置表单提交出错
		 		                	 $('#alertMsg').empty();
		 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>放电计划创建失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		 			         		    $(".alert").delay(2000).hide(0);
		 			         		    $(".close").click(function(){
		 			         		    	$(".alert").hide();
		 			         		    });
		 		                },
		 		                success: function(data) {
		 		                // 设置表单提交完成使用方法
		 		               // 	alert("表单提交成功"+data);
		 		                   if(data=="success"){
		 		                	   $('.edit_list').load(ctx + '/upsDischarge/smartCheck?tmp=' + Math.random(),{},function(){
		 		                			$('#alertMsg').empty();
		 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>放电计划添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		 				         		    $(".alert").delay(2000).hide(0);
		 				         		    $(".close").click(function(){
		 				         		    	$(".alert").hide();
		 				         		    });
		 		                	   });
		 		                
		 			         		 
		 		                   }else{
		 		                	   $('#alertMsg').empty();
		 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>放电计划添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		 			         		    $(".alert").delay(2000).hide(0);
		 			         		    $(".close").click(function(){
		 			         		    	$(".alert").hide();
		 			         		    });
		 		                   }
		 		                  $('#dailogs1').modal('hide');
		 		                }
		 		            });
		    		   
		    		     },
		    		     submitError: function (form, event, errors) {
		    		         event.preventDefault();
		    		         }
		    	 	});
			     }); 
				     $("#dsave").unbind('click');
				     $('#dsave').click(function () {
						$('#addForm').submit();
				     });
				
			 });
				    $('#dailogs1').on('hidden', function () {
				    	$('#dailogs1').unbind("show");
				    	});
					$('#dailogs1').modal({show:true});
					$('#dailogs1').off('show');
		 
	 }

	

