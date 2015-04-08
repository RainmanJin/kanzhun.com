/**
 * Created by zhuchongyue on 2015/3/13.
 */
$(function(){
    var mySwiper = new Swiper('.swiper-container',{
        paginationClickable: true,
        mode: 'vertical',
        moveStartThreshold: 30,
        speed: 1e3,
        onSlideChangeEnd:function(swiper){
            var index=swiper.activeIndex;
            if(index==0){

            }
            else if(index==1){

            }
            else{

            }
        }
    });
});