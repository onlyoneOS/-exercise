define(function(require, exports, module) {

	 var $ = require("jquery");
	 require("uic_Dropdown");
	 require("formTree");
	 require("bootstrap-datetimepicker");
	 require("jquery.form");
	
	 require("formUser");
	 require("formSelect");
	 require("easyui");
	/**
	 *  页面接口
	 */	
	exports.init = function(){
					 	
		   $("document").ready(function(){
			   
				 var flag=true; 
					 
				 $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
					 flag=true;
					 var deviceName = $('#deviceName').val() ;					 
					 var productTypeId =  $('#productTypeId').val();					 
					 if(deviceName != null&& deviceName != "" && productTypeId != null && productTypeId != ""){
						 $(this).tab('show');
						 var sid =  $(this).attr("id");
						 if(sid == "more"){
							 $("#basicMsg").hide();
					    	 $("#moreMsg").show();
						 }else{
							 $("#basicMsg").show();
					     	 $("#moreMsg").hide();
						 }
					 } else {
						 
						 $('.nav-tabs a:first').tab('show');
						 if(flag){
							 $.messager.alert('提示','请您先保存基本信息!');
							 flag=false;
						 }
					 }
			
				  });
				 
			
			  	 $("#reset").unbind("click").click(function(){  		
		   		        $('#edit_list').empty();
		   		        $('#edit_list').load(ctx + '/airConditioner/airConditionalManagePage?tmp=' + Math.random());
		   	   
			  	 });
			  	 
			/*     $("#basic").unbind('click').click(function(){
				   		   		     		  	    	 
				    	 $("#basicMsg").show();
				     	 $("#moreMsg").hide();
		         });
			   
			     $("#more").unbind('click').click(function(){
				   		    	 
				    	 $("#basicMsg").hide();
				    	 $("#moreMsg").show();
				 });*/
			   $("#modiSite1").unbind('click').click(function(){
				   
				     var deviceName = $('#deviceName').val() ;					 
					 var productTypeId =  $('#productTypeId').val();					 
					 if(deviceName == null || deviceName == "" || productTypeId == null || productTypeId == ""){
						 $('.nav-tabs a:first').tab('show');
						 $.messager.alert('提示','请您先保存基本信息!');
						 return;
					 }
					 
					 $("#more").tab('show');
					 $("#basicMsg").hide();
			    	 $("#moreMsg").show();
				 });
			      
			     $("#modiSite").unbind('click').click(function(){
			    	 //名称验证
			    	//  var flag = nameValidate();			    	  
			    	  //设备型号验证
			    	//  var  modelFlag = productModelValidate();			    	 
			    	 // if(flag)  return;			    	  
			    	 // if(modelFlag)  return;

			    	  var deviceId = $("#deviceId").val();	
			    	  $("#devicePrincipalId").attr("value", $("#formUser").formUser("getValue"));
					  var url = ctx+"/airConditioner/updateRoomDevice?deviceId="+deviceId;		  	  
					  $("#modiForm").ajaxSubmit({
						  url:url,
						  type:"post",
						  success : function(re){
							var pUrl = ctx + '/airConditioner/airConditionalManagePage?tmp=' + Math.random();
							$('#edit_list').empty();
				   		    $('#edit_list').load(pUrl);				   	   
						  }
					 });
					  
				  });

		
			    //datatime日期组件
			     $('#dateTimeInstall').datetimepicker({
				    	pickTime: false
		
				    });
			     $('#dateTimeProduct').datetimepicker({
				    	pickTime: false
		
				    });
			  
				
				//所属组织及机房下拉树
			    getOrgAndRoomTree();
			    
			    //空调类型
			    getProductType();
					
				//选择厂商信息
				var  productTypeId = $('#productType').val();
				getPartnerInfo(productTypeId);
			   
		
				//系列初始化	  
				var productUrl = '';
				var partnerId = $('#partnerId').val();
				//var partnerBrandId = $("#brandId").val();
				if((partnerId != "")&&(partnerId != null)){
							productUrl = ctx+'/base/productline/getTree?partnerId='+partnerId;
					}
				getProductLine(productUrl);
					 		
				//初始化设备型号
				getProductModel();
							
			    //org所属组织
				getOrgTree();	
				
				//选人组件
				getUser();	
				
				//格式验证
			    $("#deviceName").unbind('blur').blur(function(){				   
			    	    // nameValidate();
				   });
					
				    			    	  		    	  
			 });
	
	  }	 ; 

  /**
   *  获取组织及机房下拉树
   */
    function  getOrgAndRoomTree(){
    	    
    	var orgTree = $("#roomId");
		var optionsOrg = {
			inputName : 'roomName',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			tree_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 顶层
			asyncUrl : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 异步
			search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
			find_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 精确定位
			url : '',
			asyncParam : ["id"],
			addparams : [{
						name : "orgParentId",
						value : "root"
					}],
			async : true,
			inputChange:function(){					
				var  orgSelectId = orgTree.formTree("getValue");
				$("#realRoomId").attr("value", orgSelectId);
				//alert("orgSelectId      "+orgSelectId);
			//	alert("roomId           "+$("#roomIdValue").val());
			
			}
			/*onSelect:function(){
				
				var  orgSelectId = orgTree.formTree("getValue");
				$("#realRoomId").attr("value", orgSelectId);
			}*/

		};
		
			optionsOrg.resIds = $('#realRoomId').val();
			optionsOrg.inputValue = $('#realRoomName').val();
			
			orgTree.formTree(optionsOrg);
    	 
      }
    
    /**
     *  获取空调类型
     */
      function   getProductType(){
      	$("#productTypeDiv").formTree({	
      		inputName : 'productTypeName',
      		inputValue : $('#productTypeName').val(),
      		Checkbox : false,
      		animate : true,
      		searchTree : true,
      		tree_url : ctx+"/base/productType/getTreeResource?resourceId=0102&tmp="+Math.random(),// 顶层
      		asyncUrl : ctx+"/base/productType/getTree",// 异步
      		search_url : ctx+"/base/productType/getTree",// 搜索
      		find_url :ctx+"/base/productType/getTree",// 精确定位
      		url : '',
      		asyncParam : ["id"],
      		onSelect:function(node){
      			var  productTypeId = node.id;
      			var  partnerUrl = ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId; //型号分组数据   			
      			getPartnerInfo(partnerUrl);
      			//alert("typeId      "+node.id);
      			getProductLine('');
      			$('#productTypeId').val(node.id);
      		},
      		addparams : [{
      					name : "productTypeId",
      					value : "root"
      				}],
      		async : true
      	});
      }
    
   /**
    *  所属组织下拉树
    */
    function   getOrgTree(){
    	var orgTree = $("#orgId");
		var optionsOrg = {
			//inputName : 'orgId',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			tree_url : ctx+'/formTree/getTreeOrg?random=1',// 顶层
			asyncUrl : ctx+'/formTree/getTreeOrg?random=1',// 异步
			search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
			find_url : ctx+'/formTree/getTreeOrg?random=1',// 精确定位
			url : '',
			asyncParam : ["id"],
			addparams : [{
						name : "orgParentId",
						value : "root"
					}],
			async : true,
			inputChange:function(){					
				var  orgSelectId = orgTree.formTree("getValue");
				$("#manageDeptId").attr("value", orgSelectId);
			//alert("orgSelectId      "+orgSelectId);
			//	alert("roomId           "+$("#roomIdValue").val());
			
			}
          /*  onSelect:function(){
				
				var  orgSelectId = orgTree.formTree("getValue");
				$("#manageDeptId").attr("value", orgSelectId);
			}*/
		};
			optionsOrg.resIds = $('#manageDeptId').val();
			optionsOrg.inputValue = $('#orgNameString').val();	
			orgTree.formTree(optionsOrg);
    }
      
  /**
   *  获取厂商信息
   */
    function  getPartnerInfo(productTypeId){

			$("#_sino_partner_div").empty();
			$("#_sino_partner_div").append('<input id="_sino_partner" name="_sino_partner" type="text" class="ultra-select-input3" data="0" />');
			
			var partnerName = $("#partnerName").val();
			$("#_sino_partner").attr("value", partnerName);
			//加载厂商
			$(".ultra-select-input3").uic_Dropdown({
				inputName : '_sino_partner',
				height:"auto",// 宽度
				title: "厂商",
				selecttitle:"从下列选择", //标题
				url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
				checkbox:false,
				branchtype:true,
				search:false,
				width:"300px",
				onSelect:function(id,value){
				var productLineUrl=ctx+'/base/productline/getTree?partnerId='+id+"&tmp="+Math.random();
 				//Ajax查出设备系列的默认值选中第一个
				$.ajax({
	                url:productLineUrl,  // 提交的页面
	                type: "POST",  // 设置请求类型为"POST"，默认为"GET"
	                async:false,
	                success: function(data) {
						console.info(data);
	                	var jsonStr = data;
	                	$('#productLineName').val(jsonStr[0].text);
	                	$('#productLine').val(jsonStr[0].id);
	                }
	            });
				
					getProductLine(productLineUrl);
					$('#partnerId').val(id);
					$('#brandId').val('');
					$('#productLine').val('');
				}
			});		
    }
    
    /**
     *  获取产品系列信息
     */
    function  getProductLine(url){
    	
			var beforProductLineName=$('#productLineName').val();
			$("#_sino_product_line").empty();
			$("#_sino_product_line").formTree({	
				inputValue :beforProductLineName,
				inputName : 'productLineName',
				Checkbox : false,
				animate : true,
				searchTree : true,
			
				tree_url : url,// 顶层
				search_url : url,// 搜索
				asyncParam : ["id"],
				onSelect:function(node){
					$('#productLineId').val(node.id);
					getProductModel( );
					//$('#productModelId').val('');					
				},
				async : true
			});	
	}
    
   /**
    *  获取设备型号
    */
    function getProductModel(){
    	
		$("#formSelectProductModel").empty();
		var $formSelectProductModel=$("#formSelectProductModel");
		var productTypeId = $('#productType').val();
		var partnerId = $('#partnerId').val();
		var brandId = $('#brandId').val();
		var productLineId = $('#productLineId').val();
		var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+productTypeId+"&partnerId="+partnerId+"&brandId="+brandId+"&productLineId="+productLineId;
		$formSelectProductModel.addClass("li_form");
		var optionProductModel = {
				inputName : "productModelName",
				inputValue:	$("#productModelId").val(),
				writeType : 'show',
				showLabel : false,
				url : productModelurl,
				onSelect:function(node){
					var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
					$('#productModelId').val(productModelId); 
				},
				width : "282"
			};
		$formSelectProductModel.formSelect(optionProductModel);
	}

    /**
     *  选人
     */
    function   getUser(){
    	var $field1 = $("#formUser");
		var optionss = {
			inputName : "userValues",
			showLabel : false,
			selectUser: false,
			name : "code",
			value : "root",
			width : 280
		}

		optionss.addparams = [ {
			name : "code",
			value : "root"
		} ];
		optionss.resIds = $('#devicePrincipalId').val();
		optionss.inputValue = $('#staffNameString').val();
		$field1.formUser(optionss);
    }

	/**
	 *  设备名称格式验证
	 */
	function  nameValidate(){		
		   var  msg = "<font size='2' color='red'>设备名称不能为空!</font>";
	       var  nameValue = $("#deviceName").val();
	       if(nameValue == ''){
	    	   $("#moreMsg").hide();
	    	   $("#basicMsg").show();		        		       
  		       $("#nameMsg").empty();
		       $("#nameMsg").show();
		       $("#nameMsg").append(msg);
		       $("#nameMsg").delay(2000).hide(0);
		       return  true;
  	    }
	       return false;
	}
	
	/**
	 *  设备型号非空验证
	 */
	function   productModelValidate(){
		  var  msg = "<font size='2' color='red'>设备型号不能为空!</font>";
		  var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
		  if(productModelId == ""){
			   $("#modelMsg").empty();
			   $("#modelMsg").show();
			   $("#modelMsg").append(msg);
			   $("#modelMsg").delay(2000).hide(0);
		       return  true;  	    
		  }
		       return  false;
			  
	}



})