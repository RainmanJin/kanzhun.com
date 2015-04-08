var morecon = $('span.show_details');

$('span.more').click(function(){
	if( morecon.length ){
		if( morecon.is(':hidden') ){
			morecon.removeClass('hidden');
			$(this).html('<i>收起</i>');
		}else {
			morecon.addClass('hidden');
			$(this).html('... <i>展开</i>');
		}
	}
})

//生成图表
var aXcategories = [],
    aSeryData = [],
    riseRate = [];
$.each(jobPublishWeek,function(i,v){
  aXcategories.push(v.counterItem.name);
  aSeryData.push(v.counterItem.count);
});
$('#js_employment_trend').highcharts({
  chart: {
    type: "line",
    marginRight: 10,
    spacing: [5, 0, 0, 0]
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
        color: "#343434",
        fontSize: "12px"
      },
      rotation: -45
    }
  },
  tooltip: {
  	enabled: false
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
        color: '#343434'
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
  });
$('#js_salary_trend').highcharts({
  chart: {
    type: "line",
    marginRight: 10,
    spacing: [5, 0, 0, 0]
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
        color: "#343434",
        fontSize: "12px"
      },
      rotation: -45
    }
  },
  tooltip: {
  	enabled: false
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
        color: '#343434'
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

$('#js_academic_requirements').highcharts({
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
  	enabled: false
  },
  plotOptions: {
    pie: {
      size: '80%',
      //center: [null, 65],
      borderWidth: 1,
      borderColor: '#fff',
      dataLabels: {
        enabled: true,
        useHTML: true,
        color: '#343434',
        distance: 15,
        y: -10,
        format: '<p>{point.name}</p><span style="color: #999999;">占{point.percentage:.1f}%</span>'
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
    enabled: false
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

var eSeryData = [];
 $.each(jobExperience,function(i,v){
   eSeryData.push([v.counterItem.name, v.percentage]);
 });

$('#js_worke_experience').highcharts({
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
  	enabled: false
  },
  plotOptions: {
    pie: {
      size: '80%',
      //center: [null, 65],
      borderWidth: 1,
      borderColor: '#fff',
      dataLabels: {
        enabled: true,
        useHTML: true,
        color: '#343434',
        distance: 15,
        y: -10,
        format: '<p>{point.name}</p><span style="color: #999999;">占{point.percentage:.1f}%</span>'
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
    enabled: false
  },
  series: [{
      type: 'pie',
      name: null,
      data: eSeryData
  }],
  credits: {
    enabled: false //隐藏highcharts标识
  }
}) 

var jSeryData = [];
 $.each(jobSalary,function(i,v){
   jSeryData.push([v.counterItem.name, v.percentage]);
 });

$('#js_salary_distribution').highcharts({
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
  	enabled: false
  },
  plotOptions: {
    pie: {
      size: '80%',
      //center: [null, 65],
      borderWidth: 1,
      borderColor: '#fff',
      dataLabels: {
        enabled: true,
        useHTML: true,
        color: '#343434',
        distance: 15,
        y: -10,
        format: '<p>{point.name}</p><span style="color: #999999;">占{point.percentage:.1f}%</span>'
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
    enabled: false
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
