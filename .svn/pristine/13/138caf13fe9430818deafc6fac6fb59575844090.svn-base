require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});

require(['c/auth_dialog', 'v2/search/search-left-filter', 'c/company/salary_desc', 'c/job_searcher', 'c/mini_search', 'c/seo/bottomlinks'], function(auth_dialog){
  $(function(){
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

    //职位订阅
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

    var jobSearcher = require('c/job_searcher');
    jobSearcher.init();
  });
});