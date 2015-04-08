
require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.',
      comp: '../../components'
    }
});

require(['c/auth_dialog', 'c/widgets'], function(auth_dialog){
  $(function(){
		$.maskUI.open({
			elem: $('section.p_dialog')
		});
  	
	  $('.select').DIYSelect({
	    listCallback: function (l, field, select) {
	      select.removeClass('s_err').addClass('s_suc');
	      field.parent().find('input[type=hidden]').val($(this).data('val'));
	      if(field.parent().parent().find('input[name=experienceDes_h]')) {
	      	field.parent().parent().find('input[name=experienceDes_h]').val($(this).text());
	      }
	      
	      if(field.parent().parent().find('input[name=industryDes_h]')) {
	      	field.parent().parent().find('input[name=industryDes_h]').val($(this).text());
	      }
	    }
	  });
	  //是否显示知己帮助
	  function isShowZhijiHelp(){
	  	var zj_help=$.readCookie("zj_help");
	  	if(!zj_help){
	  		$("#zj_help").show();
	  	}
	  }
	  isShowZhijiHelp();
  });
	$(function() {
		var start_number = questionData.start_number; 
		var centerIndex = start_number-1;
		var isfinish = questionData.isfinish;
		if(isfinish==1){
			centerIndex+=1;
		}	
		var questCount = questionData.data.length; //问题总个数
		var questCss = {
				lHide: {
					top: "120px",
					left: "-25%",
					width: "20%",
					height: "240px"
				},
				l: {
					top: "120px",
					left: 0,
					width: "20%",
					height: "240px"
				},
				c: {
					top: "70px",
					left: "25%",
					width: "50%",
					height: "350px"
				},
				r: {
					top: "120px",
					left: "80%",
					width: "20%",
					height: "240px"
				},
				rHide: {
					top: "120px",
					left: "100%",
					width: "20%",
					height: "240px"
				}
			}
			/*
		var questData = [
			"我尽量对遇到的每一个人都彬彬有礼1",
			"我尽量对遇到的每一个人都彬彬有礼2",
			//"我尽量对遇到的每一个人都彬彬有礼3",
			//"我尽量对遇到的每一个人都彬彬有礼4",
			//"我尽量对遇到的每一个人都彬彬有礼5",
			//"我尽量对遇到的每一个人都彬彬有礼6",
		];
		*/
		function initZhijiQuest() {
			createQuest();
		}

		function createQuest() {
			var w = $("body").width();
			var len = questionData.data.length;
			var h = "";
			h += '<ul>';
			for (var i = 0; i < len; i++) {
				if(centerIndex > i){
					h += '<li style="top:120px;left:-' + ((centerIndex-i)-1)*20 + '%;width:20%;height:240px;" data-id='+questionData.data[i].id+'>';
					h += '<div>';
					h += '<div class="head">';
					h += '<h3 style="display:none">请选出符合您实际情况的选项。</h3>';
					h += '<div class="side"></div>';
					h += '</div>';
					h += '<div class="content" style="display:none">';
					h += '<p>' + questionData.data[i].question + '</p>';
					h += '</div>';
					h += '<div class="button" style="display:none" action-type="next">';
					h += '<a ka="zj-button-'+(i+1)+'-1" class="big'+(questionData.data[i].result==1?' current':'')+'" href="javascript:;">不符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-2" class="middle'+(questionData.data[i].result==2?' current':'')+'" href="javascript:;">不太符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-3" class="small'+(questionData.data[i].result==3?' current':'')+'" href="javascript:;">说不清</a>';
					h += '<a ka="zj-button-'+(i+1)+'-4" class="middle'+(questionData.data[i].result==4?' current':'')+'" href="javascript:;">有点符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-5" class="big'+(questionData.data[i].result==5?' current':'')+'" href="javascript:;">符合</a>';
					h += '</div>';
					h += '</div>';
					h += '<div class="mask"></div>';
					h += '</li>';
				}else if(centerIndex == i){
					h += '<li style="left:' + questCss.c.left + ';" data-id='+questionData.data[i].id+'>';
					h += '<div>';
					h += '<div class="head">';
					h += '<h3>请选出符合您实际情况的选项。</h3>';
					h += '<div class="side"></div>';
					h += '</div>';
					h += '<div class="content">';
					h += '<p>' + questionData.data[i].question + '</p>';
					h += '</div>';
					h += '<div class="button" action-type="next">';
					h += '<a ka="zj-button-'+(i+1)+'-1" class="big" href="javascript:;">不符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-2" class="middle" href="javascript:;">不太符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-3" class="small" href="javascript:;">说不清</a>';
					h += '<a ka="zj-button-'+(i+1)+'-4" class="middle" href="javascript:;">有点符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-5" class="big" href="javascript:;">符合</a>';
					h += '</div>';
					h += '</div>';
					h += '<div class="mask" style="display:none"></div>';
					h += '</li>';
				} else {
					h += '<li style="top:120px;left:' + (80 + (i - centerIndex -1) * 20) + '%;width:20%;height:240px;" data-id='+questionData.data[i].id+'>';
					h += '<div>';
					h += '<div class="head">';
					h += '<h3 style="display:none">请选出符合您实际情况的选项。</h3>';
					h += '<div class="side"></div>';
					h += '</div>';
					h += '<div class="content" style="display:none">';
					h += '<p>' + questionData.data[i].question + '</p>';
					h += '</div>';
					h += '<div class="button" style="display:none" action-type="next">';
					h += '<a ka="zj-button-'+(i+1)+'-1" class="big" href="javascript:;">不符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-2" class="middle" href="javascript:;">不太符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-3" class="small" href="javascript:;">说不清</a>';
					h += '<a ka="zj-button-'+(i+1)+'-4" class="middle" href="javascript:;">有点符合</a>';
					h += '<a ka="zj-button-'+(i+1)+'-5" class="big" href="javascript:;">符合</a>';
					h += '</div>';
					h += '</div>';
					h += '<div class="mask"></div>';
					h += '</li>';
				}
			}
			h += '</ul>';
			h += '<div class="mask"></div>';
			h += '<a class="prev" ' + (centerIndex>0?'':'style="display:none"')+' href="javascript:;" ka="zhiji-ago">上一题</a>';
			h += '<a class="next" style="display:none" href="javascript:;"></a>';
			$(".zhiji_quest .header").after(h);
			createUserInfoDom();
		}

		function createUserInfoDom() {
			/*
			h += '<li style="top:120px;left:100%;width:20%;height:240px;">';
			h += '<div>';
			h += '<div class="head">';
			h += '<h3 style="display:none">填写信息</h3>';
			h += '<div class="side"></div>';
			h += '</div>';
			h += '<div class="content" style="display:none">';
			h += '<ul>';
			h += '<li>';
			h += '<dl class="select select_s">';
			h += '<dt>';
			h += '<input type="hidden" name="experience" value="0" class="v" data-necessary="1">';
			h += '<input type="button" name="experienceDes" value="请选择" readonly="readonly"><span class="btn"><i></i></span>';
			h += '</dt>';
			h += '<dd style="display: none;">';
			h += '<a href="javascript:;" rel="nofollow" data-val="7">应届毕业生</a>';
			h += '<a href="javascript:;" rel="nofollow" data-val="1">1年以下</a>';
			h += '<a href="javascript:;" rel="nofollow" data-val="2">1-3年</a>';
			h += '<a href="javascript:;" rel="nofollow" data-val="3">3-5年</a>';
			h += '<a href="javascript:;" rel="nofollow" data-val="4">5-10年</a>';
			h += '<a href="javascript:;" rel="nofollow" data-val="5">10年以上</a>';
			h += '</dd>';
			h += '</dl>';
			h += '</li>';		
			h += '</ul>';
			h += '</div>';
			h += '<div class="button" style="display:none">';
			h += '<a class="center" href="javascript:;">下一步</a>';
			h += '</div>';
			h += '</div>';
			h += '<div class="mask"></div>';
			h += '</li>';
			*/
			if(isfinish){
				$("#userInfoDom").css({
					top: questCss.c.top,
					left: questCss.c.left,
					width: questCss.c.width,
					height: questCss.c.height
				});
				$("#userInfoDom").find(".head h3,.content,.button").show();
				$("#userInfoDom").find(".mask").hide();			
			}
			$(".zhiji_quest>ul").append($("#userInfoDom").show());
		}
		//下翻
		function animateNext() {
			var len = $(".zhiji_quest li").length;
			var oL = $($(".zhiji_quest li")[centerIndex - 1]);
			oL.animate({
				top: questCss.lHide.top,
				left: questCss.lHide.left,
				width: questCss.lHide.width,
				height: questCss.lHide.height
			});

			var oC = $($(".zhiji_quest li")[centerIndex]);
			oC.animate({
				top: questCss.l.top,
				left: questCss.l.left,
				width: questCss.l.width,
				height: questCss.l.height,
				opacity: 0
			}, function() {
				if (centerIndex > 0) {
					$(".zhiji_quest").find(".prev").show();
				}
				if(start_number<centerIndex+2){
					start_number=centerIndex+1;
					$(".zhiji_quest").find(".next").hide();
					changeProgress();
				}
				
				$(this).find(".head h3,.content,.button").hide();
				$(this).find(".mask").show();
				$(this).css({opacity: 1});
			});

			var oR = $($(".zhiji_quest li")[centerIndex + 1]);
			oR.animate({
				top: questCss.c.top,
				left: questCss.c.left,
				width: questCss.c.width,
				height: questCss.c.height
			}, function() {
				$(this).find(".head h3,.content,.button").show();
				$(this).find(".mask").hide();
			});

			var oRHide = $($(".zhiji_quest li")[centerIndex + 2]);
			oRHide.animate({
				top: questCss.r.top,
				left: questCss.r.left,
				width: questCss.r.width,
				height: questCss.r.height
			});
			centerIndex++;
			$("#start_number").html(centerIndex+1>questCount?questCount:centerIndex+1);
		}
		//上翻
		function animatePrev() {
			var len = $(".zhiji_quest li").length;
			var oLHide = $($(".zhiji_quest li")[centerIndex - 2]);
			oLHide.animate({
				top: questCss.l.top,
				left: questCss.l.left,
				width: questCss.l.width,
				height: questCss.l.height
			});
			var oL = $($(".zhiji_quest li")[centerIndex - 1]);
			oL.animate({
				top: questCss.c.top,
				left: questCss.c.left,
				width: questCss.c.width,
				height: questCss.c.height
			}, function() {
				$(this).find(".head h3,.content,.button").show();
				$(this).find(".mask").hide();
			});
			var oC = $($(".zhiji_quest li")[centerIndex]);
			oC.animate({
				top: questCss.r.top,
				left: questCss.r.left,
				width: questCss.r.width,
				height: questCss.r.height,
				opacity: 0
			}, function() {
				//if (centerIndex < len - 1) {
					$(".zhiji_quest").find(".next").show();
				//}
				if (centerIndex == 0) {
					$(".zhiji_quest").find(".prev").hide();
				}
				$(this).find(".head h3,.content,.button").hide();
				$(this).find(".mask").show();
				$(this).css({opacity:1});
			});
			var oR = $($(".zhiji_quest li")[centerIndex + 1]);
			oR.animate({
				top: questCss.rHide.top,
				left: questCss.rHide.left,
				width: questCss.rHide.width,
				height: questCss.rHide.height
			});
			centerIndex--;

			$("#start_number").html(centerIndex+1);
		}
		//改变答题进度条
		function changeProgress(){
			if(start_number>questCount){
				return;
			}
			var percent=Math.ceil(start_number/questCount*100) + "%";
			$("#nav_percent p").css({
				width:percent
			});
			$("#nav_percent em").html(percent);
		}
		$(".zhiji_quest").on("click", ".next", animateNext).on("click", ".prev", animatePrev);
		$(".help").on("click", ".close", function() {
			$(".help").hide();
			$.writeCookie("zj_help",1,365);
		})
		//答题按钮事件绑定
		var ajaxFlag=true;
		$(".zhiji_quest").on("click", '.button[action-type="next"] a', function() {
			var aList = $(this).parent().children();
			aList.removeClass("current");
			$(this).addClass("current");

			var qid=$(this).closest("li").attr("data-id");
			var choose=$(this).index()+1;
			if(ajaxFlag){
				$.ajax({
					url: "/zhiji/answer.json",
					data:{
						q:qid,
						c:choose
					},
					dataType:"json",
					success:function(result){
						ajaxFlag=true;
						if(result.rescode==1){
							animateNext();
						}
					}
				});
			}
			ajaxFlag=false;
		});
		//答题页性别事件绑定
		$("p.sex span").on("click",function(){
			var list=$(this).parent().children();
			list.removeClass("current");
			$(this).addClass("current");
			var val=$(this).attr("data-value");
			$('[name="gender"]').val(val);
		})
		//答题提交
		$(".js_submit").on("click",function(){
			var bFlag=true, emailE;
			$('[name="experience"],[name="position"],[name="education"],[name="industry"], [name="email"]').each(function(){
				var sVal=$.trim($(this).val());
				if(sVal=="0"||sVal==""){
					$('input[name="email"]').parent().find("p.err").html('请输入邮箱!');
					if($(this).attr("type")=="hidden"){
						$(this).parent().parent().parent().find("p.err").show();
					}else{
						$(this).parent().find("p.err").show();
					}
					bFlag=false;
					emailE = false;
				}else{
					if($(this).attr("type")=="hidden"){
						$(this).parent().parent().parent().find("p.err").hide();
					}else{
						$(this).parent().find("p.err").hide();
					}			
					emailE = true;	
				}

				if(emailE) {
					if((/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test($('input[name="email"]').val())) {
						$(this).parent().find("p.err").html('请输入邮箱!').hide();
					}else {
						bFlag=false;
						$(this).parent().find("p.err").html('请输入正确的邮箱!').show();
					}

				}

			});
			if(bFlag){
				$("#zhijiForm").submit();
			}
		});
		//获取焦点隐藏提示
		(function(){
			$("dl.select a").on("click",function(){
				$(this).parent().parent().parent().find("p.err").hide();
			})
			$("#zhijiForm [type=text]").on("focus",function(){
				$(this).parent().find("p.err").hide();
			})
		})();
		initZhijiQuest();
	}); 
});

/*
var questionData = [{
	"id": 1,
	"question": "问题1",
	"result": 1,
	"isFlag": 0
}, {
	"id": 2,
	"question": "问题2",
	"result": 1,
	"isFlag": 0
}];
*/
$(function() {
	/*
	$('canvas.reviewsDoughnutChart').doughnutChart({
		colors: ['#7cb228', '#ededed'],
		centerColor: '#ffffff',
		borderWidth: 6
	});	
	*/
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
