$(function(){
	new Swiper(".swiper-container",{
		initialSlide: $("#pageCount").val() ? $("#pageCount").val() : 0,
		paginationClickable:!0,
		mode:"vertical",
		moveStartThreshold:30,
		speed:1e3,loop:!0
	})
});