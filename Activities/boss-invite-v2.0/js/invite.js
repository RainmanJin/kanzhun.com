$(function(){
  var mySwiper = new Swiper('.swiper-container',{
    paginationClickable: true,
    mode: 'vertical',
    moveStartThreshold: 30,
    speed: 1e3,
    onSlideChangeEnd:function(swiper){
      var index=swiper.activeIndex;
      if(index==1){
        //$('#page2 .content li').addClass('animated fadeInUp');
        var page2=$('#page2');
        $('.c1 .p p',page2).addClass('animated fadeInLeft');
        $('.people_1',page2).addClass('animated bounceInLeft');
        $('.icon_1',page2).addClass('animated bounceInRight');
      }else if(index==2){
        var page3=$('#page3');
        $('.c1 .p p',page3).addClass('animated bounceInDown');
        $('.people_2',page3).addClass('animated bounceInRight');
      }else if(index==3){
        var page4=$('#page4');
        $('.c1 p',page4).addClass('animated tada');
        $('.people_3',page4).addClass('animated bounceInLeft');
        $('.c2 .circle',page4).addClass('animated rotateIn');
      }else if(index==4){
        var page5=$('#page5');
        $('.p1',page5).addClass('animated swing');
        $('.people_4',page5).addClass('animated bounceInLeft');
        $('.people_5',page5).addClass('animated bounceInRight');
      }
    }
  });
})