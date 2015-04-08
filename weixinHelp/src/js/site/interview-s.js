$(function(){
  $('#interviewAc').on('keyup', function(){
    var _this = $(this),
      loading = $('#ISLoading');
    $.ajax({
      type: 'get',
      url: '/zs/gs/select.json',
      data: {
        q: _this.val(),
        page: 1
      },
      dataType: 'json',
      beforeSend: function(){
        loading.show();
      },
      success: function(data){
        loading.hide();
        if(data && data.html){
          $('section.co-search').html('<h2 class="sr_tt">公司列表</h2><ul class="sr_list" id="more_result" style="background-color: #fff;" data-more="true" data-url="/zs/gs/select.json?q='+
             _this.val() +'&page=">'+ data.html +'</ul><p class="sr_more" id="more"  style="display:none">加载中...</p>');
        }else{
          $('section.co-search').html('<div class="co-noret"><p class="f16"><img src="/images/weixin/sorry.jpg" width="20" alt=""/>抱歉，没有找到该公司！</p></div>');
        }
      }
    });
  });
});