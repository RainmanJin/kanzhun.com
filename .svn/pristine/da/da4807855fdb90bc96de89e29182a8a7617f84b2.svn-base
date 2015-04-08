define(['c/widgets'],function(){
    $(function(){
        var signObj = new Object();
            signObj.tags = [];
            signObj.aaa = "aaaaaaaa";

        function reset(){
            for(var pro in signObj){

                if(signObj[pro] instanceof Array){
                    signObj[pro] = [];
                }else{
                    signObj[pro] = undefined;
                }
            }
        }

        $('.bt_enter,.bt_other,a[data-type="sign"]').bind("click",function(){
            $.ajax({
                url:'/activity/jinpingmei/cansignup.json',
                success:function(result){
                    if(result.signup){
                        $.maskUI.open({
                            elem:$("#deliverResumePop"),
                            pos:'absolute'
                        })
                    }else{
                        $.maskUI.alert('报名次数已到！');
                    }
                }
            });
        });

        $(".quit").on("click",function(){
            $.maskUI.close();
        });

        $("ul.items li").bind("click",function(){

            $(this).siblings().removeClass("actived");
            $(this).addClass("actived");

            $("ul.cause").eq($(this).index()).siblings(".cause").children("li").removeClass("actived");
            signObj.tags = [];


            signObj.prizeId = $(this).attr("prizeId");
            $.post(CONTEXTPATH + "/activity/jinpingmei/signuprank.json",
                    {
                        companyId: signObj.companyId,
                        prizeId: signObj.prizeId
                    },
                    function(res){
                        $(".count").html(res.rank);
                        $("#adt").css("visibility","visible");
                        $(".reason_item").addClass("active");
                    });

                $("span.tip").eq(0).css("display","none");
                $("ul.cause").hide();
                $("ul.cause").eq($(this).index()).css("display","block");
                /*$("ul.cause").eq($(this).index()).css("display","block").siblings(".cause").hide();*/
        });




        $("ul.cause li").bind("click",function(){

            $(this).addClass("actived");
            $("span.tip").eq(1).css("display","none");
            signObj.tags.push($(this).index());
            reason = $(this).attr("data-value");

        });


        $("span.role").bind("click",function(){

            $(this).siblings().removeClass("actived");
            $(this).addClass("actived");
            signObj.userStatus = $(this).index();

            $("span.tip").eq(3).css("display","none");
            relation = $(this).attr("data-value");

        });

        $("#submit").bind("click",function(){
            if(signObj.prizeId == undefined){
                $("span.tip").eq(0).css("display","inline")
                return false;
            }
            if(!signObj.tags || !(signObj.tags.length > 0)){
                $("span.tip").eq(1).css("display","inline");
                return false;
            }
            if(!signObj.content){
                $("#view").css("border","1px solid red");
                $("span.tip").eq(2).css("display","inline");
                return false;
            }
            if(signObj.userStatus  == undefined){
                $("span.tip").eq(3).css("display","inline");
                return false;
            }

            $.post(CONTEXTPATH + "/activity/jinpingmei/signup.json",
                {
                    companyId: signObj.companyId,//公司ID
                    prizeId:signObj.prizeId,//奖项ID
                    content:signObj.content,// 内容
                    tag :signObj.tags.join(","),//标签字符串逗号分隔
                    userStatus:signObj.userStatus// 用户状态
                },
                function(res){
                    if(res.rescode == 1){
                        reset();
                        $.maskUI.close();
                        location.reload()
                    }
                });
        });

        $("#view").bind("focus",function(){
            $(this).css("border","1px solid");
            $("span.tip").eq(2).css("visibility","hidden");
        }).bind("blur",function(){
            signObj.content = $.trim($(this).val());
        });

        $("#companyNameSuggest").autocomplete({
            containerClass: 'autocomplete-suggestions cmp_select',
            serviceUrl: CONTEXTPATH + '/activity/jinpingmei/company.json',
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

                var BASICIMG = "http://img.kanzhun.com";
                $("#encryptCompId").val(suggestion.data);

                signObj.companyId = suggestion.data;
                companyId = suggestion.data;
                $(".info").css("visibility","visible");
                $("#c_logo").attr("src",BASICIMG + suggestion.logo);
                $("#c_name").html(suggestion.value);
                $("#c_industry").html(suggestion.industry);
                $("#c_addr").html(suggestion.city);

            }
        });

        //回到顶部

        $(window).on('scroll',function(){
            setGoTop();
        });
        function setGoTop(){
            var sT=$(window).scrollTop(),
              li3=$('aside li.li3');
            if(sT>0){
                li3.show();
            }else{
                li3.hide();
            }
        }
        setGoTop();
        $('aside').on('click','li.li3',function(){
            $(window).scrollTop(0);
        });

    });
});

