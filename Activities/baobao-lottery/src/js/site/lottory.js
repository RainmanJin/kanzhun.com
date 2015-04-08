require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});

require(['u/wx-share', 'u/tabs', 'u/autocomplete', 'u/picker.date', 'u/maskui'], function(wxShare){
  $(function(){
    $('dl.rank').tabs({
      tabSelector: 'dt>span',
      tabPanel: 'dd>ul'
    });

    var dialog = $('section.enter-co');
    $('#ourCo').on('click', function(){
      dialog.show();
    });

    $('#close-d').on('click', function(){
      dialog.hide();
    });



    ///公司 autocomplete
    $('#coSuggest').autocomplete({
      serviceUrl: '/activity/bsalary/companyList.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.companyJson||[], function (dataItem) {
            return { value: dataItem.name, data: dataItem.salaryCount, id: dataItem.id};
          })
        };
      },
      preserveInput: true,
      maxHeight: 'auto',
      appendTo: $('div.co-suggestions'),
      width: '100%',
      onSelect: function (suggestion) {
        $('#coForm').submit();
      }
    });


    var co = $('input[name=name]');
    $('#searchCo').on('click', function(){
      if($.trim(co.val()) === ''){
        co.addClass('shine').one('animationEnd webkitAnimationEnd', function(){
          co.removeClass('shine');
        });
      }else{
        $('#coForm').submit();
      }
    });


    var upOrDown = $('i.i_up, i.i_down');
    upOrDown.on('click', function(){
      var $this = $(this);
      if($this.hasClass('masked')){
        return;
      }

      var howMany = $this.siblings('em');
      $.get('/activity/holiday/support.json?id=' + encodeURIComponent($('input[name=id]').val()) + '&up=' + $this.data('i'), function(ret){
        if(ret){
          if(ret.rescode == 1){
            upOrDown.addClass('masked');
            howMany.html(ret.count).addClass('bounceIn animated').one('animationEnd webkitAnimationEnd', function(){
              howMany.removeClass('bounceIn animated');
            });
          }else{
            alert(ret.resmsg || '提交失败！');
          }
        }else{
          alert(ret.resmsg || '提交失败！');
        }
      });
    });


    //
    var holidayDialog = $('#holidayDialog');
    var holidayDateDialog = $('#holidayDateDialog');

    $('#holidayDate').on('click', function(){
      $.maskUI.open({
        elem: holidayDateDialog,
        overlayClick: true
      })
    });

//    holidayDialog.on('click', 'a.red-btn, a.green-btn', function(){
//      $.maskUI.open({
//        elem: holidayDateDialog,
//        overlayClick: true
//      })
//    });

    jQuery.extend( jQuery.fn.pickadate.defaults, {
      monthsFull: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
      monthsShort: [ '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二' ],
      weekdaysFull: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
      weekdaysShort: [ '日', '一', '二', '三', '四', '五', '六' ],
      today: '今日',
      clear: '删',
      firstDay: 1,
      format: 'yyyy-mm-dd',
      formatSubmit: 'yyyy/mm/dd',
      close: '关闭'
    });





    var first = $('input[name=first]');
    var last = $('input[name=last]');
    var start = first.pickadate({
      formatSubmit: 'yyyy/mm/dd',
      min: [2015, 0, 10],
      max: [2015, 3, 1],
      container: '#holidayDateFrame'
    });

    var end = last.pickadate({
      formatSubmit: 'yyyy/mm/dd',
      min: [2015, 0, 10],
      max: [2015, 3, 1],
      container: '#holidayDateFrame'
    });

    var startPicker = start.pickadate('picker');
    var endPicker = end.pickadate('picker');

    startPicker.on({
      open: function(){
        var e = endPicker.get('value');
        var arr = [];
        if(e){
          arr = e.split('-');
          arr[1] = arr[1] - 1;
          startPicker.set('max', arr)
        }
      }
    });

    endPicker.on({
      open: function(){
        var s = startPicker.get('value');
        var arr = [];
        if(s){
          arr = s.split('-');
          arr[1] = arr[1] - 1;
          endPicker.set('min', arr)
        }
      }
    });

    var shareMsg = ['放这么多天假，<br/>你还不赶紧秀一下！', '你和81%的人亿元nag，<br/>转一发求共鸣吧！', '我擦勒，春节加班，<br/>转一发寻找其他加班狗！'];
    var wxShareMsg = ['我们公司放假好多天，好无聊喔！', '我不想和春节多放假的人做朋友了！', '我已升任资深春节加班狗，告诉我我不是一个人！'];
    var share = wxShare(null, '');

    shareCallback = function(){
      share.close();
    }

    $('#sendDate').on('click', function(){
      if(first.val() == '' || last.val() == ''){
        alert('请选择放假时间！');
        return;
      }else{
        $.ajax({
          url: '/activity/holiday/add.json',
          type: 'post',
          data: {
            first: first.val(),
            last: last.val(),
            id: $('input[name=id]').val()
          },
          dataType: 'json',
          success: function(ret){
            if(ret && ret.day && ret.userday){
              $('#yourDays').html('放假<strong>'+ ret.userday +'</strong>天！')
              $.maskUI.close();
              if(ret.day > 7){
                share.open(shareMsg[0]);
                shareTitle = descContent = document.title = wxShareMsg[0];
              }else if(ret.day == 7){
                share.open(shareMsg[1]);
                shareTitle = descContent = document.title = wxShareMsg[1];
              }else{
                share.open(shareMsg[2]);
                shareTitle = descContent = document.title = wxShareMsg[2];
              }
            }
          }
        })
      }
    });

  });

  //barrage
  var w = $(window).width(),
    speed = 15,
    loadScreen = 0,
    str = [];

  var loadBarrage = function(){
    $.ajax({
      type: 'get',
      url: '/activity/danmu/more.json',
      data: {
        lastId: loadScreen,
        originType: 2
      },
      dataType: 'json',
      success: function(ret){
        if(ret && ret.html){
          $('div.barrage div').append('<p>' + ret.html + '</p>');
          var barrage = $('div.barrage div p');
          aw = Math.floor(barrage.width()) + w;

          $.keyframe.define([{
            name: 'barrage',
            '0%': {
              'transform': 'translate3d(0,0,0)'
            },
            '100%': {
              'transform': 'translate3d('+ (-1*aw +'px') +',0,0)'
            }
          }]);


          barrage.playKeyframe({
            name: 'barrage',
            duration: aw * speed/1000 + "s",
            timingFunction: 'linear',
            delay: 0,
            iterationCount: '1',
            direction: 'normal',
            fillMode: 'forwards'
          }, function(){
            barrage.remove();
            loadScreen = ret.lastId;
            setTimeout(function(){
              loadBarrage()
            }, 3000)
          });

          //关闭弹幕
          $('a.barrage_option').on('click', function(){
            if(!barrage.is(':animated')){
              $('div.only_bg').fadeOut();
              $('#onlyHeight').fadeOut();
              $.writeCookie('barrage', '1');
            }
          })

        }
      }
    })
  };

  $('body').append('<div style="height: 50px;" id="onlyHeight"></div><div class="only_bg clearfix"></div>');
  $('div.only_bg').prepend('<a ka="barrage-close" href="javascript:;" rel="nofollow" class="barrage_option"></a><div class="barrage"><div></div></div>')
  setTimeout(function(){
    loadBarrage();
  }, 500);

  var shoot = $('div.shoot');
  var shootTxt = $('input', shoot);
  var p = $('p',shoot);
  shoot.on('click', 'img', function(){
    if(!p.is(':hidden')){
      var val = shootTxt.val();
      if($.trim(val) === ''){
        p.hide();
        shoot.css('width', '61');
      }else{
        $.ajax({
          type:'post',
          url: '/activity/danmu/store.json',
          data:{
            content: '@' + $('input[name=companyName]').val() + '：' + val,
            originType: 2,
            topicId: $('input[name=id]').val()
          },
          success: function(ret){
            if(ret && ret.rescode == 1){
              p.hide();
            }else{
              alert('发射失败！');
            }

          }
        });
      }
    }else{
      p.show();
      shootTxt.focus();
      shoot.css('width', '100%');
    }
  });

  //滚动加载更多
  $(function(){
    $(window).scrollTop(0);
    function more(){
      var timer;
      $(window).on("scroll",function(){
        //loadMore();
        //延时处理可以去掉
        if(timer){
          clearTimeout(timer);
          timer=null;
        }
        timer=setTimeout(function(){
          loadMore();
        },200);
      });
      function loadMore(){
        var oResult=$(".js_more_result:visible");
        var page=oResult.data('page')||2;
        var	more=oResult.data("more");
        var oMore=oResult.siblings('.sr_more');
        if(more!==''&&!more){
          return;
        }

        var wH=$(window).height();
        var sT=$(window).scrollTop();
        var sH=$(document).height();
        var isAjax=0;
        if(wH+sT>=sH){
          if(isAjax){
            return;
          }
          isAjax=1;
          $.ajax({
            url:oResult.data("url")+page,
            dataType:"json",
            beforeSend:function(){
              oMore.show();
            },
            success:function(result){
              oMore.hide();
              oResult.append(result.html);
              //more=result.more;
              //page=result.nextPage;
              oResult.data('page',result.nextPage);
              oResult.data('more',result.more);
              isAjax=0;
            },
            error:function(){
              isAjax=0;
            }
          });
        }
      }
    }
    more($(".js_more_result:eq(0)"));
  });

});