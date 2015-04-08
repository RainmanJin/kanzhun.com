(function(){
  var animate = function  ($c, effect, cb, delay) {
    $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $c.removeClass(effect);
      cb && setTimeout(function(){
        cb.call($c);
      }, delay||0);
    });
  };

  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    moveStartThreshold: 30,
    speed: 1e3,
    onSwiperCreated: function(){
      animate($('#index1'), 'zoomIn animated', function(){
        animate(this, 'swing animated')
      });
      animate($('#index2'), 'fadeInUpBig', function(){
        animate($('#index3'), 'fadeInUpBig', function(){
          animate($('#index4'), 'fadeInUpBig');
        });
      });


    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      console.log(index)
      if(index==1){
        if(!$('#page2').data('done')) {
          $('#page2').data('done', true);
          animate($('#logo2'), 'fadeInLeft')

          animate($('#page2 dd'), 'fadeIn animated', function(){

            animate($('#jd2').css('visibility', 'visible'), 'fadeInUp');
          });
          animate($('#job2'), 'fadeInDown');


        }
      }else if(index==2){
        if(!$('#page3').data('done')) {
          $('#page3').data('done', true);
          animate($('#logo3'), 'fadeInLeft');

          animate($('#page3 dd'), 'fadeIn animated', function(){
            animate($('#jd3').css('visibility', 'visible'), 'fadeInUp');
          });
          animate($('#job3'), 'fadeInDown');

        }

      }else if(index==3){
        if(!$('#page4').data('done')) {
          $('#page4').data('done', true);
          animate($('#logo4'), 'fadeInLeft');

          animate($('#page4 dd'), 'fadeIn animated', function(){

            animate($('#jd4').css('visibility', 'visible'), 'fadeInUp');
          });
          animate($('#job4'), 'fadeInDown');

        }
      }else if(index==4){
        if(!$('#page5').data('done')) {
          $('#page5').data('done', true);
          animate($('#logo5'), 'fadeInLeft');

          animate($('#page5 dd'), 'fadeIn animated', function(){

            animate($('#jd5').css('visibility', 'visible'), 'fadeInUp');
          });

          animate($('#job5'), 'fadeInDown');

        }
      }
    }
  });
})();


