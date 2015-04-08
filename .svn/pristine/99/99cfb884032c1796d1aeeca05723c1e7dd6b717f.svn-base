$(function(){
  var h='<section class="share">'+
        '<div class="mask"></div>'+
        '<div class="wapper">'+
          '<div class="inner">'+
            '<i class="share_icon"></i>'+
            '<p class="t">有用 <span class="green">+1</span></p>'+
            '<p>感谢您的参与</p>'+
            '<p><span class="orange">点击右上角</span>，立即分享给好友</p>'
          '</div>'+
        '</div>'+
      '</section>';
  $('body').append(h)

  var dialog = $('section.share'),
      mask=$(".mask",dialog);
  $("body").on('click','.bt_transmit', function(e){
    e.preventDefault();
    dialog.show();
  });
  mask.on('click',function(e){
    dialog.hide();
  });
});  