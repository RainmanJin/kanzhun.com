$(function(){

    var animate = function  ($c, effect, cb, delay) {
        $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
            $c.removeClass(effect);
            cb && setTimeout(function(){
                cb.call($c);
            }, delay||0);
        });
    }

    var remain = function  ($c, effect, cb, delay) {
        $c.addClass(effect).show().one('animationend webkitAnimationEnd oAnimationEnd', function () {
            cb && setTimeout(function(){
                cb.call($c);
            }, delay||0);
        });
    }




    var arr=[$(".meal03"),$(".meal04"),$(".meal05"),$(".meal08"),$(".meal09")];

    var len=arr.length;

        setInterval(function(){
            var num=Math.round(Math.random()*(len-1));
            animate(arr[num].find('img'),'mealinfo');
        },1000);



    var wx = function(target, msg, callback){
        $('body').append(
            '<div class="mask" id="wxMask">'+
            '<div class="transmitDialog" id="transmitDialog"><p>' +
            msg +
            '</p><i class="arrows"></i></div></div>');

        var mask = $('#wxMask'),
            dialog = $('#transmitDialog');

        target.on('click', function(e){
            e.preventDefault();
            mask.show();
            dialog.show();

            if(callback){
                callback();
            }
        });

        mask.on('click',function(e){
            mask.hide();
            dialog.hide();
        });
    };

    wx($('#shareToWx'), '分享到【朋友圈】 <br/> 然后捏~~', function(){
        __wxsharecookie();
    });




});