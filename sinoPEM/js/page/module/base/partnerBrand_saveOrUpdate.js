define(function(require, exports, module) {
	var $ = require("jquery");
	var uic$ = require("uic_Dropdown");
	require("bootstrap");
	require("formTree");
	$= require("easyui");
//	require("coverage");
	require("formSubmit");
	
	/*
	    * 上传图片用
	    */
	   require("swfupload");
	   require("queue");
	   require("fileprogress");
	   require("callbacks");
	   require("fileTypeMaps");
	   require("tangram");
	function loadgrid(){
		var partnerHref = '';
		var partnerTypeUrl = ''
		var brandId = $('#_partner_brand_id').val();
		if(brandId == null||brandId == ""){
			partnerHref = ctx+"/base/partnerInfo/getAll?productTypeId=";
			partnerTypeUrl = ctx+"/base/productType/getTree";
		}
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			width:"280", //高度
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:partnerHref,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			onSelect:function(id,value){
				$("#_partner_brand_partnerId").val(id);
			}
		});
		
		$("#_sino_product_type").formTree({	
			
			inputName : '_sino_product_type',
			inputValue : $('#_partner_brand_productTypeName').val(),
			//labelName : 'formTree',
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			required :true,
		
			tree_url : ctx+"/base/productType/getTree?tmp="+Math.random(),// 顶层
			asyncUrl : ctx+"/base/productType/getTree",// 异步
			search_url : ctx+"/base/productType/getTree",// 搜索
			find_url :ctx+"/base/productType/getTree",// 精确定位
			url : '',
			asyncParam : ["id"],
			onSelect:function(node){
				$("#_partner_brand_productType").attr("value",node.id);
			},
			addparams : [{
						name : "productTypeId",
						value : "root"
					}],
			async : true
		});
		
		/*
		 * 绑定触发事件
		 */
		 $("#_create_partner_brand_back").bind('click',function(){
			 _back();
         });
		 $("#_sino_partner_brand_logo").bind('click',function(){
				upload();
	       });
		 
		 $("#_sino_partner_brand_add").bind('click',function(){
				_add();
	       });

		 $(".ultra-select-input3").val($('#_partner_brand_partnerName').val());
		 $(".searchInputText2").val($("#_partner_brand_productTypeName").val())

	}
	
	function upload(){
		var dialogStr = '<div id = "_sino_partner_uploadPic"></div>';
		$(dialogStr).appendTo('#_sino_partner_brand_pic');
		$('#_sino_partner_uploadPic').dialog({
		    title: '上传图片',
		    width: 593,
		    height: 456,
		    closable: false,
		    href: ctx+'/baseUpload/baseUploadPic?tmp='+Math.random(),
		    buttons:[{
				text:'关闭',
				handler:function(){
		    	_window_close();
		    		$(this).parents('.panel-body').dialog('destroy');
				}
			}]
		});
	}
	function _back(){
		//$('.edit_list').load(ctx+'/base/partnerBrand/partnerBrand_main?tmp='+Math.random());
		var options = {};
		options.murl = 'base/partnerBrand/partnerBrand_main';
		$.openurl(options);
	}
	function _add(){
		var url = ctx+'/base/partnerBrand/saveOrUpdate?tmp='+Math.random();
		$("#_sino_partner_brand_add_form").form('submit',{
	    	url:url,
	    	onSubmit:function(){
				var options = {};
				options.formId = "_sino_partner_brand_add_form";
				return $.formSubmit.doHandler(options);
	    	},
            success: function(data) {
                // 设置表单提交完成使用方法
                   if(data != "fail"){
                	   _back();
                    }
                }
	    });
	}
	function _sino_partner_product(id){
		$("#_sino_partner_product").empty();
		var $fieldCompDevType = $("#_sino_partner_product");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerProduct",
			writeType : 'show',
			showLabel : false,
			url : ctx+"/confPartner/getProductByPartner?partnerId="+id+"&tmp="+Math.random(),
			width : "200",
			inputChange : true,
			onSelect :function(){
			//alert($("#_sino_partner_product").formSelect("getValue"));
		}
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
	}
	
	exports.init = function(){
		loadgrid();  
	}
});