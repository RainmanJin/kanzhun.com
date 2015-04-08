define(['c/auth_dialog', 'c/widgets', 'u/validator'], function(auth_dialog){
    function jobsInit(){
        var jobSerDialog = $('#jobSerDialog');
        $('.select', jobSerDialog).DIYSelect({
            listCallback: function(l, field, select){
                field.parent().find('input[type=hidden]').val($(this).data('val'));
            }
        });

        //choose city autocomplete
        var jobSerForm = $('#jobSerForm'),
            jobCityeSug = $('#jobCityeSug'),
            jobCityeSugHid = $('input[name=citycode]', jobSerForm);
        jobCityeSug.autocomplete({
            serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
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
                jobCityeSugHid.val(suggestion.data);
            },
            onSearchStart: function(){
                //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
                jobCityeSugHid.val('');
            },
            onInvalidateSelection: function(){
                jobCityeSugHid.val('');
            },
            onSearchComplete: function(query, suggestions){
                if(suggestions.length === 0){
                    jobCityeSugHid.val('');
                }
            },
            autoSelectFirst: true
        });

        jobSerForm.validatorAll({
            elems: '.v',
            prompt: {
                succ: function(target){
                    $('p.err', target.parent()).hide();
                },
                err: function(target, msg){
                    var elem = $('p.err', target.parent());
                    elem.html(msg || elem.data('msg')).show();
                },
                normal: function(target){
                    $('p.err', target.parent()).hide();
                }
            },
            focusMore: {
                city: function(){
                    jobCityeSugHid.val('');
                }
            },
            more: {
                city: function(_this, prompt, e){
                    var s = setTimeout(function(){
                        clearTimeout(s);
                        if(jobCityeSugHid.val() === ''){
                            jobCityeSug.val('').trigger('blur');
                        }
                        return true;
                    },300);
                    return true;
                },
                email: {
                    type: 'isMail',
                    msg: '邮箱格式不对！'
                }
            },
            ajaxSubmit: {
                elems: 'input:text, input:hidden',
                beforeSend: function(){

                },
                success: function(ret){
                    ret = ret || {};
                    if(ret.rescode == 1011){
                        $.maskUI.close();
                        auth_dialog.open('#login');
                    }else if(ret.rescode == 1){
                        $('div.job_c_f', jobSerForm).hide();
                        $('div.job_s_suc', jobSerForm).show();
                    }else{
                        $('div.job_c_f p.j_err', jobSerForm).html(ret.resmsg || '系统异常！').show();
                    }
                }
            }
        }).init().submit(function(){
            if(jobCityeSugHid.val() === ''){
                return false;
            }else{
                return true;
            }
        });


        $('#jobTitleSug').autocomplete({
            serviceUrl: CONTEXTPATH + '/autocomplete/job.json',
            paramName: 'query',
            dataType: 'json',
            transformResult: function(response) {
                response = response || {};
                return {
                    suggestions: $.map(response.suggestions||[], function(dataItem) {
                        return { value: dataItem.value, data: dataItem.data};
                    })
                };
            }
        });
    }


//    $.maskUI.config = {
//        wrap: '<section class="p_dialog"><div class="dialog_con"><a href="javascript:;" class="dialog_close maskuiclose"></a>{0}</div></section>'
//    };
    var o = {
        init: function(){
            if($('#jobSerDialog').length){
                jobsInit();
            }

            $('#createJobSer').on('click', function(e){
                e.preventDefault();
                
                //is logged
                o.create();
                
            });
        },

        create: function(id, callback){
            if(auth_dialog.isLogged()){
                $('#jobSerDialog').remove();
                $.ajax({
                    type: 'get',
                    dataType: 'json',
                    url: '/usercenter/jobsearcher/edit.json',
                    data: {
                        id: id || ''
                    },
                    beforeSend: function(){
                        $.maskUI.open({
                            content: '<p class="js-loading mt10 mb10 t-center"><img src="/images/loading.gif" /></p>'
                        });
                    },
                    success: function(ret){
                        if(ret && ret.html){
                            $('body').append(ret.html);

                            var jobSerDialog = $('#jobSerDialog');
                            $.maskUI.open({
                                elem: jobSerDialog,
                                pos: 'absolute'
                            });

                            $('input:text.v', jobSerDialog).placeholderS();
                            jobsInit();

                            if(callback){
                                callback();
                            }
                        }
                    }
                });
            }else{
                auth_dialog.open('#login');
            }
        }
    };

    return o;
});