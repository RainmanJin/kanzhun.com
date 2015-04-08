$(function(){
	//back
	if(document.querySelector('header.page_hd a.top_back')){
	    document.querySelector('header.page_hd a.top_back').onclick = function(e){
	        e.stopPropagation();
	        if(document.referrer.indexOf("/city")>0) {
	            history.go(-3);
	        }
	        else {
	           if(document.referrer.length>0){
	                history.back();
	           }else{
	                location.href="/";
	           }
	        }
	    };
	}
	$("#js_backTop").on("click",function(){
		$(window).scrollTop(0);
	});
	$("#js_topMenu").on("click",function(){
		$("#js_group").toggleClass("show");
	})

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
	}
})