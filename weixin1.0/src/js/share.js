$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p style="font-size: 16px;">'+
    '选择【<em id="share"></em>】<br>'+
    '下载BOSS直聘</p>'+
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