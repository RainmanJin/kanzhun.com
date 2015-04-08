require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});
require(['u/validator'], function () {
  $('#findMyPwdForm').validatorAll({
    elems: 'input:text',
    prompt: {
      succ: function (target) {
        $('.red', target.parent().parent()).html('').hide();
      },
      err: function (target, msg) {
        var elem = $('.red', target.parent().parent());
        elem.html(msg || elem.data('msg')).show();
      },
      normal: function (target) {
        $('.red', target.parent().parent()).html('').hide();
      }
    },
    more: {
      account: {
        type: 'isMail',
        msg: '请输入正确格式的邮箱！'
      }
    }
  }).init().submit();

  $('#resetPasswordForm').validatorAll({
    elems: 'input:password',
    prompt: {
      succ: function (target) {
        $('.red', target.parent()).html('').hide();
      },
      err: function (target, msg) {
        var elem = $('.red', target.parent());
        elem.html(msg || elem.data('msg')).show();
      },
      normal: function (target) {
        $('.red', target.parent()).html('').hide();
      }
    },
    more: {
      password: {
        type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
        msg: '请输入6-14位密码，必须包含数字和字母！',
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
        type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
        msg: '请输入6-14位密码，必须包含数字和字母！',
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
});