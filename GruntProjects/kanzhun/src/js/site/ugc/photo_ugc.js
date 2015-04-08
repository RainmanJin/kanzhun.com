require.config({
    baseUrl: '/js/site',
    paths: {
		u: '../utils',
		c: '.'
    }
});

require(['c/auth_dialog', 'ugc/common_ugc', 'u/uploadify'], function(){
	//dom ready
	$(function(){

		var fileupload = $('#fileupload'),
			uploadLimit = 3,
			uploadImagesQueue = $('#uploadImagesQueue'),
			uploadPrompt = $('#uploadPrompt');
		
		//delete image
		uploadImagesQueue.on('click', 'i.err_v', function(){
			fileupload.uploadify('cancel', $(this).data('fileid'));
			//reset uploadLimit when a image was deleted
			fileupload.uploadify('settings','uploadLimit', ++uploadLimit);
			var target = $(this).parent();
			target.fadeOut(400, function(){
				target.remove();
			});
		});

		var speakTooMuch =  function(_this, prompt){
			if(!('maxLength' in document.createElement('textarea'))){
				var self = $(this), ml = self.attr('maxlength');
				if(ml && self.val().length > ml){
					prompt.err(self, '内容不要超过'+ ml +'字！');
					return false;
				}else{
					prompt.succ(self);
					return true;
				}
			}
			return true;
		};


		
		var addNewCompany = $('#addNewCompany'),
			companyCitySuggest = $('#companyCitySuggest'),
			companyCitySuggestHid = $('input[name=encryptCityCode]'),
			companyNameSuggest = $('#companyNameSuggest'),
			companyNameSuggestHid = $('input[name=encryptCompId]'),
			companyJobSuggest = $('#companyJobSuggest');

		$('body > div.cmp_select').scroll(function(){
      //$('#companyNameSuggest').focus();
      $('.cmp_select_list').hide();
      $('#companyNameSuggest').focus();
    })

		//表单验证
		var v = $('#ugcForm').validatorAll({
			elems: '.v',
      prompt: {
        succ: function (target) {
          if (target.attr('name').indexOf('selectflag') === -1) {
            target.removeClass('err').addClass('suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            //select的错误样式
            target.parent().parent().removeClass('s_err').addClass('s_suc');
          }
        },
        err: function (target, msg) {
          if (target.attr('name').indexOf('selectflag') === -1) {
            target.removeClass('suc').addClass('err');
            var prompt = target.parent().find('p.err');
            if(prompt.length){
              prompt.find('span').html(msg || prompt.data('msg')).end().show();
            }else{
              prompt = target.parent().find('span.prompt');
              prompt.html(msg || prompt.data('msg')).css('display', 'inline-block');
            }
          } else {
            target.parent().parent().removeClass('s_suc').addClass('s_err');
          }
        },
        normal: function (target) {
          if (target.attr('name').indexOf('selectflag') === -1) {
            target.removeClass('err suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            target.parent().parent().removeClass('s_err s_suc');
          }
        }
      },
			focusMore: {
				//focus 时隐藏新增公司窗口 去掉LOGO等信息
				companyName: function(){
					companyNameSuggestHid.val('');
					addNewCompany.hide();               //.find('.v').val('');

					$('#selectedCompanyInfo').html('<span></span>');
					companyCitySuggest.val('').trigger('blur');
					companyJobSuggest.prop('disabled', true);
					return true;
				}
			},
			more: {
				companyName: function(_this, prompt, e){
					var self = $(this);

					//autocomplete的onselect在onblur后触发 所以onblur需要等待几秒才能取到最新的值
					var s = setTimeout(function(){
						clearTimeout(s);
						if($('#addNewCompany').is(':hidden') && $('body > div.cmp_select').is(':hidden')){

							//确认公司名是否存在 提交表单时不用再验证 否则ajax会覆盖掉用户修改的信息
							if(!e){
								return;
							}
							$.getJSON(CONTEXTPATH + '/company/queryname.json?query='+ encodeURIComponent(self.val()), function(ret){

								//没有此公司
								if(ret && ret.encryptId === undefined){

									$.getJSON(CONTEXTPATH + '/autocomplete/company.json?query='+ encodeURIComponent(self.val()), function(ret){
										if(ret.suggestions.length>0){
											var $co_list=$('.cmp_select_list');
											var html='<p>请从以下列表中选择公司：</p>';
											html+='<div class="autocomplete-suggestions cmp_select">';
											$.each(ret.suggestions,function(k,v){
												var cName= v.data.split('|')[0];
												html+='<div class="autocomplete-suggestion"><dl><dt><img src='+STATICURL + v.logo + '></dt><dd><p data-type="cname">' + cName + '</p><p class="f_12 grey_99">' + v.url + '</p></dd></dl></div>';
											});
											html+='<p>没有你的公司？<a href="/companyugc/">创建新公司档案</a></p>';
											html+='</div>';
											$co_list.html(html).show();
										}else{
											self.removeClass('suc').addClass('err');
											addNewCompany.show();                    //.find('.vv').val('').removeClass('err suc');
											//$('.select', addNewCompany).removeClass('s_err s_suc');

											$('#newCompanyAlias').html(companyNameSuggest.val());

											//禁止输入职位
											if(companyJobSuggest.length){
												companyJobSuggest.val('').prop('disabled', true);
											}
										}
									});

								}else{
									addNewCompany.hide();

									companyNameSuggestHid.val(ret.encryptId);
									
									//职位
									if(companyJobSuggest.length){
										companyJobSuggest.data('coid', ret.industryCode).prop('disabled', false);
									}
									
									//填充图片、信息
									$.getJSON(CONTEXTPATH + '/company/queryid.json?encryptCompId=' + encodeURIComponent(ret.encryptId), function(data){
										$('#selectedCompanyInfo').html('<span><img src="'+ STATICURL + data.logo +'" /></span><p>'+data.companyStatInfo.ratingAverage+'分 <br>来自'+data.companyStatInfo.reviewCount+'条信息</p>');
										
										//填充城市
										companyCitySuggestHid.val(data.cityCode);
										companyCitySuggest.val(data.cityName).trigger('blur');
									});
								}
							});
						}
					}, 300);
					return true;
				},

				cityName: function(_this, prompt, e){
					var s = setTimeout(function(){
						clearTimeout(s);
						if(companyCitySuggestHid.val() === ''){
							companyCitySuggest.val('').trigger('blur');
						}
						return true;
					},300);
					return true;
				},

				imgdesc: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				}
			}
		});

		v.init().submit(function(){
			if(companyCitySuggestHid.val() === '' || companyNameSuggestHid.val() === ''){
				return false;
			}

			if($('input[name=imgurl]', uploadImagesQueue).length === 0){
				uploadPrompt.show().find('span').html('请至少上传一张公司图片！');
				return false;
			}

			return true;
			
		});


		// upload company's photos
		fileupload.uploadify({
			swf: '../images/uploadify.swf',
			//'muti'	: true,
			uploader : CONTEXTPATH + '/photougc/upload.json',
			buttonText : '<b>+</b> 添加照片',
			buttonClass : 'btn_grey_b',
			width: '126',
			uploadLimit: uploadLimit,
			fileSizeLimit: '3MB',
			fileObjName: 'imgFile',
			fileTypeExts: '*.png;*.gif;*.jpg;*.bmp;*.jpeg',
			fileTypeDesc: '图片文件(*.png;*.gif;*.jpg;*.bmp;*.jpeg)',
			overrideEvents: ['onSelect','onUploadError'],
			onUploadProgress : function(file, bytesUploaded, bytesTotal, totalBytesUploaded, totalBytesTotal) {
				$('#uploading').show();
			},
			formData: {
				t:$("#t").val()
			},
			onUploadSuccess: function(file, datastr,response) {
				var data =  $.parseJSON(datastr);
				if (data.rescode != '1') {
					uploadPrompt.show().find('span').html(data.resmsg);
				} else {
					var li = $('<li/>'),
						html = '<input type="hidden" name="imgurl" value="'+data.imgFileUrl+'" />';
						html += '<input type="hidden" name="imgthumburl" value="'+data.imgThumbFileUrl+'" />';
						html += '<label class="cphoto"><img src="'+(STATICURL+data.imgThumbFileUrl)+'"  /></label>';
						html += '<textarea name="imgdesc" maxlength="128" class="v photodetail" data-unnecessary="1"  placeholder="拍得不错，给照片起个名或者写点描述吧" ka="picture1-description"></textarea><i class="err_v" data-fileid="'+file.id+'" ka="picture1-close"></i>',
						html += '<p class="err"><span class="prompt"></span></p>';
					
					$('#uploading').hide();
					uploadImagesQueue.append(li.html(html).fadeIn());
					uploadPrompt.hide().find('span').html('');

					v.init(li.find('.v'));
				}
			},
			onFallback: function(){
				alert('您的浏览器没有检测到Flash Player，请安装后重试！');
			},
			onUploadError: function(file, errorCode, errorMsg, errorString) {
				alert('上传失败：' + errorString);
			}
		});
	});
});