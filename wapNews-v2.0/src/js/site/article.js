require.config({
  paths: {
    u: '../utils',
    s: '.'
  }
});
require(['s/module/slideMenu', 's/module/markIt','s/module/comment', 's/module/share'], function(){

  //点赞
  $.markIt({
    propagation: $('ul.click'), //事件冒泡的位置,默认事件绑定在body
    delegate: 'li.useful', //触发事件的element
    count: 'em', //显示数目的elment
    url: '/news/newsuseful.json', //ajax url
    data: {
      newsId: $('input[name=newsId]').val()
    }
  });

  //评论
  var comment = require('s/module/comment');
  var newsId = $('input[name=newsId]').val();
  comment({
    prompt: 'span.cmt_w',
    submitBtn: 'input.pub_cmt',
    mainContext: $('#commentPanel'),
    listContext: $('#listPanel'),
    url: '/news/newscomment/publish.json',
    data: function(val){
      return {
        originId: $('input[name=originId]').val(),
        type: $('input[name=type]').val(),
        parentId: this.data('pid') || $('input[name=parentId]').val(),
        parentFloor: this.data('pnum') || $('input[name=parentFloor]').val(),
        commentContent: val,
        newsId: newsId
      }
    },
    delUrl: '/news/newscomment/delete.json',
    delData: function(){
      return {
        newsId: newsId,
        commentId: this.data('pid')
      }
    },
    replyHTML: function(){
      return '<div class="reply"><textarea name="shortviewcontent" placeholder="回复" rows="3" class="content_ipt"></textarea>' +
        '<p class="t-right"><b class="red mr20 hidden">发布失败:-(</b><a href="javascript:;" class="cancel_reply">取消</a><span class="cmt_w">您还可以输入<strong class="ok">140</strong>字</span>' +
        '<input type="button" class="pub_cmt" value="回复" data-pid="'+ this.data('pid') +'" data-pnum="'+ this.data('pnum') +'"></p></div>';
    },
    moreBtn: '#more_cmts',
    moreUrl: '/news/newscomment/listmore.json',
    moreData: function(){
      return {
        type: $('input[name=type]').val(),
        originId: $('input[name=originId]').val(),
        lastId: this.data('lid'),
        newsId: newsId
      }
    },
    loading: $('#cmtsLoading')
  });


  //share
  var share = require('s/module/share');
  share({
    shareText: $('#shareTextHid').val(),
    sharePic: $('#shareImgHid').val()
  });

  $('ul.click li:last').on('click', function(){
    $('div.bdsharebuttonbox').show();
  });

});

