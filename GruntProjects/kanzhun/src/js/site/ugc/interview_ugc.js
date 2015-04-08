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
		// 面试时间下拉
		$('.select', '#interviewDate').DIYSelect();

		// 面试结果
		$('#resultDIV').on('click', 'a', function(e){
			e.preventDefault();
			$(this).addClass('result').siblings().removeClass('result').parent().find('input:hidden').val($(this).data('vl'));
			$('#salaryDIV').find('input[name=salary]').val('');
			// 面试通过
			if($(this).data('vl') == '3'){
				$('#salaryDIV').show();
			}else{
				$('#salaryDIV').hide();
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
			interviewStepTwo = $('#interviewStepTwo'),
			interviewStepOne = $('#interviewStepOne');

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
          if (target.attr('name').indexOf('selectflag') === -1) {
            target.removeClass('err').addClass('suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            //select的错误样式
            target.parent().parent().removeClass('s_err').addClass('s_suc');
          }

          v.progress(target, 'suc');
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

          v.progress(target, 'err');
        },
        normal: function (target) {
          if (target.attr('name').indexOf('selectflag') === -1) {
            target.removeClass('err suc');
            target.parent().find('>p.err, >span.prompt').hide();
          } else {
            target.parent().parent().removeClass('s_err s_suc');
          }
          v.progress(target, 'err');
        }
      },
			focusMore: {
				//focus 时隐藏新增公司窗口 去掉LOGO等信息
				companyName: function(){
					companyNameSuggestHid.val('');
					addNewCompany.hide();           //.find('.v').val('');

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
											addNewCompany.show();                  //.find('.vv').val('').removeClass('err suc');
											//addNewCompany.find('.vv[type=button]').val('请选择');
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
										$('#selectedCompanyInfo').html('<span><img src="' + STATICURL + data.logo +'" /></span><p>'+data.companyStatInfo.ratingAverage+'分 <br>来自'+data.companyStatInfo.reviewCount+'条信息</p>');
										
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
				
				salary: {
					type: 'isIntger',
					msg: '月薪必须为正整数！'
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

				process: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				},

				question: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				},

				answer: function(_this, prompt){
					return speakTooMuch.call(this, _this, prompt);
				}
			}
		});

		v.init().submit(function(){
			if(companyCitySuggestHid.val() === '' || companyNameSuggestHid.val() === ''){
				return false;
			}
			//填完第一步
			if(interviewStepTwo.is(':hidden')){
				
				$('.summary').html('于'+$.trim($('#interviewYear').val())+'年'+$.trim($('#interviewMonth').val())+'月面试“'+$.trim($('#companyJobSuggest').val())+'”职位，'+$.trim($('.result', '#resultDIV').html()));
				
				interviewStepOne.hide();
				interviewStepTwo.show();

				$('textarea[name=title]', v.form).trigger('focus');

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
                interviewStepTwo.prepend(data);
                progressLine.show().css('height', interviewStepTwo.height() - 150);
              }
            }
          });
        }else{
          progressLine.show().css('height', interviewStepTwo.height() - 150);
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


		var progressTotal = $(v.elems + ',.pi', interviewStepTwo).not('[name=salary]').length;
		v.progress = function(target, type){
			var name = target.attr('name');
			//第一步页面 不包含
			if($.inArray(name, ['companyName', 'jobTitle', 'cityName', 'salary']) !== -1){
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


		$('.select', '#EpSelect').DIYSelect({
			listCallback: function(l, field, select){
				select.removeClass('s_err').addClass('s_suc');
				field.parent().find('input[type=hidden]').val($(this).data('val'));
				
				v.progress(field, 'suc');
			}
		});

		//上一步
		$('#stepBack').on('click', function(){
			interviewStepOne.show();
			interviewStepTwo.hide();

			$('#guideInfo').css('opacity', 0);
		});
		
		$('#difficultyP span.rating_rect').rating('rating_rect rating_r_', function(index){
			var self = $(this), hid = self.parent().find('input:hidden');
			hid.val(index);

			if(!self.data('rated')){
				self.data('rated', true);
				v.progress(hid, 'suc');
			}
		}, function(target){
      $('#difficultyP em').html($(target).attr('title'));
    }, function(target){
        $(target).next('em').html("");
    });
		
		// 动态添加问题和答案 最多添加5组

		$('a.impressive').on('click', function(){
      var self = $(this),
        counts = self.data('counts') || 1;

			  counts ++;
				var html = '<dt>令您印象深刻的问题（'+ counts +'）</dt>';
				html += '<dd><textarea name="question" placeholder="写下你在面试过程中被问到的问题，给其他朋友一个参考" rows="2" maxlength="128" class="uta" ></textarea></dd>';
				html += '<dt>您的回答</dt>';
				html += '<dd><textarea name="answer" placeholder="写下你在面对问题时的经典回答，让大家一起学习分享"  rows="3" maxlength="20000" class="uta" ></textarea></dd>';
				$('#questionDIV').append(html);
        self.data('counts', counts);

      if(counts === 5){
        self.removeData('counts').parent().remove();
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