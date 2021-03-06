define(['u/validator','c/widgets','c/company/email_dialog'],	function(){
	$(function(){
		var createEmailDialog=require('c/company/email_dialog');
		//立体ugc
		function initCubeUgc(){
			var origin={
				"1":"cubeugc_icon_my",
				"2":"cubeugc_icon_want",
				"3":"cubeugc_icon_like"
			}
	    function checkDate(by, ey, bm, em){
        ey = parseInt($('input[name=' + ey +']').val(), 10);
        if(ey === 0){
            return true;
        }
        var year = ey - parseInt($('input[name=' + by +']').val(), 10);
        bm = parseInt($('input[name=' + bm +']').val(), 10);
        em = parseInt($('input[name=' + em +']').val(), 10);

        if(year < 0){
            return false;
        }else if(year === 0 && bm && em && em - bm < 0){
            return false;
        }else{
            return true;
        }
	    }
			var cubeUgcStep1_1=$("#cube_ugc_step1_1"),
					cubeUgcStep1_2=$("#cube_ugc_step1_2"),
					cubeUgcStep2_1=$("#cube_ugc_step2_1"),
					cubeUgcStep2_2=$("#cube_ugc_step2_2"),
					cubeUgcStep3_1=$("#cube_ugc_step3_1"),
					cubeUgcStep4_1=$("#cube_ugc_step4_1"),
					cubeUgcEnter=$(".cube_ugcEnter"),
					companyId=$("#companyId").val();
			function loadJson(){
				$.ajax({
					url:"/miniugc/load.json",
					type:"post",
					data:{
						companyId:companyId
					},
					dataType:"json",
					success:function(result){
						var type=result.type;
						var originType=result.originType;
						showStepUgc(type);
						keepVal(result);
						if(originType>0){
							$(".co_logo").prepend('<i class="tag '+origin[originType]+'"></i>');
						}
					}
				});
			}
			//在一定条件下才请求立体ugc接口
			if($('#miniugcshow').val()=='1'){
				loadJson();
			}
			//显示到哪一大不步
			function showStepUgc(step){
				if(step>0){
					$('#cube_ugc_step'+step+'_1').show();
					//cubeUgcEnter.attr("data-step-val",step);
				}else if(step=="-1"){
					cubeUgcEnter.show();
				}
			}
			//重新填写
			$(".co_logo").on("click",".tag",function(e){
				e.preventDefault();
				$(".cube_ugc").hide();
				cubeUgcEnter.hide();
				showStepUgc(1);
			})
			//记录时间
			function keepVal(result){
				if(!result.entryDate){
					return;
				}
				$('[name="entryDate"]',cubeUgcStep2_2).val(result.entryDate);
				$('[name="dimissionDate"]',cubeUgcStep2_2).val(result.dimissionDate);
				$('[name="employeeStatus"]',cubeUgcStep2_2).val(result.employeeStatus);
				/*
				var js_send_review=$("#js_send_review",cubeUgcStep3_1);
				var href=js_send_review.attr("href");
				var param="?entryDate="+result.entryDate+"&dimissionDate="+result.dimissionDate+"&employeeStatus="+result.employeeStatus;
				if(href.indexOf("?")<0){
					href+=param;
					js_send_review.attr("href",href);
				}else{
					href=href.split("?")[0]+param;
				}
				js_send_review.attr("href",href);
				*/
			}
			cubeUgcEnter.on("click",function(){
				var _this=$(this);
				_this.hide();
				$.ajax({
					url:"/miniugc/quick.json",
					type:"post",
					data:{
						"companyId":companyId
						//"window":step
					},
					dataType:"json",
					success:function(result){
						showStepUgc(result.type);
					}
				});
			})
			$('[action-type="set"]',cubeUgcStep1_1).on("click",function(){
				var _this=$(this);
				var originType=_this.data("val");
				cubeUgcStep1_1.hide();
				if(originType=="1"){
					cubeUgcStep1_2.show();
					return;
					//$(".co_logo").prepend('<i class="tag '+origin[originType]+'"></i>');
				}
				var follow=$("#headerfollow");
				$.ajax({
					url:"/miniugc/one.json",
					type:"post",
					data:{
						companyId:companyId,
						originType:originType
					},
					dataType:"json",
					success:function(result){
						switch(result.originType){
							case "1":
								if(result.followType==1){
									follow.data('mtype','cancelfollow.json');
									follow.html('<i class="ok_s"></i>已关注');
								}
								break;
							case "2":
								$(".co_logo .tag").remove();
								$(".co_logo").prepend('<i class="tag '+origin[originType]+'"></i>');
								if(result.followType==1){
									follow.data('mtype','cancelfollow.json');
									follow.html('<i class="ok_s"></i>已关注');
								}
								showStepUgc(result.type);
								if(result.isSubscribe==1){
									createEmailDialog(result.isLogin,companyId);
								}
								break;
							case "3":
								$(".co_logo .tag").remove();
								$(".co_logo").prepend('<i class="tag '+origin[originType]+'"></i>');
								if(result.followType==1){
									follow.data('mtype','cancelfollow.json');
									follow.html('<i class="ok_s"></i>已关注');
								}	
								showStepUgc(result.type);
								if(result.isSubscribe==1){
									createEmailDialog(result.isLogin,companyId);
								}
								break;
							case "4":
								break;
							case "5":
								break;			
						}
							//$('#cube_ugc_step'+result.window+'_1').show();
					}
				});	
			})
			$('[action-type="set"]',cubeUgcStep1_2).on("click",function(){
				var _this=$(this);
				var originType=_this.data("val");
				cubeUgcStep1_2.hide();
				$.ajax({
					url:"/miniugc/one.json",
					type:"post",
					data:{
						companyId:companyId,
						originType:originType						
					},
					dataType:"json",
					success:function(result){
						if(result.rescode=="1"){
							showStepUgc(result.type);
						}
					}
				});	
			})
			$('[action-type="set_two"]','.cube_ugc').on("click",function(){
				var _this=$(this);
				var status=_this.data("val");
				var cubeUgc=_this.closest(".cube_ugc");
				var step=cubeUgc.data("step-val");
				cubeUgc.hide();
				cubeUgcEnter.show();
				$.ajax({
					url:"/miniugc/two.json",
					type:"post",
					data:{
						companyId:companyId,
						status:status,
						window:step 					
					},
					dataType:"json",
					success:function(result){
						if(result.originType=="0"){
							$(".co_logo .tag").remove();
						}
					}
				});	
			});
			$('.js_salary_bt',cubeUgcStep2_1).on("click",	function(){
				cubeUgcStep2_1.hide();
				cubeUgcStep2_2.show();
			});					
			$( 'dl.js_select', cubeUgcStep1_2).DIYSelect({
				listCallback: function(list, field, target){
					target.removeClass('s_err');
					var hid = $('input:hidden', target);
					if(list.find('a').eq(0).data('val') == '0000'){
				    if(hid.val() === '0000'){
				       target.next('dl.select').hide().find('dt>input:hidden').val('00');
				    }else{
				       target.next('dl.select').show().find('dt>input:hidden').val('').end().find('dt>input:button').val('月份');
				    }
					}
				}
			});
			$('#cube_ugc_form').validatorAll({
				elems: '.v',
				prompt:{
					succ:function(){

					},
					err:function(self){
						self.closest(".select").addClass("s_err");
					}
				},
				ajaxSubmit: {
	      	elems: 'input:text, input:hidden',
	      	type: "post",
	      	success: function(result){
	      		$(".co_logo .tag").remove();
						$(".co_logo").prepend('<i class="tag '+origin[result.originType]+'"></i>');
						cubeUgcStep1_2.hide();
						showStepUgc(result.type);
						keepVal(result);
	      	}
	      }	
			}).submit(function(){
        if(!checkDate('startYear', 'endYear', 'startMonth', 'endMonth')){
            $('#cube_ugc_form p.err').html('请选择正确的日期范围！').show();
            return false;
        }else{
            return true;
        }
			});
			//choose city autocomplete
			var searchSuggestCity = $('#cube_companyCitySuggest'),
			    hid = $('input[name="encryptCityCode"]',cubeUgcStep2_2);
	    searchSuggestCity.autocomplete({
	      serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
	      paramName: 'query',
	      dataType: 'json',
	      transformResult: function (response) {
	        return {
	          suggestions: $.map(response.suggestions, function (dataItem) {
	            return { value: dataItem.value, data: dataItem.data};
	          })
	        };
	      },
	      onSelect: function (suggestion) {
	        hid.val(suggestion.data);
	      },
	      onSearchStart: function () {
	        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
	        hid.val('');
	      },
	      onInvalidateSelection: function () {
	        hid.val('');
	      },
	      onSearchComplete: function (query, suggestions) {
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
    	//职位
	    var companyJobSuggest = $('#cube_jobautocomplete');
		  if (companyJobSuggest.length) {
		    companyJobSuggest.autocomplete({
		      serviceUrl: CONTEXTPATH + '/autocomplete/jobtitle.json',
		      paramName: 'query',
		      params: function (query) {
		        return {
		          query: query,
		          code: companyJobSuggest.data('coid')
		        };
		      },
		      dataType: 'json',
		      transformResult: function (response) {
		        response = response || {};
		        return {
		          suggestions: $.map(response.suggestions || [], function (dataItem) {
		            return { value: dataItem.value, data: dataItem.data};
		          })
		        };
		      }
		    });
		  }
      var salaryDetail = $('ul.adddetail input:text',cubeUgcStep2_2),
          sDetailErr = $('span#cube_sDetailErr'),
          salaryBase  = $('#cube_salaryBase'),
          salaryTotal = $('input#cube_salaryPayBase'); 
     	var salaryDetailFn = function(){
       var others = 0, total = parseInt(salaryTotal.val());
       salaryDetail.not('[name=salaryPayBase]').each(function(i, v){
         var val = parseInt(v.value) || 0;
         if(!(/^(([1-9]\d*)|0)$/).test(val)){
           sDetailErr.html('请输入正确的数额！').show();
           return false;
         }else {
           others += val;
         }
       });
       var base = total - others;
       if(base < 0){
         sDetailErr.html('工资明细不能大于月薪，请重新输入。').show();
         salaryBase.val('');
         return;
       }else {
         sDetailErr.hide();
       }
       salaryBase.val(base || 0);
      }
      //只能输入数字
			salaryDetail.keyup(function () {
			 var val = this.value.replace(/^0(?=\d+)|\D/g, '');
			 $(this).val(val);
			 salaryDetailFn(val);
			});
			salaryTotal.on('keyup', function(){
			 var val = this.value.replace(/^0(?=\d+)|\D/g, '');
			 $(this).val(val);
			 salaryDetailFn(val);
			});
			var experience = $( 'dl.experience' );
			experience.DIYSelect({
				listCallback: function(){
					experienceval.val(parseInt($(this).data('val'), 10));
				}
			});  
	    $('#cubeugc_salaryForm').validatorAll({
	    	elems: 'input:text, input:hidden',
	    	prompt: {
	    		succ: function(target, e){
	            var err;
	            if(target.attr('type') === 'hidden'){
	                err = $('>p.err', target.parent().parent().parent());
	            }else{
	                err = $('>p.err', target.parent());
	            }
	            err.hide();
	        },
	        err: function(target, msg, e){
	            var err;
	            if(target.attr('type') === 'hidden'){
	                err = $('>p.err', target.parent().parent().parent());
	            }else{
	                err = $('>p.err', target.parent());
	            }
	            err.html(msg || err.data('msg')).show();
	        },
	        normal: function(target, e){
	            var err;
	            if(target.attr('type') === 'hidden'){
	                err = $('>p.err', target.parent().parent().parent());
	            }else{
	                err = $('>p.err', target.parent());
	            }
	            err.hide();
	        }
	    	},
	    	more: {
	          salaryPayBase: {
	          	type: 'isNumber',
	          	msg: '月薪必须是纯数字！'
	          },

	          cityName: function (_this, prompt, e) {
	          var s = setTimeout(function () {
	            clearTimeout(s);
	            if (hid.val() === '') {
	              searchSuggestCity.val('').trigger('blur');
	            }
	            return true;
	          }, 300);
	          return true;
	        }
	      },
	      ajaxSubmit: {
      	  elems: 'input:text, input:hidden, input[type="radio"]',
          dataType: 'json',
          beforeSend: function(){},
       		success: function(data){
            if(data.rescode =='1'){
            	cubeUgcStep2_2.hide();
            	loadJson();
         		}
      		}
	    	}
	  	}).init().submit();

			//添加工资明细
		  $('#cube_addincome').click(function () {
		    var detail = $('ul.adddetail',cubeUgcStep2_2);
		    if(detail.is(':hidden')){
		      $(this).html('收起 <i class="putaway_white"></i>');
		      detail.removeClass('none');
		    }else{
		      $(this).html('+ 添加工资明细 <i class="open_white"></i>');
		      detail.addClass('none');
		      sDetailErr.hide();
		      salaryBase.val(salaryTotal.val());
		    }
		  });

		  //添加公司logo
	    window.uploadOk = function (info) {
	      var ret = typeof info === 'string' ? $.parseJSON(info) : info;
	      if (ret && ret.result == 1) {
	        var picurls = ret.picurls || [];
	        //$('#' + portrait.data('alias')).attr('src', STATICURL + picurls[1]).parent().find('input:hidden').val(picurls[0]);
	        var url='/companyugc/propertysave.json?field=logo&fvalue='+picurls[0]+'&companyId='+companyId;
	        $.ajax({
	        	url:url
	        });
	        $('#dialogClose').trigger('click');
	        loadJson();
	      }
	    };
	    var portrait = $('#portrait');
	    $('#uploadLogo').on('click', function (e) {
	      e.preventDefault();
	      portrait.data('alias', this.id + 'Alias');
	      $('#' + this.id + 'Flash').show().siblings('div').hide();
	      $.maskUI.open({
	        elem: portrait
	      });
	    });




		}
		initCubeUgc();
	})
});	