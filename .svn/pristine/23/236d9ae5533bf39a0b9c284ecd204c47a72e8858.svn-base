require.config({
	baseUrl: '/js/site',
	paths: {
		u: '../utils',
		c: '.',
    comp: '../../components'
	}
});

require(['u/highcharts','u/highcharts-more'], function() {
	$(function() {
		//雷达图
    $('.polar').highcharts({
        chart: {
            polar: true,
            type: 'line',
            style: {
            	fontFamily:"Arial,STHeiti,Microsoft YaHei,simsun,Helvetica,sans-serif"
            },
            marginTop:30
        },
        title: {
           text: ''
        },
        pane: {
           size: '80%'
        },
        xAxis: {
        	categories: ['<div class="x_label" style="position:relative;top:-20px;"><i class="i_round roundN">N</i><br>稳定性</div>', 
        							 '<div class="x_label"><i class="i_round roundE">E</i><br>外向型</div>',
        							 '<div class="x_label"><i class="i_round roundO">O</i><br>创新性</div>', 
        							 '<div class="x_label"><i class="i_round roundA">A</i><br>顺应性</div>',
        							 '<div class="x_label"><i class="i_round roundC">C</i><br>执行力</div>'],
          tickmarkPlacement: 'on',
          lineWidth: 0,
          labels:{
          	formatter:function(){
          		return '<span>'+this.value+'</span>';
          	},
          	distance:10,
          	useHTML:true
          }
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: 100,
    		  labels: {
    				formatter: function() {
    					return "";
    				}
          },
          tickInterval: 20//自定义刻度
        },
        tooltip: {
            //shared: true,
            //pointFormat: '{point.y}',
            formatter:function(){
            	return '<span>'+this.y+'</span>';
            },
            useHTML:true
        },
        series: [{
            name: '',
            //data: [59, 31, 35, 98, 38],
            data: polarData,
            pointPlacement: 'on',
            color: '#7cb228'
        }],
        legend: {
          enabled: false
        },
		   	credits: {
			    enabled: false //隐藏highcharts标识
			  },
    });

		$.fn.doughnutChart = function(o) {
			this.each(function(m, n) {
				try {
					var target = $(n),
						ratio = target.data('ratio').split('_'),
						colors = o.colors,
						ctx = n.getContext('2d'),
						center = Math.floor(target.height() / 2),
						radius = center,
						startAngle = Math.PI * 1.5,
						endAngle = Math.PI * 1.5;

					$.each(ratio, function(i, v) {
						//弧度 = 角度 * Math.PI / 180 
						//v*360*Math.PI/180 =  v * Math.PI * 2
						endAngle = endAngle - v * Math.PI * 2;
						ctx.fillStyle = colors[i];
						ctx.beginPath();

						ctx.moveTo(center, center);
						ctx.arc(center, center, radius, startAngle, endAngle, true);
						ctx.closePath();
						ctx.fill();
						startAngle = endAngle;
					});

					ctx.fillStyle = o.centerColor;
					ctx.beginPath();
					ctx.arc(center, center, radius - o.borderWidth, 0, Math.PI * 2, true);
					ctx.fill();
				} catch (err) {}
			});
		}
	});
	$(function() {
		//获取主机url
		function getRootPath() {
			var curWwwPath = window.document.location.href;
			var pathName = window.document.location.pathname;
			var pos = curWwwPath.indexOf(pathName);
			var localhostPath = curWwwPath.substring(0, pos);
			return localhostPath;
		};
		$(".list_N canvas").doughnutChart({
			colors: ['#ffd087', '#ddf0ea'],
			centerColor: '#ffffff',
			borderWidth: 8
		});
		$(".bt_more").on("click", function() {
			var oDetail = $(this).prev();
			if (oDetail.is(":visible")) {
				oDetail.hide();
				$(this).html("展开");
			} else {
				oDetail.show();
				$(this).html("收起");
				$(".list_N canvas").doughnutChart({
					colors: ['#ffd087', '#ddf0ea'],
					centerColor: '#ffffff',
					borderWidth: 8
				});
				$(".list_E canvas").doughnutChart({
					colors: ['#ffacac', '#ddf0ea'],
					centerColor: '#ffffff',
					borderWidth: 8
				});
				$(".list_O canvas").doughnutChart({
					colors: ['#bdb5e4		', '#ddf0ea'],
					centerColor: '#ffffff',
					borderWidth: 8
				});
				$(".list_A canvas").doughnutChart({
					colors: ['#b0dfaf', '#ddf0ea'],
					centerColor: '#ffffff',
					borderWidth: 8
				});
				$(".list_C canvas").doughnutChart({
					colors: ['#7dcdff', '#ddf0ea'],
					centerColor: '#ffffff',
					borderWidth: 8
				});
			}
		});
		$(".report_job canvas").doughnutChart({
			colors: ['#76cbc6', '#ddf0ea'],
			centerColor: '#ffffff',
			borderWidth: 14
		});
		//匹配的职位导航事件绑定
		$(".report_job .nav li a").on("click", function(index) {
			var aList = $(".report_job .nav li a");
			var _index = $(this).parent().index();
			aList.attr("class", "");
			$(this).attr("class", "current");
			var cList = $(".report_job .content>div.list");
			cList.hide();
			$(cList[_index]).show().find("canvas").doughnutChart({
				colors: ['#76cbc6', '#ddf0ea'],
				centerColor: '#ffffff',
				borderWidth: 14
			});;
		})
		//邀请朋友输入框字数限制
		$(".report_friend textarea").on("keyup", function() {
			var count = 140 - $(this).val().length;
			if (count >= 0) {
				$(".textarea_msg").html('您还可以输入<span class="blue">' + count + '</span>个字');
			} else {
				$(".textarea_msg").html('您已超出输入<span class="red">' + Math.abs(count) + '</span>个字');
			}
		});
		//分享到微博
		$(".js_sinaShare").on("click", function() {
			var title = $(".report_friend textarea").val();
			var pic = getRootPath() + $(".report_friend .friend_r img").attr("src");
			var href = "http://v.t.sina.com.cn/share/share.php?title=" + encodeURIComponent(title) + "&pic=" + pic;
			window.open(href);
			//var form=$("#shareForm")[0];
			//form.target="_blank";
			//form.action=href;
			//console.log(href);
			//form.submit();
			//href="http://v.t.sina.com.cn/share/share.php?appkey=2844920245&amp;url=http://v.show.sina.com.cn/500561&amp;title=%22%CE%D2%CF%D6%D4%DA%D5%FD%D4%DA%D6%D0%B9%FA%D7%EE%B4%F3%CA%D3%C6%B5%BB%A5%B6%AF%C9%E7%C7%F8%D0%C2%C0%CBSHOW%A3%AC%D7%DB%D2%D5%A3%AC%CD%DB%C5%B6%21%BA%C3%B6%E0%BE%AB%B2%CA%B5%C4%BD%DA%C4%BF%D2%AE%7E%22&amp;content=utf-8&amp;source=&amp;sourceUrl=&amp;pic=http://i2.sinaimg.cn/uc/sinashow4.0/logo.gif"
		})
	});
});