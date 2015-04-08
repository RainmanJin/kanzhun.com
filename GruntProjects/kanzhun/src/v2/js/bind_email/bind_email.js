require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});
require(['c/widgets', 'u/validator'], function () {
  $(function () {

    //register
    var accountCheck = $('input[name=accountCheck]');
    $('#bindEmailForm').validatorAll({
      elems: 'input',
      prompt: {
        succ: function (target, e) {
          var parent = target.parent();
          $('p.err', parent).hide();
          parent.removeClass('error focus');
        },
        err: function (target, msg, e) {
          var parent = target.parent();
          var elem = $('p.err', parent);
          elem.html('<i></i>' + (msg || elem.data('msg'))).show();
          parent.removeClass('focus').addClass('error');
        },
        normal: function (target, e) {
          var parent = target.parent();
          $('p.err', target.parent()).hide();
          parent.removeClass('error').addClass('focus');
        }
      },

      focusMore: function(prompt){
        $(this).parent().removeClass('error').addClass('focus');
        return true;
      },

      more: {
        account: {
          type: 'isMail',
          msg: '邮箱格式不正确！',
          fn: function (_this, prompt, e) {
            var self = $(this),
                val = this.value;

            if(accountCheck.val() == val){
              prompt.err(self, '此邮箱已被注册！');
              return false;
            }
            $.getJSON(CONTEXTPATH + '/account/checkAccountBind.json?account=' + encodeURIComponent(val), function (ret) {
              ret = ret || {};
              if (ret.rescode == 1) {
                if (!ret.result) {
                  prompt.succ(self);

                  accountCheck.val('');
                } else {
                  prompt.err(self, '此邮箱已被注册！');
                  accountCheck.val(val);
                }
              } else {
                prompt.err(self, ret.resmsg || '服务器异常！');
                accountCheck.val('');
              }

            });
            return true;
          }
        },

        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
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
          msg: '密码格式不正确！',
          fn: function (_this, prompt) {
            var pwd = _this.form.find('input[name=password]'), val = $.trim(pwd.val());
            if (val !== '' && this.value != val) {
              prompt.err($(this), '两次密码不一致！');
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

    }).init().submit(function () {
      if (accountCheck.val() !== '') {
        return false;
      } else {
        return true;
      }
    });

  });
});