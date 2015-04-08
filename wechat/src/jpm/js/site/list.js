/**
 * Created by zcy on 2015/3/30.
 */

$(function(){

    var floatword = (function(){
        return function(options){
            var o = $.extend({}, {
                cfw: '',
                color: '#2582cf'

            }, options);

            var effect = $('<b style="color:' + o.color+ '">+1</b>');
            o.cfw.append(effect);
            effect.animate({'top': -50, 'opacity': 0, 'font-size': '40px','left':-10}, 1000, function(){
                effect.remove();
                o.cfw.removeClass("default").addClass("past");
                o.cfw.html("明天<br>再来");
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
            effect.animate({'top': -50, 'opacity': 0, 'font-size': '40px'}, 400, function(){
                effect.remove();
            });
        }
    })();


    var prizeId = $("#curPrizeId").val();

    $("#companyList").on("click",".default",function(){

        var companyId = $(this).closest("dd").attr("data-company-id");

        var _this = $(this);

        $.post("/activity/jinpingmei/onlist.json",
            {
                companyId:companyId,
                prizeId:prizeId
            },function(data){
                if(data.rescode == 1){
                    var $count = _this.siblings("span.count");
                    $count.html(parseInt($count.html())+1);
                    floatword({ cfw: _this });

                }
            });

    });



    function share(target, msg, callback){
        $('body').append(
            '<div class="mask" id="wxMask">'+
            '<div class="transmitDialog" id="transmitDialog"><p>' +
            msg +
            '</p><i class="arrows"></i></div></div>');

        var mask = $('#wxMask'),dialog = $('#transmitDialog');

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

    share($("#shareWx"),"立即分享，呼唤小伙伴来围观榜单");
    var prizeId = $("#curPrizeId").val();

    $("#companyNameSuggest").autocomplete({
        containerClass: 'autocomplete-suggestions cmp_select',
        serviceUrl: '/activity/jinpingmei/company.json?prizeId='+prizeId,
        paramName: 'q',
        dataType: 'json',
        transformResult: function (response) {
            return {
                suggestions: $.map(response.suggestions, function (dataItem) {
                    var arr = dataItem.data.split('|');
                    return { value: arr[0], data: arr[1], num: arr[2], logo: dataItem.logo, industry : dataItem.industry,city :dataItem.city };
                })
            };
        },
        onSelect: function (suggestion) {
            $("#encryptCompId").val(suggestion.data);

            window.location.href = "/activity/jinpingmei/company/"+suggestion.data+"/?prizeId="+prizeId;
        }
    });

    window.shareCallback = function(){
        $('#wxMask').trigger("click");
    }
});