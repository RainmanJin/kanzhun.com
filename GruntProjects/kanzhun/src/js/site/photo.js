require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components'
    }
});

require(['c/auth_dialog', 'c/user_response', 'c/general', 'u/slideView', 'c/company_common'], function(auth_dialog, user_response){
	$(function(){

		//gallery
		$('#companyGallery').slideView({
			prev: 'a.prev',
			next: 'a.next',
			thumbWrapper: 'div.list_w>ul',
			thumb: 'li',
			original: 'figure li',
			originalWrapper: 'figure>ul',
			callbacks: {
				thumbWrapper: function(original){
					var moreReviewsForm = $('#moreReviewsForm');
					$('input[name=originId]').val(original.find('img').data('pid'));
					moreReviewsForm.data('fromImage','img').trigger('submit');

          $('#shareDialog').hide();
				}
			}
		});

		//select
		$('#photosCitySelect').DIYSelect({
			keepDefault: true
		});

		//mark for images
		$('#companyGallery figure').upOrDown({
			url: CONTEXTPATH +'/photo/',
			delegate: 'a.mark',
			data: function(){
				return {
					photoId: this.data('pid')
				}
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


    //share
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share',
      config: function(){
        var current = $('#companyGallery figure li.current img');
        $('#shareImgHid').val(current.attr('src'));
        $('#shareTextHid').val('有人分享了【'+ $('#companyName').html() +'】的公司内部照片，快来看看吧！http://'+ window.location.host + current.data('url') +' #看准网#@看准 ');
      }
    });

    //分享公司
    shareComments.build({
      selectors: 'a.share_co'
    });
	});
});