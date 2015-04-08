require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/widgets', 'u/maskui', 'u/validator', 'c/mini_search'], function(){
  $(function(){
    //paging
    $('div.staticPager').paging({
      staticUrl: true
    });

    //验证码
    window.changeAuthCode = function (target) {
      if (target) {
        $('input[name=captcha]').val('');
        target.setAttribute('src', target.getAttribute('src').split('&t=')[0] + '&t=' + (new Date()).getTime());
      }
    };

    //公共
    var internCommon = {
      validatePrompt: {
        succ: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('>p.err', target.parent().parent().parent());
          }else{
            err = $('>p.err', target.parent());
          }
          err.hide();
        },
        err: function(target, msg, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('>p.err', target.parent().parent().parent());
          }else{
            err = $('>p.err', target.parent());
          }
          err.html(msg || err.data('msg')).show();
        },
        normal: function(target, e){
          var err;
          if(target.attr('type') === 'hidden'){
            err = $('>p.err', target.parent().parent().parent());
          }else{
            err = $('>p.err', target.parent());
          }
          err.hide();
        }
      },

      resetForm: function(){
        this.find('form')[0].reset();
        this.find('img.captcha-img').trigger('click');
        this.find('p.err').hide();
        this.find('dl.select input[type=hidden]').val('');
        this.find('dl.select input[type=button]').val('请选择');
      },

      checkDate: function(eduBeginDate, eduEndDate, prompt){
        var begin = parseInt(eduBeginDate.val()),
          end = parseInt(eduEndDate.val());

        if(begin && end && (end !== 0) && (begin > end)){
          prompt.html('请选择正确的时间范围！').show();
          return false;
        }else{
          prompt.hide();
          return true;
        }
      },

      checkSalary: function(b, e, prompt){
        var begin = parseInt(b.val()),
          end = parseInt(e.val());

        if(begin && end  && (begin > end)){
          prompt.html('请输入正确的工资范围！').show();
          return false;
        }else{
          prompt.hide();
          return true;
        }
      },

      locate: function(){
        var target = this.attr('type') === 'hidden' ? this.parent() : this;
        $(window).scrollTop(target.offset().top - 30);
      },

      speak: function(_this, prompt){
        var self = $(this),
          val = self.val();

//        if(val.length < 10){
//          prompt.err(self, '最少输入10个字符！');
//          return false;
//        }
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
      }
    };

    //select
    $('dl.select').not('#eduBeginDate, #eduEndDate').DIYSelect({
      clearValue: true,
      listCallback: function(list, field, target){
        target.siblings('p.err').hide();
      }
    });

    var beginDate = $('#eduBeginDate').find('input[type=hidden]'),
      eduEndDate = $('#eduEndDate').find('input[type=hidden]'),
      eduPrompt = $('#eduBeginDate').siblings('p.err');

    $('#eduBeginDate, #eduEndDate').DIYSelect({
      clearValue: true,
      listCallback: function(list, field, target){
        internCommon.checkDate(beginDate, eduEndDate, eduPrompt);
      }
    });




    //实习生档案
    $('#EmployeeForm').validatorAll({
      elems: 'input[type=text], textarea, input.v',
      prompt: internCommon.validatePrompt,
      locate: internCommon.locate,
      more: {
        email: {
          type: 'isMail',
          msg: '请输入正确格式的邮箱！'
        },
        eduStartDateYear: {
          fn: function(){
            return internCommon.checkDate(beginDate, eduEndDate, eduPrompt);
          }
        },

        evaluation: function(_this, prompt){
          return internCommon.speak.call(this, _this, prompt);
        }
      }
    }).init().submit();


    //发布实习岗位
    var low = $('input[name=low_salary]'),
      high = $('input[name=high_salary]'),
      salaryPrompt = low.siblings('p.err');
    $('#EmployerForm').validatorAll({
      elems: 'input[type=text], textarea, input.v',
      prompt: internCommon.validatePrompt,
      locate: internCommon.locate,
      more: {
        email: {
          type: 'isMail',
          msg: '请输入正确格式的邮箱！'
        },
        low_salary: {
          type: 'isNumber',
          msg: '请输入整数！',
          fn: function(){
            return internCommon.checkSalary(low, high, salaryPrompt);
          }
        },

        high_salary: {
          type: 'isNumber',
          msg: '请输入整数！',
          fn: function(){
            return internCommon.checkSalary(low, high, salaryPrompt);
          }
        },

        description: function(_this, prompt){
           return internCommon.speak.call(this, _this, prompt);
        }
      }
    }).init().submit();
  });
});