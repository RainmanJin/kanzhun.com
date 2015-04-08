$(function(){
  var surveyList = [{
      prog: '1',
      ques: '你最不喜欢？',
      answ: {
        a: {msg: '别人指手画脚的帮我，我是一个高冷的人好吗', derect: '3'},
        b: {msg: '老娘今晚睡一觉，明早再把男票找', derect: '2'}
      }
    },
    {
      prog: '2',
      ques: '出差的时候，你通常?',
      answ: {
        a: {msg: '随便来几件贴身的就出发', derect: '4'},
        b: {msg: '像处女座+强迫症一样仔细收拾', derect: '3'}
      }
    },
    {
      prog: '3',
      ques: '在工作中你更倾向于？',
      answ: {
        a: {msg: '斗来斗去各种撕逼类', derect: '5'},
        b: {msg: '全是男主战斗到爆类', derect: '4'}
      }
    },
    {
      prog: '4',
      ques: '如果每次开会都要强调同一件事，你觉得？',
      answ: {
        a: {msg: '叨逼叨，叨逼叨……你丫有完没完！', derect: '6'},
        b: {msg: '听起来很重要呢，我要拿小本记一下！（加个加油奋斗的表情）', derect: '5'}
      }
    },
    {
      prog: '5',
      ques: '公司规定必须每天提交工作总结，你怎么想？',
      answ: {
        a: {msg: '无所谓啊，别少发工资就行', derect: '6'},
        b: {msg: '太特么烦了，浪费我的小睡时间', derect: '/result?l=1'}
      }
    },
    {
      prog: '6',
      ques: '某同事因为确实急需用钱，万般无奈挪用了公司一小笔公款，你认为？',
      answ: {
        a: {msg: '出来混，迟早要还的，不追究最好。', derect: '/result?l=2'},
        b: {msg: '死罪可免，活罪难逃！', derect: '7'}
      }
    },
    {
      prog: '7',
      ques: '你更擅长写哪种类型的作文？',
      answ: {
        a: {msg: '让我写啥我写啥。---（要不要加上“命题作文”）', derect: '9'},
        b: {msg: '更喜欢看图说话。---（要不要加上“看图作文”）', derect: '8'}
      }
    },
    {
      prog: '8',
      ques: '学校要求学生每天穿校服，你怎么看？',
      answ: {
        a: {msg: '好多漂亮衣服都不能穿，人干的事？', derect: '10'},
        b: {msg: '学校是我家，老师是我妈。合理。', derect: '9'}
      }
    },
    {
      prog: '9',
      ques: '如果被安排执行一个你并不熟悉的新项目，这时候你会？',
      answ: {
        a: {msg: '好紧张！果然还是综合过来人的信息比较保险吧。 ', derect: '11'},
        b: {msg: '自己慢慢摸索办好，老板一定会夸我很机智的！', derect: '10'},
      }
    },
    {
      prog: '10',
      ques: '公司要求每天上班打卡，穿正装，你觉得？',
      answ: {
        a: {msg: '这么反人类的管理，我也是醉了。', derect: '12'},
        b: {msg: '很有必要，上朝还得穿官服呢。', derect: '11'}
      }
    },
    {
      prog: '11',
      ques: '.相比周围的人，你更加？',
      answ: {
        a: {msg: '高冷。', derect: '/result?l=3'},
        b: {msg: '逗比。', derect: '12'}
      }
    },
    {
      prog: '12',
      ques: '对于公司的各种规章制度，你觉得？',
      answ: {
        a: {msg: 'HR吃饱了撑的吗！', derect: '/result?l=4'},
        b: {msg: '我是遵纪守法的好公民。', derect: '13'}
      }
    },
    {
      prog: '13',
      ques: '那种情景最令你束手无策？',
      answ: {
        a: {msg: '熊孩子在你面前又哭又闹。', derect: '14'},
        b: {msg: '一桌子的复习试卷。', derect: '15'}
      }
    },    
    {
      prog: '14',
      ques: '.公司资金周转上出了点小问题，领导应该怎么做？',
      answ: {
        a: {msg: '谁动了我的奶酪？查出来乱棍打死！', derect: '/result?l=1'},
        b: {msg: '不要拣了芝麻丢了西瓜，先弄项目。', derect: '/result?l=2'}
      }
    },
    {
      prog: '15',
      ques: '把东西从哪儿拿的放回哪儿去，对你来说？',
      answ: {
        a: {msg: '咦？我刚从哪里拿的来着？', derect: '/result?l=3'},
        b: {msg: '不好意思，我有强迫症，摆放物品---so easy！ ', derect: '/result?l=4'}
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
      answers.on('touchstart', 'a', function(){
        var _this = $(this);
        _this.parent().addClass('on').siblings().removeClass('on');
      });      
    },
    ask: function(num){
      var o = surveyList[parseInt(num) - 1];
      var arr = [];

      questions.html(prog +'. '+ o.ques);
      prog ++ ;

      $.each(o.answ, function(i, v){
        var index = v.derect;
        var ka="thework-button";
        if(/^\d+$/.test(index)){
          arr.push('<li data-forward="'+ index +'" ><a ka="thework-button-'+i+'" href="javascript:;"><i><span class="icon_ok"></span></i>'+ v.msg +'</a></li>');
        }else{
          //arr.push('<li><a href="'+ index +'">'+ v.msg +'</a></li>');
          arr.push('<li><a ka="thework-button-'+i+'" href="'+ index +'"><i><span class="icon_ok"></span></i>'+ v.msg +'</a></li>');
        }
      });
      answers.html(arr.join(''));
    }
  };

  survey.init();
});