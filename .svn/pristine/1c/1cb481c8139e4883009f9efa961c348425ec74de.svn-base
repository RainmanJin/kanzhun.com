require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require(['u/highcharts', 'u/wx-share'], function(){
  var showSalaryChart = function(data){
    if(!data){
      return;
    }
    var sXcategories = [],
      sSeryData = [],
      tooltipt = [];
    $.each(data||[], function (i, v) {
      sXcategories.push(v.item.name);
      sSeryData.push(v.item.count);
      tooltipt.push({
        y: v.percent,
        marker: {
          fillColor: '#68bf57',
          lineColor: '#fff',
          lineWidth: 2,
          radius: 5
        }
      });
    });

    this.highcharts({
      chart: {
        type: 'area'
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      xAxis: {
        categories: sXcategories,
        labels: {
          style: {
            color: '#999999',
            fontSize: '12px'
          }
        },
        lineColor: '#c3e5bc',
        plotBands: {
          color: '#fff'
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        labels: {
          style: {
            color: '#999999',
            fontSize: '12px'
          },
          format: '{value}%'
        },
        lineWidth: 1,
        lineColor: '#c3e5bc',
        gridLineColor: '#f2f2f2' //y轴 网格线颜色
      },
      tooltip: {
        formatter: function () {
          return tooltipt[this.point.x].y + '%'
        }
      },
      plotOptions: {
        area: {
          fillOpacity: 0.3,
          lineColor: '#6ac059',
          fillColor: 'rgba(179,214,172,.4)'
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        data: tooltipt
      }]
    });
  };

  showSalaryChart.call($('div.co-chart'), coChartJSON);

  var wxShare = require('u/wx-share');
  wxShare($('a.wx-share-btn'), '<p class="pt10">点击右上角的【分享按钮】<br/>分享到朋友圈</p>', function(){
   /*
    window.shareCallback = function(){
      $.get('/activity/bsalary/increase.json');
    }
    */
  });

  //切换
  $('.chart-nav').on('click','a',function(){
    var _t=$(this);
    var type=_t.data('type');
    var chart=$('div.co-chart');
    var comment=$('div.comment');
    _t.removeClass('current').siblings('a').addClass('current');
    if(type=='chart'){
      comment.hide();
      chart.show();
    }else if(type=='comment'){
      chart.hide();
      comment.show();
    }
  });
  //评论
  var comment=$('div.comment');
  var companyId=$('[name="company"]').val();
  $('.bt-comment',comment).on('click',function(){
    var ipt=$('input',comment),
      iptVal= $.trim(ipt.val());
    if(iptVal==''){
      ipt.addClass('shine').one('animationend webkitAnimationEnd', function(){
        $(this).removeClass('shine');
      });
      return false;
    }
    $.ajax({
      type: 'post',
      url: '/activity/bsalary/publish.json',
      dataType: 'json',
      data: {
        companyId:companyId,
        originId:companyId,
        type:2,
        commentContent:iptVal
      },
      beforeSend: function(){
      },
      success: function(ret){
        if( ret.rescode == 1){
          $('.no-result').hide();
          if($.trim(ret.html) !== ''){
            $('.comment-list ul').prepend($(ret.html).hide().delay(200).fadeIn());
            ipt.val('').focus();
            var count=parseInt($('.i-count').text())+1;
            console.log(count);
            $('.i-count').html(count);
          }else{
            alert('您的评论不符合要求，请修改！');
            ipt.focus();
          }
        }
      },
      error: function(){

      }
    });
  });

  //更多
  $('a.more_details').on('click', function(){
    var _t = $(this);
    $.ajax({
      url: '/activity/bsalary/review.json',
      dataType:'json',
      data:{
        companyId:companyId,
        originId:companyId,
        lastId:_t.data('lastid'),
        type: _t.data('ctype')
      },
      success: function(ret){
        if(ret){
          _t.siblings('.comment-list ul').append(ret.html);
          //_t.data('page', ret.nextPage);
          _t.data('lastid',ret.lastId);
          if(!ret.more) {
            _t.hide();
          }
        }
      }
    });
  });

});