(function(){

  var wx = function(target, msg, callback){
    $('body').append(
        '<div class="mask" id="wxMask">'+
        '<div class="transmitDialog" id="transmitDialog"><p>' +
        msg +
        '</p><i class="arrows"></i></div></div>');

    var mask = $('#wxMask'),
        dialog = $('#transmitDialog');

    target.on('click', function(e){
      e.preventDefault();
      mask.show();
      dialog.show();

      if(callback){
        callback();
      }
    });

    mask.on('click',function(e){
      mask.hide();
      dialog.hide();
    });
  };

  wx($('#shareToWx'), '分享到【朋友圈】 <br/> 跟朋友一起玩~~', function(){
   // __wxsharecookie();
  });

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





  var pubcon={
    responsive : true,
    segmentShowStroke : false,//边线
    segmentStrokeWidth:2,
    percentageInnerCutout:90,//宽度
    animationSteps:100,//时间
    animateRotate:true,//动画
    animateScale:false //从中间动画
  };

  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    moveStartThreshold: 30,
    speed: 1e3,
    onSwiperCreated: function(){
      //
    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      console.log(index)
      if(index==1){
        remain($('#three01'), 'fadeInUpSlowly',function(){
          remain($('#three02'), 'topto',function(){
              remain($('#three03'), 'fadeInUpSlowly');
          });
        });
      }else if(index==2){
        remain($('#three0301'), 'topto',function(){
          remain($('#three0302'), 'fadeInUpSlowly',function(){
            remain($('#three0303'), 'fadeInUpSlowly');
          });
        });

        var sytext01=(document.getElementById("sytext01").innerHTML)*1;

        var doughnutData = [
          {
            value: sytext01,
            color: "#a2ecfe"
          },
          {
            value: 100-sytext01,
            color: "#4CAEC8"
          }

        ];

        var ctx = document.getElementById("chart-area01").getContext("2d");
        window.myDoughnut = new Chart(ctx).Doughnut(doughnutData,pubcon);


      }else if(index==3){
        remain($('#three0401'), 'fadeInUpSlowly',function(){
          remain($('#three0402'), 'topto',function(){
            remain($('#three0403'), 'fadeInUpSlowly');
          });
        });

      }else if(index==4){


        var sytext02=(document.getElementById("sytext02").innerHTML)*20;
        var sytext03=(document.getElementById("sytext03").innerHTML)*20;
        var sytext04=(document.getElementById("sytext04").innerHTML)*20;
        var sytext05=(document.getElementById("sytext05").innerHTML)*20;


        var doughnutData02 = [
          {
            value: sytext02,
            color: "#ffd887"
          },
          {
            value: 100-sytext02,
            color: "#c8b7fe"
          }
        ];

        var doughnutData03 = [
          {
            value: sytext03,
            color: "#c271ff"
          },
          {
            value: 100-sytext03,
            color: "#c8b7fe"
          }
        ];

        var doughnutData04 = [
          {
            value: sytext04,
            color: "#ff7f7e"
          },
          {
            value: 100-sytext04,
            color: "#c8b7fe"
          }
        ];

        var doughnutData05 = [
          {
            value: sytext05,
            color: "#7ea5ff"
          },
          {
            value: 100-sytext05,
            color: "#c8b7fe"
          }
        ];




        var ctx02 = document.getElementById("chart-area02").getContext("2d");
        window.myDoughnut02 = new Chart(ctx02).Doughnut(doughnutData02, pubcon);

        var ctx03 = document.getElementById("chart-area03").getContext("2d");
        window.myDoughnut03 = new Chart(ctx03).Doughnut(doughnutData03, pubcon);

        var ctx04 = document.getElementById("chart-area04").getContext("2d");
        window.myDoughnut04 = new Chart(ctx04).Doughnut(doughnutData04,pubcon);

        var ctx05 = document.getElementById("chart-area05").getContext("2d");
        window.myDoughnut05 = new Chart(ctx05).Doughnut(doughnutData05,pubcon);


        remain($('#three0501'), 'fadeInRight');
        remain($('#three0502'), 'fadeInRight');
        remain($('#three0503'), 'fadeInRight');
        remain($('#three0504'), 'fadeInRight');

        remain($('#three0504'), 'fadeInUpSlowly',function(){
          remain($('#three0505'), 'topto',function(){
            remain($('#three0506'), 'fadeInUpSlowly');
          });
        });


      }else if(index==5){
        remain($('#three0601'), 'fadeInUpSlowly',function(){
          remain($('#three0602'), 'topto',function(){
            remain($('#three0603'), 'topto')
          });
        });
      }
    }
  });
})();


