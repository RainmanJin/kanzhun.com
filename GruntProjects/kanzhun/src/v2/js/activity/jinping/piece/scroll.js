/**
 * Created by zhuchongyue on 2015/3/10.
 */
define(function(){
    $(function(){
        var scrollWrap = $('div.scroll_wrap'),
            scrollInner = $('ul.scroll_inner'),
            scrollItems = scrollInner.find('li'),
            Iheight = 0;
        addHeight = function(targets){
            $.each(targets, function(i, v){
                if($(v).index() < 10) {
                    Iheight = Iheight + $(v).height();
                }
            })
            scrollWrap.css('height', Iheight+30*10);
            Iheight = 0;
        }

        addHeight(scrollItems);

        scrollText = function() {
            var  scrollItemsR = scrollInner.find('li'),
                item = scrollItemsR[scrollItemsR.length - 1];
            scrollInner.css('top', -$(item).height());
            scrollInner.prepend(item);

            addHeight(scrollItemsR);

            $(item).css('opacity', 0);
            scrollInner.animate({
                top: 0
            }, 400);
            $(item).animate({
                opacity: 1
            }, 3500);

        };
        setInterval(scrollText, 10000);
    });
});