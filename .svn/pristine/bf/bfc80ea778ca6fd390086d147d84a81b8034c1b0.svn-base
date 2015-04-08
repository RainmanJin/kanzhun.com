
define(function(){
	//头像上传弹出框
	$.extend({
		initUploadPortrait:function(params){
			var o=$.extend({
				title:"上传照片",
				url:"uploadURL=/companyugc/upload/logo.json?c=uploadPortrit&amp;jsCallback=uploadOk",
				callback:null
			},params);
			var h='';
			h+='<section class="p_dialog uploadPortrait">'+
				'<div class="dialog_con">'+
					'<a href="#" rel="nofollow" class="dialog_close"></a>'+
					'<div id="uploadLogoFlash">'+
						'<h3>'+o.title+'</h3>'+
						'<object id="FlashID" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="550" height="440">'+
							'<param name="movie" value="/images/portrait.swf" />'+
							'<param name="quality" value="high" />'+
							'<param name="wmode" value="transparent" />'+
							'<param name="flashVars" value="'+o.url+'" />'+
							'<!--[if !IE]>-->'+
						  '<object type="application/x-shockwave-flash" data="/images/portrait.swf" width="550" height="440">'+
						   '<!--<![endif]-->'+
								'<param name="quality" value="high" />'+
								'<param name="wmode" value="transparent" />'+
								'<param name="flashVars" value="'+o.url+'" />'+
							'<!--[if !IE]>-->'+
						  '</object>'+
						  '<!--<![endif]-->'+
						'</object>'+
					'</div>'+
				'</div>'+
			'</section>';
			$.maskUI.open({
				elem: $(h),
				destroy: true
			});
		 	window.uploadOk = function (info) {
	      var ret = typeof info === 'string' ? $.parseJSON(info) : info;
	      if (ret && ret.result == 1) {
	        var picurls = ret.picurls || [];
	        //var dialog=$('.p_dialog.uploadPortrait');
	        //$('.dialog_close',dialog).trigger('click');
	        if(o.callback){
	        	o.callback(picurls);
	        }
	      }else{
	      	alert("图片上传失败");
	      }
	    };
		}
	});
});