$(function(){
  $('footer#js-footer a').click(function(){
    var old = [$('i.istroll'), $('i.ichat'), $('i.ime')];
    $.each(old, function(k, v){
      var classs = v.data('msg') + '_h';
      $(v).removeClass(classs);

    })
    
    var msg = $(this).find('i').data('msg') + '_h';
    $(this).find('i').addClass(msg);
  });

  $('ul#js-nav li').click(function(){
    var mian = $(this);
    var index = mian.index();
    var footer1 = $('footer.forword');
    var footer2 = $('footer#js-footer');
    $('ul#js-nav li a').removeClass('current');
    $(this).find('a').addClass('current');
    if(index !== 0){
      footer1.css('bottom', '-999px');
      footer2.css('bottom', 0);
    }else {
      footer1.css('bottom', 0);
      footer2.css('bottom', '-999px');
    }
    $('section.tabcon').addClass('none');
    $('section.tabcon').eq(index).removeClass('none');
  });

  var probablyH = $('div.r_inner').height(),
      wH = $(window).height();
      $('div.box_con_wrap').css({'height': wH - probablyH - 20});

  $('ul.r_nav li').click(function(){
    var self = $(this),
        index = self.index(),
        nav = $('ul.r_nav li').find('a').find('i'),
        obj = self.find('a').find('i');

    $.each(nav, function(k, v) {
       var rclass = $(v).data('green');
       $(v).attr('class', 'iinit ' + rclass);
    });

    obj.attr('class', 'iinit ' + obj.data('green') + '_c');
    $('ul.r_nav li').find('a').removeClass('current');
    self.find('a').addClass('current').find('i').addClass('irecruitment_c');
    var box_con = self.parent('ul').parent('div.r_inner').next('div.box_con_wrap').find('section');
    box_con.addClass('none');
    box_con.eq(index).removeClass('none');
  });
  
})