function loadAll(){  	  
	  //数据初始化
	var partnerId=$("#partnerId").val();
	var productModel=$("#productModel").val();
	getEvents(partnerId, productModel);
  };
   function  getEvents(partnerId, productModel){ 
	    var ur = ctx+"/eventRelated/getAllEvent?partnerId="+partnerId+"&productModel="+productModel;
	    $("#dev").datagrid({
            title:'请选择事件',  
            iconCls:'icon-save',  
	        width: 600,
	    	height:"340",  
            nowrap: true,  
	        autoRowHeight: false,  
            striped: true,  
            collapsible:false,  
	    	url:ur,  
	        sortOrder: 'desc',  
	    	remoteSort: false,  
	        pagination:true,  
	        rownumbers:true,
	        singleSelect:false,
	    	idField:'id',
	    frozenColumns:[[  
                   {field:'id',checkbox:true}
               ]],
	     columns:[[
	    	 {
	    		field:"eventName",
	    		title:"事件名称",
	    	    width:"150",
	    	    sortable: false
	    	  },{		    		
	    		  field:"eventDesc",
	    		  title:"性能指标",
	    		  width:"150"
	    	  },{		    		
	    		  field:"productModelName",
	    		  title:"设备厂商",
	    		  width:"150"
	    	  },{		    		
	    		  field:"partnerName",
	    		  title:"设备型号",
	    		  width:"150"
	    	  }      		 
	    	  ]],

	  	onLoadSuccess : function(data){
	  		
	  		$('a[name="indicatorbutton"]').unbind('click').click(function () {
	  			var Ids='';
	  			Ids+="'"+this.id+"',";
	  			Ids=Ids.substr(0,Ids.length-1);
			});

	  		
		},
		onSelectAll:function(rows){
			$("#indicat").hide();
			var allDeviceIds='';
			$.each(rows,function(idx,val){//遍历JSON
	              if(val.id!=null){
	            	  allDeviceIds+="'"+val.id+"',";
	              }
              });
			allDeviceIds=allDeviceIds.substr(0,allDeviceIds.length-1);
			
		},
		onUnselectAll:function(rows){
			
			$.each(rows,function(idx,val){//遍历JSON
	              if(val.id!=null){
	      			clearSelectIndector(val.id);
	              }

              });

		},

	    onUnselect:function(rowIndex,rowData){
		    	var devUnSelectedId =rowData.id;
		    	clearSelectIndector(devUnSelectedId);
	    	}
	    });
   }