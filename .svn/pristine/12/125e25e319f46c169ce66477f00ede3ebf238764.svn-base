$(function(){
  var surveyList = [{
      prog: '1',
      ques: '我在行业中的薪酬水平',
      answ: {
        a: {msg: '属于前20%，勉强算土豪吧', derect: '2',score:2},
        b: {msg: '前40%，叫我高富帅也可以', derect: '2',score:3},
        c: {msg: '也就是个路人甲的平均水平', derect: '2',score:3},
        d: {msg: '位居行业中下游，常被誉为搬砖屌丝', derect: '2',score:1},
        e: {msg: '不造，我不知道行业的平均水平', derect: '2',score:0}
      } 
    },
    {
      prog: '2',
      ques: '我所在部门与其他部门相比',
      answ: {
        a: {msg: '加班多到睡得比鬼还晚', derect: '3',score:5},
        b: {msg: '还可以吧，到点打卡下班走人', derect: '3',score:3},
        c: {msg: '比其他部门清闲，吃吃瓜子唠唠嗑一天就过去了', derect: '3',score:1}
      }
    },   
    {
      prog: '3',
      ques: '我的BOSS在大BOSS面前 ',
      answ: {
        a: {msg: '吃香，宠妃的节奏', derect: '4',score:5},
        b: {msg: '一般，路人的节奏', derect: '4',score:3},
        c: {msg: '不吃香，打入冷宫的节奏', derect: '4',score:0}
      }
    },  
    {
      prog: '4',
      ques: '在我心目中我的Boss是',
      answ: {
        a: {msg: '为部下争取利益，感动的一把鼻涕一把泪，真是一条汉子（女汉子）', derect: '5',score:5},
        b: {msg: '向来一碗水端平，就事论事', derect: '5',score:2},
        c: {msg: '很少为部下争取利益，我拿着文件掉水里Boss跳下去抢救文件', derect: '5',score:0},
      }
    },
    {
      prog: '5',
      ques: '家人心目中，你在单位的角色是',
      answ: {
        a: {msg: '为工作消得人憔悴的工作狂', derect: '6',score:5},
        b: {msg: '朝九晚五两点一线的打工狗', derect: '6',score:3},
        c: {msg: '有你没你都行的酱油党', derect: '6',score:1}
      }
    },
    {
      prog: '6',
      ques: '你每天到公司的习惯时间是',
      answ: {
        a: {msg: '至少提前十五分钟或更多', derect: '7',score:5},
        b: {msg: '提前五至十分钟', derect: '7',score:3},
        c: {msg: '旋转跳跃踩着铃响到 偶尔迟到', derect: '7',score:2},
        d: {msg: '经常迟到个5分钟左右，不过也不会晚很多', derect: '7',score:1},
        d: {msg: '经常迟到个5分钟左右', derect: '7',score:0},
      }
    },     
    {
      prog: '7',
      ques: '工作里遇到比较棘手的问题的时候',
      answ: {
        a: {msg: '经常请教专家，前辈，高手，最好他们能给做详尽的解释和操作', derect: '8',score:1},
        b: {msg: '和领导一起分析问题，研究解决思路和方法，然后让万能同事解决', derect: '8',score:3},
        c: {msg: '疯狂的查资料，找高人了解，主动学习，咬着牙也要独立完成，至于反馈给领导不是最重要的', derect: '8',score:2},
        d: {msg: '请专业的团队来解决 老板一定觉得我棒棒哒', derect: '8',score:1},
        e: {msg: '做一个独立的美男子，默默的滚到墙角工作，已经习惯了，至于反馈给领导不是最重要的', derect: '8',score:5}
      }
    },
    {
      prog: '8',
      ques: '你平时会吐槽工作吗',
      answ: {
        a: {msg: '不会吐，所有的不平都是一种磨练，对自我的成长有利，我已经习惯了？', derect: '9',score:3},
        b: {msg: '很少吐，有苦放在心里，说出来有个毛用，，还不如去工作', derect: '9',score:2},
        c: {msg: '有时吐，这些事情还是和关系比较亲近的人说说吧', derect: '9',score:1},
        d: {msg: '偶尔吐个槽，但是要吐就和领导坐下来，好好看待问题分析本质', derect: '9',score:5},
        e: {msg: '经常，我是不吐槽会死星人 ', derect: '9',score:0},
      }
    },
    {
      prog: '9',
      ques: '如果你缺席，你所在团队的工作会受到很大的影响',
      answ: {
        a: {msg: '完全不是，大家各安其职有什么好影响的', derect: '10',score:0},
        b: {msg: '影响还是有一丢丢，因为别人可以帮我弄一点 ', derect: '10',score:1},
        c: {msg: '略微有点小影响，但依靠团队的力量还是可以GO的', derect: '10',score:2},
        d: {msg: '影响很大很大，工作要停摆啊，因为我太重要了所以老板死活不给我缺席', derect: '10',score:5}
      }
    },
    {
      prog: '10',
      ques: '工作时间以外，你依然能接到很多跟工作相关的电话',
      answ: {
        a: {msg: '是的，经常事情不断，24小时开机你懂的', derect: '11',score:5},
        b: {msg: '不是，本来就没那么严重的事情，上班时间干的完', derect: '11',score:1},
        c: {msg: '为什么要占用自己私人时间，工作生活要分清', derect: '11',score:0},
        d: {msg: '有的时候有，突发情况下才会想到我', derect: '11',score:2}
      }
    },
    {
      prog: '11',
      ques: '过去的一段时间（半年）内，我的工作业绩是？',
      answ: {
        a: {msg: '牛叉闪闪照亮公司', derect: '12',score:5},
        b: {msg: '出了几个牛叉的成果，感觉还不错啦', derect: '12',score:3},
        c: {msg: '一般般，还是做一个安静的小职员', derect: '12',score:1},
        d: {msg: '有点小下滑，不过不算太离谱，退步的起码我还能接受', derect: '12',score:1},
        e: {msg: '这段时间表现不好，人艰不拆 但是主要责任不在我', derect: '12',score:0}
      }
    },   
    {
      prog: '12',
      ques: '猎头公司或人才中介主动找过我',
      answ: {
        a: {msg: '经常的，低调低调 ', derect: '13',score:5},
        b: {msg: '每个月总有几天', derect: '13',score:3},
        c: {msg: '呵呵 会有吗', derect: '13',score:0},
        d: {msg: '除非我更新了简历。', derect: '13',score:1}
      }
    },
    {
      prog: '13',
      ques: '你是怎么提加薪额度的',
      answ: {
        a: {msg: '在提出加薪要求前研究同行业相关职位薪酬的大体数目，再估计一个合理的加薪额度', derect: '14',score:5},
        b: {msg: '公司有自然增长的工资政策，我相信公司的眼光和政策 我等等看先', derect: '14',score:3},
        c: {msg: '等着领导中彩票捡钱包 笑得一脸褶子的时候', derect: '14',score:1},
        d: {msg: '打听别的同事涨了多少 然后理直气壮的去找领导', derect: '14',score:1}
      }
    },    
    {
      prog: '14',
      ques: '我所在的企业的利润指标一直是上升的',
      answ: {
        a: {msg: '是，神龙摆尾 直线上升', derect: '/result',score:5},
        b: {msg: '一般，直线不动 生命在于静止', derect: '/result',score:3},
        c: {msg: '不是，呵呵 坑爹呢', derect: '/result',score:1}
      }
    } 
  ];

  var answers = $('#answersList'),
    questions = $('#questions'),
    prog = 1,
    all_score = 0;//记录分数
  var survey = {
    init: function(){
      var that = this;

      this.ask(1);

      answers.on('click', 'li', function(){
        var num = $(this).data('forward');
        all_score += parseInt($(this).data('score'));

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

      questions.html(prog +'. '+ o.ques);

      prog ++ ;
      $.each(o.answ, function(i, v){
        var index = v.derect;
        var score = v.score;
        var ka="thework-button";
        if(/^\d+$/.test(index)){
          arr.push('<li data-forward="'+ index +'" data-score="'+score+'"><a ka="thework-button-'+i+'" href="javascript:;"><i><span class="icon_ok"></span></i><span>'+ v.msg +'</span></a></li>');
        }else{
          arr.push('<li data-score="'+score+'"><a ka="thework-button-'+i+'" href="'+ index + '?s='+(all_score+score)+'"><i><span class="icon_ok"></span></i><span>'+ v.msg +'</span></a></li>');
        }
      });
      answers.html('<ul class="answers open">'+arr.join('')+'</ul>');
    }
  };

  survey.init();
});