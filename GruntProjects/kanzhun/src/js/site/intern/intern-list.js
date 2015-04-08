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

    //select
    $('section.maskui_dialog .select').not('#eduBeginDate, #eduEndDate').DIYSelect({
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

      checkDate: function(beginDate, eduEndDate, prompt){
        var begin = parseInt(beginDate.val()),
          end = parseInt(eduEndDate.val());

        if(begin && end && (end !== 0) && (begin > end)){
          prompt.html('请选择正确的时间范围').show();
          return false;
        }else{
          prompt.hide();
          return true;
        }
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
    }

    //查看简历
    $('div.intern-list').on('click', 'a.i-d-resume, a.i-d-jd', function(e){
      e.preventDefault();
      var $this = $(this);

      if($this.attr('data-once') == '1'){
        return;
      }

      $('input[name=internshipTraineeId],input[name=internshipJobId]').val($this.data('uid'));

      var url = $this.attr('href');
      var cn = $this.hasClass('i-d-jd') ? 'intern-dialog intern-dialog-b' : 'intern-dialog';
      if(/\.json/.test(url)){
        $.ajax({
          url: url,
          type: 'get',
          beforeSend: function(){
            $this.attr('data-once', '1');
          },
          success: function(html){
            $this.attr('data-once', '0');
            if(html){
              $.maskUI.open({
                content: html,
                pos: 'absolute',
                contentClass: cn,
                createCallback: function(){
                  $('a.btn_o_l', this).on('click', function(){
                    $.maskUI.open({
                      elem: $('#sendMsgDialog'),
                      pos: 'absolute',
                      onOpen: function(){
                        internCommon.resetForm.call(this);
                      }
                    });
                  });
                }
              });
            }
          },
          error: function(){
            $.maskUI.alert('加载简历失败！');
          }
        });
      }
    });



    //对实习生感兴趣
    $('#sendToInternForm').validatorAll({
      elems: 'input[type=text], textarea',
      prompt: internCommon.validatePrompt,
      more: {
        email: {
          type: 'isMail',
          msg: '请输入正确格式的邮箱！'
        },

        description: function(_this, prompt){
          return internCommon.speak.call(this, _this, prompt);
        }
      },
      ajaxSubmit: {
        elems: 'input[type=text], textarea, input[type=hidden]',
        type: 'post',
        success: function(ret, _this){
          if(ret && ret.rescode == 1){
              $.maskUI.open({
                content: '<dl>\
                <dt class="i-d-dt">提示</dt>\
                <dd class="i-d-dd t-center">\
                  <p class="f_18"><i class="suc_p"></i>发送成功！</p>\
                  <p>请您及时查看您的邮箱以查看反馈！</p>\
                  <p class="mt20"><a class="btn_grey_b maskui_close" href="javascript:;">&nbsp;&nbsp;确定&nbsp;&nbsp;</a></p>\
                </dd></dl>'
              });
          }else{
            $.maskUI.alert('发送失败！');
          }
        },
        error: function(){
          $.maskUI.alert('发送失败！');
        }
      }
    }).init().submit();


    //对职位感兴趣
    $('#sendToEmployerForm').validatorAll({
      elems: 'input[type=text], textarea, input.v',
      prompt: internCommon.validatePrompt,
      more: {
        email: {
          type: 'isMail',
          msg: '请输入正确格式的邮箱！'
        },
        phone: {
          type: 'isPhone',
          msg: '请输入正确格式的手机号码！'
        },
        eduStartDateYear: {
          fn: function(){
            return internCommon.checkDate(beginDate, eduEndDate, eduPrompt);
          }
        },

        evaluation: function(_this, prompt){
          return internCommon.speak.call(this, _this, prompt);
        }
      },
      ajaxSubmit: {
        elems: 'input[type=text], textarea, input[type=hidden], input[type=radio]',
        type: 'post',
        success: function(ret, _this){
          if(ret && ret.rescode == 1){
            $.maskUI.open({
              content: '<dl>\
                <dt class="i-d-dt">提示</dt>\
                <dd class="i-d-dd t-center">\
                  <p class="f_18"><i class="suc_p"></i>发送成功！</p>\
                  <p>请您及时查看您的邮箱以查看反馈！</p>\
                  <p class="mt20"><a class="btn_grey_b maskui_close" href="javascript:;">&nbsp;&nbsp;确定&nbsp;&nbsp;</a></p>\
                </dd></dl>'
            });
          }else{
            $.maskUI.alert('发送失败！');
          }
        },
        error: function(){
          $.maskUI.alert('发送失败！');
        }
      }
    }).init().submit();
  });
});