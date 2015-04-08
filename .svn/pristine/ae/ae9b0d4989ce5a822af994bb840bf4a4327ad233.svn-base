define(function(){
  $(function(){
    $('#classifyNav').on('click', 'dt', function(e){
      e.stopPropagation();
      $(this).next('dd').toggleClass('none');

      $(document).one('click', function(){
        $('#classifyNav dd').addClass('none');
      });
    }).on('click', 'dd', function(e){
      e.stopPropagation();
    });
  });
});