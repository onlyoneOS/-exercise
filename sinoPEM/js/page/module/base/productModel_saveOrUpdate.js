	function loadAll(){
		
		/* var b = true;
		 var bt = true;
		 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			 b = true;
			 if($('#_productModelId').val() != null&&$('#_productModelId').val() != ""){
				 $(this).tab('show');
				 if(bt){
					 saveOrUpdate();
					 bt = false;
				 }
			 } else {
				 
				 
				 //$('.nav-tabs a:first').tab('show'); 
				 var options = {};
					options.formId = "_sino_partner_productModel_add_form";
					if($.formSubmit.doHandler(options)&&b){
						saveOrUpdate();
						 b = false;
					} else {
						$('.nav-tabs a:first').tab('show');
						 b = false;
					}
			 }
			});*/
		 
		 
		/*
		 * 绑定触发事件
		 */
		  $("#_sino_partner_cancle").bind('click',function(){
			 $('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
         });
		 
		 $("#_sino_partner_product_back").bind('click',function(){
			 $('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
         });
	    $("#_sino_partner_productModel_addb").bind('click',function(){
			saveOrUpdate();
		 });
	    
	    var divList = $("._domainCode");
	    for(var i = 0;i < divList.length;i++){
	    	var obj = divList[i];
	    	var codeName = $(obj).attr("name");
	    	var divIdA = $(obj).attr("id");
	    	var inputIdA = parseInt(divIdA) - 2013;
	    	var $fieldDataTypes = $(obj);
			$fieldDataTypes.addClass("li_form");
			var optionDataTypes = {
				writeType : 'show',
				showLabel : false,
				code : codeName,
				width : "282",
				onSelect :function(id,obj){
					var divIdB = $(obj).parent().parent().parent().parent().attr("id");
					var inputIdB = parseInt(divIdB) - 2013;
					$('#'+inputIdB).val(id);
				}
			};
			$fieldDataTypes.formSelect(optionDataTypes);
			$fieldDataTypes.formSelect('setValue',$('#'+inputIdA).val());
	    	
	    }
	    
	    $("#_sino_partner_productModel_addg").bind('click',function(){
	    	$('.nav-tabs a:last').tab('show');
		 });
	    $("#_sino_partner_productModel_addbg").bind('click',function(){
	    	$('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
		 });

	}
	
	function getPartnerInfo(productTypeId){
		$("#_sino_partner_div").empty();
		$("#_sino_partner_div").append('<input id="_sino_partner" type="text" class="ultra-select-input3" data="0" data-content="请选择厂商" required />');
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			width:'280px',
			onSelect:function(id,value){
				$('#_partnerId').val(id);
				//reloadTree("partnerId",id);
			}
		});
	}
		//类型
		$("#_sino_product_type").formTree({	
			inputName : '_sino_product_type',
			inputValue : $('#_sino_productTypeName').val(),
			Checkbox : false,
			animate : true,
			searchTree : true,
			required : true,
		
			tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
			search_url : ctx+"/base/productType/getTree",// 搜索
			url : '',
			asyncParam : ["id"],
			onSelect:function(node){
				$('#_partnerId').val('');
				getPartnerInfo(node.id);
				$('#_productType').val(node.id);
			},
			async : true
		});

	
	function saveOrUpdate(){
		var url = ctx+'/base/productModel/saveOrUpdate?tmp='+Math.random();
		$("#_sino_partner_productModel_add_form").form('submit',{
	    	url:url,
	    	onSubmit:function(){
			var options = {};
			options.formId = "_sino_partner_productModel_add_form";
			return $.formSubmit.doHandler(options);
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data != "fail"){
                	   $('#_productModelId').val(data);
                	   $('#_productModelDataId').val(data);
                	
                	
                	   var productTypeId = $('#_productType').val();
                	   var partnerId  = $('#_partnerId').val();
                	   var productLineId = $("#_productLine").val();
                	   
                	   
                	   var queryString = $.param({
                       	"productModelId": data,
                       	"productTypeId": productTypeId,
                       	"partnerId": partnerId,
                       	"productLineId": productLineId
                   		}, true);
               			var href = ctx + "/base/productModelData/getProductModelExp";
               			$.post(href, queryString, function(data){
               				var dataCategory = new Array();
               				var dataCategorys = new Array();
               				if(data){
               					for(var i = 0;i < data.length;i++){
               						var domainIds = new Array();
                       				var domainCodes = "";
               						var categoryId = data[i].categoryId;
               						var dateId = new Date().getTime();
               	           			var dataTypeId = data[i].dataTypeId;
               						var attributeName = data[i].attributeName;
               						var mapColumn = data[i].mapColumn;
               						var domainCode = data[i].domainCode;
               						var str = '';
               	           			var domainId = dateId+1;
               	           			if(categoryId == ""||categoryId == null){
	               	           			if(dataTypeId == 10){
	               	           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	               	               				+'<div class="control-group">'
	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	               	               				+'<div class="controls">'
	               	               				
	               	               				+'<div class="input-append date">'
	               	               				+'<input data-format="yyyy-MM-dd" type="text"  name="'+mapColumn+'"></input>'
	               	               				+'<span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>'
	               	               				+'</div>'
	               	               				
	               	               				+'</div></div></div>';
	               	           			} else if(dataTypeId == 4){
		               	           			domainIds.push(dateId);
		               	           			domainCodes+=domainCode+",";
	               	           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	               	               				+'<div class="control-group">'
	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	               	               				+'<div class="controls">'
	               	               				+'<div id="'+dateId+'"></div>'
	               	               				+'<input type="hidden" id="'+domainId+'" name="'+mapColumn+'" />'
	               	               				+'</div></div></div>';
	               	           			} else {
	               	           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	               	               				+'<div class="control-group">'
	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	               	               				+'<div class="controls">'
	               	               				+'<input type="text" class="input-medium" name="'+mapColumn+'" placeholder="请填写'+attributeName+'">'
	               	               				+'</div></div></div>';
	               	           			}
               	           			} else {
               	           				dataCategory.push(data[i].categoryId);
               	           				dataCategorys.push(data[i]);
               	           			}
               	           			$('#_sino_partner_productModelData_add_form').append(str);
               	           			
	               	           		for(var n = 0;n < domainIds.length;n++){
	           							var dateId = domainIds[n];
	           							var domainId = dateId+1;
	           							var domainCodess = domainCodes.split(",");
	           							var dataTypes = $('#'+dateId);
	                    				dataTypes.addClass("li_form");
	                    				var optionTypes = {
	                    					inputName : "",
	                    					writeType : 'show',
	                    					showLabel : false,
	                    					code : domainCodess[n],
	                    					width : "282",
	                    					onSelect :function(id,obj){
                        						$('#'+domainId).val(id);
                        					}
	                    				};
	                    				dataTypes.formSelect(optionTypes);
	                    			}
               					}
               					
               					var dataTest={};	
               					var desiredArr=new Array();  
               					for(var i=0;i<dataCategory.length;i++){  
               						dataTest[dataCategory[i]]=dataCategory[i];  
               					} 
               					
               					for(var pro in dataTest){  
               						desiredArr.push(dataTest[pro]);
               					} 
               					
               					for(var i in desiredArr){
               						
               						var domainIds = new Array();
                       				var domainCodes = "";
               						
               						var str = '';
               						var categoryId = desiredArr[i];
               						var categoryName = "";
               						for(var m = 0;m < data.length;m++){
               							if(categoryId == data[m].categoryId){
               								categoryName = data[m].categoryName;
               							}
               						}
               						str ='<div class="row"></div>'
           	           					+'<div class="col-lg-4">' 
           	           					+'<h4>'+categoryName+'</h4>';
               	           				for(var j = 0;j < data.length;j++){
	               	           				var dateId = new Date().getTime();
		               	           			var dataTypeId = data[j].dataTypeId;
		               						var attributeName = data[j].attributeName;
		               						var mapColumn = data[j].mapColumn;
		               						var domainCode = data[j].domainCode;
		               	           			var domainId = dateId+1;
               	           					if(categoryId == data[j].categoryId){
	               	           					if(dataTypeId == 10){
	    	               	           				str += '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	    	               	               				+'<div class="control-group">'
	    	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	    	               	               				+'<div class="controls">'
	    	               	               				
	    	               	               				+'<div class="input-append date">'
	    	               	               				+'<input data-format="yyyy-MM-dd" type="text"  name="'+mapColumn+'"></input>'
	    	               	               				+'<span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>'
	    	               	               				+'</div>'
	    	               	               				
	    	               	               				+'</div></div></div>';
	    	               	           			} else if(dataTypeId == 4){
		    	               	           			domainIds.push(dateId);
				               	           			domainCodes+=domainCode+",";
	    	               	           				str += '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	    	               	               				+'<div class="control-group">'
	    	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	    	               	               				+'<div class="controls">'
	    	               	               				+'<div id="'+dateId+'"></div>'
	    	               	               				+'<input type="hidden" id="'+domainId+'" name="'+mapColumn+'" />'
	    	               	               				+'</div></div></div>';
	    	               	           			} else {
	    	               	           				str += '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
	    	               	               				+'<div class="control-group">'
	    	               	               				+'<label class="control-label" for="partnerCode">'+attributeName+':</label>'
	    	               	               				+'<div class="controls">'
	    	               	               				+'<input type="text" class="input-medium" name="'+mapColumn+'" placeholder="请填写'+attributeName+'">'
	    	               	               				+'</div></div></div>';
	    	               	           			}
               	           					}
               	           				}
               						str+='</div>';
               						$('#_sino_partner_productModelData_add_form').append(str);
               						$('.date').datetimepicker({
               					    	pickTime: false
               					    });
               						
               						for(var n = 0;n < domainIds.length;n++){
               							var copydateId = domainIds[n];
               							var domainCodess = domainCodes.split(",");
               							var dataTypes = $('#'+copydateId);
                        				dataTypes.addClass("li_form");
                        				var optionTypes = {
                        					inputName : "",
                        					writeType : 'show',
                        					showLabel : false,
                        					code : domainCodess[n],
                        					width : "282",
                        					onSelect :function(id,obj){
                        						var divId = $(obj).parent().parent().parent().parent().attr("id");
                        						var copyDomainId = parseFloat(divId)+1;
                        						$("#"+copyDomainId).val(id);
                        					}
                        				};
                        				dataTypes.formSelect(optionTypes);
	                    			}
               					}
               					
               				}
               			});
                	   
                	   $('.nav-tabs a:last').tab('show');
                    }
					$('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
                }
	    });
	}
	

