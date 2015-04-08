$(function(){
  //var img_path='images/';
  var img_path='/images/activity/enterprise/';
  var surveyList = [
    {
      prog: '1',
      ques: '30之于月，相当于52之于？',
      answ: {
        a: {msg: '分', derect: '2',score:0,val:'0'},
        b: {msg: '周', derect: '2',score:0,val:'0'},
        c: {msg: '年', derect: '2',score:10,val:'1'}
      } 
    },
    {
      prog: '2',
      ques: '连续扔10次硬币，每一次都是正面朝上，如果一切情况不变，第11次扔，正面朝上的几率是多少？',
      answ: {
        a: {msg: '100%', derect: '3',score:0,val:'0'},
        b: {msg: '50%', derect: '3',score:10,val:'1'},
        c: {msg: '0', derect: '3',score:0,val:'0'}
      }
    },   
    {
      prog: '3',
      ques: '你在跑步比赛中超过了第二名，你是第几名？ ',
      answ: {
        a: {msg: '第三名', derect: '4',score:0,val:'0'},
        b: {msg: '第二名', derect: '4',score:10,val:'1'},
        c: {msg: '第一名', derect: '4',score:0,val:'0'}
      }
    },  
    {
      prog: '4',
      ques: '请问图片一共有几个正方形？',
      answ: {
        a: {msg: '38', derect: '5',score:0,val:'0'},
        b: {msg: '40', derect: '5',score:10,val:'1'},
        c: {msg: '41', derect: '5',score:0,val:'0'},
      }
    },
    {
      prog: '5',
      ques: '这个广告想要告诉我们什么？',
      answ: {
        a: {msg: '车窗设计好', derect: '6',score:0,val:'0'},
        b: {msg: '车内空间大', derect: '6',score:10,val:'1'},
        c: {msg: '安全稳定性高', derect: '6',score:0,val:'0'}
      }
    },
    {
      prog: '6',
      ques: '因为太阳一直照常升起，所以明天太阳还会照常升起。以下哪项与上述推理逻辑不一致？',
      answ: {
        a: {msg: '巧妇难为无米之炊', derect: '7',score:10,val:'1'},
        b: {msg: '冬天来了，春天还会远吗？', derect: '7',score:0,val:'0'},
        c: {msg: '从来没有人躲得过他的飞刀，你别去送死了', derect: '7',score:0,val:'0'}
      }
    },     
    {
      prog: '7',
      ques: 'AB中，一人为骑士（只说真话），一人为小偷（只说假话），C为间谍（说话可真可假），如图，C被问“B是间谍吗？”，他应该怎样回答才不会暴露身份？',
      answ: {
        a: {msg: '说假话', derect: '8',score:0,val:'0'},
        b: {msg: '说真话', derect: '8',score:15,val:'1'},
        c: {msg: '怎么说都会被发现', derect: '8',score:0,val:'0'}
      }
    },
    {
      prog: '8',
      ques: '3个人3天喝3桶水，9个人9天喝多少桶水？',
      answ: {
        a: {msg: '9桶', derect: '9',score:0,val:'0'},
        b: {msg: '27桶', derect: '9',score:10,val:'1'},
        c: {msg: '81桶', derect: '9',score:0,val:'0'}
      }
    },
    {
      prog: '9',
      ques: '一个人7元钱买了一只兔子，8元钱卖了，又9元钱买回来，10元钱卖掉。请问他是赔是赚？',
      answ: {
        a: {msg: '赚了1元', derect: '/activity/enterprise/result/',score:0,val:'0'},
        b: {msg: '赚了2元', derect: '/activity/enterprise/result/',score:15,val:'1'},
        c: {msg: '不赔不赚', derect: '/activity/enterprise/result/',score:0,val:'0'}
      }
    } 
  ];

  var answers = $('#answersList'),
    questions = $('#questions'),
    prog = 1,
    all_score = 0;//记录分数
  var aChoose=[];
  var requestTime='';
  var survey = {
    init: function(){
      var that = this;

      this.ask(1);

      answers.on('click', 'li', function(){
        var num = $(this).data('forward');
        all_score += parseInt($(this).data('score'));
        aChoose.push($(this).data('val'));
        questions.addClass("animated fadeInRight").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass("animated fadeInRight");
        });

        if(num){
          that.ask(num);
        }
      });
      answers.on('touchstart', 'a', function(){
        var _this = $(this);
        _this.parent().addClass('on').siblings().removeClass('on');
      });      
    },
    ask: function(num){
      var o = surveyList[parseInt(num) - 1];
      var arr = [];
      var len=surveyList.length;
      questions.html('<i>'+prog+'/'+len+'</i>'+ o.ques);
      prog ++ ;
      $.each(o.answ, function(i, v){
        var index = v.derect;
        var score = v.score;
        var val= v.val;
        var ka="thework-button";
        if(/^\d+$/.test(index)){
          arr.push('<li data-forward="'+ index +'" data-score="'+score+'" data-val="'+val+'"><a ka="thework-button-'+i+'" href="javascript:;"><i></i><span>'+ v.msg +'</span></a></li>');
        }else{
          var choose=aChoose.join(',')+','+val;
          var time=requestTime;
          arr.push('<li data-score="'+score+'"><a ka="thework-button-'+i+'" href="'+ index + '?s='+(all_score+score)+'&choose='+choose+'&time='+time+'"><i></i><span>'+ v.msg +'</span></a></li>');
        }
      });
      var aHtml='<div class="q_img"> <img src="'+img_path+'q_'+(num-1)+'.jpg"> </div>';
          aHtml+='<ul class="answers open">'+arr.join('')+'</ul>';
      answers.html(aHtml);
    }
  };
  survey.init();

  $.countdown = function() {
    var cSeconds=0;
    var timing=$('.timing');
    var ivId=setInterval(function(){
      cSeconds++;
      timing.formartTime(cSeconds);
      /*
      if(cSeconds>0){
        setTime();
      }else{
        clearInterval(ivId);
      }
      */
    },1000)
  };
  $.fn.formartTime=function(cSeconds){
    var _t=$(this);
    var _seconds=cSeconds;
    var hour=Math.floor(_seconds / 3600);
    if(hour>=1){
      _seconds-=hour*3600;
    }
    var min=Math.floor(_seconds / 60);
    var sec= _seconds-min*60;
    if(sec<10){
      sec="0"+sec;
    }
    if(min<10){
      min="0"+min;
    }
    if(hour<10){
      hour="0"+hour;
    }
    hour=hour+'';
    min=min+'';
    sec=sec+'';
    var h=''+
      '<em><span>'+hour.charAt(0)+'</span><i></i></em>'+
      '<em><span>'+hour.charAt(1)+'</span><i></i></em>'+
      '<span>:</span>'+
      '<em><span>'+min.charAt(0)+'</span><i></i></em>'+
      '<em><span>'+min.charAt(1)+'</span><i></i></em>'+
      '<span>:</span>'+
      '<em><span>'+sec.charAt(0)+'</span><i></i></em>'+
      '<em><span>'+sec.charAt(1)+'</span><i></i></em>';
    _t.html(h);
    requestTime=hour.charAt(0)+','+hour.charAt(1)+','+min.charAt(0)+','+min.charAt(1)+','+sec.charAt(0)+','+sec.charAt(1);
  };
  var timingType=$('.timing').data('node-type');
  if(timingType=='timing'){
    $.countdown();
  }else if(timingType=='time_result'){
    //$('.timing').formartTime(300);
  }
});

$(function(){
  var h='<div><div>'+
    '<div class="mask" id="mask" style="display:none;"></div>'+
    '<div class="transmitDialog" id="transmitDialog" style="display:none">'+
    '<p>'+
    '邀请好友后即可<br>'+
    ' 查看解析或重新挑战'+
    '</p>'+
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

  window.onload = function(){
    var con= $('div.con');
    con.height(Math.max(con.height(), ($(window).height() - 32)));
  }
});
