define(['s/widgets','s/common','u/iscroll-lite'], function(){
	$(function(){
		//iscroll
		/*
		index是滚动条的x轴的起始位置
		*/

		$.initMenuScroll = function(index) {
			if (document.querySelector('section.menu')) {

				var myScroll = new IScroll('#companyMenu', {
					scrollX: true,
					scrollY: false,
					mouseWheel: false,
					preventDefault: false,
					startX: -56 * index || 0,
					eventPassthrough: true
				});
				/*
				myScroll = new IScroll('#companyMenu', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
				*/
				document.querySelector('.menu a.moving').addEventListener('click', function(e) {
					e.preventDefault();
					myScroll.scrollTo(myScroll.x - 50, 0, 600, IScroll.utils.ease.quadratic);
				}, false);
			}
		};
		$.initMenuScroll(0||parseInt($('body').data('iscroll-index')));

		//有用(赞)
		(function() {
			$("body").on("click", ".js_useful", function() {
				var _this = $(this);
				if (_this.attr("rel") == "nofollow") {
					return;
				}

				_this.find("i").removeClass("i_mark_h").addClass("i_mark");
				_this.attr("rel", "nofollow");

				var sid = _this.attr("data-sid");
				var url = _this.attr("data-url");
				var type = _this.attr("data-type");
				var data = "";
				if (type == "interview") {
					data += "interviewId=" + sid;
					var num = parseInt(_this.find("span").html());
					_this.find("span").html(num + 1);
				} else if (type == "review") {
					data += "reviewId=" + sid;
					var num = parseInt(_this.find("span").html());
					_this.find("span").html(num + 1);
				} else if (type == "photo") {
					data += "photoId=" + sid;
					var num = parseInt(_this.find("span").html());
					_this.find("span").html(num + 1);
				} else if (type == "salary") {
					data += "salaryId=" + sid;
					var num = parseInt(_this.find("span").html());
					_this.find("span").html(num + 1);
				}
				$.ajax({
					url: url,
					data: data,
					success: function(result) {}
				});

				if( !$.readCookie('pops') ) {
					if( type == "interview" || type == "review" ){
						if( !isLogged ){
							$.maskUI.config = {
								wrap: '<section class="maskui_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close"></a>{1}</div></section>',
								confirm: '<h1>提示</h1><div class="dialog_ac">想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><ul class="news_btn"><li><a href="javascript:;" class="maskui_close dialog_btn">不感兴趣</a></li><li><a href="/login/" class="dialog_btn green">立即登录</a></li></ul></div>'
							}

							$.maskUI.confirm({});
						}
						$.writeCookie('pops', '1');
					}
				}
			});
		})();

		//关注公司
		(function() {
			if ($(".js_focus")[0]) {
				var oFocus=$('.js_focus[data-action-type=focus]');
				var oHasfocus=$('.js_focus[data-action-type=hasfocus]');
				oFocus.bind("click", function() {
					var _this = $(this);
					var companyId = _this.attr("companyId");
					$.ajax({
						url: "/company/dofocus.json",
						data: {
							companyId: companyId
						},
						dataType: "json",
						success: function(result) {
							if (result.rescode == 1) {
								oFocus.hide();
								oHasfocus.show();
							} else if (result.rescode == 0) {
								alert("失败");
							} else if (result.rescode == 1011) {
								location.href = "/login/";
							}
						}
					});
				});
				oHasfocus.bind("click", function() {
					var _this = $(this);
					var companyId = _this.attr("companyId");
					$.ajax({
						url: "/company/unfocus.json",
						data: {
							companyId: companyId
						},
						success: function(result) {
							if (result.rescode == 1) {
								oHasfocus.hide();
								oFocus.show();
							} else if (result.rescode == 0) {
								alert("失败");
							} else if (result.rescode == 1011) {
								location.href = "/login/";
							}
						}
					});
				});

			}
		})();

		$(function(){
			var send_prompt = $('a.send_manages').find('span');
			setTimeout(function(){
				send_prompt.fadeOut();
			}, 3000);
		});

	});
});