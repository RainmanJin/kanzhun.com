$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none;"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '点击右上角的【分享按钮】<br>'+
    '分享到朋友圈 <br>' +
    '跟小伙伴嘚瑟一下！</p>'+
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

