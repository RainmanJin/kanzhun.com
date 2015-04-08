$(function(){
  function createSalaryReport(json){
    var counterItems=json.counterItems,
      aXcategories=[],
      aSeryData=[],
      keyName="", //我所在的工资范围
      titleHtml="",
      lineHtml="";
    $.each(counterItems||[],function(i,v){
      aXcategories.push(v.item.name);
      aSeryData.push(v.percent);
      if(retJSON.selfRange==v.item.id){
        keyName=v.item.name;
      }
    });
    $("div.h-chart").highcharts({
      chart:{
        type:"column"
      },
      title:{
        text:''
      },
      xAxis:{
        categories:aXcategories,
        lineColor:"#007ead",
        lineWidth:1
      },
      yAxis:{
        title:{
          text:""
        },
        tickInterval: 10,//自定义刻度
        labels: {
          formatter: function() {
            return this.value +'%';
          }
        },
        lineColor:"#007ead",
        lineWidth:1
      },
      series: [{
        color:"#c5dcf2",
        data:aSeryData
      }],
      legend: {
        enabled: false
      },
      credits: {
        enabled: false //隐藏highcharts标识
      },
      plotOptions:{
//        column: {
//          dataLabels: {
//            enabled: true,
//            formatter: function() {
//              var key=this.key;
//              if(keyName==key){
//                return '<p style="color:#85c15d;text-align:center" text-anchor="middle">我在这</p>￥'+json.salary;
//              }else{
//                return;
//              }
//            },
//            useHTML:true
//          },
//          enableMouseTracking: false
//        }
      }
    });
  }

  createSalaryReport(retJSON)
});