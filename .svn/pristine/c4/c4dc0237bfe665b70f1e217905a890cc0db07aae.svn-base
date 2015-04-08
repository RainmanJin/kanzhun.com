require.config({
  baseUrl: '/js',
  paths: {
    jquery: 'utils/jquery-1.11.0.min',
    u: 'utils',
    s: 'site'
  }
});

require(['jquery', 'u/validator', 's/widgets'], function(){
  $(function(){
    $('input:text, input:password').placeholder();
    window.changeAuthCode = function (target) {
        if (target) {
          $('input[name=captcha]').val('');
          target.setAttribute('src', target.getAttribute('src').split('&t=')[0] + '&t=' + (new Date()).getTime());
        }
      };

    //login
    $('#loginForm').validatorAll({
      elems: 'input:text, input:password',
      prompt: {
        succ: function (target, e) {
          var parent = target.parent();
          $('p.err', parent).hide();
          parent.removeClass('error focus');
        },
        err: function (target, msg, e) {
          $('#loginForm p.err').hide();
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
          type:'isPhone',
          msg: '手机号格式错误！'
        }
      },
      ajaxSubmit: {
        elems: 'input',
        success: function (ret, _this) {
          ret = ret || {};
          if (ret.code == 1) {
              window.location.href = ret.redirect;     
          }else {
            $('#loginForm p.sys_err span').html(ret.msg || '服务器异常！').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              $(this).removeClass();
            });
            changeAuthCode($('#loginForm .code img')[0]);
          }
        }
      }
    }).init().submit();
  });
});