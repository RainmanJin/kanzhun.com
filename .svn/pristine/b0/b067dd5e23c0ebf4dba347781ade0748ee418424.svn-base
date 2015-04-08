$(function(){
  $('body').on('click', 'a.more_p_salaty', function(){
    var _this = $(this),
        more_page = _this.data('page');

    $.ajax({
      type: 'get',
      url: 'more.json',
      data: {
        page: more_page
      },
      success: function(ret) {
        if( ret.rescode == 1 ){
          $('div.result_wrap').append(ret.html);
          _this.remove();
        }
      }
    });
  })
});