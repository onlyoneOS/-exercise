function load() {
		var partnerType=$('#partnerType').val();
		var partnerLine=$('#partnerLine').val();
		var partnerId=$('#partnerId').val();
		var productModel=$('#productModel').val();
		var partnerLineName='';
						
		//加载设备类型
		 getProductType();
	   //厂商信息
		// getPartnerInfo('');		 		 
		//系列
		var productUrl = ''
		//getProductLine(productUrl);
		//产品型号
		getProductModel();

	
		var selectUrl = ctx +"/eventType/eventTypeMainSelectPage";
	//	$("#select").load(selectUrl);
		
	
		var  tableUrl = ctx + "/eventType/eventTypeMainTablePage";
	//	$("#tableData").load(tableUrl);
		
		var url = ctx + "/eventType/getAllEventTypes?partnerType="+partnerType+"&partnerLine="+partnerLine+"&partnerId="+partnerId+"&productModel="+productModel+"&tmp=" + Math.random();
		loadTable(url);

		//添加
		$('#add').unbind('click').click(function() {			 
				$('#edit_list').load(ctx + "/eventType/addEventType?tmp=" + Math.random());
		});
    function modiEventType(){
    	$('#edit_list').load(ctx + "/eventType/updateEventType?id=" +$(this).attr("id"));
		}
    function delEventType(){
    	$.ajax({
			url: ctx + "/eventType/delEventType?id=" +$(this).attr("id"),  // 提交的页面
            data: "", // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            beforeSend: function()          // 设置表单提交前方法
            {
              //  new screenClass().lock();
            },
            error: function(request) {     // 设置表单提交出错
            	 $('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();
         		    });
            },
            success: function(data) {
            // 设置表单提交完成使用方法
           // 	alert("表单提交成功"+data);
//        		   RefreshTable();
            	if(data=="success"){
            		$('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();  
         		    	
         		    });
            	}else{
            		$('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件删除失敗！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();  
         		    	
         		    });
            	}
            	 $("#taskTable").dataTable().fnDraw(false);
        }
});
}
		//查询
		$('#search').unbind('click').click(function() {
			
			url = ctx + "/eventType/getAllEventTypes?partnerType="+partnerType+"&partnerLine="+partnerLine+"&partnerId="+partnerId+"&productModel="+productModel+"&tmp=" + Math.random();
			reload(url);
		});
		
		$("#reload").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx + '/eventType/manager?tmp=' + Math.random());
    	});
		
		//加载设备类型
		function  getProductType(){
			  $("#productTypeTree").empty();
			  var productTypeTree = $("#productTypeTree");	 		  
			  var optionsProductType = {
					//inputName : 'deviceTypeId',
					//inputId: 'proType',
					//labelName : 'formTree',
					//Checkbox : 'true',
					// onlyLeafCheck : true,
					animate : true,
					width:250,
					//height:"80px",
					searchTree : true,
					tree_url : ctx+'/base/productType/getTree',// 顶层
					asyncUrl : ctx+'/base/productType/getTree',// 异步
					search_url : ctx+'/base/productType/getTree',// 搜索
					find_url : ctx+'/base/productType/getTree',// 精确定位
					url : '',
					asyncParam : ["id"],
					addparams : [{
						name : "productTypeId",
						value : "root"
					}],
					async : true,
					onSelect:function(node){
						var  typeId = node.id;
						getPartnerInfo(typeId);
						partnerLineName='';
					//	getProductLine('');
						partnerType=node.id;
						partnerId='';
						partnerLine='';
						productModel="";
						getProductModel();
						
						$("#typeValue").attr("value", typeId);
					
					}
			    };
				productTypeTree.formTree(optionsProductType);

		}
		
		//厂商信息
		function getPartnerInfo(productTypeId){
				$("#partner_div").empty();
				$("#partner_div").append('<input id="partner" type="text" class="ultra-select-input3" />');
				//加载厂商
				$(".ultra-select-input3").uic_Dropdown({
					height:"auto",// 宽度
					width:"300",
					title: "生产厂商",
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
			                	}
			                }
			            });
						partnerId=id;
						getProductModel();
					//	getProductLine(productLineUrl);
						
						$("#partnerValue").attr("value", id);
						
					}
				});
		  }
		
		//获取产品系列	
		/*function getProductLine(url){
			$("#partnerLineDiv").empty();
			$("#partnerLineDiv").formTree({	
				//inputName : 'partnerLine',
				Checkbox : false,
				inputValue :partnerLineName,
				animate : true,
				searchTree : true,
				width : 260,
				tree_url : url,// 顶层
				search_url : url,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					partnerLine=node.id;
					getProductModel();
					
					$("#lineValue").attr("value", node.id);
				},
				async : true
			});	
			
		}*/
		//设备类型
		function getProductModel(){
			var $productModelDiv=$("#productModelDiv");
			$productModelDiv.empty();
			var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+partnerId+"&productLineId="+partnerLine;
			$productModelDiv.addClass("li_form");
			var optionProductModel = {				
					writeType : 'show',
					showLabel : false,
					url : productModelurl,
					onSelect:function(node){
						var str1 = $productModelDiv.formSelect("getValue")+"";
						productModel=str1.split(",")[0]; 
						
						$("#modelValue").attr("value", str1.split(",")[0]);
					},
					width : 250
				};
			$productModelDiv.formSelect(optionProductModel);
		}
		function loadTable(url){
			var $field = $("#taskTable");
			var options = {
				url : url,
				enableCRUD : true,
			//	enableDomain : [false,false,false,"isFlag","isFlag"],
			//	domainCode : ["isFlag","isFlag"],
				bFilter:false,
				dtCallBack:function(){
			 		 $("a[name='delEventType']").unbind('click').bind("click",delEventType);
			 		 $("a[name='modiEventType']").unbind('click').bind('click',modiEventType);
					},
				//mDataEX : [ "id","eventTypeName","indicatorIdMeaning", "tempConfirm", "timingConfirm" ]
			    mData : [
		              { "mData": "id" },
		              { "mData": "eventTypeName" },
		              { "mData": "indicatorIdMeaning"},
		              { "mData": "id","mRender": function (data) {
		            	  var rstatus='';
		            	  var id = data;
		          		  rstatus="<a name ='modiEventType'   role='button' data-toggle='modal'  id='"+id+"'>" +
		          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
		          		  		"<a name='delEventType' href='#' id='"+id+"'>&nbsp" +
		          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
		          		  return rstatus;
		          		  
		              } }
		          ]
			}
			$field.dataTableEX(options);
		}
		
		function reload(url){
			$("#taskTable").dataTableEX("ReDraw",url);
		}
		
	};
