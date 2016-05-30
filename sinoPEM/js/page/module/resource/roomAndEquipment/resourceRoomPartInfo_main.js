define(function(require, exports, module) {
	var $ = require("jquery");
	var dataTable = require("dataTables");
	require("DT_bootstrap");
	require("jquery.form");
	require("formTree");
	var flag=1;
	var table='';
	var oCache = {
			iCacheLower: -1
		};


	function fnSetKey( aoData, sKey, mValue )
	{
		for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name == sKey )
			{
				aoData[i].value = mValue;
			}
		}
	}
	
	function fnGetKey( aoData, sKey )
	{
		for ( var i=0, iLen=aoData.length ; i<iLen ; i++ )
		{
			if ( aoData[i].name == sKey )
			{
				return aoData[i].value;
			}
		}
		return null;
	}
	
	function fnDataTablesPipeline ( sSource, aoData, fnCallback, oSettings ) {
		var iPipe = 5; /* Ajust the pipe size */
	
		var bNeedServer = false;
		var sEcho = fnGetKey(aoData, "sEcho");
		var iRequestStart = fnGetKey(aoData, "iDisplayStart");
		var iRequestLength = fnGetKey(aoData, "iDisplayLength");
		var iRequestEnd = iRequestStart + iRequestLength;
		oCache.iDisplayStart = iRequestStart;
		//alert(sEcho+"|"+iRequestStart+"|"+iRequestLength+"|"+iRequestEnd);
		/* outside pipeline? */
		if ( oCache.iCacheLower < 0 || iRequestStart < oCache.iCacheLower || iRequestEnd > oCache.iCacheUpper )
		{
			bNeedServer = true;
		}
		
		/* sorting etc changed? */
		if ( oCache.lastRequest && !bNeedServer )
		{
			for( var i=0, iLen=aoData.length ; i<iLen ; i++ )
			{
				if ( aoData[i].name != "iDisplayStart" && aoData[i].name != "iDisplayLength" && aoData[i].name != "sEcho" )
				{
					if ( aoData[i].value != oCache.lastRequest[i].value )
					{
						bNeedServer = true;
						break;
					}
				}
			}
		}
		
		/* Store the request for checking next time around */
		oCache.lastRequest = aoData.slice();
		if ( bNeedServer )
		{
			if ( iRequestStart < oCache.iCacheLower )
			{
				iRequestStart = iRequestStart - (iRequestLength*(iPipe-1));
				if ( iRequestStart < 0 )
				{
					iRequestStart = 0;
				}
			}
			
			oCache.iCacheLower = iRequestStart;
			oCache.iCacheUpper = iRequestStart + (iRequestLength * iPipe);
			oCache.iDisplayLength = fnGetKey( aoData, "iDisplayLength" );
			fnSetKey( aoData, "iDisplayStart", iRequestStart );
			fnSetKey( aoData, "iDisplayLength", iRequestLength*iPipe );
			
			oSettings.jqXHR = $.getJSON( sSource, aoData, function (json) { 
	//			json={"sEcho":0,"iTotalRecords":"57","iTotalDisplayRecords":"57","aaData":


				/* Callback processing */
				oCache.lastJson = jQuery.extend(true, {}, json);
				
				if ( oCache.iCacheLower != oCache.iDisplayStart )
				{
					json.aaData.splice( 0, oCache.iDisplayStart-oCache.iCacheLower );
				}
				json.aaData.splice( oCache.iDisplayLength, json.aaData.length );
				
				fnCallback(json);
			} );
		
		}
		else
		{
			json = jQuery.extend(true, {}, oCache.lastJson);
			json.sEcho = sEcho; /* Update the echo for each response */
			json.aaData.splice( 0, iRequestStart-oCache.iCacheLower );
			json.aaData.splice( iRequestLength, json.aaData.length );
			fnCallback(json);
			return;
		}
	}
	
	var ids=null;
	var dm=null;	
	
	
	exports.init = function(){
		/* Table initialisation */
		
	$(document).ready(function() {
		
		
		//orgAndRoom所属组织机房
	    var orgTree = $("#roomId");
		var optionsOrg = {
			inputName : 'roomId',
			inputValue : $("#roomInfoName").val(),
//			labelName : '当前机房',
//			showLabel : true,
			Checkbox : false,
			// onlyLeafCheck : true,
			animate : true,
			searchTree : true,
			tree_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 顶层
			asyncUrl : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 异步
			search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
			find_url : ctx+'/formTree/getTreeOrgAndRoom?random=1',// 精确定位
			url : '',
			/*inputChange : function(){
				
			},*/
			
			onSelect:function(node){
				loadAll(node.id);
//				alert(node.id);
				$('#roomIdValue').val(node.id);
				flag=0;
				
			},
			
			asyncParam : ["id"],
			addparams : [{
						name : "orgParentId",
						value : "root"
					}],
			async : true
			};
			orgTree.formTree(optionsOrg);
			var roominfoid=$('#roomInfoId').val();
			loadAll(roominfoid);
			
		});
	
		$("#addbutton").append("<a id='createbutton'  href='#myModal1' role='button'  data-toggle='modal' class='btn btn-primary'>添加分区</a>");
		$("#createbutton").unbind('click').click(function () {
			create();
			
		});
	
		
	}

		  	function RefreshTable(){
			table.fnSort( [ [1,'asc'] ] );
			table.fnSort( [ [1,'desc'] ] );
			} 
	
		  	
	function loadAll(param){
		  		var roomid=param;
//				var roominfoid=$('#roomInfoId').val();
//				alert(roomid);
				var url = ctx+"/roomPart/getAll?roomId="+roomid;
				var partId = '';
				$('#taskTable').dataTable().fnDestroy();
				table=$('#taskTable').dataTable({
					"bProcessing": true,
					"bServerSide": true,
					"sAjaxSource":url, 
		//			"fnServerData": fnDataTablesPipeline,
					"bRetrieve": true,
					"bSort": false,
					"aoColumns": [
					              { "mData": "partName","mRender": function (data) {
					            	  var rstatus='';
					            	  var nameAndId = data.split(",");
					            	  var name = nameAndId[0];
					            	  var id = nameAndId[1];
					          		  rstatus="<div style='float:left;' >" +
					          		  				"<div style='display:block;float:left;'>"+name+"&nbsp&nbsp&nbsp&nbsp&nbsp</div> " +
					          		  				"<div style='display:none;float:right;'>" +
					          		  					"<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
					          		  					"<a  id = '"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a> " +
					          		  				"</div>" +
					          		  		 "</div>" ; 
					          		 
					          		  return rstatus;
					          		
					              		} },
					             
					              { "mData": "partCode" },
					              { "mData": "partStateString" },
					              { "mData": "partDesc" },
					              { "mData": "partAreaSize" }
					          ],
		//            "aoColumnDefs": [
		//				{ "bSearchable": false, "bVisible": false, "aTargets": [ 4 ] }
		//			] ,
					"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
					"sPaginationType": "bootstrap",
					"oLanguage": {
						"sLengthMenu": "页显示_MENU_ 个数",
						"sInfo":"从 _START_ 到 _END_ /共 _TOTAL_ 条数据",
						"sSearch":"检索:",
						"sEmptyTable":"没有数据",
						"sInfoEmpty": "显示0条数据",
						"oPaginate":{
							"sPrevious": "上一页",
							"sNext":'下一页'
						}
		
						
					},
					/*
					 * 调用dataTable里的回调函数，fnDrawCallback实现数据的回调加载
					*/
					fnDrawCallback:function(){
						
						
						$('a[name="modibutton"]').unbind('click').click(function () {
							var mid =this.id;
							modiRole(mid);
						});
						
						$('a[name="delbutton"]').unbind('click').click(function () {
							var mid =this.id;
							delRole(mid);
						});
					/*	$('a[name="addbutton"]').unbind('click').click(function () {
							var mid =this.id;
							addMenu(mid);
						});*/
						
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
				
					
					
		  	}
		
	
    /*
     *   删除机房
     * 
     */

	function delRole(id){

		      // confirm("确定删除吗？");
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sino/roomPart/delRoomPart?partId="+id,  // 提交的页面
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
	
	
	
	
	
	/*
	 *  修改机房
	 */
	function modiRole(id){
		if(flag==1){
			var roomid=$('#roomInfoId').val();
		}else{
			
			var roomid=$('#roomIdValue').val();
		}
		
		
	    var mid = id;
	    var murl = ctx+"/roomPart/modi?roomId="+roomid;
		$('.edit_list').empty();
		var url = ctx +"/roomPart/getRoomPart?partId="+mid;
		$('.edit_list').load(murl,function(){
			
			$.post(url,function(data){
				var site = data;
				$("#partId").attr("value", site.id);
			 	$("#partCode").attr("value", site.partCode);
			 	$("#partName").attr("value", site.partName);
			 	$("#partDesc").attr("value", site.partDesc);
			 	
			 	$("#partAreaSize").attr("value", site.partAreaSize);
			 	$("#fromPointX").attr("value", site.fromPointX);
			 	$("#toPointX").attr("value", site.toPointX);
			 	$("#fromPointY").attr("value", site.fromPointY);
			 	$("#toPointY").attr("value", site.toPointY);
			 	if(site.partState=='1'){
					$('#partState1').attr("checked","");
				}
				else{
					$('#partState0').attr("checked","");
				}
			 	
			 	
				$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
		    		submitSuccess: function (form, event)
		    			{
		    				event.preventDefault();
		    				$.ajax({
		    					
		    					url: ctx+"/roomPart/modiRoomPart",  // 提交的页面

		    					data: $('#modiForm').serialize(), // 从表单中获取数据
		    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		    					beforeSend: function()          // 设置表单提交前方法
		    					{
		    						//  new screenClass().lock();
		    					},
		    					error: function(request) {      // 设置表单提交出错
		    						$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房片区添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
								    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
		    					},
		    					success: function(data) {
		    						// 设置表单提交完成使用方法
		    						if(data=="success"){
		    							$('#alertMsg').empty();
		    							$('#alertMsg').append('<div class="alert alert-success"><strong>提示:</strong>机房片区添加成功!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	    							    $(".alert").delay(2000).hide(0);
	    			         		    $(".close").click(function(){
	    			         		    	$(".alert").hide();
	    			         		    });
		    							$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
		    							
		    						}else{
		    							$('#alertMsg').empty();
		    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房片区添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	    							    $(".alert").delay(2000).hide(0);
	    			         		    $(".close").click(function(){
	    			         		    	$(".alert").hide();
	    			         		    });
		    							$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
		    						}  
		    					}
		    				});
		    				
		    			},submitError: function (form, event, errors) {
		    				event.preventDefault();
		    			}
		    		});
		    		
			 	
			 	
				$("#modiSite").unbind("click").click(function(){

					
					$('#modiForm').submit();
	            /*     $("#modiForm").ajaxSubmit(function(message) {  
	                	 async : false // 同步提交
	                 });  
	                 $('.edit_list').empty();
	                 $('.edit_list').load(ctx + '/roomPart/roomPartManager?roomId='+roomid+'&tmp=' + Math.random());*/
			 		
			 			});
				
					$("#reset").unbind("click").click(function(){
			    		
			    		$('#edit_list').empty();
			    		$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
			    	});
				
					});
				});
			}
	
	
	/*
	 * 添加片区机房
	 * 
	 */
		    
		function create(){
			if(flag==1){
				
				var roomid=$('#roomInfoId').val();
			}else{
				
				var roomid=$('#roomIdValue').val();
			}
			
			
			var murl = ctx+"/roomPart/add?roomId="+roomid+"&tmp="+Math.random();
				$('#edit_list').empty();
				$('#edit_list').load(murl,function(){
					
				$('#partState1').attr("checked","");
					
				$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
		    		submitSuccess: function (form, event)
		    			{
		    				event.preventDefault();
		    				$.ajax({
		    					
		    					url: ctx+"/roomPart/addRoomPart",  // 提交的页面

		    					data: $('#addForm').serialize(), // 从表单中获取数据
		    					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
		    					beforeSend: function()          // 设置表单提交前方法
		    					{
		    						//  new screenClass().lock();
		    					},
		    					error: function(request) {      // 设置表单提交出错
		    						$('#alertMsg').empty();
	    							$('#alertMsg').append('<div class="alert alert-success"><strong>错误</strong>机房片区添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
								    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
		    					},
		    					success: function(data) {
		    						
		    						// 设置表单提交完成使用方法
		    						if(data=="success"){
		    						    RefreshTable();
				                		$('#alertMsg').empty();
					         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>片区添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					         		    $(".alert").delay(2000).hide(0);
					         		    $(".close").click(function(){
					         		    	$(".alert").hide();  
					         		    	
					         		    }); 
		    							$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
		    							
		    						}else{
		    							$('#alertMsg').empty();
		    							$('#alertMsg').append('<div  class="alert alert-success"><strong>错误</strong>机房片区添加失败,请您稍后再试!<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	    							    $(".alert").delay(2000).hide(0);
	    			         		    $(".close").click(function(){
	    			         		    	$(".alert").hide();
	    			         		    });
		    							$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
		    						} 
		    						
		    						
		    						
		    						
		    					}
		    				});
		    				
		    			},submitError: function (form, event, errors) {
		    				event.preventDefault();
		    			}
		    		});
		    		
						
			    	$("#addSite").unbind("click").click(function(){
			    		$("#addForm").submit();
			    		
			    	});
			    	$("#reset").unbind("click").click(function(){
			    		
			    		$('#edit_list').empty();
			    		$('.edit_list').load(ctx + '/roomPart/roomPartInfo?roomId='+roomid+'&tmp=' + Math.random());
			    	});
				});
			
		}
		
	
		
});
