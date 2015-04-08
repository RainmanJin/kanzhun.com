define(['c/mini_search'],function(){
  $(function(){
    //头部下拉
    $('dl.po_other').on('click', 'dt', function(e){
      e.preventDefault();
      e.stopPropagation();

      $(document).one('click', function () {
        $('dl.po_other dd').addClass('none');
        $('dl.po_other dt i').removeClass('rotate_jiao');
      });

      $(this).next('dd').toggleClass('none').end().find('i').toggleClass('rotate_jiao');

    }).on('click', 'dd', function(e){
      e.stopPropagation();
    });

    //导航固定
    var fixedCoNav = $('#fixedCoNav');
    var f_n_s = setTimeout(function(){
      var navPos = fixedCoNav.offset().top;
      $(window).on('scroll', function(){
        var st = $(document).scrollTop();
        if(st > navPos){
          fixedCoNav.addClass('fixed_nav');
        }else{
          fixedCoNav.removeClass('fixed_nav');
        }
      });
    }, 1000);
    
  });
});