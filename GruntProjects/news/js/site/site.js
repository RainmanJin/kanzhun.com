$(function (){

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

  var navele = $('#innernav'),
      nav = $('#innernav a'),
      con = $('#conbox'),
      conbox = $('#conbox li');

  function navclick(navs) {
    nav.removeClass('on');
    navs.addClass('on');
    var idx = navs.index();
    if($.support.css3Property('transition')){
      navs.parent().next('ul').css({'margin-left': -677 * idx + 'px'});
    }else{
      navs.parent().next('ul').animate({'margin-left': -677 * idx + 'px'}, 200);
    }
  }

  var arr = nav,
      indexss = 0;
  function switchi() {
    if(indexss == arr.length - 1){
      indexss = 0;
    }else {
      indexss = indexss + 1;
    }
    nav.removeClass('on');
    nav.eq(indexss).addClass('on');
    if($.support.css3Property('transition')){
      con.css({'margin-left': -677 * indexss + 'px'});
    }else{
      con.animate({'margin-left': -677 * indexss + 'px'}, 200);
    }
  };

 var timer = setInterval(switchi, 2000);

  nav.click(function(){
    var ins = $(this).index();
    indexss=ins;
    clearInterval(timer);
    navclick($(this)); 
    timer = setInterval(switchi, 2000);
  })
  
})