require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});
require(['c/widgets', 'u/validator'], function () {
  $(function(){

    /*$('input:text, input:password').placeholder();*/
    var flag = false;
    $('#findMyPwdForm').validatorAll({
      elems: 'input:text',
      prompt: {
        succ: function (target) {
          $('.red', target.parent().parent()).html('<i class="base errormsg"></i>').hide();
          target.removeClass('focus error');
        },
        err: function (target, msg) {
          var elem = $('.red', target.parent().parent());
          elem.html('<i class="base errormsg"></i> ' + ( msg || elem.data('msg'))).show();
          target.removeClass('focus').addClass('error');
        },
        normal: function (target) {
          $('.red', target.parent().parent()).html('<i class="base errormsg"></i>').hide();
          target.removeClass('error').addClass('focus');
        }
      },
      focusMore: function(prompt){
        $(this).parent().find('span.err').hide();
        return true;
      },
      more: {
        account: {
          type: 'isMail',
          msg: '请输入正确格式的邮箱！',
          fn: function (_this, prompt, e) {
            var self = $(this),
              val = this.value;

            $.getJSON(CONTEXTPATH + '/checkRegister.json?email=' + encodeURIComponent(val), function (ret) {
              ret = ret || {};
              if (ret.rescode == 1) {

                if (ret.register) {
                  prompt.succ(self);
                  flag = true;
                } else {
                  prompt.err(self, '您输入的邮箱不存在，请重新输入！');
                }
              } else {
                prompt.err(self, ret.resmsg || '服务器异常！');
              }

            });
            return true;
          }
        }
      }
    }).init().submit(function(){
      if( !flag ) {
        return false;
      }else {
        return true;
      }
    });

    $('#resetPasswordForm').validatorAll({
      elems: 'input:password',
      prompt: {
        succ: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('focus error')
        },
        err: function (target, msg) {
          var elem = $('.red', target.parent());
          elem.html('<i class="base errormsg"></i> ' + (msg || elem.data('msg'))).show();
          target.removeClass('focus').addClass('error');
        },
        normal: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error').addClass('focus');
        }
      },
      more: {
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/,
          msg: '请输入8-20位密码，必须包含数字和字母！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次输入的密码不一致！');
              prompt.normal(re);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(re);
              }
              return true;
            }
          }
        },
        confirmPassword: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/,
          msg: '请输入8-20位密码，必须包含数字和字母！',
          fn: function (_this, prompt) {
            var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次输入的密码不一致！');
              prompt.normal(pwd);
              return false;
            } else {
              prompt.succ($(this));

              if (val !== '') {
                prompt.succ(pwd);
              }
              return true;
            }
          }
        }
      }
    }).init().submit();
  })
});