(function() {
  var imgDomain = "http://img.kanzhun.com";
  if (window.File && window.FileList && window.FileReader) {
    //console.log(true);
  }

  function uploadFile(file) {
    var xhr = new XMLHttpRequest();
    //xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "/upload/image.json");
    xhr.setRequestHeader("X_FILENAME", encodeURIComponent(file.name));
    //xhr.setRequestHeader("Content-Type", "multipart/form-data");
    xhr.send(file);
  }

  $('[name="imgFile"]').bind("change", function(e) {
    //console.log(e.target.files[0])
    var files = e.target.files;
    try {
      for (var i = 0, f; f = files[i]; i++) {
        uploadFile(f);

        $(".js_bt_upload").hide();
        $(".js_upload_prompt").show();
      }
    } catch (e) {
      alert("error");
    }
  });

  $('[name="imgFileSubmit"]').bind("click", function(e) {
    uploadFile(e.target.files[0]);
  });

  function uploadComplete(evt) {
    var result = eval("(" + evt.target.responseText + ")");
    if (result.rescode == 1) {
      $(".js_photo").attr("src", imgDomain + result.imgThumbFileUrl);
      $(".js_loading").hide();
      $(".js_photo").show();
      $(".js_submit").show();

      $('[name="imgurl"]').val(result.imgFileUrl);
      $('[name="imgthumburl"]').val(result.imgThumbFileUrl);
    } else if (result.rescode == 1011) {
      location.href = "/login/";
    }
  }

  function uploadFailed(evt) {
    console.log(evt);
  }

  function uploadCanceled(evt) {

    console.log(evt);
  }
  //
  function isImageFile() {

  }
  //修改上传图片功能
  var oMask = $(".photo_content").find(".mask");
  $(".photo_content").on("click", ".js_photo", function() {
    oMask.fadeIn();
  }).on("change", ".changeImg input[type=file]", function(e) {
    var files = e.target.files;
    for (var i = 0, f; f = files[i]; i++) {
      uploadFile(f);
      oMask.fadeOut();
      $(".js_loading").show();
      $(".js_photo").hide();
    }
  });
  $(document).on("click", function(e) {
    var oTarget = e.target;
    if (oMask.is(":visible")) {
      // if(oTarget!=oMask[0]&&!$.contains(oMask,oTarget)&&!$.contains($(".js_photo")[0],oTarget)&&oTarget!=$(".js_photo")[0]){
      if ($(oTarget).closest(".mask").length == 0 && $(oTarget).closest(".js_photo").length == 0) {
        oMask.fadeOut();
      }
      //}   
    }
  });

  $(".js_submit").bind("click", function() {
    var bflag = true;
    /*
		var oImgdesc=$('[name="imgdesc"]');
		var oImgdescVal=$.trim(oImgdesc.val());
		if(!oImgdescVal){
			$(".js_error").show();
			bflag=false;
		}else{
			$(".js_error").hide();
		}
    */
    if (bflag) {
      $("#photoUgcForm").submit();
    }
  });
})();