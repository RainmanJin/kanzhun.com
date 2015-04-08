define(function(){
  return function(target, msg,ua_type,callback){
    var wxHtml='<div class="mask" id="wxMask">'+
      '<div class="transmitDialog" id="transmitDialog"><p>' +
      msg +
      '</p><i class="arrows"></i></div></div>';
    var browserHtml='<div class="mask" id="wxMask">'+
      '<div class="transmitDialog" id="transmitDialog">'+
        '<p class="t-center"><i class="share_font"></i></p>'+
        '<i class="arrow_down"></i>'+
      '</div>'+
    '</div>';
    var h=wxHtml;
    if(ua_type=='browser'){
      h=browserHtml;
    }
    $('body').append(h);

    var mask = $('#wxMask'),
      dialog = $('#transmitDialog');

    target.on('click', function(e){
      e.preventDefault();
      mask.show();
      dialog.show();
    });

    mask.on('click',function(e){
      mask.hide();
      dialog.hide();
    });

    if(callback){
      callback();
    }
  }
});