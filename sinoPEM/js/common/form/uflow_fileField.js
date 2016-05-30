define(function(require, exports, module) {
			var $ = require("jquery");
			require("uploadify");
			var uflowForm = require("uflowForm");
			var formUtil = require("formUtil");
			var date = require("date");
			require("uic/dialog");

(function	($) {
				// 附件组件
				$.fn.fileField = function() {
					if (typeof arguments[0] == 'object') {
						var fileField = arguments[0];
						// 字段权限
						var type = "read";
						if (fileField.boolWrite && fileField.boolWrite == true) {
							type = 'write';
						}
						if (fileField.boolRequire && fileField.boolRequire == true) {
							type = 'required';
						}
						var fieldName = fileField.name.replaceAll('\@', '');
						var divName = "field_" + fieldName;
						// 附件列表DIV
						var $filedQU = $("<div>").attr("id", "queue");
						// 上传附件DIV
						var $fieldDIV = $("<div>").attr('class', 'handprocess_upload clearfix');
						// 上传附件按键DIV
						var $fieldDi = $("<div>").attr("id", "field_1");
						// 如果为只读，不显示上传按键
						if (type == 'read') {
							$fieldDi.attr('style', 'display:none');
						}
						// 上传附件按键
						var $fileInput = $("<input>").attr("name", 'uploadify').attr("id", 'uploadify');
						$fieldDi.append($fileInput);
						// 存放附件ID的表单字段
						var $formfileInput = $("<input>").attr("type", 'text').attr("name", fileField.name).attr("id", fileField.name).attr('style',
								'display:none').attr('class', 'fileInput');

						$fieldDIV.append($formfileInput);
						$fieldDIV.append($fieldDi);
						$(this).append($fieldDIV);
						$(this).append($filedQU);
						var ids = '';
						// 加载之前附件
						if (fileField.value && !fileField.value == '') {
							var oldValue = $.parseJSON(fileField.value);
							
							$.each(oldValue, function(i, item) {
										var fileID = item.attachId;
										if (ids && ids != '') {
											ids = ids + "," + fileID;
										} else {
											ids = ids + fileID;
										}
										// 解析附件后缀
										var attachName = item.attachName;
										if (attachName) {
											if(attachName.indexOf("\/")>0){
												var attachNames = attachName.split("\/");
												if (attachNames.length == 2) {
													attachName = attachNames[1];
												} else {
													attachName = attachNames[0];
												}
											}else if(attachName.indexOf("\\")>0){
												var attachNames = attachName.split("\\");
												if (attachNames.length == 2) {
													attachName = attachNames[1];
												} else {
													attachName = attachNames[0];
												}
											}

										}
										
										var fileType = formUtil.getFileType(attachName);
										var $fileLi = $("<li>").attr("id", 'old_' + fileID + '').attr("class", "li_form");
										var $fileSpan = $("<span>");
										// 文件图标
										var $fileI = $("<i>").attr("id", 'old_i_' + fileID).attr("class", fileType);
										$fileSpan.append($fileI);
										// 文件名
										var downLoadURL = "/uflow/fileController.do?method=download&filepath=" + item.filePath + "&filename=" + attachName;
										var $fileDownA = $("<a>").attr("href", downLoadURL);
										$fileDownA.append(attachName);
										$fileSpan.append($fileDownA);
										$fileLi.append($fileSpan);
										// 删除按键
										var deleteURL = "javascript:void(0)";
										if (type != 'read') {
											var $fileDeleteA = $("<a>").attr("href", deleteURL).attr("class", "del");
											$fileDeleteA.append("删除");
											$fileDeleteA.click(function() {
														deleteOldFiles(fileField.name, fileID, 'old_' + fileID)
													});
											$fileLi.append($fileDeleteA);
											

											
										}
										// 上传描述
										var $fileP = $("<p>").attr("class", "grey03");
										var now = new Date(item.createDate);
										var nowStr = now.Format("yyyy-MM-dd hh:mm:ss");
										$fileP.append(item.createStaffName + " " + nowStr + " <b>" + item.taskName + "</b>环节上传");
										$fileLi.append($fileP);
										// 进度条
										// var $fileDIV1 =
										// $("<div>").attr("class",
										// "uploadify-progress");
										// var $fileDIV2 =
										// $("<div>").attr("class",
										// "uploadify-progress-bar").attr("style",
										// "width:
										// 100%;");
										// $fileDIV1.append($fileDIV2)
										// $fileLi.append($fileDIV1);

										$filedQU.append($fileLi);
									});


							$filedQU.attr('class', 'handprocess_upload clearfix');
						}

						// 生成uploadify附件上传组件
						$(document).ready(function() {
							//解决IE9下文档未加载完的bug
							setTimeout(function() {
										$("#uploadify").uploadify({
											'swf' : '/uflow/plugins/uploadify/uploadify.swf',
											'uploader' : '/uflow/fileController.do?method=upload',
											'queueID' : 'queue', // 和存放队列的DIV的id一致
											'fileDataName' : 'uploadify',
											'auto' : true, // 是否自动开始
											'multi' : true, // 是否支持多文件上传
											'simUploadLimit' : 1, // 一次同步上传的文件数目
											'fileSizeLimit' : '100MB',
											'queueSizeLimit' : 10, // 队列中同时存在的文件个数限制
											// 'buttonImage' :
											// '/uflow/images/uflow5Images/button/upload.png',
											'removeCompleted' : false,
											// 'width' : 87,
											// 'height' : 29,
											'buttonClass' : 'uploadButton',
											'onUploadSuccess' : function(fileObj, response, data) {

												var attach = $.parseJSON(response);
												var fileIds = uflowForm.getFieldValue(fileField.name);
												if (fileIds && fileIds != '') {
													uflowForm.setFieldValue(fileField.name, fileIds + "," + attach.attachId);
												} else {
													uflowForm.setFieldValue(fileField.name, attach.attachId);
												}
												var attachName = attach.attachName;
												if (attachName) {
													var attachNames = attachName.split("\\");
													if (attachNames.length == 2) {
														attachName = attachNames[1];
													} else {
														attachName = attachNames[0];
													}
												}
												// 解析附件后缀
												var fileType = formUtil.getFileType(attachName);

												// 附件图标
												var $fileTypeI = $('#fileTypes_i_' + fileObj.id);
												$fileTypeI.attr('class', fileType);
												// 下载地址
												var $downloadA = $('#download_a_' + fileObj.id);
												$downloadA.attr('href', "/uflow/fileController.do?method=download&filepath=" + attach.filePath + "&filename="
																+ attachName);
												// 删除附件事件
												var fileFieldName = fileField.name;
												var fileObjId = fileObj.id;
												var $deleteA = $('#delete_a_' + fileObj.id);
												$deleteA.attr('href', "javascript:void(0)");
												$deleteA.html("删除");
												$deleteA.click(function() {
															deleteFiles(fileFieldName, attach.attachId, fileObjId);
														});
												// 附件描述
												var $fileDec = $('#fileDec_P_' + fileObj.id);
												var now = new Date();
												$fileDec.append(attach.createStaffName + " " + now.toLocaleString() + "  上传");
												// 去掉进度条
												var $fileDiv = $('#fileDiv_' + fileObj.id);
												$fileDiv.remove();

											},
											'onUploadError' : function(event, queueID, fileObj) {
												if (fileObj.name && fileObj.id) {

													UicDialog.Error("文件:" + fileObj.name + "上传失败")
													// 删除附件事件
													$('#uploadify').uploadify('cancel', '' + fileObj.id + '');
												}

											}
										});
									}, 1);

						if (ids && ids != '') {
							uflowForm.setFieldValue(fileField.name, ids);
						}
						});

					} else if (typeof arguments[0] == 'string') {
						var funName = arguments[0];
						if (funName == 'getValue') {// 取值
							if ($(this).find(".fileInput").size() > 0) {
								return $(this).find(".fileInput").val();
							}
						} else if (funName == 'setValue') {// 赋值
							var value = arguments[1];
							if (value == undefined) {
								alert("参数错误");
							} else {
								return $(this).find(".fileInput").val(arguments[1]);
							}
						} else if (funName == 'setPerm') {// 设置权限
							if (arguments[1]) {
								// 控制是否显示
								if (arguments[1] == "hidden") {
									$(this).hide();
									return;
								} else {
									$(this).show();
								}
								// 控制只读或可写
								if (arguments[1] == "read") {
									if ($(this).find(":text").hasClass("text")) {
										$(this).find(":text").removeClass("text");
									}
									$(this).find(":text").addClass("textno");

									$(this).find(":text").attr("readonly", "readonly");
									if ($(this).find("label").hasClass("label01")) {
										$(this).find("label").removeClass("label01");
									}
								} else {
									if ($(this).hasClass("textno")) {
										$(this).find(":text").removeClass("textno");
									}
									$(this).find(":text").addClass("text");
									if ($(this).find(":text").attr("readonly")) {
										$(this).find(":text").removeAttr("readonly");
									}
									$(this).find("label").addClass("label01");
								}
								// 控制必填或可写
								if (arguments[1] == "required") {
									$(this).find("label").html("<span class=\"red\">*</span>" + $(this).find("label").text());
									$(this).find(":text").addClass("required");
								} else {
									if ($(this).find("label").find('span').size() > 0) {
										$(this).find("label").find('span').remove();
									}
									if ($(this).find(":text").hasClass("required")) {
										$(this).find(":text").removeClass("required");
									}
								}
							} else {
								alert("参数错误");
							}
						}

					}

				};

				// 删除附件
				deleteFiles = function(fileName, fileId, id) {
					var fileIds = uflowForm.getFieldValue(fileName);
					var newFileIds = "";
					if (fileIds && fileIds != '') {
						var fileIdsStrs = fileIds.split(',');
						for (var i = 0; i < fileIdsStrs.length; i++) {
							var fileIdsStr = fileIdsStrs[i];
							if (fileIdsStr != fileId) {
								newFileIds = newFileIds + fileIdsStr + ",";
							}
						}
						if (newFileIds && newFileIds != '') {
							newFileIds = newFileIds.substr(0, newFileIds.length - 1);
						}
						uflowForm.setFieldValue(fileName, newFileIds);
					}

					$('#uploadify').uploadify('deleteFile', '' + id + '');
				};
				// 删除附件
				deleteOldFiles = function(fileName, fileId, id) {
					var fileIds = uflowForm.getFieldValue(fileName);
					var newFileIds = "";
					if (fileIds && fileIds != '') {
						var fileIdsStrs = fileIds.split(',');
						for (var i = 0; i < fileIdsStrs.length; i++) {
							var fileIdsStr = fileIdsStrs[i];
							if (fileIdsStr != fileId) {
								newFileIds = newFileIds + fileIdsStr + ",";
							}
						}
						if (newFileIds && newFileIds != '') {
							newFileIds = newFileIds.substr(0, newFileIds.length - 1);
						}
						uflowForm.setFieldValue(fileName, newFileIds);
					}

					$('#'+id).remove();
				};
			})($);
		});