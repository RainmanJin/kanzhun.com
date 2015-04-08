require.config({
	baseUrl: '/js/site',
  paths: {
    u: '../utils',
    s: '.'
  }
});
require(['s/module/comment','s/company/general'], function(comment){
	$(function(){
		//评论
		var companyId = $('input[name=companyId]').val();
		comment({
		  prompt: 'span.cmt_w',
		  submitBtn: 'input.pub_cmt',
		  mainContext: $('#commentPanel'),
		  listContext: $('#listPanel'),
		  url: '/shortreview/publish.json',
		  data: function(val){
		    return {
		    	companyId: companyId,
		    	content: val,
		      originId: $('input[name=originId]').val(),
		      type: $('input[name=type]').val(),
		      parentId: this.data('pid') || $('input[name=parentId]').val(),
		      parentFloor: this.data('pnum') || $('input[name=parentFloor]').val(),
		    }
		  },
		  delUrl: '/shortreview/delete.json',
		  delData: function(){
		    return {
		      /*newsId: newsId,*/
		      commentId: this.data('pid')
		    }
		  },
		  replyHTML: function(){
		    return '<div class="reply"><textarea name="shortviewcontent" placeholder="回复" rows="3" class="content_ipt"></textarea>' +
		      '<p class="t-right"><b class="red mr20 hidden">发布失败:-(</b><a href="javascript:;" class="cancel_reply">取消</a><span class="cmt_w">您还可以输入<strong class="ok">140</strong>字</span>' +
		      '<input type="button" class="pub_cmt" value="回复" data-pid="'+ this.data('pid') +'" data-pnum="'+ this.data('pnum') +'"></p></div>';
		  },
		  moreBtn: '#more_cmts',
		  moreUrl: ' /shortreview/listmore.json',
		  moreData: function(){
		    return {
		      type: $('input[name=type]').val(),
		      originId: $('input[name=originId]').val(),
		      companyId: companyId,
		      lastId: this.data('lid')
		    }
		  },
		  loading: $('#cmtsLoading'),
			callback:function(){
				if( !$.readCookie('pops') ) {
					if( !isLogged ){
						$.maskUI.config = {
							wrap: '<section class="maskui_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close"></a>{1}</div></section>',
							confirm: '<h1>提示</h1><div class="dialog_ac">想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><ul class="news_btn"><li><a href="javascript:;" class="maskui_close dialog_btn">不感兴趣</a></li><li><a href="/login/" class="dialog_btn green">立即登录</a></li></ul></div>'
						};
						$.maskUI.confirm({});
						$.writeCookie('pops', '1');
					}
				}
			}
		});

	});
});