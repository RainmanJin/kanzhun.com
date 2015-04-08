/*
prev: 'a.prev',
next: 'a.next',
thumbWrapper: 'div.list_w>ul',
thumb: 'li',
original: 'figure li',
callbacks: {
    thumbWrapper: function(){
        
    }
}
*/
(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.extend({
        slideView: function(opts){
            var o = $.extend({
                prev: '',
                next: '',
                thumbWrapper: '',
                thumb: '',
                original: '',
                callbacks: {}
            }, opts);

            var prev = $(o.prev, this),
                next = $(o.next, this);
                thumbWrapper = $(o.thumbWrapper, this),
                thumbs = thumbWrapper.find(o.thumb),
                thumbsWidth = thumbs.eq(0).outerWidth()*thumbs.length,
                originalWrapper = $(o.originalWrapper, this);

            thumbWrapper.css('width', thumbsWidth);

            var original = $(o.original, this),
                appearWidth = thumbWrapper.parent().innerWidth();

            //thumb event
            thumbWrapper.on('click', o.thumb, function(){
                var _thumb = $(this), _original = original.eq(_thumb.index()), img = _original.find('img');
                _thumb.addClass('current').siblings().removeClass('current');
                

                _original.addClass('current').siblings().removeClass('current');

                if(img.data('original')){
                    img.attr('src', img.data('original')).removeAttr('data-original');    
                }

                if(o.callbacks.thumbWrapper){
                    o.callbacks.thumbWrapper.call(_thumb, _original);
                }
            });


            //click the original images to show the next one
            originalWrapper.on('click', 'img', function(e){
                var pointer = thumbs.filter('.current').next('li');
                if(pointer.length){
                    pointer.trigger('click');

                    //if the current images which be clicked is the last one in the appear area
                    if(pointer.position().left >= Math.abs(thumbWrapper.position().left) + appearWidth){
                        next.trigger('click');
                    }
                }


            });

            // if the thumbs is not enough
            if(thumbsWidth < appearWidth){
                prev.addClass('forbidden_p');
                next.addClass('forbidden_n');
            }

            // left  <=0  forever
            var prevMoving = function(){
                var left = Math.floor(thumbWrapper.position().left), distance;
                if(left < 0){
                    if(Math.abs(left) < appearWidth){
                        distance = 0;
                    }else{
                        distance = left + appearWidth;
                    }

                    
                }else{
                    return null;
                }

                return distance;
            };

            var nextMoving = function(){
                //可移动的距离
                var left = Math.floor(thumbWrapper.position().left), distance;
                var remain = thumbsWidth - appearWidth;
                if(Math.abs(left) < remain){
                    //如果剩下的不够一屏
                    if(remain - Math.abs(left) < appearWidth){
                        distance = remain*-1;
                    }else{
                        distance = left - appearWidth;
                    }

                    
                }else{
                    // distance = left;
                    return null;
                }

                return distance;
            };

            prev.on('click', function(e){
                e.preventDefault();
                var self = $(this);
                if(self.hasClass('forbidden_p')){
                    return;
                }

                if(!thumbWrapper.is(':animated')){
                    var distance = prevMoving();
                    if(distance !== null){
                        thumbWrapper.animate({'left': distance + 'px'}, 500, function(){
                           next.removeClass('forbidden_n');

                            if(prevMoving() === null){
                                self.addClass('forbidden_p');
                            }
                        });
                    }
                }
            });

            next.on('click', function(e){
                e.preventDefault();
                var self = $(this);
                if(self.hasClass('forbidden_n')){
                    return;
                }

                if(!thumbWrapper.is(':animated')){
                    var distance = nextMoving();
                    if(distance !== null){
                        thumbWrapper.animate({'left': distance + 'px'}, 500, function(){
                            prev.removeClass('forbidden_p');

                            if(nextMoving() === null){
                                self.addClass('forbidden_n');
                            }
                        });
                    }
                }
            
            });
        }
    });
}));
