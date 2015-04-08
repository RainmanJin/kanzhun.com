require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});


require(['c/auth_dialog', 'c/user_response', 'c/general', 'comp/toggler/toggler', 'comp/floatword/floatword'], function(auth_dialog, user_response){
  $(function(){
    $.fn.extend({
      rating: function (classname, clickCallback, enterCallback, leaveCallback) {
        this.each(function (i, v) {
          var target = $(v);
          target.on('mouseenter', 'a', function () {
            var index = parseInt(target.find('a').index(this) + 1, 10),
              done = '';
            if(target.hasClass('done')){
              done = 'done ';
            }
            target.attr('class', done + classname + index);

            if(enterCallback){
              enterCallback(this);
            }
          }).on('mouseleave', function(){
            var index = target.data('ind');
            if(!target.hasClass('done')){
              target.removeClass(function(){
                return $(this).attr('class', classname.split(' ')[0]);
              });
              if(leaveCallback){
                leaveCallback(this);
              }
            }else{
              target.attr('class', 'done ' + classname + index);
              if(enterCallback){
                enterCallback(target.find('a').eq(index - 1));
              }
            }
          }).on('click', 'a', function(){
            var index = parseInt(target.find('a').index(this) + 1, 10);
            target.addClass('done').data('ind', index);
            if (clickCallback) {
              clickCallback.call(this, index);
            }
          });
        });
      }
    });

    //按条件搜索的显隐藏
    var spredPut = $('dd.spred_put_wrap');
    $.each(spredPut, function(i, v){
      if($(v).height() > 32){
        $(v).addClass('put_away');
      }else {
        $(v).find('aside.spread_option').addClass('none');
      }
    })

    var sForm = $('#searchForm'),
      pagenum = sForm.find('input[name=pagenum]'),
      cityCode = sForm.find('input[name=cityCode]'),
      jobTitle = sForm.find('input[name=jobTitle]');

    //显示点评分数详情
    var popNone;
    $('.js_bt_showCgd').on('mouseenter', function(){
      clearTimeout(popNone);
      $('.co_grade_detail').removeClass('none');
    }).on('mouseleave', function(){
      popNone = setTimeout(function(){
        $('.co_grade_detail').addClass('none');
      }, 400)
    })
    /*$('.js_bt_showCgd').on('click',function(e){
      $('.co_grade_detail').toggleClass('none');
      $(document).one("click", function(){
        $('.co_grade_detail').addClass('none');
      });
      e.stopPropagation();
    }).on('mouseenter', function(){
      $('.co_grade_detail').removeClass('none');
      e.stopPropagation();
      $(this).addClass('i_question_hover');
    }).on('mouseleave', function(){
      $('.co_grade_detail').addClass('none');
      e.stopPropagation();
      $(this).removeClass('i_question_hover');
    });*/

    /*$('.co_grade_detail').on('click',function(e){
      e.stopPropagation();
    });

    $(document).on('click',function(e){
     if($(e.target).parents('.co_grade_detail').length==0||$(e.target).parents('.js_bt_showCgd').length){
       //$('.co_grade_detail').hide();
     }
    });*/

    //鼠标滑过点评列表分数详情(优化)
    $('span.js_hover_gd').on('mouseenter',function(){
      var _t=$(this);
      _t.siblings('.grade_detail').show().end().next().addClass('fronts_a_hover');
    }).on('mouseleave',function(){
      var _t=$(this);
      _t.siblings('.grade_detail').hide().end().next().removeClass('fronts_a_hover');
    });
    $('span.js_hover_gd').next().on('mouseenter', function(){
      $(this).siblings('.grade_detail').show().end().addClass('fronts_a_hover');
    }).on('mouseleave', function(){
      $(this).siblings('.grade_detail').hide().end().removeClass('fronts_a_hover');
    })
    //textarea点击时跳转
    $('.js_textarea_enter').on('click',function(){
      location.href=$(this).data('url');
    });

    //筛选 展开
    var toggler = require('comp/toggler/toggler');
    toggler({
      el: $('#showCoFilterJobs, #showCoFilterCities'),
      on: function(){
        this.closest('dd').addClass('show-all');
      },
      off: function(){
        this.closest('dd').removeClass('show-all');
      }
    })

    //直接点击按钮 清空citycode
    $('#viewSearchBtn').on('click', function (e) {
      e.preventDefault();
      cityCode.val('');
      sForm.submit();
    });

    /*
    //sort
    $('#viewSortWrapper').on('click', 'a.js-select', function (e) {
      e.preventDefault();
      pagenum.val('1');
      sForm.find('input[name=sortMethod]').val($(this).data('sort'));
      sForm.submit();
    });

    $('#showViewSearch').on('click', function () {
      $('#viewSearch').toggleClass('none');
    });

    $('.search_close', '#viewSearch').on('click', function () {
      $('#viewSearch').addClass('none');
    });
     */

    //有用没用
    var floatword = require('comp/floatword/floatword');
    $('#reviewPage').upOrDown({
      url: CONTEXTPATH + '/review/',
      delegate: 'a.mark',
      data: function () {
        return {
          reviewId: this.data('sid')
        };
      },
      callback: function(ret){
        var mtype = this.data('mtype');
        if(ret && ret.rescode == '1'){
          var num = this.find('i');
          this.addClass('marked');
          num.html((parseInt(num.html(), 10) || 0) + 1);
          this.data('mtype', null);

          floatword({
            cfw: this
          })
          //判断是否有cookie
          if( !$.readCookie('loginPop') ) {
            if( !isLogged ){
              $.maskUI.open({
                content: '<h3>提示</h3><div class="dialog_ac"><div>想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><p><a href="javascript:;" class="confirm_ok dialog_btn go_login">立即登录</a></p></div>'
              });

              $('a.go_login').click(function(){
                auth_dialog.open('#login?authcb=authCallback');
              })
            }
            $.writeCookie('loginPop', '1');
          }
        }else{
          this.data('mtype', mtype);
        }
      }
    });

    $('#officialWrap').upOrDown({
      url: CONTEXTPATH + '/hrreply/',
      delegate: 'a.mark',
      data: function () {
        return {
          replyId: this.data('sid')
        };
      },
      callback: function(ret){
        var mtype = this.data('mtype');
        //console.log($('a:eq(' + thisIndex + ')'));

        if(ret && ret.rescode == '1'){
          var num = this.find('i');
          this.parent().find('a').addClass('marked');
          num.html((parseInt(num.html(), 10) || 0) + 1);
          this.data('mtype', null);
          //this.parent().find('a:eq(' + thisIndex + ')').addClass('marked');

          floatword({
            cfw: this
          });

        }else{
          self.data('mtype', mtype);
        }
      }
    });

    //canvas  charts
    $('canvas.reviewsDoughnutChart').doughnutChart({
      colors: ['#7cb228', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 6
    });

    //如何获得面试机会率 展开
    toggler({
      el: $('#moreChartInfo'),
      on: function(){
        this.parent().siblings('p').slice(3, 6).removeClass('none');
      },
      off: function(){
        this.parent().siblings('p').slice(3, 6).addClass('none');
      }
    });


    //查看更多 模糊遮盖
    $('#reviewPage').on('mouseenter', 'div.js-filterblur', function () {
      if ($(this).hasClass('noevent')) {
        return;
      }
      $(this).find('div.nologin').fadeIn(200);
    }).on('mouseleave', 'div.js-filterblur', function () {
      if ($(this).hasClass('noevent')) {
        return;
      }
      $(this).find('div.nologin').hide();
    });

    /*.on('click', 'a.btn_o_s', function (e) {
      e.preventDefault();
      auth_dialog.open($(this).attr('href'));
    });*/


    //评论
    user_response.comment({
      delegate: $('#reviewPage'),
      needToInit: true,
      popCallback: function(){
        if( !$.readCookie('loginPop') ) {
          if( !isLogged ){
            $.maskUI.open({
              content: '<h3>提示</h3><div class="dialog_ac"><div>想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><p><a href="javascript:;" class="confirm_ok dialog_btn go_login">立即登录</a></p></div>'
            });

            $('a.go_login').click(function(){
              auth_dialog.open('#login?authcb=authCallback');
            })
          }
          $.writeCookie('loginPop', '1');
        }
      }
    });

    //分享
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share',
      config: function(){
        $('#shareTextHid').val('有人点评了【'+ $('#companyName').data('companyname') +'】，说这里“'+ $(this).data('desc') +'”，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
      }
    });

    //未登录状态下留下邮箱验证
    $('#nologinEmailFrm').validatorAll({
      elems: '.v',
      prompt: {
        succ:function(target){
          target.siblings(".err").hide();
        },
        err:function(target,msg){
          var prompt=target.siblings(".err");
          prompt.html((msg||prompt.data("msg")) ).show();
        },
        normal:function(target){
          target.siblings(".err").hide();
        }
      },
      more: {
        email: {
          type: 'isMail',
          msg: '邮箱格式不对!'
        }
      },
      ajaxSubmit: {
        elems: '.v',
        beforeSend: function(){},
        dataType: 'html',
        success: function(result){
          var $sendEmail = $('dd.c_email_frm_wrap');
          $sendEmail.html('<p class="send_email_succ grey_66 f_16"><i class="suc_p"></i><b>您已成功订阅公司动态信息</b></p><p class="grey_99">我们会将公司最新动态及时发送到您的邮箱，请注意查收！</p>');
          var succTT = setTimeout(function(){
            clearTimeout(succTT);
            $sendEmail.parent().parent().slideUp(400);
          }, 2500);

        }
      }
    }).init().submit(function(){
      var flag=true;
      //改成非登录情况下也校验邮箱是否存在
      //if(isLogin==1){
      var account= $.trim($('input.v_email_field').val());
      $.ajax({
        url:'/account/checkAccountBind.json',
        async:false,
        type:'get',
        data:{
          account:account
        },
        success:function(result){
          var prompt=$('input.v_email_field').siblings(".err");
          if(result.result){
            prompt.html('该邮箱已被注册！请用该邮箱登录或输入其他邮箱！').show();
            flag=false;
          }else{
            prompt.hide();
            flag=true;
          }
        }
      });
      //}
      return flag;
    });

    //页面底部点评
    $('#moreRating span.rating_rect').rating('rating_rect rating_r_', function(){
      var self = $(this), hid = self.parent().find('input:hidden');
      if(!self.data('rated')){
        self.data('rated', true);
      }
      hid.val(self.index());
      location.href = $('textarea.js_textarea_enter').data('url');
    }, function(target){
      $(target).parent('span').next('em').html($(target).attr('title'));

    }, function(target){
      $(target).next('em').html("");
    });

    /*//分享公司
     shareComments.build({
     selectors: 'a.share_co'
     });*/
  });
});