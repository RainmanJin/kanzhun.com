define(function() {
    String.prototype.format = function(){
        var args = arguments;
        return this.replace(/\{(\d)\}/g, function(){
            return args[arguments[1]];
        });
    };

    $.fn.extend({
        //show or hidden
        showMore: function(){
            this.each(function(i, v){
                $(v).on('click', function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    var details = $(this).prev('span.more_details');
                    if(details.length){
                        if(details.is(':hidden')){
                            $(this).html('<i>收起</i>');
                            details.show();
                        }else{
                            $(this).html('... <i>展开</i>');
                            details.hide();
                        }
                    }
                });
            });
        },

        //up or down
        //注意选择mark 时一定要加上context
        upOrDown: function(opts){
            var o = $.extend({
                url: '',
                delegate: null,
                data: {}
            }, opts);

            this.each(function(i, v){
                $(v).on('click', o.delegate, function(e){
                    e.preventDefault();
                    e.stopPropagation();

                    /*mtype is a ajax param 
                    if mtype === undefined is mean that was marked*/
                    var self = $(this), mtype = self.data('mtype'), _data;

                    if(mtype && !self.hasClass('marked')){
                        self.data('mtype', null);

                        if($.isFunction(o.data)){
                            _data = o.data.call(self);
                        }else{
                            _data = o.data;
                        }
                        
                        $.getJSON(o.url+ mtype.replace('.json','')+'.json', _data, function(ret){
                            if(o.callback){
                                o.callback.call(self, ret);
                                return;
                            }
                            if(ret && ret.rescode == '1'){
                                var num = self.find('i');
                                self.addClass('marked').removeClass('mark');
                                num.html((parseInt(num.html(), 10) || 0) + 1);
                            }else{
                                self.data('mtype', mtype);
                            }
                        });
                    }
                });
            });
        },

        tooltip: function(options){
            var o = $.extend({
                eventType: 'click',
                delegate: null,
                tip: null,
                pos: null
            }, options);

            this.each(function(i, v){
                var target = $(v);
                target.on(o.eventType, o.delegate, function(e){
                    e.stopPropagation();
                    e.preventDefault();

                    var _pos;
                    if(!o.pos){
                        var offset = $(this).offset();
                        _pos = {
                            l: offset.left + $(this).width() + 14,
                            t: offset.top - 14
                        };
                    }else{
                        _pos = o.pos;
                    }
                   
                    o.tip.css({'top': _pos.t, 'left': _pos.l}).show();

                    o.tip.on('click', function(e){
                        e.stopPropagation();
                    });
                    $(document).one('click', function(){
                        o.tip.hide();
                    });
                });

                o.tip.find('a.dialog_close').on('click', function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    $(document).trigger('click');
                });
            });
        }
    });
});
