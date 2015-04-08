$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '点击右上角的【<em id="share"></em>】<br>'+
    '拉上小伙伴帮忙抢彩票！</p>'+
    '<p class="mt20 pt10 f16">分享成功后，点这里<a href="javascript:window.location.reload();" class="orange" style="text-decoration:underline;">查看我的彩票</a><p>'+
    '<i class="arrows"></i>'+
    '</div></div></div>';

  $('body').append(h)

  var mask = $('#mask'),
      dialog = $('#transmitDialog');
  $(".bt_transmit").on('click', function(e){
    e.preventDefault();
    $('#share').html($(this).data('msg'));
    mask.show();
    dialog.show();
  });

  mask.on('click',function(e){
    mask.hide();
    dialog.hide();
  });
});