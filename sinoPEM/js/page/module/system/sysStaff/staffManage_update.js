   function loadAll(){
    	
		/* //学历列表
		 var eduId = $("#ed").val();
		 getEducation(eduId);
		 //时间选择框
		 var timeObject = $("#birth");
		 getTime(timeObject);*/
		 //获取org下拉树
		 getOrgTree();
		 //获取岗位下拉树
		var orgId = $("#realOrgId").val();
		// getPosition(orgId);
		 //获取领导列表
		 /*  var leaderValue = $("#lea").val();	
		 var posId = $("#realPosId").val();
		 getLeader(posId, leaderValue);
		 //是否隐藏初始化
		 $("#more").unbind('click').click(function(){
			 var isShow = $("#isShow").css("display");
			 if(isShow == "none"){
				 $("#isShow").show();
			 }else{
				 $("#isShow").hide(); 
			 }
		 });*/
		 
		 //输入时格式验证
		 var staffNameObject =  $("#staffName");
		 var nameMsgObject = $("#nameMsg");
		 staffNameObject.unbind('blur').blur(function(){
  			 validateNull(staffNameObject, nameMsgObject);
  		 });
			     
		 var staCodeObject =  $("#staCode");
		 var codeMsgObject =  $("#codeMsg");
		 staCodeObject.unbind('blur').blur(function(){			 
			 validateDigiter(staCodeObject, codeMsgObject);
		 });
		 			 			 
		 var saveObject = $("#modiStaff");
		 var formObject = $("#modiForm");
		
		 saveObject.unbind('click').click(function(){			
			 //提交时格式验证
			 var flag1 = false;
			 var flag2 = false;
			 flag1 = validateNull(staffNameObject, nameMsgObject);
			 flag2 = validateDigiter(staCodeObject, codeMsgObject);
			 if(flag1) return;	
			 if(flag2) return;
			 var staffId = $("#staffId").val();
			 var name=$("#loginName").val();
			 var staffUrl = ctx+"/staff/modiStaff?staffId="+staffId+"&loginName="+name;
			 formObject.ajaxSubmit({
					  url:staffUrl,
					  type:"post",
					  success : function(re){					  
						var pUrl = ctx+"/staff/manageStaff" ;
						$("#myModal2").modal('hide');
						/*$('#edit_list').empty();
						$('#edit_list').load(pUrl);	*/
						if(re=="success"){
		                	   $('.edit_list').load(ctx + '/staff/manageStaff?tmp=' + Math.random(),{},function(){
		                			$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>员工修改成功！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
		                	   });
		                
			         		 
		                   }else{
		                	   $('.edit_list').load(ctx + '/staff/manageStaff?tmp=' + Math.random(),{},function(){
		                			$('#alertMsg').empty();
				         			$('#alertMsg').append('<div class="alert alert-success"><strong>提示：</strong>员工修改失败！<button type="button" class="close" data-dismiss="alert">&times;</button></div>');
				         		    $(".alert").delay(2000).hide(0);
				         		    $(".close").click(function(){
				         		    	$(".alert").hide();
				         		    });
		                	   });
		                   }
						$("#taskTable").dataTable().fnDraw(false);
						
					  }				 					 
				 });
		 });
		 		 			 			 			 			 	    	   	
    }

		
    /**
     *  获取org下拉树
     */
    function  getOrgTree(){   
 	    var orgId = $("#realOrgId").val();
 	    var orgName = $("#realOrgName").val();
 	    var orgTree = $("#orgTree");
 		var optionsOrg = {
 			//	inputName : 'orgId',
 			//	inputText :"orgId",
 				//labelName : 'formTree',
 			//	Checkbox : 'true',
 				// onlyLeafCheck : true,
 				animate : true,
 				//width:160,
 				searchTree : true,
 				tree_url : ctx+'/formTree/getTreeOrg?random=1',// 顶层
 				asyncUrl : ctx+'/formTree/getTreeOrg?random=1',// 异步
 				search_url : ctx+'/formTree/searchTreeOrg?random=1',// 搜索
 				find_url : ctx+'/formTree/getTreeOrg?random=1',// 精确定位
 				url : '',
 				asyncParam : ["id"],
 				addparams : [{
 							name : "orgParentId",
 							value : "root"
 						}],
 				async : true,
                inputChange:function(){	
 					var orgId = $("#orgTree").formTree("getValue");
 					$("#realOrg").attr("value", orgId);
 				}
 			};
 		
 		optionsOrg.resIds = orgId;
 		optionsOrg.inputValue = orgName;
 		optionsOrg.inputRealValue = orgId;	
 	 	orgTree.formTree(optionsOrg);
    }	
    
    
    /**
     * 获取岗位信息
     */
    function   getPosition(paramId){
    
 	    var posId = $("#realPosId").val();
 	    var posName = $("#realPosName").val();
 	    var posTree = $("#pos");
 	    posTree.empty();
 		var optionsPos = {
 			//	inputName : 'posId',
 				animate : true,
 				//width:160,
 				searchTree : true,
 				tree_url : ctx+'/positonFormTree/getPositonTree?random=1',// 顶层
 				asyncUrl : ctx+'/positonFormTree/getPositonTree?random=1',// 异步
 				search_url : ctx+'/positonFormTree/searchPostionTree?random=1',// 搜索
 				find_url : ctx+'/positonFormTree/getPositonTree?random=1',// 精确定位
 				url : '',
 				asyncParam : ["id"],
 				addparams : [{
 							name : "orgId",
 							value : paramId
 						}],
 				async : true,
                 inputChange:function(){
 					
 					/*var posId = $("#pos").formTree("getValue");
 					$("#realPos").attr("value", posId);	*/
 					
 					//getLeader(posId, '');
 				
 				}
 				
 			};
 		
 		 optionsPos.resIds = posId;
 		 optionsPos.inputValue = posName;
 		
 		 posTree.formTree(optionsPos);
   
 	   
    }
    
    /**
     *  时间插件
     */
     /* function  getTime(object){
    	  object.datetimepicker({ 
    	       
   	        pickTime: false
   	 
   	      }); 
     	 

      }
      */
      /**
       *  根据部门岗位选领导
       */
       /* function   getLeader(posId,idParam){
        	
        	 //   alert("leaderId        "+idParam);
     		    var leaderUrl = ctx +"/staff/getLeaderListByPos?posId="+posId;
     			$('#leader').empty();
     			var $fieldCompDevType = $("#leader");
     			$fieldCompDevType.addClass("li_form");
     			var optionCompDevTypes = {
     				//inputName : "staffLeaderId",
     				writeType : 'show',
     				width: "280", //高度
     				showLabel : false,
     				url : leaderUrl,
     				inputValue:idParam,
     				onSelect:function(node){
    					var staffId = $("#leader").formSelect("getValue")[0];
    				//	var staffId = node.id;   					
    					$('#lea').val(staffId); 
    				}
     				
     			};
     			$fieldCompDevType.formSelect(optionCompDevTypes);		     	 
          }
 
        */
     /**
   	  *  获取学历信息
   	  */
   	  /*
		 * function getEducation(idParam){ // alert("eduId "+idParam); var
		 * eduUrl = ctx +"/staff/getEducationList"; $('#edu').empty(); var
		 * $fieldCompDevType = $("#edu"); $fieldCompDevType.addClass("li_form");
		 * var optionCompDevTypes = { //inputName : "education", writeType :
		 * 'show', width: "280", //高度 showLabel : false, url : eduUrl,
		 * //checkValue : ["idParam", "博士"], inputValue:idParam,
		 * onSelect:function(node){ var eduId =
		 * $("#edu").formSelect("getValue")[0]; //var eduId = node.id;
		 * $('#ed').val(eduId); } };
		 * $fieldCompDevType.formSelect(optionCompDevTypes); }
		 */
    	/**
		 * 非空验证
		 */
     	  function  validateNull(obj, msg){    		  
     		 var  str = "<font size='2' color='red'>不能为空!</font>";  			
  		     if(obj.val() == ""){
  	   			msg.empty();
  	   			msg.show();
  	   			msg.append(str);
  	   			msg.delay(2000).hide(0);	   	
  	   			return true;
  	   		  }   			 
     		    return false;      		   
     	  }
     	  
     	/**
     	 *  数字验证
     	 */
     	 function  validateDigiter(obj, msg){    		  
    		  var  str = "<font size='2' color='red'>请输入数字!</font>";
    		 // var  reg = /^[\u0391-\uFFE5\w]+$/; 
    		  var  reg = /^[0-9]*$/;   		  
  		     if(!reg.test(obj.val())){
  	  			msg.empty();
  	  			msg.show();
  	  			msg.append(str);
  	  			msg.delay(2000).hide(0);
  	  			return true;
  	  		  }    			 		 
    		    return false;    			  

    	  }
