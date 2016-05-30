
	// var dataTable$ = require("dataTables");
    var table;
	function loadgrid(){
		var partnerType=$('#partnerType').val();
		var partnerId=$('#partnerId').val();
		var productModel=$('#productModel').val();
		//型号列表
		table=$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource":ctx+"/base/productModel/getList?tmp="+Math.random(), 
			"bRetrieve": true,
			"bSort": false,
			"bFilter": true,
			"sServerMethod": "POST",
			"aoColumns": [
						    { "mData": "productModel","mRender":function(data,row,obj){
						    	 
				          		  rstatus="<div style='float:left;' >" +
				          		  			  "<div style='display:block;float:left;'><a href='#' id ='"+obj.id+"' name='_sino_productModel_id'>"+data+"</a>&nbsp&nbsp&nbsp&nbsp&nbsp</div> " +
				          		  		  "</div>" ; 
				          		  return rstatus;
						    } },
							{ "mData": "productModelName" },
							{ "mData": "typeName" },
							{ "mData": "partnerName" },
							{ "mData": "productModel","mRender":function(data,row,obj){
				          		  rstatus="<div style='float:left;'>" +
				          		  		  "<a  id ='"+obj.id+"'  href='#'  data-toggle='modal'  name='_sino_partner_brand_edit'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				          		  		  "<a  id = '"+obj.id+"' href='#' name='_sino_partner_brand_del'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
				          		  		  "</div>";
				          		  return rstatus;
						    } }
						],
			"sDom": "<'row'<'bt5left'l><'bt5right partnersel'>r>t<'row'<'bt5left'i><'bt5right'p>>",
			"sPaginationType": "bootstrap",
			"oLanguage": {
				"sLengthMenu": "页显示_MENU_ ",
				"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
				"sSearch":"检索:",
				"sEmptyTable":"没有数据",
				"sInfoEmpty": "显示0条数据",
				"oPaginate":{
					"sPrevious": "",
					"sNext":''
				}

				
			},
			fnDrawCallback:function(){
				$('.partnersel').empty();
				
				$('a[name="_sino_productModel_id"]').unbind('click').click(function () {
					var id =this.id;
					detail(id);
				});
				$('a[name="_sino_partner_brand_edit"]').unbind('click').click(function () {
					var id =this.id;
					_createOrEdit(id);
				});
				$('a[name="_sino_partner_brand_del"]').unbind('click').click(function () {
					var id =this.id;
					remove(id);
				});
				
		/*		$('#taskTable tbody tr').each(function(){
					var tdd=$(this.childNodes[0]);
					var sss=$(tdd.children()[0]);
				    tdd.bind("mouseover",function(){
				    	$(sss.children()[1]).css('display','block'); 
				    });
				    
				    tdd.bind("mouseout",function(){
				    	$(sss.children()[1]).css('display','none'); 
				    });
				  
				});*/
			} 
		
		});
		
		
		$("#_sino_product_type").formTree({	
			
			inputName : '_sino_product_type',
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
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
				$('#partnerType').val(node.id);
				partnerType=node.id;
				//getPartnerBrand('');
				getProductModel();
			},
			addparams : [{
						name : "productTypeId",
						value : "root"
					}],
			async : true
		});
		
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId=",	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			width:'280px',
			onSelect:function(id,value){
			$("#_sino_partner_partnerId").val(id);
			}
		});
		
		/*
		 * 绑定触发事件
		 */
		 
		 $("#_sino_partner_productmodel_create").bind('click',function(){
			 _createOrEdit('');
         });
		 
		 $("#_sino_partner_model_search").bind('click',function(){
			 searchModelTable();
         });
		 $("#_sino_partner_model_reload").bind('click',function(){
			$('.edit_list').load(ctx+'/base/productModel/productModel_main?tmp='+Math.random());
         });
		 getProductModel();
	}
	
	function detail(id){
		$('.edit_list').load(ctx+'/base/productModel/productModel_detail?detailId='+id+'&tmp='+Math.random());
	}
	
	function _createOrEdit(id){
		$('.edit_list').load(ctx+'/base/productModel/productModel_saveOrUpdate?id='+id+'&tmp='+Math.random());
	}
	function remove(id){
			if ( confirm('确定要删除这条信息吗?') ){
				$.ajax({
					url: ctx+"/base/productModel/remove?id="+id,  // 提交的页面
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	searchModelTable();
		            	$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();  
	         		    	
	         		    });
		            	
		            }
				});
			}
	}
	
	function getPartnerInfo(productTypeId){
		$("#_sino_partner_div").empty();
		$("#_sino_partner_div").append('<input id="_sino_partner" type="text" class="ultra-select-input3" id="_sino_partner" data="0" />');
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
			$("#_sino_partner_partnerId").val(id);
			partnerId=id;
			getProductModel();
			}
		});
	}
	
	function getProductModel(){
		var $productModelDiv=$("#_sino_partner_product_name");
		$productModelDiv.empty();
		var partnerType=$('#partnerType').val();
		var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+partnerId+"&productLineId="+'';
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
	
	function searchTable(param){
		table.fnFilter(param,0 );
		//table.fnSort( [ [1,param] ] );
	}
	
	function searchModelTable(){
		var param  = "";
		var productType = $("#_sino_product_type").formTree('getValue');
		var partner = $(".ultra-select-input3").uic_Dropdown('getValue').id;
		var productName = $('#_sino_partner_product_name_i').val();
		if(productType != null&&productType != ""){
			param += productType+"_"+"productType";
		}
		if(partner != null&&partner != ""){
			if(param == ""){
				param += partner+"_"+"partnerId";
			} else {
				param += ","+ partner+"_"+"partnerId";
			}
		}
		if(productName != null&&productName != ""){
			if(param == ""){
				param += productName+"_"+"productModelName";
			} else {
				param += ","+ productName+"_"+"productModelName";
			}
		}
		table.fnFilter(param,0 );
	
	}
