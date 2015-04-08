/*
 工资图标，用于工资详情，工资列表，招聘展开
 */

define(['c/auth_dialog', 'c/widgets', 'highcharts'], function (auth_dialog) {
  return function (options) {
    var o = $.extend({
      table: null,
      callback: null,
      showFirst: true
    }, options);

    var showSalaryChart = function(data){
      var sXcategories = [],
        sSeryData = [],
        tooltipt = [];
      $.each(data||[], function (i, v) {
        sXcategories.push(v.item.name);
        sSeryData.push(v.item.count);
        tooltipt.push({
          y: v.percent,
          marker: {
            fillColor: '#7db2e6',
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
          lineColor: '#007ead',
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
          lineColor: '#007ead',
          gridLineColor: '#f2f2f2' //y轴 网格线颜色
        },
        tooltip: {
          formatter: function () {
            return tooltipt[this.point.x].y + '%'
          }
        },
        plotOptions: {
          area: {
            fillOpacity: 0.3
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

    //events
    o.table.on('mouseenter', 'tr:not(".s-d-c")', function(){
      $(this).addClass('on');
    }).on('mouseleave', 'tr:not(".s-d-c")', function(){
      $(this).removeClass('on');

    //show chart
    //trigger的时候用noPropagation， 目的是不触发全局的click事件，减少统计
    }).on('click noPropagation', 'div.s-d-digit', function(){
      var $this = $(this).parent().parent();
      var chartTr = $('#' + $this.attr('id') + '_C'),
        chart = $('section', chartTr);

      if(!chartTr.hasClass('none')){
        chartTr.addClass('none');
        $this.removeClass('show_flip');
        return;
      }


      if(chart.children().length){
        chartTr.removeClass('none').siblings('tr.show_flip').not($this).find('div.s-d-digit').trigger('noPropagation');

        //tr的两个class：
        //.on 控制hover时候显示背景色和向下箭头
        //.show 控制展开时向下箭头不消失
        //.loading 为ajax时的loading图片
        $this.addClass('show_flip');

      }else{
        $.ajax({
          type: 'get',
          url: CONTEXTPATH + $this.data('url'),
          data: o.data,
          beforeSend: function(){
            $this.removeClass('on').find('div.s-d-digit').append('<img src="'+CONTEXTPATH+'/images/loading.gif" class="loading">');
          },
          success: function(ret){
            $this.addClass('show_flip').find('img.loading').remove();
            chartTr.removeClass('none').siblings('tr.show_flip').not($this).find('div.s-d-digit').trigger('noPropagation');
            if(ret && ret.jobSalaryStatJson){
              showSalaryChart.call(chart, ret.jobSalaryStatJson);
            }
          }
        });
      }

    //注册登录
    }).on('click', 'a[href=#login],a[href=#register]', function(e){
      e.preventDefault();
      auth_dialog.open($(this).attr('href'));

    //靠谱
    }).upOrDown({
      url: CONTEXTPATH +'/salary/',
      delegate: 'a.mark',
      data: function(){
        return {
          cityCode: $('#cityCode').val(),
          salaryJobId: this.data('sid')
        };
      },
      countSelector: '>em'
    });

    //第一行职位的chart 如果没有被隐藏则默认展开（招聘详情页默认是隐藏的）
    if(o.showFirst){
      o.table.find('div.s-d-digit').eq(0).not(':hidden').trigger('noPropagation');
    }
  };
});
