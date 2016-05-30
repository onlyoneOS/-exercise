 function load() {
		//性能初始化
		var $indicatorId=$("#indicatorIdDiv");
		$("#indicatorIdDiv").empty();
		$indicatorId.addClass("li_form");
		var productType = $('#partnerType').val();
		var partnerId = $('#partnerId').val();
		var productModel = $('#productModel').val();
		var indicatorIdUrl=ctx+"/eventType/getIndicatorId?productType="+productType+"&partnerId="+partnerId+"&productModel="+productModel+"&tmp="+Math.random();
		var optionIndicatorCategory = {
				writeType : 'show',
				showLabel : false,
				code : 'indicatorId',
				url : indicatorIdUrl,
				width : "282"
		};
		$indicatorId.formSelect(optionIndicatorCategory);
			//加载性能指标
			function getIndicator() {
				var productType = $('#partnerType').val();
				var partnerId = $('#partnerId').val();
				var productModel = $('#productModel').val();
				var $indicatorId=$("#indicatorIdDiv");
				$("#productIndicatorValveTable").empty();
				$("#indicatorIdDiv").empty();
				$indicatorId.addClass("li_form");
				var indicatorIdUrl=ctx+"/eventType/getIndicatorId?productType="+productType+"&partnerId="+partnerId+"&productModel="+productModel+"&tmp="+Math.random();
				var optionIndicatorCategory = {
						writeType : 'show',
						showLabel : false,
						code : 'indicatorId',
						url : indicatorIdUrl,
						width : "282",
						onSelect :function(){  //当选中时触发这个方法
							 $("#indicatorId").val($("#indicatorIdDiv").formSelect("getValue")[0]); 
							var indicatorIdVal= $("#indicatorId").val();
							addIndicatorType(indicatorIdVal);
						}
				};
				$indicatorId.formSelect(optionIndicatorCategory);
					var indicatorIdVal= $("#indicatorIdDiv .uicSelectData ul").find("li").first().attr("infinityid");
					if ( typeof(indicatorIdVal) != "undefined" ) {
						$("#indicatorId").val(indicatorIdVal);
						addIndicatorType(indicatorIdVal);
						$("#indicatorIdDiv").formSelect("setValue",$("#indicatorIdDiv .uicSelectData ul").find("li").first().attr("infinityid"));
					}
			};
			var indictorId=$("#indicatorId").val();
			$("#indicatorIdDiv").formSelect("setValue",''+indictorId+'');
			
			var partnerType = $('#partnerType').val();
			var partnerId = $('#partnerId').val();
			var brandId = $('#brandId').val();
			var partnerLine = $('#partnerLine').val();
			var partnerLineName='';
			var mid=$("#indicatorId").val();
			addIndicatorType(mid);
			
			
		
		
			
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
				//	getProductLine('');
					partnerType=node.id;
					partnerId='';
					partnerLine='';
					productModel="";
					getProductModel();
					getIndicator();
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
					}
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
						 getIndicator();
					},
				};
			$productModelDiv.formSelect(optionProductModel);
		}


		
		//选择事件指标
		function addIndicatorType(mid){
			$("#productIndicatorValveTable").empty();
			$('#productIndicatorValve').show();
			var text="";
			 $.ajax({
					url:ctx+"/eventType/getIndicatorDataType?indicatorId="+mid,
					type:'post',
					dataType:'text',
					success:function(data){
						text=data;
						tts(mid,text);
					}
				});
		}
		
		function tts(mid,s){
			var productModel=$("#productModel").val();
			var urls=ctx+'/eventType/eventIndicatorVal?indicatorId='+mid+"&productModel="+productModel;
			$.ajax({
				url:urls,
				type:"POST",
				async:false,
				dataType:'json',
				success:function(data){
					if(s=="1"){
						if( data!="" && null != data ){
							$("#productIndicatorValveTable").empty();
							var str="<tr><th style='text-align:center'>通讯状态</th><th style='text-align:center; colspan='2'>状态值</th><th style='text-align:center'>中文描述</th></tr>";
							 str+="<tr><td style='text-align:center;width:120px;'>正常</td><td style='text-align:center;width:100px;'><input style='width: 50px' readonly='readonly' type='text' id='indicatorValve1'name='indicatorValve1' value='0'/></td><td style='text-align:center;width:100px;'><input type='text' id='eventDescCh'name='eventDescCh' value=''/></td></tr>";
							 str+="<tr><td style='text-align:center;width:120px;'>异常</td><td style='text-align:center;width:100px;'><input style='width: 50px' readonly='readonly' type='text' id='indicatorValve2'name='majorValve1' value='1'/></td><td style='text-align:center;width:100px;'><input type='text' id='eventDescCh2'name='eventDescCh' value=''/></td></tr>";
							 $("#productIndicatorValveTable").append(str);
							 var indicatorDate=data;
							    $("#eventDescCh").val(indicatorDate[0].EventDescCh);
								$("#eventDescCh2").val(indicatorDate[0].EventDescCh2);
							   $('#indicatorValve1').val(indicatorDate[2].IndicatorValve1);
								$('#majorValve1').val(indicatorDate[2].MajorValve1);
						}else{
							$('#indicatorValve1').val("");
							$('#majorValve1').val("");
							
						}
					}else{
						if( data!="" && null != data ){
							$("#productIndicatorValveTable").empty();
							var str="<tr><th style='text-align:center'>事件等级</th><th style='text-align:center;' colspan='3'>告警范围确认</th><th style='text-align:center'>中文描述</th></tr>";
							str+="<tr><td style='text-align:center;width:120px;'>正常</td><td style='text-align:center;width:100px;'><input style='width: 50px' type='text' id='indicatorValve1'name='indicatorValve1' required data-validation-required-message='请输入正常范围！'/></td><td style='text-align:center;width:50px;'>----</td><td style='text-align:center;width:100px;'><input style='width: 50px' type='text' id='indicatorValve2'name='indicatorValve2' required data-validation-required-message='请输入正常范围！'/></td><td style='text-align:center;width:100px;'><input type='text' id='eventDescCh' name='eventDescCh' required data-validation-required-message=''/></td></tr>";
							str+="<tr><td style='text-align:center;width:120px;'>警告</td><td style='text-align:center'><input style='width: 50px' type='text' id='slightValve1' name='slightValve1' /></td><td style='text-align:center'>----</td><td style='text-align:center'><input style='width: 50px' type='text' id='slightValve2' name='slightValve2' /></td><td style='text-align:center;width:100px;'><input type='text' id='eventDescCh1'name='eventDescCh' required data-validation-required-message='请输入范围！'/></td></tr>";
							str+="<tr><td style='text-align:center;width:120px;'>异常</td><td style='text-align:center'><input style='width: 50px' type='text' id='majorValve1' name='majorValve1' /></td><td style='text-align:center'>----</td><td style='text-align:center'><input style='width: 50px' type='text' id='majorValve2' name='majorValve2' /></td><td style='text-align:center;width:100px;'><input type='text' id='eventDescCh2'name='eventDescCh' required data-validation-required-message='请输入范围！'/></td></tr>";
							$("#productIndicatorValveTable").append(str);
							var indicatorDate=data;
							if(indicatorDate[0].f==undefined){
								$("#eventDescCh").val(indicatorDate[0].EventDescCh);
								$("#eventDescCh1").val(indicatorDate[0].EventDescCh1);
								$("#eventDescCh2").val(indicatorDate[0].EventDescCh2);
								$('#indicatorValve1').val(indicatorDate[3].IndicatorValve1);
								$('#indicatorValve2').val(indicatorDate[3].IndicatorValve2);
								$('#slightValve1').val(indicatorDate[3].SlightValve1);
								$('#slightValve2').val(indicatorDate[3].SlightValve2);
								$('#majorValve1').val(indicatorDate[3].MajorValve1);
								$('#majorValve2').val(indicatorDate[3].MajorValve2);
							}else{
								$('#indicatorValve1').val(indicatorDate[0].IndicatorValve1);
								$('#indicatorValve2').val(indicatorDate[0].IndicatorValve2);
								$('#slightValve1').val(indicatorDate[0].SlightValve1);
								$('#slightValve2').val(indicatorDate[0].SlightValve2);
								$('#majorValve1').val(indicatorDate[0].MajorValve1);
								$('#majorValve2').val(indicatorDate[0].MajorValve2);
							}
							
						}else{
							$('#indicatorValve1').val("");
							$('#indicatorValve2').val("");
							$('#slightValve1').val("");
							$('#slightValve2').val("");
							$('#majorValve1').val("");
							$('#majorValve2').val("");
						}
						
					}
				}
			});
		}
		//选择事件类型指标	
		//验证数据并提交
	    	$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
    		     submitSuccess: function (form, event) {
    		         event.preventDefault();
    		         $.ajax({
 		                url: ctx+"/eventType/update?tmp=" + Math.random(),  // 提交的页面
	 		            data: $('#updateForm').serialize(), // 从表单中获取数据
 		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
 		                beforeSend: function()          // 设置表单提交前方法
 		                {
 		                  //  new screenClass().lock();
 		                },
 		                error: function(request) {      // 设置表单提交出错
 		                	 $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>修改事件失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 			         		    $(".alert").delay(2000).hide(0);
 			         		    $(".close").click(function(){
 			         		    	$(".alert").hide();
 			         		    });
 		                },
 		                success: function(data) {
 		                // 设置表单提交完成使用方法
 		               // 	alert("表单提交成功"+data);
 		                   if(data=="success"){
 		                	   $('.edit_list').load(ctx + '/eventType/manager?tmp=' + Math.random(),{},function(){
 		                			$('#alertMsg').empty();
 				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>修改事件成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
 				         		    $(".alert").delay(2000).hide(0);
 				         		    $(".close").click(function(){
 				         		    	$(".alert").hide();
 				         		    });
 		                	   });
 		                   }else{
 		                	   $('#alertMsg').empty();
 			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>修改事件失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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
	    	$("#update").unbind('click').click(function () {
	    	$("#updateForm").submit();
	    	});
			
			$("#reset").unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventType/manager?tmp=' + Math.random());
	    	});
			$('button[id="reset"]').unbind("click").click(function(){
	    		$('#edit_list').empty();
	    		$('.edit_list').load(ctx + '/eventType/manager?tmp=' + Math.random());
	    	});
	};

