define(function(require, exports, module) {
	var $ = require("jquery");
	var dataTable$ = require("dataTables");
	var uic$ = require("uic_Dropdown");
	require("DT_bootstrap");
	require("bootstrap");
//	$= require("easyui");
//	require("coverage");
	function loadgrid(){
		

		
		//品牌列表
		table=dataTable$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"sAjaxSource":ctx+"/base/partnerContact/getList?tmp="+Math.random(), 
			"bRetrieve": true,
			"bFilter": true,
			"sServerMethod": "POST",
			"aoColumns": [
						    { "mData": "contactsName","mRender":function(data,row,obj){
				          		  rstatus="<div style='float:left;' >" +
				          		  				"<div style='display:block;float:left;'>"+data+"&nbsp&nbsp&nbsp&nbsp&nbsp</div> " +
				          		  				"<div style='display:none;float:right;'>" +
				          		  					"<a  id ='"+obj.id+"'  href='#'  data-toggle='modal'  name='_sino_partner_brand_edit'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				          		  					"<a  id = '"+obj.id+"' href='#' name='_sino_partner_brand_del'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
				          		  				"</div>" +
				          		  		 "</div>" ; 
				          		 
				          		  return rstatus;
						    }},
							{ "mData": "contactsSex","mRender":function(data,row,obj){
						    	if(data == 1){
						    		return '男';
						    	} else if(data == 2){
						    		return "女";
						    	} else {
						    		return "中性";
						    	}
						    }},
							{ "mData": "contactsTitle" },
							{ "mData": "contactsAddress" },
							{ "mData": "contactsEmail"},
							{ "mData": "partnerName"}
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
				$('.partnersel').append("<label class='control-label' for='_sino_partner'>厂商：</label>");
				$('.partnersel').append('<div class="ultraselect-nms3" style="z-index:8"><input type="text" class="ultra-select-input3" id="_sino_partner" data="0" /></div>');
				//加载厂商
				$(".ultra-select-input3").uic_Dropdown({
					height:"auto",// 宽度
					width:"270", //高度
					title: "厂商",
					url:ctx+"/base/partnerInfo/getAll?productTypeId=",	 //型号分组数据
					checkbox:false,
					branchtype:true,
					search:false,
					onSelect:function(id,value){
						searchTable(id);
					}
				});
				$('a[name="_sino_partner_brand_edit"]').unbind('click').click(function () {
					var id =this.id;
					_createOrEdit(id);
				});
				$('a[name="_sino_partner_brand_del"]').unbind('click').click(function () {
					var id =this.id;
					remove(id);
				});
				
				$('#taskTable tbody tr').each(function(){
					var tdd=$(this.childNodes[0]);
					var sss=$(tdd.children()[0]);
				    tdd.bind("mouseover",function(){
				    	$(sss.children()[1]).css('display','block'); 
				    });
				    
				    tdd.bind("mouseout",function(){
				    	$(sss.children()[1]).css('display','none'); 
				    });
				  
				})
			} 
		
		});

		/*
		 * 绑定触发事件
		 */
		 $("#_create_partner_brand").bind('click',function(){
			 _createOrEdit('');
         });

	}
	function _createOrEdit(id){
		//$('.edit_list').load(ctx+'/base/partnerContact/partnerContact_saveOrUpdate?id='+id+'&tmp='+Math.random());
		var options = {};
		options.murl = 'base/partnerContact/partnerContact_saveOrUpdate';
		options.keyName = 'id';
		options.keyValue = id;
		$.openurl(options);
	}
	function remove(id){
		$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
			if (r){
				$.ajax({
					url: ctx+"/base/partnerContact/remove?id="+id,  // 提交的页面
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	searchTable('');
		            	$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();  
	         		    	
	         		    });
		            	
		            }
				});
			}
		});
	}
	
	function searchTable(param){
		table.fnFilter(param,0 );
		//table.fnSort( [ [1,param] ] );
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
	function test(){
		var source=$(".ultra-select-input3").uic_Dropdown('getValue');
		   alert("value:"+source.value)
	   alert("id:"+source.id)
	}
	
	exports.init = function(){
		loadgrid();  
	}
});