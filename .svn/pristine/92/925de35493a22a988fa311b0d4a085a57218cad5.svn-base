define(function(){
  $(function(){   
    //back to top
    $(window).scroll(function () {
      if (Math.max($("html,body").scrollTop(), $(document).scrollTop()) > 200) {
        $("#quick a:first").css('display','block').fadeIn(300);
      } else {
        $("#quick a:first").hide();
      }
    });

    $("#quick .back").click(function () {
      $("html,body").animate({scrollTop: 0}, 200);
    });
    /*
    $.maskUI.config = {
      wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>',
      alert: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><p>{0}</p><p><a href="javascript:;" class="btn_grey_s maskuiclose">{1}</a></p></div></div></section>',
      confirm: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a><div class="dialog_alert"><div class="{1}">{0}</div><p><a href="javascript:;" class="btn_grey_s confirm_ok">确定</a><a href="javascript:;" class="btn_grey_s maskuiclose ml20">取消</a></p></div></div></section>'
    };
    */
    //判断是否能继续发职位
    $(".js_createJob").on("click",function(){
      var _this=$(this);
      var href=_this.data("href");
      $.ajax({
        url:"/job/canCreate.json",
        dataType:"json",
        success:function(result){
          if(result.rescode==1){
            if(result.can){
              location.href=href;
            }else{
              $.maskUI.alert("您已有10个有效职位，已达到上限！");
            }
          }
        }
      });
    });

    //微博分享
    $(".js_sinaShare").on("click", function() {
      var title = $(this).data("share-word");
      var url = $(this).data("share-url");
      var pic = $(this).data("share-image");
      var href = "http://v.t.sina.com.cn/share/share.php?title=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url) + "&pic=" + encodeURIComponent(pic);
      window.open(href);
    });

    //文字引导（提醒用户必须设置个人信息和公司信息才可以获得其他权限）
    if( $('#writingGuide').length > 0 ) {
      var selfVal = $.trim($('#writingGuide').val());
      if( selfVal !== '' ) {
        $.maskUI.alert(selfVal);
      }
    }
  });
});