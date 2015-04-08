define(function(){
    $.fn.extend({
        placeholderS: function(classname){
            var cn = classname || 'onholder';
            // 低版本用onholder为placeholder样式
            if (!('placeholder' in document.createElement('input'))){
                this.each(function(i, v){
                    var target = $(v),
                        placeholder = target.attr('placeholder');

                    if(placeholder){
                        if($.trim(v.value) === ''){
                            target.val(placeholder).addClass(cn);
                        }
                        target.focus(function(){
                            if(this.value == placeholder) {
                                this.value = '';
                                $(this).removeClass(cn);
                            }
                        }).blur(function(){
                            if($.trim(this.value) === ''){
                                this.value = placeholder;
                                $(this).addClass(cn);
                            }
                        });
                    }
                });
            }
        },
        placeholder: function(){
            //对于input位置会改变的情况不适用
            //低版本用onholder为placeholder样式
            if (!('placeholder' in document.createElement('input'))){
                this.each(function() {
                    var it = $(this);
                    var placeholder = $('<span />', {
                        'class': 'onholder',
                        text: it.attr('placeholder'),
                        css: {
                            top: parseInt(it.offset().top, 10)+ (it.outerHeight() - it.height()) / 2,
                            left: parseInt(it.offset().left, 10) + parseInt(it.css('padding-left'), 10),
                            lineHeight: it.height() + 'px'
                        }
                    }).appendTo($('body'));

                    var checkInput = function() {
                        if (it.val()) {
                            placeholder.addClass('none');
                        } else {
                            placeholder.removeClass('none');
                        }
                    };
                    checkInput();
                    var textInput = function(e) {
                        setTimeout(checkInput, 0);
                    };
                    try {
                        it.on('change', textInput);
                    } catch (e) {
                        it.on('change keydown focus blur', textInput);
                    }
                    it.on('focus', function() {
                        placeholder.addClass('none');
                    }).on('blur', function() {
                        if($.trim(it.val()) === '')
                          placeholder.html(it.attr('placeholder')).removeClass('none');
                    });
                    placeholder.on('click', function() {
                       it.focus();
                    });
                    $(window).on('resize',function(){
                        placeholder.css({
                            top: parseInt(it.offset().top, 10)+ (it.outerHeight() - it.height()) / 2,
                            left: parseInt(it.offset().left, 10) + parseInt(it.css('padding-left'), 10)
                        });
                    });
                });
            }
            return this;
        },
        //模拟placeholder给个默认的值，获取焦点消失，便于搜索用到
        placeholderFocus: function(classname){
            var cn = classname || 'onholder';
            if (!('data-placeholder' in document.createElement('input'))){
                this.each(function(i, v){
                    var target = $(v),
                      placeholder = target.attr('data-placeholder');

                    if(placeholder){
                        if($.trim(v.value) === ''){
                            target.val(placeholder).addClass(cn);
                        }
                        target.focus(function(){
                            if(this.value == placeholder) {
                                this.value = '';
                                $(this).removeClass(cn);
                            }
                        }).blur(function(){
                            if($.trim(this.value) === ''){
                                this.value = placeholder;
                                $(this).addClass(cn);
                            }
                        });
                    }
                });
            }
        }
    });
});