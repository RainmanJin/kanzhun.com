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
    //展开
    var toggler = require('comp/toggler/toggler');
    toggler({
      el: $('#showCoTagFilter'),
      on: function(){
        this.closest('dd').find('ul.tag').addClass('show-all');
      },
      off: function(){
        this.closest('dd').find('ul.tag').removeClass('show-all');
      }
    })
    var $oStep_1=$('#step_1'),
        $oStep_2=$('#step_2');
    //rating
    $('#totalRating').rating('rating_star rating_s_', function(index){
      var self = $(this), parent = self.parent().parent(), hid = parent.find('input[name=rating]');
      hid.val(index);
      parent.find('p.err').remove();

      if(!self.data('rated')){
        self.data('rated', true);
      }
      $('.detail_rating').removeClass('none');
      $('#step_1_2').removeClass('none');
      //默认选中推荐公司和ceo看法
      if(index>=3){
        $.each($('[node-type="init_radio"]',$oStep_1),function(k,v){
          $(v).find('a:eq(0)').trigger('click');
        });
      }else{
        $.each($('[node-type="init_radio"]',$oStep_1),function(k,v){
          $(v).find('a:eq(1)').trigger('click');
        });
      }
    }, function(target){
      $('#totalRating').next('em').html($(target).attr('title'));
    }, function(target){
      $(target).next('em').html("");
    });
    $('#moreRating span.rating_rect').rating('rating_rect rating_r_', function(){
      var self = $(this), hid = self.parent().find('input:hidden');
      if(!self.data('rated')){
        self.data('rated', true);
      }
      hid.val(self.index());
    }, function(target){
      $(target).parent('span').next('em').html($(target).attr('title'));
    }, function(target){
      $(target).next('em').html("");
    });


    $('#chooses').on('click', 'a', function(e){
      e.preventDefault();
      var self = $(this), hid = self.parent().find('input:hidden');
      self.addClass('current').siblings().removeClass('current');
      hid.val(self.data('vl'));
      //self.closest('.wrap_style').next('.wrap_style').removeClass('none');
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

        pros: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        cons: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        },

        advice: function(_this, prompt){
          return speakTooMuch.call(this, _this, prompt);
        }
      }
    }).init().submit();

    //字数计算
    $('textarea[data-type="countNum"]').on('keyup',function(){
      var _this=$(this),
        val=$.trim(_this.val()),
        len=val.length,
        target=_this.parent().find(".ta_hint").find('[node-type="num"]');
      target.html(len);
    });

    $('.js_radio').on('click', 'a', function(e){
      e.preventDefault();
      var self = $(this), hid = self.parent().find('input:hidden');
      self.addClass('current').siblings().removeClass('current');
      hid.val(self.data('vl'));

      //判断第一步的最后触发
      if(self.parent().hasClass('step_1_last')){
        setTimeout(function(){
          $('.step_content',$oStep_1).slideToggle(function(){
            $oStep_1.addClass('retract');
            $oStep_2.removeClass('none');
            $('.arrow_down').hide();
            $('.arrow_end').show();
          });
        },300);
      }
    });

    //收起效果
    /*
    $(document).on('scroll',function(){
      var sT=$(document).scrollTop();
      var stepT1=$('.ugc_h',$oStep_1);
      var stepC1=$('.js_step_content',$oStep_1);
      var eT1=stepC1.offset().top+stepC1.height()-stepT1.height();
      if(sT>=eT1){
        //stepC1.addClass('none');
      }else{
        //stepC1.removeClass('none');
      }
    });
    */

  });

});