define(function(require, exports, module) {
	var $ = require("jquery");
	require("formSelect");
	var uic$ = require("uic_Dropdown");
	require("bootstrap");
	$= require("easyui");
	require("coverage");
	require("formSubmit");
	
	function loadgrid(){
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			width:"280", //高度
			title: "厂商",
			url:ctx+"/base/partnerInfo/getAll?productTypeId=",
			checkbox:false,
			branchtype:true,
			search:false,
			onSelect:function(id,value){
				$("#_partner_brand_partnerId").val(id);
			}
		});
		
		//联系人类型
		var $fieldCompDevType = $("#_sino_contact_type");
		$fieldCompDevType.addClass("li_form");
		var optionCompDevTypes = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"280", //高度
			url : ctx+"/base/partnerContact/getContactsType?tmp="+Math.random(),
			onSelect :function(){
				var id = $("#_sino_contact_type").formSelect("getValue")[0];
				$('#contactsType').val(id);
			}
			//checkbox : true
		};
		$fieldCompDevType.formSelect(optionCompDevTypes);
		$("#_sino_contact_type").formSelect('setValue',$('#contactsType').val());
		
		//联系人类型
		var contactsNationality = $("#_contactsNationality");
		contactsNationality.addClass("li_form");
		var contactsoptions = {
			inputName : "partnerBrand",
			writeType : 'show',
			showLabel : false,
			width:"280", //高度
			code : "country",
			onSelect :function(){
				var id = $("#_contactsNationality").formSelect("getValue")[0];
				$('#input_contactsNationality').val(id);
			}
			//checkbox : true
		};
		contactsNationality.formSelect(contactsoptions);
		$("#_contactsNationality").formSelect('setValue',$('#input_contactsNationality').val());
		
		/*
		 * 绑定触发事件
		 */
		 $("#_create_partner_brand_back").bind('click',function(){
			 _back();
         });
		 $("#_sino_partner_brand_add").bind('click',function(){
				_add();
	       });

		 $(".ultra-select-input3").val($('#_partner_brand_partnerName').val());

	}
	
	function _back(){
		//$('.edit_list').load(ctx+'/base/partnerContact/partnerContact_main?tmp='+Math.random());
		var options = {};
		options.murl = 'base/partnerContact/partnerContact_main';
		$.openurl(options);
	}
	function _add(){
		var url = ctx+'/base/partnerContact/saveOrUpdate?tmp='+Math.random();
		$("#_sino_partnerContacts_add_form").form('submit',{
	    	url:url,
	    	onSubmit:function(){
				var options = {};
				options.formId = "_sino_partnerContacts_add_form";
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
	
	exports.init = function(){
		loadgrid();  
	}
});