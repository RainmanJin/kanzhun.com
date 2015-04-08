require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});

require(['v2/search/search-left-filter', 'c/company/salary_desc', 'c/mini_search', 'c/seo/bottomlinks'], function(){
  $(function(){
    //工资图标
    var salaryDesc = require('c/company/salary_desc');
    $('table.salary-desc').each(function(i, v){
      salaryDesc({
        table: $(v),
        //第一个table是表头，所以这里为1
        showFirst: i === 1 ? true :false
      });
    });

    //职位薪资柱状图
    try{
      var sXcategories = [],
        sSeryData = [],
        tooltipt = [];
      $.each(salaryStat||[],function(i,v){
        sXcategories.push(v.item.name);
        sSeryData.push(v.percent);
        /*tooltipt.push(v.percent);*/
      });
      $('#average_wage').highcharts({
        chart: {
          type: 'column',
          marginTop: 0,
          marginRight: 0,
          spacingLeft: 0
        },
        title:{
          text:''
        },
        xAxis:{
          categories: sXcategories,
          lineColor:"#007ead",
          lineWidth:1,
          tickColor: "#007ead",
          tickPosition: 'inside',
          tickLength: 4,
          endOnTick: false,
          labels: {
            style: {
              color: "#343434",
              fontSize: "12px"
            },
            y: 16
          }
        },
        plotOptions: {
          series: {
            color: '#c5dcf2',
            states: {
              hover: {
                enabled: false
              }
            }
          },
          column: {
            pointWidth: 25
          }
        },
        tooltip: {
          useHTML: true,
          headerFormat: '',
          backgroundColor: '#bcd891',
          shadow: false,
          borderWidth: 0,
          formatter: function () {
            return sSeryData[this.point.x] + '%'
          }
        },
        yAxis:{
          title:{
            text:""
          },
          lineColor:"#007ead",
          lineWidth:1,
          gridLineColor: "#e7e7e7",
          tickPosition: 'outside',
          tickWidth: 1,
          tickLength: 6,
          endOnTick: false,
          showFirstLabel: false,
          maxPadding: 0.01,
          labels: {
            style: {
              color: '#343434',
              fontSize: '12px'
            },
            format: '{value}%',
            x: -10
          }
        },
        series: [{
          data: sSeryData
        }],
        legend: {
          enabled: false
        },
        credits: {
          enabled: false //隐藏highcharts标识
        }
      })
      //柱状图结束
    }catch (err){}
  });
});