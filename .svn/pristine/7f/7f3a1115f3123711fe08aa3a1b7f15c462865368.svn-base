window.onload = function(){
  var effect = function(o){
    this.elems = o.elems();
  };

  effect.prototype = {
    done: function(active, deactive){
      if(this.elems.length){
        var that = this;
        (deactive || []).forEach(function(m){
          that.elems[m].each(function(i, v){
            $(v).addClass('effect');
          });
        });

        this.elems[active].each(function(x, y){
          $(y).removeClass('effect');
        });
      }
    }
  };

  var matong = new effect({
    elems: function(){
      var arr = [];
      ['.pe1', '.pe2', '.pe3', '.pe4', '.pe5', '.pe6', '.pe7'].forEach(function(v){
        arr.push($(v));
      });
      return arr;
    }
  });

  var time6;


  var mySwiper = new Swiper('.swiper-container', {
    paginationClickable: true,
    direction: 'vertical',
    speed: 500,
    loop: true,
    onImagesReady: function(){
      document.querySelector('.swiper-wrapper').classList.remove('none');
    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;

      console.log(index)
      if(index === 0){
        matong.done(6, [0]);

      }else if(index === 1){
        console.log(1111)
        matong.done(0, [1]);

      }else if(index === 2){
        matong.done(1, [0, 2]);

      }else if(index === 3){
        matong.done(2, [1, 3]);

      }else if(index === 4){
        matong.done(3, [2, 4]);

      }else if(index === 5){
        matong.done(4, [3, 5]);

      }else if(index === 6){
        matong.done(5, [4]);

      }else if(index === 7){
        matong.done(6, [5]);

      }else if(index === 8){
        matong.done(0, [6]);
      }
    }
  });

  document.querySelector('#loading').remove();
}