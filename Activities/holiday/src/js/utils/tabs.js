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
                trigEvent: 'click', //触发事件的类型
                tabSelector: '',  //tabs 按钮的selector
                tabPanel: '', //tabs 内容的selector
                current: 'current', //tabs按钮 选中状态的className
                loadContent: '',  //为panel添加内容的方法，如：ajax动态载入
                callback: null, //切换后的callback， this为jquery对象，指向当前tabs按钮,自带3个参数：当前索引(index)、当前panel、tabs对象
                panelCancel: false, //是否切换panel
                animate: 'show' //切换的特效，可选jquery自带animate方法
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
                   opts.callback.call(self, index, panel, tabs);
                }
            });
        }
    });
}));
