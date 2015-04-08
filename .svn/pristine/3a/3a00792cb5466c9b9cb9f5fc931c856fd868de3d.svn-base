$(function(){
  var surveyList = [
    {
      prog: '0',
      ques: '听到一鳞半爪关于他人的office love，你的反应是：',
      answ: {
        a: {msg: '快跟我说说细节！要非常细！', score: '3'},
        b: {msg: '浅浅地一笑，淡淡地走开', score: '9'},
        c: {msg: '木石之缘，金玉之缘，皆是前生注定', score: '6'},
        d: {msg: '嘁！对Office 的人完全不感冒', score: '1'}
      }
    },
    {
      prog: '1',
      ques: '2021年2月14日你出任国营西郊灯泡厂CEO，制定关于office love的条例：',
      answ: {
        a: {msg: '既不提倡，也不反对', score: '3'},
        b: {msg: '同事恋爱，劝退一名', score: '6'},
        c: {msg: '禁止在公家场地啪啪啪啪', score: '9'},
        d: {msg: '同学们都还处在长身体学知识的时代，谈恋爱请组织批准哦', score: '1'}
      }
    },
    {
      prog: '2',
      ques: '就在昨天子夜，那位玉树临风、六块腹肌的首席科学家喝大了，电话表白了：',
      answ: {
        a: {msg: '矮马，我的芳心扑通，扑通，扑通地跳了两个时辰才平静', score: '6'},
        b: {msg: '男人喝酒之后总是想起的人，平时总是尼马最想不起', score: '3'},
        c: {msg: '次日见到平静如常，只当木有发生过', score: '9'},
        d: {msg: '这个猥琐男怎么会有我的电话？？？', score: '1'}
      }
    },
    {
      prog: '3',
      ques: '话说你19岁那年（当然了，你每年都是19岁了）：',
      answ: {
        a: {msg: '较比喜欢师兄范儿的', score: '6'},
        b: {msg: '较比喜欢老师范儿的', score: '9'},
        c: {msg: '较比喜欢师弟范儿的', score: '3'},
        d: {msg: '较比喜欢姐妹范儿的。。。', score: '1'}
      }
    },
    {
      prog: '4',
      ques: '上周三你在健身房，一枚长腿偶巴每20分钟瞄你一眼：',
      answ: {
        a: {msg: '姐这身材，姐见犹怜，何况偶巴', score: '3'},
        b: {msg: '姐虽然懒得理你，但你的正确方式还是过来搭讪', score: '9'},
        c: {msg: '反瞄', score: '6'},
        d: {msg: '老娘忙着呢，没工夫搭理你', score: '1'}
      }
    }
  ];

  var answers = $('#answersList'),
    questions = $('#questions'),
    total = 0;
  var survey = {
    init: function(){
      var that = this;

      this.ask(0);

      answers.on('click', 'a', function(){
        var _this = $(this);
        var num = parseInt(_this.data('forward'));
        total += parseInt(_this.data('score'));
        console.log(total);

        if(num < 5){
          that.ask(num);
        }else if(num === 5){
          window.location.href = 'http://www.baidu.com/?l='+ that.level(total) +'&r=' + total;
        }
      });

      answers.on('touch', 'a', function(){
        var _this = $(this);
        _this.parent().addClass('on').siblings().removeClass('on');
      });
    },
    ask: function(num){
      var o = surveyList[parseInt(num)];
      var arr = [],
        index = parseInt(o.prog) + 1;
      questions.html('<span class="progress">'+ index +'/5</span>' + o.ques);

      $.each(o.answ, function(i, v){
        arr.push('<li><a ka="msg" href="javascript:;" data-forward="'+ index +'" data-score="'+ v.score +'"><i></i>'+ v.msg +'</a></li>');
      });
      answers.html(arr.join(''));
    },

    level: function(n){
      var o = {
        '1': function(num){
          return num >= 37 && num <= 45;
        },
        '2': function(num){
          return num >= 25 && num <= 36;
        },
        '3': function(num){
          return num >= 13 && num <= 24;
        },
        '4': function(num){
          return num >= 5 && num <= 12;
        }
      };

      var l;
      $.each(o, function(i, v){
        if(v(n)){
          l = i;
          return false;
        }
      });

      return l;
    }
  };

  survey.init();
});