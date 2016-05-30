define(function(require, exports, module) {
	var $ = require("jquery");

	var postion_flag = 0; //锚点执行状态
	// 转换为数字
	var intval = function(v) {
		v = parseInt(v);
		return isNaN(v) ? 0 : v;
	}

	// 获取元素信息
	var getPos = function(e) {
		var l = 0;
		var t = 0;
		var w = intval(e.style.width);
		var h = intval(e.style.height);
		var wb = e.offsetWidth;
		var hb = e.offsetHeight;
		while (e.offsetParent) {
			l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
			t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
			e = e.offsetParent;
		}
		l += e.offsetLeft + (e.currentStyle ? intval(e.currentStyle.borderLeftWidth) : 0);
		t += e.offsetTop + (e.currentStyle ? intval(e.currentStyle.borderTopWidth) : 0);
		return {
			x : l,
			y : t - 100,
			w : w,
			h : h,
			wb : wb,
			hb : hb
		};
	}

	// 获取滚动条信息
	var getScroll = function() {
		var t, l, w, h;
		if (document.documentElement && document.documentElement.scrollTop) {
			t = document.documentElement.scrollTop;
			l = document.documentElement.scrollLeft;
			w = document.documentElement.scrollWidth;
			h = document.documentElement.scrollHeight;
		} else if (document.body) {
			t = document.body.scrollTop;
			l = document.body.scrollLeft;
			w = document.body.scrollWidth;
			h = document.body.scrollHeight;
		}
		return {
			t : t,
			l : l,
			w : w,
			h : h
		};
	}

	// 滚动 el为定位元素ID duration为跳转时间， 时间越长跳转越慢
	var scroller = function(el, duration) {
		if (typeof el != 'object') {
			el = document.getElementById(el);
		}
		if (!el)
			return;
		var z = this;
		z.el = el;
		z.p = getPos(el);
		z.s = getScroll();
		z.clear = function() {
			window.clearInterval(z.timer);
			z.timer = null
		};
		z.t = (new Date).getTime();
		z.step = function() {
			var t = (new Date).getTime();
			var p = (t - z.t) / duration;
			if (t >= duration + z.t) {
				z.clear();
				window.setTimeout(function() {
							z.scroll(z.p.y, z.p.x)
						}, 13);
			} else {
				st = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.y - z.s.t) + z.s.t;
				sl = ((-Math.cos(p * Math.PI) / 2) + 0.5) * (z.p.x - z.s.l) + z.s.l;
				z.scroll(st, sl);
			}
		};
		z.scroll = function(t, l) {
			window.scrollTo(l, t)
		};
		z.timer = window.setInterval(function() {
					z.step();
				}, 13);
	}
	
	exports.position = function(el) {
		if(postion_flag == 0){
			postion_flag =1;
			scroller(el, 500);
			setTimeout(function(){
				postion_flag=0;
			},500);
		}
	}

		// exports.refreshAnchor = function(){
		// var divs=$("div").find(".anchor");
		// var $anchorDiv=$("#anchorDiv");
		// $anchorDiv.html("");
		// $.each(divs, function(i, item){
		// var anchorName = $(this).attr("id");
		// var anchorNames = anchorName.split("_");
		// if(anchorNames.length == 2){
		// var
		// $anchorA=$("<a>").attr("href","javascript:void(0)").attr("return","false");
		// $anchorA.append(anchorNames[1]);
		// $anchorA.bind("click", function() {
		// anchorPosition.position(anchorName);
		// });
		// $anchorDiv.append($anchorA);
		// }
		// });
		// addLinks();
		// }
	});