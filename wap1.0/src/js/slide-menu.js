$(function(){
	$('aside.slide_menu').on('touchstart', 'a', function(e){
		$(this).addClass('current').siblings('a').removeClass('current');
	});

	$('#container a.menu').on('click', function(e){
		e.preventDefault();
		$('.slide_menu').show();
		$('#container').toggleClass('show');
	});
});