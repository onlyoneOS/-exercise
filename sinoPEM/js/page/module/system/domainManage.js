


	var domainStr = new StringBuffer();
	domainStr.append('<div id="domainDiv" class="easyui-window panel-body panel-body-noborder window-body" title="增加字典"  data-options="modal:true,iconCls:"icon-save",closed:true" style="left: 533px; top: 80px; width: 288px;  z-index: 9002;">');
	domainStr.append('			<div style="padding: 10px 0 10px 10px">');
	domainStr.append('				<form id="domainForm" method="post">');
	domainStr.append('					<input type="hidden" name="oldDomainCode" id="oldDomainCode" />');
	domainStr.append('					<input type="hidden" name="flag" id="flag" />');
	domainStr.append('					<table>');
	domainStr.append('					   <tbody>');
	domainStr.append('							<tr>');
	domainStr.append('								<td align=right>字典名称:</td>');
	domainStr.append('								<td><input class="easyui-validatebox " type="text" name="domainName" id="domainName" style="width:150px"></input></td>');
	domainStr.append('							</tr>');
	domainStr.append('							<tr>');
	domainStr.append('								<td align=right>字典代码:</td>');
	domainStr.append('								<td><input class="easyui-validatebox" type="text" name="domainCode" id="domainCode" style="width:150px"></input></td>');
	domainStr.append('							</tr>');
	domainStr.append('							<tr>');
	domainStr.append('								<td> <label class="radio inline">是否树形:</label></td> 	');
	domainStr.append('								<td>');
	domainStr.append('									<label class="radio inline">');
	domainStr.append('										<input  type="radio" checked="checked" name="domainType" id="domainType1" value="1" />是</label>');
	domainStr.append('									<label class="radio inline">');
	domainStr.append('										<input  type="radio" name="domainType" id="domainType0" value="0" checked="checked"/>否</label>');
	domainStr.append('								</td>');
	domainStr.append('							</tr>');
	domainStr.append('							<tr>');
	domainStr.append('							<td> <label class="radio inline"> 开启状态:</label></td>');
	domainStr.append('								<td>');
	domainStr.append('									<label class="radio inline">');
	domainStr.append('									<input   type="radio" checked="checked" name="domainState" id="domainState1" value="1" checked="checked"/>是</label>');
	domainStr.append('									<label class="radio inline">');
	domainStr.append('									<input  type="radio" name="domainState" id="domainState0" value="0" />否</label>');
	domainStr.append('								</td>');
	domainStr.append('							</tr>');
	domainStr.append('						</tbody>');						
	domainStr.append('					</table>');
	domainStr.append('				</form>');
	domainStr.append('			</div>');
	domainStr.append('			<div style="text-align: center; padding: 5px" >');
	domainStr.append('				<a id="button"  href="javascript:void(0)" class="easyui-linkbutton  l-btn" >');
	domainStr.append('				     	<span class="l-btn-left">');
	domainStr.append('				     		<span class="l-btn-text">提交</span>');
	domainStr.append('				     	</span>');
	domainStr.append('				</a> ');
	domainStr.append('				<a  id="rebutton" href="javascript:void(0)" class="easyui-linkbutton l-btn">');
	domainStr.append('						<span class="l-btn-left">');
	domainStr.append('				     		<span class="l-btn-text">重置</span>');
	domainStr.append('				     	</span>');
	domainStr.append('				</a>');
	domainStr.append('			</div>');
	domainStr.append('		</div>');
	
	var dvbuffer = new StringBuffer();
	dvbuffer.append('<div  id="domainValueDiv" class="easyui-window" title="增加字典值" data-options="modal:true,iconCls:"icon-save",closed:true" style="left: 533px; top: 80px; width: 264px; z-index: 9002;">');
	dvbuffer.append('			<div style="padding: 10px 0 10px 10px">');
	dvbuffer.append('				<form id="domainValueForm" method="post">');
	dvbuffer.append('					 <input type="hidden" name="domainValueId" id="domainValueId" value="" />');
	dvbuffer.append('					 <input type="hidden" name="domain" id="domain" value="" />');
	dvbuffer.append('					 <input type="hidden" name="parentId" id="parentId" />');
	dvbuffer.append('					 <input type="hidden" name="flagValue" id="flagValue" />');
	dvbuffer.append('					<table>');
	dvbuffer.append('						<tr>');
	dvbuffer.append('							<td align=right>字典值:</td>');
	dvbuffer.append('							<td><input class="easyui-validatebox" type="text"  name="dmValue" id="dmValue"  style="width:150px"></input></td>');
	dvbuffer.append('						</tr>');
	dvbuffer.append('						<tr>');
	dvbuffer.append('							<td align=right>字典值含义:</td>');
	dvbuffer.append('							<td><input class="easyui-validatebox" type="text" name="dmValueMeaning" id="dmValueMeaning" style="width:150px" ></input></td>');
	dvbuffer.append('						</tr>');
	dvbuffer.append('					</table>');
	dvbuffer.append('				</form>');
	dvbuffer.append('			</div>');
	dvbuffer.append('			<div style="text-align: center; padding: 5px">');
	dvbuffer.append('				<a id="buttonValue" href="javascript:void(0)" class="easyui-linkbutton  l-btn">');
	dvbuffer.append('					<span class="l-btn-left">');
	dvbuffer.append('				     		<span class="l-btn-text">提交</span>');
	dvbuffer.append('				     </span>');
	dvbuffer.append('				</a> ');
	dvbuffer.append('				<a id="rebuttonValue" href="javascript:void(0)" class="easyui-linkbutton  l-btn">');
	dvbuffer.append('					<span class="l-btn-left">');
	dvbuffer.append('				     		<span class="l-btn-text">重置</span>');
	dvbuffer.append('				   	</span>');
	dvbuffer.append('				</a>');
	dvbuffer.append('			</div>');
	dvbuffer.append('		</div>');
	

	
	function loadAll(){
				$("#domainDG").datagrid({
					title : "字典",
					iconCls : 'icon-save',
					loadMsg : "数据加载中，请稍后......",
					width : '220',
					fitColumns : true,
					singleSelect : true,
					idField : 'domainCode',
					onBeforeLoad:function(row,param){
					var wdlength=$(document.body).width()*0.25-20;
					if(wdlength>220){
						wdlength = 220;
					}
					$("#domainDG").datagrid('resize', {
						   width : wdlength
					  });
					
					var w = $(".datagrid:first").width();
					$(".panel-header:first").css('width',w-30);
					$(".datagrid-wrap:first").css('width',w-20);
				   },
					onLoadSuccess:function(row){
					   var wdlength=$(document.body).width()*0.25-20;
						if(wdlength>220){
							wdlength = 220;
						}
					$(window).bind('resize', function () {
						 width : wdlength
					});
				},
					onSelect:function(rowidex,rowData){
					// *********************字典        选中时，触发事件***********************************/			
					if(rowData){
						var domainId=rowData.domainCode;
						
						var istree=rowData.domainType;
						// 如果字典值为树型，显示树型列表
						if(istree=='1'){
							//显示和隐藏div
							document.getElementById('domainValue').style.display = "none";
							document.getElementById('domainValueTree').style.display = "";	
							$.post(ctx+'/sysDomain/getAllItem.do?groupId=' + domainId,function(data){	
									$('#domainValueTreeDG').treegrid('loadData',data);
								
							 },'json')
						}else{
							document.getElementById('domainValueTree').style.display = "none";
							document.getElementById('domainValue').style.display = "";						
							$.post(ctx+'/sysDomain/getNodes.do?parentId=' + domainId,function(data){
								$("#domainValueDG").datagrid({title:"["+rowData.domainName+"]字典值"}); 
									$('#domainValueDG').datagrid('loadData',data);
								
							 },'json')
						
							
						}	
					}
				},
					url: ctx+"/sysDomain/getAll",
					columns : [ [  {
						field : 'domainCode',
						title : 'domainCode',
						width : 180,
						checkbox:'true'
					},{
						field : 'domainName',
						width : 180,
						title : '字典名称'
					}] ],
					toolbar : [ {
						id : 'btnadd',
						text : '添加',
						iconCls : 'icon-add',
						handler : function() {
							openCreateDomain();
						}
					}, '-', {
						id : 'btnedit',
						text : '修改',
						iconCls : 'icon-edit',
						handler : function() {
							openEditDomain();
						}
					}, '-', {
						id : 'btndel',
						text : '删除',
						iconCls : 'icon-remove',
						handler : function() {
							deleteDomain();
						}
					} ]
			
				});
			
				$("#domainValueDG").datagrid({
					title : "字典值",
					iconCls : 'icon-save',
					loadMsg : "数据加载中，请稍后......",
					nowrap : false,
					strped : true,
					collapsible : true,
					fitColumns : true,
					pagination:false,
					width : 600,
					singleSelect : true,
					idField : 'domainValueId',
					onBeforeLoad:function(row,param){
					   $("#domainValueDG").datagrid('resize', {
						   width : $(document.body).width()*0.5-20
						   
					  });
					$(window).bind('resize', function () {
						$("#domainValueDG").datagrid('resize', {
							   width : $(document.body).width()*0.5-20
							   
						  });
					});
					var w = $(".datagrid:last").width();
					$(".panel-header:last").css('width',w-30);
					$(".datagrid-wrap:last").css('width',w-20);
				   },
					columns : [ [  {
						field : 'domainValueId',
						title : 'domainValueId',
						checkbox:'true'
					}, {
						field : 'dmValue',
						title : '字典值',
						width : 200
					} , {
						field : 'dmValueMeaning',
						title : '字典值含义',
						width : 300
					}  ] ],
					toolbar : [ {
						id : 'btnadd',
						text : '添加',
						iconCls : 'icon-add',
						handler : function() {
							openCreateDomainValue();
						}
					}, '-', {
						id : 'btnedit',
						text : '修改',
						iconCls : 'icon-edit',
						handler : function() {
							openEditDomainValue();
						}
					}, '-', {
						id : 'btndel',
						text : '删除',
						iconCls : 'icon-remove',
						handler : function() {
							deleteDomainValue();
						}
					} ]
			
				});
				
				$("#domainValueTreeDG").treegrid({
					title : "字典值",
					iconCls: 'icon-ok',
					rownumbers: true,
					animate: true,
					collapsible: false,
					fitColumns: true,
					idField: 'dmValueMeaning',
					treeField: 'dmValueMeaning',
					showFooter: false,
					width:800,
					onBeforeLoad:function(row,param){
					   $("#domainValueTreeDG").treegrid('resize', {
						   width : $(document.body).width()*0.5-20
						   
					  });
					$(window).bind('resize', function () {
						$("#domainValueTreeDG").treegrid('resize', {
							   width : $(document.body).width()*0.5-20
							   
						  });
					});
					var w = $(".datagrid:last").width();
					$(".panel-header:last").css('width',w-30);
					$(".datagrid-wrap:last").css('width',w-20);
				   },
					columns : [ [ {
						field : 'dmValueMeaning',
						title : '字典值含义',
						width : 40
						}, {
						field : 'dmValue',
						title : '字典值',
						width : 150
						
					}  ] ],
					toolbar : [ {
						id : 'btnadd',
						text : '增加',
						iconCls : 'icon-add',
						handler : function() {
							openCreateDomainValue();
						}
					}, '-', {
						id : 'btnedit',
						text : '修改',
						iconCls : 'icon-edit',
						handler : function() {
							openEditDomainValue();
						}
					}, '-', {
						id : 'btndel',
						text : '删除',
						iconCls : 'icon-remove',
						handler : function() {
							deleteDomainValue();
						}
					} ]
					
			
				});

			
				
			    
			   
			    
				

				
	}




//***************************打开增加字典值窗口*********************************/	
	
	 var oevflag=1;
		function openCreateDomainValue(){
			oevflag=1;
			  var row = $('#domainDG').datagrid('getSelected');
			  if (row) {
				var domainId=row.domainCode;
				var $win;
				$win = $("<div id='tmpDomainValueDiv' ></div>").append(dvbuffer.toString()).window({
					   title: '增加字典值',
					   top:(screen.height-450)/2,
					    onClose: function(){ 
					    $('#tmpDomainValueDiv').window('destroy'); 
			           } 
				});
					// 将之前的数据清除
				$('#domainValueForm').form('clear');
					// 加载表单数据 1为增加
				$('#flagValue').val("1");
				
				$win.window('open');
	
				$("#buttonValue").click(function () {
					submitDomainValue();
				});
				$("#rebuttonValue").click(function () {
					clearDomainValueForm();
				});
			 }else{
				 alert("请先在左侧选择字典，然后增加字典值!");
			 }
			
			
		}

// *************************打开修改字典值窗口*************************************************/
	function openEditDomainValue(){
		oevflag=2;
		// 判断有没有选中的字典
		  var row = $('#domainDG').datagrid('getSelected');
		  if (row) {
			  var domainId=row.domainCode;
			var istree=row.domainType;	
			var domainValueId="";	
			if(istree=='1'){
				var domainValueRow = $('#domainValueTreeDG').treegrid('getSelected');
				
				if(domainValueRow){
					domainValueId = domainValueRow.domainValueId;
				}
				
			}else{			
				var domainValueRow = $('#domainValueDG').datagrid('getSelected');
				
				if(domainValueRow){
					domainValueId = domainValueRow.domainValueId;
				}
			}
			// 判断有没有选中的字典值
			if(domainValueId==""){
				alert("请在字典值列表中选择字典值进行修改!");
			}else{
					
					var $win;
					// document.getElementById('domainValueDiv').style.display = "";
					$win = $("<div id='tmpDomainValueDiv' ></div>").append(dvbuffer.toString()).window({
						   title: '修改字典值',
						   top:(screen.height-450)/2,
						   onClose: function(){ 
						     $('#tmpDomainValueDiv').window('destroy'); 
				           }
					});
						// 将之前的数据清除
					$('#domainValueForm').form('clear');
						// 加载表单数据
						// 1为增加2 为修改
					$('#flagValue').val("2");
					$('#dmValueMeaning').val(domainValueRow.dmValueMeaning);
					$('#dmValue').val(domainValueRow.dmValue);
	//				$('#state').val(domainValueRow.state);
					$('#domainValueId').val(domainValueRow.domainValueId);
					$win.window('open');
			
					$("#buttonValue").unbind('click').click(function () {
						submitDomainValue();
					});
					$("#rebuttonValue").unbind('click').click(function () {
						clearDomainValueForm();
					});
			
			}
				
		 }else{
			 alert("请先在左侧选择字典，选择字典值进行修改!");
		 }
		
		
	}
//*************************删除字典值***********************************/
	function deleteDomainValue(){
		
		
		//判断有没有选中的字典
		  var row = $('#domainDG').datagrid('getSelected');
		  if (row) {
			var domainId=row.domainCode;
			var istree=row.domainType;
			var domainValueId="";	
			if(istree=='1'){
				var domainValueRow = $('#domainValueTreeDG').treegrid('getSelected');
				if(domainValueRow){
					domainValueId = domainValueRow.domainValueId;
				}
				
			}else{			
				var domainValueRow = $('#domainValueDG').datagrid('getSelected');
				if(domainValueRow){
					domainValueId = domainValueRow.domainValueId;
				}
			}
			// 判断有没有选中的字典值
			if(domainValueId==""){
				alert("请在字典值列表中选择字典值进行删除!");
			}else{
		        if (confirm("确认要删除选中的字典值？")) {
					$.ajax({
		                cache: true,
		                type: "POST", 
		                url: ctx+"/sysDomain/delDomainValue?domainValueId="+domainValueId, 
		                error: function(request) {
						
						$('#alertMsg').empty();
	         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典值删除失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
	         		    $(".alert").delay(2000).hide(0);
	         		    $(".close").click(function(){
	         		    	$(".alert").hide();
	         		    });
		                },
		                success: function(data) {
							$('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典值删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });	
							if(istree=='1'){
								
								reloadDomainValueTree(domainId);
							}else{
								
								reloadDomainValueDG(domainId);
							}	
		                }
		            });
		        }		
			}
		 }else{
			 alert("请先在左侧选择字典，选择字典值进行删除!");
		 }
		  
	}
	
		//********************* 字典值提交编辑*******************************/
		function submitDomainValue(){		
			
			  var row = $('#domainDG').datagrid('getSelected');
			 
			  if (row) {
				var domainId=row.domainCode;
				var istree=row.domainType;
				$('#domain').val(domainId);	
				if(istree=='1'){
					
					var domainValueRow = $('#domainValueTreeDG').treegrid('getSelected');
					if(domainValueRow){
						var parentId = domainValueRow.domainValueId;
						$('#parentId').val(parentId);
					}
				}
				var obj = $('#dmValue');
				var value = $('#dmValue').val();
				var valueMeaning = $('#dmValueMeaning').val();
				var domainValueId= $('#domainValueId').val();
				var flagValue = $('#flagValue').val();
				if(value==''){
					alert('字典值代码不能为空！');
					return false;
				}
				if(valueMeaning==''){
					alert('字典值名称不能为空！');
					return false;
				}
				// flagValue = 1为新建 2为修改
				if (flagValue == '1') {
					$.ajax({
		                cache: true,
		                type: "POST",
		                url: ctx+"/sysDomain/addDomainValue", 
		                data:$('#domainValueForm').serialize(),// 你的formid
		                async: false,
		                error: function(request) {
						 $('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典值增加失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
		                },
		                
		                success: function(data) {
		                	$('#alertMsg').empty();
		                	if(data=='success'){
		                		$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典值增加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		                	}else{
		                		$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典值增加失败，字典值代码已经存在！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		                	}
		         			
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });			
							if(istree=='1'){
								reloadDomainValueTree(domainId);
							}else{
								reloadDomainValueDG(domainId);
							}						
							$('#tmpDomainValueDiv').window('destroy');
							
							
		                }
		            });
					
				} else {
					
					$.ajax({
		                cache: true,
		                type: "POST",
		                url: ctx+"/sysDomain/editDomainValue?domainValueId="+domainValueId,
		                data:$('#domainValueForm').serialize(),// 你的formid
		                async: false,
		                error: function(request) {
						 $('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典值修改失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
		                },
		                success: function(data) {
		                	$('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典值修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
							
							if(istree=='1'){
								reloadDomainValueTree(domainId);
							}else{
								reloadDomainValueDG(domainId);
							}	
							$('#tmpDomainValueDiv').window('destroy');
		                }
		            });
					
				}
				
			  }else{			  
				  alert('修改失败,请重新选择！');
				  $('#domainValueDiv').window('destroy');
			  }
			  
			
		}

	
	
		//*************** 打开增加字典窗口***************************************/
   var oeflag=1;
	function openCreateDomain(){
		oeflag=1;
		var $win;
	//	document.getElementById('domainDiv').style.display = "";
		$win = $("<div id='tmpDomainDiv' ></div>").append(domainStr.toString()).window({
		    title: '增加字典',
		    top:(screen.height-450)/2,
			onClose: function(){ 
			$('#tmpDomainDiv').window('destroy'); 
	           }
		});
		
		$win.window('open');
		// 将之前的数据清除
		$('#domainForm').form('clear');
		$('#domainState1').attr("checked","");
		$('#domainType0').attr("checked","");
		// 加载表单数据
		$('#flag').val("1");
		$("#button").unbind('click').click(function () {
			domainSubmit();
		});
		$("#rebutton").unbind('click').click(function () {
			clearDomainForm();
		});
	
	}
  //**************** ***********打开修改字典窗口********************************************/
  function openEditDomain(){
	  oeflag=2;
	  var row = $('#domainDG').datagrid('getSelected');
		if (row) {
			var domainId=row.domainCode;
				var $win =  $("<div id='tmpDomainDiv' ></div>").append(domainStr.toString()).window({
				    title: '修改字典',
				    top:(screen.height-450)/2,
				    onClose: function(){ 
					$('#tmpDomainDiv').window('destroy'); 
		           }
				});
				// 将之前的数据清除
				
				$('#domainForm').form('clear');
				$('#flag').val("2");
				$('#domainId').val(domainId);
				$('#domainName').val(row.domainName);
				$('#domainCode').val(row.domainCode);
				$('#oldDomainCode').val(row.domainCode);
				
				if(row.domainType=='1'){
					$('#domainType1').attr("checked","");
				}
				else{
					$('#domainType0').attr("checked","");
				}
				
				
			
				if(row.domainState=='1'){
					$('#domainState1').attr("checked","");
				}else{
					$('#domainState0').attr("checked","");
				}
				$win.window('open');
				$("#button").unbind('click').click(function () {
					domainSubmit();
				});
				$("#rebutton").unbind('click').click(function () {
					clearDomainForm();
				});


		} else {
			alert('请先选中要修改的选项!');
		}
  }
  
  //****************************** 删除字典 ****************************/
	function deleteDomain(){
		var row = $('#domainDG').datagrid('getSelected');
		if(row){
			var domainId=row.domainCode;
			var istree=row.domainType;
					
		     if (confirm("确认要删除选中的字典值？")) {
		    	
			    		$.ajax({
			                cache: true,
			                type: "POST", 
			                url: ctx+"/sysDomain/delDomainValueMeaning?domainValueId="+domainId, 
			                error: function(request) {
			    			 $('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典值删除失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
			                },
			                success: function(data) {
			                	$('#alertMsg').empty();
			         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典值删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
			         		    $(".alert").delay(2000).hide(0);
			         		    $(".close").click(function(){
			         		    	$(".alert").hide();
			         		    });
			                	if(istree=='1'){
									reloadDomainValueTree(domainId);
									deleteDomains(domainId);
								}else{
									reloadDomainValueDG(domainId);
									deleteDomains(domainId);
								}
			    				
			                }
			           
			            });
		    	 
			    		
		        
		     }

		}else{
			alert('请先选中要删除的选项!');
		}
	}
	
	function deleteDomains(domainId){
			$.ajax({
		                cache: true,
		                type: "POST",
		                
		                 url: ctx+"/sysDomain/delDomain?domainCode="+domainId, 
		                error: function(request) {
		                    $('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典删除失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
		                },
		                success: function(data) {
							$('#alertMsg').empty();
		         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
		         		    $(".alert").delay(2000).hide(0);
		         		    $(".close").click(function(){
		         		    	$(".alert").hide();
		         		    });
							reloadDomain();
		                }
		        });
		
	}
	
	// *************************** 字典编辑提交 **********************************/
	function domainSubmit(){
		var flag = $('#flag').val();
		var domainName = $('#domainName').val();
		var domainCode = $('#domainCode').val();
		var oldDomainCode= $('#oldDomainCode').val();
		if(domainName==''){
			alert('字典名称不能为空！');
			return false;
		}
		if(domainCode==''){
			alert('字典代码不能为空！');
			return false;
		}
		// flag = 1为新建 2为修改
		if (flag == '1') {		
			$.ajax({
                cache: true,
                type: "POST",
                url: ctx+"/sysDomain/addDomain", 
                data:$('#domainForm').serialize(),// 你的formid
                async: false,
                error: function(request) {
                    $('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典增加失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();
         		    });
                },
                success: function(data) {
                	$('#alertMsg').empty();
                	if(data=="success"){
          			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典增加成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                	}else{
                		$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典增加失败，字典代码已经存在！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
                	}
          		    $(".alert").delay(2000).hide(0);
          		    $(".close").click(function(){
          		    	$(".alert").hide();
          		    });
					
					reloadDomain();
				
					$('#tmpDomainDiv').window('destroy');
                
                }
            });
			
		} else {
			$.ajax({
                cache: true,
                type: "POST",
                url: ctx+"/sysDomain/editDomain?oldId="+oldDomainCode,
                data:$('#domainForm').serialize(),// 你的formid
                
                async: false,
                error: function(request) {
				$('#alertMsg').empty();
     			$('#alertMsg').append('<div class="alert alert-error"><strong>提示：</strong>字典修改失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
     		    $(".alert").delay(2000).hide(0);
     		    $(".close").click(function(){
     		    	$(".alert").hide();
     		    });
                },
                success: function(data) {
                	
                if(data=="success"){
                	$('#alertMsg').empty();
           			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>字典修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
           		    $(".alert").delay(2000).hide(0);
           		    $(".close").click(function(){
           		    	$(".alert").hide();
           		    });
					reloadDomain();
					
					$('#tmpDomainDiv').window('destroy');
                	}
                }
            });
			
		}
	}	
	
	
	function jsonToString (obj){   
        var THIS = this;    
        switch(typeof(obj)){   
            case 'string':   
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';   
            case 'array':   
                return '[' + obj.map(THIS.jsonToString).join(',') + ']';   
            case 'object':   
                 if(obj instanceof Array){   
                    var strArr = [];   
                    var len = obj.length;   
                    for(var i=0; i<len; i++){   
                        strArr.push(THIS.jsonToString(obj[i]));   
                    }   
                    return '[' + strArr.join(',') + ']';   
                }else if(obj==null){   
                    return 'null';   
  
                }else{   
                    var string = [];   
                    for (var property in obj) string.push(THIS.jsonToString(property) + ':' + THIS.jsonToString(obj[property]));   
                    return '{' + string.join(',') + '}';   
                }   
            case 'number':   
                return obj;   
            case false:   
                return obj;   
        }   
    }

	//**************************** 刷新字典数据 *********************************************/
	function reloadDomain(){
		$('#domainDG').datagrid('reload');
	}
	function reloadDomainValueDG(domainId){
		
		$.post(ctx+'/sysDomain/getAllItem.do?groupId=' + domainId,function(data){
		//	console.info(data);
			$('#domainValueDG').datagrid('loadData',data);
	 },'json')
	}
	function reloadDomainValueTree(domainId){		
		$.post(ctx+'/sysDomain/getAllItem.do?groupId=' + domainId,function(data){
			
			$('#domainValueTreeDG').treegrid('loadData',data);
	 },'json')
	}
	
	function clearDomainForm() {
		$('#domainForm').form('clear');
		if(oeflag=="2"){
			 var row = $('#domainDG').datagrid('getSelected');
			 var domainId=row.domainCode;
			    $('#flag').val("2");
				$('#domainId').val(domainId);
				$('#domainName').val(row.domainName);
				$('#domainCode').val(row.domainCode);
				$('#oldDomainCode').val(row.domainCode);
				
				if(row.domainType=='1'){
					$('#domainType1').attr("checked","");
				}
				else{
					$('#domainType0').attr("checked","");
				}
			
				if(row.domainState=='1'){
					$('#domainState1').attr("checked","");
				}else{
					$('#domainState0').attr("checked","");
				}
		}else{
			$('#domainType0').attr("checked","");
			$('#domainState1').attr("checked","");
		}
		$('#flag').val(oeflag);
	}
	function clearDomainValueForm() {
		$('#domainValueForm').form('clear');
		$('#flagValue').val(oevflag);
	}
