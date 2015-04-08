require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/auth_dialog', 'ugc/common_ugc'], function (auth_dialog) {
  //dom ready
  $(function () {

    var transitionSupport = $.support.css3Property('transition');

    //progress
    var progressLine = $('#coProgress'),
      progressCompleted = [];
    progressLine.show().css('height', $('section.ugc_l').height() - 150);


    //选择城市
    var newCompanyCitySuggest = $('#newCompanyCitySuggest'),
      newCompanyCitySuggestHid = $('input[name=newEncryptCityCode]'),
      competitorSuggest = $('#competitorSuggest'),
      competitorSuggestHid = $('input[name=competitorHid]');
    newCompanyCitySuggest.autocomplete({
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
        newCompanyCitySuggestHid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        newCompanyCitySuggestHid.val('');
      },
      onInvalidateSelection: function () {
        newCompanyCitySuggestHid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          newCompanyCitySuggestHid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          newCompanyCitySuggestHid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });



    //competitors autocomplete
    competitorSuggest.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/company.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            var arr = dataItem.data.split('|');
            return { value: arr[0], data: arr[1], num: arr[2]};
          })
        };
      },
      formatResult: function (suggestion, currentValue) {
        return suggestion.value + '（' + suggestion.num + '）';
      },
      onSelect: function (suggestion) {
        competitorSuggestHid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        competitorSuggestHid.val('');
      },
      onInvalidateSelection: function () {
        competitorSuggestHid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          competitorSuggestHid.val('');
          return;
        }
        //auto select when it has only one result
        if (suggestions.length === 1) {
          competitorSuggestHid.val(suggestions[0].data);
        }

        $('#cpNotfound').hide();
      },
      autoSelectFirst: true
    });

    //competitor control
    competitorSuggest.on('focus', function(){
      competitorSuggestHid.val('');
      $('#cpNotfound').hide();
      //addNewCompany.hide().find('.v').val('');
      //$('.select', addNewCompany).removeClass('s_err s_suc');
      //$('.vv', addNewCompany).removeClass('err suc');
    }).on('blur', function(){

      var s = setTimeout(function () {
        clearTimeout(s);

        var val = $.trim(competitorSuggestHid.val());
        var sVal = $.trim(competitorSuggest.val());

        if(val !== ''){
          return;
        }

        if(sVal !== ''){
          $('#cpNotfound').html('抱歉，没有与“' + sVal + '”匹配的公司。').show();
          //addNewCompany.show().find('.vv').val('').removeClass('uf_err uf_suc');
          //$('#newCompanyAlias').html(sVal);
          //$('#newCompanyAliasLink').attr('href', CONTEXTPATH + '/companyugc/?initname=' + encodeURIComponent(sVal));
        }/*else{
          addNewCompany.hide();
        }*/
      }, 300);
    });

    //add competitors
    var competitorIds = $('input[name=competitorIds]'),
      competitors = $('#competitors'),
      addNewCompany = $('#addNewCompany');

    $('#addCompetitor').on('click', function () {
      var val = $.trim(competitorSuggestHid.val());
      var sVal = $.trim(competitorSuggest.val());
      if (val === '') {
        return;
      }

      $('#cpNotfound').html('').hide();
      var self = $(this),
        ids = competitorIds.val(),
        arr = ids ? ids.split(',') : [],
        err = competitors.parent().find('p.err');

      if (arr.length >= 5) {
        err.find('span').html('最多只能添加5个竞争对手！').end().show().delay(3000).fadeOut();
        competitorSuggest.val('');
        return;
      }
      s = setTimeout(function () {
        clearTimeout(s);

        if ($.inArray(val, arr) > -1) {
          err.find('span').html('请勿重复添加！').end().show().delay(3000).fadeOut();
          return;
        }
        arr.push(val);
        competitors.append('<em>' + competitorSuggest.val() + '<i class="err_v" data-id="' + val + '" ka="createcom1-close"></i></em>');
        competitorIds.val(arr.join(','));
        competitorSuggest.val('').focus();
        competitorSuggestHid.val('');
      }, 300);
    });

    //cancel
    /*$('#addCompanyCancelBot').on('click', function() {
      competitorSuggest.val('');
      competitorSuggestHid.val('');
      addNewCompany.hide();
    });*/

    //delete competitors
    competitors.on('click', 'i.err_v', function () {
      var val = competitorIds.val(),
        arr = val.split(','),
        index = $.inArray($(this).data('id') + '', arr);
      if (index == -1) {
        return;
      }
      $(this).parent().remove();
      arr.splice(index, 1);
      competitorIds.val(arr.join(','));
      competitors.parent().find('p.err').hide();
    });

    //upload company logo
    window.uploadOk = function (info) {
      var ret = typeof info === 'string' ? $.parseJSON(info) : info;
      if (ret && ret.result == 1) {
        var picurls = ret.picurls || [];
        $('#' + portrait.data('alias')).attr('src', STATICURL + picurls[1]).parent().find('input:hidden').val(picurls[0]);
        $('#dialogClose').trigger('click');
      }
    };
    var portrait = $('#portrait');
    $('#uploadLogo, #uploadPortrait').on('click', function (e) {
      e.preventDefault();
      portrait.data('alias', this.id + 'Alias');
      $('#' + this.id + 'Flash').show().siblings('div').hide();
      $.maskUI.open({
        elem: portrait
      });
    });


    //submit form
    var v = $('#companyForm').validatorAll({
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
        companyName: function (prompt) {
          var self = $(this);
          self.data('ischecked', false).parent().find('span.prompt').hide();
          prompt.normal(self);

          return true;
        },
        url: function () {
          $(this).removeClass('s_err s_suc').parent().find('span').attr('class', 'none');
        }
      },
      more: {
        companyName: function (_this, prompt, e) {
          var self = $(this);
          if (!e) {
            return self.data('ischecked');
          }
          $.getJSON(CONTEXTPATH + '/company/queryname.json?query=' + encodeURIComponent(this.value), function (ret) {
            if (ret && ret.encryptId) {
              //self.parent().find('span.prompt').css('display', 'inline-block').find('a').attr('href', CONTEXTPATH + '/gso' + ret.encryptId + ".html");
              prompt.err(self, '该公司已存在， <a href="'+(CONTEXTPATH + '/gso' + ret.encryptId + ".html")+'" rel="nofollow" target="_blank">查看公司</a>');
              self.data('ischecked', false);
            } else {
              self.data('ischecked', true);
            }
          });

          return true;
        },
        url: function (_this, prompt) {
          var self = $(this);
          $.get(CONTEXTPATH + '/company/urlcheck.json?url=' + this.value, function (ret) {
            if (ret == 200) {
              self.removeClass('err').addClass('suc').parent().find('span').html('可以访问').attr('class', 'prompt_200');
            } else {
              self.removeClass('suc err').parent().find('span').html('无法访问').attr('class', 'prompt_404');
            }
          });

          return true;
        },
        newCityName: function (_this, prompt, e) {
          var s = setTimeout(function () {
            clearTimeout(s);
            if (newCompanyCitySuggestHid.val() === '') {
              newCompanyCitySuggest.val('').trigger('blur');
            }
            return true;
          }, 300);
          return true;
        }
//        competitor: function (_this, prompt, e) {
//          var s = setTimeout(function () {
//            clearTimeout(s);
//            if (competitorSuggestHid.val() === '') {
//              competitorSuggest.trigger('blur');
//            }
//
//            return true;
//          }, 300);
//          return true;
//        }

//        startUpYear: selectControler
      }
//      ,
//      ajaxSubmit: {
//        elems: 'input:text, input:hidden, textarea',
//        success: function (ret) {
//          if (ret) {
//            if (ret.rescode == 1011) {
//              auth_dialog.open('#login');
//            } else if (ret.rescode == -1) {
//              $("input[name='companyName']").focus();
//            } else {
//              var createCoDialog = $('#createCoDialog'),
//                html = '<a href="' + CONTEXTPATH + '/reviewugc' + ret.encryptId + '" class="btn_grey_s" ka="createcom2-review">发一条评论</a>' +
//                  '<a href="' + CONTEXTPATH + '/salaryugc' + ret.encryptId + '" class="btn_grey_s" ka="createcom2-salary">发一条工资</a>' +
//                  '<a href="' + CONTEXTPATH + '/interviewugc' + ret.encryptId + '" class="btn_grey_s" ka="createcom2-interview">发一条面试经历</a>' +
//                  '<a href="' + CONTEXTPATH + '/photougc' + ret.encryptId + '" class="btn_grey_s" ka="createcom2-picture">发照片</a>';
//              createCoDialog.find('p.create_co_s').html(html);
//              $('#newCoUrl').attr('href', CONTEXTPATH + '/gso' + ret.encryptId + ".html");
//              $.maskUI.open({
//                elem: createCoDialog
//              });
//            }
//          }
//        }
//      }
    });

    v.init().submit(function () {
      if (newCompanyCitySuggestHid.val() === '') {
        return false;
      }

      if( $('input.js-startUpYear').val() === '' ) {
        $('input.js-startUpYear').parent().parent().addClass('s_err');
        return false;
      }

      if( $('input.js-startUpMonth').val() === '' ) {
        $('input.js-startUpMonth').parent().parent().addClass('s_err');
        return false;
      }

      //未登录处理
      /*if(!isLogged){
        auth_dialog.open('#login?authcb=authCallback');
        window.authCallback = function(ret){
          var token = typeof ret === 'string' ? ret : ret.token;
          $('input[name=token]', '#companyForm').val(token);
          isLogged = true;
          $('#companyForm').trigger('submit');
        };
        return false;
      }*/

      return true;
    });



    var progressAll = $(v.elems + ',.pi', v.form),
      progressTotal = progressAll.length;
    v.progress = function (target, type) {
      var name = target.attr('name');
      if (type === 'err') {
        delete progressCompleted[name];
      } else if (type === 'suc') {
        progressCompleted[name] = true;
      } else {
        return;
      }

      var len = (function () {
        var count = 0;
        for (var i in progressCompleted) {
          count++;
        }
        return count;
      })();

      var percent = Math.floor(len / progressTotal * 100) + '%';
      //console.log(len + '=' + progressTotal)
      if (transitionSupport) {
        progressLine.find('span').css('height', percent).find('em').html(percent);
      } else {
        progressLine.find('span').animate({'height': percent}, 200).find('em').html(percent);
      }
    };

    //init the progress bar on the status of editing
    progressAll.each(function(m, n){
      var target = $(n);
      var name = target.attr('name');
      if(target.val() !== ''){
        progressCompleted[name] = true;
        //console.log(progressCompleted)
        v.progress(target, 'suc');
      }
    });

    //select
    $('fieldset.g_rv_co .select').DIYSelect({
      listCallback: function (l, field, select) {
        select.removeClass('s_err').addClass('s_suc');
        field.parent().find('input[type=hidden]').val($(this).data('val'));
        v.progress(field, 'suc');
      }
    });

    $('li.data_select .select').DIYSelect({
      listCallback: function (l, field, select) {
        select.removeClass('s_err').addClass('s_suc');
        field.parent().find('input[type=hidden]').val($(this).data('val'));
        v.progress(field, 'suc');
      }
    });


    //
    $('.pi', v.form).on('focus', function () {
      v.prompt.normal($(this));
    }).on('blur', function () {
      if ($.trim(this.value) !== '') {
        v.prompt.succ($(this));
      } else {
        v.prompt.normal($(this));
      }
    });
  });
});
