/*
url:上传接口url
complete：上传完成回调函数
size上传图片大小限制(单位为kb)

*/
$.fn.uploadfile=function(o){
	var _this=$(this);
	var _o=o||{};
	var url=_o.url;

	function uploadFile(file) {
		var xhr = new XMLHttpRequest();
		//xhr.upload.addEventListener("progress", uploadProgress, false);
		xhr.addEventListener("load", uploadComplete, false);
		xhr.addEventListener("error", uploadFailed, false);
		xhr.addEventListener("abort", uploadCanceled, false);
		xhr.open("POST",url);
		xhr.setRequestHeader("X_FILENAME", encodeURIComponent(file.name));
		xhr.send(file);
	}
	_this.bind("change",function(e){
		var files=e.target.files;
		for (var i = 0, f; f = files[i]; i++) {
			if(_o.size){
				if(f.size>_o.size*1024){
					alert("图片最大不能超过"+_o.size+"k");
					return;
				}
			}
			uploadFile(f);
		}
	});	
    function uploadComplete(evt) {
        var result=eval("("+evt.target.responseText+")");
        _o.complete(result);
    }
    function uploadFailed(evt) {
         console.log(evt);
    }	
    function uploadCanceled(evt) {
         console.log(evt);
    }	
};