(function() {

	//iscroll
	/*
	index是滚动条的x轴的起始位置
	*/
	$.initMenuScroll = function(index) {
		if (document.querySelector('section.menu')) {

			var myScroll = new IScroll('#companyMenu', {
				scrollX: true,
				scrollY: false,
				mouseWheel: false,
				preventDefault: false,
				startX: -56 * index || 0,
				eventPassthrough: true
			});
			/*
			myScroll = new IScroll('#companyMenu', { eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
			*/
			document.querySelector('.menu a.moving').addEventListener('click', function(e) {
				e.preventDefault();
				myScroll.scrollTo(myScroll.x - 50, 0, 600, IScroll.utils.ease.quadratic);
			}, false);
		}
	}
	//page index
	if (document.querySelector('section.channel')) {
		document.querySelector('section.channel').addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var target = e.target;
			if (target.nodeName === 'A') {
				var form = document.querySelector('#searchForm');
				form.setAttribute('action', target.getAttribute('href'));
				form.querySelector('input[type=text]').setAttribute('placeholder', target.getAttribute('data-pd'));

				target.parentNode.querySelector('a.current').classList.remove('current');
				target.classList.add('current');
			}
		}, false);
	}


	window.getJSON = function(o) {
		var codeXHR = new XMLHttpRequest();
		codeXHR.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				var data = JSON.parse(this.responseText);

				if (o.success) {
					o.success.call(this, data);
				}

				if (o.error) {
					o.error.call(this, this.responseText);
				}
			}
		};
		codeXHR.open('GET', o.url, true);
		codeXHR.send();
	}



	//choose city
	if (document.querySelector('#filterCities')) {
		document.querySelector('#filterCities').addEventListener('click', function(e) {
			e.stopPropagation();

			var target = e.target;
			if (target.nodeName === 'SPAN') {
				target.parentNode.querySelector('span.current').classList.remove('current');
				target.classList.add('current');

				getJSON({
					url: '/city/list.json?c=' + target.innerHTML.toLowerCase(),
					success: function(ret) {
						if (ret) {
							var html = [];
							ret.cities.forEach(function(v) {
								html.push('<a href="/city/set?id=' + v.code + '">' + v.name + '</a>');
							});
							document.querySelector('#citiesSort').innerHTML = html.join('');
						}
					}
				});
			}
		}, false);
	}

	//展开
	/*
	document.querySelector('span.more').addEventListener('click', function(e){
      var details = this.parentNode.querySelector('span.show_details');

      if(details){
          if(details.classList.contains('hidden')){
              this.innerHTML = '<i class="ml10">收起</i>';
              details.classList.remove('hidden');
          }else{
              this.innerHTML = '... <i>展开</i>';
              details.classList.add('hidden');
          }
      }
  }, false);
	*/
	$("span.more").bind("click", function() {
		var details = this.parentNode.querySelector('span.show_details');
		if (details) {
			if (details.classList.contains('hidden')) {
				this.innerHTML = '<i class="ml10">收起</i>';
				details.classList.remove('hidden');
			} else {
				this.innerHTML = '... <i>展开</i>';
				details.classList.add('hidden');
			}
		}
	});

	//加载更多
	// document.querySelector('.more_details').addEventListener('click', function(e){
	// 	getJSON({
	// 		url: '',
	// 		success: function(ret){

	// 		},

	// 		error: function(err){

	// 		}
	// 	});
	// } ,false);
})();

//首屏底部显示
/*
(function(){
	if($(".js_floatFooter")[0]){
		$(document).bind("scroll",fSetFloatFooter);
		function fSetFloatFooter(){
			var nTop=$("body").scrollTop();
			if(nTop==0){
				var nOffsetH=$("body").offset().height;
				$(".js_floatFooter").css({top:nOffsetH-50});
				$(".js_floatFooter").show();
			}else{
				$(".js_floatFooter").hide();
			}
		}
		fSetFloatFooter();
	}
})();
*/

//城市补全
(function() {
	if ($('input[id="city"]')[0]) {
		var oCity = $('input[name="city"]');
		var hid = $('input[name="cityCode"]');
		oCity.autocomplete({
			serviceUrl: '/city/city.json',
			paramName: 'query',
			dataType: 'json',
			transformResult: function(response) {
				return {
					suggestions: $.map(response.suggestions, function(dataItem) {
						return {
							value: dataItem.value,
							data: dataItem.data
						};
					})
				};
			},
			onSelect: function(suggestion) {
				hid.val(suggestion.data);
			},
			onSearchStart: function() {
				//防止选中后不失去焦点接着搜 强制选择的地方都要加这个
				hid.val('');
			},
			onInvalidateSelection: function() {
				hid.val('');
			},
			onSearchComplete: function(query, suggestions) {
				if (suggestions.length === 0) {
					hid.val('');
					return;
				}
				//auto select when only one result
				if (suggestions.length === 1) {
					hid.val(suggestions[0].data);
				}
			},
			autoSelectFirst: true
		});
		oCity.bind("blur", function() {
			var _this = $(this);
			setTimeout(function() {
				if (hid.val() == "") {
					_this.val('');
					_this.parent().addClass("berror");
					_this.siblings(".js_error").html("城市名称输入有误").show();
				}
			}, 300);
		}).focus(function() {
			var _this = $(this);
			_this.parent().removeClass("berror");
		})
	}
})();

//评公司
(function() {
	function fInitComment() {
		fBind();
	}

	function fBind() {
		var oGradeStar = $(".js_gradeStar");
		var oScoreDetail = $(".js_allScoreDetail");
		var oRating = $(".js_rating");
		var oCommentStep1 = $(".js_comment_step1");
		var oCommentStep2 = $(".js_comment_step2");
		oGradeStar.find("b").bind("click", function() {
			var nIndex = $(this).index() - 1;
			$(this).parent().find("i").css("width", ((nIndex + 1) * 20) + "%");
			$(this).parent().parent().find(".js_level").html($(this).attr("node-data"));
			if (oScoreDetail.css("display") == "none") {
				oScoreDetail.show();
			}
			$('[name="rating"]').val($(this).attr("node-value"));
			$(this).parent().parent().find(".js_error").hide();
		});
		oScoreDetail.find(".js_gradeRect b").bind("click", function() {
			var nIndex = $(this).index() - 1;
			$(this).parent().find("i").css("width", ((nIndex + 1) * 20) + "%");
			$(this).parent().parent().find(".js_level").html($(this).attr("node-data"));
			$(this).parent().parent().find('[type="hidden"]').val($(this).attr("node-value"));
		});
		oRating.find("button").bind("click", function() {
			$(this).parent().siblings().find("button").removeClass("r_selted");
			$(this).addClass("r_selted");
			$(this).parent().siblings().find("i").each(function() {
				var sIClass = $(this).attr("class").replace("_h", "");
				$(this).attr("class", sIClass);
			});
			var oI = $(this).find("i");
			var sIClass = oI.attr("class");
			if (sIClass.indexOf("_h") < 0) {
				oI.attr("class", sIClass + "_h");
			}
			$(this).parent().parent().siblings('[type="hidden"]').val($(this).attr("node-value"));
			$(this).parent().parent().siblings("span").find(".js_error").hide();
		});
		oScoreDetail.find(".js_close").bind("click", function() {
			oScoreDetail.hide();
		});
		/*
		//点击其他地方隐藏
		$(document).bind("click",function(e){
			var oTarget=e.target;
			if(oScoreDetail.css("display")=="block"){
				if(oTarget!=oScoreDetail[0]&&!$.contains(oScoreDetail[0],oTarget)&&!$.contains(oGradeStar[0],oTarget)){
					oScoreDetail.hide();
				}
			}
		});
		*/
		//更多点评
		oCommentStep1.on("click", ".js_more", function() {
			var oTitle = $('[name="title"]');
			var oTitleVal = $.trim(oTitle.val());
			if (oTitleVal.length < 10) {
				oTitle.siblings(".js_error").show();
			} else {
				oTitle.siblings(".js_error").hide();
				var oMoreDiv = $(".js_more_div");
				oMoreDiv.show();
				$(this).removeClass("js_more").addClass("js_hide").html("收起深入点评");
			}
		}).on("click", ".js_hide", function() {
			oCommentStep1.find(".js_more_div").hide();
			$(this).removeClass("js_hide").addClass("js_more").html("继续深入点评...");
		});;
		//评公司第一步下一步
		oCommentStep1.find(".js_btNext").bind("click", function() {
			var bFlag = true;
			var oRating = $('[name="rating"]');
			if (oRating.val() == "0") {
				oRating.siblings(".js_error").show();
				bFlag = false;
			}
			var oRatingCeo = $('[name="ratingCeo"]');
			if (oRatingCeo.val() == "0") {
				oRatingCeo.siblings("span").find(".js_error").show();
				bFlag = false;
			}
			var oFutureStatus = $('[name="futureStatus"]');
			if (oFutureStatus.val() == "0") {
				oFutureStatus.siblings("span").find(".js_error").show();
				bFlag = false;
			}
			var oRecommendFriend = $('[name="recommendFriend"]');
			if (oRecommendFriend.val() == "0") {
				oRecommendFriend.siblings("span").find(".js_error").show();
				bFlag = false;
			}
			/*
			var oTitle=$('[name="title"]');	
			var oTitleVal=$.trim(oTitle.val());
			if(oTitleVal.length<10){
				oTitle.siblings(".js_error").show();
				bFlag=false;
			}else{
				oTitle.siblings(".js_error").hide();
			}	*/
			oCommentStep1.find('textarea').each(function() {
				var _val = $.trim($(this).val());
				if (_val.length < 10) {
					$(this).siblings(".js_error").show();
					bFlag = false;
				} else {
					$(this).siblings(".js_error").hide();
				}
			})
			if (bFlag) {
				oCommentStep1.hide();
				oCommentStep2.show();
			}
		});
		var oJobStatus = $(".js_jobStatus");
		//评公司第二步返回
		oCommentStep2.find(".top_back").bind("click", function() {
			oCommentStep2.hide();
			oCommentStep1.show();
		});
		oJobStatus.find("li").bind("click", function() {
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$('[name="employeeStatus"]').val($(this).attr("node-value"));
		});
		//评公司第二步确定
		oCommentStep2.find(".js_submit").bind("click", function() {
			var oJobTitle = $('[name="jobTitle"]');
			var oJobTitleVal = $.trim(oJobTitle.val());
			var bFlag = true;
			if (oJobTitleVal == "") {
				oJobTitle.siblings(".js_error").show();
				oJobTitle.parent().addClass("berror");
				bFlag = false;
			} else {
				oJobTitle.siblings(".js_error").hide();
				oJobTitle.parent().removeClass("berror");
			}
			var oCity = $('[name="city"]');
			var oCityVal = $.trim(oCity.val());
			if (oCityVal == "") {
				oCity.siblings(".js_error").show();
				oCity.parent().addClass("berror");
				bFlag = false;
			} else {
				oCity.siblings(".js_error").hide();
				oCity.parent().removeClass("berror");
			}
			if (bFlag) {
				$('[name="commentForm"]').submit();
			}
		});
	}
	if ($('[name="commentForm"]')[0]) {
		fInitComment();
	}
})();

//晒面经
(function() {
	function fInitInterview() {
		fBind();
	}

	function fBind() {
		var oInterviewStep1 = $(".js_interview_step1");
		var oInterviewStep2 = $(".js_interview_step2");
		oInterviewStep1.find(".js_result button").bind("click", function() {
			$(this).siblings().attr("class", "btn_grey_small_1");
			$(this).attr("class", "btn_green_small_1");
			$(this).parent().siblings('[type="hidden"]').val($(this).attr("node-value"));

			if ($(this).attr("node-value") == "3") {
				$(".js_salary").show();
			} else {
				$(".js_salary").hide();
			}
		});
		oInterviewStep1.find(".js_btNext").bind("click", function() {
			var oJobTitle = $('[name="jobTitle"]');
			var oJobTitleVal = $.trim(oJobTitle.val());
			var bFlag = true;
			if (oJobTitleVal == "") {
				oJobTitle.siblings(".js_error").show();
				oJobTitle.parent().addClass("berror");
				bFlag = false;
			} else {
				oJobTitle.siblings(".js_error").hide();
				oJobTitle.parent().removeClass("berror");
			}
			var oResult = $('[name="result"]');
			if (oResult.val() == "0") {
				oResult.siblings("h3").find(".js_error").show();
				bFlag = false;
			} else {
				oResult.siblings("h3").find(".js_error").hide();
			}
			var oCity = $('[name="city"]');
			var oCityVal = $.trim(oCity.val());
			if (oCityVal == "") {
				oCity.siblings(".js_error").show();
				oCity.parent().addClass("berror");
				bFlag = false;
			} else {
				oCity.siblings(".js_error").hide();
				oCity.parent().removeClass("berror");
			}
			if ($(".js_salary").css("display") != "none") {
				var oSalary = $('[name="salary"]');
				var oSlalaryVal = $.trim(oSalary.val());
				if (oSlalaryVal == "") {
					oSalary.siblings(".js_error").show();
					oSalary.parent().addClass("berror");
					bFlag = false;
				} else {
					if (!common.isNumber(oSlalaryVal)) {
						oSalary.siblings(".js_error").html("格式错误").show();
						oSalary.parent().addClass("berror");
						bFlag = false;
					} else {
						oSalary.siblings(".js_error").hide();
						oSalary.parent().removeClass("berror");
					}
				}
			}
			if (bFlag) {
				oInterviewStep1.hide();
				oInterviewStep2.show();
			}
		});
		//晒面经第二步返回
		oInterviewStep2.find(".top_back").bind("click", function() {
			oInterviewStep2.hide();
			oInterviewStep1.show();
		});
		oInterviewStep2.find(".js_difficulty b").bind("click", function() {
			var nIndex = $(this).index() - 1;
			$(this).parent().find("i").css("width", ((nIndex + 1) * 20) + "%");
			$(this).parent().parent().find(".js_level").html($(this).attr("node-data"));
			oInterviewStep2.find('[name="difficulty"]').val($(this).attr("node-value"));

		});
		oInterviewStep2.find(".js_experience li").bind("click", function() {
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$('[name="experience"]').val($(this).attr("node-value"));
		});
		oInterviewStep2.find(".js_source button").bind("click", function() {
			$(this).siblings().removeClass("btn_green_small_2");
			$(this).addClass("btn_green_small_2");
			$(this).parent().siblings('[type="hidden"]').val($(this).attr("node-value"));
		});
		//更多点评
		oInterviewStep2.on("click", ".js_more", function() {
			oInterviewStep2.find(".js_more_div").show();
			$(this).removeClass("js_more").addClass("js_hide").html("收起晒细节");
		}).on("click", ".js_hide", function() {
			oInterviewStep2.find(".js_more_div").hide();
			$(this).removeClass("js_hide").addClass("js_more").html("继续晒细节...");
		});
		//第二步确定
		oInterviewStep2.find(".js_submit").bind("click", function() {
			var bFlag = true;
			var oDifficulty = oInterviewStep2.find('[name="difficulty"]');
			if (oDifficulty.val() == "0") {
				oDifficulty.parent().siblings().find(".js_error").show();
				bFlag = false;
			} else {
				oDifficulty.parent().siblings().find(".js_error").hide();
			}
			var oExperience = oInterviewStep2.find('[name="experience"]');
			if (oExperience.val() == "0") {
				oExperience.siblings().find(".js_error").show();
				bFlag = false;
			} else {
				oExperience.siblings().find(".js_error").hide();
			}
			var oSource = oInterviewStep2.find('[name="source"]');
			if (oSource.val() == "0") {
				oSource.siblings().find(".js_error").show();
				bFlag = false;
			} else {
				oSource.siblings().find(".js_error").hide();
			}
			/*
			var oTitle = oInterviewStep2.find('[name="title"]');
			var oTitleVal = $.trim(oTitle.val());
			if (oTitleVal.length < 10) {
				oTitle.siblings(".js_error").show();
				oTitle.parent().addClass("berror");
				bFlag = false;
			} else {
				oTitle.siblings(".js_error").hide();
				oTitle.parent().removeClass("berror");
			}
			*/
			oInterviewStep2.find('textarea[must="1"]').each(function(){
				var _val = $.trim($(this).val());
				if (_val.length < 10) {
					$(this).siblings(".js_error").show();
					$(this).parent().addClass("berror");
					bFlag = false;
				} else {
					$(this).siblings(".js_error").hide();
					$(this).parent().removeClass("berror");
				}				
			});
			if (bFlag) {
				$('[name="interviewForm"]').submit();
			}
		});
	}
	if ($('[name="interviewForm"]')[0]) {
		fInitInterview();
	}
})();

//晒工资
(function() {
	function fInitSalary() {
		fBind();
		fReplaceNum();
	}
	//只能输入数字
	function fReplaceNum() {
		$('[type="text"][v-type="num"]').on("input", function() {
			var _this = $(this);
			var sVal = $.trim(_this.val());
			_this.val(sVal.replace(/^[0]|\D/g, ""));
		});
	}
	//工资明细总和校验
	function fVSalaryCount() {
		var bFlag = true;
		var nOtherAllPay = 0;
		var oSalary = $(".js_salary");
		var aSalaryDetail = $('[type="text"][data-type="salary"]');
		var oSalaryPay = oSalary.find('[data-type="salaryPay"]');
		var nSalaryPay = parseInt(oSalaryPay.val() ? oSalaryPay.val() : 0);
		var oSalaryBase = $(aSalaryDetail[0]);
		aSalaryDetail.each(function(index) {
			if (index > 0) {
				nOtherAllPay += parseInt($(this).val() ? $(this).val() : 0);
			}
		});
		if (nOtherAllPay > nSalaryPay) {
			oSalary.find(".sys_err").show();
			$(".js_addDetail").hide();
			$("#salaryDetail").show();
			bFlag = false;
		} else {
			oSalaryBase.val(nSalaryPay - nOtherAllPay);
			oSalary.find(".sys_err").hide();
		}
		return bFlag;
	}
	//校验月薪
	function fVSalaryPay() {
		var bFlag = true;
		var oSalary = $('[name="salaryPayMonth"]');
		var oSlalaryVal = $.trim(oSalary.val());
		if (oSlalaryVal == "") {
			oSalary.siblings(".js_error").html("月薪不能为空").show();
			oSalary.parent().addClass("berror");
			bFlag = false;
		} else {
			if (!fVSalaryCount()) {
				bFlag = false;
			} else {
				oSalary.siblings(".js_error").hide();
				oSalary.parent().removeClass("berror");
			}
		}
		return bFlag;
	}
	//校验select下拉框
	function fVselect() {
		var bFlag = true;
		$('select').each(function() {
			var _this = $(this);
			var sVal = _this.val();
			if (sVal == "" || sVal == "0") {
				_this.parent().siblings(".js_error").show();
				_this.parent().parent().addClass("berror");
				bFlag = false;
			} else {
				_this.parent().siblings(".js_error").hide();
				_this.parent().parent().removeClass("berror");
			}
		});
		return bFlag;
	}

	function fBind() {
		var oSalary = $(".js_salary");
		oSalary.find(".js_employeeStatus li").bind("click", function() {
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$('[name="employeeStatus"]').val($(this).attr("node-value"));
		});
		oSalary.find(".js_submit").bind("click", function() {
			var bFlag = true;
			var oJobTitle = $('[name="jobTitle"]');
			var oJobTitleVal = $.trim(oJobTitle.val());
			if (oJobTitleVal == "") {
				oJobTitle.siblings(".js_error").show();
				oJobTitle.parent().addClass("berror");
				bFlag = false;
			} else {
				oJobTitle.siblings(".js_error").hide();
				oJobTitle.parent().removeClass("berror");
			}
			if (!fVSalaryPay()) {
				bFlag = false;
			}
			var oCity = $('[name="city"]');
			var oCityVal = $.trim(oCity.val());
			if (oCityVal == "") {
				oCity.siblings(".js_error").show();
				oCity.parent().addClass("berror");
				bFlag = false;
			} else {
				oCity.siblings(".js_error").hide();
				oCity.parent().removeClass("berror");
			}
			if (!fVselect()) {
				bFlag = false;
			}
			if (bFlag) {
				$('[name="salaryForm"]').submit();
			}
		});
		oSalary.find(".js_addDetail").bind("click", function() {
			if (fVSalaryPay()) {
				$(this).hide();
				$("#salaryDetail").show();
			}
		});
		oSalary.find(".js_close").bind("click", function() {
			oSalary.find(".js_addDetail").show();
			$("#salaryDetail").hide();
		})
		//失去焦点校验工资明细
		$('[type="text"][v-type="num"]').on("blur", function() {
			fVSalaryCount();
		});
	}
	if ($('[name="salaryForm"]')[0]) {
		fInitSalary();
	}
})();


//筛选条件
(function() {
	function fInitSearchCondition() {
		fBind();
	}

	function fBind() {
		var oSearchCondition = $(".js_searchCondition");
		oSearchCondition.find(".js_first").bind("click", function() {
			var oNext = $(this).next();
			var oA = $(this).find("a");
			if (oNext.css("display") == "none") {
				oA.html("-");
				oA.attr("class", "minus");
				oNext.show();
			} else {
				oA.html("+");
				oA.attr("class", "plus");
				oNext.hide();
			}
		});
		oSearchCondition.find(".js_first").next().find("li").bind("click", function() {
			$(this).siblings().attr("class", "no_ok");
			$(this).attr("class", "ok");
			$(this).siblings().find("i").attr("class", "");
			$(this).siblings().find("i").html(">");
			$(this).find("i").attr("class", "i i_ok_h");
			$(this).find("i").html("");

			$(this).parent().prev().find("em").html($(this).find("em").html());
			$(this).parent().prev().find('[type="hidden"]').val($(this).attr("node-value"));
			//选完收起
			$(this).parent().hide();
			$(this).parent().prev().find("a").attr("class", "plus").html("+");

		});
		oSearchCondition.find(".fright").bind("click", function() {
			$('[name="searchConditionForm"]').submit();
		});
	}
	if ($(".js_searchCondition")[0]) {
		fInitSearchCondition();
	}
})();

//搜索公司
(function() {
	var oPublish = $('.js_publish_step1');

	function fInitPublish() {
		fBind();
	}

	function fBind() {
		var sF = common.queryString("f") || "usgz";
		oPublish.find(".js_search").bind("input", function() {
			oPublish.find(".js_companyList").html("");
			var sVal = $.trim($(this).val());
			if (!sVal) {
				return;
			}
			var sHref = "/ugs/create/" + "?cn=" + sVal;
			oPublish.find(".fright").attr("href", sHref);
			$.ajax({
				url: "/usgs/asyn.json",
				data: {
					f: sF,
					cn: sVal
				},
				success: function(result) {
					if (result.hasCompany) {
						oPublish.find(".js_companyList").html(result.html);
						oPublish.find(".js_noSearch").hide();

						//            显示创建
						if (result.hasVeryMatchCompany === false && sVal.length > 1) {
							$('#createLink li').html('<a href="/ugs/create/?cn=' + encodeURIComponent(sVal) + '">创建名为“<span class="blue">' + sVal + '</span>”的公司档案</a>');
							$('#createLink').show();
						} else {
							$('#createLink').hide();
						}

						//            更多 根据搜索结果动态改变more的url
						if (result.more) {
							$('#moreHid').val('/usgs/asyn.json?cn=' + encodeURIComponent(sVal) + '&f=' + common.queryString("f") + '&page=');
							$('#more').show();
						} else {
							$('#more').hide();
						}
					} else {
						oPublish.find(".js_noSearch").show();
						$('#more').hide();
						$('#createLink li').html('<a href="/ugs/create/?cn=' + encodeURIComponent(sVal) + '">创建名为“<span class="blue">' + sVal + '</span>”的公司档案</a>');
						$('#createLink').show();
					}
				}
			});
		});
	}
	if (oPublish[0]) {
		fInitPublish();
	}
})();


//创建公司
(function() {
	var oPublish2 = $('.js_publish_step2');

	function fInitPublish() {
		fBind();
	}

	function fBind() {
		oPublish2.find(".js_submit").bind("click", function() {
			var bFlag = true;
			var oCompanyName = $('[name="companyName"]');
			var sCnameVal = $.trim(oCompanyName.val());
			if (!sCnameVal) {
				oCompanyName.siblings(".error").show();
				oCompanyName.parent().addClass("berror");
				bFlag = false;
			} else {
				oCompanyName.siblings(".error").hide();
				oCompanyName.parent().removeClass("berror");
			}
			var oCompanySite = $('[name="companySite"]');
			var sCsiteVal = $.trim(oCompanySite.val());
			if (!sCsiteVal) {
				oCompanySite.siblings(".error").show();
				oCompanySite.parent().addClass("berror");
				bFlag = false;
			} else {
				if (common.isSite(sCsiteVal)) {
					oCompanySite.siblings(".error").hide();
					oCompanySite.parent().removeClass("berror");
				} else {
					oCompanySite.siblings(".error").html("网址的格式不符");
					oCompanySite.siblings(".error").show();
					oCompanySite.parent().addClass("berror");
					bFlag = false;
				}
			}
			var oIndustryCode = $('[name="industryCode"]');
			if (oIndustryCode.val() == "0") {
				oIndustryCode.parent().siblings(".error").show();
				oIndustryCode.parent().parent().addClass("berror");
				bFlag = false;
			} else {
				oIndustryCode.parent().siblings(".error").hide();
				oIndustryCode.parent().parent().removeClass("berror");
			}
			var oScales = $('[name="scale"]');
			if (oScales.val() == "0") {
				oScales.parent().siblings(".error").show();
				oScales.parent().parent().addClass("berror");
				bFlag = false;
			} else {
				oScales.parent().siblings(".error").hide();
				oScales.parent().parent().removeClass("berror");
			}
			var oCity = $('[name="city"]');
			var sCityVal = $.trim(oCity.val());
			if (sCityVal == "") {
				oCity.siblings(".error").show();
				oCity.parent().addClass("berror");
				bFlag = false;
			} else {
				oCity.siblings(".error").hide();
				oCity.parent().removeClass("berror");
			}
			if (bFlag) {
				$("#createCompanyForm").submit();
			}
		});
	}
	if (oPublish2[0]) {
		fInitPublish();
	}
})();


(function() {
	if ($(".js_focus")[0]) {
		$(".bt_focus").bind("click", function() {
			var _this = $(this);
			var companyId = _this.attr("companyId");
			$.ajax({
				url: "/company/dofocus.json",
				data: {
					companyId: companyId
				},
				dataType: "json",
				success: function(result) {
					if (result.rescode == 1) {
						_this.hide();
						$(".bt_hasfocus").show();
					} else if (result.rescode == 0) {
						alert("失败");
					} else if (result.rescode == 1011) {
						location.href = "/login/";
					}
				}
			});
		});
		$(".bt_hasfocus").bind("click", function() {
			var _this = $(this);
			var companyId = _this.attr("companyId");
			$.ajax({
				url: "/company/unfocus.json",
				data: {
					companyId: companyId
				},
				success: function(result) {
					if (result.rescode == 1) {
						_this.hide();
						$(".bt_focus").show();
					} else if (result.rescode == 0) {
						alert("失败");
					} else if (result.rescode == 1011) {
						location.href = "/login/";
					}
				}
			});
		});

	}
})();


(function() {
	if ($(".js_collection")[0]) {
		$(".bt_focus").bind("click", function() {
			var _this = $(this);
			var jobId = _this.attr("jobId");
			$.ajax({
				url: "/jobtitle/dofocus.json",
				data: {
					jobId: jobId
				},
				dataType: "json",
				success: function(result) {
					if (result.rescode == 1) {
						_this.hide();
						$(".bt_hasfocus").show();
					} else if (result.rescode == 0) {
						alert("失败");
					} else if (result.rescode == 1011) {
						location.href = "/login/";
					}
				}
			});
		});
		$(".bt_hasfocus").bind("click", function() {
			var _this = $(this);
			var jobId = _this.attr("jobId");
			$.ajax({
				url: "/jobtitle/unfocus.json",
				data: {
					jobId: jobId
				},
				success: function(result) {
					if (result.rescode == 1) {
						_this.hide();
						$(".mask").show();
					} else if (result.rescode == 0) {
						alert("失败");
					} else if (result.rescode == 1011) {
						location.href = "/login/";
					}
				}
			});
		});

	}
})();

//职位详情
(function() {
	if ($(".js_submitResume")[0]) {
		$(".js_submitResume").bind("click", function() {
			var _this = $(this);
			if (_this.attr("data-is") == "1") {
				$.ajax({
					url: _this.attr("data-url"),
					data: {
						jobtype: _this.attr("data-jobtype")
					},
					dataType: "json",
					success: function(result) {
						if (result.rescode == 1) {
							_this.html("已投递");
							_this.removeClass("btn_submit_1").addClass("btn_disable");
							_this.attr("data-is", "0");
							$.maskUI.config = {
					        wrap: '<section class="maskui_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close"></a>{1}</div></section>',
					        alert: '<div class="dialog_ac"><h3 class="deliver_suc"><i class="i i_thick_ok mr10"></i>投递成功！</h3><p class="t-center">请保持联系通畅，静候佳音~</p></div>'
					    }

							$.maskUI.alert({});
						} else {
							alert("投递失败");
						}
					}
				});
			}
		});
	}
})();

//有用(赞)
(function() {
	$("body").on("click", ".js_useful", function() {
		var _this = $(this);
		if (_this.attr("rel") == "nofollow") {
			return;
		}

		_this.find("i").removeClass("i_mark_h").addClass("i_mark");
		_this.attr("rel", "nofollow");

		var sid = _this.attr("data-sid");
		var url = _this.attr("data-url");
		var type = _this.attr("data-type");
		var data = "";
		if (type == "interview") {
			data += "interviewId=" + sid;
			var num = parseInt(_this.find("span").html());
			_this.find("span").html(num + 1);
		} else if (type == "review") {
			data += "reviewId=" + sid;
			var num = parseInt(_this.find("span").html());
			_this.find("span").html(num + 1);
		} else if (type == "photo") {
			data += "photoId=" + sid;
			var num = parseInt(_this.find("span").html());
			_this.find("span").html(num + 1);
		} else if (type == "salary") {
			data += "salaryId=" + sid;
			var num = parseInt(_this.find("span").html());
			_this.find("span").html(num + 1);
		}
		$.ajax({
			url: url,
			data: data,
			success: function(result) {}
		});

		if( !$.readCookie('pops') ) {
			if( type == "interview" || type == "review" ){
					if( !isLogged ){
				    $.maskUI.config = {
				        wrap: '<section class="maskui_dialog" id="{0}"><div class="dialog_con"><a href="javascript:;" class="dialog_close"></a>{1}</div></section>',
				        confirm: '<h1>提示</h1><div class="dialog_ac">想知道你的评论内容反响如何？登录后即可收到反馈提醒！</div><ul class="news_btn"><li><a href="javascript:;" class="maskui_close dialog_btn">不感兴趣</a></li><li><a href="/login/" class="dialog_btn green">立即登录</a></li></ul></div>'
				    }

						$.maskUI.confirm({});
						$.writeCookie('pops', '1');
					}
			}
		}
	});
})();

$(function(){
	//解决一部分手机fixed导致键盘挡住输入框的bug
	//if (navigator.userAgent.match(/iPhone|iPad|iPod|MicroMessenger/i)) {
  $(document).on('focus', 'input, textarea', function() {
    $('[data-style-position="fixed"]').hide()
  });
  $(document).on('blur', 'input, textarea', function() {
    $('[data-style-position="fixed"]').show();
  });
	//}
})

$(function(){
	var send_prompt = $('a.send_manages').find('span');
	setTimeout(function(){
		send_prompt.fadeOut();
	}, 3000);
});