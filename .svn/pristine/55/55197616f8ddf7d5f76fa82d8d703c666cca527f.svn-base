define(function(){
  return function(options){
    var o = $.extend({},{
      propagation: null,
      delegte: ''
    }, options);

    function scrollingNum(){
      var n = parseInt(this.html()) + 1;
      var _this = this.html(this.html().replace(/(\d)/g, '<i>$1</i>'));

      $.each(String(n).split(''), function(i, v){
        var y = -1 * v * 14; //y轴位置
        $('i',_this).eq(i).html('').animate({'background-position-y': y}, 400);
      });
    }

    var leftCount = $('#leftCount');

    var voteFn = function(callback){
      if(leftCount.length && parseInt(leftCount.html()) === 0){
        alert('今日已经没有投票机会了，\n每日3次投票机会，请您明日再来！');
        return;
      }

      var _this = $(this);
      if(_this.hasClass('voted')){
        return;
      }
      var button = _this.find('button');

      if (window._T) {
        _T.sendEvent('activity-ali-vote');
      }
      $.getJSON('/activity/ali/vote.json', {id: button.data('vid')}, function(ret){
        if(ret){
          if(ret.rescode == 1){
            scrollingNum.call(_this.addClass('voted').find('p'));
            button.html('已投票');
            //leftCount.html(parseInt(leftCount.html()) - 1);
            leftCount.html(ret.leftCount);
            if(callback){
              callback();
            }

          }else{
            alert('投票失败！');
          }
        }else{
          alert('投票失败！');
        }
      });
    };
    o.propagation.on('click', o.delegate, function(e){
      e.stopPropagation();
      e.preventDefault();
      voteFn.call(this, function(){
        $('#voteAlias').html('<em>|</em>已投票');
      });
    });

    $('#voteAlias').on('click', function(e){
      voteFn.call(document.querySelector('#voteOrigin'), function(){
        $('#voteAlias').html('<em>|</em>已投票');
      });
    });
  };
});