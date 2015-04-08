require.config({
	baseUrl: '/js/site',
  paths: {
    u: '../utils',
    s: '.'
  }
});
require(['s/company/general','u/highcharts','u/share'], function(){
	$(function(){
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
    //showSalaryChart.call($('div.co-chart'), coChartJSON);

    $('.openDetail').on('click',function(){
      var _t=$(this);
      var chart=$('#co_chart');
       if(chart.is(':visible')){
         chart.hide();
         _t.find('span').html('工资分布');
         _t.find('i').removeClass('i_close');
       }else{
         chart.show();
         showSalaryChart.call($('div.co-chart'), coChartJSON);
         _t.find('span').html('收起');
         _t.find('i').addClass('i_close');
       }
    });

    var wxShare = require('u/share');
    if($('body').data('ua')){
      wxShare($('a.wx-share-btn'),'<p class="pt10">点击右上角的【分享按钮】<br/>分享到朋友圈</p>');
    }else{
      wxShare($('a.wx-share-btn'),'','browser');
    }

	});
});