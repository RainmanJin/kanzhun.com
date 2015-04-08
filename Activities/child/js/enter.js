
$(function(){
  //评论相关
  var commentTool=$('.commentTool'),
    comment=$('ul.comment'),
    scaleLine=$('.scaleLine');
  var ajaxFlag=true;
  $('.bt_comment',commentTool).on('click',function(){
    var _t=$(this);
    var ipt=$('input',commentTool),
      iptVal= $.trim(ipt.val());
    if(iptVal==''){
      ipt.addClass('shine').one('animationend webkitAnimationEnd', function(){
        $(this).removeClass('shine');
      });
      return false;
    }
    if(!ajaxFlag){
      return false;
    }
    $.ajax({
      type: 'post',
      url: '/activity/tell/publish.json',
      dataType: 'json',
      data: {
        companyId:_t.data('cid'),
        originId:_t.data('cid'),
        commentContent:iptVal,
        //field:supportId,
        parentId:_t.data('parentid'),
        parentFloor:_t.data('parentfloor')
      },
      beforeSend: function(){
        ajaxFlag=false;
      },
      success: function(ret){
        if( ret.rescode == 1){
          $('#noComment').hide();
          if($.trim(ret.html) !== ''){
            comment.eq(0).prepend($(ret.html).hide().delay(200).fadeIn());
            ipt.val('').focus();
            //初始化回复
            ipt.attr('placeholder','我来说两句...');
            $('.bt_comment',commentTool).data('parentid','').data('parentfloor','');
          }else{
            alert('您的评论不符合要求，请修改！');
            ipt.focus();
          }

        }
        ajaxFlag=true;
      },
      error: function(){

      }
    });
  });
//回复
  $(comment).on('click','.reply',function(){
    var _t=$(this);
    var ipt=$('input',commentTool);
    var floor=_t.closest('.comment_r').siblings('.comment_l').find('.floor').html();
    $('input',commentTool).val('');
    ipt.attr('placeholder','回复'+floor);
    $('.bt_comment',commentTool).data('parentid',_t.data('parentid')).data('parentfloor',_t.data('parentfloor'));
  });
//有用
  comment.on('click','.good',function(){
    var _t=$(this);
    if(_t.hasClass('current')){
      return false;
    }
    var count=parseInt(_t.text())+1;
    _t.addClass('current');
    _t.html('<i class="hand"></i> '+count);

    var effect = $('<b>+1</b>');
    _t.append(effect);
    effect.animate({'top': -40, 'opacity': 0, 'font-size': '30px'}, 400, function(){
      $(this).remove();
    });
    $.ajax({
      url:'/shortreview/useful.json',
      data:{
        shortreviewId:_t.data('commentid')
      },
      dataType:'json',
      success:function(){

      }
    });
  });

  //更多
  $('a.more_details').on('click', function(){
    var _t = $(this);
    $.ajax({
      url: '/activity/tell/review.json',
      dataType:'json',
      data:{
        curpage:_t.data('page'),
        lastId:_t.data('lastid'),
        companyId:$('.bt_comment').data('cid'),
        originId:$('.bt_comment').data('cid')
       // type: _t.data('ctype')
      },
      success: function(ret){
        if(ret){
          _t.siblings('ul.comment').append(ret.html);
          _t.data('page', ret.nextPage);
          _t.data('lastid',ret.lastId);
          if(!ret.more) {
            _t.hide();
          }
        }
      }
    });
  });

});
