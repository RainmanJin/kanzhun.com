
$(function(){

    var bw = $(".barrage").width();

    var pb = $("div.barrage div p");

    var aw = Math.floor(bw+ pb.width());

    var speed = 10;

    $.keyframe.define([{
      name: 'barrage',
      '0%': {  'transform': 'translate3d(0,0,0)'  },
      '100%': {  'transform': 'translate3d('+ (-1*aw +'px') +',0,0)' }
    }]);

     pb.playKeyframe({
         name:'barrage',
         duration:aw * speed/1000 + "s",
       timingFunction: 'linear',
       delay: 0,
       iterationCount: '1',
       direction: 'normal',
       fillMode: 'forwards'
     });
});


/*
if( $('body').data('barrage') == 1 ){

  var w = $('div.barrage').width(),
      speed = 15,
      loadScreen = 1,
      str = [];

  var loadBarrage = function(){
    $.ajax({
      type: 'get',
      url: '/common/barrage.json',
      data: {
        page: loadScreen
      },
      success: function(ret){
        if(ret){
          $('div.barrage div').append(ret);
          var barrage = $('div.barrage div p');
              aw = Math.floor(barrage.width()) + w;

              $.keyframe.define([{
                name: 'barrage',
                '0%': {
                  'transform': 'translate3d(0,0,0)'
                },
                '100%': {
                  'transform': 'translate3d('+ (-1*aw +'px') +',0,0)'
                }
              }]);


                barrage.playKeyframe({
                  name: 'barrage',
                  duration: aw * speed/1000 + "s",
                  timingFunction: 'linear',
                  delay: 0,
                  iterationCount: '1',
                  direction: 'normal',
                  fillMode: 'forwards'
                }, function(){
                  barrage.remove();
                  loadScreen += 1;
                  setTimeout(function(){
                    loadBarrage()
                  }, 3000)
                });

          //关闭弹幕
          $('a.barrage_option').on('click', function(){
            if(!barrage.is(':animated')){
              $('div.only_bg').fadeOut();
              $('#onlyHeight').fadeOut();
              $.writeCookie('barrage', '1');
            }
          })

        }
      }
    })
  };

  //没有cookie默认打开弹幕
  if(!$.readCookie('barrage')){
    $('body').append('<div style="height: 50px;" id="onlyHeight"></div><div class="only_bg clearfix"></div>');
    $('div.only_bg').prepend('<a ka="barrage-close" href="javascript:;" rel="nofollow" class="barrage_option"></a><div class="barrage"><div></div></div>')
    setTimeout(function(){
      loadBarrage();
    }, 500);
  };
}
*/
