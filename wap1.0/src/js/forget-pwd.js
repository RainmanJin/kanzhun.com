$(function(){
    //忘记密码
    $('#forgetPwdForm').MValidator({
        elems: 'input[type=text], input[type=password]',
        prompt: {
            succ: function(target, e){
                target.parent().next('p.err').hide();
            },
            err: function(target, msg, e){
                var elem = target.parent().next('p.err');
                elem.html('<i class="i i_err"></i>'+ (msg || elem.data('msg'))).show();
            },
            normal: function(target, e){
                target.parent().next('p.err').hide();
            }
        },
        more: {
            account: {
                type: 'isMail',
                msg: '邮箱格式不正确！'
            }
        }
    }).submit();


    //修改密码
    $('#resetPwdForm').MValidator({
        elems: 'input[type=text], input[type=password]',
        prompt: {
            succ: function(target, e){
                target.parent().next('p.err').hide();
            },
            err: function(target, msg, e){
                var elem = target.parent().next('p.err');
                elem.html('<i class="i i_err"></i>'+ (msg || elem.data('msg'))).show();
            },
            normal: function(target, e){
                target.parent().next('p.err').hide();
            }
        },
        more: {
            oldPassword:{
                type:  /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                msg: '请输入6-14位密码，必须包含数字和字母！'
            },
            newPassword: {
                type:  /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                msg: '请输入6-14位密码，必须包含数字和字母！',
                fn: function(_this, prompt){
                    var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
                    if(val !== '' && this.value != val){
                        prompt.err($(this), '两次输入的密码不一致！');
                        prompt.normal(re);
                        return false;
                    }else{
                        prompt.succ($(this));

                        if(val !== ''){
                            prompt.succ(re);
                        }
                        return true;
                    }
                }
            },
            confirmPassword: {
                type:  /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                msg: '请输入6-14位密码，必须包含数字和字母！',
                fn: function(_this, prompt){
                    var pwd = _this.form.find('input[name=newPassword]'), val = $.trim(pwd.val());
                    if(val !== '' && this.value != val){
                        prompt.err($(this), '两次输入的密码不一致！');
                        prompt.normal(pwd);
                        return false;
                    }else{
                        prompt.succ($(this));
                        
                        if(val !== ''){
                            prompt.succ(pwd);
                        }
                        return true;
                    }
                }
            }
        }
    }).submit();


    //邮箱返回 修改密码
    $('#mailResetPwdForm').MValidator({
        elems: 'input[type=text], input[type=password]',
        prompt: {
            succ: function(target, e){
                target.parent().next('p.err').hide();
            },
            err: function(target, msg, e){
                var elem = target.parent().next('p.err');
                elem.html('<i class="i i_err"></i>'+ (msg || elem.data('msg'))).show();
            },
            normal: function(target, e){
                target.parent().next('p.err').hide();
            }
        },
        more: {
            newPassword: {
                type:  /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                msg: '请输入6-14位密码，必须包含数字和字母！',
                fn: function(_this, prompt){
                    var re = _this.form.find('input[name=confirmPassword]'), val = $.trim(re.val());
                    if(val !== '' && this.value != val){
                        prompt.err($(this), '两次输入的密码不一致！');
                        prompt.normal(re);
                        return false;
                    }else{
                        prompt.succ($(this));

                        if(val !== ''){
                            prompt.succ(re);
                        }
                        return true;
                    }
                }
            },
            confirmPassword: {
                type:  /^(?![^a-zA-Z]+$)(?!\D+$).{6,14}$/,
                msg: '请输入6-14位密码，必须包含数字和字母！',
                fn: function(_this, prompt){
                    var pwd = _this.form.find('input[name=newPassword]'), val = $.trim(pwd.val());
                    if(val !== '' && this.value != val){
                        prompt.err($(this), '两次输入的密码不一致！');
                        prompt.normal(pwd);
                        return false;
                    }else{
                        prompt.succ($(this));
                        
                        if(val !== ''){
                            prompt.succ(pwd);
                        }
                        return true;
                    }
                }
            }
        }
    }).submit();
});