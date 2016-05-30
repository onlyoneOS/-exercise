
function load() {
    	var partnerId=$("#partnerId").val();
    	var productModel=$("#productModel").val(); 
    	var partner=$("#partner").val();
    	var eventName=$("#eventName").val();
    	
		var productUrl = ''
		
		//厂商信息
		getPartnerInfo();
		//设备型号
		getProductModel("");
		var selectUrl = ctx +"/eventType/eventTypeMainSelectPage";
		var  tableUrl = ctx + "/eventType/eventTypeMainTablePage";
    	
		var url = ctx + "/eventRelated/getRelatedBySelt?partnerId="+partnerId+"&productModel="+productModel+"&tmp=" + Math.random();
		loadTable(url);
		
		
		//查询
		$('#search').unbind('click').click(function() { 
			var partnerId = $('#partnerId').val();
			var productModel = $('#productModel').val();
			url = ctx + "/eventRelated/getRelatedBySelt?partnerId="+partnerId+"&productModel="+productModel+"&tmp=" + Math.random();
			reload(url);
		});
		
		
		$("#reload").unbind("click").click(function(){
    		$('#edit_list').empty();
    		$('.edit_list').load(ctx + '/eventRelated/manager?tmp=' + Math.random());
    	});
		
		//添加
		$('#add').unbind('click').click(function() {			 
				$('#edit_list').load(ctx + "/eventRelated/addEventRelated?tmp=" + Math.random());
		});
    function modiEventRelated(){
    	$('#edit_list').load(ctx + "/eventRelated/updateEventRelated?id=" +$(this).attr("id"));
		}
    function delEventRelated(){
    	$.ajax({
			url: ctx + "/eventRelated/delEventRelated?id=" +$(this).attr("id"),  // 提交的页面
            data: "", // 从表单中获取数据
            type: "POST",                   // 设置请求类型为"POST"，默认为"GET"
            beforeSend: function()          // 设置表单提交前方法
            {
              //  new screenClass().lock();
            },
            error: function(request) {     // 设置表单提交出错
            	 $('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-error"><strong>错误：</strong>事件关联删除失败，请稍后再试！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();
         		    });
            },
            success: function(data) {
            // 设置表单提交完成使用方法
           // 	alert("表单提交成功"+data);
//        		   RefreshTable();
            	if(data=="success"){
            		$('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件关联删除成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();  
         		    	
         		    });
            	}else{
            		$('#alertMsg').empty();
         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>事件关联删除失敗！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
         		    $(".alert").delay(2000).hide(0);
         		    $(".close").click(function(){
         		    	$(".alert").hide();  
         		    	
         		    });
            	}
            	 $("#taskTable").dataTable().fnDraw(false);
            }
          });
        }
		
    function getPartnerInfo(){
		var id="";
		$("#partnerId_div").empty();
		$("#partnerId_div").append('<input  type="text" class="ultra-select-input3" maxlength="100"   data="0" />');
		//加载厂商
		$(".ultra-select-input3").uic_Dropdown({
			height:"auto",// 宽度
			width:"300px",
			title: "厂商",
			selecttitle:"从下列选择", //标题
			url:ctx+"/base/partnerInfo/getAll?productTypeId="+id,	 //型号分组数据
			checkbox:false,
			branchtype:true,
			search:false,
			onSelect:function(id,value){
				getProductModel(id);
			//	getEvnet(id,productModel);
				$('#partnerId').attr("value",id);
				if ( typeof($("#indicatorIdDiv .uicSelectData ul").find("li").first().attr("infinityid")) == "undefined") {
				}
			}
		});
	}
    //加载设备类型
    function getProductModel(id){
		var $productModelDiv=$("#productModelDiv");
		$productModelDiv.empty();
		 partnerType = $('#partnerType').val();
		 partnerId = $('#partnerId').val();
		 partnerLine = $('#partnerLine').val();
		var productModelurl = ctx + "/roomDevice/getProductModelByFourCondition?productTypeId="+partnerType+"&partnerId="+id+"&productLineId="+partnerLine+"&tmp="+Math.random();
		$productModelDiv.addClass("li_form");
		var optionProductModel = {
				inputName: 'productModelName',
				writeType : 'show',
				showLabel : false,
				url : productModelurl,
				onSelect:function(node){
					var str1 = $productModelDiv.formSelect("getValue")+"";
					var productModelId = str1.split(",");
					$('#productModel').val(productModelId[0]);
					
				//	getEvnet(partnerId,productModelId[0]);
					
				},
				width : "282"
			};
		$productModelDiv.formSelect(optionProductModel);
		$('#productModel').val($("#productModelDiv .uicSelectData ul").find("li").first().attr("infinityid"));
		
	}
		function eventDetail(){
			$('#edit_list').load( ctx + "/eventRelated/eventDetailPage?id=" + $(this).attr("id"));
		}
		function loadTable(url){
			var $field = $("#taskTable");
			var options = {
				url : url,
				enableCRUD : true,
				bFilter:false,
				dtCallBack:function(){
			 		 $("a[name='delEventRelated']").unbind('click').bind("click",delEventRelated);
			 		 $("a[name='modiEventRelated']").unbind('click').bind('click',modiEventRelated);
			 		$('a[name="eventDetail"]').unbind('click').bind("click",eventDetail);
					},
			    mData : [
		              { "mData": "id" },
		              { "mData": "eventName"},
		              { "mData": "partnerName" },
		              { "mData": "productModelName"},
		              { "mData": "count","mRender":function(data,row,obj){
		            	  var type=data;
		            	  var ids=obj.id;
		            		var  ch='<a  name="eventDetail" id="'+ids+'"  role="button" target="_self"  data-toggle="modal" >&nbsp'+type+'</a>&nbsp;'
		            	  return ch;
		              }},
		              { "mData": "eventDesc"},
		              { "mData": "id","mRender": function (data) {
		            	  var rstatus='';
		            	  var id = data;
		          		  rstatus="<a name ='modiEventRelated'   role='button' data-toggle='modal'  id='"+id+"'>" +
		          		  		"<button title='修改' class='room-command-button room-edit-command-button roommodi'></button></a>" +
		          		  		"<a name='delEventRelated' href='#' id='"+id+"'>&nbsp" +
		          		  		"<button title='删除' class='room-command-button room-delete-command-button roomdel'></button></a>&nbsp;&nbsp;" ;
		          		  return rstatus;
		          		  
		              } }
		          ]
			}
			$field.dataTableEX(options);
		}
		
		function reload(url){
			$("#taskTable").dataTableEX("ReDraw",url);
		}
		
	};
