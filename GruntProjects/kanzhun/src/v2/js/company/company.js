require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
  }
});

require(['c/auth_dialog', 'c/user_response', 'c/general', 'c/company_common', 'c/company/salary_desc','comp/slides/jquery.slides','comp/toggler/toggler'], function(auth_dialog, user_response){
	$(function(){

		//发照片
		$('div.cmphoto').hover(function(){
			$(this).find('.sendphoto').css("display","block");
		},function(){
			$(this).find('.sendphoto').css("display","none");
		});

		$('span.more').showMore();

    $('dl.co_tb').on('click', 'p>img', function(){
      $(this).parent().parent().find('div>img').attr('src', $(this).data('orig'));
    });

    $('#reviewBrief').upOrDown({
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

    $('#interBrief').upOrDown({
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
          this.data('mtype', null);
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

    //工资图表
    /*
    var salaryDesc = require('c/company/salary_desc');
    salaryDesc({
      table: $('#salaryDescTable')
    });
    */


    //share
    /*
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share_co'
    });
    */

    //增加加班，年薪，奖金什么的
    var tovertime = $('#js_overtime'),
        overtime = $('div.overtime');
    if(tovertime.height() > 45) {
      overtime.find('a').removeClass('none');
    }
    overtime.on('click', 'a', function(){
      if(overtime.height() <= 45) {
        $(this).html('收起<i class="putaway"></i>');
        overtime.height(tovertime.height());
      }else {
        $(this).html('展开<i class="open"></i>');
        overtime.height(39);
      }
    });

    //点评--start
    //显示点评分数详情
    var popNone;
    $('.js_bt_showCgd').on('mouseenter', function(){
      clearTimeout(popNone);
      $('.co_grade_detail').removeClass('none');
    }).on('mouseleave', function(){
      popNone = setTimeout(function(){
        $('.co_grade_detail').addClass('none');
      }, 400)
    });
    //canvas  charts
    $('div.co_grade canvas.reviewsDoughnutChart').doughnutChart({
      colors: ['#7cb228', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 6
    });
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
    //点评--end

    //面试--start
    //canvas  charts
    //面试难度
    var ivGrade=$('div.iv_grade');
    $('canvas.reviewsDoughnutChart',ivGrade).doughnutChart({
      colors: ['#f68121', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 10
    });

    //面试整体感受
    $('canvas.reviewsPieChart',ivGrade).pieChart({
      colors: ['#7cb228', '#abd667', '#ededed'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
    });

    //如何获得面试机会率
    $('canvas.reviewsFromPieChart',ivGrade).pieChart({
      colors: ['#a7dbff', '#16b6cc', '#05c1f1', '#0ca6f0', '#147cde', '#0870c9'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
    });
    //如何获得面试机会率 展开
    var toggler = require('comp/toggler/toggler');
    toggler({
      el: $('#moreChartInfo'),
      on: function(){
        this.parent().siblings('p').slice(3, 6).removeClass('none');
      },
      off: function(){
        this.parent().siblings('p').slice(3, 6).addClass('none');
      }
    });
    //点评--end

    //发展历程展开收起
    toggler({
      el: $('#moreProcessPart'),
      on: function(){
        this.parent().find('dl dd.more').show();
      },
      off: function(){
        this.parent().find('dl dd.more').hide();
      }
    });

    if($('#slides >div').length>1) {
      $("#slides").slidesjs({
        width: 680,
        height: 300,
        navigation: {
          active: false
        },
        play: {
          auto: true,
          interval: 4000,
          swap: false
        }
      });
    }
    //textarea点击时跳转
    $('.js_textarea_enter').on('click',function(){
      location.href=$(this).data('url');
    });
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

    //右侧调查
    var  wantPart=$('#want_part');
    wantPart.on('click','a',function(){
      var _t=$(this),
          url=_t.parent().data('url'),
          type=_t.data('type-str');
      $.ajax({
        url:url,
        data:{
          type:type
        },
        success:function(result){
          if(result.rescode==1){
            wantPart.find('.wp_c').hide().parent().find('.wp_ok').show();
            wantPart.fadeOut(2000);
          }
        }
      });
    });

    var hrEnterPart=$('div.hrEnter_part');
    hrEnterPart.on('click','a.bt_close',function(){
      hrEnterPart.remove();
      $.ajax({
        url:"/company/hrlockNoticeClose.json"
      });
    })
	});
});