require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        comp: '../../components',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'

    }
});

require(['c/widgets','c/auth_dialog','c/mini_search', 'highcharts','u/drilldown', 'u/data'], function(widgets,auth_dialog,mini_search,highcharts, drilldown, data){
$(function(){
    var more_details = $('span.more_details');

    $('span.more').click(function(){
      if(more_details.is(':hidden')){
        more_details.show();
        $(this).html('<i>收起</i>');
      }else {
        more_details.hide();
        $(this).html('...<i>展开</i>');
      }
    });
    
    $('a.seemore').click(function(){
      var moreCollege = $(this).parent('p').prev('ul').find($('li.moreCollege'));
      if(moreCollege.is(':hidden')){
        moreCollege.show();
        $(this).html('收起');
      }else {
        moreCollege.hide();
        $(this).html('查看更多');
      }
    });

        
    var options1 = {
        chart: {
            renderTo: 'container',
            type: 'column',
            width: 645,
            height: 240
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            categories: [],
            tickLength: 0,
            lineColor: '#7db128',
            lineWidth: 1,
            gridLineWidth: 1,
            gridLineColor: '#e8e8e8',
            labels: {
                style: {
                  color: '#999999',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
            }
            //showLastLabel: false
        },
        yAxis: {
            title: {
                text: ''
            },
            //type: 'category',
            labels: {
                align: 'right',
                x: -10,
                y: 10,
                style: {
                  color: '#999999',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
            },
            lineColor: '#7db128',
            lineWidth: 1,
            tickLength: 0,
            alternateGridColor: '#f2f2f2',
            gridLineWidth: 0,
            showFirstLabel: false
            //tickInterval: 5000,  //自定义刻度 
            //max:30000,//纵轴的最大值 
            //min: 0,//纵轴的最小值 
            //showLastLabel: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                }
            },
            column: {
                pointWidth: 40,
                borderRadius: 3
            }
        },
        tooltip: {
            backgroundColor: '#9fc862',
            shadow: false,
            formatter: function() { 
                return '<b style="color: #fff;font-size: 12px;padding: 0;">'+ this.y +'</b>'; 
            } 

        }, 
        series: [],
        credits: {
            enabled: false
        }
    };

    //折线图
    var options2 = {
        chart: {
            renderTo: 'containertwo',
            type: 'line',
            width: 645,
            height: 240
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'category',
            categories: [],
            tickLength: 0,
            lineColor: '#7db128',
            lineWidth: 1,
            gridLineWidth: 1,
            gridLineColor: '#e8e8e8',
            labels: {
                style: {
                  color: '#fff',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
            }
            //showLastLabel: false
        },
        yAxis: {
            title: {
                text: ''
            },
            //type: 'category',
            labels: {
                align: 'right',
                x: -10,
                y: 10,
                style: {
                  color: '#999999',
                  fontWeight: 'normal',
                  fontSize: '12px'
                }
            },
            lineColor: '#7db128',
            lineWidth: 1,
            tickLength: 0,
            alternateGridColor: '#f2f2f2',
            gridLineWidth: 0,
            showFirstLabel: false
            //tickInterval: 5000,  //自定义刻度 
            //max:30000,//纵轴的最大值 
            //min: 0,//纵轴的最小值 
            //showLastLabel: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            line: {
                lineWidth: 2
            }
        },
        tooltip: {
            backgroundColor: '#9fc862',
            shadow: false,
            formatter: function() { 
                return '<b style="color: #fff;font-size: 12px;padding: 0;">'+ this.y +'</b>'; 
            } 

        }, 
        series: [],
        credits: {
            enabled: false
        }
    };

    var counterItems = salaryDataJosn,
        counterItems2 = publishDataJosn,
        i = 0,
        i2 = 0,
        series1 = {
        color:'#9fc862',
         data: []
        };
     var series2 = {
         color:'#9fc862',
          data: []
      };
    $.each(counterItems, function(items, value){
        options1.xAxis.categories.push(value.counterItem.name);
        series1.data.push(value.counterItem.count);
        if(value.counterItem.count !== '0'){
            i = 1;
        }
    })
    if(i == 0){
        $('img.nodata').removeClass('none');
    }else{
        options1.series.push(series1);
        //Create the chart
        var chart = new Highcharts.Chart(options1);
    }
    $.each(counterItems2, function(items, value){
        options2.xAxis.categories.push(value.counterItem.name);
        series2.data.push(value.counterItem.count);
        if(value.counterItem.count !== '0'){
            i2 = 1;
        }
    })
    if(i2 == 0){
        $('img.nodata2').removeClass('none');
        $('p#explains').css('display','none');
    }else{
        options2.series.push(series2);
        //Create the chart
        var chart = new Highcharts.Chart(options2);
    }
});
});




