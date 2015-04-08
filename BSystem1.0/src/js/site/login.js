require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator'],function(){
 $(function(){
    $('input:text, input:password').placeholder();
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
      }
    }).init().submit();

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
 })
});