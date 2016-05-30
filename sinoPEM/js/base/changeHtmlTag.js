/**
 * 
 */
	String.prototype.changeHtml=function(){  
	    //将字符串转换成数组  
		var str=this;
	    var strArr = this.split('');  
	    //HTML页面特殊字符显示，空格本质不是，但多个空格时浏览器默认只显示一个，所以替换  
	    var htmlChar="<>";  
	    for(var i = 0; i< str.length;i++){  
	        //查找是否含有特殊的HTML字符  
	        if(htmlChar.indexOf(str.charAt(i)) !=-1){  
	            //如果存在，则将它们转换成对应的HTML实体  
	            switch (str.charAt(i)) {                          
	                case '<':  
	                    strArr.splice(i,1,'&lt;');  
	                    break;  
	                case '>':  
	                    strArr.splice(i,1,'&gt;');  
//	                    break;  
//	                case '&':  
//	                    strArr.splice(i,1,'&');  
	            }  
	        }  
	    }  
	    
	    return strArr.join('');  
	}