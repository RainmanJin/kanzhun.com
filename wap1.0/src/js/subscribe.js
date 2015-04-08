//城市补全
$(function(){
    if($('input[id="city"]')[0]){
        var oCity=$('input[name="city"]');
        var hid=$('input[name="cityCode"]');        
        oCity.autocomplete({
            serviceUrl: '/city/city.json',
            paramName: 'query',
            dataType: 'json',
            transformResult: function(response) {
                return {
                    suggestions: $.map(response.suggestions, function(dataItem) {
                        return { value: dataItem.value, data: dataItem.data};
                    })
                };
            },
            onSelect: function (suggestion) {
                hid.val(suggestion.data);
            },
            onSearchStart: function(){
                //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
               hid.val('');
            },
            onInvalidateSelection: function(){
                hid.val('');
            },
            onSearchComplete: function(query, suggestions){
                if(suggestions.length === 0){
                    hid.val('');
                    return;
                }
                //auto select when only one result
                if(suggestions.length === 1){
                    hid.val(suggestions[0].data);
                }
            },
            autoSelectFirst: true
        });
        oCity.bind("blur",function(){
            var _this=$(this);
            setTimeout(function(){
                if(hid.val()==""){
                    _this.val('');
                    _this.parent().next("p.err").html("城市名称输入有误").show();
                }
            },300);
        }).focus(function(){
            var _this=$(this);
            _this.parent().next("p.err").hide();
        })
    }
});
$(function(){
    //订阅
    //每日每周
    $('p.def_f_r').on('click', 'button', function(e){
        e.preventDefault();
        $('input[name=sendType]').val(this.value);
        $(this).attr('class', 'btn_green_small_1').siblings('button').attr('class', 'btn_grey_small_2');
    });

    $('#userJobSearcherForm').MValidator({
        elems: 'input[type=text], input[type=password]',
        prompt: {
            succ: function(target, e){
                target.parent().next('p.err').hide();
            },
            err: function(target, msg, e){
                var elem = target.parent().next('p.err');
                elem.html(msg || elem.data('msg')).show();
            },
            normal: function(target, e){
                target.parent().next('p.err').hide();
            }
        },
        more: {
            email: {
                type: 'isMail',
                msg: '邮箱格式不正确！'
            }
        }
    }).submit();


    //
});