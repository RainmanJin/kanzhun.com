(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
        ajaxForm: function(opts){
            var o = $.extend({
                //selector: 'input:text, input:hidden, textarea, select, input:radio, input:checkbox'
            }, opts);

            var form = $(this);

            form.on('submit', function(e){
                e.preventDefault();
                e.stopPropagation();

                var components = form.find(o.selector).filter(function(){
                    return !!$(this).attr('name');
                });

                if(components.length == 0){ return false; }

                if(o.validate){
                    if(!o.validate.call(form, components)){
                        return false;
                    }
                }

                $.ajax({
                    type: (form.attr('method')||'get').toUpperCase(),
                    url: form.attr('action'),
                    //data: $.param(components),
                    //增加data 扩展方法
                    data: $.param(components) + (o.data ? o.data() : ''),
                    dataType: o.dataType || 'json',
                    beforeSend: function(){
                        if(o.beforeSend){
                            o.beforeSend.call(form, components);
                        }
                    },
                    success: function(ret){
                        if(o.success){
                            o.success.call(form, ret, components);
                        }
                    },
                    error: function(){
                        if(o.error){
                            o.error.call(form, components);
                        }
                    }
                });

                
                return false;
            });
        }
    });
}));
