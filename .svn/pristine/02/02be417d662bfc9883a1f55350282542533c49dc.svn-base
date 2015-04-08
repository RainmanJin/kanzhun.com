define(function(){
    //upload company logo
    return function(opts){
        var o = $.extend({
            elems: null,
            portrait: null,
            show: null,
            callback: null
        }, opts);
        window[o.callbackName || 'uploadOk'] = function(info){
            var ret = typeof info === 'string'? $.parseJSON(info) : info;
            if(ret && ret.rescode == 1){
                var picurls = ret.picurls || [];
                o.show.attr('src', STATICURL + picurls[1]);
                $('a.dialog_close', o.portrait).trigger('click');

                if(o.callback){
                    o.callback.call(o.portrait, picurls[1]);
                }
            }else{
                alert('上传图片失败，请重试！');
            }
        };

        o.elems.on('click', function(e){
            e.preventDefault();
            $.maskUI.open({
                elem: o.portrait
            });
            
        });
    };
});