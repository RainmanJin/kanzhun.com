require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});


require(['c/auth_dialog', 'c/user_response', 'c/general', 'comp/toggler/toggler','comp/floatword/floatword'], function(auth_dialog, user_response){
  $(function(){
    var sForm = $('#searchForm'),
      pagenum = sForm.find('input[name=pagenum]'),
      cityCode = sForm.find('input[name=cityCode]'),
      jobTitle = sForm.find('input[name=jobTitle]');

    /*$('#viewCitySelect').DIYSelect({
      keepDefault: true
    });*/

    //按条件搜索的显隐藏
    var spredPut = $('dd.spred_put_wrap');
    $.each(spredPut, function(i, v){
      if($(v).height() > 32){
        $(v).addClass('put_away');
      }else {
        $(v).find('aside.spread_option').addClass('none');
      }
    })

    //面试筛选 展开
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

    //面经列表 有用
    var floatword = require('comp/floatword/floatword');
    $('#interviewPage').upOrDown({
      url: CONTEXTPATH + '/interview/',
      delegate: 'a.mark',
      data: function () {
        return {
          interviewId: this.data('sid')
        };
      },
      callback: function(ret){
        var mtype = this.data('mtype');
        if(ret && ret.rescode == '1'){
          var num = this.find('i');
          this.addClass('marked');
          num.html((parseInt(num.html(), 10) || 0) + 1);

          floatword({
            cfw: this
          })
          this.data('mtype', null);
          //判断是否有cookie
          if( !$.readCookie('loginPop') ) {
            if( !isLogged ){
              $.maskUI.open({
                content: '<h3>提示</h3><div class="dialog_ac"><div>想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><p><!--<a href="javascript:;" class="maskui_close dialog_btn mr10">不感兴趣</a>--><a href="javascript:;" class="confirm_ok dialog_btn go_login">立即登录</a></p></div>'
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

    //canvas  charts
    //面试难度
    $('canvas.reviewsDoughnutChart').doughnutChart({
      colors: ['#f68121', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 10
    });

    //面试整体感受
    $('canvas.reviewsPieChart').pieChart({
      colors: ['#7cb228', '#abd667', '#ededed'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
    });

    //如何获得面试机会率
    $('canvas.reviewsFromPieChart').pieChart({
      colors: ['#a7dbff', '#16b6cc', '#05c1f1', '#0ca6f0', '#147cde', '#0870c9'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
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


    //面经查看更多 模糊遮盖
    $('#interviewPage, #reviewPage').on('mouseenter', 'div.js-filterblur', function () {
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
      delegate: $('#interviewPage'),
      needToInit: true,
      popCallback: function(){
        if( !$.readCookie('loginPop') ) {
          if( !isLogged ){
            $.maskUI.open({
              content: '<h3>提示</h3><div class="dialog_ac"><div>想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><p><!--<a href="javascript:;" class="maskui_close dialog_btn mr10">不感兴趣</a>--><a href="javascript:;" class="confirm_ok dialog_btn go_login">立即登录</a></p></div>'
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

     /* $('form',dialog).validatorAll({

        ajaxSubmit: {
          elems: '.v',
          beforeSend: function(){},
          dataType:'html',
          success: function(result){
            $.maskUI.open({
              elem: $(result),
              destroy:true
            });
            //关注与收藏
            $('a.pop_follow').hover(function(){
              if( $(this).data('hadAttention') == 'yes' ){
                $(this).html('取消关注');
              }
            }, function(){
              if( $(this).data('hadAttention') == 'yes' ){
                $(this).html('<i class="ok_s"></i>已关注');
              }
            })

            $('a.pop_follow').on('click',  function(e){
              e.preventDefault();
              *//*if(!auth_dialog.isLogged()){
               auth_dialog.open('#login');
               return;
               }*//*
              var self = $(this),
                mtype = $(this).data('mtype'),
                cid=$(this).data('cid');
              $.ajax({
                type: 'GET',
                url: CONTEXTPATH + '/user/'+ mtype +'?companyId='+ cid,
                dataType: 'json',
                success: function(ret){
                  ret = ret || {};
                  //console.log(1)
                  if(ret.rescode == 1011){
                    auth_dialog.open('#login');
                  }else if(ret.rescode == '1'){
                    if("follow.json" == mtype){
                      self.data('mtype','cancelfollow.json');
                      self.data('hadAttention', 'yes').html('<i class="ok_s"></i>已关注');
                      var createEmailDialog=require('c/company/email_dialog');
                      if(ret.isSubscribe==1){
                        createEmailDialog(result.isLogin);
                      }
                    }else if("cancelfollow.json" == mtype){
                      self.data('mtype','follow.json');
                      self.data('hadAttention', 'no').html('<i class="add_s"></i>关注');
                    }
                  }
                }
              });
            });
          }
        }
      }).init().submit(function() {
        var flag=true;
        //改成非登录情况下也校验邮箱是否存在
        //if(isLogin==1){
        var account= $.trim($('[name="email"]',dialog).val());
        $.ajax({
          url:'/account/checkAccountBind.json',
          async:false,
          type:'get',
          data:{
            account:account
          },
          success:function(result){
            var prompt=oEmail.siblings(".err");
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
      });*/

    /*//分享公司
     shareComments.build({
     selectors: 'a.share_co'
     });*/
  });
});