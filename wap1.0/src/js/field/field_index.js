$(function() {

  var f_canvas = $('canvas.reviewsDoughnutChart') || '';
  //canvas  charts
  f_canvas.doughnutChart({
    colors: ['#67bf58', '#ededed'],
    centerColor: '#ffffff',
    borderWidth: 4
  });

  $('#field_tabs').tabs({
    tabSelector: 'nav.f_minor_nav p a',
    current: 'current',
    tabPanel: 'div.f_minor_con',
    callback: function (index, panel, tabs) {
      //$('.f_l_con div.wrap_style').eq(index).show().siblings('div.wrap_style').hide();

      this.parent().css({'background-position': 109 * index + 'px bottom'});

      $.each(f_canvas, function (i, v) {
        if (!$(v).is(':hidden')&&$(v).data('had')!='ok') {
          $(v).doughnutChart({
            colors: ['#67bf58', '#ededed'],
            centerColor: '#ffffff',
            borderWidth: 4
          });
          $(v).attr('data-had', 'ok');
        }
      });

    },
    animate: 'fadeIn'
  });


  $(document).bind("click",function(e){
    var target  = $(e.target);
    if(target.closest(".co_pk_tip").length == 0&&target.closest(".co_pk_tip_p").length==0){
      $(".co_pk_tip").addClass('none');
    } else {
      if(target.closest(".co_pk_tip_p").length>0){
        $(".co_pk_tip").toggleClass('none');
      }else{
        $(".co_pk_tip").removeClass('none');
      }
    }
  });

  var aCoColor=['#7db2e6', '#f4a484','#68bf57','#f483b7'];
  var showSalaryChart = function(json){
    var aColor=aCoColor;
    var series=[];
    var sXcategories = [];
    $.each(json,function(k,v){
      var sery={
        data:[]
      };
      $.each(v,function(k_1,v_1){
        sery.data.push({
          y: v_1.percent,
          marker: {
            symbol: 'circle',
            fillColor: aColor[k],
            lineColor: '#fff',
            lineWidth: 2,
            radius: 5
          }
        });
        sXcategories.push(v_1.item.name);
      });
      series.push(sery);
    });

    this.highcharts({
      chart: {
        type: 'area',
        style: {
          fontFamily:'微软雅黑'
        }
      },
      title: {
        text: ''
      },
      legend: {
        enabled: false
      },
      colors: aCoColor,
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
      /*
      tooltip: {
        formatter: function () {
          return this.y + '%'
        }
      },
      */
      tooltip: {
        shared: true,
        pointFormat: '<span style="color:{series.color}">\u25CF</span> <b>{point.y}</b><br/>',
        valueSuffix: '%'
      },
      plotOptions: {
        area: {
          fillOpacity: 0.3
        }
      },
      credits: {
        enabled: false
      },
      series: series
    });
  };
  showSalaryChart.call($('.PK_charts'),salaryStatAry);
});
