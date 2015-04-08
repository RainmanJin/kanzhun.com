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

//有用(赞)
$("body").on("click", ".js_useful", function() {
  var _this = $(this);
  if (_this.attr("rel") == "nofollow") {
    return;
  }

  _this.find("i").removeClass("i_mark_h").addClass("i_mark");
  _this.attr("rel", "nofollow");

  var sid = _this.data('sid');
  var url = _this.data('url');
  var type = _this.data('type');
  var data = "";
  if (type == "interview") {
    data += "interviewId=" + sid;
    var num = parseInt(_this.find("span").html());
    _this.find("span").html(num + 1);
  }

  $.ajax({
    url: url,
    data: data,
    success: function(result) {}
  });
});

//生成图表
var aXcategories = [],
    aSeryData = [];
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