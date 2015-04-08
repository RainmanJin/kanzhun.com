require.config({
  paths: {
    u: 'utils',
    s: 'site'
  }
});

require(['s/widgets', 's/module/markIt', 's/module/comment', 's/module/share'], function(){
  $(function(){
    //显示二维码
    $('#showTDCode').hover(function(){
      $(this).find('div').show();
    }, function(){
      $(this).find('div').hide();
    });


    //点赞
    $.markIt({
      propagation: $('div.c_share'), //事件冒泡的位置,默认事件绑定在body
      delegate: 'a.hasuse', //触发事件的element
      count: 'em', //显示数目的elment
      url: '/news/newsuseful.json', //ajax url
      data: {
        newsId: $('input[name=newsId]').val()
      },
      markClass: 'hasuse',
      markedClass: 'hasused',
      callback: function(){
        $(this).addClass('hasused');
        var effect = $('<b>+1</b>');
        $(this).append(effect);
        effect.animate({'top': -50, 'opacity': 0, 'font-size': '40px'}, 400, function(){
          $(this).remove();
        });
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
      url: CONTEXTPATH + '/newscomment/publish.json',
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
      delUrl: CONTEXTPATH + '/news/newscomment/delete.json',
      delData: function(){
        return {
          newsId: newsId,
          commentId: this.data('pid')
        }
      },
      replyHTML: function(){
        return '<div class="reply"><div><div><textarea class="content_ipt" name="commentContent" placeholder="回复"></textarea></div></div>' +
          '<p class="t-right clear"><b class="red mr20 none">发布失败:-(</b><span class="cmt_w mr10">您还可以输入<strong class="ok">140</strong>字</span>' +
          '<a href="javascript:;" class="cancel_reply mr20">取消</a>' +
          '<span class="option_sub"><input type="button" ka="print" class="pub_cmt" value="回复" data-pid="'+ this.data('pid') +'" data-pnum="'+ this.data('pnum') +'"></span></p></div>';
      },
      moreBtn: '#more_cmts',
      moreUrl: CONTEXTPATH + '/news/newscomment/listmore.json',
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
      shareText: $('#bdText').val(),
      sharePic: $('#bdPic').val()
    });
  });
});