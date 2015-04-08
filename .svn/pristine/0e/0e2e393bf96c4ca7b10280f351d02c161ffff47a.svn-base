require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});

require(['c/auth_dialog', 'u/upload_portrait', 'c/widgets', 'c/mini_search', 'u/validator'], function (auth_dialog, upload_portrait) {
  $(function () {

    //upload portrait
    upload_portrait({
      elems: $('#profilePortraitBtn'),
      portrait: $('#portrait'),
      show: $('#profilePortrait, #profilePortraitAlias')
    });

    upload_portrait({
      elems: $('#changebg'),
      portrait: $('#portrait'),
      show: $('#profilePortrait, #profilePortraitAlias')
    });


    $('input:text, input:password').placeholderS();
    //---------------修改邮箱--------------
    var email_modify_dialog = $('#email_modify_dialog');
    var email_redirect_login_dialog = $("#email_redirect_login_dialog");

    //--------------修改手机号-------------
    var phone_modify_dialog = $("#phone_modify_dialog");

    //--------------修改密码-------------
    var password_modify_dialog = $("#password_modify_dialog");

    if($('#thirdLoginFlag').length){
      //先去掉邮箱已绑定提示
      //$.maskUI.alert($('#thirdLoginFlag').val());
    }

    $("#actsettings tr").hover(function () {
      $(this).addClass('current');
    }, function () {
      $(this).removeClass('current');
    });

    $("tr#head").hover(function(){
      $("#change").css("backgroundPosition","-75px center");
    },function(){
      $("#change").css("backgroundPosition","left center");
    });

    //chage  nickname
    $("#nickname_modify_btn").click(function () {
      var self = $(this);
      if (self.data('edit') == 1) {
        self.prev("span").removeClass('modify');
        $("#nickname_txt").prop("readonly", false).removeAttr('style').focus();
        $(this).html("保存");
        $("#nickname_modify_cancel_btn").css("display", "");
        self.data('edit', 0);
      } else {
        $.ajax({
          url: "/user/modify/nickname.json",
          type: "POST",
          dataType: "json",
          data: "nickname=" + $("#nickname_txt").val(),
          success: function (result) {
            if(result){
              if(result.rescode == 1){
                $.maskUI.alert('修改成功！');
                self.data('edit', 1);
                $("#nickname_modify_cancel_btn").hide();
                $("#nickname_txt").prop("readonly", true).css("border", 0).css("background", "transparent").parent("span").addClass('modify');
                self.html("修改昵称");
              }else{
                $.maskUI.alert(result.resmsg);
              }
            }else{
              $.maskUI.alert('服务器异常，请稍后再试！');
            }
            
          }
        });
      }
    });


    $("#nickname_modify_cancel_btn").click(function () {
      var self = $(this);
      var oldname = $("#nickname_txt").data("oldname");
      $("#nickname_txt").val(oldname);
      $("#nickname_modify_btn").data('edit', 1);
      self.hide();
      $("#nickname_modify_btn").html("修改昵称");
      $("#nickname_txt").prop("readonly", true).css("border", 0).css("background", "transparent").parent("span").addClass('modify');
    });


    //----------change password start------

    $("#password_modify_btn").click(function (e) {
      e.preventDefault();
      $.maskUI.open({
        elem: password_modify_dialog,
        overlayClick: true,
        onOpen: function (_this) {
          _this.ui.find('input:text, input:password').val('');
          _this.ui.find('p.err').hide();
        }
      });
    });

    //-----change password----
    $("#password_modify_form").validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
          //target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
        },
        err: function (target, msg) {
          var elem = $('p.err', target.parent().parent());
          elem.html(msg || elem.data('msg')).show();
        },
        normal: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
        }
      },
      ajaxSubmit: {
        elems: 'input:text, input:password',
        success: function (ret) {
          $("#pwd_msg").html(ret.resmsg);
          $.maskUI.open({
            elem: password_success_dialog,
            overlayClick: true,
            onOpen: function (_this) {
              _this.ui.find('input:text, input:password').val('');
              _this.ui.find('p.err').hide();
            }
          });
        }
      },
      more: {
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '请输入6-14位密码，必须包含数字和字母！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=repassword]'), val = $.trim(re.val());
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
        repassword: {
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


    //----------change password end--------


    //-----------validate phone start---------

    //----点击修改弹窗----
    $(".bind_phone").click(function (e) {
      e.preventDefault();
      $.maskUI.open({
        elem: phone_modify_dialog,
        overlayClick: true,
        onOpen: function (_this) {
          _this.ui.find('input:text, input:password').not('[name=oldPhone]').val('');
          _this.ui.find('p.err').hide();
          $('#phone_code_btn').hide();
        }
      });
    });


    //-----发送验证码逻辑-----
    $("#phone_code_btn").click(function () {
      var phone = $("#new_phone").val();
      if (!phone || !(/^1\d{10}$/).test(phone)) {
        return;
      }
      var self = $(this);
      $.ajax({
        url: "/account/genPhoneCode.json",
        type: "POST",
        dataType: "json",
        data: {
          account: phone
        },
        beforeSend: function () {
          self.val('正在发送验证码...').prop('disabled', true);
        },
        success: function (ret) {
          if (ret && ret.rescode == 1) {

            //开始倒计时延迟开启重新发送
            var countdown = 60, t;
            var c = countdown;
            var sendBtn = $('button.resend');
            var timeCountdown = function () {
              self.val(c + '秒后重新发送');
              c = c - 1;
              t = setTimeout(timeCountdown, 1000);
              if (c < 0) {
                c = countdown;
                clearTimeout(t);
                self.val("重新发送验证码");
                self.prop("disabled", false);
              }
            };
            timeCountdown();
            alert("验证码发送成功！");
          } else {
            self.prop('disabled', false);
            alert("验证码发送失败！");
          }

        }
      });
    });

    //-----表单提交逻辑----
    var phoneAccountCheck = $('input[name=phoneAccountCheck]');
    $("#phone_modify_form").validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
          //target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
        },
        err: function (target, msg) {
          var elem = $('p.err', target.parent().parent());
          elem.html(msg || elem.data('msg')).show();
        },
        normal: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
        }
      },
      ajaxSubmit: {
        elems: 'input:text, input:password',
        success: function (ret) {
          if (ret) {
            if(ret.rescode == 1){
              $.maskUI.open({
                elem: phone_success_dialog,
                overlayClick: true,
                onOpen: function (_this) {
                  _this.ui.find('input:text, input:password').val('');
                  _this.ui.find('p.err').hide();
                },
                onClose: function(){
                  window.location.reload();
                }
              });
            }else{
              $.maskUI.alert(ret.resmsg || '验证码错误！');
            }

          } else {
            $.maskUI.alert('服务器异常，请稍后再试！');
          }
        }
      },
      more: {
        account: {
          type: 'isPhone',
          msg: '请输入正确的手机号码！',
          fn: function (_this, prompt, e) {

            if (!e) {
              return true;
            }
            var self = $(this),
                val = $(this).val();

            if(phoneAccountCheck.val() == val){
              prompt.err(self, '此手机号已被注册！');
              return false;
            }
            $.getJSON('/account/checkAccountBind.json?account=' + val, function (ret) {
              if (ret.rescode == 1) {
                if (ret.result) {
                  prompt.err(self, '此手机号已被注册！');
//                  _this.form.find('input[type=submit]').prop('disabled', true);
                  $("#phone_code_btn").hide();
                  phoneAccountCheck.val(val);
                } else {
                  prompt.succ(self);
//                  _this.form.find('input[type=submit]').prop('disabled', false);
                  $("#phone_code_btn").show();
                  phoneAccountCheck.val('');
                }
              } else {
                prompt.err(self, ret.resmsg);
//                _this.form.find('input[type=submit]').prop('disabled', true);
                $("#phone_code_btn").hide();
                phoneAccountCheck.val('');
              }
            });
            return true;
          }
        },
//        oldPhone: {
//          type: 'isPhone',
//          msg: '请输入正确的手机号码！',
//          fn: function (_this, prompt, e) {
//            if (!e) {
//              return true;
//            }
//            var self = $(this);
//            $.getJSON('/account/checkAccountBind.json?account=' + $(this).val(), function (ret) {
//              if (ret.rescode == 1) {
//                if (ret.result) {
//                  prompt.err(self, '此手机号已被注册！');
//                  _this.form.find('input[type=submit]').prop('disabled', true);
//                  $("#phone_code_btn").hide();
//                } else {
//                  prompt.succ(self);
//                  _this.form.find('input[type=submit]').prop('disabled', false);
//                  $("#phone_code_btn").show();
//                }
//              } else {
//                prompt.err(self, ret.resmsg);
//                _this.form.find('input[type=submit]').prop('disabled', true);
//                $("#phone_code_btn").hide();
//              }
//            });
//            return true;
//          }
//        },
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '请输入6-14位密码，必须包含数字和字母！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=repassword]'), val = $.trim(re.val());
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
        repassword: {
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
    }).init().submit(function(){
      if (phoneAccountCheck.val() !== '') {
        return false;
      } else {
        return true;
      }
    });

    //-----------validate phone end-----------


    //------------------validate email start --------------------
    $(".bind_email").click(function (e) {
      e.preventDefault();
      $.maskUI.open({
        elem: email_modify_dialog,
        overlayClick: true,
        onOpen: function (_this) {
          _this.ui.find('input:text, input:password').not('[name=oldemail]').val('');
          _this.ui.find('p.err').hide();
        }
      });
    });

    //change Email
    var mailAccountCheck = $('input[name=mailAccountCheck]');
    $("#email_modify_form").validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
          //target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
        },
        err: function (target, msg) {
          var elem = $('p.err', target.parent().parent());
          elem.html(msg || elem.data('msg')).show();
        },
        normal: function (target) {
          $('p.err', target.parent().parent()).html('').hide();
        }
      },
      ajaxSubmit: {
        elems: 'input:text, input:password',
        success: function (ret) {
          if (ret) {
            if(ret.rescode == 1){
              $("#email_redirect_login").attr("href", "http://" + ret.loginEmail);
              $("#email_confirm_span").text(ret.email);
              $.maskUI.open({
                elem: email_redirect_login_dialog,
                overlayClick: true,
                onOpen: function (_this) {
                  _this.ui.find('input:text, input:password').val('');
                  _this.ui.find('p.err').hide();
                },
                onClose: function(){
                  window.location.reload();
                }
              });
            }else{
              $.maskUI.alert(ret.resmsg || '绑定失败！');
            }

          } else {
            $.maskUI.alert('服务器异常，请稍后再试！');
          }

        }
      },
      more: {
        account: {
          type: 'isMail',
          msg: '请输入正确的邮箱！',
          fn: function (_this, prompt, e) {
            if (!e) {
              return true;
            }
            var self = $(this),
              val = $(this).val();


            $.getJSON(CONTEXTPATH + '/account/checkAccountBind.json?account=' + val, function (ret) {
              if (ret.rescode == 1) {
                if (ret.result) {
                  prompt.err(self, '此邮箱已被注册！');
//                  _this.form.find('input[type=submit]').prop('disabled', true);
                  mailAccountCheck.val('');
                } else {
                  prompt.succ(self);
//                  _this.form.find('input[type=submit]').prop('disabled', false);
                  mailAccountCheck.val(val);
                }
              } else {
                prompt.err(self, ret.resmsg);
//                _this.form.find('input[type=submit]').prop('disabled', true);
                mailAccountCheck.val(val);
              }
            });
            return true;
          }
        },
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
          msg: '请输入6-14位密码，必须包含数字和字母！',
          fn: function (_this, prompt) {
            var re = _this.form.find('input[name=repassword]'), val = $.trim(re.val());
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
        repassword: {
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
    }).init().submit(function(){
      if (mailAccountCheck.val() === '') {
        return false;
      } else {
        return true;
      }
    });


    $(".resend_email").click(function (e) {
      e.preventDefault();
      $.getJSON(CONTEXTPATH + "/account/sendValidate.json?type=1", function (ret) {
        if (ret) {
          if(ret.rescode == 1){
            //$.maskUI.alert('邮件已发送，请您查收');

            $.maskUI.open({
              elem: $(ret.html)
            });

          }else{
            $.maskUI.alert(ret.resmsg || '邮件发送失败，请重试！');
          }

        } else {
          $.maskUI.alert('服务器异常，请稍后再试！');
        }
      });
    });

    //------------------validate email end --------------------
    //第三方登录用户,判断是否弹出绑定邮箱窗口
    var isBindEmail=$('#isBindEmail').val();
    if(isBindEmail=="1"){
      $('a.bind_email').trigger('click');
    }else if(isBindEmail=="2"){
      $('a.resend_email:eq(0)').trigger('click');
    }
  });
});