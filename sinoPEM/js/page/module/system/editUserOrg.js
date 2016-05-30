function load() {
	var setting = {
		data : {
			key : {
				name : "orgName",
				title : "orgName"
			},
			simpleData : {
				enable : true,
				idKey : "orgId",
				pIdKey : "parentId",
				rootPId : -1
			}
		},
		view : {
			selectedMulti : true
		},
		check : {
			enable : true,
			chkStyle : "radio",
			autoCheckTrigger : true,
			nocheckInherit : true,
			chkDisabledInherit : true,

			chkboxType : {
				"Y" : "",
				"N" : "s"
			}
		},
		callback : {
			onCheck : zTreeOnCheck
		}
	};
	$.ajax({
				type : 'POST',
				url : ctx + "/user/getOrgTreeData?userId="
						+ $('#userId').attr("value"),
				success : function(result) {
					org_Tree = $.fn.zTree.init($("#resourcesTree"), setting,
							result);
					org_Tree.expandAll(true);
				}
			});
}

function zTreeOnCheck(event, treeId, treeNode) {
	var orgChildNodes = org_Tree.getCheckedNodes(true);
	var orgNodes = "";
	for (var i = 0; i < orgChildNodes.length; i++) {
		orgNodes += orgChildNodes[i].orgId + ",";
	}
	$('#orgIds').attr("value", orgNodes);
	return true;
};
