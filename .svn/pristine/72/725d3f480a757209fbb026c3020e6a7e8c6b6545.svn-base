/*
点击飘字功能，一个参数：
@cfw jquery对象
@color 飘出文字的颜色
*/

define(function(){
  return function(options){
    var o = $.extend({}, {
      cfw: '',
      color: '#2582cf'
    }, options);

    var effect = $('<b style="color:' + o.color+ '">+1</b>');
    o.cfw.append(effect);
    effect.animate({'top': -50, 'opacity': 0, 'font-size': '40px'}, 400, function(){
      effect.remove();
    });
  }
});