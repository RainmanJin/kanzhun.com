/*
展开关闭功能，三个参数：
@el jquery对象
@on 展开时的回调
@off 关闭时的回调
@text 是否有文案
*/

define(function(){
  return function(options){
    var o = $.extend({}, {
      el: '',
      classname: 'active',
      text: ['收起', '展开'],
      on: null,
      off: null
    }, options);

    o.el.length && o.el.on('click', function(){
      var $this = $(this);
      if(!$this.hasClass(o.classname)){
        $this.addClass(o.classname);
        o.text && $this.html(o.text[0] + '<i></i>');
        if(o.on){
          o.on.call($this);
        }
      }else{
        $this.removeClass(o.classname);
        o.text && $this.html(o.text[1] + '<i></i>');
        if(o.off){
          o.off.call($this);
        }
      }
    });
  }
});