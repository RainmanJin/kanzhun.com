require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    v2: 'v2/js',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});


require(['c/auth_dialog','c/widgets','v2/ugc/ugc_common','comp/toggler/toggler'], function(auth_dialog){
  $(function(){
    //textarea自动撑开
    $('textarea.autosizejs').autosize();

    var $oStep_1=$('#step_1'),
      $oStep_2=$('#step_2'),
      $oStep_3=$('#step_3');
    // 面试时间下拉
    $('.select', '#interviewDate').DIYSelect();

    //离开时间提示
    var wrapbox = $('div.prompt_box');
    $('div.prompt_wrap i').hover(function(){
      wrapbox.removeClass('none');
    },function(){
      wrapbox.addClass('none');
    });
    // 面试结果
    $('#resultDIV').on('click', 'a', function(e){
      e.preventDefault();
      $(this).addClass('result').siblings().removeClass('result').parent().find('input:hidden').val($(this).data('vl'));
      $('#salaryDIV').find('input[name=salary]').val('');
      // 面试通过
      if($(this).data('vl') == '3'){
        $('#salaryDIV').show();
      }else{
        $('#salaryDIV').hide();
      }
      $('#difficultyP').removeClass('none');
    });
    //工资正则
    $('#salaryDIV').on('keyup','input[type=text]',function(){
      var val = this.value.replace(/^0(?=\d+)|\D/g, '');
      $(this).val(val);
    });


    $('#difficultyP span.rating_rect').rating('rating_rect rating_r_', function(index){
      var self = $(this), hid = self.parent().find('input:hidden');
      hid.val(index);
      setTimeout(function(){
        $('.step_content',$oStep_1).slideToggle(function(){
          $oStep_1.addClass('retract');
          $oStep_2.removeClass('none');
        });
      },300);
    }, function(target){
      $(target).parent().next('em').html($(target).attr('title'));
    }, function(target){
      $(target).next('em').html("");
    });
    //展开
    $('#ugcForm').on('click','.retract .ugc_h3',function(){
      $(this).parent().removeClass('retract').find('.step_content').show();
    });

    var speakTooMuch =  function(_this, prompt){
      var self = $(this),
        val = self.val();
      if(val.length < 10){
        prompt.err(self, '最少输入10个字！');
        return false;
      }
      if(!('maxLength' in document.createElement('textarea'))){
        var ml = self.attr('maxlength');

        if(ml && val.length > ml){
          prompt.err(self, '内容不要超过'+ ml +'字！');
          return false;
        }else{
          prompt.succ(self);
          return true;
        }
      }
      prompt.succ(self);
      return true;
    };
    $('#ugcForm').validatorAll({
      elems: '.v',
      prompt: {
        succ: function (target) {
          target.parent().find('p.err').hide();
        },
        err: function (target, msg) {
          var prompt = target.parent().find('p.err');
          prompt.find('span').html(msg || prompt.data('msg')).end().show();
        },
        normal: function (target) {
          target.parent().find('p.err').hide();
        }
      },
      more: {
        title: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        process: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        cons: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },
        advice: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },
        question:function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },
        answer:function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        }
      }
    }).init().submit(function(){
      if($oStep_3.is(':hidden')) {
        setTimeout(function(){
          $('.step_content',$oStep_2).slideToggle(function(){
            $oStep_2.addClass('retract');
            $('[type=submit]',$oStep_2).hide();
            $oStep_3.show();
            $('.arrow_down').hide();
            $('.arrow_end').show();
            return false;
          });
        },300);
      }else{
        return true
      }
    });
    // 动态添加问题和答案 最多添加5组
    $('#questionDIV').on('click','a.impressive', function(){
      var self = $(this),
        counts = self.data('counts') || 1;
      counts ++;
      var html='<dl class="ff_ta mt15 mb15 clearfix">'+
      '<dt>令您印象深刻的问题（'+ counts +'）</dt>'+
      '<dd class="mt5">'+
        '<textarea class="ta autosizejs v" name="question" data-type="countNum" data-unnecessary="1" placeholder="写下你在面试过程中被问到的问题，给其他朋友一个参考"></textarea>'+
        '<div>'+
          '<p class="err fleft"><i class="i_excl"></i> <span></span></p>'+
          '<p class="ta_hint fright">已输入 <span class="green" node-type="num">0</span>/1000 个字（最少输入10个字）</p>'+
        '</div>'+
      '</dd>'+
      '</dl>'+
      '<dl class="ff_ta mt15 mb15 clearfix">'+
      '<dt>您的回答</dt>'+
      '<dd class="mt5">'+
        '<textarea class="ta autosizejs v" name="answer" data-type="countNum" data-unnecessary="1" placeholder="写下你在面对问题时的经典回答，让大家一起学习分享"></textarea>'+
        '<div>'+
        '<p class="err fleft"><i class="i_excl"></i> <span></span></p>'+
        '<p class="ta_hint fright">已输入 <span class="green" node-type="num">0</span>/1000 个字（最少输入10个字）</p>'+
        '</div>'+
      '</dd>'+
      '</dl>';
      self.before(html);
      self.data('counts', counts);
      $('textarea.autosizejs').autosize();
      if(counts === 5){
        self.removeData('counts').remove();
      }
    });
    //字数计算
    $('#ugcForm').on('keyup','textarea[data-type="countNum"]',function(){
      var _this=$(this),
        val=$.trim(_this.val()),
        len=val.length,
        target=_this.parent().find(".ta_hint").find('[node-type="num"]');
      target.html(len);
    });

    //禁止回车提交表单
    $('form').keypress(function(e) {
      if (e.which == 13&&$(e.target).prop("nodeName")!='TEXTAREA') {
        return false;
      }
    });
    //判断是否重复
    function isRepeat(str,arr){
      var len=arr.length;
      for(var i=0;i<len;i++){
        if(str==$(arr[i]).find('span').html()){
          return true;
        }
      }
      return false;
    }
    //添加标签
    var iv_tag=$('#iv_tag');
    $('.tag_ipt').on('keyup',function(e){
      var _t=$(this),
        _val=$.trim(_t.val());
      if(e.which==13){
        if(_val==''){
          return;
        }
        var arr=iv_tag.find('a');
        var err=_t.parent().prev('.err');
        if(isRepeat(_val,arr)){
          err.show().fadeOut(3000).find('span').html('该标签已经存在');
          return;
        }
        if($('[node-type="self"]',iv_tag).length==5){
          err.show().fadeOut(3000).find('span').html('您最多只能添加5个面试印象');
          return;
        }
        iv_tag.append('<li node-type="self"><input class="none" type="checkbox" name="interviewTag" value="'+_val+'" checked><a class="a_tag" href="javascript:;"><span>'+_val+'</span> <i class="i_close"></i></a></li>').show();
        _t.val('');
      }
    });
    //删除面试印象
    iv_tag.on('click','li',function(){
      $(this).remove();
      if(iv_tag.find('li').length==0){
        iv_tag.hide();
      }
    });
    $('.tag_ipt').on('focus',function(){
      $(this).next('span').removeClass('none');
    }).on('blur',function(){
      $(this).next('span').addClass('none');
    });
    $('.js_radio').on('click', 'a', function(e){
      e.preventDefault();
      var self = $(this), hid = self.parent().find('input:hidden');
      self.addClass('current').siblings().removeClass('current');
      hid.val(self.data('vl'));
    });

  });

});