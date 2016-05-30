
	function load(){
		//类型
		$("#_sino_product_type").formTree({	
			
			inputName : '_sino_product_type',
			inputValue : $('#_sino_productTypeName').val(),
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			required : true,
		
			tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
			search_url : ctx+"/base/productType/getTree",// 搜索
			url : '',
			asyncParam : ["id"],
			onSelect:function(node){
				getPartnerInfo(node.id);
				getPartnerBrand('');
				getProductLine('');
				$('#_productType').val(node.id);
				$('#_partnerId').val('');
				$('#_brandCode').val('');
				$('#_productLine').val('');
			},
			async : true
		});
		var brandUrl = '';
		if($('#_productModelId').val() != ""&&$('#_productModelId').val() != null){
			brandUrl = ctx+'/base/partnerBrand/getSelectListByPartner?partnerId='+$('#_partnerId').val();
		}
		//品牌
		var $fieldCompDevType = $("#_sino_partner_brand");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"280", //高度
			url : brandUrl,
			onSelect :function(){
				var str = $("#_sino_partner_brand").formSelect("getValue")+"";
				var idAndName = str.split(",");
				$('#_brandCode').val(idAndName[0]);
			}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$("#_sino_partner_brand").formSelect('setValue',$('#_brandCode').val());
		
		
		var productUrl = '';
		if($('#_productModelId').val() != ""&&$('#_productModelId').val() != null){
			if($('#_brandCode').val() != ""&&$('#_brandCode').val() != null){
				productUrl = ctx+'/base/productline/getTree?partnerBrandId='+$('#_brandCode').val();
			} else {
				productUrl = ctx+'/base/productline/getTree?partnerId='+$('#_partnerId').val();
			}
		} 
		//系列
		$("#_sino_product_line").formTree({	
			inputName : '_sino_product_line',
			inputValue : $('#_sino_productLineName').val(),
			Checkbox : false,
			animate : true,
			searchTree : true,
		
			tree_url : productUrl,// 顶层
			search_url : productUrl,// 搜索
			asyncParam : ["id"],
			onSelect:function(node){
				$('#_productLine').val(node.id);
			},
			async : true
		});	
		
		 $('.date').datetimepicker({
	    	pickTime: false
	    });
		
		 
		 var b = true;
		 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
			 b = true;
			 if($('#_productModelId').val() != null&&$('#_productModelId').val() != ""){
				 $(this).tab('show');
			 } else {
				 $('.nav-tabs a:first').tab('show'); 
				 if(b){
					 $.messager.alert('提示','请点击下一页查看!');
					 b = false;
				 }
			 }
			})
		 
		/*
		 * 绑定触发事件
		 */
		 
		 $("#_sino_partner_product_back").bind('click',function(){
			 $('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
         });
		 $("#_sino_partner_productModel_add").bind('click',function(){
			 saveOrUpdate();
         });
		 $("#_sino_base_icon").bind('click',function(){
	    	upload(this);
		 });
	    $("#_sino_base_big").bind('click',function(){
	    	upload(this);
		 });
	    $("#_sino_partner_product_addExpand").bind('click',function(){
	    	productModelAddExpand();
		 });
	    
	    $("#_sino_partner_productModel_addb").bind('click',function(){
	    	addProductModelData();
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
			if($fieldDataTypes.formSelect('getValue') != null&&$fieldDataTypes.formSelect('getValue') != ""){
				var idAndName = $fieldDataTypes.formSelect('getValue')+"";
				var opt = idAndName.split(",");
				var divTextId = parseInt(divIdA) + 1;
				$("#"+divTextId).html(opt[1]);
			}
	    	
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
			selecttitle:"", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			width:'280px',
			onSelect:function(id,value){
				getPartnerBrand(ctx+"/base/partnerBrand/getSelectListByPartner?partnerId="+id+"&tmp="+Math.random());
				getProductLine(ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random());
				$('#_partnerId').val(id);
				$('#_brandCode').val('');
				$('#_productLine').val('');
				//reloadTree("partnerId",id);
			}
		});
	}
	function getPartnerBrand(url){
		$('#_sino_partner_brand').empty();
		var $fieldCompDevType = $("#_sino_partner_brand");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			width:"280", //高度
			showLabel : false,
			url : url,
			inputChange : true,
			onSelect :function(){
				var str = $("#_sino_partner_brand").formSelect("getValue")+"";
				var idAndName = str.split(",");
				getProductLine(ctx+'/base/productline/getTree?partnerBrandId='+idAndName[0]+"&tmp="+Math.random());;
				$('#_brandCode').val(idAndName[0]);
		}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		
		var index1 = url.indexOf("partnerId");
		if(index1 != -1){
			var infinityid = $('#_sino_partner_brand').find("li").first().attr("infinityid");
			if(infinityid){
				$("#_sino_partner_brand").formSelect('setValue',infinityid);
				$('#_brandCode').val(infinityid);
			}
		}
	}
	function getProductLine(url){
		$("#_sino_product_line").empty();
		var index1 = url.indexOf("partnerId");
		if(index1 != -1){
			$.ajax({
	            type: "GET",
	            url: url,
	            data: "{}",
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
					if(data){
						$('#_sino_product_line').find("input").first().attr("value",data[0].text);
					}
	            },
	            error: function (msg) {
	            }
	        });
		}
		$("#_sino_product_line").formTree({	
			inputName : '_sino_product_line',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
		
			tree_url : url,// 顶层
			search_url : url,// 搜索
			asyncParam : ["id"],
			onSelect:function(node){
				$('#_productLine').val(node.id);
			},
			async : true
		});	
	}
	
	function upload(obj){
		var href = ctx+'/baseUpload/baseUploadPic?tmp='+Math.random();
		if(obj.id == '_sino_base_big'){
			href+='&big=t';
		}
		var id = obj.id + "_uploadPic";
		var dialogStr = '<div id = "'+id+'"></div>';
		$(dialogStr).appendTo('#basic');
		$('#'+id).dialog({
		    title: '上传图片',
		    width: 593,
		    height: 456,
		    href: href,
		    closable: false,
		    buttons:[{
				text:'关闭',
				handler:function(){
		    	_window_close();
		    		$(this).parents('.panel-body').dialog('destroy');
				}
			}]
		});
	}
	
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
                	   
                	var str = '';
                	var attributeName = "11";
                	var mapColumn = "22";
                	var domainCode = 'basePartnerinfo';
                	var dataTypeId = 9;
           			var dateId = new Date().getTime();
           			var domainId = dateId+1;
           			if(dataTypeId == 10){
           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
               				+'<div class="control-group">'
               				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
               				+'<div class="controls">'
               				
               				+'<div id="'+dateId+'" class="input-append date">'
               				+'<input data-format="yyyy-MM-dd" type="text"  name="'+mapColumn+'"></input>'
               				+'<span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>'
               				+'</div>'
               				
               				+'</div></div></div>';
           			} else if(dataTypeId == 9){
           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
               				+'<div class="control-group">'
               				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
               				+'<div class="controls">'
               				+'<div id="'+dateId+'"></div>'
               				+'<input type="hidden" id="'+domainId+'" name="'+mapColumn+'" />'
               				+'</div></div></div>';
           			} else {
           				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
               				+'<div class="control-group">'
               				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
               				+'<div class="controls">'
               				+'<input type="text" class="input-medium" name="'+mapColumn+'" placeholder="请填写'+attributeName+'">'
               				+'</div></div></div>';
           			}
           			$('#_sino_partner_productModelData_add_form').append(str);
           			if(dataTypeId == 9){
           				var dataTypes = $('#'+dateId);
           				dataTypes.addClass("li_form");
           				var optionTypes = {
           					inputName : "",
           					writeType : 'show',
           					showLabel : false,
           					code : domainCode,
           					width : "282",
           					onSelect :function(){
           						$('#'+domainId).val($('#'+dateId).formSelect("getValue")[0]);
           					}
           				};
           				dataTypes.formSelect(optionTypes);
           			} else if(dataTypeId == 10){
           				$('#'+dateId).datetimepicker({
               		    	pickTime: false
               		    });
           			}
                	   
                	   $('.nav-tabs a:last').tab('show');
                    }
                }
	    });
	}
	function productModelAddExpand(){
		var productModelId = $('#_productModelId').val();
		var str = "<div id='_sino_productModel_addExpand_main' style='width:500px;height:400px;' class='modal hide fade' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' data-dismiss='modal' aria-hidden='true'></div>";
			$("#_sino_productModel_addExpand_div").empty();
        	$("#_sino_productModel_addExpand_div").append(str);
        	var url = ctx+"/base/productModelData/productModelData_main?productModelId="+productModelId+"&tmp="+Math.random();
            $("#_sino_productModel_addExpand_main").load(url, function(){
            	var saveObject = $("#_sino_productModel_addExpand_main").contents().find("#_sino_productModel_data_add"); 
            	saveObject.unbind('click').click(function(){
            		//$('#_sino_productModel_addExpand_main').modal('hide');
            		
            		var strInt = $('#_sino_productModel_strInt').val();
            		var numInt = $('#_sino_productModel_numInt').val();
            		var dateInt = $('#_sino_productModel_dateInt').val();
            		
            		var str = $("#formSelectDataType").formSelect("getValue")+"";
    				if(str == ""||str == ","){
    					$.messager.alert('提示','请选择数据类型!');
            			return;
    				}
            		var idAndName = str.split(",");
    				var dataTypeId = idAndName[0];
            		
    				if(dataTypeId == 6&&strInt >= 30){
            			$.messager.alert('提示','字符串属性已达最大量!');
            			return;
            		}
            		if(dataTypeId == 5&&numInt >=  15){
            			$.messager.alert('提示','数字属性已达最大量!');
            			return;
            		}
            		if(dataTypeId == 10&&dateInt >= 5){
            			$.messager.alert('提示','时间属性已达最大量!');
            			return;
            		}
            		
            		var productModelId = $('#_productModelId').val();
            		var attributeName = $('#indicatorName').val();
            		var mapColumn = '';
            			
    				if(dataTypeId == 6||dataTypeId == 9){
    					var i = parseInt(strInt)+1;
    					mapColumn = "Text_Data_"+i;
    				} else if(dataTypeId == 5){
    					var i = parseInt(numInt)+1;
    					mapColumn = "Number_Data_"+i;
    				} else if(dataTypeId == 10){
    					var i = parseInt(dateInt)+1;
    					mapColumn = "Date_Data_"+i;
    				}
    				var normCategoryName = dataTypeId;
    				//配置指标属性
    				var partnerId = $('#_partnerId').val();
    				var productType = $('#_productType').val();
    				var brandId = $('#_brandCode').val();
    				var productLine = $('#_productLine').val();
    				var indicatorDataType = $("#formSelectDataType").formSelect("getValue")[0];
    				var domainCode = "";
    				
    				if(dataTypeId == 9){
    					domainCode = $("#typeCode").formSelect("getValue")[0];
    				}                                                      
    				                                                       
    				var compDevType = $("#formSelectCompDevType").formSelect("getValue")[0];
    				if(compDevType == ""||compDevType == null){
    					compDevType = "0";
    				}
    				var indicatorCategory =  $("#formSelectIndicatorCategory").formSelect("getValue")[0];
    				var indicatorUnit = $('#indicatorUnit').val();
    				var indicatorDesc = $('#indicatorDesc').val();
    				
    				//alert(mapColumn);
            		var queryString = $.param({
                    	"productModelId": productModelId,
                    	"attributeName": attributeName,
                    	"mapColumn": mapColumn,
                    	"normCategoryName": dataTypeId,
                    	"domainCode":domainCode,
                    	
                    	"partnerId": partnerId,
                    	"productType": productType,
                    	"brandId": brandId,
                    	"productLine": productLine,
                    	"indicatorDataType": indicatorDataType,
                    	"compDevType": compDevType,
                    	"indicatorCategory": indicatorCategory,
                    	"indicatorDesc": indicatorDesc,
                    	"indicatorUnit": indicatorUnit
                		}, true);
            		var href = ctx + "/base/productModelData/addProductInfoExp";
            		$.post(href, queryString, function(data){
            			var str = '';
            			var dateId = new Date().getTime();
            			var domainId = dateId+1;
            			if(dataTypeId == 10){
            				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
                				+'<div class="control-group">'
                				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
                				+'<div class="controls">'
                				
                				+'<div id="'+dateId+'" class="input-append date">'
                				+'<input data-format="yyyy-MM-dd" type="text"  name="'+mapColumn+'"></input>'
                				+'<span class="add-on"><i data-time-icon="icon-time" data-date-icon="icon-calendar"></i></span>'
                				+'</div>'
                				
                				+'</div></div></div>';
            			} else if(dataTypeId == 9){
            				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
                				+'<div class="control-group">'
                				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
                				+'<div class="controls">'
                				+'<div id="'+dateId+'"></div>'
                				+'<input type="hidden" id="'+domainId+'" name="'+mapColumn+'" />'
                				+'</div></div></div>';
            			} else {
            				str = '<div class="form-horizontal" style="float: left;margin-bottom: 28px;">'
                				+'<div class="control-group">'
                				+'<label class="control-label" for="partnerCode">'+attributeName+'</label>'
                				+'<div class="controls">'
                				+'<input type="text" class="input-medium" name="'+mapColumn+'" placeholder="请填写'+attributeName+'">'
                				+'</div></div></div>';
            			}
            			$('#_sino_partner_productModelData_add_form').append(str);
            			if(dataTypeId == 9){
            				var dataTypes = $('#'+dateId);
            				dataTypes.addClass("li_form");
            				var optionTypes = {
            					inputName : "",
            					writeType : 'show',
            					showLabel : false,
            					code : domainCode,
            					width : "282",
            					onSelect :function(){
            						$('#'+domainId).val($('#'+dateId).formSelect("getValue")[0]);
            					}
            				};
            				dataTypes.formSelect(optionTypes);
            			} else if(dataTypeId == 10){
            				$('#'+dateId).datetimepicker({
                		    	pickTime: false
                		    });
            			}
            			$('#_sino_productModel_addExpand_main').modal('hide');
		            });
      		  	});    
       		});      		
	}
	
	function addProductModelData(){
		var url = ctx+'/base/productModelData/saveOrUpdate?tmp='+Math.random();
		$("#_sino_partner_productModelData_add_form").form('submit',{
	    	url:url,
	    	onSubmit:function(){
	    		return $(this).form('validate');
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data != "fail"){
                	   $('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
                    }
                }
	    });
	}
	

