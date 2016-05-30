	function loadAll(){
	 	pdfMap =  new Map();
	 	childMap=new Map();
		$("#tbody").empty();
		//删除tbody中已经存在的数据 
		var str = ""; 
		$.ajax({
			url:ctx+'/org/getDomainValue', 
			async:false,
			dataType:'json', 
			type:'post',         
			success: function(data) {
				var result = data;
				domainData = data;
				dm=null;
				$.each(result, function(i, n){
					dm+='<option value='+"'"+n.dmValue+"'>"+n.dmValueMeaning+'</option>';
					$("#dm").val(dm);
				});
			}
		});           

		$.ajax({
			url:ctx+'/org/getAll', 
			async:false,
			dataType:'json', 
			type:'post',         
			success:function(data){ 
				var flag="";
				var result = data;
				var tr = "";
//				var mtype,mstatus;
				$.each(result, function(i, n){
				
					var mdef=new Object(); 
					var orgCode=" ";
					var orgPhone=" ";
					mdef.orgId=n.orgId;
					mdef.parentId = ''+n.parentId;
					mdef.orgName = n.orgName;
					mdef.orgFullName = n.orgFullName;
					mdef.orgType = n.orgType;
					mdef.treeCode = n.treeCode;
					mdef.oaddress = n.oaddress;
//					mdef.orgPhone = n.orgPhone;
					if(n.orgPhone==null){
						n.orgPhone=orgPhone;	
					}else{
						mdef.orgPhone = n.orgPhone;
					}
					if(n.orgCode==null){
						n.orgCode=orgCode;
					}
					if(n.orgCode==null){
						n.orgCode=orgCode;
					}
					mdef.orgCode = n.orgCode;
					mdef.orgTypeString = n.orgTypeString;
					pdfMap.put(n.orgId,mdef);
					var rstatus="<a  id ='"+n.orgId+"'  href='#myModal2'  data-toggle='modal'  name='updateOrg'><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
     		  		  "<a id = '"+n.orgId+"' href='#' name='deleteOrg'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;";
					
					if(n.children[0]!=null){
						tr+="<tr name = '"+n.orgId+"' data-tt-id='"+n.orgId+"' data-tt-parent-id='' data-tt-branch='true'><td><span class=folder>"+n.orgName+"</span></td><td>"+ n.orgFullName+"</td><td>"+n.orgCode+"</td><td>"+n.orgPhone+"</td><td>"+n.oaddress+"</td><td>"+rstatus+"</td></tr>\n";
					}else{
						tr+="<tr name = '"+n.orgId+"' data-tt-id='"+n.orgId+"' data-tt-parent-id='' data-tt-branch='false'><td><span class=file>"+n.orgName+"</span></td><td>"+ n.orgFullName+"</td><td>"+n.orgCode+"</td><td>"+n.orgPhone+"</td><td>"+n.oaddress+"</td><td>"+rstatus+"</td></tr>\n";
					}
				}); 
				//追加如tbody中 
				str = tr;
				$("#tbody").append(str);
				var table = $("#example-advanced");
				//$("#example-advanced").treetable();
				table.treetable({ expandable: true ,
					onNodeCollapse: function() {
						var node = this;
						table.treetable("unloadBranch", node);
					},
					onNodeExpand: function() {
						var node = this;
//						var orgCode=" ";
//						var nodeParentid=node.id;
						$.ajax({
							url: ctx+"/org/getNodes?parentId="+node.id,  // 提交的页面
							data: "", // 从表单中获取数据
							type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
							success: function(data) {
								var result = data; 
								var rows = "";
								var flag ="false";
//								var mtreeCode;
								$.each(result, function(i, n){
									
									var mdef=new Object(); 
									var orgCode=" ";
									var orgPhone=" ";
									mdef.orgId=n.orgId;
									mdef.parentId = n.parentId;
									mdef.orgName = n.orgName;
									mdef.orgFullName = n.orgFullName;
									mdef.orgType = n.orgType;
									mdef.treeCode = n.treeCode;
									mdef.oaddress = n.oaddress;
//									mdef.orgPhone = n.orgPhone;
									if(n.orgPhone==null){
										n.orgPhone=orgPhone;	
									}else{
										mdef.orgPhone = n.orgPhone;
									}
									if(n.orgCode==null){
										n.orgCode=orgCode;
									}
									mdef.orgCode = n.orgCode;
									mdef.orgTypeString = n.orgTypeString;
									var nodeParentid=pdfMap.get(node.id);
									childMap.put(n.orgId,nodeParentid);
									pdfMap.put(n.orgId,mdef);
									flag ="false";
									var rstatus="<a  id ='"+n.orgId+"'  href='#myModal2'  data-toggle='modal'  name='updateOrg' onclick='nodeModie(id)' ><button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
				     		  		  "<a id = '"+n.orgId+"' href='#' name='deleteOrg'  onclick='nodedelete(id)'>&nbsp<button title='删除' class='room-command-button room-delete-command-button roomdel' ></button></a>&nbsp;&nbsp;";
									
									if(n.children[0]!=null){
										rows+="<tr name = '"+n.orgId+"' data-tt-id='"+n.orgId+"' data-tt-parent-id='"+n.parentId+"' data-tt-branch='true'><td><span class=folder>"+n.orgName+"</span></td><td>"+n.orgFullName+"</td><td>"+n.orgCode+"</td><td>"+n.orgPhone+"</td><td>"+n.oaddress+"</td><td>"+rstatus+"</td></tr>\n";
									}else{
										rows+="<tr name = '"+n.orgId+"' data-tt-id='"+n.orgId+"' data-tt-parent-id='"+n.parentId+"' data-tt-branch='false'><td><span class=file>"+n.orgName+"</span></td><td>"+n.orgFullName+"</td><td>"+n.orgCode+"</td><td>"+n.orgPhone+"</td><td>"+n.oaddress+"</td><td>"+rstatus+"</td></tr>\n";
									}	
								}); 
								table.treetable("loadBranch", node, rows);
								$("#example-advanced tbody tr").toggle(
								 function() {
									$("tr.selected").removeClass("selected");
									$(this).addClass("selected");
									flag='1';
								},function(){
									$("tr.selected").removeClass("selected");
									flag='0';
								});  

								$("#example-advanced tr").click(function(){
									if(flag=='1'){
										var actionId = $(this).attr("name");
										$('#orgId').val(actionId);
									}
									else{
										$('#orgId').attr('value','');
									}
								});
							}
						});

					}  

				});

				
				 // Highlight selected row
       	      $("#example-advanced tbody tr").toggle(
       	    	function() {
	      	        $("tr.selected").removeClass("selected");
	      	        $(this).addClass("selected");
	      	        flag='1';
       	    	},function(){
       	    		$("tr.selected").removeClass("selected");
       	    		flag='0';
       	    	}); 
      
  	        	$("#example-advanced tr").click(function(){
  	        		if(flag=='1'){
	  	    			var actionId = $(this).attr("name");
	  	    			$('#orgId').val(actionId);
  	        		}
  	        		else{
  	        			$('#orgId').attr('value','');
  	        		}
  	    		});
			}
		});
		/*新增*/
		$('a[name="createOrg"]').unbind('click').click(function()
			{
				create();
			});
		/*修改*/
		$('a[name="updateOrg"]').unbind('click').click(function()
			{
			var mid =this.id;
				update(mid);
			});
		/*删除*/
		$('a[name="deleteOrg"]').unbind('click').click(function()
			{
			var mid =this.id;
				deletel(mid);
			});

	}

	/*节点触发*/
	function nodeModie(id){
		
		update(id);
	}
	function nodedelete(id){
		deletel(id);
	}
	//增加组织

	function create() {
	
//		var optionValue=$('#dm').val();
		var mid;

		if($('#orgId').val()==''){
			 mid = "root";
		}else{
			 mid = $('#orgId').val();
		}  
		$("#dailogs").empty(); 
		//	if($("#addOrg"))
		var buffer = new StringBuffer();

		buffer.append('<div id="myModal1" class="modal hide fade" tabindex="-1" role="addOrg" aria-labelledby="myModalLabel" aria-hidden="true">');
		buffer.append('<div class="modal-header">');
		buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
		buffer.append('<h3 id="myModalLabel">新建组织</h3 >');
		buffer.append('</div>');
		buffer.append('<div class="modal-body" >'+"<div>");
		if(mid!='root'){
			buffer.append("<div class='alert'><strong>上级组织：</strong>"+pdfMap.get(mid).orgName+"</div>");
		}
		buffer.append("<form id='addForm'  name='parentId' class='form-horizontal' action='${ctx}/org/addOrgan?parentId="+mid+"' method='post'> ");
		buffer.append("<div class='control-group'><label class='control-label' for='orgName'>组织名称</label><div class='controls'><input type='text' name='orgName' required data-validation-required-message='请输入组织名称！'/> <p class='help-block'></p></div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='orgFullName'>组织全称</label><div class='controls'><input type='text' name='orgFullName'  /> </div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='orgPhone'>组织电话</label><div class='controls'><input type='text' name='orgPhone'  /> </div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='oAddress'>组织地址</label><div class='controls'><input type='text' name='oAddress' /> </div></div>");
		if(mid=='root'){
		  buffer.append("<input type='hidden' name='parentorgCode' value=''/><div class='control-group'><label class='control-label' for='orgCode'>组织编码</label><div class='controls'><input type='text' name='orgCode' required /><div style='font-size:12px;color:red;'>注：编码需要唯一</div></div></div>");
		}else{
		  buffer.append("<input type='hidden' name='parentorgCode' value='"+pdfMap.get(mid).orgCode+"'/> <div class='control-group'><label class='control-label' for='orgCode'>组织编码</label><div class='controls'><div class='input-prepend' style='width:260px;'><span class='add-on'>"+pdfMap.get(mid).orgCode+"</span><input type='text' name='orgCode' style='width:50%;' required /></div><div style='font-size:12px;color:red;'>注：编码需要唯一</div></div></div>");	
		}
		buffer.append("</form>");
//		buffer.append("<div class='alert'><strong>提示：</strong>当前选中的组织为新增组织的父组织。<br>父组织：<strong>"+pdfMap.get(mid).orgName+"</strong></div>");
		buffer.append("</div>");
		buffer.append('</div >');
		buffer.append('<div class="modal-footer" >');
		buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
		buffer.append('<button class="btn btn-primary" data-dismiss="modal"  id="btnConfirm" >保存组织</button >');
		buffer.append('</div >');
		buffer.append('</div>');  
	
		$("#dailogs").append(buffer.toString());
	
		$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
			submitSuccess: function (form, event)
			{
				event.preventDefault();
				$.ajax({
					url: ctx+"/org/addOrgan?parentId="+mid,  // 提交的页面
					data: $('#addForm').serialize(), // 从表单中获取数据
					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
					beforeSend: function()          // 设置表单提交前方法
					{
						//  new screenClass().lock();
					},
					error: function(request) {      // 设置表单提交出错
					
						$('#alertMsg').empty();
						$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>组织添加失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$(".alert").delay(2000).hide(0);
						$(".close").click(function(){
							$(".alert").hide();
						});
					$('#myModal1').modal('hide');
					},
					success: function(data) {
						// 设置表单提交完成使用方法
						if(data=="success"){
							$('#alertMsg').empty();
							$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>组织添加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							$(".alert").delay(2000).hide(0);
						 	$(".close").click(function(){
								$(".alert").hide();
						 	});
					       $("#example-advanced").treetable("destroy");
	         		      loadAll();
						}else{
							$('#alertMsg').empty();
							$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>组织添加失败，可能组织编码不唯一，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							$(".alert").delay(2000).hide(0);
							$(".close").click(function(){
								$(".alert").hide();
							});
						}  
 						$('#myModal1').modal('hide');
// 						$("#example-advanced").treetable("destroy");
//						loadAll();
					}
				});
			},submitError: function (form, event, errors) {
				event.preventDefault();
			}
		});
	
		
		$("#btnConfirm").unbind('click');
		$("#btnConfirm").click(function () {
			$('#addForm').submit();
		});

		return false;
	}



	function update(id) {
		var mid=id;
		var pdfMap =  new Map();
		
		$.ajax({
			url:ctx+"/org/getMoidById?moidId="+mid, 
			async:false,
			dataType:"json", 
			type: "POST",   
			success:function(data){
			var result = data; 

			var mdef=new Object();
	            mdef.orgId=orgId.Id;
	            mdef.orgFullName=result.orgFullName;
	            mdef.orgName = result.orgName;
	            mdef.orgPhone = result.orgPhone;
	            mdef.oaddress = result.oaddress;
	            mdef.orgCode = result.orgCode;
	            mdef.parentId = result.parentId;
	            mdef.orgTypeString = result.orgTypeString;
	        	mdef.orgType = result.orgType;
	            
	 	       pdfMap.put(result.orgId,mdef);
			  
		$("#dailogs").empty();

		var buffer = new StringBuffer();
		buffer.append('<div id="myModal2" class="modal hide fade" tabindex="-1" role="modifyOrg" aria-labelledby="myModalLabel" aria-hidden="true">');
		buffer.append('<div class="modal-header">');
		buffer.append('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button >');
		buffer.append('<h3 id="myModalLabel">修改组织</h3 >');
		buffer.append('</div>');
		buffer.append('<div class="modal-body" >');
		buffer.append("<div>"+"<form id='modiForm'  name='modiForm' class='form-horizontal' action='${ctx}/org/modi?orgId="+mid+"' method='post'> ");
		buffer.append("<div class='control-group'><label class='control-label' for='orgName'>组织名称</label><div class='controls'><input type='text' name='orgName' value='"+pdfMap.get(mid).orgName+"' required data-validation-required-message='请输入组织名称！'/> <p class='help-block'></p> </div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='orgFullName'>组织全称</label><div class='controls'><input type='text' name='orgFullName' value='"+pdfMap.get(mid).orgFullName+"'  /></div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='orgPhone'>组织电话</label><div class='controls'><input type='text' name='orgPhone' value='"+pdfMap.get(mid).orgPhone+"' /> </div></div>");
		buffer.append("<div class='control-group'><label class='control-label' for='oAddress'>组织地址</label><div class='controls'><input type='text' name='oAddress' value='"+pdfMap.get(mid).oaddress+"'/> </div></div>");
		
		if(pdfMap.get(mid).parentId=='root'){
			  buffer.append("<input type='hidden' name='parentorgCode' value=''/><div class='control-group'><label class='control-label' for='orgCode'>组织编码</label><div class='controls'><input type='text' name='orgCode' value='"+pdfMap.get(mid).orgCode+"' required /><div style='font-size:12px;color:red;'>注：编码需要唯一</div></div></div>");
			}else{
				
				var val = pdfMap.get(mid).orgCode;
//				var pid = pdfMap.get(pdfMap.get(mid).parentId).orgCode;
				var pid = childMap.get(mid).orgCode;
				val = val.substr(pid.length);
				buffer.append("<input type='hidden' name='parentorgCode' value='"+pid+"'/> <div class='control-group'><label class='control-label' for='orgCode'>组织编码</label><div class='controls'><div class='input-prepend' style='width:260px;'><span class='add-on'>"+pid+"</span><input type='text' name='orgCode' style='width:50%;' value='"+val+"' required /><div style='font-size:12px;float:left;color:red;'>注：编码需要唯一</div></div></div></div>");	
			}
		buffer.append("</form>");
		buffer.append("</div>");
		buffer.append('</div >');
		buffer.append('<div class="modal-footer" >');
		buffer.append('<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button >');
		buffer.append('<button class="btn btn-primary" id="btnConfirm" >保存组织</button >');
		buffer.append('</div >');
		buffer.append('</div>');

		$("#dailogs").append(buffer.toString());
		$("input,select,textarea").not("[type=submit]").jqBootstrapValidation({
			submitSuccess: function (form, event)
			{
				event.preventDefault();
				$.ajax({
					url: ctx+"/org/modi?orgId="+mid,  // 提交的页面
					data: $('#modiForm').serialize(), // 从表单中获取数据
					type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
					beforeSend: function()          // 设置表单提交前方法
					{
						//  new screenClass().lock();
					},
					error: function(request) {      // 设置表单提交出错
						$('#alertMsg').empty();
						$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>组织修改失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$(".alert").delay(2000).hide(0);
						$(".close").click(function(){
							$(".alert").hide();
						});
					},
					success: function(data) {
						// 设置表单提交完成使用方法
						// 	alert("表单提交成功"+data);
						if(data=="success"){
							$('#alertMsg').empty();
			//				$('#alertMsg').confirm('你确定要删除吗？',function());
							$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>组织修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
							$(".alert").delay(2000).hide(0);
							$(".close").click(function(){
								$(".alert").hide();
							});
							   $("#example-advanced").treetable("destroy");
			         		   loadAll();
							}else{
							$('#alertMsg').empty();
							$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>组织修改失败，可能组织编码不唯一，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
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
		$('#myModal2').modal('show');
			$("#btnConfirm").click(function () {
	
				$('#modiForm').submit();
			});   
		  }
	   }); 
		return false;
	}
	
	
	//删除信息
	function deletel(mid){
			/*	if($('#orgId').val()==""){
				$('#alertMsg').empty();
				$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>请选择一个组织！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				$(".alert").delay(2000).hide(0);
				$(".close").click(function(){
					$(".alert").hide();
				});
				return  ;
			}*/
			if(!confirm("确定删除吗？")){
	     			  return;
	     		  }
			$.ajax({
				url: ctx+"/org/delOrgan?orgId="+mid,  // 提交的页面
				data: "", // 从表单中获取数据
				type: "POST",                   // 设置请求类型为"POST"，默认为"GET"

				error: function(request) {      // 设置表单提交出错
					$('#alertMsg').empty();
					$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>组织删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
					$(".alert").delay(2000).hide(0);
					$(".close").click(function(){
						$(".alert").hide();
					});
				},
				success: function(data) {
					// 设置表单提交完成使用方法
				    	if(data=="success"){
						$('#alertMsg').empty();
						$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>组织删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$(".alert").delay(2000).hide(0);
						$(".close").click(function(){
							$(".alert").hide();
						});	
										
						$("#example-advanced").treetable("destroy");
						$('#orgId').attr('value','');
						loadAll();
							
					}else if(data=="fail"){
						$('#alertMsg').empty();
						$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>不能删除根组织！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
						$(".alert").delay(2000).hide(0);
						$(".close").click(function(){
							$(".alert").hide();
						});
					}

				}
			});
		
	}


