(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
        tabs: function(options) {
            var opts = $.extend({
                trigEvent: 'click',
                tabSelector: '',
                tabPanel: '',
                current: 'current',
                loadContent: '',
                callback: null,
                panelCancel: false,
                animate: 'show'
            }, options);
            var tabs = $(this),
                loadContent = opts.loadContent,
                panels = $(opts.tabPanel, tabs);

            tabs.on(opts.trigEvent, opts.tabSelector, function(e) {
                e.preventDefault();
                var self = $(this),
                    index = tabs.find(opts.tabSelector).index(this),
                    panel = panels.eq(index);

                if($.isFunction(loadContent)){
                    loadContent.call(self, index, panel);
                }

                self.addClass(opts.current).siblings().removeClass(opts.current);
                
                if(!opts.panelCancel){
                    panel.siblings(opts.tabPanel).hide();
                    panel[opts.animate]();
                }

                if(opts.callback){
                   opts.callback.call(self, index, panel);
                }
            });
        }
    });
}));
