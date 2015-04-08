define(function(){
  return function(target, msg, callback){
    $('body').append(
      '<div class="mask" id="wxMask">'+
      '<div class="transmitDialog" id="transmitDialog"><p>' +
      msg +
      '</p><i class="arrows"></i></div></div>');

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
      callback(mask, dialog);
    }
  }
});