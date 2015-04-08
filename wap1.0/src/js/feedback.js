$(function(){
    $('div.opinions_ipt textarea').on('keyup', function (e) {
      e.stopPropagation();
      var remain = this.value.length - 800;
      if (remain <= 0) {
        $("#shortViewPrompt").html('您还可以输入<strong class="ok green">' + Math.abs(remain) + '</strong>个字');
        // $('#basic input[type=submit]').prop('disabled', false);
      }
    });

    $('#feedbackForm').MValidator({
        elems: 'textarea,input[type=text]',
        prompt: {
            succ: function(target, e){
                if( target.parent('div').data('texta') == 'isme' ){
                    target.parent('div').removeClass('err'); 
                }

                target.parent().next('div').find('p.err').hide();
            },
            err: function(target, msg, e){
                var elem = target.parent().next('div').find('p.err');
                if( target.parent('div').data('texta') == 'isme' ){
                    target.parent('div').addClass('err'); 
                }
                
                elem.html((msg || elem.data('msg'))).show();
            },
            normal: function(target, e){
                if( target.parent('div').data('texta') == 'isme' ){
                    target.parent('div').removeClass('err'); 
                }

                target.parent().next('div').find('p.err').hide();
            }
        },
        more: {
            email: {
                fn: function(_this, prompt){
                    var val=$(this).val();
                    var regMail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                   // var regQQ=/^\d{5,}$/;
                   // var regPhone=/^1\d{10}$/;
                    if(regMail.test(val)){
                        prompt.succ($(this));
                        return true;
                    }else{
                        var elems = $(this).parent().next('div').find('p.err');
                        elems.html('请输入正确的邮箱格式').show();
                        //prompt.err($(this));
                        return false;
                    }
                }
            },

            contact: {
                fn: function(_this, prompt){
                    var val=$(this).val();
                    //var regMail=/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
                    var regQQ=/^\d{5,}$/;
                    var regPhone=/^1\d{10}$/;
                    if(regQQ.test(val) || regPhone.test(val)){
                        prompt.succ($(this));
                        return true;
                    }else{
                        prompt.err($(this));
                        return false;
                    }
                }
            },
        }
    }).submit();
});