window.onload = function(){
  $.fn.addEffect = function(name, html, callback, delay){
    this.each(function(i, v){
      var content = html || $(v).data('effect');
      $(v).html(content).addClass(name).on('slideEnd', function(){
        $(this).removeClass(name).html('');
      });
      callback && $(v).one('animationend webkitAnimationEnd oAnimationEnd', callback)
    });
  }

  var effect1,
    effect2,
    effect3,
    effect4,
    effect5,
    effect6,
    time6,
    effect7;

  var effections = {
    page1: function(){
      effect1 = $('.s1.swiper-slide-active .effect');
      effect1.slice(0,3).addEffect('zoomIn2');
      effect1.eq(3).addEffect('zoomIn delay3', '<div><img src="/images/activity/closestool/chat.png"><p>我本人<br/>与你直接开聊</p></div>' +
        '<div><img src="/images/activity/closestool/offer.png"><p>有诚意<br/>我能拍板签offer</p></div>');
    },

    page2: function(){
      effect2.addEffect('zoomIn', '<img src="/images/activity/closestool/p2-time.png" width="100%">');
    },

    page3: function(){
      effect3.eq(0).addEffect('fadeInRight animated', '<img src="/images/activity/closestool/p3-1.png" width="84" height="42.5">');
      effect3.eq(1).addEffect('fadeInLeft animated', '<img src="/images/activity/closestool/p3-2.png" width="84" height="42.5">');
      effect3.eq(2).addEffect('fadeInRight animated', '<img src="/images/activity/closestool/p3-3.png" width="102.5" height="91">');
    },

    page4: function(){
      effect4.eq(0).addEffect('swing', '<img src="/images/activity/closestool/p4-1.png">');
      effect4.eq(1).addEffect('fadeInLeft delay2 animated', '<img src="/images/activity/closestool/p4-2.png">');
      effect4.eq(2).addEffect('fadeInRight delay3 animated', '<img src="/images/activity/closestool/p4-3.png">');
      effect4.eq(3).addEffect('fadeInLeft delay4 animated', '<img src="/images/activity/closestool/p4-4.png">');
      effect4.eq(4).addEffect('zoomIn delay6', '<img src="/images/activity/closestool/p4-5.png">');
    },

    page5: function(){
      effect5.eq(0).addEffect('swing', '<img src="/images/activity/closestool/p5-1.png">');
      effect5.eq(1).addEffect('fadeInLeft delay2 animated', '<img src="/images/activity/closestool/p5-2.png">');
      effect5.eq(2).addEffect('fadeInLeft delay4 animated', '<img src="/images/activity/closestool/p5-3.png">');
      effect5.eq(3).addEffect('zoomIn delay6', '<img src="/images/activity/closestool/p5-4.png">');
    },

    page6: function(){
      time6.eq(0).removeClass('hidden').siblings('img').addClass('hidden');
      effect6.eq(0).addEffect('zoomIn', '<img src="/images/activity/closestool/p6-3.png" width="67.5" height="63">', function(){
        time6.eq(1).removeClass('hidden').siblings('img').addClass('hidden');
      });
      effect6.eq(1).addEffect('zoomIn delay6', '<img src="/images/activity/closestool/p6-4.png" width="45" height="68">', function(){
        time6.eq(2).removeClass('hidden').siblings('img').addClass('hidden');
      });
      effect6.eq(2).addEffect('zoomIn delay4', '<img src="/images/activity/closestool/p6-5.png" width="69" height="55.5">');
      effect6.eq(3).addEffect('zoomIn delay8', '<img src="/images/activity/closestool/p6-2.png" width="100%">');
    },

    page7: function(){
      var effect7 = $('.s7.swiper-slide-active .effect');
      effect7.addEffect('swing');
    }
  }

  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    speed: 500,
    loop: true,
    onImagesReady: function(){
      $('.swiper-wrapper').show();
      effect1 = $('.s1.swiper-slide-active .effect');
      effect2 = $('.s2 .effect');
      effect3 = $('.p3-1, .p3-2, .p3-3');
      effect4 = $('ul.page4 li');
      effect5 = $('ul.page5 li');
      effect6 = $('ul.page6 li');
      time6 = $('.s6 .box-con .middle-content img');
      effect7 = $('.s7.swiper-slide-active .effect');
      setTimeout(function(){
        effections['page1']();
      }, 200)
    },
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      if(index === 0){
        effect1.trigger('slideEnd');
        effections['page7']();
      }else if(index === 1){
        effect2.trigger('slideEnd');
        effections['page1']();
      }else if(index === 2){
        effect1.trigger('slideEnd');
        effect3.trigger('slideEnd');
        effections['page2']();

      }else if(index === 3){
        effect2.trigger('slideEnd');
        effect4.trigger('slideEnd');
        effections['page3']();
      }else if(index === 4){
        effect3.trigger('slideEnd');
        effect5.trigger('slideEnd');
        effections['page4']();
      }else if(index === 5){
        effect4.trigger('slideEnd');
        effect6.trigger('slideEnd');
        time6.addClass('hidden');
        effections['page5']();
      }else if(index === 6){
        effect5.trigger('slideEnd');
        effections['page6']();
      }else if(index === 7){
        effect6.trigger('slideEnd');
        time6.addClass('hidden');
        effections['page7']();
      }else if(index === 8){
        effect7.trigger('slideEnd');
        effections['page1']();
      }
    }
  });

  $('#loading').remove();

  var numbersImg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'night'];
  var fnTimeCountDown = function(dur, o){
    var f = {
      zero: function(n){
        var n = parseInt(n, 10);
        if(n > 0){
          if(n <= 9){
            n = "0" + n;
          }
          return String(n);
        }else{
          return "00";
        }
      },
      dv: function(){
       var pms = {
          sec: "00",
          mini: "00",
          hour: "00",
          day: "00",
          month: "00",
          year: "0"
        };
        if(dur > 0){
          pms.sec = f.zero(dur % 60);
          pms.mini = Math.floor((dur / 60)) > 0? f.zero(Math.floor((dur / 60)) % 60) : "00";
          pms.hour = Math.floor((dur / 3600)) > 0? f.zero(Math.floor((dur / 3600)) % 24) : "00";
          pms.day = Math.floor((dur / 86400)) > 0? f.zero(Math.floor((dur / 86400)) % 30) : "00";
          //月份，以实际平均每月秒数计算
          pms.month = Math.floor((dur / 2629744)) > 0? f.zero(Math.floor((dur / 2629744)) % 12) : "00";
        }
        return pms;
      },
      ui: function(){
        var d = f.dv().day;
        var h = f.zero(parseInt(f.dv().hour) + 24 * parseInt(d) + '');
        var m = f.dv().mini;
        var s = f.dv().sec;
        var day = h > 99 ? '<em><b class="'+ numbersImg[h.substring(2,3)] +'"></b></em>' : '';
        $('li.times').html(
          '<em><b class="'+ numbersImg[h.substring(0,1)] +'"></b></em><em><b class="'+ numbersImg[h.substring(1,2)] +'"></b></em>'+ day +' 时' +
          ' <em><b class="'+ numbersImg[m.substring(0,1)] +'"></b></em><em><b class="'+ numbersImg[m.substring(1,2)] +'"></b></em> 分' +
          ' <em><b class="'+ numbersImg[s.substring(0,1)] +'"></b></em><em><b class="'+ numbersImg[s.substring(1,2)] +'"></b></em> 秒');

        dur--;

        if(dur > -1){
          setTimeout(f.ui, 1000);
        }

      }
    };
    f.ui();
  };


  //倒计时
  //第一个参数是系统返回的剩余秒数
  typeof timeRunningOut !== 'undefined' && fnTimeCountDown(timeRunningOut, {
    sec: $("#sec"),
    mini: $("#mini"),
    hour: $("#hour")
  });

  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none;"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '点击右上角的【分享按钮】<br>'+
    '分享到朋友圈 <br>' +
    '跟小伙伴嘚瑟一下！</p>'+
    '<i class="arrows"></i>'+
    '</div></div></div>';

  $('body').append(h)

  var mask = $('#mask'),
    dialog = $('#transmitDialog');
  $(".bt_transmit").on('click', function(e){
    alert('in');
    e.preventDefault();
    $('#share').html($(this).data('msg'));
    mask.show();
    dialog.show();
  });

  mask.on('click',function(e){
    mask.hide();
    dialog.hide();
  });
}