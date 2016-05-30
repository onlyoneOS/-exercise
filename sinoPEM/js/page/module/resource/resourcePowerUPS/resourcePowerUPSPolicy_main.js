
	var table='';
	
	function  getAllResourceDeviceprotocol(url){
		$('#taskTable').dataTable().fnDestroy();
		table=$('#taskTable').dataTable({
			"bProcessing": true,
			"bServerSide": true,
			"bLengthChange":false,
			"bFilter":false,
			"sAjaxSource":url,
			"bRetrieve": true,
			"bSort": false,
			"sServerMethod": "POST",
			"aoColumns": [
			              {"mData": "deviceNameString",  "mRender": function(data){
			            	  var ids = data.split(",");
			            	  var id = ids[1];
			            	  var type=ids[2]
			            	  var isCheck = "";
			            	  if(ids.length>2){
			            		  isCheck = "<input name='more' type='checkbox' id='"+type+"' value='"+id+"'/>";
			            	  }else{
			            		  isCheck = "<input name='more' type='checkbox' id='"+type+"' value='"+id+"'/>"; 
							  }	
			            	  return  isCheck;
			              }},
			              { "mData": "deviceName"},
			              { "mData": "roomName" },
			            //  { "mData": "productModelName"},
			              { "mData": "batteryVoltage" },
			              { "mData": "batteryCapacity" },
			              { "mData": "dischargeTime" },
			              //{ "mData": "remainTime" },
			              {"mData": "deviceNameString",  "mRender": function(data){
			            	  var ids = data.split(",");
			            	  var id = ids[1];
			            	  var isCheck = "";
			            	  if(ids.length>2){
			            		  isCheck = "<div style='float:left;' >" +
			            		  "<div style='display:block;float:left;color:blue;'>" +
			            		  "<a  id ='"+id+"'  href='#'  name='setbutton' >"+"设置"+"</a></div> " +	"</div>" ;
			            	  }else{
								   isCheck = "<div style='float:left;' >" +
					          		"<div style='display:block;float:left;color:blue;'>" +
	          		  			    "<a  id ='"+id+"'  href='#'  name='setbutton' >"+"设置"+"</a></div> " +	"</div>" ;
							  }				            	   
							  return  isCheck;			            	   				            	  
						  }},
				              
				          ],
				"sDom": "<'row'<'bt5left'l><'bt5right'f>r>t<'row'<'bt5left'i><'bt5right'p>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sLengthMenu": "页显示_MENU_ 条",
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
					
					  $('a[name="roomDetail"]').unbind('click').click(function () {
							
		                    //	alert("info     click ");
								var deviceId =this.id;
								//获取设备的详细配置信息
								getDeviceInfo(deviceId);
							
		                    });												
					
					$('a[name="modibutton"]').unbind('click').click(function () {
						var mid =this.id;
						modiRoomDevice(mid);
					});
					
					$('a[name="setbutton"]').unbind('click').click(function () {
						var mid =this.id;
						setRoomDevice(mid);
					});
					
					$('a[name="delbutton"]').unbind('click').click(function () {
						var mid =this.id;
						delRoomDevice(mid);
					});
					$('a[name="_ups_a"]').unbind('click').click(function () {
						var id =this.id;
						upsHandlerA(id);
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
					  
					});
				} 
			
			});
		}
			
	function loadAll(){
		
		//初始化厂商
		$(".ultra-select-input3").uic_Dropdown({
		
			inputName : '_sino_partner',
			height:"auto",// 宽度
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId="+3,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			width:"400px",
			onSelect:function(id,value){
			
				$('#partnerId').val(id);
				var patnerId=$('#partnerId').val();
				getProductModel(productTypeId,patnerId);
				$('#productLine').val('');
				$('#productModelId').val('');
			}
		});
		
		//初始化UPS型号
		var $formSelectProductModel=$("#formSelectProductModel");
		$formSelectProductModel.addClass("li_form");
		var productTypeId = $('#productType').val();
		var partnerId = $('#partnerId').val();
		var optionProductModel = {
				inputName : "productModel",
				writeType : 'show',
//				url:productModelurl,
				inputValue : $("#productModelId").val(),
				showLabel : false,
				width : "282",
				inputValue:"null",
				onSelect:function(node){
					var productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
					$('#productModelId').val(productModelId); 
				}
			};
		$formSelectProductModel.formSelect(optionProductModel);
	
		//获取所有机房信息
		var rUrl = ctx+"/powerUPS/getAllRoomInfo";
		getRoomInfo(rUrl);
		
		$("#createbutton").unbind('click').click(function () {
			create();
		});
		//绑定批量设置事件
		$("#addMore").unbind('click').click(function(){
			var ids=this.id;
			addMoreResourceUPS(ids);
		});
		
		//绑定全选事件
		$("#selAll").unbind("click").click(function(){

			  var isChecked = $("#selAll").attr("checked");
			  if(isChecked == "checked"){
				  
				  $('input[name="more"]').each(function(){
					    var data = $(this);
					    data.attr("checked", "checked"); 
				   });	  
			  }else{
				  $('input[name="more"]').each(function(){
					    var data = $(this);
					    data.attr("checked", null);
				   });
			  }
		
		});
		
		 $("#_sino_partner_model_search").bind('click',function(){
			 searchModelTable();
         });
		 $("#_sino_partner_model_reload").bind('click',function(){
			 var options = {};
			options.murl = 'powerUPS/powerUPSPolicy';
			// $.openurl(options);
			$('#edit_list').empty();
			$('#edit_list').load(options.murl,function(){
				
			});
         });
		 var URL = ctx+"/powerUPS/getAllUPSPolicy";
		getAllResourceDeviceprotocol(URL);
	};
	//选择厂商信息
	function getPartnerInfo(productTypeId){
			$("#_sino_partner_div").empty();
			$("#_sino_partner_div").append('<input id="_sino_partner" name="_sino_partner" type="text" class="ultra-select-input3"  data="0" />');
			
			//加载厂商
			$(".ultra-select-input3").uic_Dropdown({
				inputName : '_sino_partner',
				height:"auto",// 宽度
				title: "厂商",
				selecttitle:"从下列选择", //标题
				url:ctx+"/base/partnerInfo/getAll?productTypeId="+productTypeId,	 //型号分组数据
				checkbox:false,
				branchtype:true,
				search:false,
				width:"300px",
				inputValue:"null",
				onSelect:function(id,value){
				var productModelurl = ctx + "/roomDevice/getProductModelByFourConditions?productTypeId="+3+"&partnerId="+partnerId;
					getProductModel(productModelurl);
				}
			});
		}
	//UPS型号选择
	function getProductModel(){
		$("#formSelectProductModel").empty();
		var $formSelectProductModel=$("#formSelectProductModel");
		var partnerId = $('#partnerId').val();
		var productModelurl = ctx + "/roomDevice/getProductModelByFourConditions?productTypeId="+3+"&partnerId="+partnerId;
		$formSelectProductModel.addClass("li_form");
		var optionProductModel = {
				inputName : "productModel",
				writeType : 'show',
				showLabel : false,
				url : productModelurl,
				onSelect:function(node){
					var productModelIds = $("#formSelectProductModel").formSelect("getValue")[0];
					$('#productModelId').val(productModelIds); 
				},
				width : "282"
			};
		$formSelectProductModel.formSelect(optionProductModel);
	}

	function RefreshTable(){
		table.fnSort( [ [1,'asc'] ] );
		table.fnSort( [ [1,'desc'] ] );
	} 
	/*
	 * 设置
	 */
	function setRoomDevice(id){
		 
	    var mid = id;
	    var murl = ctx+"/powerUPS/set?deviceId="+mid;
//		$('.edit_list').empty();
//		$('.edit_list').load(murl,function(){
//				
//		});
		$.post(murl,function(data) {
		    window.open(data);
		});
	}
	
	
     /**
 	 *  获取所有机房信息
 	 */
 	 function  getRoomInfo(roomUrl){
 		   
 			$('#roomInfo').empty();
 			var $fieldCompDevType = $("#roomInfo");
 			$fieldCompDevType.addClass("li_form");
 			var optionCompDevTypes = {
 				inputName : "room",
 				writeType : 'show',
 				width: "280", //高度
 				showLabel : false,
 				url : roomUrl,
 				inputValue:"all",
 				onSelect :function(id){
 					
 				}  
 			   
 			};
 			$fieldCompDevType.formSelect(optionCompDevTypes);
 				 
 	 }
 	 
 	 /*
 	  * 查询条件
 	  */
 	function searchModelTable(){
 		var  roomId = $("#roomInfo").formSelect("getValue")[0];
 		var  partnerId = $(".ultra-select-input3").uic_Dropdown('getValue').id;
 		
 		if(partnerId == undefined){
 			partnerId="null";
 		}
 		
 		var  productModelId = $("#formSelectProductModel").formSelect("getValue")[0];
 		if(productModelId == ""){
 			productModelId="null";
 		}
 		var  URL=ctx+"/powerUPS/getAllUPSPolicy?roomId="+roomId+"&partnerId="+partnerId+"&productModelId="+productModelId;
 		getAllResourceDeviceprotocol(URL);
	}
 	 
     /**
      *  批量设置
      */
      function  addMoreResourceUPS(ids){
    	   
  		   var  ids = new Array();
  		   var  types = new Array();
  		   var  datas =  $('input[name="more"]').each(function(){
  			    var data = $(this);
  			    if(data.attr("checked")=="checked"){
  			    	var id = data.val().split(",");	
  			    	//ids.push(data.val()); 
  			    	ids.push(id[0]);
  			    	var type=$(this).attr("id")
  			    	types.push(type);
  			    }  
  		   });
  		   if(ids.length==0) return;
 		   for(var i=0; i<types.length; i++){
 			   if(types[i] != types[0]){
 				 $("#mesg").empty();
 				 $("#mesg").show();
 				 var str = '<div class="alert alert-error"><strong>提示: </strong>请选择同一型号的设备!<button type="button" class="close" data-dismiss="alert">&times;</button></div>'
 				 $("#mesg").append(str);
 				 $("#mesg").delay(2000).hide(0);
 				$('#taskTable').dataTable().fnDraw(false);
 				 return false;
 			   }
 				
 		   }
  		   var url = ctx+"/powerUPS/addMoreResourceUPSPage?ids=" + ids;
  		   $("#dailogs1").empty();
  		   var buffer = new StringBuffer();
  		   buffer.append('<div id="_sino_eoss_sales_products_import_page" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="_sino_eoss_sales_products_import_page" aria-hidden="true">');
  		   $("#dailogs1").append(buffer.toString());
  		   $("#_sino_eoss_sales_products_import_page").load(url,function(){
  			var mUrl = ctx+"/powerUPS/addNewResourceUpsControl?ids="+ids;
			 	$("#btnConfirmq").unbind("click").click(function(){
			 		// alert("add more in");
			 	     $("#addMoreForm").ajaxSubmit({
			 	    	 url:mUrl,
			 	    	 type:"post",
			 	    	 async:false,
			 	    	 success:function(data){
//			 	    		 window.parent.location.reload();
			 	    		 $("#_sino_eoss_sales_products_import_page").modal('hide');
				 	    	 $('#edit_list').empty();									 	    	 
				 	    	 $('#edit_list').load(ctx + '/powerUPS/powerUPSPolicy?tmp=' + Math.random());
			 	    	 }
			 	     }); 	                
			 	});
			 	
			 $("#site").unbind("click").click(function(){
			 		 $('#edit_list').empty();					
			 		 $('#edit_list').load(ctx + '/powerUPS/powerUPSPolicy?tmp=' + Math.random());     					 	    	
			  });
  			 
  		 });
     	
    }	
