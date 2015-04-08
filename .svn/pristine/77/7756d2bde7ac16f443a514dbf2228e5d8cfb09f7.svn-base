require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/auth_dialog', 'c/user_response','c/widgets'], function(auth_dialog, user_response){
  $(function(){
    var voteFn = function(obj,callback){
      var _this = obj;
      if(_this.hasClass('voted')){
        return;
      }
      var leftCount=$('#leftCount');
      if(parseInt(leftCount.html())==0){
        $.maskUI.alert('今日已经没有投票机会了，<br>每日3次投票机会，请您明日再来！');
        return;
      }
      $.getJSON('/activity/ali/vote.json', {id: _this.data('vid')}, function(ret){
        if(ret){
          if(ret.rescode == 1){
            leftCount.html(ret.leftCount);
            _this.addClass('voted');
            if(callback){
              callback();
            }

          }else{
            alert('投票失败！');
          }
        }else{
          alert('投票失败！');
        }
      });
    };
    $('.send_ticket').on('click',function(){
      var _this=$(this);
      voteFn(_this,function(){
        _this.removeClass('send_ticket');
        _this.find('p').html('已投票');
        _this.find('span').html(parseInt(_this.find('span').html())+1);
        var other=_this.closest('dl').siblings('.btn_send').find('.send');
        other.removeClass('send').addClass('hadsend');
        other.html('已投票');
      });
    });
    $('.send_ticket_bt').on('click',function(){
      var _this=$(this);
      voteFn(_this,function(){
        _this.removeClass('send').addClass('hadsend');
        _this.html('已投票');
        var other=_this.parent().siblings('dl').find('.send_ticket');
        other.removeClass('send_ticket');
        other.find('p').html('已投票');
        other.find('span').html(parseInt(other.find('span').html())+1);
      });
    }); 
    $('.send_myticket_bt').on('click',function(){
        var _this=$(this);
        voteFn(_this,function(){
          _this.removeClass('send').addClass('hadsend');
          _this.html('已投票'); 
          var oSpan=$('.mrk_tt span'),
              sCount=parseInt(oSpan.html()); 
          oSpan.html(sCount+1);
        });    
    })   
    //短评

    var field = $('textarea[name=content]');
    var errPrompt = $('#slicePrompt');

    field.on('keyup', function(){
      var remain = $.trim(this.value).length - 140;
      if (remain <= 0) {
        errPrompt.html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
      } else {
        errPrompt.html('您已超出输入<strong class="red">' + remain + '</strong>字');
      }
    });

    var comments = $('ul.comment_list');
    $('#shortComments').on('click', function(){
      var _this = $(this);
      var field = $(this).closest('.option_sub').siblings('.ipt_comment').find('textarea[name=content]');
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
        dataType: 'html',
        data: {
          id: $('input[name=id]').val(),
          content: field.val()
        },
        beforeSend: function(){
          _this.prop('disabled', true);
        },
        success: function(ret){
          comments.prepend($(ret).hide().delay(200).fadeIn());
          field.val('').focus();
          _this.prop('disabled', false);
        },
        error: function(){
          _this.prop('disabled', false);
          alert('发送失败！');
        }
      })
    });

    //删除评论
    comments.on('click','.add_reply',function(){
      var _t=$(this),
          id=_t.data('pid'),
          questionid=_t.data('questionid');
      $.ajax({
        url: '/activity/ali/comment/delete',
        type: 'post',
        dataType: 'json',
        data: {
          id:id,
          questionid:questionid
        },
        success:function(result){
          if(result.rescode==1){
            _t.closest('li').remove();
          }
        }  
      });   
    })

    //paging
    $('div.staticPager').paging({
      staticUrl: true
    });

    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.js_share'
    });
    //分享计数
    $('body').on('click','a.js_share',function(){
      var _t=$(this);
      var id=_t.data('vid');
      $.ajax({
        url:'/activity/ali/share.json',
        data:{
          id:id
        }
      });
    });
  });
});