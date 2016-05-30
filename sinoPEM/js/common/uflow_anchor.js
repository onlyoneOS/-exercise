/**
 * 绑定页面各模块的锚点定位事件
 */
define(function(require, exports, module) {
			var $ = require("jquery");
			var anchorPosition = require("anchorPosition");

			exports.createAnchor = function() {
				var $anchorDiv = $("#anchorDiv");

				// 表单块
				$.each($("#uflowForm").children(".handprocess_order"), function() {
							var sheet = $(this);
							var $anchorA = $("<a>").attr("href", "javascript:void(0)").attr("return", "false");
							$anchorA.append(sheet.children("h3").first().text());
							$anchorA.bind("click", function() {
										anchorPosition.position(sheet.children("div").first().attr("id"));
									});
							$anchorDiv.append($anchorA);
						});

				// 流转日志 processLog
				var processLogAnchor = document.getElementById('processLogAnchor');
				if (processLogAnchor) {
					var $processLogA = $("<a>").attr("href", "javascript:void(0)").attr("return", "false");
					$processLogA.append("流转日志");
					$processLogA.bind("click", function() {
								anchorPosition.position('processLogAnchor');
							});

					$anchorDiv.append($processLogA);
				}
				// 关联工单 relationProcesses
				var relationAnchor = document.getElementById("relationAnchor");
				if (relationAnchor) {
					var $relationA = $("<a>").attr("href", "javascript:void(0)").attr("return", "false");
					$relationA.append("关联工单");
					$relationA.bind("click", function() {
								anchorPosition.position('relationAnchor');
							});
					$anchorDiv.append($relationA);
				}

				// 评论 comments
				var commentsAnchor = document.getElementById("commentsAnchor");
				if (commentsAnchor) {
					var $commentsA = $("<a>").attr("href", "javascript:void(0)").attr("return", "false");
					$commentsA.append("评论");
					$commentsA.bind("click", function() {
								anchorPosition.position('commentsAnchor');
							});
					$anchorDiv.append($commentsA);
				}
				// 置顶
				var $anchorA = $("<a>").attr("href", "javascript:void(0)").attr("class", "returntop");
				$anchorA.bind("click", function() {
							anchorPosition.position('top');
						});
				$anchorDiv.append($anchorA);

				divCSS();

				$(window).resize(function() {
							divCSS();
						});
			}

			// 根据页面宽度控制锚点是否显示
			function divCSS() {
				var widths = $(window).width();
				var lefts = widths - 960;
				if (lefts > 112) {
					lefts = lefts / 2;
					lefts = lefts + 960 + 'px';
					$("#anchorDiv").css("left", lefts);
					$("#anchorDiv").show();
				} else {
					$("#anchorDiv").hide();
				}
			}

		});