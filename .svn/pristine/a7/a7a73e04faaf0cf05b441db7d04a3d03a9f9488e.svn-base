define(['c/auth_dialog', 'c/widgets', 'u/chart', 'c/mini_search','u/validator','c/cube_ugc','c/seo/bottomlinks','c/ugc/company_correction', 'comp/floatword/floatword'], function(auth_dialog){
	$(function(){

    $('#joblistCity, input[name=search_name], input[name=job_name]').placeholder();

		var browseinterrupt = $('#browseinterrupt');
		if(browseinterrupt.length && !!browseinterrupt.val()){
			$.maskUI.open({
				elem: 'breakDialog'
			});

			$('#breakDialog').on('click', 'p>a', function(e){
				e.preventDefault();
				$.get(CONTEXTPATH + '/cc/browseinter.json');
				var url = $(this).attr('href');
				if(url === '#'){
					$.maskUI.close();
				}else{
					window.location.href = url;
				}
			});
		}

    //固定公司导航
    var fixedCoNav = $('#fixedCoNav');
    if(fixedCoNav.length){
      var f_n_s = setTimeout(function(){
        var navPos = fixedCoNav.offset().top + 300;
        $(window).on('scroll', function(){
          var st = $(document).scrollTop();
          if(st > navPos){
            fixedCoNav.addClass('fixed_nav');
          }else{
            fixedCoNav.removeClass('fixed_nav');
          }
        });
      }, 1000);
    }

    $('span#fixedcmpname').click(function(){
      $("html,body").animate({scrollTop: 0}, 200);
    })

		//post comments
		var companyName = $('#companyName').html(),
			reviewSource = ['看准评论用户 ', companyName+'员工的点评', '网友对'+companyName+'工资的印象', '面试'+companyName+'的{0}', '网友对'+companyName+'环境照片的印象'],
			reviewIcon = ['c', 'r', 'm', 'i', 'p'],  //对应的icon 聊 评 ￥ 面 图
			shortViewContent = $('#shortViewContent'),
			reviewPrompt = $('#shortViewPrompt');


		$('#shortreviewForm').ajaxForm({
			selector: 'input:text, input:hidden, textarea',
			validate: function(components){
				if($.trim(shortViewContent.val()) === ''){
					shortViewContent.addClass('shine');
					return false;
				}else{
					return true;
				}
			},
      dataType: 'html',
			beforeSend: function(){
				shortViewContent.val('');
				reviewPrompt.html('您还可以输入<strong class="ok">140</strong>字');
			},
			success: function(ret, components){
				if(ret){
				  $('#reviewsWrapper').prepend(ret);
				}
			}
		});
		
		//enter a message
		shortViewContent.on('keyup', function(e){
			e.stopPropagation();
			var remain = this.value.length - 140;
		if(remain <= 0){
				reviewPrompt.html('您还可以输入<strong class="ok">' + Math.abs(remain) + '</strong>字');
				$('#shortreviewForm input[type=submit]').prop('disabled', false);
			}else{
				reviewPrompt.html('您已超出输入<strong class="err">' + remain + '</strong>字');
				$('#shortreviewForm input[type=submit]').prop('disabled', true);
			}
		});

		shortViewContent.on('animationend webkitAnimationEnd', function(){
			shortViewContent.removeClass('shine');
		});



		//more shortreviews
		var moreReviewsForm = $('#moreReviewsForm');
			moreLoading = moreReviewsForm.find('p.loading'),
			moreLastId = moreReviewsForm.find('input[name=lastId]');
		moreReviewsForm.ajaxForm({
			selector: 'input:hidden',
      dataType: 'html',
			beforeSend: function(components){
        $('#fetchMoreReviews').hide();
				moreLoading.show();
			},

			success: function(ret, components){
				if(ret){
					var form = $(this);
					var fromImage = moreReviewsForm.data('fromImage');
					if(fromImage){
						$('#reviewsWrapper').html('');
					}

					moreLoading.hide();

					$('#reviewsWrapper').append(ret);
          $('#fetchMoreReviews').remove();
					
					moreReviewsForm.removeData('fromImage');
          moreLastId.val($('#fetchMoreReviews input').data('lid'));
				}
			},
			error: function(){
				moreReviewsForm.removeData('fromImage');
        $('#fetchMoreReviews').show();
				moreLoading.hide();
			}
		});

		//随便说所 有用
    $('#reviewsWrapper').upOrDown({
        url: CONTEXTPATH +'/shortreview/',
        delegate: 'a.mark',
        data: function(){
            return {
                shortreviewId: this.data('pid')
            };
        },
        callback: function(ret){
            var mtype = this.data('mtype');
            if(ret && ret.rescode == '1'){
                var num = this.find('i');
                this.addClass('marked');
                num.html((parseInt(num.html(), 10) || 0) + 1);

                this.siblings('a.mark').addClass('marked').data('mtype', null);
                var floatword = require('comp/floatword/floatword');
                floatword({
                  cfw: this,
                  color: '#5fb86f'
                })
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

		//关注与收藏
		$('a.attention_collection').hover(function(){
			if( $(this).data('hadattention') == 'yes' ){
				if( $(this).data('differ') == 'yes' ){
					$(this).html('取消收藏');
				}else {
					$(this).html('取消关注<span></span>');
				}
				
			}
		}, function(){
			if( $(this).data('hadattention') == 'yes' ){
				if( $(this).data('differ') == 'yes' ){
					$(this).html('已收藏');
				}else {
					$(this).html('<!--<i class="ok_s"></i>-->已关注<span></span>');
				}
			}
		})
		
		$('a.attention_collection').on('click',  function(e){
			e.preventDefault();
			/*if(!auth_dialog.isLogged()){
			 auth_dialog.open('#login');
			 return;
			 }*/
			var self = $(this),
					mtype = $(this).data('mtype'),
					cid=$(this).data('cid');
			$.ajax({
				type: 'GET',
				url: CONTEXTPATH + '/user/'+ mtype +'?companyId='+ cid,
				dataType: 'json',
				success: function(ret){
					ret = ret || {};
					$.each($('a.attention_collection'), function(i, v){
						//console.log(1)
						var differ = $(v).data('differ');
						if(ret.rescode == 1011){
							auth_dialog.open('#login');
						}else if(ret.rescode == '1'){
							if("follow.json" == mtype){
								$(v).data('mtype','cancelfollow.json');
								if( differ == 'yes' ){
									$(v).data('hadattention', 'yes').html('已收藏');
								}else {
									$(v).data('hadattention', 'yes').html('<!--<i class="ok_s"></i>-->已关注<span></span>');
								}
								var createEmailDialog=require('c/company/email_dialog');
								if(ret.isSubscribe==1){
									createEmailDialog(ret.isLogin,cid);
								}
							}else if("cancelfollow.json" == mtype){
								$(v).data('mtype','follow.json');
								if( differ == 'yes' ){
									$(v).data('hadattention', 'no').html('+&nbsp;收藏该公司');
								}else {
									$(v).data('hadattention', 'no').html('<!--<i class="add_s"></i>-->关注<span></span>');
								}
							}
						}
					})	
				}
			});
		});
	
		//关注该公司的还关注了
		$('div.attention_option').on('click', 'a', function(){
			var $self = $(this);
			if($self.hasClass('noclick')){
				return false;
			}

			if( $self.siblings('a').hasClass('noclick') ){
				$self.siblings('a').removeClass('noclick').addClass('current');
				$self.removeClass('current').addClass('noclick');
			}
			
			var aOindex = $self.index();
			if ($.support.css3Property('transition')) {
			  $('div.attention_content_box div').css({'left': -272 * aOindex + 'px'});
			} else {
			  $('div.attention_content_box div').animate({'left': -272 * aOindex}, 200);
			}
		});

		//老式placeholder
		$('input').placeholderFocus();
	});
});