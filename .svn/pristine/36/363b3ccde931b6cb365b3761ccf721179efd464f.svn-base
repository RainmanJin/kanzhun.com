(function(){

  var animate = function  ($c, effect, cb, delay) {
    $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $c.removeClass(effect);
      cb && setTimeout(function(){
        cb.call($c);
      }, delay||0);
    });
  }

  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    moveStartThreshold: 30,
    speed: 1e3,
    onSwiperCreated: function(){

    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      if(index==1){

      }
    }
  });

  var $barrage = $('div.barrage');
  var w = $barrage.width(),
    speed = 15,
    loadScreen = 1,
    str = [];

  var moving = function(){
   $('p', $barrage).each(function(i, v){
      var b = $(v);
      var s = Math.floor(speed + Math.random() * 8);
      var aw = Math.floor(b.width()) + w;

      $.keyframe.define([{
        name: 'barrage',
        '0%': {
          'transform': 'translate3d(0,0,0)'
        },
        '100%': {
          'transform': 'translate3d('+ (-1*aw +'px') +',0,0)'
        }
      }]);


      b.playKeyframe({
        name: 'barrage',
        duration: aw * s/1000 + "s",
        timingFunction: 'linear',
        delay: 0,
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'forwards'
      }, function(){
        b.remove();
      });
    });




  }

  var loadBarrage = function(){

  };


  setTimeout(function(){
    moving();
  }, 500);
})();


