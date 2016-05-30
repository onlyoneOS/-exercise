	function loadDatagrid(){
		$("#_sino_partner_datagrid").datagrid({
			url:ctx+"/base/partnerInfo/getList?tmp="+Math.random(),
			title:"厂商信息表",
			loadMsg : "数据加载中，请稍后......",
			singleSelect : false,
			pagination:true,
			rownumbers: true,
			fitColumns:true,
			// width:$(document.body).width()*0.79-20,
			onBeforeLoad:function(param){
				_search();
				// $("#_sino_partner_datagrid").resizeDataGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
				// var w = $(".datagrid").width();
				// $(".panel-header").css('width',w-30);
				// $(".datagrid-wrap").css('width',w-20);
			},
			onLoadSuccess : function(data){
				// $(window).bind('resize', function () {
					// $("#_sino_partner_datagrid").resizeDataGrid(0, $(this).width()*0.2-10, 0, $(this).width()*0.79-10);
					// var w = $(".datagrid").width();
					// $(".panel-header").css('width',w-30);
					// $(".datagrid-wrap").css('width',w-20);
				// });
				$('a[name="modibutton"]').unbind('click').click(function () {
			    	_editPartner(this.id);
				});
				$('a[name="delButton"]').unbind('click').click(function () {
			    	_removePartner(this.id);
				});
			},
			columns: [[
			{
	            field: 'partnerCode',
	            title: '厂商编码',
	            width: 90,
	            sortable: false
	        }, {
	            field: 'partnerName',
	            title: '厂商简称',
	            width: 100,
	            sortable: false
	        }, {
	            field: 'partnerFullName',
	            title: '厂商全称',
	            width: 200,
	            sortable: false
	        },{
	            field: 'webUrl',
	            title: '厂商网址',
	            width: 250,
	            sortable: false
	        },{
	            field: 'address',
	            title: '联系地址',
	            width: 150,
	            sortable: false
	        },{
	            field: 'hotLine',
	            title: '服务热线',
	            width: 150,
	            sortable: false
	        },{
				field:'id',
				title:'操作',
				width:$(this).width() * 0.070,
				formatter: function(value, row){
				fm="<a name ='modibutton'  href='#' role='button' data-toggle='modal'  id='"+value+"'>" +
					"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
					"<a name='delButton' href='#' id='"+value+"'>&nbsp" +
					"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>";
				return fm;
				}
			}
			
			]],
			toolbar :[{
				
				
			}]
		});
	    $('#_sino_partner_add').unbind('click').click(function () {
	    	_add();
	    });
	    $(".datagrid-toolbar").height("31px");
	}
	
	function _add(){
		$('.edit_list').empty();
		$('.edit_list').load(ctx+'/base/partnerInfo/add?tmp='+Math.random());
	}
	function _editPartner(id){
		$('.edit_list').empty();
		$('.edit_list').load(ctx+'/base/partnerInfo/edit?id='+id+'&tmp='+Math.random());
	}
	function _search(){
		var toolbar = $("#_sino_partner_datagrid").datagrid('getToolbar');
		var toolbarSearch = toolbar.find("div.datagrid-toolbar-search");
		if(toolbarSearch.size() == 0){
			$("#_sino_partner_datagrid").datagrid('toggleSearchbar',{
	    		height : 5,
	    		url : ctx+"/base/partnerInfo/partnerInfo_Search?tmp="+Math.random()
	    	});
		}
		
    }
	function _removePartner(id){
		
		$.messager.confirm('提示', '确定要删除这条信息吗?', function(r){
			if (r){
				$.ajax({
					url: ctx+"/base/partnerInfo/remove?id="+id,  // 提交的页面
		            data: "", // 从表单中获取数据
		            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		            error: function(request) {     // 设置表单提交出错
		            },
		            success: function(data) {
		            	//$.messager.alert('提示','删除成功!');
		            	$('#_sino_partner_datagrid').datagrid('reload');
		            	
		            }
				});
			}
		});
	}





	
