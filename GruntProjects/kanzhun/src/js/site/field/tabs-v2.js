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
                tabPanelT: '',
                current: 'current',
                loadContent: '',
                callback: null,
                panelCancel: false,
                animate: 'show'
            }, options);
            var tabs = $(this),
                loadContent = opts.loadContent,
                panels = $(opts.tabPanel, tabs);
                panelsT = $(opts.tabPanelT, tabs);

            tabs.on(opts.trigEvent, opts.tabSelector, function(e) {
                e.preventDefault();
                var self = $(this),
                    index = tabs.find(opts.tabSelector).index(this),
                    panel = panels.eq(index);
                    panelT = panelsT.eq(index);

                if($.isFunction(loadContent)){
                    loadContent.call(self, index, panel, panelT);
                }

                self.addClass(opts.current).siblings().removeClass(opts.current);
                
                if(!opts.panelCancel){
                    panel.siblings(opts.tabPanel).hide();
                    panelT.siblings(opts.tabPanel).hide();
                    panel[opts.animate]();
                    panelT[opts.animate]();
                }

                if(opts.callback){
                   opts.callback.call(self, index, panel, panelT);
                }
            });
        }
    });
}));
