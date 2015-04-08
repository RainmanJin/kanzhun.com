require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});
require(['c/widgets','comp/floatword/floatword','v2/activity/jinping/piece/sign','v2/activity/jinping/piece/scroll','comp/qrcode/jquery.qrcode.min'], function () {
  $(function(){
    var floatword = require('comp/floatword/floatword');
    $('div.co_header').on('click','.help a.bt',function(){
      var _t=$(this);
      $.ajax({
        url:_t.data('url'),
        success:function(result){
          if(result.rescode==1){
            _t.closest('.current').replaceWith(result.html);
            $.maskUI.open({
              elem:$(result.pophtml)
            });
            try {
              $('div.frame1 .qr_code,div.frame2 .qr_code').qrcode({
                text: location.href,
                width: 154,
                height: 154
              });
            }catch(e){
              $('div.frame1 .qr_code,div.frame2 .qr_code').qrcode({
                render: "table",
                text: location.href,
                width: 154,
                height: 154
              });
            }
            prependNewList(result.newhtml);
          }
        }
      });
    });
    function prependNewList(elem){
      var _t=$(this);
      var list=$('.cr_newList ul');
      if(list.find('.reason_new').length==0){
        list.prepend(elem);
      }else{
        list.find('.reason_new').replaceWidth(elem);
      }
    }



    //右侧顶部切换
    $('div.cr_top').on('click','[data-type="nav"] a',function(){
      var _t=$(this);
      if(_t.hasClass('current')){
        _t.removeClass('current');
        $('div.crt_list').hide();
      }else{
        $.ajax({
          url: _t.data('url'),
          success:function(result){
            //_t.data('lastid',result.lastId);
            _t.addClass('current').parent().siblings().find('a').removeClass('current');
            $('div.crt_list ul').html(result.html);
            $('div.crt_list .bt_more').data('url', _t.data('url')).data('lastid',result.lastId);;
            if(!result.more){
              $('div.crt_list .bt_more').hide();
            }
            $('div.crt_list').show();
          }
        });
      }
    }).on('click','.bt_more',function(){
      //点击更多
      var _t=$(this);
      $.ajax({
        url: _t.data('url'),
        data:{
          lastId:_t.data('lastid')
        },
        success:function(result){
          _t.data('lastid',result.lastId);
          _t.prev().append(result.html);
          if(!result.more){
            _t.hide();
          }
        }
      });
    });

    //短评
    var shortViewContent = $('#shortViewContent');
    $('div.comment').on('click','[data-type="submit"]',function(){
      var _t=$(this);
      var text= $.trim(shortViewContent.val());
      if(text==''){
        shortViewContent.addClass('shine');
        return false;
      }
      $.ajax({
        url:_t.data('url'),
        data:{
          content:text
        },
        success:function(result){
          if(result.rescode==1){
            $('ul.comment_list').prepend(result.html);
            shortViewContent.val('');
          }
        }
      });
    }).on('click','a.bt_more',function(){
      //点击更多
      var _t=$(this);
      $.ajax({
        url: _t.data('url'),
        data:{
          lastId:_t.data('lastid')
        },
        success:function(result){
          _t.data('lastid',result.lastId);
          _t.prev().append(result.html);
          if(!result.more){
            _t.hide();
          }
        }
      });
    });

    shortViewContent.on('animationend webkitAnimationEnd', function(){
      shortViewContent.removeClass('shine');
    });

    try{
      $('aside .qrcode').qrcode({
        text	: location.href,
        width: 128,
        height: 128
      });
    }catch(err){
      $('aside .qrcode').qrcode({
        render	: "table",
        text	: location.href,
        width: 128,
        height: 128
      });
    }
  });
});