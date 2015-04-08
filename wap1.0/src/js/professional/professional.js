getUrlParam = function(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r!=null) return unescape(r[2]); return null;
}

var tagIndex = getUrlParam('tagIndex');

//console.log($('ul.inner_nav li a').eq(tagIndex)[0]);

/*$('ul.inner_nav li a').eq(tagIndex).addClass('current').parent('li').siblings('li').find('a').removeClass('current');
$('div.conbox').eq(tagIndex).removeClass('none').siblings('div.conbox').addClass('none');*/

$('ul.inner_nav li a').click(function(e) {
	e.preventDefault();
	var index = $(this).parent('li').index(),
			dataOk = $('#chart_slary').data('ok');
			$('div.conbox').eq(index).removeClass('none').siblings('div.conbox').addClass('none');
			$(this).addClass('current').parent('li').siblings('li').find('a').removeClass('current');

	if(index == 1 && dataOk == 'yes'){
		var sXcategories = [],
		    sSeryData = [];
		$.each(jobSalaryStat,function(i,v){
		  sXcategories.push(v.counterItem.name);
		  sSeryData.push(v.percentage);
		});

		$('#chart_slary').highcharts({
		  chart: {
		    type: 'column',
		    spacing: [0, 0, 0, 0]
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
		        color: "#999999",
		        fontSize: "12px"
		      }
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
		        pointWidth: 20
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
		      style: {
		        color: '#999999',
		        fontSize: '12px'
		      },
		      format: '{value}%'
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
		$('#chart_slary').data('ok', 'no');
		//console.log($('#chart_slary').data('ok'))
	}

	var count = 1;
	if(index == 3){
		var aListWrap = $('#js_p_list'),
				aList = $('#js_p_list li'),
				len = aList.length,
				lHeight = 0,
				canCount = Math.floor( len/10 ) + 1;

  function countItem(itemIndex){
  	$.each(aList, function(i, v){
  		if( i < itemIndex ){
  			lHeight += $(v).height();
  		}
  	})

  	aListWrap.height(lHeight + (itemIndex-1) * 5);
  	lHeight = 0;
  }

  if( len < 10 ){
  	countItem( len );
  }else {
  	countItem(10);
  }

		$('#js_see_more').click(function(){
			var onOff = len - count * 10;
			count += 1;

			if( count <= canCount ) {

				if( onOff > 0 && onOff < 10 ){
					countItem( (count-1) * 10 + onOff );
				}

				if( onOff >= 10 ) {
					countItem( count * 10 );
				}
			}

		})
	}
})

$('ul.inner_nav li a').eq(tagIndex).trigger('click');
