define(['c/widgets'], function () {
  $(function () {
    //logged user info
    $('div.hello dl').hover(function(){
        $(this).find('dd').show('2000');
    },function(){
        $(this).find('dd').hide();
    })
    $("#js_changePwd").on("click",function(){
      var html=""+
          '<section class="p_dialog" style="display:block">'+
            '<div class="dialog_con">'+
              '<h3 class="poptitle mb15">修改密码</h3>'+
              '<a href="javascript:;" class="dialog_close maskuiclose"></a>'+
              '<form id="changepwdForm" action="/password/change.json" method="post">'+
              '<div class="dialog_resume_ret mt20 resume_err">'+
                '<p><label class="ttlabel">当前密码</label><input type="password" name="oldPassword" class="v ipt" placeholder="当前密码"></p>'+
                '<p class="err" data-msg="密码不能为空！"></p>'+
                '<p class="mt10"><label class="ttlabel">新的密码</label><input type="password" name="password" class="v ipt" placeholder="新的密码"></p>'+
                '<p class="err" data-msg="新的密码不能为空！" style="display: block;"></p>'+
                '<p class="mt10"><label class="ttlabel">确认密码</label><input type="password" name="repassword" class="v ipt" placeholder="确认密码"></p>'+
                '<p class="err" data-msg="确定密码不能为空！" style="display: block;"></p>'+
                '<p class="mt20"><label  class="ttlabel"></label>'+
                  '<span class="btn_grey_small"><input type="submit" value="确定"></span>'+
                  '<a href="javascript:;" class="grey_99 ml20 maskuiclose">取消</a></p>'+
              '</div>'+
              '</form>'+
            '</div>'+
          '</section>';
      var sucHtml=''+    
      '<section id="password_success_dialog" class="p_dialog">'+
        '<div class="dialog_con">'+
          '<a href="javascript:;" class="dialog_close maskuiclose"></a>'+
          '<h3>修改密码</h3>'+
          '<p class="t-center mt10 mb10"><span id="pwd_msg"></span></p>'+
          '<p class="t-center mb15">'+
            '<a href="javascript:;" class="btn_grey_s maskuiclose confirm_ok">确认</a>'+
          '</p>'+
        '</div>'+
      '</section>';
      $.maskUI.open({
          elem: $(html),
          onClose:function(){
            $(this).remove();
          }
      });
      $("#changepwdForm").validatorAll({
        elems: '.v',
        prompt: {
          succ: function (target) {
            target.parent().next("p.err").html('').hide();
            //target.parent().next('i').attr('class', 'suc_v').css('display','inline-block');
          },
          err: function (target, msg) {
            var elem = target.parent().next("p.err");
            elem.html(msg || elem.data('msg')).show();
          },
          normal: function (target) {
            target.parent().next("p.err").html('').hide();
          }
        },
        ajaxSubmit: {
          elems: 'input:text, input:password',
          success: function (ret) {
            $(".changepwd").remove();
            $.maskUI.open({
              elem: $(sucHtml),
              onClose:function(){
                $(this).remove();
              }
            });
            $("#pwd_msg").html(ret.resmsg);
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
    })
  });
});