/**
 * Uflow表单相关操作
 * 
 * @author guitar
 */
define(function(require, exports, module) {
	var $ = require("jquery");
	var uflowForm = {
		// 赋值
		setFieldValue : function(field, value) {
			var fieldName = field.replaceAll('\@', '').replaceAll('&', '');
			var $field = $("#field_" + fieldName);
			eval("$field." + fieldTypeStore.get(field) + "('setValue','" + value + "');");
		},
		// 获取值
		getFieldValue : function(field) {
			var fieldName = field.replaceAll('\@', '').replaceAll('&', '');
			var $field = $("#field_" + fieldName);
			
			var fieldType = fieldTypeStore.get(field);
			switch (fieldType) {
				case 'uflow_textbox' :
					return $field.uflow_textbox('getValue');
					break;
				case 'uflow_number' :
					return $field.uflow_number('getValue');
					break;
				case 'uflow_textarea' :
					return $field.uflow_textarea('getValue');
					break;
				case 'uflow_radio' :
					return $field.uflow_radio('getValue');
					break;
				case 'uflow_checkbox' :
					return $field.uflow_checkbox('getValue');
					break;
				case 'formSelect' :
					var value = $field.formSelect('getValue');
					return value[0];
					break;
				case 'formDateTime' :
					return $field.formDateTime('getValue');
					break;
				case 'formTree' :
					return $field.formTree("getValue");
					break;
				case 'formUser' :
					return $field.formUser("getValue");
					break;
				case 'trigger_area' :
					return $field.trigger_area("getValue");
					break;
				case 'uflow_grid' :
					var grid = gridStore.get(field);// 获取表格行列name
					var gridType=gridTypeStore.get(field);
					return $('#' + fieldName + ' tbody tr').uflow_grid('getValue', grid, field,gridType);
					break;
				case 'fileField' :
					return $field.fileField("getValue");
					break;
				case 'uflow_richText' :
					return $field.uflow_richText("getValue", field);
					break;
			}
		},
		// 设置权限
		setPerm : function(field, perm) {
			var fieldName = field.replaceAll('\@', '').replaceAll('&', '');
			var $field = $("#field_" + fieldName);
	
			var fieldType = fieldTypeStore.get(field);
			switch (fieldType) {
				case 'uflow_textbox' :
					$field.uflow_textbox('setPerm', perm);
					break;
				case 'uflow_number' :
					$field.uflow_number('setPerm', perm);
					break;
				case 'uflow_textarea' :
					$field.uflow_textarea('setPerm', perm);
					break;
				case 'uflow_radio' :
					$field.uflow_radio('setPerm', perm);
					break;
				case 'uflow_checkbox' :
					$field.uflow_checkbox('setPerm', perm);
					break;
				case 'formSelect' :
					$field.formSelect("setPerm", perm);
					break;
				case 'formDateTime' :
					$field.formDateTime("setPerm", perm);
					break;
				case 'formTree' :
					$field.formTree("setPerm", perm);
					break;
				case 'formUser' :
					$field.formUser("setPerm", perm);
					break;
				case 'fileField' :
					$field.fileField("setPerm", perm);
					break;
				case 'uflow_richText' :
					$field.uflow_richText("setPerm", perm);
					break;
			}
		},
		// 获取表单所有组件的值
		getAllData : function() {
			var obj = new Object();
	
			for (var i = 0; i < fieldNameStore.length; i++) {
				var name = fieldNameStore[i];
				obj[name] = uflowForm.getFieldValue(name);
			}
			return obj;
	
		}
	}
	return uflowForm;
});