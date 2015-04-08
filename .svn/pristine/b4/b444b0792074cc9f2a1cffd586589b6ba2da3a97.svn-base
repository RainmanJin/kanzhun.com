$(function() {
  $.support.css3Property = function(prop){
    var div = document.createElement('div'),
      vendors = ['Webkit', 'Moz', 'O', 'Ms'],
      len = vendors.length;
    if(prop in div.style){
      return true;
    }

    prop = prop.replace(/^[a-z]/, function(str){
      return str.toUpperCase();
    });
    while(len--){
      if(vendors[len] + prop in div.style){
        return true;
      }
    }
    return false;
  };

  var isSupportTran = $.support.css3Property('transition'),
    s1 = $('img.s1_ss'),
    s2L = $('img.s2_ss_l'),
    s2W = $('div.s2_w img'),
    s2R = $('img.s2_ss_r'),
    s3L = $('img.s3_ss_l'),
    s3R = $('img.s3_ss_r'),
    s3W = $('div.s3_w img');
  $.fn.optimizedAnimation = function(o){
    if(isSupportTran){
      $(this).css(o);
    }else{
      $(this).animate(o, {'easing': 'easeOutSine', 'duration': 1000});
    }
  }

  $('#fullpage').fullpage({
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage'],
    sectionsColor: ['#fffff', '#edf0f4', '#ffffff', '#edf0f4'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: [],
    css3: true,

    afterLoad: function(anchorLink, index){
      //console.log(index + ' now')
      if(index==1){
        changeBanner();
      }else{
        clearInterval(bannerInterId);
      }

      if(index==1){
        s1.optimizedAnimation({'bottom': '30%', 'opacity': '1'});
      }
      if(index == 2){
        s2L.optimizedAnimation({'right': '51%', 'opacity': '1'});
        s2R.optimizedAnimation({'left': '51%', 'opacity': '1'});
//        s2W.delay(1200).optimizedAnimation({'margin-top': '3%', 'opacity': '1'});
          s2W.addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('pulse animated');
          });
        return false;
      }

      if(index == 3){
        
        s3L.optimizedAnimation({'right': '51%', 'opacity': '1'});
        s3R.optimizedAnimation({'left': '51%', 'opacity': '1'});
          s3W.addClass('pulse animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('pulse animated');
          });

        return false;
      }

      if(index === 4){
        setTimeout(function(){
          $('p.s4_img').addClass('swing animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('swing animated');
          });
        }, 400);
      }
    },

    'onLeave': function(index, nextIndex, direction){
      //console.log(index + ' leave')
      if(index === 1){
        s1.optimizedAnimation({'bottom': '-50%', 'opacity': '0'});
        return false;
      }
      if(index === 2 && nextIndex === 1){
        //s1.optimizedAnimation({'bottom': '30%', 'opacity': '1'});
        return false;
      }
    }
  });

  s1.optimizedAnimation({'bottom': '30%', 'opacity': '1'});

  //第一屏banner切换
  var bannerInterId;

  function changeBanner(){
    var section1=$("#section1");
    var li_arr=$(".li",section1);
    var index=0;
    bannerInterId=setInterval(function(){
      if(index>=li_arr.length){
        index=0;
      }
      var next=1;
      if(index+1==li_arr.length){
        next=0;
      }else{
        next=index+1;
      }
      $(li_arr[index]).fadeOut(1000);
      $(li_arr[next]).fadeIn(1000);
      index++;
    },5000);
  }
  changeBanner();
  
});