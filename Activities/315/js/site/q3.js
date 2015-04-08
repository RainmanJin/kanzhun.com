/**
 * Created by zhuchongyue on 2015/3/13.
 */
$(function(){
    $('.btn').bind('click',function(){

        $(this).addClass("click").siblings().removeClass("click");
        $(window).scrollTop(200);
       var result = $(this).index() + 1;
        $('#hour')[0].value = result;
        $("#submit").removeAttr('disable');
    });
});