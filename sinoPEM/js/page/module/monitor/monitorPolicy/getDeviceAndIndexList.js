
 /**
  *  设备及性能列表初始化接口
  */
function loadAll(){
	  $("#collectSearch").unbind('click').click(function(){		  
		  var  typeId = $("#productTypeTree").formSelect("getValue")[0]; 
		  var roomId = $("#room").formSelect("getValue")[0];
		  if ( roomId == 'all' ) {
			  roomId = '';
		  }
		  getDevicemanage(typeId, roomId);
					  
	  });
	  
	  $("#reSet").unbind('click').click(function(){		  
		    getDevicemanage("", "");
			getProductTypeTree( );
	  });
	  //数据初始化
		 getDevicemanage("", "");
		 getProductTypeTree( );
		 getRoomInfo();
  };
 
  	
   /**
    *  所有设备信息
    */
   function  getDevicemanage(typeId, roomId){
	    var ur = ctx+"/monitorPolicy/getResourceDeviceManages?typeId="+typeId+"&roomId="+roomId;
	    $("#dev").datagrid({
            title:'请选择设备',  
            iconCls:'icon-save',  
	        width: 580,
	    	height:280,  
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
	    		field:"deviceName",
	    		title:"设备名称",
	    	    width:"80",
	    	    sortable: false
	    	  },{		    		
	    		  field:"productTypeName",
	    		  title:"设备类型",
	    		  width:"100"
	    	  },{
	    		  field:"roomName",
	    		  title:"所属机构",
	    		  width:"80"
	    	  },{
	    		  field:"manageIp",
	    		  title:"管理地址",
	    		  width:"160"
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
   
	function deviceName(value,row){
		return "<a href='#' id='"+row.id+"' name='indicatorbutton'>"+value+"</a>";
	}
  
  
	  	  
	/**
	 * 获取产品类别下拉树
	 */
	function getProductTypeTree( ){

		  $("#productTypeTree").empty();
		  var productTypeTree = $("#productTypeTree");	 
		  
		  var optionsProductType = {
				inputName : "deviceTypeId",
				writeType : 'show',
				width: "200", //高度
				showLabel : false,
				url : ctx+'/base/productType/getProType',
				inputValue:"all"
		    };
		  
			productTypeTree.formSelect(optionsProductType);
  
	  }
	  
	/**
	 * 获取机房下拉框
	 */
	 function  getRoomInfo(){
		   
			$('#room').empty();
			var $fieldCompDevType = $("#room");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "room",
				writeType : 'show',
				width: "200", //高度
				showLabel : false,
				url : ctx+"/resourceDeviceprotocol/getAllRoomInfo",
				inputValue:"all",
				onSelect :function(id){
					  var  typeId = $("#type").formTree("getValue");
					  if(typeId=="")
						    typeId = "all";
				}  
			   
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
				 
	 }
