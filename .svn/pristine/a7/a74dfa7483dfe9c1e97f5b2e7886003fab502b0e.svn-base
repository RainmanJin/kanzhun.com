define(function(){
  $(function(){
    $('aside.slide-wrapper').on('touchstart', 'li', function(e){
      $(this).addClass('current').siblings('li').removeClass('current');
    });

    $('a.slide-menu').on('click', function(e){
      var wh = $('div.wrapper').height();
      $('div.slide-mask').css('height', wh).show();
      $('aside.slide-wrapper').css('height', wh).addClass('moved');
    });

    $('div.slide-mask').on('click', function(){
      $('div.slide-mask').hide();
      $('aside.slide-wrapper').removeClass('moved');
    });

    //back
    $('header>strong.channel').on('click', function(){
      if(document.referrer.length>0){
        history.back();
      }else{
        location.href="/news";
      }
    });
  });
});