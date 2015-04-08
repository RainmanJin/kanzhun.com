$(function (){

  /*$.support.css3Property = function(prop){
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

 var timer = setInterval(switchi, 10000);

  nav.click(function(){
    var ins = $(this).index();
    indexss=ins;
    clearInterval(timer);
    navclick($(this)); 
    timer = setInterval(switchi, 10000);
  })*/

  var slid = $('ul.slide_box li'),
      controls = $('ul.bx-controls a');
  slid.addClass('none');
  slid.eq(0).removeClass('none');

  var slideindex = 0;
  function switchi() {
    if(slideindex == slid.length - 1){
      slideindex = 0;
    }else {
      slideindex = slideindex + 1;
    }
    slid.addClass('none');
    slid.eq(slideindex).removeClass('none');
    controls.removeClass('actives')
    controls.eq(slideindex).addClass('actives');
  }
  var timer = setInterval(switchi, 3000);

 function options(indexs) {
    slid.addClass('none');
    slid.eq(indexs).removeClass('none');
    controls.removeClass('actives')
    controls.eq(indexs).addClass('actives');
  }

  $('a.options').click(function() {
    var drec = $(this).data('drec');
    if(drec == 'pre') {
      if(slideindex == 0) {
        slideindex = 3;
      }else {
        slideindex = slideindex - 1;
      }
    }else {
      if(slideindex == 3) {
        slideindex = 0;
      }else {
        slideindex = slideindex + 1;
      }
    }
    clearInterval(timer);
    options(slideindex);
    timer = setInterval(switchi, 3000);
  });

  $('ul.bx-controls li').hover(function(){
    slideindex = $(this).index();
    clearInterval(timer);
    options(slideindex);
  },function(){
    timer = setInterval(switchi, 3000);
  })
})