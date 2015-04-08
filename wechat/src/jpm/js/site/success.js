$(function(){
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

    share($("#shareWx"),"分享出去");
});