require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/auth_dialog', 'ugc/common_ugc'], function(auth_dialog){
	//dom ready
	$(function(){
		//Date of Employee
		var startDateSelect = $('#startDateSelect'),
			startDate = startDateSelect.find('[name=entryDate]'),
			endDateSelect = $('#endDateSelect'),
			endDate = endDateSelect.find('input[name=dimissionDate]');

    /*  
		$('.select', '#EpDate').DIYSelect({
			listCallback: function(itemsWrap, field){
				if(endDateSelect.is(':hidden')){
					return false;
				}
				var name = field.attr('name'),
					val = parseInt($(this).data('val'), 10),
					index = $(this).index();

				if(name == 'entryDate'){
					if(val >= parseInt(endDate.val(), 10)){
						endDate.val(index === 0 ? val : val + 1);
					}
				}else if(name == 'dimissionDate'){
					if(val <= parseInt(startDate.val(), 10)){
						startDate.val(index == itemsWrap.children().length-1 ? val : val - 1);
					}
				}
				
			}
		});
    */
    //Date of Employee
    var startDateSelect = $('#startDateSelect'),
      startDate = startDateSelect.find('[name=entryDate]'),
      endDateSelect = $('#endDateSelect'),
      endDate = endDateSelect.find('input[name=dimissionDate]');

    $('.select', '#EpDate').DIYSelect({
      listCallback: function (list, field, target) {
        if (endDateSelect.is(':hidden')) {
          return false;
        }

        var self = $(this);
        var name = field.attr('name'),
          val = self.data('val'),
          index = self.index();

				if (name == 'entryDateYear') {
          if (val >= parseInt(endDate.val(), 10)) {
            var ret = index === 0? val : val + 1;
            endDate.val(ret);
            $('input[name=dimissionDateYear]').val(ret+ '年');
          }
        } else if (name == 'dimissionDateYear') {
          if (val <= parseInt(startDate.val(), 10)) {
            var ret = index === list.children().length - 1 ? val : val - 1;
            startDate.val(ret);
            $('input[name=entryDateYear]').val(ret + '年');
          }
        }

      }
    });
    $('.select').DIYSelect({
      listCallback: function (l, field, select) {
        select.removeClass('s_err').addClass('s_suc');
        field.parent().find('input[type=hidden]').val($(this).data('val'));
      }
    });

		
		$('#employee').on('click', 'a', function(e){
			e.preventDefault();
			var self = $(this);
			self.addClass('status_checked').siblings().removeClass('status_checked').parent().find('input').val(self.data('vl'));

			if(self.data('vl') == '2'){
				endDateSelect.show();
			}else{
				endDateSelect.hide();
			}
		});

		var transitionSupport = $.support.css3Property('transition');
		//progress
		var progressLine = $('#coProgress'),
			progressCompleted = [];


		var addNewCompany = $('#addNewCompany'),
			companyCitySuggest = $('#companyCitySuggest'),
			companyCitySuggestHid = $('input[name=encryptCityCode]'),
			companyNameSuggest = $('#companyNameSuggest'),
			companyNameSuggestHid = $('input[name=encryptCompId]'),
			companyJobSuggest = $('#companyJobSuggest'),
			reviewStepTwo = $('#reviewStepTwo'),
			reviewStepOne = $('#reviewStepOne');

		var speakTooMuch =  function(_this, prompt){
			var self = $(this),
          val = self.val();

      if(val.length < 10){
        prompt.err(self, '最少输入10个字符！');
        return false;
      }
			if(!('maxLength' in document.createElement('textarea'))){
				var ml = self.attr('maxlength');

				if(ml && val.length > ml){
					prompt.err(self, '内容不要超过'+ ml +'字！');
					return false;
				}else{
					prompt.succ(self);
					return true;
				}
			}
			prompt.succ(self);
			return true;
		};

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
          target.removeClass('err').addClass('suc');
          target.parent().find('>p.err, >span.prompt').hide();
          v.progress(target, 'suc');
        },
        err: function (target, msg) {
          target.removeClass('suc').addClass('err');
          var prompt = target.parent().find('p.err');
          if(prompt.length){
            prompt.find('span').html(msg || prompt.data('msg')).end().show();
          }else{
            prompt = target.parent().find('span.prompt');
            prompt.html(msg || prompt.data('msg')).css('display', 'inline-block');
          }
          v.progress(target, 'err');
        },
        normal: function (target) {
          target.removeClass('err suc');
          target.parent().find('>p.err, >span.prompt').hide();

          v.progress(target, 'err');
        }
      },
			focusMore: {
				//focus 时隐藏新增公司窗口 去掉LOGO等信息
				companyName: function(){
					companyNameSuggestHid.val('');
					addNewCompany.hide();   //.find('.v').val('');

					$('#selectedCompanyInfo').html('<span></span>');
					companyCitySuggest.val('').trigger('blur');
					companyJobSuggest.prop('disabled', true);
					return true;
				}
				// ,
				// cityName: function(){
				// companyCitySuggestHid.val('');
				// }
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
											addNewCompany.show();              //.find('.vv').val('').removeClass('uf_err uf_suc');
											//addNewCompany.find('.vv[type=button]').val('请选择');
											//$('.select', addNewCompany).removeClass('s_err s_suc');

											var newVal = companyNameSuggest.val();
											$('#newCompanyAlias').html(newVal);
											//$('#newCompanyAliasLink').attr('href', CONTEXTPATH + '/companyugc/?initname=' + encodeURIComponent(newVal));

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
				rating: function(_this, prompt){
					if($.trim($(this).val()) === ''){
						prompt.err($(this).parent());
						return false;
					}else{
						return true;
					}
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

				title: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				},

				pros: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				},

				cons: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				},

				advice: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				}
			}
		});

		v.init().submit(function(){
			if(companyCitySuggestHid.val() === '' || companyNameSuggestHid.val() === ''){
				return false;
			}
			//填完第一步
			if(reviewStepTwo.is(':hidden')){
				reviewStepOne.hide();
				reviewStepTwo.show();


				//$('textarea[name=title]', v.form).trigger('focus');

				//增加打分的验证
				$('input[name=rating]', reviewStepTwo).data('necessary', true);

        //带上公司头部
        if($('#coHeader').length === 0){
          $.ajax({
            url: '/company/ugcheader.json',
            type: 'get',
            data: {
              companyId: companyNameSuggestHid.val()
            },
            dataType: 'html',
            success: function(data){
              if(data){
                reviewStepTwo.prepend(data);
                progressLine.show().css('height', reviewStepTwo.height() - 150);
              }
            }
          });
        }else{
          progressLine.show().css('height', reviewStepTwo.height() - 150);
        }

        return false;
			//填完第二步
			}else{

        //未登录处理
        /*if(!isLogged){
          auth_dialog.open('#login?authcb=authCallback');
          window.authCallback = function(ret){
            var token = typeof ret === 'string' ? ret : ret.token;
            $('input[name=token]', '#ugcForm').val(token);
            isLogged = true;
            $('#ugcForm').trigger('submit');
          };
          return false;
        }*/

				return true;
			}
		});


		var progressTotal = $(v.elems + ',.pi', reviewStepTwo).length;
		v.progress = function(target, type){
			var name = target.attr('name');
			//第一步页面 不包含
			if($.inArray(name, ['companyName', 'jobTitle', 'cityName']) !== -1){
				return;
			}

			if(type === 'err'){
				delete progressCompleted[name];
			}else if(type === 'suc'){
				progressCompleted[name] = true;
			}else{
				return;
			}
			
			var len = (function(){
				var count = 0;
				for(var i in progressCompleted){
					count ++;
				}
				return count;
			})();

			var percent = Math.floor(len /progressTotal * 100) + '%';
			//console.log(len + '=' + progressTotal)
			if(transitionSupport){
				progressLine.find('span').css('height', percent).find('em').html(percent);
			}else{
				progressLine.find('span').animate({'height': percent}, 200).find('em').html(percent);
			}
			
		};



		//上一步
		$('#stepBack').on('click', function(){
			reviewStepOne.show();
			reviewStepTwo.hide();

			$('#guideInfo').css('opacity', 0);

			//增加打分的验证
			$('input[name=rating]', reviewStepTwo).data('necessary', false);
		});

		//rating
		$('#totalRating').rating('rating_star rating_s_', function(index){
			var self = $(this), parent = self.parent().parent(), hid = parent.find('input[name=rating]');
			hid.val(index);
			parent.find('p.err').remove();

			if(!self.data('rated')){
				self.data('rated', true);

				v.progress(hid, 'suc');
			}
		}, function(target){
      $('#totalRating').next('em').html($(target).attr('title'));
    }, function(target){
        $(target).next('em').html("");
    });

		$('#moreRating span.rating_rect').rating('rating_rect rating_r_', function(){
			var self = $(this), hid = self.parent().find('input:hidden');
			if(!self.data('rated')){
				self.data('rated', true);

				v.progress(hid, 'suc');
			}
			hid.val(self.index());
		}, function(target){
        $(target).parent('span').next('em').html($(target).attr('title'));
    }, function(target){
        $(target).next('em').html("");
    });

		//
		$('#chooses').on('click', 'a', function(e){
			e.preventDefault();
			var self = $(this), hid = self.parent().find('input:hidden');
			self.addClass('current').siblings().removeClass('current');
			hid.val(self.data('vl'));
			if(!self.data('rated')){
				self.data('rated', true);

				v.progress(hid, 'suc');
			}
		});

    //离开时间提示
    var wrapbox = $('div.prompt_box');
    $('div.prompt_wrap i').hover(function(){
      wrapbox.removeClass('none');
      $(document).one('click', function (e) {
        if($(e.target).attr("class")!='prompt_box'){
          wrapbox.addClass('none');
        }
      });
    });

    $('a.closeprompt').click(function(){
      wrapbox.addClass('none');
    });



	});
});