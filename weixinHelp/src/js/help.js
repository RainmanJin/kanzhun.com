$(function(){
	$(".js_goBack").on("click",function(e){
    e.stopPropagation();
		if(document.referrer.length>0){
			history.back();
		}else{
		  //location.href="/zs";
		}
  });

  var slideSelecteWrapper = $('section.slide_select_wrap'),
    slideSelecte = $('div.slide_select'),
    screenH = $(window).height(),
    conH = $('section.container').height();
  slideSelecteWrapper.css('height', (conH > screenH ? conH: screenH));
  $('.js_select_slide').on("click",function(){
  	var _type=$(this).data("type");
		slideSelecteWrapper.css('display', 'block');
		$("#"+_type).show().siblings().hide();
		setTimeout(function(){
			slideSelecte.addClass('mask');
		},100);
  });
  slideSelecte.on('touchstart', 'li', function(){
    $(this).addClass('on').siblings().removeClass('on');
  }).on('click', function(){
    slideSelecte.removeClass('mask');
    setTimeout(function(){
      slideSelecteWrapper.css('display', 'none');
    }, 300);
  });

	var footNav=$("#footer_nav"),
			fn_comboBox=$(".comboBox",footNav),
			fn_back=$(".back",footNav),
			fn_nav_r=$(".f_nav_r",footNav),
			pL=fn_back.width()+(fn_nav_r.width()/4-fn_comboBox.width()/2);
			fn_comboBox.css({left:pL});
	footNav.on("click",".js_interview_bt",function(e){
		e.stopPropagation();
		if(fn_comboBox.is(":hidden")){
			fn_comboBox.show();
			$(document).one("click",function(){
				fn_comboBox.hide();
			})			
		}else{
			fn_comboBox.hide();
		}
	});

	//有用
	$("body").on("click",".js_useful",function(){
		var _t=$(this);
		_t.removeClass("js_useful bt_transmit").addClass('grey');
		var count=parseInt($("em",_t).html())+1;
		$("i",_t).removeClass("i_hand").addClass("i_hand_grey");
		$("em",_t).html(count);
		$.ajax({
			url:_t.data("url")
		});
	});

	if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    $(document).on('focus', 'input, textarea', function() {
      $('#footer_nav').hide()
    });
    $(document).on('blur', 'input, textarea', function() {
      $('#footer_nav').show();
    });
	}
});
//加载更多
$(function(){
	function more(pages){
		var oResult=$("#more_result");
		var	more=oResult.data("more");
		if(more=="false"){
			more=false;
			return;
		}else{
			more=true;
		}
		var url=oResult.data("url");
		var page=page||2;
		var timer;
		var isAjax=0;
		$(window).on("scroll",function(){
			//loadMore();
			//延时处理可以去掉
			if(timer){
				clearTimeout(timer);
				timer=null;
			}
			timer=setTimeout(function(){
				loadMore();
			},200);
		})
		function loadMore(){
			//if(page>pages||!more){
			if(!more){
				return;
			}
      var oResult=$("#more_result");
			var wH=$(window).height();
			var sT=$(window).scrollTop();
			var sH=$(document).height();
			if(wH+sT>=sH){
				if(isAjax){
					return;
				}
				isAjax=1;
				$.ajax({
					url:oResult.data("url")+page,
					dataType:"json",
					beforeSend:function(){
						$("#more").show();
					},
					success:function(result){
						$("#more").hide();
						oResult.append(result.html);
						more=result.more;
						page=result.nextPage;
						isAjax=0;
					},
					error:function(){
						isAjax=0;
					}
				});
			}
		}
	}
	more();    	
});