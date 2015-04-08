require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});


require(['c/auth_dialog', 'c/widgets', 'c/job_searcher', 'c/mini_search', 'c/company/salary_desc'], function(auth_dialog, widget, jobSearcher){
    $(function(){

        var moreIndsBox = $('#moreIndsBox'),
            moreInds = $('#moreInds'),
            onCss = $.support.css3Property('transition');

        $('#moreIndsBtn').on('click', function(){
            if(moreInds.length){
                // > 13
                if ( onCss ) {
                    moreIndsBox.find('dt>i').addClass('right');
                } else {
                    moreIndsBox.find('dt>i').addClass('right_nocss3');
                    $(this).parent().parent().parent().prev('dt').addClass('leftTrangle');
                }
                moreInds.show();
                moreIndsBox.find('dl').addClass('clickmore');
            }else{
                // 6 - 13
                $(this).remove();
                moreIndsBox.find('dd>ul').eq(1).show();
            }

        });

        var timer;
        moreIndsBox.on('mouseleave', function(e){
            e.stopPropagation();

            timer = setTimeout(function(){
                moreInds.hide();
                if ( onCss ) {
                    moreIndsBox.find('dt>i').removeClass('right');
                } else {
                    moreIndsBox.find('dt>i').removeClass('right_nocss3');
                }
                moreIndsBox.find('dl').removeClass('clickmore');
            }, 400);

        }).on('mouseenter', function(e){
            e.stopPropagation();
            clearTimeout(timer);
        });

        $('dl.s_opts dt').on('click', function(){
            var self = $(this), list = self.next('dd');
            if( !onCss ){
                $(this).removeClass('leftTrangle').toggleClass('direction');
            } 
            
            if(!list.is(':animated')){
                if ( onCss ) {
                    self.find('i').removeClass('right').toggleClass('up');
                } else {
                    self.find('i').removeClass('right_nocss3').toggleClass('up_nocss3');
                }

                list.slideToggle();
            }
        });


        //工资图表
        var salaryDesc = require('c/company/salary_desc');


        $('#jobSearchRet').on('click', 'p.sr_nav>a', function(e){
            e.preventDefault();
            var self = $(this),
                url = self.attr('href'),
                wrap = self.parents('div.sparrow');

            wrap.find('dl.spw').addClass('slidedown');
            if(self.attr('href').indexOf('#') !== 0){
                $.ajax({
                    type: 'get',
                    url: url,
                    dataType: 'html',
                    beforeSend: function(){
                        self.attr('href', '#');
                        wrap.find('div.evaluation_info').hide().end().find('div.loading').show();
                    },
                    success: function(ret){
                      var elems = $(ret);
                      wrap.find('div.loading').hide().end().append(elems.fadeIn());

                        //idiot
//                        salaryMoving.init(elems);

                      salaryDesc({
                        table: elems.find('table.salary-desc')
                      });

                    },
                    error: function(){
                        self.attr('href', url);
                        url = null;
                    }
                });
            }else{
                wrap.find('div.evaluation_info').hide().end().find('div.' + self.data('panel')).fadeIn();
            }

            self.addClass('current').siblings('a').removeClass('current');
        }).on('click', 'div.evaluation_info>a.close', function(e){
            var spw = $(this).parents('div.evaluation_info').hide().siblings('dl.spw');
            spw.removeClass('slidedown');
            spw.find('p.sr_nav>a').removeClass('current');
        }).on('click', 'a.favorite', function(e){
            e.preventDefault();
            if(!auth_dialog.isLogged()){
                auth_dialog.open('#login');
                return;
            }
            var self = $(this), param = self.data('j');
            if(param){
                $.getJSON(CONTEXTPATH + '/job/adduserjc.json?jobId='+ param, function(ret){
                    ret = ret || {};
                    if(ret.rescode == 1011){
                        auth_dialog.open('#login');
                    }else if(ret.rescode == 1){
                        self.html('已收藏').addClass('favorited').data('j', null);
                    }
                });
            }
        });

        var jobSerDialog = $('#jobSerDialog');
        $('#createJobSer').on('click', function(e){
            e.preventDefault();

            //is logged
            if(auth_dialog.isLogged()){
                if(jobSerDialog.length){
                    $.maskUI.open({
                        elem: jobSerDialog,
                        pos: 'absolute'
                    });

                    $('input:text.v', jobSerDialog).placeholderS();
                }else{

                }

            }else{
                auth_dialog.open('#login');
            }

        });
        jobSearcher.init();


      $('#miniSearchSlTile').DIYSelect({
        listSelector: 'dd a',
        listCallback: function (list, field, target) {
          $('#minisearchForm').attr('action', $(this).attr('href'));
        }
      });

        $('.unfold').on('click',function(){
            var self = $(this), list = self.parent().siblings('.other');

            if(!list.is(':animated')){
                if ( onCss ) {
                    self.find('i').toggleClass('up');
                } else {
                    self.find('i').toggleClass('up_nocss3');
                }
                list.slideToggle();
                if(self.hasClass('current')){
                    self.find('span').html('展开');
                }else{
                    self.find('span').html('收起');
                }
                self.toggleClass('current');
            }
        });

        //根据情况加是否延时
        moreIndsBox.find('.more').each(function(k,v){
            var moreEnterTimer,
                moreLeaveTimer;
            $(v).on('mouseleave', function(e){
                e.stopPropagation();
                var _t=$(this);
                moreLeaveTimer = setTimeout(function(){
                    _t.removeClass('current');
                }, 0);
                clearTimeout(moreEnterTimer);
            }).on('mouseenter', function(e){
                e.stopPropagation();
                var _t=$(this);
                moreEnterTimer = setTimeout(function(){
                    _t.addClass('current');
                }, 0);
                clearTimeout(moreLeaveTimer);
            });
        });

    });

});