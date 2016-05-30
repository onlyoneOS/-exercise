	    function loadAll(){
	    	$(".date").datetimepicker({
		    	pickTime: false
		    });
	    	$('#search').unbind('click').click(function() {			 
	    		var user=$("#users").val();
	    		var startTime=$("#startTime").val();
	    		var endTime=$("#endTime").val();
	    		var url=ctx +"/log/getAllLogs?user="+user+"&startTime="+startTime+"&endTime="+endTime;
	    			$("#taskTable").dataTableEX("ReDraw",url);
		  });
	    	
	    	getUser();
	    	var url=ctx +"/log/getAllLogs?tmp=" + Math.random();
	    	loadTable(url);
	   }
	    
	    function getUser(){
	    	var rUrl = ctx+"/user/getAllUsers";
			$("#user").empty();
			var room="";
			var $fieldCompDevType = $("#user");
			$fieldCompDevType.addClass("li_form");
			var optionCompDevTypes = {
				inputName : "name",
				writeType : "show",
				width: "250", //高度
				showLabel : false,
				url : rUrl,
				inputValue:"name",
				onSelect :function(id){
					var sname=$('.uicSelectData li[infinityid="'+id+'"]').attr("infinityname");
					$("#users").val(sname);
				}  
			};
			$fieldCompDevType.formSelect(optionCompDevTypes);
			/*var roomId = "";
			$("#user").find("ul li").each(function(i,ele){
				if(i == 1){
					var obj = $(ele);
					roomId = obj.attr("infinityid");
					room=roomId;
				}
			});
			$("#roomId").formSelect('setValue',roomId);*/
		}
	    
	    
	    function loadTable(url){
	    	var $field = $("#taskTable");
	    	var options = {
	    		url : url,
	    		enableCRUD : true,
	    		bFilter:false,
	    		dtCallBack:function(){
	    	 		
	    			},
	    	    mData : [
	                  { "mData": "optid" },
	                  { "mData": "userName" },
	                  { "mData": "optInfo"},
	                  { "mData": "optTime","mRender":function(data){
	                	 var st=data;
	                	 st=format(st);
	                	  return st;
	                  }}
	              ]
	    	}
	    	$field.dataTableEX(options);
	    }
	    function format(time){
    	    var datetime = new Date();
    	    datetime.setTime(time);
    	    var year = datetime.getFullYear();
    	    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
    	    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
    	    var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
    	    var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
    	    var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
    	    return year + "-" + month + "-" + date+" "+hour+":"+minute+":"+second;
    	}
    	