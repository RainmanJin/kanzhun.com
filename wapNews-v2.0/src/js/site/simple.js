require.config({
  paths: {
    u: '../utils',
    s: '.'
  }
});
require(['s/module/slideMenu'], function(){
  $('#more').on('click', function(){
    var _this = $(this),
      loading = $('#newsLoading'),
      more = _this.parent();

    $.ajax({
      type: 'get',
      url: '/news/more.json',
      dataType: 'json',
      data: {
        page: _this.data('page')
      },
      beforeSend: function(){
        more.after('<p class="loading" id="newsLoading" style="display: block"><img src="/images/loading.gif" width="35">加载中...</p>').hide();
      },
      success: function(ret){

        if(ret){
          if (ret.more) {
            _this.data('page', ret.nextPage);
            more.show();
          }else {
            more.hide();
          }

          if(ret.html){
            $('#newsLoading').remove();
            $('#more_result').append(ret.html);
          }
        }else{
          $('#newsLoading').remove();
          more.show();
          alert('加载失败！');
        }
      },
      error: function(){
        $('#newsLoading').remove();
        more.show();
        alert('加载失败！');
      }
    });
  })
});

