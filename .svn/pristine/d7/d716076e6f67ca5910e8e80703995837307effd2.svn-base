require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator'],function(){
 $(function(){
   /*$('input:text, input:password').placeholder();*/
   window.changeAuthCode = function (target) {
     if (target) {
       $('input[name=captcha]').val('');
       target.setAttribute('src', target.getAttribute('src').split('&t=')[0] + '&t=' + (new Date()).getTime());
     }
   };

   if( window.location.hash ){
     var Hash = window.location.hash, clssStr = Hash.substring(Hash.indexOf('#')+1);
     $('div.auth_ipts').addClass(clssStr);
   }

   if( $('#ipt_wrap').hasClass('login') ){
     //$('title').html('登录');
     document.title = '登录';
   }

   if( $('#ipt_wrap').hasClass('register') ){
     //$('title').html('注册');
     document.title = '注册';
   }

   $('div.auth_ipts').on('click', 'a.js-jump', function(e){
     e.stopPropagation();
     e.preventDefault();
     var moveBox = $('section.auth'),
          self = $(this);
     var divMove = self.parent().parent();
     document.title = self.data('title');
     divMove.animate({
       'display': 'none',
       'left': 375
     }, 1000, function(){
       divMove.css({'left': 0, 'display': 'block', 'z-index': 1});
       $.each(moveBox, function(i, v){
         if(i != divMove.index()){
           $(v).css({'display': 'block', 'z-index': 2});
         }
       })
     });

   });

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
         type: 'isMail',
         msg: '邮箱格式错误！'
       }
     }
   }).init().submit();

   //注册
   //register
   var accountCheck = $('input[name=accountCheck]');//, flag = false;
   //$('#account').val(' ').val('');
   $('#registerForm').validatorAll({
     elems: 'input',
     prompt: {
       succ: function (target, e) {
         var parent = target.parent();
         $('p.err', parent).hide();
         parent.removeClass('error focus');
       },
       err: function (target, msg, e) {
         $('#registerForm p.err').hide();
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
       $(this).parent().removeClass('error').addClass('focus').find('p.err').hide();
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

           $.ajax({
             async: 'false',
             url: CONTEXTPATH + '/checkRegister.json',
             data: {email: val},
             dataType: 'json',
             success: function(ret){
               ret = ret || {};
               if (ret.rescode == 1) {

                 if (!ret.register) {
                   prompt.succ(self);

                   accountCheck.val('');
                   //flag = true;
                 } else {
                   prompt.err(self, '此邮箱已被注册！');
                   accountCheck.val(val);
                 }
               } else {
                 prompt.err(self, ret.resmsg || '服务器异常！');
                 accountCheck.val('');
               }
             }
           });
           return true;
         }
       },

       password: {
         type: /^(?![^a-zA-Z]+$)(?!\D+$).{8,20}$/,
         msg: '密码格式错误!'
       }
     }
   }).init().submit(function () {
     if (accountCheck.val() !== '') {
       alert(2);
       return false;
     } else if( !$('#agreeCb').is(':checked') ){
        return false;
     }else {
       return true;
     }
   });

   //意见反馈
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