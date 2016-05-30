
define(function(require, exports, module) {
	var css  = require('js/plugins/ztree/zTreeStyle.css');
	var $ = require("jquery");
	var StringBuffer = require("stringBuffer");

	var table='';
	var oCache = {
			iCacheLower: -1
		};
	    
	    exports.init = function(){

		/* Table initialisation */
	    	var buffer = new StringBuffer();
	    	 buffer.append('<ul class="tabs" id="tabs">');
	    	buffer.append('<li class="one"><a href="javascript:void(0)"  class="select">用户名信息</a></li>');
	    	buffer.append('<li class="two"><a href="javascript:void(0)" class="current" >组织机构</a><s class="select"></s></li>');
	    	buffer.append('<li class="three"><a href="javascript:void(0)" class="current" >角色匹配</a><s class="current"></s></li>');

	    	buffer.append('</ul>');

	    	buffer.append('<form name="addUser"  id ="addUser" action="">');
	    	buffer.append('<div class="panes" id="panes">');
	    	buffer.append('<div id="alertMsg"></div>');
	    	buffer.append('<div style="position: relative;">');
	    	buffer.append('<table id="example-advanced">');
	    	buffer.append('<tr>');
	    	buffer.append('<td width="120" class="caption">用户类型：</td>');
	    	buffer.append('<td  colspan=3><select id ="userType" name="userType">');
	    	buffer.append('</select>');
	    	buffer.append('</td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">用户账号：</label>');
	    	buffer.append('<td colspan=3>');
	    	buffer.append('<input name="userName"  id="userName"  type="text"  value="" ><span style="color:red">*</span>');
	    	buffer.append('</td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">账号密码：</td>');
	    	buffer.append('<td colspan=3><input class="pt" name="userPasswd"  id="userPasswd" type="password"  value=""><span style="color:red">*</span></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">确认密码：</td>');
	    	buffer.append('<td colspan=3><input class="ipt" name="userPasswd1"  id="userPasswd1" type="password"  value=""><span style="color:red">*</span></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">显示名称：</td>');
	    	buffer.append('<td colspan=3><input class="ipt" name="displayName"  id="displayName" type="text"  value=""></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">描 述：</td>');
	    	buffer.append(' <td colspan=3><input class="ipt" name="description"  id="description" type="text"  value=""></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">邮 件：</td>');
	    	buffer.append('<td colspan=3><input class="ipt" name="email"  id="email" type="text"  value=""></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">手 机：</td>');
	    	buffer.append('<td colspan=3><input class="ipt" name="mobile"  id="mobile" type="text"  value=""></td>');
	    	buffer.append('</tr>');
	    	buffer.append('<tr>');
	    	buffer.append('<td class="caption">启 用：</td>');
	    	buffer.append('<td colspan=3><input type="checkbox" name="state"  id="state" value="1"  checked></td>');
	    	buffer.append(' </tr>');
	    	buffer.append('</table>');
	    	buffer.append('<p class="sum"  style="margin-bottom:-18px;">');
	    	buffer.append('<button type="button" id="nextone"  class="btn btn-bg-grey" >下一步 &raquo;</button>');
	    	buffer.append('</p>');
	    	buffer.append('</div>');
	    	buffer.append('<div style="display:none;position: relative;">');
	    	buffer.append('<div id="SEARCH_BY_ORG" class="ztree"></div>');

	    	buffer.append('<p class="sum" style="margin-bottom:-18px;">');
	    	buffer.append('<button type="button" id="prevone"  class="prev btn btn-bg-grey" >&laquo; 上一步</button>');
	    	buffer.append('<button type="button" id="nexttwo" class="next btn btn-bg-grey" >下一步 &raquo;</button>');
	    	buffer.append('</p> ');
	    	buffer.append('</div>');
	    	buffer.append('<div   style="display:none;position: relative;">');
	    	buffer.append('<div id="resourcesTree" class="ztree"></div>');
	    	buffer.append(' <p class="sum" style="margin-bottom:-18px;">');
	    	buffer.append('<button type="button" id="prevtwo"  class="prev btn btn-bg-grey" >&laquo; 上一步</button>');
	    	buffer.append('<button  type="button" id="finish" class="next btn btn-bg-grey" >完成&nbsp;&nbsp;</button>');
	    	buffer.append('</p>');
	    	buffer.append('</div>');
	    	buffer.append('</form>');
	    	$(".wizard_tabs").append(buffer.toString());
	    	
	    	
	    	 
	    }

});		