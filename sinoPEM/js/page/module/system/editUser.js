function loadAll() {
	var isSingle = 'false';
	var accordion = null;
	var userForm = null;
	var userId = null;
	var $fieldUserState = $("#formUserState");
	$fieldUserState.addClass("li_form");
	var optionUserState = {
		inputName : "userState",
		writeType : 'show',
		inputValue : $("#hideUserState").attr("value"),
		showLabel : false,
		code : 'state',
		width : "282"
	};
	$fieldUserState.formSelect(optionUserState);

	var $fieldUserTypes = $("#formUserType");
	$fieldUserTypes.addClass("li_form");
	var optionUserTypes = {
		inputName : "userType",
		inputValue : $("#hideUserType").attr("value"),
		writeType : 'show',
		showLabel : false,
		code : 'userType',
		width : "282"
	};
	$fieldUserTypes.formSelect(optionUserTypes);
	var $field = $("#formSelect");
	$field.addClass("li_form");

	var options = {
		inputName : "roles",
		url : ctx + "/role/getAllRoles",
		showLabel : false,
		inputChange : false,
		width : "282",
		inputValue : $("#hideRole").attr("value"),
		checkbox : true
	};

	options.writeType = 'show';

	$field.formSelect(options);

	var $field1 = $("#formStaff");
	// 选人组件
	var optionss = {
		inputName : "staffValues",
		// labelName : "选择用户",
		tree_url_U : ctx + "/staff/getOrgsStaffNotInUse?random=0",
		showLabel : false,
		width : "282",
		name : "code",
		value : "",
		selectUser : false,
		radioStructure : true
	}

	optionss.resIds = $("#hideStaffs").attr("value");
	optionss.inputValue = $("#hideStaffNames").attr("value");
	// }

	// if (field.roleCode) {
	optionss.addparams = [ {
		name : "code",
		value : "root"
	} ];
	$field1.formUser(optionss);
	// $field1.formUser("setValue",[$("#hideStaffs").attr("value"),$("#hideStaffNames").attr("value")]);

}
