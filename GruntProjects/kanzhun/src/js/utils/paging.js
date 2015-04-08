(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
        /*
        @pagenum 为提交的翻页数
        @.forbidden 为上一页和下一页的禁用状态
        @data-page 记录上一页和下一页的翻页数
        */
        paging: function(opts){
			var page = $(this),
                o = $.extend({
                    form: null,
                    staticUrl: false
                }, opts);

            if(!o.staticUrl){
                page.on('click', 'a', function(e){
                    e.preventDefault();
                    var self = $(this);
                    if(!self.hasClass('forbidden')){
                        o.form.find('input[name=pagenum]').val(self.data('page') || self.html());
                        o.form.submit();
                    }
                });
            }
			
			page.find('input.page_jump').on('keyup', function(e){
				e.preventDefault();
				var self = $(this),
                    val = self.val().replace(/\D/g, '');
				self.val(val);

                if(!o.staticUrl){
                    o.form.find('input[name=pagenum]').val(val);
                    if(e.keyCode == 13){
                        o.form.submit();
                    }
                }else{
                    if(e.keyCode == 13){
                        window.location.href = self.data('pageurl').replace('#pagenum#', val);
                    }
                }
				
			});
        }
    });
}));
