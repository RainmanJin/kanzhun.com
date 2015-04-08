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
    $('div.top10list,div.otherList').on('click','[data-type="bt_help"]',function(){
      var _t=$(this);
      $.ajax({
        url:_t.data('url'),
        success:function(result){
          if(result.rescode==1){
            floatword({
              cfw: _t
            });
            setTimeout(function(){
              _t.closest('[data-type="li_cb"]').replaceWith(result.html);
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
            },300);
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

    //加载更多
    $('div.otherList').on('click','a[data-type="more"]',function(e){
      e.stopPropagation();
      var _t=$(this);
      var rankindex=_t.data('rankindex');
      $.ajax({
        url: _t.data('url'),
        data: {
          rankindex:rankindex
        },
        success:function(result){
          _t.data('rankindex',result.rankindex);
          _t.prev().append(result.html);
          if(!result.more){
            _t.hide();
            _t.next().show();
          }
        }
      });
    });

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


    function fixedTop(){
      var tip_nav=$('div.tip_nav'),
          oT=tip_nav.offset().top,
          h=tip_nav.height(),
          cr_top=$('div.cr_top');
      var newDiv=$('<div>');
      newDiv.css({height:h}).hide();
      tip_nav.after(newDiv);
      var newRDiv=$('<div>');
      newRDiv.css({height:h}).hide();
      cr_top.after(newRDiv);
      $(window).on('scroll',function(){
        var sT=$(window).scrollTop();
        if(sT>oT){
          tip_nav.addClass('fixed');
          cr_top.addClass('fixed');
          newDiv.show();
          newRDiv.show();
        }else{
          tip_nav.removeClass('fixed');
          cr_top.removeClass('fixed');
          newDiv.hide();
          newRDiv.hide();
        }
      });
    }
    fixedTop();

  });
});