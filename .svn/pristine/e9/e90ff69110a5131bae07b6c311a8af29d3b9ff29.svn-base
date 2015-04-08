define(['c/widgets'], function(){
  $(function(){
    //底部链接
    function triangles(tags){
      if(tags.height() <= 22){
        $(tags).find('aside').addClass('none');
      }else {
        tags.addClass('hiddens');
      }
    };

    triangles($('div.navcon_one'));  
    triangles($('div.navcon_two'));  
    triangles($('div.navcon_three'));  
    triangles($('div.navcon_four'));

    $('.navs .navscon:gt(0)').addClass('none');
    $('.navstt a').hover(function(){
      var aindex = $(this).index();
      var conindex = $('.navs .navscon');
      conindex.addClass('none');
      conindex.eq(aindex).removeClass('none');
      /*triangles(conindex.eq(aindex));*/
      if ($.support.css3Property('transition')) {
        $(this).parent().css({'background-position': 73 * aindex + 'px bottom'});
      } else {
        $(this).parent().css({'backgroundPositionX': 73 * aindex + 'px'},100);
        //alert($(this).parent().css("background-position-x"));
      }
    });

    triangles($('div.companyconss'));
    triangles($('div.companycons'));

    $('.companycon aside').click(function(){
      var cons = $(this).parent();

      if(cons.height() <= 22){
        cons.removeClass('hiddens');
        if ($.support.css3Property('transition')) {
          $(this).find('span').addClass('transforms');
        }
      }else {
        cons.addClass('hiddens');
        if ($.support.css3Property('transition')) {
          $(this).find('span').removeClass('transforms');
        }
      }
    });  
  });
});