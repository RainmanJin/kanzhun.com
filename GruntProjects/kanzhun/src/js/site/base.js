require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});


require(['c/auth_dialog'], function (auth_dialog) {
  $(function () {
//    $.maskUI.config = {
//      wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
//      alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
//      confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
//    };

    var shortViewContent = $('#shortViewContent'),
        jsRemind = $('#js-remind'),
        commonemail = $('#commonemail'),
        onOff = true,
        onOffT = true;

    shortViewContent.on('keyup', function (e) {
      e.stopPropagation();
      var remain = this.value.length - 800;
      if (remain <= 0) {
        $("#shortViewPrompt").html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>个字');
        // $('#basic input[type=submit]').prop('disabled', false);
      } else {
        $("#shortViewPrompt").html('您已超出输入<strong class="err">' + remain + '</strong>个字');
        // $('#basic input[type=submit]').prop('disabled', true);
      }
    });

    shortViewContent.focus(function(){
      if( !jsRemind.is(':hidden') ){
        jsRemind.addClass('none');
      }
      $(this).parent('div').removeClass('err').addClass('focus');
    }).blur(function(){
      $(this).parent('div').removeClass('focus');
    })

    commonemail.focus(function(){
      $('div.commonly_email').find('p.emailerr').hide();
    })

    $('#basic').ajaxForm({
      selector: 'textarea, input[type=text], input[type=radio]:checked',
      validate: function () {
        if ($.trim(shortViewContent.val()) === '') {
          shortViewContent.parent('div').addClass('err');
          jsRemind.removeClass('none');
          onOff = false;
        } else if ($('#shortViewContent').val().length > 800) {
          onOff = false;
        } else {
          onOff = true;
        }

        if ($.trim(commonemail.val()) === '') {
          $('div.commonly_email').find('p.emailerr').html('请输入您的常用邮箱');
          $('div.commonly_email').find('p.emailerr').show();
          onOff = false;
        } else if (!(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(commonemail.val())) {
          $('div.commonly_email').find('p.emailerr').html('请输入正确的邮箱格式').show();
          onOff = false;
        } else {
          onOffT = true;
        }

        if( onOff && onOffT ){
          return true;
        }
      },
      success: function (ret) {
        if (ret && ret.rescode == 1) {
          $.maskUI.open({
            elem: $('section.p_dialog')
          });
        } else {
          $.maskUI.alert('提交失败，请稍后再试！');
        }
      }
    });

    //登录注册
    $('a#ugc_login').click(function(){
      if(!auth_dialog.isLogged()){
        auth_dialog.open('#loginDialog?authcb=authCallback');
        window.authCallback=function(ret){
          window.location.href = $('input#loginGoUrl').attr('value');
        }
      }
    });

    $('a#ugc_regist').click(function(){
      auth_dialog.open('#registerDialog?authcb=authCallback');
      window.authCallback=function(ret){
        window.location.href = $('input#loginGoUrl').attr('value');
      }
    })
  });
});

 /*if(!isLogged){
          auth_dialog.open('#login?authcb=authCallback');
          window.authCallback = function(ret){
            var token = typeof ret === 'string' ? ret : ret.token;
            $('input[name=token]', '#ugcForm').val(token);
            isLogged = true;
            $('#ugcForm').trigger('submit');
          };
          return false;
        }*/














