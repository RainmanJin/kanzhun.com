$(function(){
  var surveyList = [{
      prog: '1',
      ques: '你的另一半劈腿了你的好友，第一反应会是：',
      answ: {
        a: {msg: '好心塞，感觉不会再爱了', derect: '2'},
        b: {msg: '老娘今晚睡一觉，明早再把男票找', derect: '3'},
        c: {msg: '十步之内必有芳草，劈了腿的俺不要', derect: '4'},
        d: {msg: '亲，你俩上天涯了等着被人肉吧么么哒', derect: '5'}
      }
    },
    {
      prog: '2',
      ques: '如果让你重新改写童话故事《卖火柴的小女孩》的结局，你会幻想以下哪个结局？',
      answ: {
        a: {msg: '不改，残缺的美就像维纳斯她胳膊', derect: '3'},
        b: {msg: '妹子我看你很有想法，跟我学吧，…小女孩创业成功变成土豪', derect: '4'},
        c: {msg: '这就是宿命，躲也躲不净', derect: '5'},
        d: {msg: '某土豪包了小女孩和火柴，从此过上郭美美的生活', derect: '6'}
      }
    },
    {
      prog: '3',
      ques: '以下影视类别你喜欢哪一个？',
      answ: {
        a: {msg: '斗来斗去各种撕逼类', derect: '4'},
        b: {msg: '全是男主战斗到爆类', derect: '5'},
        c: {msg: '男主失忆女主绝症类', derect: '6'},
        d: {msg: '哈哈笑完剧情是啥类', derect: '7'}
      }
    },
    {
      prog: '4',
      ques: '当你希望加薪时你会怎么做？',
      answ: {
        a: {msg: '领导，俺要加工资', derect: '5'},
        b: {msg: '等等吧，面包会有的……', derect: '6'},
        c: {msg: '领导!房租涨了，接下来可怎么过？！', derect: '7'},
        d: {msg: '天空飘过五个字，那都不是事儿！！！', derect: '8'}
      }
    },
    {
      prog: '5',
      ques: '你比较喜欢的文学体裁属于以下哪类？',
      answ: {
        a: {msg: '小清新小矫情小蛋疼类', derect: '6'},
        b: {msg: '男主女主分分钟秀恩爱类', derect: '7'},
        c: {msg: '女主校园学霸男主小混混类', derect: '8'},
        d: {msg: '晚上看好怕怕但是抑制不住想看类', derect: '9'}
      }
    },
    {
      prog: '6',
      ques: '公交车上，你看到猥琐男的反应？',
      answ: {
        a: {msg: '长得有点帅，我还是默默的匿了', derect: '7'},
        b: {msg: '你tm瞎啊！连男的都摸！', derect: '8'},
        c: {msg: '要上大家一起上，就我自己我不上', derect: '9'},
        d: {msg: '我只想做个安静的路人', derect: '10'}
      }
    },
    {
      prog: '7',
      ques: '别人欠你钱一直不还，你会作何反应？',
      answ: {
        a: {msg: '喂，那谁谁，你欠我的五毛什么时候还', derect: '8'},
        b: {msg: '借钱的太帅了，我不好意思要但是又想要', derect: '9'},
        c: {msg: '我人太好了没办法就吃一次亏吧', derect: '10'},
        d: {msg: '当着那谁谁的面：包里五毛不见了？好像借给谁了！', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA'}
      }
    },
    {
      prog: '8',
      ques: '生日时，你想要怎么庆祝？',
      answ: {
        a: {msg: '给自己买一个茶叶蛋好好收藏', derect: '9'},
        b: {msg: '当然和女票一起过啦我才不是单身狗', derect: '10'},
        c: {msg: '家里人最重要了么么哒', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxB'},
        d: {msg: '朋友一起轰趴我可以收好多礼物棒棒哒', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxD'}
      }
    },
    {
      prog: '9',
      ques: '下面诗句你比较喜欢哪一个？',
      answ: {
        a: {msg: '穷则独善其身 富则妻妾成群', derect: '10'},
        b: {msg: '天若有情天亦老，人若有情死得早', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA'},
        c: {msg: '仰天大笑出门去，一不小心扭到腰', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxD'},
        d: {msg: '英雄宝刀未老，老娘丰韵尤存', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxC'}
      }
    },
    {
      prog: '10',
      ques: '如果让你拾获阿拉丁神灯，给你一次许愿的机会，你会希望：',
      answ: {
        a: {msg: '迎娶白富美', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxC'},
        b: {msg: '变身土豪', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxD'},
        c: {msg: '环游地球', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxA'},
        d: {msg: '出任CEO', derect: 'http://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxB'}
      }
    }
  ];

  var answers = $('#answersList'),
    questions = $('#questions'),
    prog = 1;
  var survey = {
    init: function(){
      var that = this;

      this.ask(1);

      answers.on('click', 'li', function(){
        var num = $(this).data('forward');
        if(num){
          that.ask(num);
        }
      });
    },
    ask: function(num){
      var o = surveyList[parseInt(num) - 1];
      var arr = [];

      questions.html('<span class="progress">'+ prog +'</span>' + o.ques);
      prog ++ ;

      $.each(o.answ, function(i, v){
        var index = v.derect;
        if(/^\d+$/.test(index)){
          arr.push('<li data-forward="'+ index +'">'+ v.msg +'</li>');
        }else{
          arr.push('<li><a href="'+ index +'">'+ v.msg +'</a></li>');
        }
      });
      answers.html(arr.join(''));
    }
  };

  survey.init();
});