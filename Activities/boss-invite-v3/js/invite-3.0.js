(function(){

  var writing = function(msg, elem, callback){
    msg = msg.split('');
    var len = msg.length,
      i = 0;
    var timer = setInterval(function(){
      if(i === len){
        clearInterval(timer);
        if(callback){
          callback();
        }
      }else{
        elem.innerHTML += msg[i]
        i++
      }
    }, 100)

  };

  var animate = function  ($c, effect, cb, delay) {
    $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $c.removeClass(effect);
      cb && setTimeout(function(){
        cb.call($c);
      }, delay||0);
    });
  }
  var remain = function  ($c, effect, cb, delay) {
    $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
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
      animate($('#one5'),'fadeInRight', function(){
        animate($('#one3'), 'bounceInDown', function(){
          this.addClass('jump infinite');
          animate($('#one1'), 'fadeInUp', function(){
            this.addClass('rubberBand animated');
          },1500);
          animate($('#one6'),'fadeInRight', function(){
            animate($('#one4'), 'bounceInDown', function(){
              this.addClass('jump infinite');
              animate($('#one2'), 'fadeInUp',function(){
                this.addClass('rubberBand animated');
              },1000);

              $('#one7').css('display', 'inline-block').addClass('fadeInUpSlowly animated');
            });
          })
        });
      });


    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      console.log(index)
      if(index==1){
        if(!$('#page2').data('done')){
          $('#page2').data('done', true);
          animate($('#two5'),'fadeInUpSlowly animated', function(){
            animate($('#two6'),'fadeInUpSlowly animated');
          });

          animate($('#two1'), 'bounceInUp animated', function(){
            this.addClass('jump infinite');

            animate($('#two2'), 'bounceInUp animated',function(){
              this.addClass('jump infinite');
              animate($('#two3 i'), 'rise animated', function(){
                this.remove();
              });
              animate($('#two4 i'), 'rise animated', function(){
                this.remove();
                $('#two7').show().addClass('shine animated infinite');
              });
              remain($('#two8'), 'fadeInUpSlowly animated', function(){
                $('#two9').css('display', 'inline-block').addClass('fadeInUpSlowly animated');
              });
            });
          });
        }
      }else if(index==2){
        if(!$('#page3').data('done')){
          $('#page3').data('done', true);

          animate($('#three1'), 'fadeInUpSlowly animated', function(){
            animate($('#three5').css('display', 'inline-block'), 'fadeInRight', function(){
              animate($('#three2'), 'fadeInUp', function(){
                animate($('#three3'), 'fadeInUp', function(){
                  animate($('#three4'), 'fadeInUp')
                });
              });
            });
          });

        }
      }else if(index==3){
        if(!$('#page4').data('done')) {
          $('#page4').data('done', true);
          writing('点此下载 Boss直聘', $('#four2')[0], function () {
            $('#four2').append('<img src="images/four-2.png">')
            animate($('#four2 img'), 'roll', function(){
              $('#four2').addClass('colorShine infinite');
            });
          });
        }
      }
    }
  });
})();


