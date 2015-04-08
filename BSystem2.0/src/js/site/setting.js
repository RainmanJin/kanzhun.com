require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.'
  }
});
require(['c/widgets', 'u/validator', 'c/autosearch'], function () {
  $(function() {
    $('#saveBtn').removeClass('disabledbtn').find('input[type=submit]').prop('disabled', false);
   /* $('input:text, input:password').placeholder();*/
    //-----发送验证码逻辑函数-----
    function verificationPhone (self){
      var phone = $("#user_phone").val();
      if (!phone || !(/^1\d{10}$/).test(phone)) {
        return;
      };
      $.ajax({
        url: "/setting/mobile/sendValidCode.json",
        type: "POST",
        dataType: "json",
        data: {
          mobile: phone
        },
        beforeSend: function () {
          self.val('正在发送验证码...').prop('disabled', true);
        },
        success: function (ret) {
          if (ret && ret.rescode == 1) {

            //开始倒计时延迟开启重新发送
            var countdown = 60, t;
            var c = countdown;
            //var sendBtn = $('button.resend');
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
    }
    //初次绑定手机号
    $("#btn_phone_code").click(function () {
      verificationPhone($(this));
    });
    //修改绑定的手机号
    $("#phone_code_btn").click(function () {
      verificationPhone($(this));
    });

    //------------------validate email start --------------------
    var phone_binding_dialog = $('#phone_binding_dialog');
    $("a.bind_email").click(function (e) {
      e.preventDefault();
      $.maskUI.open({
        elem: phone_binding_dialog
      });
    });

    //个人信息设置
    //只能输入数字
    $('[data-type="onlyNum"]').on("keyup",function(){
      var val = this.value.replace(/^(?=\d+)|\D/g, '');
      $(this).val(val);
    });

    var person_info_ipt = $('#person_info_ipt');
    person_info_ipt.validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error focus');
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
        mobile: {
          type: 'isPhone',
          msg: '请输入格式正确的手机号',
          fn: function (_this, prompt) {
            /*if (!e) {
             //return true;
             }*/
            var self = $(this),
              val = $(this).val();

             /*if(phoneAccountCheck.val() == val){
              prompt.err(self, '此手机号已被绑定');
              $("#phone_code_btn").prop('disabled', true);
              return false;
            }*/

            $.ajax({
              url: '/setting/checkMobile.json',
              type: "post",
              dataType: "json",
              data: {
                m: val
              },
              success: function (ret) {
                if (ret.rescode == 0) {
                  $("#btn_phone_code", person_info_ipt).prop('disabled', true);
                  prompt.err(self, '此手机号已被绑定');
                  return false;
                }else {
                  prompt.succ(self);
                }
              }
            });
            $("#btn_phone_code", person_info_ipt).prop('disabled', false);
            return true;
          }
        },
        officePhone1: {
          fn:function(_this, prompt){
            if($(this).val().length<3){
              prompt.err($(this),'请输入3~4位区号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        },
        officePhone2: {
          fn:function(_this, prompt){
            if($(this).val().length<6){
              prompt.err($(this),'请输入6~8位座机号');
              return false;
            }else{
              prompt.succ($(this));
              return true;
            }
          }
        }
      },
      ajaxSubmit: {
        elems: 'input.v, input:checked',
        success: function (ret, _this) {
          ret = ret || {};
            if (ret.rescode == 1) {
             //window.location.reload();
              $.maskUI.alert('保存成功！');
          }else {
              $.maskUI.alert(ret.resmsg || '服务器异常！');
            //$('#person_info_ipt p.sys_err').html(ret.resmsg || '服务器异常！');
          }
        }
      }
    }).init().submit(function(){
      //联系方式校验
      var $officePhone1 = $('input[name=officePhone1]'),
        $officePhone2 = $('input[name=officePhone2]'),
        $officePhone3 = $('input[name=officePhone3]');
      var officePhone1=$.trim($officePhone1.val()),
        officePhone2=$.trim($officePhone2.val()),
      officePhone3=$.trim($officePhone3.val());
      var oElem=$officePhone1.siblings('.red');

      if(officePhone1 !=='' || officePhone2 !==''){
        if( officePhone1 !=='' && officePhone2 !==''){
          return true;
        }else {
          oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
          return false;
        }
      }else {
        if( officePhone3 !== '' ) {
          oElem.html('<i class="base errormsg"></i>' + oElem.data('msg')).show();
          return false;
        }else {
          return true;
        }
      }

    });

    //修改绑定的手机号码
    var phoneAccountCheck = $('input[name=phoneAccountCheck]'), reset_phone = $('#reset_phone');
    reset_phone.validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error focus');
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
      focusMore: function(prompt){
        $(this).removeClass('error').addClass('focus');
        $('.red', $(this).parent()).html('').hide();
        return true;
      },
      ajaxSubmit: {
        elems: 'input.v',
        success: function (ret) {
          if (ret) {
            if(ret.rescode == 1){
              //$('#person_info_ipt #phone_ipt').html($('#reset_phone #phone_ipt').val());
              window.location.reload();
            }else{
              $.maskUI.alert(ret.resmsg || '验证码错误！');
            }
          } else {
            $.maskUI.alert('服务器异常，请稍后再试！');
          }
        }
      },
      more: {
        mobile: {
          type: 'isPhone',
          msg: '请输入格式正确的手机号',
          fn: function (_this, prompt) {
            /*if (!e) {
             //return true;
             }*/
            var self = $(this),
              val = $(this).val();

            if(phoneAccountCheck.val() == val){
              prompt.err(self, '此手机号已被绑定');
              $("#phone_code_btn").prop('disabled', true);
              return false;
            }

            $.ajax({
              url: '/setting/checkMobile.json',
              type: "post",
              dataType: "json",
              data: {
                m: val
              },
              success: function (ret) {
                if (ret.rescode == 0) {
                  $("#phone_code_btn", reset_phone).prop('disabled', true);
                  prompt.err(self, '此手机号已被绑定');
                  return false;
                }
              }
            });
            $("#phone_code_btn", reset_phone).prop('disabled', false);
            return true;
          }
        }
      }
    }).init().submit();

    //------------------修改密码 --------------------
    $('#changepwdForm').validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function (target) {
          $('.red', target.parent()).html('').hide();
          target.removeClass('error focus');
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

      ajaxSubmit: {
        elems: 'input:password',
        success: function (ret) {
          //window.location.reload();
          //$.maskUI.alert('提交失败，请稍后再试！');
          $.maskUI.alert(ret.resmsg || '修改失败！');
        }
      },

      more: {
        password: {
          type: /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/,
          msg: '请输入8-20位密码，必须包含数字和字母！',
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

  });
});



