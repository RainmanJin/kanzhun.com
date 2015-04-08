/*登录注册参数说明：

*****注意： 使用该JS的登录注册都为ajax异步提交****
*
* 一、 iframe弹层
* 1. 绑定登录注册事件的方式
*   1) class为auth_dialog的a标签默认绑定登录注册事件，href为#login为登录，#register为注册
*   2) 使用auth_dialog返回方法bind(elems, type), 手动绑定事件
*       @elems 为dom
*       @type 等同方法1里的 href
*   3) 使用auth_dialog返回的open(type)直接弹出登录注册框
*       @type 等同方法1里的 href
*
* 2. 参数解释,
*   eg1: <a class="auth_dialog" href="?authcb=finishDeliver&third=no&loginAccount=forlala@163.com#login">登录</a>
*   eg2: auth_dialog.open("?authcb=finishDeliver&third=no&loginAccount=forlala@163.com#register")
*
*   @loginAccount 默认带入用户名 需要encodeURIComponent转换
*   @authcb 登录和注册完成的统一回调方法
*   @lcb 登录完成的回调方法， 如果有authcb则忽略
*   @rcb 注册完成的回调方法， 如果有authcb则忽略
*   @third 是否显示第三方登录模块，默认不传，显示
*
* 二、 页面嵌入式，非iframe
*   html模块直接嵌入在页面，没有callback,
*   完成后，页面的跳转链接取自$('input[name=redirect]').val(),
*   没有redirect则跳回首页
*
* */

require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});

/*
  未登录成功后添加回调函数：?lcb=authCallback
*/

require(['c/widgets', 'u/validator'], function () {
  $(function () {

    //登录注册分单页模式和弹层模式 以此来判断
    var isIframe = self !== top,
      isSupportedPlaceholder = ('placeholder' in document.createElement('input')),
      thirdpartyToggle = false,
      upp = function (name, url){
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        if (!results) { return null; }
        return results[1] || null;
      };

    if (isIframe) {
      var loginDialog = $('#loginDialog'),
        registerDialog = $('#registerDialog'),

        //callback method only for login
        loginCallbackName,

        //callback method only for register
        registerCallbackName,

        //for both
        globalAuthCallbackName;

      var initAuth = function (h) {
        var hash = h || window.location.hash;

        //传回用户名
        var locationHref = window.location.href;
        var loginAccount = upp('loginAccount', locationHref);
        if(loginAccount){
          $('input[name=account]', loginDialog).val(decodeURIComponent(loginAccount));
        }

        //第三方登录
        thirdpartyToggle = upp('third', locationHref);
        if(thirdpartyToggle){
          $('section.auth aside').remove();
        }

        //保存登录注册时都需要调用的callback
        globalAuthCallbackName = globalAuthCallbackName || upp('authcb', locationHref);

        if (!isSupportedPlaceholder) {
          $('body>span.onholder').remove();
        }

        if (hash.indexOf('#login') === 0) {
          registerDialog.hide();
          loginDialog.css('display', 'inline-block');

          //get the callback method from the iframe's url
          //authcb is the callback ready for both
          loginCallbackName = upp('lcb', locationHref) || globalAuthCallbackName;

          setTimeout(function () {
            $('input:text, input:password', loginDialog).placeholder();
          }, 200);
          return true;


        } else if (hash.indexOf('#register') === 0) {
          loginDialog.hide();
          registerDialog.css('display', 'inline-block');

          registerCallbackName = upp('rcb', locationHref) || globalAuthCallbackName;

          setTimeout(function () {
            $('input:text, input:password', registerDialog).placeholder();
          }, 200);
          return true;
        } else {
          return false;
        }
      };

      if (!initAuth()) {
        return;
      }

      //for dialog mode
      $('a.dialog_close').on('click', function (e) {
        e.preventDefault();

        if (isIframe) {
          var dialogIframe = self.frameElement;
          dialogIframe.parentNode.removeChild(dialogIframe);
        }
      });

      $('a.jump').on('click', function (e) {
        e.preventDefault();
        initAuth($(this).attr('href'));
      });
    } else {
      $('input:text, input:password').placeholder();
    }

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
        account: function (_this, prompt, e) {
          if ($('li.code', '#loginForm').length === 0) {
            $.getJSON(CONTEXTPATH + '/login/needcaptcha.json?account=' + encodeURIComponent(this.value), function (ret) {
              if (ret && ret.rescode == 1) {
                var key = ret.randomKey;
                $('#loginField').append('<li class="code"><img src="/captcha?randomKey=' + key + '" onclick="changeAuthCode(this);" title="看不清？点击换一张" />' +
                  '<div><input type="text" name="captcha" placeholder="输入验证码" maxlength="4" class="ifd" />' +
                  '<input type="hidden" name="randomKey" value="' + key + '"/><p class="err" data-msg="请输入验证码！"></p></div></li>');

                _this.init($('input[name=captcha]'), _this.form);
              }
            });
          }
          return true;
        }
      },
      ajaxSubmit: {
        elems: 'input',
        success: function (ret, _this) {
          ret = ret || {};
          if (ret.rescode == 1) {
            if (isIframe) {
              var loginCallback = self.parent[loginCallbackName];
              if(loginCallback){
                loginCallback(ret);
                return;
              }
              self.parent.location.reload();
            } else {
              window.location.href = $('input[name=redirect]').val() || (window.location.host + '/');
            }
          } else if (ret.rescode == -1) {
            $.each(ret.errorMessageList || [], function (i, v) {
              _this.form.find('input[name=' + v.fieldName + ']').parent().removeClass('focus').addClass('error').find('p.err').html('<i></i>' + v.resmsg).show();
            });
            changeAuthCode($('#loginForm .code img')[0]);
          } else {
            $('#loginForm p.sys_err span').html(ret.resmsg || '服务器异常！').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              $(this).removeClass();
            });
            changeAuthCode($('#loginForm .code img')[0]);
          }
        }
      }
    }).init().submit();


    //register
    var accountCheck = $('input[name=accountCheck]');
    $('#registerForm').validatorAll({
      elems: 'input',
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
      },
      ajaxSubmit: {
        elems: 'input:text, input:password, input:hidden',
        success: function (ret, _this) {
          ret = ret || {};
          if (ret.rescode == 1) {
            if (isIframe) {

              var registerCallback = self.parent[registerCallbackName];
              if(registerCallback){
                registerCallback(ret);
                return;
              }

              self.parent.location.reload();
            } else {
              window.location.href = 'http://' + window.location.host + '/';
            }
          } else if (ret.rescode == -1) {
            $.each(ret.errorMessageList || [], function (i, v) {
              _this.form.find('input[name=' + v.fieldName + ']').parent().removeClass('focus').addClass('error').find('p.err').html('<i></i>' + v.resmsg).show();
            });
            changeAuthCode($('#registerForm .code img')[0]);
          } else {
            $('#registerForm p.sys_err span').html(ret.resmsg || '服务器异常！').removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
              $(this).removeClass();
            });
            changeAuthCode($('#registerForm .code img')[0]);
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


    //top banner
    $('#t_i_c').click(function () {
      $('div.top_img').slideUp(function(){
        $(this).hide();
        $.writeCookie('_f_k', 'reborn', 60);
      });
    });

    //自动获取焦点
//    if(isSupportedPlaceholder){
//      $('input[name=account]').trigger('focus');
//    }

    $('#autoLogin').on('click', function () {
      if ($(this).is(':checked')) {
        this.value = '1';
      } else {
        this.value = '';
      }
    });


    //third-party login
    if(!thirdpartyToggle){
      window.thirdpartyCallback = function(token){
        if (isIframe) {
          var loginCallback = self.parent[loginCallbackName];
          if(loginCallback){
            loginCallback(token);
            return;
          }
          self.parent.location.reload();
        }
      };
      $('#thirdpartyLogin').on('click', 'a', function(){
        window.open($(this).data('original') + '?type=1', 'tdpp', 'width=600,height=400,left=300,top=200');
      });
    }
  });
});