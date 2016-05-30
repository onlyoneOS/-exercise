
	function loadAll() {
		var propertyValue=$("#propertyValue").val();

		$('#search').unbind('click').click(function() {
			var partnerType = $("#productTypeTree").formTree('getValue');
			var indicatorName = $("#indicatorName").formSelect('getValue')[0];
			
			url = ctx+"/propertyIndicator/getSearchpropertyIndicator?partnerType="+partnerType+"&indicatorName="+indicatorName+"&tmp=" + Math.random();
			reload(url);
		});
		$("#reload").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx+"/propertyIndicator/propertyIndicatorManage");
    	});
		
		getProductType();
		getIndicatorName('');
		
		function reload(url){
			$("#taskTable").dataTableEX("ReDraw",url);
		}
		
	    	var url = ctx+"/propertyIndicator/findAllPropertyIndicator";
	    	var $field = $("#taskTable");
			var options = {
				url : url,
				domainCode : ["indicatorDataType","indicatorUnit","isFlag"],
				enableCRUD : false,
				bFilter:false,
//				sSearchDef:"请输入指标名称",
				enableDomain : [false,false,true,true,false,false], //,false,false,"isFlag"
				dtCallBack:function(){
			 		 $("a[name='delIndicator']").unbind('click').bind("click",delIndicator);
			 		 $("a[name='modiIndicator']").unbind('click').bind('click',modiIndicator);
					},
				mData : [
				          	
			              { "mData": "indicatorName" },
			              { "mData": "productTypeName" },
			              { "mData": "indicatorDataType"},
			              { "mData": "indicatorUnit"},
			              { "mData": "indicatorDesc"},
			              { "mData": "id","mRender": function (data) {
			            	  var rstatus='';
			            	  var id = data;
			          		  rstatus="<a name ='modiIndicator'   role='button' data-toggle='modal'  id='"+id+"'>" +
			          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
			          		  		"<a name='delIndicator' href='#' id='"+id+"'>&nbsp" +
			          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
			          		  return rstatus;
			          		  
			              } }
			          ]
			
			
			};
			
			$field.dataTableEX(options);
			
			
	};
	function RefreshTable(){
		$('#edit_list').empty();
		$('.edit_list').load(ctx + '/propertyIndicator/propertyIndicatorManage?tmp=' + Math.random());
	} 
	
	function createIndicator(){
		var frameSrc = ctx+"/propertyIndicator/addPropertyIndicator"; 
		$('.edit_list').load(frameSrc);
	}
	 function modiIndicator(){
	    	$('#edit_list').load(ctx + "/propertyIndicator/modiPropertyIndicator?id=" +$(this).attr("id"));
			}
	 function delIndicator(){
		 
		  if(!confirm("确定删除吗？")){
		        return;
	          }
		  
		  $.ajax({
           	  url:ctx + "/propertyIndicator/delPropertyIndicator?id=" +$(this).attr("id"), 
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
						
						$("#productTypeTree").attr("value", typeId);
						getIndicatorName(typeId);
					
					}
			    };
				productTypeTree.formTree(optionsProductType);

		}
		
		//指标名称
		function  getIndicatorName(id){
			$("#indicatorName").empty();
			var $fieldindicatorName = $("#indicatorName");	 		  
			$fieldindicatorName.addClass("li_form");
			var optionDevTypes = {
				inputName : "indicatorName",
				writeType : 'show',
				width: "250", //高度
				showLabel : false,
				url : ctx+'/propertyIndicator/getIndicatorName?typeId='+id,
				inputValue:"all",
				onSelect :function(id){
					$("#indicatorName").attr("value", id);
				}  
			   
			};
			$fieldindicatorName.formSelect(optionDevTypes);
		}

	
