define(['u/validator'],function(){
  var authOpen = function (type) {
    if ($('#authFrame').length === 0) {
      $('body').append('<iframe class="overlay" scrolling="no" allowtransparency="true" src="/loginasy/' + (typeof type === 'string' ? type : $(type).attr('href')) + '" frameborder="0" id="authFrame" ></iframe>');
    }
  };	
	$.fn.extend({
	  rating: function (classname, clickCallback, enterCallback,leaveCallback) {
	    this.each(function (i, v) {
	      var target = $(v);
	      target.on('mouseenter', 'a', function () {
	        var index = parseInt(target.find('a').index(this) + 1, 10),
	            done = '';
	        if(target.hasClass('done')){
	          done = 'done ';
	        }
	        target.attr('class', done + classname + index);

	        if(enterCallback){
	          enterCallback(this);
	        }
	      }).on('mouseleave', function(){
	        var index = target.data('ind');
	        if(!target.hasClass('done')){
	          target.removeClass(function(){
	            return $(this).attr('class', classname.split(' ')[0]);
	          });
	          if(leaveCallback){
	          	leaveCallback(this);
	       	 	}
	        }else{
	          target.attr('class', 'done ' + classname + index);
	          if(enterCallback){
            	enterCallback(target.find('a').eq(index - 1));
         	 	}
	        }
	      }).on('click', 'a', function(){
	        var index = parseInt(target.find('a').index(this) + 1, 10);
	        target.addClass('done').data('ind', index);
	        if (clickCallback) {
	          clickCallback.call(this, index);
	        }
	      });


	    });
	  }
	});		
	function initDialogReview(){
		var ugcDialogReview=$("#ugc_dialog_review"),
				reviewForm=$("form",ugcDialogReview),
				changeCoNameBt=$('.js_change_bt[data-type="coName"]',ugcDialogReview),
				coNameSpan=$(".js_coName_span",ugcDialogReview),
				coNameIpt=$(".js_coName_ipt",ugcDialogReview);
		//公司名称相关事件
		/*
		changeCoNameBt.on("click",function(){
			coNameSpan.hide();
			coNameIpt.show();
			$('[name="changeCompanyName"]',coNameIpt).val($('[name="companyName"]',coNameSpan).val());
		});
		$('[data-type=ok]',coNameIpt).on("click",function(){
			coNameIpt.hide();
			coNameSpan.show();
			var coNameV=$.trim($('[name="changeCompanyName"]',coNameIpt).val());
			$('[data-name="companyName"]',coNameSpan).html(coNameV);
			$('[name="companyName"]',coNameSpan).val(coNameV);
		});	
		$('[data-type=cancel]',coNameIpt).on("click",function(){
			coNameIpt.hide();
			coNameSpan.show();
		});
		*/
		//是否在职相关事件	
		$('[name="employeeStatus"]',ugcDialogReview).on("click",function(){
			var ed=$(".es_detail",ugcDialogReview);
			ed.show();
			var radioV=$.trim($(this).val());
			if(radioV=="1"){
				ed.removeClass("leave").addClass("enter");
				ed.find('[data-type=label]').hide();
				ed.find('[data-type=leave]').hide();
			}else if(radioV=="2"){
				ed.removeClass("enter").addClass("leave");
				ed.find('[data-type=label]').show();
				ed.find('[data-type=leave]').show();
			}
			$(this).siblings(".err").hide();
		});
		$('[data-type=radio]').on("click",function(){
			$(this).prev().trigger("click")
		});

		//总体评分相关事件
		//rating
		$('#totalRating').rating('rating_star rating_s_', function(index){
			var self = $(this), parent = self.parent().parent(), hid = parent.find('input[name=rating]');
			hid.val(index);
			parent.find('span.err').remove();
			if(!self.data('rated')){
				self.data('rated', true);
			}

		}, function(target){
	    $('#totalRating').next('em').html($(target).attr('title'));
	  },function(target){
	  	$('#totalRating').next('em').html("");
	  });
		$('#moreRating span.rating_rect').rating('rating_rect rating_r_', function(){
			var self = $(this), hid = self.parent().find('input:hidden');
			if(!self.data('rated')){
				self.data('rated', true);
			}
			hid.val(self.index());
		},function(target){
	    $(target).parent('span').next('em').html($(target).attr('title'));
	  },function(target){
	  	$(target).next('em').html("");
	  });
	  ugcDialogReview.on("click",".more_review",function(){
	  	var isShow=$(this).attr("data-is-show"),
	  			rvDetail=ugcDialogReview.find(".rv_detail");
	  	if(isShow=="0"){
				rvDetail.show();
				$(this).attr("data-is-show",1);
				$(this).find("i").removeClass("open").addClass("putaway");
	  	}else if(isShow=="1"){
	  		rvDetail.hide();
	  		$(this).attr("data-is-show",0);
	  		$(this).find("i").removeClass("putaway").addClass("open");
	  	}
	  });
		ugcDialogReview.on('click', '.choose a', function(e){
			e.preventDefault();
			var self = $(this), hid = self.parent().find('input:hidden');
			self.addClass('current').siblings().removeClass('current');
			hid.val(self.data('vl'));
			if(!self.data('rated')){
				self.data('rated', true);
				//v.progress(hid, 'suc');
			}
		})
		//字数计算
		ugcDialogReview.on("keyup",'[name="pros"]',function(){
			var _this=$(this),
					val=$.trim(_this.val()),
					len=val.length,
					target=_this.siblings(".guide").find('[node-type="num"]');
			if(len>2000){
				target.addClass("red").html(len);
			}else{
				target.removeClass("red").html(len);
			}		
		})
		//时间下拉
		var startDateSelect = $('[data-type="enter"]',ugcDialogReview),
	      startDate = startDateSelect.find('[name=entryDate]'),
	      endDateSelect = $('[data-type="leave"]',ugcDialogReview),
	      endDate = endDateSelect.find('input[name=dimissionDate]');
		$(".select.time",ugcDialogReview).DIYSelect({
			listCallback: function (list, field, target) {
        if (endDateSelect.is(':hidden')) {
          return false;
        }

        var self = $(this);
        var name = field.attr('name'),
          val = self.data('val'),
          index = self.index();

				if (name == 'entryDateYear') {
          if (val >= parseInt(endDate.val(), 10)) {
            var ret = index === 0? val : val + 1;
            endDate.val(ret);
            $('input[name=dimissionDateYear]').val(ret+ '年');
          }
        } else if (name == 'dimissionDateYear') {
          if (val <= parseInt(startDate.val(), 10)) {
            var ret = index === list.children().length - 1 ? val : val - 1;
            startDate.val(ret);
            $('input[name=entryDateYear]').val(ret + '年');
          }
        }

      }
		}); 
  	//职位
    var companyJobSuggest = $('[name="jobTitle"]',ugcDialogReview);
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
		//城市
		var searchSuggestCity = $('[name="cityName"]',ugcDialogReview),
		    hid = $('[name="encryptCityCode"]',ugcDialogReview);
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
		//校验
		reviewForm.validatorAll({
			elems:".v",
			prompt:{
				succ:function(target){
					target.siblings(".err").hide();
				},
				err:function(target,msg){
					var prompt=target.siblings(".err");
					if(target.attr("name")=="rating"){
						prompt=target.parent().siblings(".err");
					}
					prompt.html('<i class="i_err"></i> ' + (msg||prompt.data("msg")) ).show();
				},
				normal:function(target){
					target.siblings(".err").hide();
				}
			},
			focusMore:{
			},
			more:{
				employeeStatus:function(_this, prompt){
					var epStatus=$('[name="employeeStatus"]',ugcDialogReview);
					if(epStatus.is(":checked")){
						prompt.succ($(this));
						return true;
					}else{
						prompt.err($(this));
						return false;
					}
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
        },
        title:function(_this, prompt){
					var val=$.trim($(this).val()),
							len=val.length;
					if(len<10){
						prompt.err($(this),"您至少需要输入10个字");
						return false;
					}else{
						prompt.succ($(this));
						return true;
					}		
        },
				pros:function(_this, prompt){
					var val=$.trim($(this).val()),
							len=val.length;
					if(len<50){
						prompt.err($(this),"您至少需要输入50个字");
						return false;
					}else if(len>2000){
							prompt.err($(this),"您最多只能输入2000个字");
							return false
					}else{
						prompt.succ($(this));
						return true;
					}		
				}
			},
			ajaxSubmit: {
    	  elems: 'input:text, input:hidden, input[type="radio"]:checked, textarea',
    	  dataType:"html",
        beforeSend: function(){},
     		success: function(result){
     			$.maskUI.open({
		    		elem: $(result)
		  		});

		  		$('a[data-type="ugc_regist"]').click(function(){
		  			authOpen('#registerDialog?authcb=authCallback');
		  		  window.authCallback=function(ret){
		  		    window.location.reload();
		  		  }
		  		})
    		}
    	}
		}).init().submit(function(){
			//$('[data-type=cancel]',coNameIpt).trigger("click");
			return true;
		});
	}	
	$('body').on("click",'.js_ugc_bt[data-type=comment]',function(){
		var _this=$(this),
				url=_this.data("url");
		/*
		var cubeUgcStep2_2=$("#cube_ugc_step2_2"),
				entryDate=$('[name="entryDate"]',cubeUgcStep2_2).val(),
				dimissionDate=$('[name="dimissionDate"]',cubeUgcStep2_2).val(),
				employeeStatus=$('[name="employeeStatus"]',cubeUgcStep2_2).val();		
		*/
		$("#ugc_dialog_review").remove();
		$.ajax({
			url:url,
			/*
			data:{
				entryDate:entryDate,
				dimissionDate:dimissionDate,
				employeeStatus:employeeStatus
			},
			*/
			beforeSend:function(){
        $.maskUI.open({
          content: '<p class="js-loading mt10 mb10 t-center"><img src="/images/loading.gif" /></p>'
        });
			},
			success:function(result){
				$.maskUI.open({
			    elem: $(result),
			    pos:"absolute"
			  });
				initDialogReview();
			}
		});
	});	
});