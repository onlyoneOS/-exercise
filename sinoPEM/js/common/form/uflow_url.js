/**
 * 挂接组件
 */
define(function(require,exports,module) {
			var $ = require("jquery");
			(function($) {
				// 挂接组件
				$.fn.uflow_url = function() {
					if (typeof arguments[0] == 'object') {
						var options = arguments[0];
						var defaults = {
							name : '',
							label : '',
							height : '',
							width : '',
							url : '',
							showLabel : false
						}
						var opts = $.extend(defaults, options);
						if(opts.showLabel){
							var $label = $("<label>").attr("for", opts.name);
								$label.append(opts.label).append("：");
							}
							$iframe = $("<iframe id='" + opts.url + "' frameborder=0>");
							if (opts.url != '') {
								$iframe.attr("src", opts.url);
								$iframe.attr("width", opts.width);
								$iframe.attr("height", opts.height==0?100:opts.height);
							}
							$(this).append($label);
							$(this).append($iframe);
						}
					if (typeof arguments[0] == 'string') {
						if (arguments[0] == 'setValue') {
							$(this).find('iframe').attr("src", arguments[1]);
						}
					}
				};
			})($);
		});
