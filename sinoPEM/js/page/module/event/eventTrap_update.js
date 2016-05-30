
	
 function load() {
            
	 var roomId=$("#roomId").val();
		var deviceIp=$("#deviceIp").val();
		var partnerLineName='';
		//获取所有机房信息
		var rUrl = ctx+"/roomDevice/getAllRoomInfo";
		
		getRoomInfo(rUrl);
		getDeviceByRoomId("");
			 
			
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
						width: "280", //高度
						showLabel : false,
						url : roomUrl,
						inputValue:"",
						onSelect :function(id,value){
							  $("#roomId").attr("value",id);
							  getDeviceByRoomId(id);
						}  
					   
					};
					$fieldCompDevType.formSelect(optionCompDevTypes);
			 }
			 
			   /**
				 * 根据机房id获取设备
				 */
			 function  getDeviceByRoomId(id){
						$('#device').empty();
						var $fieldCompDevType = $("#device");
						$fieldCompDevType.addClass("li_form");
						var optionCompDevTypes = {
							inputName : "device",
							writeType : 'show',
							width: "280", //高度
							showLabel : false,
							url : ctx+"/roomDevice/getDevice?roomId="+id,
							inputValue:"",
							onSelect :function(id){
								  $("#deviceIp").attr("value",id);
							}  
						   
						};
						$fieldCompDevType.formSelect(optionCompDevTypes);
				 }
			//
		
			//加载事件
			var $eventTypeDiv=$("#eventTypeDiv");
			$eventTypeDiv.addClass("li_form");
			var indicatorIdUrl=ctx+"/eventType/cfgTrapEvents";
			var optionIndicatorCategory = {
					writeType : 'show',
					showLabel : false,
					code : 'id',
					url : indicatorIdUrl,
					inputValue : $('#eventTypeId').val(),
					width : "282",
					onSelect :function(){  //当选中时触发这个方法
						 $("#eventTypeId").val($("#eventTypeDiv").formSelect("getValue")[0]); 
					}
			};
			$eventTypeDiv.formSelect(optionIndicatorCategory);
			
		
			
			var partnerType = $('#partnerType').val();
			var partnerId = $('#partnerId').val();
			var brandId = $('#brandId').val();
			var partnerLine = $('#partnerLine').val();
			var partnerLineName='';
			var mid=$("#indicatorId").val();
			
			
			//加载设备类型
			$("#partnerTypeDiv").formTree({	
				//inputName : 'partnerType',
				inputValue : $('#partnerTypeMeaning').val(),
				Checkbox : false,
				animate : true,
				searchTree : true,
				tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
				asyncUrl : ctx+"/base/productType/getTree",// 异步
				search_url : ctx+"/base/productType/getTree",// 搜索
				find_url :ctx+"/base/productType/getTree",// 精确定位
				url : '',
				asyncParam : ["id"],
				onSelect:function(node){
					getPartnerInfo(node.id);
					partnerLineName='';
					getProductLine('');
					partnerType=node.id;
					partnerId='';
					partnerLine='';
					productModel="";
					getProductModel();
					$('#partnerType').val(node.id);
					$('#partnerId').val('');
					$('#partnerLine').val('');

				},
				addparams : [{
							name : "productTypeId",
							value : "root"
						}],
				async : true
			});

			//系列
			var productUrl = ''
			$("#partnerLineDiv").formTree({	
				//inputName : 'partnerLine',
				inputValue : $('#partnerLineMeaning').val(),
				Checkbox : false,
				animate : true,
				searchTree : true,
				tree_url : productUrl,// 顶层
				search_url : productUrl,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					productModel="";
					partnerLine=node.id;
					getProductModel();
					$('#partnerLine').val(node.id);
				},
				async : true
			});	

			//设备型号
			var $productModelDiv=$("#productModelDiv");
			$productModelDiv.addClass("li_form");
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+partnerId+"&productLineId="+partnerLine;
			var optionProductModel = {
					writeType : 'show',
					showLabel : false,
					url:productModelurl,
					inputValue : $('#productModel').val(),
					width : "282",
					onSelect:function(node){
						$('#productModel').val($productModelDiv.formSelect("getValue")[0]); 
						getProductModel();
					}
				};
			$productModelDiv.formSelect(optionProductModel);
			
			function getPartnerInfo(productTypeId){
				$("#partnerId_div").empty();
				$("#partnerId_div").append('<input  type="text"   class="ultra-select-input3"  data="0" />');
				//加载厂商
				$(".ultra-select-input3").uic_Dropdown({
					height:"auto",// 宽度
					title: "厂商",
					width : '300px',
					selecttitle:"从下列选择", //标题
					url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
					checkbox:false,
					branchtype:true,
					search:false,
					onSelect:function(id,value){
						var productLineUrl=ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random();
						//Ajax查出设备系列的默认值选中第一个
						$.ajax({
			                url:productLineUrl,  // 提交的页面
			                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
			                async:false,
			                success: function(data) {
			                	if(data!=""){
				                	var jsonStr = data;
				                	partnerLineName=jsonStr[0].text;
				                	partnerLine=jsonStr[0].id;
				                	$('#partnerLine').val(partnerLine);
			                	}
			                }
			            });
						$('#partnerId').val(id);
						partnerId=id;
						getProductModel();
						getProductLine(productLineUrl);
						
					}
				});
			}
			
			
		function getProductLine(url){
			$("#partnerLineDiv").empty();
			$("#partnerLineDiv").formTree({	
				//inputName : 'partnerLine',
				Checkbox : false,
				inputValue :partnerLineName,
				animate : true,
				searchTree : true,
				tree_url : url,// 顶层
				search_url : url,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					$('#partnerLine').val(node.id);
					partnerLine=node.id;
					getProductModel();
					
				},
				async : true
			});	
			
		}
			
		function getProductModel(){
			var $productModelDiv=$("#productModelDiv");
			$productModelDiv.empty();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+partnerId+"&productLineId="+partnerLine;
			$productModelDiv.addClass("li_form");
			var optionProductModel = {
					writeType : 'show',
					showLabel : false,
					url : productModelurl,
					width : "282",
					onSelect:function(node){
						var str1 = $productModelDiv.formSelect("getValue")+"";
						productModel=str1.split(",")[0]; 
						$('#productModel').val(productModel); 
					},
				};
			$productModelDiv.formSelect(optionProductModel);
		}
		//验证数据并提交
	    	 $("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();//indicatorDataType
    		         $.ajax({
 		                url: ctx+"/eventTrapInfo/update?tmp=" + Math.random(),  // 提交的页面
	 		            data: $('#updateForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>trap事件修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){
 		                	   $('.edit_list').load(ctx + '/eventTrapInfo/manager?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>trap事件修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>trap事件修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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
	    	 $("#update").unbind('click').click(function ()  {
	    	     $("#updateForm").submit();
		     });
			
			$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventTrapInfo/manager?tmp=' + Math.random());
	    	});
			$('button[id="reset"]').unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventTrapInfo/manager?tmp=' + Math.random());
	    	});
	};

