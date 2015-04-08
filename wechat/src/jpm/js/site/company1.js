$(function(){

    function share(target,msg, callback){

        $('body').append(
            '<div class="mask" id="wxMask">'+
            '<div class="transmitDialog" id="transmitDialog"><p>' +
            msg +
            '</p><i class="arrows"></i></div></div>');

        var mask = $('#wxMask'),dialog = $('#transmitDialog');

        mask.show();
        dialog.show();

        if(target){
            target.on('click', function(e){
                e.preventDefault();
                mask.show();
                dialog.show();
            });
        }

        mask.on('click',function(e){
            mask.hide();
            dialog.hide();
        });

        if(callback){
            callback();
        }

        return {
            open: function(msg){
                $('#transmitDialog>p').html(msg)
                mask.show();
                dialog.show();
            },
            close: function(){
                mask.hide();
                dialog.hide();
            }
        }
    }

    window.shareCallback = function(){
        mask().close();
    }

    var floatword = (function(){
        return function(options){
            var o = $.extend({}, {
                cfw: '',
                color: '#2582cf'
            }, options);

            var effect = $('<b style="color:' + o.color+ '">+1</b>');
            o.cfw.append(effect);
            effect.animate({'top': -60, 'opacity': 0, 'font-size': '40px'}, 500, function(){
                effect.remove();
            });
        }
    })();

    var floatword1 = (function(){
        return function(options){
            var o = $.extend({}, {
                cfw: '',
                color: '#e77200'
            }, options);

            var effect = $('<b style="color:' + o.color+ '">-1</b>');
            o.cfw.append(effect);
            effect.animate({'top': -60, 'opacity': 0, 'font-size': '40px'}, 500, function(){
                effect.remove();
            });
        }
    })();


   /* var alias =  ['抠逼公司','苦命公司','撕逼公司','穷逼公司','压力山大的公司'];*/

    $("div.oper .single").on("click",function(){

        var _this = $(this);

        if($(this).html() == "拉票帮他"){
           // share($("div.oper .single"),"分享拉票，帮该公司洗污名");
            share(_this,"分享链接，求助更多小伙伴助它下榜");

           /* shareTitle = $("#companyName").val()+"上了"+prizeName+"榜，大家快来围观！";

            descContent =$("#industryName").val()+"行业传闻中著名的"+alias[parseInt($("#prizeId").val())-1]+"居然是"+$("#companyName")+"，你中招了吗？"*/
        }else{
            share(_this,"分享链接，求助更多小伙伴助它下（na）榜（jiang）");

            /*shareTitle = $("#companyName").val()+"上了"+prizeName+"榜，大家快来围观！";

            descContent ="没天理"+$("#companyName").val()+"公司居然被指认是"+alias[parseInt($("#prizeId").val())-1]+"，小伙伴们速来帮忙点踩";*/

        }
    });


    $("div.oper").on("click",".up",function(){

        var _this = $(this);

       $.post("/activity/jinpingmei/onlist.json",
            {
                companyId:$("#companyId").val(),
                prizeId:$("#prizeId").val()
            },function(data){
                if(data.rescode == 1){

                    floatword({ cfw: _this });

                    setTimeout(function(){
                        _this.closest(".oper").addClass("hide").siblings(".oper").removeClass("hide");
                        $("div.oper .single").html("分享链接");

                    },500);
                }else{
                    window.location.reload();
                }
            });

    });

    $("div.oper").on("click",".down",function(){
        var _this = $(this);

        $.post("/activity/jinpingmei/offlist.json",
            {
                companyId:$("#companyId").val(),
                prizeId:$("#prizeId").val()
            },function(data){
                if(data.rescode == 1){
                    floatword1({ cfw: _this });
                    setTimeout(function(){
                        _this.closest(".oper").addClass("hide").siblings(".oper").removeClass("hide");
                        $("div.oper .single").html("拉票帮他");

                    },500);

                }else{
                    window.location.reload();
                }
            });
    });



    $("div.more-wrap").on("click",function(){

        if($("div.rank-comment ul").attr("data-more") == "true"){

            var lastId = $("#lastId").val();
            $.ajax({
                url:"/activity/jinpingmei/reason.json?companyId="+$("#companyId").val()+"&prizeId="+$("#prizeId").val()+"&lastId="+lastId,
                dataType: "json",
                success: function (result) {
                    $("#lastId").val(result.lastId);
                    $("div.rank-comment ul").append(result.html);
                    if(!result.more){
                        $("div.more-wrap").addClass("hide");
                    }
                },
                error: function () {

                }
            });
        }
    });
    window.shareCallback = function(){
        $('#wxMask').trigger("click");
    }

});