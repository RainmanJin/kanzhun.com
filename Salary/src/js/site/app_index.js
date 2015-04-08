require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require(['u/tabs', 'u/autocomplete', 'u/wx-share'], function(){
  $(function () {
    //tabs
    var placeholders = ['请输入公司名称', '请输入职位名称'];
    $('#searchTabs').tabs({
      tabSelector: 'dt>a',
      panelCancel: true,
      current: 'current',
      callback: function(index, panel, tabs){
        tabs.find('input[type=text]').attr('placeholder', placeholders[index]);
      }
    });

    //show floating search
    var floating = $('section.floating');
    var floatingSearcher = $('#floatingSearcher');
    $('#searchTabs input').on('click', function(){
      var index = $('#searchTabs dt>a.current').index() || 0;
      floatingSearcher.find('dt>a').eq(index).trigger('click');
      floating.show();
      floatingSearcher.find('input[type=text]').eq(index).focus();
    });

    floating.css('height', $('#wrapper').height());

    //close
    $('a.floating-c', floating).on('click', function(){
      floating.hide();
    });

    //
    floatingSearcher.tabs({
      tabSelector: 'dt>a',
      tabPanel: 'dd>input[type=text]',
      current: 'current',
      callback: function(index, panel, tabs){
        $('div.hot-suggestions').eq(index).show().siblings('div.hot-suggestions').hide();
      }
    });

    //职位autocomplete
    $('#jobSuggest').autocomplete({
      serviceUrl: '/activity/appbsalary/autojob.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.jobtitleSalaryStatInfoJson||[], function (dataItem) {
            return { value: dataItem.jobTitle, data: dataItem.salaryCount, id: dataItem.id};
          })
        };
      },
      onSelect: function (suggestion) {
        return false;
      },
      preserveInput: true,
      maxHeight: 'auto',
      width: '100%',
      showNoSuggestionNotice: true,
      noSuggestionNotice: '<p class="p10">暂无数据，请更换关键词！</p>',
      appendTo: $('div.f-suggestions'),

      //修改最终显示的信息
      formatResult: function (suggestion, currentValue) {
        return '<a href="/activity/appbsalary/joblist?id='+ suggestion.id +'">' + '<span>共'+ suggestion.data +'条工资</span>' + suggestion.value + '</a>';
      }
    });

    //公司 autocomplete
    $('#coSuggest').autocomplete({
      serviceUrl: '/activity/appbsalary/companyList.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.companyJson||[], function (dataItem) {
            return { value: dataItem.name, data: dataItem.salaryCount, id: dataItem.id};
          })
        };
      },
      preserveInput: true,
      maxHeight: 'auto',
      width: '100%',
      showNoSuggestionNotice: true,
      noSuggestionNotice: '<p class="p10">暂无数据，请更换关键词！</p>',
      appendTo: $('div.f-suggestions'),

      //修改最终显示的信息
      formatResult: function (suggestion, currentValue) {
        return '<a href="/activity/appbsalary/companyindex/?companyId='+ suggestion.id +'">' + '<span>共'+ suggestion.data +'条工资</span>' + suggestion.value + '</a>';
      }
    });


    function initPhoneList(){
      var index=0;
      listInner=$('div.index-marquee .inner'),
        list=listInner.find('ul'),
        count=list.find('li').length,
        cloneList=list.clone();
      listInner.append(cloneList);
      setInterval(function(){
        if(index==count){
          index=0;
          listInner.css({'margin-top':0});
        }
        index++;
        listInner.animate({'margin-top':-(40*index)});
      },4000);
    };

    initPhoneList();

    var wxShare = require('u/wx-share');
    wxShare($('a.wx-share-btn'), '<p class="pt10">点击右上角的【分享按钮】<br/>分享到朋友圈</p>', function(){
      /*
      window.shareCallback = function(){
        $.get('/activity/bsalary/increase.json');
      }
      */
    });

    //滚动加载更多
    $(function(){
      function more(){
        var timer;
        $(window).on("scroll",function(){
          //loadMore();
          //延时处理可以去掉
          if(timer){
            clearTimeout(timer);
            timer=null;
          }
          timer=setTimeout(function(){
            loadMore();
          },200);
        });
        function loadMore(){
          var oResult=$(".js_more_result:visible");
          var page=oResult.data('page')||2;
          var	more=oResult.data("more");
          var oMore=oResult.siblings('.sc_more');
          if(more!==''&&!more){
            return;
          }

          var wH=$(window).height();
          var sT=$(window).scrollTop();
          var sH=$(document).height();
          var isAjax=0;
          if(wH+sT>=sH){
            if(isAjax){
              return;
            }
            isAjax=1;
            $.ajax({
              url:oResult.data("url")+page,
              dataType:"json",
              beforeSend:function(){
                oMore.show();
              },
              success:function(result){
                oMore.hide();
                oResult.append(result.html);
                //more=result.more;
                //page=result.nextPage;
                oResult.data('page',result.nextPage);
                oResult.data('more',result.more);
                isAjax=0;
              },
              error:function(){
                isAjax=0;
              }
            });
          }
        }
      }
      more();
    });

  })
});