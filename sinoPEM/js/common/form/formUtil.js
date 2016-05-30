define(function(require, exports, module) {
	var Map = require("map");
	
	var fileTypeMap = new Map();
	var formUtil = {
			
			getFileType : function(fileName) {
	
				if(fileTypeMap.elements.length<1){
					formUtil.getFileTypeMap();
				}
				
				var fileTypes = fileName.split("\.");
				if (fileTypes.length == 2) {
					var fileTypesName = fileTypes[1];
	
					var fileType = fileTypeMap.get(fileTypesName);
					if(fileType){
						return fileType;
					}
					
					var  fileTypesNameLow= fileTypesName.toLowerCase();
					fileType = fileTypeMap.get(fileTypesNameLow);
					if(fileType){
						return fileType;
					}
					
					
					var  fileTypesNameUpp= fileTypesName.toUpperCase();
					fileType = fileTypeMap.get(fileTypesNameUpp);
					if(fileType){
						return fileType;
					}
					
				}
				
				return 'txt';
				
			},
			getFileTypeMap:function(){
				
				fileTypeMap.put('doc', 'word');
				fileTypeMap.put('docx', 'word');
				fileTypeMap.put('docm', 'word');
				fileTypeMap.put('dotm', 'word');
				
				
				fileTypeMap.put('ppt', 'pptx');
				fileTypeMap.put('pptm', 'pptx');
				fileTypeMap.put('pptx', 'pptx');
				fileTypeMap.put('pot', 'pptx');
				fileTypeMap.put('potm', 'pptx');
				fileTypeMap.put('potx', 'pptx');
				
	
				fileTypeMap.put('pdf', 'pdf');
				
				fileTypeMap.put('xlsx', 'excel');
				fileTypeMap.put('xlsm', 'excel');
				fileTypeMap.put('xls', 'excel');
				fileTypeMap.put('xlsb', 'excel');
				
				
				fileTypeMap.put('txt', 'txt');
				
				fileTypeMap.put('gif', 'pictrue');
				fileTypeMap.put('bmp', 'pictrue');
				fileTypeMap.put('dib', 'pictrue');
				fileTypeMap.put('jpg', 'pictrue');
				fileTypeMap.put('jpeg', 'pictrue');
				fileTypeMap.put('jpe', 'pictrue');
				fileTypeMap.put('jfif', 'pictrue');
				fileTypeMap.put('tif', 'pictrue');
				fileTypeMap.put('tiff', 'pictrue');
				fileTypeMap.put('png', 'pictrue');
				
				
				fileTypeMap.put('swf', 'flash');
				fileTypeMap.put('fla', 'flash');
				
				fileTypeMap.put('sql', 'sql');
				
				fileTypeMap.put('AVI', 'video');
				fileTypeMap.put('rmvb', 'video');
				fileTypeMap.put('rm', 'video');
				fileTypeMap.put('mp4', 'video');
				fileTypeMap.put('mid', 'video');
				fileTypeMap.put('3GP', 'video');
				
				
				fileTypeMap.put('CD', 'audio');
				fileTypeMap.put('WAV', 'audio');
				fileTypeMap.put('MP3', 'audio');
				fileTypeMap.put('MIDI', 'audio');
				fileTypeMap.put('WMA', 'audio');
				fileTypeMap.put('VQF', 'audio');
				fileTypeMap.put('OGG', 'audio');
				
				
			}
			
	};
	return formUtil;
});