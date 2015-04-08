/*
  这个用来处理m端，点赞功能
  $.markIt({
   propagation: $('body'), //事件冒泡的位置,默认事件绑定在body
   delegate: 'li.useful', //触发事件的element
   count: 'em', //显示数目的elment
   markClass: '', //未点赞的class
   markedClass: '', //点赞后的class
   url: '', //ajax url
   data: {}, 参数，可传对象或function(function的this指向delegate)
   prompt: window.alert, //错误提示
   callback: null //mark成功后的callback
  })
 */

(function (factory) {
  if (typeof define === 'function' && define.amd){
    define(factory); // AMD support for RequireJS etc.
  }else{
    factory();
  }
}(function() {
  $.markIt = function(options){
      var o = $.extend({
        propagation: $('body'),
        delegate: '',
        count: '',
        url: '',
        data: {},
        markClass: 'i-mark',
        markedClass: 'i-marked',
        prompt: null,
        callback: null
      }, options);

      o.propagation.on('click', o.delegate, function(){
        var that = this;
        var icon = $('.' + o.markClass, this);
        if(icon.length === 0){
          return;
        }
        icon.addClass(o.markedClass).removeClass(o.markClass);
        $.ajax({
          type: 'get',
          url: o.url,
          cache: false,
          data: $.isPlainObject(o.data) ? o.data : o.data.call(that),
          dataType: 'json',
          success: function(data){
            if(data){
              if(data.rescode == 1){
                var count = $(o.count, $(that));
                count.html(parseInt(count.html()) + 1);

                if(o.callback){
                  o.callback.call(that);
                }
              }else{
                icon.addClass(o.markClass).removeClass(o.markedClass);
                (o.prompt ? o.prompt : alert)(data.resmsg || '系统错误，请重试！');
              }
            }
          },
          error: function(){
            icon.addClass(o.markClass).removeClass(o.markedClass);
            (o.prompt ? o.prompt : alert)('请求失败，请重试！');
          }
        });
      });
    }
}));