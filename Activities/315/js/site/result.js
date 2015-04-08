/**
 * Created by zhuchongyue on 2015/3/13.
 */
$(function(){
    var per = 100;

    $(".progress .finish").each(function(i,val){
        $(val).width(per+'%');
        per-=10;
    });
    var infos = $("#pros .info");

    var len = infos.length,i=0;

    setTimeout(function(){
        $(infos[0]).css('opacity','1').addClass("animated bounceInRight");
    },100);

    setTimeout(function(){
        $(infos[1]).css('opacity','1').addClass("animated bounceInRight");
    },200);

    setTimeout(function(){
        $(infos[2]).css('opacity','1').addClass("animated bounceInRight");
    },300);

    setTimeout(function(){
        $(infos[3]).css('opacity','1').addClass("animated bounceInRight");
    },400);

    setTimeout(function(){
        $(infos[4]).css('opacity','1').addClass("animated bounceInRight");
    },500);

   setTimeout(function(){
        $("#obtain .name").addClass("name1");
    },1200);



});