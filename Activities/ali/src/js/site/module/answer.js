define(function(){
  return function(options){
    var o = $.extend({},{
      questions: null,
      prev: null,
      answers: 'a',
      ratio: '0.17',
      items: 'li',
      selectCallback: null
    }, options);

    var w = o.questions.width(); //屏幕宽度
    var len = $(o.items, o.questions).length;

    var moving = function(index){
//      console.log(index)
      if(index === -1){
        o.prev.hide();
      }else{
        o.prev.show();
      }

      o.questions.css('left', (index + 1) * o.ratio * w * -1).data('num', index);

      if(o.selectCallback){
        o.selectCallback(index + 2);
      }
    }

    o.questions.on('click', o.answers, function(){
      var _this = $(this);
      _this.addClass('sel').siblings('button').removeClass('sel');
      _this.parent().find('input[type=hidden]').val(_this.val());
      var index = _this.parent().parent().index();

      if(index === len -1){
        if(o.submit){
          o.submit();
        }
        return;
      }

      moving(index);
    });

    o.prev.on('click', function(){
      moving(parseInt(o.questions.data('num')) - 1);
    });
  };
});