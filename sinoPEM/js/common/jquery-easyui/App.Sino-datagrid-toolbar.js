/**
 * 对easyui dagagrid 的扩展
 *
 * 1，对工具栏的操作
 */

	
	_datagridMethod = {
		/**
		 * 或的toolbar 容器的 对象
		 *
		 * @param {}
		 *            jq
		 * @return {}
		 */
		getToolbar : function(jq) {
			return $.data(jq[0], "datagrid").panel.find("div.datagrid-toolbar");
		},
		/**
		 * 显示/关闭 查询框
		 *
		 * @param {}
		 *            jq
		 * @param {content:'html',height:50,url:'search.html',speed:1000}
		 *            param
		 */
		toggleSearchbar : function(jq, param) {
			if(!param) {
				if(true) {
					alert('please input param');
				}
				return;
			}
			/**
			 * 设置默认 添加查询栏后是 80px
			 */
			param = $.extend({
				speed : 0
			}, param);
			var toolbar = jq.datagrid('getToolbar');
			var toolbarSearch = toolbar.find("div.datagrid-toolbar-search");

			if(toolbarSearch.size() == 0)
			// toolbar存在，
			{
				if(param.height) {
					toolbar.height(toolbar.height() + param.height);
				} else {
					// 一般是一个行的高度 30px
					toolbar.height(toolbar.height() + 30);
				}
				var searchHtml = "";
				if(param.content) {
					searchHtml = param.content;
				} else {
					if(param.url) {
						searchHtml = $.ajax({
							url : param.url,
							async : false
						}).responseText;
					}
				}
				if(searchHtml) {
					// 清除浮动 使用包装器
					searchHtml = '<div style="clear: both;"></div><div class="datagrid-toolbar-search">' + searchHtml + '</div>';
					toolbar.append(searchHtml);
					if($.parser) {
						$.parser.parse(toolbar);
					}
				} else {
					if(true) {
						alert('please set url or content');
					}
				}
			} else {
				// toolbarSearch 存在
				if(toolbarSearch.is(':hidden')) {
					if(param.height) {
						toolbar.height(toolbar.height() + param.height);
					} else {
						// 一般是一个行的高度 30px
						toolbar.height(toolbar.height() + 30);
					}
					// toolbar.height(toolbar.height()+30);
					toolbarSearch.show();
					// toolbar.

				} else {
					if(param.height) {
						toolbar.height(toolbar.height() - param.height);
					} else {
						// 一般是一个行的高度 30px
						toolbar.height(toolbar.height() - 30);
					}
					// toolbar.height(toolbar.height()-30);
					toolbarSearch.hide();

				}
			}
			jq.datagrid('setSize');
		},
		/**
		 * 设置高度宽度 grid 根据周围环境自适应 高度宽度
		 *
		 * @param {}
		 *            jq
		 */
		setSize : function(jq) {
			var _9 = jq[0];
			var _a = $.data(_9, "datagrid").options;
			var _b = $.data(_9, "datagrid").panel;
			var _c = _b.width();
			var _d = _b.height();
			var _e = _b.children("div.datagrid-view");
			var _f = _e.children("div.datagrid-view1");
			var _10 = _e.children("div.datagrid-view2");
			_e.width(_c);
			_f.width(_f.find("table").width());
			_10.width(_c - _f.outerWidth());
			_f.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_f.width());
			_10.children("div.datagrid-header,div.datagrid-body,div.datagrid-footer").width(_10.width());
			var hh;
			var _11 = _f.children("div.datagrid-header");
			var _12 = _10.children("div.datagrid-header");
			var _13 = _11.find("table");
			var _14 = _12.find("table");
			_11.css("height", "");
			_12.css("height", "");
			_13.css("height", "");
			_14.css("height", "");
			hh = Math.max(_13.height(), _14.height());
			_13.height(hh);
			_14.height(hh);
			if($.boxModel == true) {
				_11.height(hh - (_11.outerHeight() - _11.height()));
				_12.height(hh - (_12.outerHeight() - _12.height()));
			} else {
				_11.height(hh);
				_12.height(hh);
			}
			if(_a.height != "auto") {
				var _15 = _d - _10.children("div.datagrid-header").outerHeight(true) - _10.children("div.datagrid-footer").outerHeight(true) - _b.children("div.datagrid-toolbar").outerHeight(true) - _b.children("div.datagrid-pager").outerHeight(true);
				_f.children("div.datagrid-body").height(_15);
				_10.children("div.datagrid-body").height(_15);
			}
			_e.height(_10.height());
			_10.css("left", _f.outerWidth());
		}
	}

	$.extend($.fn.datagrid.methods, _datagridMethod);
	
	$.fn.extend({
		 /**
		  * 修改DataGrid对象的默认大小，以适应页面宽度。
		  * 
		  * @param heightMargin
		  *            高度对页内边距的距离。
		  * @param widthMargin
		  *            宽度对页内边距的距离。
		  * @param minHeight
		  *            最小高度。
		  * @param minWidth
		  *            最小宽度。
		  * 
		  */
		 resizeDataGrid : function(heightMargin, widthMargin, minHeight, minWidth) {
		  var height = $(document.body).height() - heightMargin;
		  var width = $(document.body).width() - widthMargin;
		  height = height < minHeight ? minHeight : height;
		  width = width > minWidth ? minWidth : width;

		  $(this).datagrid('resize', {
			  width : $(document.body).width()*0.79-20
		  });
		 },
		 resizeTreeGrid : function(heightMargin, widthMargin, minHeight, minWidth) {
			  var height = $(document.body).height() - heightMargin;
			  var width = $(document.body).width() - widthMargin;
			  height = height < minHeight ? minHeight : height;
			  width = width > minWidth ? minWidth : width;

			  $(this).treegrid('resize', {
			   width : $(document.body).width()*0.79-20
			  });
			 }
		});

