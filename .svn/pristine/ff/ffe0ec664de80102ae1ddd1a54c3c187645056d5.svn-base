$(function(){
    window.changeAuthCode = function(target){
        if(target){
            target.setAttribute('src', target.getAttribute('src').split('&t=')[0] + '&t=' + (new Date()).getTime());
        }
    };

    $('#loginForm').MValidator({
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
            mail: {
                type: 'isMail',
                msg: '邮箱格式不正确！'
            }
        }
    }).submit();

    $('input[name=account]').on('blur', function(){
        if($.trim(this.value) !== '' && (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.value)){
            if($('li.authcode', '#loginForm').length === 0){
                $.getJSON('/login/needcaptcha.json?account=' + encodeURIComponent(this.value), function(ret){
                    if(ret && ret.rescode == 1){
                        var key = ret.randomKey;
                        $('#forget').before('<div class="authcode">' +
                            '<img src="/captcha?randomKey='+key+'" onclick="changeAuthCode(this);" title="看不清？点击换一张"/>' +
                            '<div class="divCommonInput bdefault">' +
                            '<input name="captcha" placeholder="输入验证码" maxlength="4" class="ifd" />' +
                            '</div><p class="err" data-msg="验证码不能为空！"><i class="i i_err"></i></p>' +
                            '<input type="hidden" path="randomKey" /></div>');
                    }
                });
            }
        }
    });

    $('#autoLogin').on('click', function(){
        if($(this).is(':checked')){
            this.value = '1';
        }else{
            this.value = '';
        }
    });
});