function loadAll() {
		var partnerType=$('#partnerType').val();
		var partnerLine=$('#partnerLine').val();
		var partnerId=$('#partnerId').val();
		var partnerLineName='';
 		//加载设备类型
		 getProductType();
		//系列
		var productUrl = '';
		getProductLine(productUrl);
		//产品型号
		getProductModel();
		var url = ctx+"/indicatorProduct/findAllIndicatorProductManage";
		loadTable(url);
		//查询
		$('#search').unbind('click').click(function() {
			var partnerType = $("#productTypeTree").formTree('getValue');
			var partnerId = $(".ultra-select-input3").uic_Dropdown('getValue').id;
//			var partnerLine = $("#partnerLineDiv").formTree('getValue');
			var productModel = $("#productModelDiv").formSelect('getValue')[0];
		
			url = ctx+"/indicatorProduct/getSearchIndicatorProduct?partnerType="+partnerType+"&partnerLine="+partnerLine+"&partnerId="+partnerId+"&productModel="+productModel+"&tmp=" + Math.random();
			reload(url);
		});
		
		$("#reload").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx+"/indicatorProduct/indicatorProductManage");
    	});
		
		//加载设备类型
		function  getProductType(){
			
			  $("#productTypeTree").empty();
			  var productTypeTree = $("#productTypeTree");	 		  
			  var optionsProductType = {
					animate : true,
					width:'250',
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
						getProductLine('');
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
						getProductLine(productLineUrl);
						
						$("#partnerValue").attr("value", id);
						
					}
				});
		  }
		
		//获取产品系列	
		function getProductLine(url){
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
			
		}
		
		//设备型号
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
					width : '250',
				};
			$productModelDiv.formSelect(optionProductModel);
		}
		function loadTable(url){
	    	var $field = $("#taskTable");
			var options = {
				url : url,
//				modiUrl : ctx+"/indicatorProduct/modiIndicatorProduct",
//				delUrl : ctx+"/indicatorProduct/delIndicatorProduct",
				domainCode : ["isFlag"],
				enableCRUD : false,
				bFilter:false,
				enableDomain : [false,false,false,false,false,false,false],
				dtCallBack:function(){
			 		 $("a[name='delproductIndicator']").unbind('click').bind("click",delproductIndicator);
			 		 $("a[name='modiProductIndicator']").unbind('click').bind('click',modiProductIndicator);
					},
//				mDataEX : ["id","indicatorName","productTypeName","partnerName","partnerLineName","productModelName", "isImportantIndicator","address","indicatorMark"]
				mData : [
						
						 {"mData":"productTypeName"},
						 {"mData":"partnerName"},
						 {"mData":"productModelName"},
						 {"mData":"indicatorName"},
						 {"mData":"address"},
						 {"mData":"indicatorMark"},
						 { "mData": "id","mRender": function (data) {
			            	  var rstatus='';
			            	  var id = data;
			          		  rstatus="<a name ='modiProductIndicator'   role='button' data-toggle='modal'  id='"+id+"'>" +
			          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
			          		  		"<a name='delproductIndicator' href='#' id='"+id+"'>&nbsp" +
			          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
			          		  return rstatus;
			          		  
			              } }]
			};
			$field.dataTableEX(options);
			
		}
		
		function reload(url){
			$("#taskTable").dataTableEX("ReDraw",url);
		}
	
	};
	function creatProductIndicator(){
		var frameSrc = ctx+"/indicatorProduct/addIndicatorProduct"; 
		$('.edit_list').load(frameSrc);
	}
	function modiProductIndicator(){
		var frameSrc = ctx+"/indicatorProduct/modiIndicatorProduct?id="+$(this).attr("id"); 
		$('.edit_list').load(frameSrc);
	}
	
	function RefreshTable(){
		$('#edit_list').empty();
		$('.edit_list').load(ctx +'/indicatorProduct/indicatorProductManage?tmp=' + Math.random());
		} 
	
	function delproductIndicator (){
		
		  if(!confirm("确定删除吗？")){
		        return;
	          }
		  
		  $.ajax({
         	  url:ctx + "/indicatorProduct/delIndicatorProduct?id=" +$(this).attr("id"), 
	          data: "", // 从表单中获取数据
	          type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
	          beforeSend: function()          // 设置表单提交前方法
	                {
	                  //  new screenClass().lock();
	                },		                		           		 
	               error: function(request) {     // 设置表单提交出错
             	    RefreshTable();
             	    $('#alertMsg').empty();		                	 
	         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();
	         		    });
                },
	               success: function(data) {
	                // 设置表单提交完成使用方法
	               // 	alert("表单提交成功"+data);
	            		    RefreshTable();
	                		$('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();  
		         		    	
		         		    });
	                 }
           });
		  
		
		
		
	}
	
	
