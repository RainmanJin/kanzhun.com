;(function($){
    var validator = function(opts, form){
        this.form = form;
        $.extend(this, {more: {}, submitMore: {}}, opts);
    };

    validator.reg = {
        isMail: function(str){
            return (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(str);
        },
        isNumber: function(str){
            return (/^\d+$/).test(str);
        },
        isPhone: function(str){
            return (/^1\d{10}$/).test(str);
        },
        isPwd: function(str){
            return (/^\d{6,}$/).test(str);
        },
        isIntger: function(str){
            return (/^\d*[1-9]\d*$/).test(str);
        }
    };

    validator.prototype = {
        //input:text
        validateText: function(prompt, _this, e, submitFn){
            var self = $(this),
                val = $.trim(this.value),
                    //if has placeholder
                    placeholder = self.attr('placeholder'),
                    unnece = self.data('unnecessary');
            
            //is null  隐藏域的非空验证留到下一步      
            if(self.attr('type') !== 'hidden' && (val === '')){
                if(!unnece){
                    prompt.err(self);
                    return false;
                }else{
                    prompt.normal(self);
                    return true;
                }
            }else{
                
                //regexp more 可以是object或 function

                /*第三步验证
                more{
                    type: 如果是string则从validator.reg里找 也可以传regExp 
                    msg:
                    fn: fn里控制prompt
                }*/
                var more = _this.more[this.name] || {},
                    type = more.type,
                    msg = more.msg;
                
                //regexp callback   
                if(more && type && msg){
                    var reg = typeof type === 'object' ? function(str){
                        return type.test(str);
                    } : validator.reg[type];
                    
                    if(!reg(val)){
                        prompt.err(self, msg);
                        return false;
                    }
                }
                
                
                var moreFn = typeof more === 'function',
                    fn = moreFn  ? more : more.fn;
                if(fn){
                    //可以通过判断e 是不是event对象 来判断是不是submit时的验证
                    if(fn.call(this, _this, prompt, e)){

                        if(moreFn){
                            prompt.succ(self);
                        }
                        return true;
                    }else{
                        if(moreFn){
                            prompt.err(self);
                        }
                        return false;
                    }
                }
                
                //submitmore
                if(typeof submitFn === 'function'){
                    return submitFn.call(this, _this);
                }
                
                prompt.succ(self);
                return true;
            }
        },
        //select
        validateSelect: function(prompt, _this){
            var self = $(this);
            if(self.val() == self.find('option').eq(0).val()){
                prompt.err(self);
                return false;
            }else{
                prompt.succ(self);
                return true;
            }
        },
        //textarea
        validateTextarea: function(prompt, _this){
            var self= $(this), unnece = $(this).data('unnecessary');
            if($.trim(this.value) === ''){
                if(!unnece){
                    prompt.err(self);
                    return false;
                }else{
                    prompt.normal(self);
                    return true;
                }
            }else{
                
                var more = _this.more[this.name] || '';
                
                if(typeof more === 'function'){
                    return more.call(this, _this, prompt);
                }
                
                prompt.succ(self);
                return true;
            }
        }
    };

    
    //submit
    validator.prototype.submit = function(fn){
        var _this = this;
        this.form.on('submit', function(event){
            event.stopPropagation();
            var flag = true, self = $(this), prompt = _this.prompt;
            if(!prompt){
                return false;
            }
            $.each($(_this.elems, _this.form), function(i, v){
                var target = $(v);
                    
                    //隐藏的组件 如果有necessary 仍需验证
                    // if(!!target.data('necessary')){
                        switch(v.nodeName){
                            case 'INPUT':
                            var more = _this.submitMore[v.name];
                            flag = _this.validateText.call(v, prompt, _this, null, more);
                            break;
                            
                            case 'SELECT':
                            flag = _this.validateSelect.call(v, prompt, _this);
                            break;
                            
                            case 'TEXTAREA':
                            flag = _this.validateTextarea.call(v, prompt, _this);
                            break;
                        }
                    // }
                    if(!flag){
                        return false;
                    }
            });
            
            if(flag){
                var bool2 = true;
                if(typeof fn === 'function'){
                    //这里要this无意义所以不需要call
                    bool2 = !!fn();
                }
                if(bool2){
                    var submitBtn = self.find('input[type=submit]'),
                        defName = submitBtn.val();
                    if(_this.ajaxSubmit){
                        event.preventDefault();
                        var o = _this.ajaxSubmit,
                            components = self.find(o.elems).filter(function(){
                                return !!$(this).attr('name');
                            });
                            
                        $.ajax({
                            type: o.type || (self.attr('method')||'get').toUpperCase(),
                            url: o.url || self.attr('action'),
                            data: $.param(components) + (o.data ? o.data(): ''),
                            dataType: o.dataType || 'json',
                            beforeSend: function(){
                                submitBtn.prop('disabled', true).val('正在提交...');
                                if(o.beforeSend){
                                    o.beforeSend.call(self, _this);
                                }
                            },
                            success: function(ret){
                                submitBtn.prop('disabled', false).val(defName);
                                if(o.success){
                                    o.success.call(self, ret, _this);
                                }
                            },
                            error: function(){
                                submitBtn.prop('disabled', false).val(defName);
                                if(o.error){
                                    o.error.call(self, _this);
                                }
                            }
                        });
                        
                        return false;
                    }else{
                        //禁止重复提交
                        submitBtn.prop('disabled', true).val('正在提交...');
                    }
                }
                return bool2;
            }else{
                return false;
            }
        });
    };

    $.fn.MValidator = function(opts){
        return new validator(opts, this);
    }

})($);




























