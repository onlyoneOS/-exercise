
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
	
	
//	var ids;
	var domainData="";
	var dm;	
	function loadAll(){
		
		
		/* Table initialisation */
			
			pdfMap =  new Map();	
			 $.ajax({
	    			url:ctx+'/sysParam/getDomainValue', 
	    			async:false,
	    			dataType:'json', 
	    			type:'post',         
	    			success: function(data) {
	    				var result = data; 
	    				domainData = data;
	    				dm=null;
	//    				modiDm=null;
	    			 	$.each(result, function(i, n){
	    			 		
	    					    dm+='<option value='+"'"+n.dmValue+"'>"+n.dmValueMeaning+'</option>';
	    					    $("#dm").val(dm);
	    				}); 
	    			}
	    		});
			var url = ctx+"/sysParam/getAll";
			var paramId = '';
			table=$('#taskTable').dataTable({
				"bProcessing": true,
				"bServerSide": true,
				"sAjaxSource":url, 
//				"fnServerData": fnDataTablesPipeline, //缓存数据
				"bRetrieve": true,
				"bSort": false,
				"aoColumns": [
				              { "mData": "paramName",},
				              { "mData": "paramCode"  },
				              { "mData": "paramValue" },
				              { "mData": "paramTypeing" },
				              { "mData": "paramId","mRender": function (data) {
				          		  var rstatus='';
				            	  var id = data;
				          		  rstatus="<a  id ='"+id+"'  href='#myModal2'  data-toggle='modal'  name='modibutton'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				          		  		  "<a id = '"+id+"' href='#' name='delbutton'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;			          		  		 
				          		  return rstatus;
				              }},
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
						//console.info(mid);
						modiRole(mid);
					});
					$('a[name="delbutton"]').unbind('click').click(function () {
						var mid =this.id;
						//console.info(mid);
						delRole(mid);
					});
					$('a[name="menubutton"]').unbind('click').click(function () {
						var mid =this.id;
						addMenu(mid);
					});
					
				/*	$('#taskTable tbody tr').each(function(){
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
				
				
	
	};
	
  	function RefreshTable(){
	table.fnSort( [ [1,'asc'] ] );
	table.fnSort( [ [1,'desc'] ] );
	} 
			
	
    /*
     *   删除参数
     * 
     */

	function delRole(id){
		//console.info(id);
		     
		        if(!confirm("确定删除吗？")){
			        return;
		          }
	            $.ajax({
	            	 url:"/sinoPEM/sysParam/delSysParam?paramId="+id,  // 提交的页面
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
	 *  修改参数
	 */
	function modiRole(id){
	var mid = id;
	var pdfMap =  new Map();
	var optionValue="";
	var domainData="";
	
	 $.ajax({
				
		 url:"/sinoPEM/sysParam/getAllParam?paramId="+mid, 
    			async:false,
    			dataType:"json", 
    			type: "POST",   
    			success:function(data){
    			var result = data; 
    			var mdef=new Object();
    	            mdef.paramId=result.paramId;
    	            mdef.paramName=result.paramName;
    	            mdef.paramCode=result.paramCode;
    	            mdef.paramValue=result.paramValue;
    	            mdef.paramType = result.paramType;
    	 	       pdfMap.put(result.paramId,mdef);
    	 	       	$.each(domainData, function(i, n){
    	 			if(pdfMap.get(mid).paramType==n.dmValue){
    	 				optionValue+="<option value="+"'"+n.dmValue+"' selected='selected'>"+n.dmValueMeaning+"</option>";
    	 			}else{
    	 				optionValue+="<option value="+"'"+n.dmValue+"'>"+n.dmValueMeaning+"</option>";
    	 			}
    	 			
    	 	     }); 
    	 	  	
    	 	  	
    			$("#dailogs1").empty();
    			var buffer = new StringBuffer();
    		       buffer.append('<div id="myModal2" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
    				buffer.append('<div class="modal-header">');
    				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
    				buffer.append('<h3 id="myModalLabel">修改参数</h3 >');
    				buffer.append('</div >');
    				buffer.append('<div class="modal-body" >');
    				buffer.append("<div>"+"<form id='modiForm'  name='modiForm' class='form-horizontal'> ");
    				buffer.append("<input style='display:none' name='paramTypeing' id='paramTypeing' value='"+pdfMap.get(mid).paramType+"' />");
    				buffer.append("<div class='control-group'><label class='control-label' for='paramType'>参数类型</label><div class='controls' id='paramType' name='paramType'></div></div>");
    				buffer.append("<div class='control-group'><label class='control-label' for='paramName'>参数名称</label><div class='controls'><input type='text' name='paramName' value='"+pdfMap.get(mid).paramName+"' required data-validation-required-message='请输入参数名称！'/> <p class='help-block'></p></div></div>");
    				buffer.append("<div class='control-group'><label class='control-label' for='paramCode'>参数编码</label><div class='controls'><input type='text' name='paramCode' value='"+pdfMap.get(mid).paramCode+"'/></div></div>");
    				buffer.append("<div class='control-group'><label class='control-label' for='paramValue'>参数取值</label><div class='controls'><input type='text' name='paramValue' value='"+pdfMap.get(mid).paramValue+"'/></div></div>");
    				buffer.append("<input type='hidden' name='paramTypeValue' id='paramTypeValue' />");
    				buffer.append("</form>");
    				buffer.append("</div>");
    				buffer.append('</div >');
    				buffer.append('<div class="modal-footer" >');
    				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
    				buffer.append('<button class="btn btn-primary" data-dismiss="modal" id="btnConfirm" >保存参数</button >');
    				buffer.append('</div >');
    				buffer.append('</div>');
    			
    			$("#dailogs1").append(buffer.toString());
    			
    		   	//加载参数类型
    			var $fieldCompPosType = $("#paramType");
    			$fieldCompPosType.addClass("li_form");
//    			alert($('#posTypeing').val());
    			var optionCompPosType = {
    				inputName : "posTypeValue",
    				inputValue : $('#paramTypeing').val(),
    				writeType : 'show',
    				showLabel : false,
    				code : 'paramType',
    				onSelect:function(node){
    					 
    				},
    				width : "280"			
    			};
    			$fieldCompPosType.formSelect(optionCompPosType);
    			
    			$("input,textarea").not("[type=submit]").jqBootstrapValidation({
    			   submitSuccess: function (form, event)
    	    		 {
    		        	event.preventDefault();
    		            $.ajax({
    		                url: ctx+"/sysParam/modiSysParam?paramId="+mid,  // 提交的页面
    		                data: $('#modiForm').serialize(), // 从表单中获取数据
    		                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
    		                beforeSend: function()          // 设置表单提交前方法
    		                {
    		                  //  new screenClass().lock();
    		                },
    		                error: function(request) {      // 设置表单提交出错
    		                	 $('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>参数修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    		                },
    		                success: function(data) {
    		                // 设置表单提交完成使用方法
    		               // 	alert("表单提交成功"+data);
    		                   if(data=="success"){
    		                  		 RefreshTable();
    		                		$('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>参数修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    			         		   $("#example-advanced").treetable("destroy");
    			         		   
    		                   }else{
    		          	         RefreshTable();	
    		                	   $('#alertMsg').empty();
    			         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>参数修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
    			         		    $(".alert").delay(2000).hide(0);
    			         		    $(".close").click(function(){
    			         		    	$(".alert").hide();
    			         		    });
    		                   }
    		                   
    		                     $('#myModal2').modal('hide');
    		                }
    		            });
    	    		 },submitError: function (form, event, errors) {
    			         event.preventDefault();
    		         }
    			  });  
    				

    			$("#btnConfirm").unbind("click").click(function(){
    						$("#paramTypeValue").attr("value",$("#paramType").formSelect("getValue")[0]);		
    					
    					$('#modiForm').submit();
    			    });   
    	 	  	
    	        }
    	        });
	
				
				return false;
		    }
	
	
	/*
	 * 添加参数
	 * 
	 */
		    
		function create(options){
			
			  
				$("#dailogs1").empty();
				var optionValue="";
				var domainData="";
				$.each(domainData, function(i, n){
					optionValue+="<option value="+"'"+n.dmValue+"'>"+n.dmValueMeaning+"</option>";
			     }); 
				
			    optionValue=$('#dm').val();
				var buffer = new StringBuffer();
		        buffer.append('<div id="myModal1" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">');
				buffer.append('<div class="modal-header">');
				buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
				buffer.append('<h3 id="myModalLabel">新建参数</h3 >');
				buffer.append('</div >');
				buffer.append('<div class="modal-body" >');
				buffer.append("<div>"+"<form id='addForm'  name='addForm' class='form-horizontal'  method='post'> ");
				buffer.append("<input type='hidden' name='paramTypeValue' id='paramTypeValue' />");
				buffer.append("<div class='control-group'><label class='control-label' for='paramType'>参数类型</label><div class='controls'  name='paramType' id='paramType'></div></div>");
				buffer.append("<div class='control-group'><label class='control-label' for='paramName'>参数名称</label><div class='controls'><input type='text' name='paramName' required data-validation-required-message='请输入参数名称！'/> <p class='help-block'></p></div></div>");
				buffer.append("<div class='control-group'><label class='control-label' for='paramCode'>参数编码</label><div class='controls'><input type='text' name='paramCode'/></div></div>");
				buffer.append("<div class='control-group'><label class='control-label' for='paramValue'>参数取值</label><div class='controls'><input type='text' name='paramValue'/></div></div>");
				buffer.append("</form>");
				buffer.append("</div>");
				buffer.append('</div >');
				buffer.append('<div class="modal-footer" >');
				buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
				buffer.append('<button class="btn btn-primary" data-dismiss="modal"  id="btnConfirm" >保存参数</button >');
				buffer.append('</div >');
				buffer.append('</div>');
				$("#dailogs1").append(buffer.toString());
				
				
				//加载参数类型
				var $fieldCompPosType = $("#paramType");
				$fieldCompPosType.addClass("li_form");
				var optionCompPosType = {
					inputName : "paramTypeValue",
					writeType : 'show',
					showLabel : false,
					code : 'paramType',
					onSelect:function(node){
						 
					},
					width : "280"			
				};
				$fieldCompPosType.formSelect(optionCompPosType);
				 
 			$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
         	   submitSuccess: function (form, event)
	    		 {	
		        		 event.preventDefault();
			            $.ajax({
			            	url: ctx+"/sysParam/addSysParam?tmp="+Math.random(),  // 提交的页面
			                data: $('#addForm').serialize(), // 从表单中获取数据
			                type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
			                beforeSend: function()          // 设置表单提交前方法
			                {
			                  //  new screenClass().lock();
			                },
			                error: function(request) {      // 设置表单提交出错
			                	$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
			                },
			                success: function(data) {
			                // 设置表单提交完成使用方法
			               // 	alert("表单提交成功"+data);
			                   if(data=="success"){
//			           		        RefreshTable();
			                		$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>参数添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(5000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
				         		   $('.edit_list').load(ctx + '/sysParam/manageparam?tmp=' + Math.random());
//				         		   $("#example-advanced").treetable("destroy");
			                   }else{
//			                   		RefreshTable();
			                	   $('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>参数添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
				         		   $('.edit_list').load(ctx + '/sysParam/manageparam?tmp=' + Math.random());
			                   }
			                   $('#myModal1').modal('hide');
			                }
			         });
	    		 },submitError: function (form, event, errors) {
			         event.preventDefault();
		         }
			  }); 
 			
				$("#btnConfirm").unbind("click").click(function(){
					$("#paramTypeValue").attr("value",$("#paramType").formSelect("getValue")[0]);	
					$('#addForm').submit();
			    });   
				
//				return false;
	   }

