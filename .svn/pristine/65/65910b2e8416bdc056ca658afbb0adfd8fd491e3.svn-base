define(['ugc/guide_word', 'c/widgets', 'u/validator'], function (guide_word) {

  $.fn.extend({
    rating: function (classname, clickCallback, enterCallback, leaveCallback) {
      this.each(function (i, v) {
        var target = $(v);
        target.on('mouseenter', 'a', function () {
          var index = parseInt(target.find('a').index(this) + 1, 10),
              done = '';
          if(target.hasClass('done')){
            done = 'done ';
          }
          target.attr('class', done + classname + index);

          if(enterCallback){
            enterCallback(this);
          }
        }).on('mouseleave', function(){
          var index = target.data('ind');
          if(!target.hasClass('done')){
            target.removeClass(function(){
              return $(this).attr('class', classname.split(' ')[0]);
            });
           if(leaveCallback){
              leaveCallback(this);
            }
          }else{
            target.attr('class', 'done ' + classname + index);
            if(enterCallback){
              enterCallback(target.find('a').eq(index - 1));
            }
          }
        }).on('click', 'a', function(){
          var index = parseInt(target.find('a').index(this) + 1, 10);
          target.addClass('done').data('ind', index);
          if (clickCallback) {
            clickCallback.call(this, index);
          }
        });
      });
    }
  });

  //@pageFlag 区分当前是哪个页面
  var pageFlag = $('#pageFlag').val();

  var guideWord = guide_word[pageFlag] || [],
    transitionSupport = $.support.css3Property('transition');
  (function () {
    var guide = $('#guideInfo'),
        guideWrap = $('section.ugc_r');

    $('input:text, textarea').on('focus', function () {
      var self = $(this),
        top = self.offset().top - guideWrap.offset().top,
        words = guideWord[self.attr('name')];

      if (!words) {
        guide.css('opacity', 0).delay(500).hide();
        return;
      }
      if (transitionSupport) {
        guide.show(0,function(){
          $(this).css({opacity: 1, top: Math.abs(top)}).find('dd').html(words);
        });
      } else {
        guide.show(0, function(){
          $(this).animate({opacity: 1, top: Math.abs(top)}, 200).find('dd').html(words);
        });
      }
    });

    $('dl.experience').on('click', function () {
      var self = $(this);
      top = self.offset().top,
        words = guideWord[self.attr('name')];

      if (!words) {
        guide.css('opacity', 0);
        return;
      }
      if (transitionSupport) {
        guide.css({opacity: 1, top: Math.abs(top - 140)}).find('dd').html(words);
      } else {
        guide.animate({opacity: 1, top: Math.abs(top - 140)}, 200).find('dd').html(words);
      }

    })

    guide.on('click', 'a.close_guide', function (e) {
      e.preventDefault();
      guide.css('opacity', 0);
    });


  })();

  //所属行业 公司规模
  $('.select', '#addNewCompany').DIYSelect({
    listCallback: function (list, field, select) {
      select.removeClass('s_err').addClass('s_suc');
      select.find('dt>input:hidden').val($(this).data('val'));
    }
  });


  var addNewCompany = $('#addNewCompany'),
    companyCitySuggest = $('#companyCitySuggest'),
    companyCitySuggestHid = $('input[name=encryptCityCode]'),
    companyNameSuggest = $('#companyNameSuggest'),
    companyNameSuggestHid = $('input[name=encryptCompId]'),
    companyJobSuggest = $('#companyJobSuggest');

  //选择公司
  companyNameSuggest.autocomplete({
    containerClass: 'autocomplete-suggestions cmp_select',
    serviceUrl: CONTEXTPATH + '/autocomplete/company.json',
    paramName: 'query',
    dataType: 'json',
    transformResult: function (response) {
      return {
        suggestions: $.map(response.suggestions, function (dataItem) {
          var arr = dataItem.data.split('|');
          return { value: arr[0], data: arr[1], num: arr[2], logo: dataItem.logo, url: dataItem.url};
        })
      };
    },
    //这个方法很吊！
    formatResult: function (suggestion, currentValue) {
      return '<dl><dt><img src='+STATICURL + suggestion.logo + '></dt><dd><p>' + suggestion.value + '</p><p class="f_12 grey_99">' + suggestion.url + '</p></dd></dl>';
      //return suggestion.value + '（' + suggestion.num + '）';
    },
    onSelect: function (suggestion) {
      companyNameSuggestHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      companyNameSuggestHid.val('');
      $('.cmp_select_list').hide();
    },
    onInvalidateSelection: function () {
      companyNameSuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        companyNameSuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        companyNameSuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true,
    //appendTo: $('fieldset.g_rv_co div.cmp_select_list'),
    noCache: true
  });


  //选择城市
  companyCitySuggest.autocomplete({
    serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
    paramName: 'query',
    dataType: 'json',
    transformResult: function (response) {
      return {
        suggestions: $.map(response.suggestions, function (dataItem) {
          if( response.suggestions.length == 0 ) {

          }
          return { value: dataItem.value, data: dataItem.data};
        })
      };
    },
    //noCache: true,     /
    onSelect: function (suggestion) {
      companyCitySuggestHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      companyCitySuggestHid.val('');
    },
    onInvalidateSelection: function () {
      companyCitySuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        companyCitySuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        companyCitySuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });


  //添加新公司表单
  var addCompanyCitySuggest = $('#addCompanyCitySuggest'),
    addCompanyCitySuggestHid = $('input[name=addEncryptCityCode]', addNewCompany);
  addCompanyCitySuggest.autocomplete({
    serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
    paramName: 'query',
    dataType: 'json',
    transformResult: function (response) {
      return {
        suggestions: $.map(response.suggestions, function (dataItem) {
          return { value: dataItem.value, data: dataItem.data};
        })
      };
    },
    onSelect: function (suggestion) {
      addCompanyCitySuggestHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      addCompanyCitySuggestHid.val('');
    },
    onInvalidateSelection: function () {
      addCompanyCitySuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        addCompanyCitySuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        addCompanyCitySuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });

  //添加
  addNewCompany.validatorAll({
    //区分下 因为addNewCompany 套在外层的form里
    elems: '.vv',
    prompt: {
      succ: function (target) {
        if (target.attr('name') != 'sflag') {
          target.removeClass('err').addClass('suc');
          target.parent().find('>p.err, >span.prompt').hide();
        } else {
          //select的错误样式
          target.parent().parent().removeClass('s_err').addClass('s_suc');
        }
      },
      err: function (target, msg) {
        if (target.attr('name') != 'sflag') {
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


        if (target.attr('name') != 'sflag') {
          target.removeClass('err suc');
          target.parent().find('>p.err, >span.prompt').hide();
        } else {
          target.parent().parent().removeClass('s_err s_suc');

        }
      }
    },
    more: {
      addCityName: function (_this, prompt, e) {
        var s = setTimeout(function () {
          clearTimeout(s);
          if (addCompanyCitySuggestHid.val() === '') {
            addCompanyCitySuggest.val('').trigger('blur');
          }
          return true;
        }, 400);
        return true;
      },

      url: {
        type: /^[^\u4e00-\u9fa5]+$/,
        msg: '网址里请不要包含中文！'
      }
    },
    ajaxSubmit: {
      elems: 'input:text, input:hidden',
      type: 'post',
      data: function () {
        return '&companyName=' + (companyNameSuggest.length ? companyNameSuggest.val() : $('#competitorSuggest').val());
      },
      url: CONTEXTPATH + '/companyugc/save.json',
      success: function (data) {
        if (data) {
          if (data.rescode == 1011) {
            auth_dialog.open('#login');
          } else if (data.rescode == -1) {
            $('input[name=companyName]').focus();
          } else {

            //创建公司页面特殊处理
            if(pageFlag == 'company'){
              $('input[name=competitorHid]').val(data.encryptId);
              $('#addCompetitor').trigger('click');
            }else{
              $('#selectedCompanyInfo').html('<span><img src="' + STATICURL + data.logo + '" /></span><p>' + data.companyStatInfo.ratingAverage + '分 <br>来自' + data.companyStatInfo.reviewCount + '<br>条信息</p>');

              companyNameSuggest.removeClass('err').addClass('suc');
              companyNameSuggestHid.val(data.encryptId);

              //填充城市
              companyCitySuggestHid.val(data.cityCode);
              companyCitySuggest.val(data.cityName).trigger('blur');

              addNewCompany.hide().find('.vv').val('');
              $('.select', addNewCompany).removeClass('s_err s_suc');

              //解开职位
              companyJobSuggest.data('coid', data.industryCode).prop('disabled', false);
            }
          }
        }
      }
    }
  }).init().submit(function () {
    //等ajax确认城市的结果
    if (addCompanyCitySuggestHid.val() === '') {
      //console.log('wait')
      return false;
    } else {
      return true;
    }
  });


  $('#addCompanySubmit').on('click', function () {
    addNewCompany.trigger('submit');
  });

  $('#addCompanyCancel').on('click', function() {
      companyNameSuggest.trigger('focus');
  });

  //职位
  if (companyJobSuggest.length) {
    companyJobSuggest.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/jobtitle.json',
      paramName: 'query',
      params: function (query) {
        return {
          query: query,
          code: companyJobSuggest.data('coid')
        };
      },
      dataType: 'json',
      transformResult: function (response) {
        response = response || {};
        return {
          suggestions: $.map(response.suggestions || [], function (dataItem) {
            return { value: dataItem.value, data: dataItem.data};
          })
        };
      }
    });
  }

  //推荐公司列表相关事件
  var $co_list=$('.cmp_select_list');
  $co_list.on('mouseenter','.autocomplete-suggestion',function(){
    $(this).addClass('autocomplete-selected');
  }).on('mouseleave','.autocomplete-suggestion',function(){
    $(this).removeClass('autocomplete-selected');
  }).on('click','.autocomplete-suggestion',function(){
    var _t=$(this);
    companyNameSuggest.val(_t.find('[data-type="cname"]').html());
    companyNameSuggest.trigger('blur');
  });
  $co_list.on('click','.bt_createNewCom',function(){
    $co_list.hide();
    addNewCompany.show();
    var newVal = companyNameSuggest.val();
    $('#newCompanyAlias').html(newVal);
    $('#newCompanyAliasLink').attr('href', CONTEXTPATH + '/companyugc/?initname=' + encodeURIComponent(newVal));
  })

});
