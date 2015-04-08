/**
 * Created by zcy on 2015/3/26.
 */
$(function(){
    var height = $(".popup").height();
    var  wh= $("#popup-wrap").height();
    var speed = height/50;
    $.keyframe.define([
        {
            name  :  'up',
            "0%" :  {"top":wh+"px"},
            "100%":  {"top":-(height-wh)+"px"}
        }]);

    $(".popup").playKeyframe({
            name: 'up',
            duration: speed+"s",
            timingFunction: 'linear',
            iterationCount: "infinite",
            direction:"normal",
            complete:function(){
            	$(".popup").resetKeyframe(function(){});
            }
        });
    
    var isAnimate = true;
    
   $("#control").on("click",function(){
	   
	   $(this).find("img").toggleClass("none");
	   
	 if(isAnimate){
		 $(".popup").css("visibility","hidden");
		 $(".popup-wrap").css("z-index",-100);
		 $(".popup").pauseKeyframe();
		 isAnimate = false;
	 }else{
		 $(".popup").css("visibility","visible");
		 $(".popup-wrap").css("z-index",-0);
		 $(".popup").resumeKeyframe();
		 isAnimate = true;
	 }
	   	
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

    window.shareCallback = function(){
        $('#wxMask').trigger("click");
    }
});