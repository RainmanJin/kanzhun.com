require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
        highcharts: 'http://s.kanzhun.com/js/utils/highcharts'
    }
});

require(['c/widgets', 'highcharts', 'c/job/po_common'],function(){
  $(function(){

  //代码开始的地方
  //有用没用
  $('#propectPage').upOrDown({
    url: CONTEXTPATH + '/trends/',
    delegate: 'a.mark',
    data: function () {
      return {
        jobsId: this.data('sid')
      };
    }
  });

  //生成图表
  var aXcategories = [],
      aSeryData = [],
      riseRate = [];
  $.each(jobPublishWeek,function(i,v){
    aXcategories.push(v.counterItem.name);
    aSeryData.push(v.counterItem.count);
    riseRate.push(v.riseRate);
  });
  $('#js-trendchart').highcharts({
    chart: {
      type: "line",
      marginTop: 0,
      marginRight: 10,
      spacing: [0, 0, 0, 0]
    },
    title:{
      text:''
    },
    xAxis:{
      categories: aXcategories,
      lineColor:"#007ead",
      lineWidth:1,
      tickColor: "#007ead",
      tickPosition: 'inside',
      tickLength: 4,
      /*startOnTick: false,*/
      /*endOnTick: false,*/
      /*showLastLabel: false,*/
      tickmarkPlacement: 'on',
      labels: {
        style: {
          color: "#999999",
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      useHTML: true,
      headerFormat: '',
//      backgroundColor: null,
      shadow: false,
      /*borderWidth: 0,*/
      formatter: function () {
          if(riseRate[this.point.x] >= 0){
            jobvalues = '<em style="color: #999999;">涨&nbsp;&nbsp;&nbsp;幅：</em>' + riseRate[this.point.x]
          }else {
            jobvalues = '<em style="color: #999999;">降&nbsp;&nbsp;&nbsp;低：</em>' + Math.abs(riseRate[this.point.x])
          }
          return '<p><em style="color: #999999;">需求量：</em>'+ this.y + '个<br>' + jobvalues + '%</p>'
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
      maxPadding: 0.2,
      labels: {
        format: '{value}',
        style: {
          fontSize: '12px',
          color: '#999999'
        }

      }
    },
    plotOptions: {
        line: {
          dataLabels: {
              enabled: true,
              format: '{y}',
              color: '#343434'
          }
        }
    },
    series: [{
      data: aSeryData
    }],
    legend: {
      enabled: false
    },
    credits: {
      enabled: false //隐藏highcharts标识
    }
  })
  
  var sXcategories = [],
      sSeryData = [],
      sriseRate = [];
  $.each(jobExperienceSalary,function(i,v){
    sXcategories.push(v.counterItem.name);
    sSeryData.push(v.counterItem.count);
    sriseRate.push(v.riseRate);
  });
  $('#js-LevelChart').highcharts({
    chart: {
      type: "line",
      marginTop: 0,
      marginRight: 10,
      spacing: [0, 0, 0, 0]
    },
    title:{
      text:''
    },
    xAxis:{
      /*type: 'datetime',
      dateTimeLabelFormats: {
          year: '%y'
      },*/
      categories: sXcategories,
      lineColor:"#007ead",
      lineWidth:1,
      tickColor: "#007ead",
      tickPosition: 'inside',
      tickLength: 4,
      tickmarkPlacement: 'on',
      labels: {
        style: {
          color: "#999999",
          fontSize: "12px"
        }
      }
    },
    tooltip: {
      useHTML: true,
      headerFormat: '',
//      backgroundColor: null,
      shadow: false,
      /*pointFormat: '<p><em style="color: #999999;">月薪：</em>{point.y}<br><em style="color: #999999;">涨幅：</em>25%</p>'*/
      formatter: function () {
          if(riseRate[this.point.x] >= 0){
            jobvalues = '<em style="color: #999999;">涨幅：</em>' + riseRate[this.point.x]
          }else {
            jobvalues = '<em style="color: #999999;">降低：</em>' + Math.abs(riseRate[this.point.x])
          }
          return '<p><em style="color: #999999;">月薪：</em>'+ this.y + '元<br>' + jobvalues + '%</p>'
      }
    },
    plotOptions: {
        line: {
          dataLabels: {
              enabled: true,
              format: '￥{y}',
              color: '#343434'
          }
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
      maxPadding: 0.5,
      labels: {
        //format: '({value}/1000)+k',
        formatter:function(){
          return (this.value)/1000+'k';
        },
        style: {
          fontSize: '12px',
          color: '#999999'
        }
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

  //饼图-学历
  var dSeryData = [];
  $.each(jobDegree,function(i,v){
    dSeryData.push([v.counterItem.name, v.percentage]);
  });

  $('#js-c-pie').highcharts({
    chart: {
//      plotBackgroundColor: null,
//      plotBorderWidth: null,
      plotShadow: false
    },
    colors:[
      '#93d640',//第一个颜色
      '#9dce41',//第二个颜色
      '#bae25e',//第三个颜色
      '#9ed544', //。。。。
      '#c3f079',
      '#aee15e',
      '#75bc32',
      '#89c53b'
    ],
    title:{
      text:''
    },
    tooltip: {
      formatter: function(index) {
           return  this.point.name + '<br>占' + this.point.y + '%';
      }
    },
    plotOptions: {
      pie: {
        size: '80%',
        center: [null, 65],
        borderWidth: 1,
        borderColor: '#fff',
        dataLabels: {
          enabled: false
        },
        /*allowPointSelect: true,*/
        showInLegend: true,
        states: {
            hover: {
                halo: {
                  size: 10,
                  opacity: 0.5
                }
            }
        }
      }
    },
    legend: {
      floating: true,
      padding: 0,
      margin: 0,
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 10,
      maxHeight: 110,
      itemStyle: {
        color: '#343434',
        fontWeight: 'normal'
      },
      align: 'center',
      //itemWidth: 100,
      labelFormatter: function () {
        return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
      },
      y:-20 //饼图距离说明文字的距离
    },
    series: [{
        type: 'pie',
        name: null,
        data: dSeryData
    }],
    credits: {
      enabled: false //隐藏highcharts标识
    }
  })

  //工作经历
  var jSeryData = [];
  $.each(jobExperience,function(i,v){
    jSeryData.push([v.counterItem.name, v.percentage]);
  });

  $('#js-c-piejob').highcharts({
    chart: {
//      plotBackgroundColor: null,
//      plotBorderWidth: null,
      plotShadow: false
    },
    colors:[
      '#147cde',//第一个颜色
      '#0870c9',//第二个颜色
      '#16b6cc',//第三个颜色
      '#0ca6f0', //。。。。
      '#05c1f1',
      '#4c98c2',
      '#a7dbff'
    ],
    title:{
      text:''
    },
    tooltip: {
      formatter: function(index) {
           return  this.point.name + '<br>占' + this.point.y + '%';
      }
    },
    plotOptions: {
      pie: {
        size: '80%',
        center: [null, 65],
        borderWidth: 1,
        borderColor: '#fff',
        dataLabels: {
          enabled: false
        },
        /*allowPointSelect: true,*/
        showInLegend: true,
        states: {
            hover: {
                halo: {
                  size: 10,
                  opacity: 0.5
                }
            }
        }
      }
    },
    legend: {
      floating: true,
      padding: 0,
      margin: 0,
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 10,
      maxHeight: 110,
      itemStyle: {
        color: '#343434',
        fontWeight: 'normal'
      },
      itemWidth: 100,
      align: 'center',
      labelFormatter: function () {
        return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
      },
      y: -2 //饼图距离说明文字的距离
    },
    series: [{
        type: 'pie',
        name: null,
        data: jSeryData
    }],
    credits: {
      enabled: false //隐藏highcharts标识
    }
  })

  //工资
  var sSeryData = [];
  $.each(jobSalary,function(i,v){
    sSeryData.push([v.counterItem.name, v.percentage]);
  });

  $('#js-c-piesalary').highcharts({
    chart: {
//      plotBackgroundColor: null,
//      plotBorderWidth: null,
      plotShadow: false
    },
    colors:[
      '#f16822',//第一个颜色
      '#f68121',//第二个颜色
      '#f6981a',//第三个颜色
      '#f8ae1b', //。。。。
      '#f7dd17',
      '#f7dd17',
      '#f55727'
    ],
    title:{
      text:''
    },
    tooltip: {
      formatter: function(index) {
           return  this.point.name + '<br>占' + this.point.y + '%';
      }
    },
    plotOptions: {
      pie: {
        size: '80%',
        center: [null, 65],
        borderWidth: 1,
        borderColor: '#fff',
        dataLabels: {
          enabled: false
        },
        /*allowPointSelect: true,*/
        showInLegend: true,
        states: {
            hover: {
                halo: {
                  size: 10,
                  opacity: 0.5
                }
            }
        }
      }
    },
    legend: {
      floating: true,
      padding: 0,
      margin: 0,
      symbolHeight: 10,
      symbolWidth: 10,
      symbolRadius: 10,
      maxHeight: 110,
      itemStyle: {
        color: '#343434',
        fontWeight: 'normal'
      },
      //itemWidth: 70,
      align: 'center',
      labelFormatter: function () {
        return this.name/* + '-' + this.y + '%'*/;//在名称后面追加百分比数据
      },
      y:-20
    },
    series: [{
        type: 'pie',
        name: null,
        data: sSeryData
    }],
    credits: {
      enabled: false //隐藏highcharts标识
    }
  })
  //代码开始的地方
})
})