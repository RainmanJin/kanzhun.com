define(function(){
  $(function(){
    //头部下拉
    $('dl.po_other').on('click', 'dt', function(e){
      e.preventDefault();
      e.stopPropagation();

      $(this).next('dd').removeClass('none');
      $(this).find('i').addClass('rotate_jiao');
      $(document).trigger('click').one('click', function () {
        $('dl.po_other dd').addClass('none');
        $('dl.po_other dt i').removeClass('rotate_jiao');
      });
    });

  });
});