/**
 * Created by zcy on 2015/3/23.
 */
    $(function(){

        var type,reason,relation;

        $("ul.items li,ul.cause li,span.role").bind("click",function(){

            $(this).siblings().removeClass("actived");
            $(this).addClass("actived");

            if($(this).attr("data-type") == 1){
                $("span.tip").eq(0).css("visibility","hidden");
                $("ul.cause").eq($(this).index()).css("display","block").siblings(".cause").hide();
                type = $(this).attr("data-value");

            }else if($(this).attr("data-type") == 2){
                $("span.tip").eq(1).css("visibility","hidden");
                reason = $(this).attr("data-value");
            }else if($(this).attr("data-type") == 3){
                $("span.tip").eq(3).css("visibility","hidden");
                relation = $(this).attr("data-value");
            }
        });

        $("#submit").bind("click",function(){
            if(type == undefined){
                $("span.tip").eq(0).css("visibility","visible")
                return false;
            }

            if(reason == undefined){
                $("span.tip").eq(1).css("visibility","visible");
                return false;
            }

            if($.trim($("#view").val()) == ""){
                $("#view").css("border","1px solid red");
                $("span.tip").eq(2).css("visibility","visible");
                return false;
            }

            if(relation == undefined){
                $("span.tip").eq(3).css("visibility","visible");
                return false;
            }
        });

        $("#view").bind("focus",function(){

            $(this).css("border","1px solid");
            $("span.tip").eq(2).css("visibility","hidden");
        });
    });



