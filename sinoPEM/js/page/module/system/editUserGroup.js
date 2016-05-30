function load() {
	var isSingle = 'false';
	var accordion = null;
	var userForm = null;
	var userId = null;
	var $fieldUserState = $("#formUserState");
	$fieldUserState.addClass("li_form");
	var optionUserState = {
		inputName : "userState",
		writeType : 'show',
		showLabel : false,
		code : 'state',
		inputValue : '1',
		width : "282"
	};
	$fieldUserState.formSelect(optionUserState);
	var $fieldRole = $("#formRole");
	$fieldRole.addClass("li_form");
	var options = {
		inputName : "roles",
		inputValue : $("#hideRoles").attr("value"),
		url : ctx + "/role/getAllRoles",
		showLabel : false,
		inputChange : false,
		width : "282",
		checkbox : true
	};

	options.writeType = 'show';

	$fieldRole.formSelect(options);

	var $fieldStaff = $("#formStaff");
	// 选人组件
	var optionss = {
		inputName : "staffValues",
		// labelName : "选择用户",
		tree_url_U : ctx + "/staff/getOrgsStaff?random=0",
		showLabel : false,
		width : "282",
		name : "code",
		value : "root",
		selectUser : false,
		radioStructure : false
	}
	optionss.resIds = $("#hideUsers").attr("value");
	optionss.inputValue = $("#hideUserNames").attr("value");
	optionss.addparams = [ {
		name : "code",
		value : "root"
	} ];
	$fieldStaff.formUser(optionss);
	var $fieldUserTypes = $("#formUserType");
	$fieldUserTypes.addClass("li_form");
	var optionUserTypes = {
		inputName : "userType",
		inputValue : $("#hideUsers").attr("value"),
		writeType : 'show',
		showLabel : false,
		code : 'userType',
		width : "282"
	};
	$fieldUserTypes.formSelect(optionUserTypes);

}
