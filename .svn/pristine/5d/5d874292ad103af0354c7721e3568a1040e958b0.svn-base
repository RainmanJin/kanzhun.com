require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});

require(['c/auth_dialog', 'c/user_response', 'c/general', 'c/company_common'], function (auth_dialog, user_response) {
  $(function () {
    var sForm = $('#searchForm'),
      pagenum = sForm.find('input[name=pagenum]'),
      cityCode = sForm.find('input[name=cityCode]'),
      jobTitle = sForm.find('input[name=jobTitle]');
    $('#viewCitySelect').DIYSelect({
//			listCallback: function(){
//				pagenum.val('1');
//				jobTitle.val('');
//				cityCode.val($(this).data('cid'));
//				sForm.submit();
//			}
      keepDefault: true
    });

    //直接点击按钮 清空citycode
    $('#viewSearchBtn').on('click', function (e) {
      e.preventDefault();
      cityCode.val('');
      sForm.submit();
    });

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

    //有用没用
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


    //canvas  charts
    $('canvas.reviewsDoughnutChart').doughnutChart({
      colors: ['#f68121', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 10
    });

    $('canvas.reviewsDoughnutChart', '#reviewPage').doughnutChart({
      colors: ['#7cb228', '#ededed'],
      centerColor: '#ffffff',
      borderWidth: 6
    });

    $('canvas.reviewsPieChart').pieChart({
      colors: ['#7cb228', '#abd667', '#ededed'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
    });


    $('canvas.reviewsFromPieChart').pieChart({
      colors: ['#a7dbff', '#16b6cc', '#05c1f1', '#0ca6f0', '#147cde', '#0870c9'],
      borderWidth: 0,
      borderColor: '#7cb228',
      centerColor: '#ffffff',
      centerDistance: 10
    });

    $('#moreChartInfo').click(function(){
      var $this = $(this);
      if(!$this.hasClass('active')){
        $this.html('收起<i></i>').addClass('active').parent().siblings('p').slice(3, 6).removeClass('none');
      }else{
        $this.html('展开<i></i>').removeClass('active').parent().siblings('p').slice(3, 6).addClass('none');
      }
    });


    //job title show nologin
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
    }).on('click', 'a.btn_o_s', function (e) {
      e.preventDefault();
      auth_dialog.open($(this).attr('href'));
    });


    //useful + reply + share
    user_response.comment({
      delegate: $('#reviewPage, #interviewPage'),
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

    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share',
      config: function(){
        $('#shareTextHid').val('有人点评了【'+ $('#companyName').html() +'】，说这里“'+ $(this).data('desc') +'”，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
      }
    });

    /*//分享公司
    shareComments.build({
      selectors: 'a.share_co'
    });*/

    //展开收起
    $('div#hotjobs').on('click', 'a.options', function() {
      var con = $(this).text();
      //alert(con);
      if (con == '展开'){
        $('li.morejobs').slideDown('fast');
        $(this).html('收起<i class="toggles"></i>');
      }else {
        $('li.morejobs').slideUp('slow');
        $(this).html('展开<i></i>');
      }
    });
    
    //面试感受
    $('#interviewAllRet').on('click', 'dt', function(e){
      e.preventDefault();
      e.stopPropagation();

      $(document).one('click', function () {
        $('#interviewAllRet dd').addClass('none');
        $('#interviewAllRet dt i').removeClass('rotate_jiao');
      });

      $(this).next('dd').toggleClass('none').end().find('i').toggleClass('rotate_jiao');

    }).on('click', 'dd', function(e){
      e.stopPropagation();
    });

   
  });
});

