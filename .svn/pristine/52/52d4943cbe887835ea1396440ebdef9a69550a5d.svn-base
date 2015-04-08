(function (factory) {
    if (typeof define === 'function' && define.amd){
        define(factory); // AMD support for RequireJS etc.
    }else{
        factory();
    }
}(function() {
    $.fn.tooltip = function(options){
        options = $.extend({
        	html: ''
        }, options);

        this.each(function(i, v){
        	var target = $(v),
        		coord = {
        			l: target.offset().left,
        			t: target.offset().top
        		}

        	target.on('click', function(){
        		if(target.data('toggle') == 'on'){
                    target.data('toggle', 'off').next('dl.tooltip').hide();
                    return;
                }else if(target.data('toggle') == 'off'){
                    target.data('toggle', 'on').next('dl.tooltip').show();
                    return;
                }

                //only once
        		if(options.html && typeof target.data('toggle') === 'undefined'){
        			var ele = $('<dl>');
	        		ele.html(options.html).addClass('tooltip');

	        		//extendsions
                    if(options.callback){
	        			options.callback.call(ele, coord);
		        	}

					target.after(ele);
					ele.show();
                    

                    ele.on('click', 'a.close', function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        ele.hide();
                        target.data('toggle', 'off');
                    });

                    target.data('toggle', 'on');
	        	}	


        	});
        });
    };


    //比较两个textarea里的内容是否有改变
    $.fn.textareaCompare = function(callback){
        this.each(function(i, v){
            var target = $(v),
                olderMsg = escape(target.html());
            target.on('change', function(){
                var newMsg = escape(this.value),
                    same = true;
                if(newMsg.length === olderMsg.length && newMsg === olderMsg){
                    same = true;
                }else{
                    same = false;
                }

                if(callback){
                    callback.call(this, same);
                }
            });
        });
    };

    $.fn.placeholder = function(){
        // 低版本用onholder为placeholder样式
        if (!('placeholder' in document.createElement('input'))){
            this.each(function(i, v){
                var target = $(v),
                    val = target.attr('placeholder');
                if(val){
                    if(v.value == ''){
                        target.val(val).addClass('onholder');       
                    }
                    target.focus(function(){
                        if(this.value == val) {
                            this.value = '';
                            $(this).removeClass('onholder');
                        }
                    }).blur(function(){
                        if(this.value === ''){
                            this.value = val;
                            $(this).addClass('onholder');
                        }
                    });
                }
            });
        }
    }
}));
