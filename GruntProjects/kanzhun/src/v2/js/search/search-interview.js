require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    v2: 'v2/js'
  }
});

require(['c/auth_dialog', 'v2/search/search-left-filter', 'c/user_response', 'comp/floatword/floatword', 'c/mini_search', 'c/seo/bottomlinks'], function(auth_dialog){
  $(function(){

    //面经列表 有用
    var floatword = require('comp/floatword/floatword');
    $('#searchInterviewList').upOrDown({
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

    //评论
    var user_response = require('c/user_response');
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
        $('#shareTextHid').val($(this).data('desc') +'，快来看看吧！http://'+ window.location.host + $(this).data('url') +' #看准网#@看准 ');
      }
    });
  });
});