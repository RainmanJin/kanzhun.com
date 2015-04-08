require.config({
  paths: {
    u: '../utils'
  }
});

require(['module/vote'], function(){
  $(function(){
    var vote = require('module/vote');
    vote({
      propagation: $('div.wrapper'),
      delegate: 'div.vote'
    });

    $('#topKzTip').on('click', function(){
      $(this).parent().remove();
    });

    //短评
    var comments = $('ul.comments');
    var commentsTotal =$('#commentsTotal, #commentsTotal2');

    $('#shortComments').on('click', function(){
      var _this = $(this);
      var field = $(this).parent().find('textarea[name=content]');
      if($.trim(field.val()) === ''){
        field.addClass('shine').one('animationend webkitAnimationEnd', function(){
          $(this).removeClass('shine');
        });
        field.focus();
        return;
      }


      $.ajax({
        url: '/activity/ali/comment.json',
        type: 'post',
        dataType: 'json',
        data: {
          id: $('input[name=id]').val(),
          content: field.val()
        },
        beforeSend: function(){
          _this.prop('disabled', true);
        },
        success: function(ret){
          if(ret){
            if(ret.html){
              commentsTotal.html(parseInt(commentsTotal.eq(0).html()) + 1);
              comments.prepend($(ret.html).hide().delay(200).fadeIn());
              field.val('').focus();
            }else{
              alert(ret.resmsg || '发送失败!');
            }
          }else{
            alert('发送失败！');
          }
          _this.prop('disabled', false);
        },
        error: function(){
          _this.prop('disabled', false);
          alert('发送失败！');
        }
      })
    });

    var h='<div><div>'+
      '<div class="mask" id="mask" style="display:none"></div>'+
      '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
      '<p><img src="/images/activity/ali/share.png" width="171"></p>'+
      '<i class="arrows"></i>'+
      '</div></div></div>';

    $('body').append(h)

    var mask = $('#mask'),
      dialog = $('#transmitDialog');

    var shareTotal =$('#shareTotal');
    $('a.share').on('click', function(e){
      e.preventDefault();
      var _this = $(this);

      if (window._T) {
        _T.sendEvent('activity-ali-share');
      }

      $('#share').html(_this.data('msg'));

      $.post('/activity/ali/share.json', {
        id: $(this).data('vid')
      }, function(ret){
        if(ret && ret.rescode == 1){
          shareTotal.html(parseInt(shareTotal.eq(0).html()) + 1);
        }else{
          alert('分享失败！');
        }
      });

      //如果是微信打开
      if(window.shareCallback){
        mask.show();
        dialog.show();
      }else{
        setTimeout(function(){
          window.location.href = _this.attr('href');
        },300);
      }
    });

    mask.on('click',function(e){
      mask.hide();
      dialog.hide();
    });

    window.closeShareDialog = function(){
      $('#mask').hide();
      $('#transmitDialog').hide();
    }
  });
});