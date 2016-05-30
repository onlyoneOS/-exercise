 var deviceDatas=null;
function load() {
		var partnerType = $('#partnerType').val();
		var partnerId = $('#partnerId').val();
		var partnerLine = $('#partnerLine').val();
		var productModel = $('#productModel').val();
		var partnerLineName='';
		getPartnerInfo();
		getProductModel("");
		//getEvent(partnerId,productModel);
		 //跳转到事件页面
		  $("#addMore").unbind("click").click(function(){
			  var partnerId = $('#partnerId').val();
			  var productModel = $('#productModel').val();
			  if(partnerId==""||null==partnerId){
				  alert("请选择厂商");
				  return;
			  }
			  if(productModel==""||null==productModel){
				  alert("请选择设备型号");
				  return;
			  }
			  getEventIndex(partnerId,productModel);		  
		  });
		  $("#addMore").empty();
		  $("#addMore").append("<a href='#myModal1' id='add' role='button' data-toggle='modal' style='font-size:13px;' >新增</a>");
		/*function getEvnet(partnerInfo,productModel){
			$("#formRole").empty();
			var $fieldRole = $("#formRole");
			$fieldRole.addClass("li_form");
			var options = {
				inputName : "roles",
				url : ctx + "/eventRelated/getAllEvevnt?partnerInfo="+partnerInfo+"&productModel="+productModel,
				showLabel : false,
				inputChange : false,
				width : "282",
				checkbox : true
			};
			options.writeType = 'show';
			$fieldRole.formSelect(options);
		}*/
		function getPartnerInfo(){
				var id="";
				$("#partnerId_div").empty();
				$("#partnerId_div").append('<input  type="text" class="ultra-select-input3" maxlength="100"   data="0" />');
				//加载厂商
				$(".ultra-select-input3").uic_Dropdown({
					height:"auto",// 宽度
					width:"300px",
					title: "厂商",
					selecttitle:"从下列选择", //标题
					url:ctx+"/base/partnerInfo/getAll?productTypeId="+id,	 //型号分组数据
					checkbox:false,
					branchtype:true,
					search:false,
					onSelect:function(id,value){
						getProductModel(id);
					//	getEvnet(id,productModel);
						$('#partnerId').attr("value",id);
						if ( typeof($("#indicatorIdDiv .uicSelectData ul").find("li").first().attr("infinityid")) == "undefined") {
						}
					}
				});
			}		
		function getProductModel(id){
			var $productModelDiv=$("#productModelDiv");
			$productModelDiv.empty();
			 partnerType = $('#partnerType').val();
			 partnerId = $('#partnerId').val();
			 partnerLine = $('#partnerLine').val();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+id+"&productLineId="+partnerLine+"&tmp="+Math.random();
			$productModelDiv.addClass("li_form");
			var optionProductModel = {
					inputName: 'productModelName',
					writeType : 'show',
					showLabel : false,
					url : productModelurl,
					onSelect:function(node){
						var str1 = $productModelDiv.formSelect("getValue")+"";
						var productModelId = str1.split(",");
						$('#productModel').val(productModelId[0]);
						
					//	getEvnet(partnerId,productModelId[0]);
						
					},
					width : "282"
				};
			$productModelDiv.formSelect(optionProductModel);
			$('#productModel').val($("#productModelDiv .uicSelectData ul").find("li").first().attr("infinityid"));
			
		}
		//验证数据并提交
			 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();
    		         var dev = $("#device").css("display");
    				  var deviceIds = new Array();
    				  if(dev=="none"){
    					  deviceIds = $("#device").datagrid("getRows");
    					  
    					}
    				  var dIds = new Array();
    				  for(var i=0; i<deviceIds.length; i++){
    						 dIds.push(deviceIds[i].id);
    					 }
    				  $("#hideRoles").attr("value",dIds);
    		         $.ajax({
 		                url: ctx+"/eventRelated/saveEventRelated?tmp=" + Math.random(),  // 提交的页面
	 		            data: $('#addEventForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件关联添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){		               
 		                	   $('.edit_list').load(ctx + '/eventRelated/manager?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件关联添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件关联添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                   }
 		                  
 		                }
 		            });
    		   
    		     },
    		     submitError: function (form, event, errors) {
    		         event.preventDefault();
    		         }
    	 	});
			 $("#saveEvents").unbind('click').click(function () {
	    		 	$("#addEventForm").submit();
		   });
		
		
	    	$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventRelated/manager?tmp=' + Math.random());
	    	});
	    	$('button[id="reset"]').unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventRelated/manager?tmp=' + Math.random());
	    	});
	};
	function getEventIndex(partnerId,productModel){
	     var sr = "<div id='myModal1' style='width:700px' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>"
	         $("#addDeviceAndIndex").empty();
	         $("#addDeviceAndIndex").append(sr);     
	         var url = ctx+"/eventRelated/getSelectEventPage?partnerId="+partnerId+"&productModel="+productModel;
	         $("#myModal1").load(url, function(){
	         	 var saveObject = $("#myModal1").contents().find("#save");         
	              //获取事件表单信息
	              saveObject.unbind('click').click(function(){
	              	 var deviceObject = $("#myModal1").contents().find("#dev");
	        			 var devIds = deviceObject.datagrid("getSelections");
	        			 var dIds = new Array();
	        			 for(var i=0; i<devIds.length; i++){
	        				 dIds.push(devIds[i].id);
	        				 var dev=devIds[i].id;
	        			 }
	        			 var eventRelatedId = $("#eventRelatedId").val();
	        			 var ur = ctx+"/eventRelated/getSelectEvent?id="+dIds+"&eventRelatedId="+eventRelatedId;
	        		     getSelectedEvents(ur);
	        			 $("#nomsg").empty();      			 
	        			 $("#myModal1").modal('hide');
	        			});      	
	         });
 }
	 function  getSelectedEvents(url){
		   $("#device").datagrid({
		    	title:"已选事件列表",
		    	method:"post",
		    	loadMsg:"数据加载中，请稍后……",
		    	url: url,
		    	rownumbers:true,
		    	//fitColumns:true,
		    	pagination:true,
		    	singleSelect:false,
		    	plain:true,
		    	fitColumns:true,
		    	autoRowHeight: true,  
		     frozenColumns:[[  
		    	              {field:'id',checkbox:true}
		    	           ]],
		    	           columns:[[
		    	        	    	 {
		    	        	    		field:"eventName",
		    	        	    		title:"事件名称",
		    	        	    	   
		    	        	    	  },{		    		
		    	        	    		  field:"eventDesc",
		    	        	    		  title:"性能指标",
		    	        	    	  },{		    		
		    	        	    		  field:"productModelName",
		    	        	    		  title:"设备厂商",
		    	        	    	  },{		    		
		    	        	    		  field:"partnerName",
		    	        	    		  title:"设备型号",
		    	        	    	  }   		 
		    	        	    	  ]],
		    	
		         toolbar:[
		               {
		        	    id:"remove",
		        	    handler:function(){

		        	    	var allIds = $("#device").datagrid("getRows");
		        	    	var selectedIds = $("#device").datagrid("getSelections");
		   
		        	    	var allDeviceIds = new Array();
		        	    	var selectedDeviceIds = new Array();
		        	    	
		        	    	for(var i=0; i<allIds.length; i++){
		        	    		allDeviceIds.push(allIds[i].id);
		        	    	}
		        	    	for(var i=0; i<selectedIds.length; i++){
		        	    		selectedDeviceIds.push(selectedIds[i].id);
		        	    	}
		        	    	delDevice(allDeviceIds, selectedDeviceIds);
		        	    
		        	    }
		            }
		        ],
		       
		        onSelectAll:function(rows){
				},
				onLoadSuccess:function(data){
					deviceDatas=data.rows;
				},
				onUnselectAll:function(rows){

					
				},
			   onUnselect:function(rowIndex,rowData){
			    	var devUnSelectedId =rowData.id;
			    	clearSelectIndector(devUnSelectedId);
		    	}

		    
		    });
	   }

	 