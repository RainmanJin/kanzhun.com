require.config({
  urlArgs: "v=1.0.1",
  baseUrl: '/js',
  paths: {
    jquery: 'utils/jquery-1.11.0.min',
    u: 'utils',
    s: 'site'
  }
});

require(['jquery', 's/widgets'], function($){
  $(function(){
    $.maskUI.config = {
      wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
      alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
      confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
    };

    $('dl.select').not('#jobMenu').DIYSelect({
      listCallback: function(list, field, target){
        $('input:hidden',field.parent()).val($(this).data('val')).parent().parent().parent().find('>.err').hide();
      },
      showCallback: function(list, field, target){
        target.addClass('select_light');
      },
      hideCallback: function(list, field, target){
        target.removeClass('select_light');
      }
    });

    //职位类型 3级导航
    $('#jobMenu').DIYSelect({
      listSelector: 'div>a',
      listCallback: function(list, field, target){
        $(this).parent().css({'visibility':'hidden'}).parent().css('z-index', '');
        $('input:hidden',field.parent()).val($(this).data('val')).parent().parent().parent().find('>.err').hide();
      },
      showCallback: function(list, field, target){
        target.addClass('select_light');
      },
      hideCallback: function(list, field, target){
        target.removeClass('select_light');
      }
    });

    var levelOne = $('#jobMenu li'),
      levelTwo = $('#jobMenu div');
    $('#jobMenu').on('click', 'dd', function(e){
      levelTwo.css('visibility', 'hidden');
      e.preventDefault();
      e.stopPropagation();
    }).on('click', 'li>a', function(e){
      e.stopPropagation();
      var self = $(this);
      //visibility & z-index used to fix IE7
      levelOne.css({'z-index': ''});
      self.parent().css('z-index', '3');
      levelTwo.css({'visibility': 'hidden'});
      self.next('div').css('visibility', 'visible');
    });



    function selectCheck(){
      if($.trim(this.value) === ''){
        return false;
      }else{
        return true;
      }
    }

    //fixed maxlength for IE
    var speakTooMuch =  function(_this, prompt){
      var self = $(this);
      if(!('maxLength' in document.createElement('textarea'))){
        var ml = self.attr('maxlength');
        if(ml && self.val().length > ml){
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


    //所在地
    var locationSuggest = $('#locationSugg'),
      hid = $('input[name=location]');

    locationSuggest.autocomplete({
      serviceUrl: '/qrweb/city.json',
      paramName: 'query',
      dataType: 'json',
      width: '278',
      transformResult: function(response) {
        return {
          suggestions: $.map(response.suggestions, function(dataItem) {
            return { value: dataItem.value, data: dataItem.data};
          })
        };
      },
      onSelect: function (suggestion) {
        hid.val(suggestion.data);
      },
      onSearchStart: function(){
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        hid.val('');
      },
      onInvalidateSelection: function(){
        hid.val('');
      },
      onSearchComplete: function(query, suggestions){
        if(suggestions.length === 0){
          hid.val('');
          return;
        }
        //auto select when only one result
        if(suggestions.length === 1){
          hid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });

    //submit form
    var v = $('#jobBossForm').validatorAll({
      elems: 'input:text, input:hidden, textarea',
      prompt: {
        succ: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('>.err', target.parent());
          }
          $('>.attention', target.parent()).show();
          err.hide();
        },
        err: function(target, msg, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          $('>.attention', target.parent()).hide();
          err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('.err', target.parent().parent().parent());
          }else{
            err = $('.err', target.parent());
          }
          $('>.attention', target.parent()).show();
          err.hide();
        }
      },

//      focusMore: {
//        location: function(){
//          hid.val('');
//        }
//      },

      more: {
        experience: selectCheck,
        degree: selectCheck,
        lowSalary: {
          type:  'isIntger',
          msg: '工资格式不对！',
          fn: function(_this, prompt){
            var high = _this.form.find('input[name=highSalary]'), val = $.trim(high.val());
            if(val !== '' && parseInt(this.value) > parseInt(val)){
              prompt.err($(this), '工资范围不正确！');
//              prompt.normal(high);
              return false;
            }else{
              prompt.succ($(this));

              if(val !== ''){
                prompt.succ(high);
              }
              return true;
            }
          }
        },
        highSalary: {
          type:  'isIntger',
          msg: '工资格式不对！',
          fn: function(_this, prompt){
            var low = _this.form.find('input[name=lowSalary]'), val = $.trim(low.val());
            if(val !== '' && parseInt(this.value) < parseInt(val)){
              prompt.err($(this), '工资范围不正确！');
//              prompt.normal(low);
              return false;
            }else{
              prompt.succ($(this));

              if(val !== ''){
                prompt.succ(low);
              }
              return true;
            }
          }
        },

        postRequirement: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        postResponsibility: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        position: function(){
          if($.trim(this.value) === ''){
            return false;
          }else{
            return true;
          }
        },

        locationSug: function(_this, prompt, e){
          var s = setTimeout(function(){
            clearTimeout(s);
            if(hid.val() === ''){
              locationSuggest.val('').trigger('blur');
            }
            return true;
          },300);
          return true;
        },
      }
    });

    v.init().submit(function(){
      if(hid.val() === ''){
        return false;
      }
      return true;
    });



    //input highlight on focus
    $('input:text, textarea', v.form).on('focus', function(){
      $(this).addClass('light');
    }).on('blur', function(){
      $(this).removeClass('light');
    });


  });
});




