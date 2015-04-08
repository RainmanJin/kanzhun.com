$(function(){
  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    moveStartThreshold: 30,
    speed: 1e3,
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      if(index==1){
        $('#page2 .content li').addClass('animated fadeInUp');
      }else if(index==2){
        $('#page3 .step>div').addClass('animated fadeInUp');
      }
    }
  });
})