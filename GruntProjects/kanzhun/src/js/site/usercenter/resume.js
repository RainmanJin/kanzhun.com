require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/auth_dialog', 'u/upload_portrait', 'c/widgets', 'u/validator', 'u/chart', 'c/mini_search'], function(auth_dialog, upload_portrait){

    $(function(){

        //修改头像
        $("body").on('mouseover','a.changeimg',function(){
            $(this).prev('p').css('opacity','.5');
        }).on('mouseout','a.changeimg',function(){
            $(this).prev('p').css('opacity','.3');
            console.log(1);
        });



        //show edit model
        var resumeId = $('#resumeId').val();
        var resumeControler = {
            init: function(){
                this.onReady();
            },
            fragment: {
                url: function(type){
                    return CONTEXTPATH + '/resume/'+ type +'/'+ $(this).data('type') +'.json';
                },

                loading: {
                    show: function(){
                        $.maskUI.open({
                            elem: 'rsmLoading',
                            zIndex: 111,
                            css: {
                                top: '40px'
                            }
                        });
                    },

                    hide: function(){
                        $.maskUI.close();
                    }
                },

                checkDate: function(by, ey, bm, em){
                    ey = parseInt($('input[name=' + ey +']').val(), 10);
                    if(ey === 0){
                        return true;
                    }
                    var year = ey - parseInt($('input[name=' + by +']').val(), 10);
                    bm = parseInt($('input[name=' + bm +']').val(), 10);
                    em = parseInt($('input[name=' + em +']').val(), 10);

                    if(year < 0){
                        return false;
                    }else if(year === 0 && bm && em && em - bm < 0){
                        return false;
                    }else{
                        return true;
                    }
                },

                selectControler: function(){
                    if($.trim(this.value) === ''){
                        return false;
                    }else{
                        return true;
                    }
                },

                initSelect: function(context){
                    //select
                    $('.select', context).DIYSelect({
                        //赋值并清除错误提示
                        listCallback: function(list, field, target){
                            var hid = $('input:hidden', target);
                            hid.val($(this).data('val')).parent().parent().parent().find('>p.err').hide();
                            if(list.find('a').eq(0).data('val') == '0000'){
                                if(hid.val() === '0000'){
                                    target.next('dl.select').hide().find('dt>input:hidden').val('since');
                                }else{
                                    target.next('dl.select').show().find('dt>input:hidden').val('').end().find('dt>input:button').val('月');
                                }
                            }
                        }
                    });
                },

                err: {
                    succ: function(target, e){
                        var err;
                        if(target.attr('type') === 'hidden'){
                            err = $('>p.err', target.parent().parent().parent());
                        }else{
                            err = $('>p.err', target.parent());
                        }
                        err.hide();
                    },
                    err: function(target, msg, e){
                        var err;
                        if(target.attr('type') === 'hidden'){
                            err = $('>p.err', target.parent().parent().parent());
                        }else{
                            err = $('>p.err', target.parent());
                        }
                        err.html(msg || err.data('msg')).show();
                    },
                    normal: function(target, e){
                        var err;
                        if(target.attr('type') === 'hidden'){
                            err = $('>p.err', target.parent().parent().parent());
                        }else{
                            err = $('>p.err', target.parent());
                        }
                        err.hide();
                    }
                },

                progress: function(){
                    var that = resumeControler;
                    $.ajax({
                        type: 'get',
                        url: CONTEXTPATH + '/resume/info.json?resumeId=' + resumeId,
                        beforeSend: function(){
                           // that.fragment.loading.show();
                        },
                        success: function(ret){
                          //  that.fragment.loading.hide();
                            if(ret){
                                $('#rsmProgress').html(ret);
                                //canvas  charts
                                $('canvas.reviewsDoughnutChart').doughnutChart({
                                    colors: ['#7cb228', '#ededed'],
                                    centerColor: '#ffffff',
                                    borderWidth: 10
                                });
                            }
                        },
                        error: function(){
                            //that.fragment.loading.hide();
                        }
                    });
                }
            },

            onReady: function(){
                var that = this;

                //create
                $('#resumeWrapper').on('click', 'div.rsm_ready i', function(){
                    $(this).parent().parent().find('a.rsm_add').hide();
                    //$('a.rsm_add').hide();
                    that.onCreate(this);

                //add
                }).on('click', 'a.rsm_add', function(){
                    $(this).hide();
                    $(this).parent().find('div.rsm_ready').hide();
                    that.onAdd(this);

                //edit single
                }).on('click', 'a.rsm_edit_p', function(){
                    that.onEdit(this, true);

                //edit more
                }).on('click', 'a.rsm_edit', function(){
                    that.onEdit(this);

                //delete
                }).on('click', 'a.rsm_del', function(){
                    that.onDelete(this);
                
                //cancel
                }).on('click', 'input.cancel', function(){
                    that.onCancel(this);
                    $('a.rsm_add').show();
                });
            },

            onCreate: function(target){
                //status = ready
                this.showEditor(target, $(target).parent(), 'create');
            },

            onAdd: function(target){
                //status = completed
                this.showEditor(target, $('div.rsm_completed', $(target).parent()), 'add');
            },

            onEdit: function(target, isSingle){
                //single
                //status = completed
                if(isSingle){
                    this.showEditor(target, $(target).parent());
                
                //more
                //status = item
                }else{
                    this.showEditor(target, $(target).parents('dl.def_model').eq(0));
                }
            },

            onDelete: function(target){
                var self = $(target),
                    that = this;
                $.maskUI.confirm({
                    msg: '确定要删除吗？',
                    zIndex: 111,
                    callback: function(){
                        $.ajax({
                            type: 'get',
                            url:  that.fragment.url.call(target, 'del'),
                            dataType: 'html',
                            data: {
                                resumeId: resumeId,
                                id: self.data('eid') || ''
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            success: function(ret){
                                //that.fragment.loading.hide();
                                if(ret){
                                    var wrap = $('#'+self.data('f')+'Wrap'),
                                        completedModel = $('div.rsm_completed', wrap);
                                    self.parent().parent().parent().fadeOut(200, function(){
                                        $(this).remove();
                                    });

                                    //如果没有展开的编辑框
                                    if(wrap.find('form:visible').length === 0){
                                        //如果删除的是最后一项
                                        if($.trim(ret) !== ''){
                                            completedModel.before(ret).hide();
                                        }
                                        
                                    }else{
                                        if($.trim(ret) !== ''){
                                            completedModel.hide();
                                        }
                                    }

                                    that.fragment.progress();
                                }
                            },
                            error: function(){
                                //that.fragment.loading.hide();
                            }
                        });
                    }
                });
            },

            onCancel: function(target){
                var that = this;
                var self = $(target);
                $.ajax({
                    type: 'get',
                    url:  this.fragment.url.call(target, 'get'),
                    dataType: 'html',
                    data: {
                        type: 'cancel',
                        resumeId: resumeId,
                        id: self.data('eid') || ''
                    },
                    beforeSend: function(){
                        //that.fragment.loading.show();
                    },
                    success: function(ret){
                       // that.fragment.loading.hide();
                        if(ret){
                            $('#'+self.data('f')).after(ret).remove();
                        }
                    },
                    error: function(){
                        //that.fragment.loading.hide();
                    }
                });
            },

            showEditor: function(target, status, model){
                var that = this,
                    self = $(target),
                    formName = self.data('f');
                
                if($('#'+formName).length){
                    return;
                }

                if(!model || model === 'create'){
                    status.hide();
                }

                $.ajax({
                    type: 'get',
                    url:  this.fragment.url.call(target, 'get'),
                    dataType: 'html',
                    data: {
                        type: 'edit',
                        resumeId: resumeId,
                        id: self.data('eid') || ''
                    },
                    beforeSend: function(){
                       // that.fragment.loading.show();
                    },
                    success: function(ret){
                        //that.fragment.loading.hide();
                        if(ret){
                            status.before(ret);
                      
                            var $form = $('#'+formName);

                            //初始化select
                            that.fragment.initSelect($form);

                            //添加校验
                            that.validateList[formName]($form, status, model);

                            //upload portrait
                            if($('#rsmPortrait').length){
                                upload_portrait({
                                    elems: $('#rsmPortrait a'),
                                    portrait: $('#rsmPortraitDialog'),
                                    show: $('#rsmPortrait img'),
                                    callbackName: 'uploadRsmOk',
                                    callback: function(url){
                                        $('input[name=headsUrl]').val(url);
                                    }
                                });
                            }
                        }
                    },

                    error: function(){
                        that.fragment.loading.hide();
                        if(!isAddition){
                            status.show();
                        }
                    }
                });
            },

            validateList: {
                //基本资料
                rsmBasicForm: function($form, status){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: 'input:text, input:hidden',
                        prompt: that.fragment.err,
                        more: {
                            experience: that.fragment.selectControler,
                            degree: that.fragment.selectControler,
                            currentStatus: that.fragment.selectControler,
                            birthdayYear: that.fragment.selectControler,
                            birthdayMonth: that.fragment.selectControler,
                            birthdayDay: that.fragment.selectControler,
                            mobile: {
                                type: 'isPhone',
                                msg: '请输入正确格式的手机号！'
                            },
                            email: {
                                type: 'isMail',
                                msg: '请输入正确格式的邮箱！'
                            }
                        },
                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, input:checked',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                               // that.fragment.loading.hide();
                            },
                            success: function(ret, _this){
                                //that.fragment.loading.hide();
                                if(ret){
                                    var fn = $form.attr('id');
                                    $form.hide().after(ret).remove();


                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status);
                                    }else{
                                        status.remove();

                                        that.fragment.progress();
                                    }
                                }
                            }
                        }
                    }).init().submit();
                },

                //期望工作
                rsmJobintensionForm: function($form, status){
                    var that = resumeControler,
                        rsmCitySuggest = $('#rsmCitySuggest'),
                        rsmCitySuggestHid = $('input[name=cityCode]', $form);
                    $form.validatorAll({
                        elems: 'input:text, input:hidden',
                        prompt: that.fragment.err,
                        more: {
                            jobNature: that.fragment.selectControler,
                            salary: that.fragment.selectControler,
                            cityName: function(_this, prompt, e){
                                var s = setTimeout(function(){
                                    clearTimeout(s);
                                    if(rsmCitySuggestHid.val() === ''){
                                        rsmCitySuggest.val('').trigger('blur');
                                    }
                                    return true;
                                },300);
                                return true;
                            }
                        },
                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, input:checked',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                                that.fragment.loading.hide();
                                if(ret){
                                    var fn = $form.attr('id');
                                    $form.hide().after(ret).remove();

                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status);
                                    }else{
                                        status.remove();
                                        that.fragment.progress();
                                    }
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                                //that.fragment.loading.hide();
                            }
                        }
                    }).init().submit(function(){
                        //等ajax确认城市的结果
                        if(rsmCitySuggestHid.val() === ''){
                            return false;
                        }else{
                            return true;
                        }
                    });

                    //选择城市
                    rsmCitySuggest.autocomplete({
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
                        //noCache: true,     /      
                        onSelect: function (suggestion) {
                            rsmCitySuggestHid.val(suggestion.data);
                        },
                        onSearchStart: function(){
                            //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
                            rsmCitySuggestHid.val('');
                        },
                        onInvalidateSelection: function(){
                            rsmCitySuggestHid.val('');
                        },
                        onSearchComplete: function(query, suggestions){
                            if(suggestions.length === 0){
                                rsmCitySuggestHid.val('');
                                return;
                            }
                            if(suggestions.length === 1){
                                rsmCitySuggestHid.val(suggestions[0].data);
                            }
                        },
                        autoSelectFirst: true
                    });
                },

                //工作经历
                rsmWorkexperienceForm: function($form, status, model){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: 'input:text, input:hidden, textarea',
                        prompt: that.fragment.err,
                        more: {
                            industryCode: that.fragment.selectControler,
                            workBeginDateYear: that.fragment.selectControler,
                            workBeginDateMonth: that.fragment.selectControler,
                            workEndDateYear: that.fragment.selectControler,
                            workEndDateMonth: that.fragment.selectControler
                        },

                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, textarea',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                               // that.fragment.loading.hide();
                                if(ret){
                                    $('a.rsm_add[data-type="workexperience"]').show();
                                    var fn = $form.attr('id');
                                    var wrap = $('#' + $form.attr('id') + 'Wrap');

                                    //添加
                                    if(model){
                                        $('div.rsm_completed', wrap).prepend(ret).show();

                                    //编辑  
                                    }else{
                                        status.before(ret);
                                    }
                                    
                                    $form.remove();

                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status, model);
                                    }else{
                                        if(!model){
                                            status.remove();
                                        }
                                        that.fragment.progress();
                                    }
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                               // that.fragment.loading.hide();
                            }
                        }
                    }).init().submit(function(){
                        if(!that.fragment.checkDate('workBeginDateYear', 'workEndDateYear', 'workBeginDateMonth', 'workEndDateMonth')){
                            $('#rsmWorkexperienceForm li.date p.err').html('请选择正确的日期范围！').show();
                            return false;
                        }else{
                            return true;
                        }
                    });
                },

                //项目经验
                rsmProjectexperienceForm: function($form, status, model){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: 'input:text, input:hidden, textarea',
                        prompt: that.fragment.err,
                        more: {
                            projectBeginDateYear: that.fragment.selectControler,
                            projectBeginDateMonth: that.fragment.selectControler,
                            projectEndDateYear: that.fragment.selectControler,
                            projectEndDateMonth: that.fragment.selectControler
                        },
                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, textarea',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                                //that.fragment.loading.hide();
                                if(ret){
                                    $('a.rsm_add[data-type="projectexperience"]').show();
                                    var fn = $form.attr('id');
                                    var wrap = $('#' + $form.attr('id') + 'Wrap');

                                    //添加
                                    if(model){
                                        $('div.rsm_completed', wrap).prepend(ret).show();

                                    //编辑  
                                    }else{
                                        status.before(ret);
                                    }
                                    
                                    $form.remove();

                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status, model);
                                    }else{
                                        if(!model){
                                            status.remove();
                                        }
                                        that.fragment.progress();
                                    }
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                               // that.fragment.loading.hide();
                            }
                        }
                    }).init().submit(function(){
                        if(!that.fragment.checkDate('projectBeginDateYear', 'projectEndDateYear', 'projectBeginDateMonth', 'projectEndDateMonth')){
                            $('#rsmProjectexperienceForm li.date p.err').html('请选择正确的日期范围！').show();
                            return false;
                        }else{
                            return true;
                        }
                    });
                },

                //教育背景
                rsmEducationexperienceForm: function($form, status, model){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: 'input:text, input:hidden, textarea',
                        prompt: that.fragment.err,
                        more: {
                            degree: that.fragment.selectControler,
                            eduStartDateYear: that.fragment.selectControler,
                            eduEndDateYear: that.fragment.selectControler
                        },
                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, textarea',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                                $('a.rsm_add[data-type="educationexperience"]').show();
                                //that.fragment.loading.hide();
                                if(ret){
                                    var fn = $form.attr('id');
                                    var wrap = $('#' + fn + 'Wrap');

                                    //添加
                                    if(model){
                                        $('div.rsm_completed', wrap).prepend(ret).show();

                                    //编辑  
                                    }else{
                                        status.before(ret);
                                    }
                                    
                                    $form.remove();


                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status, model);
                                    }else{
                                        if(!model){
                                            status.remove();
                                        }
                                        that.fragment.progress();
                                    }
                                    
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                               // that.fragment.loading.hide();
                            }
                        }
                    }).init().submit(function(){
                        if(!that.fragment.checkDate('eduStartDateYear', 'eduEndDateYear')){
                            $('#rsmEducationexperienceForm .date p.err').html('请选择正确的日期范围！').show();
                            return false;
                        }else{
                            return true;
                        }
                    });
                },

                //自我描述
                rsmSelfevaluationForm: function($form, status){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: 'textarea',
                        prompt: that.fragment.err,
                        ajaxSubmit: {
                            elems: 'textarea, input:hidden',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                               // that.fragment.loading.hide();
                                if(ret){
                                    var fn = $form.attr('id');
                                    _this.form.hide().after(ret).remove();

                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status);
                                    }else{
                                        status.remove();
                                        that.fragment.progress();
                                    }
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                                //that.fragment.loading.hide();
                            }
                        }
                    }).init().submit();
                },

                // 作品展示
                rsmWorksshowForm: function($form, status, model){
                    var that = resumeControler;
                    $form.validatorAll({
                        elems: '',
                        prompt: that.fragment.err,
                        ajaxSubmit: {
                            elems: 'input:text, input:hidden, textarea',
                            data: function(){
                                return '&resumeId=' + resumeId;
                            },
                            dataType: 'html',
                            success: function(ret, _this){
                                //that.fragment.loading.hide();
                                if(ret){
                                    $('a.rsm_add[data-type="worksshow"]').show();
                                    var fn = $form.attr('id');
                                    var wrap = $('#' + fn + 'Wrap');

                                    //添加
                                    if(model){
                                        $('div.rsm_completed', wrap).prepend(ret).show();

                                    //编辑  
                                    }else{
                                        status.before(ret);
                                    }
                                    
                                    $form.remove();


                                    //服务错误时 返回编辑状态
                                    var returnedForm = $('#'+fn);
                                    if(returnedForm.length){
                                        //初始化select
                                        that.fragment.initSelect(returnedForm);

                                        //添加校验
                                        that.validateList[fn](returnedForm, status, model);
                                    }else{
                                        if(!model){
                                            status.remove();
                                        }
                                        that.fragment.progress();
                                    }
                                    
                                }
                            },
                            beforeSend: function(){
                                //that.fragment.loading.show();
                            },
                            error: function(){
                               // that.fragment.loading.hide();
                            }
                        }
                    }).init().submit();
                }
            }
        };

        resumeControler.init();


        // 我的简历 右侧导航
        $('#resumeBar').on('click', 'a', function(e){
            e.preventDefault();
            $('html, body').animate({'scrollTop': $($(this).attr('href')).offset().top}, 200);
            $(this).addClass('current').siblings().removeClass('current');
        });

        var anchors = $('a[id^=ritem]'),
            resumeBarItems = $('#resumeBar a'),
            wh = $(window).height();
        $(window).on('scroll', function(){
            var st = $(document).scrollTop(),
                len = resumeBarItems.length - 1;

            for(; len > -1;len--){
                var c = anchors.eq(len);
                if(st >= c.offset().top){
                    resumeBarItems.removeClass('current').eq(len).addClass('current');
                    break;
                }
            }
        });

        //
        $('canvas.reviewsDoughnutChart').doughnutChart({
            colors: ['#7cb228', '#ededed'],
            centerColor: '#ffffff',
            borderWidth: 10
        });

        //upload portrait
        upload_portrait({
            elems: $('#profilePortraitBtn'),
            portrait: $('#portrait'),
            show: $('#profilePortrait, #profilePortraitAlias')
        });

        //滚动
        var obj = $('#resumeBar');
        var toplength = obj.offset().top;
        $(window).scroll(function(){
            var scroH = $(this).scrollTop(); 
            if(scroH > toplength){
                obj.addClass('fixed');
            }else{
                obj.removeClass('fixed');
            }
        });
    });
});


