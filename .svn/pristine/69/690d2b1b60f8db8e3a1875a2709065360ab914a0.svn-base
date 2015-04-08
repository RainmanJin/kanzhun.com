require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});
require(['c/auth_dialog','c/widgets','c/mini_search','u/validator'], function(){
	$(function(){
		$('.select').not('#startDateSelect, #endDateSelect').DIYSelect({
      showCallback: function(list, field, target){
        if(target.hasClass('js_industrySelect') && $('dd>a',target).length === 0){
          target.siblings('p.err').html('请先输入职位名称！').show();
        }
      },
			listCallback: function(list, field, target){
				$('>p.err', field.parent().parent().parent()).hide();
			}
		}); 
		var reportsaveForm=$("#reportsaveForm"),
				jobTitleSuggest = $('input[name=jobTitle]'),
    		jobTitleSuggestHid = $('input[name=jobTitleId]');
	  jobTitleSuggest.autocomplete({
	    serviceUrl: CONTEXTPATH + '/autocomplete/salaryjob.json',
	    paramName: 'query',
	    dataType: 'json',
	    transformResult: function (response) {
	      return {
	        suggestions: $.map(response.suggestions, function (dataItem) {
	          var arr = dataItem.data.split('|');
	          return { value: arr[0], data: arr[1]};
	        })
	      };
	    },
	    onSelect: function (suggestion) {
	      jobTitleSuggestHid.val(suggestion.data);
	      createIndustrySelect();
	    },
	    onSearchStart: function () {
	      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
	      jobTitleSuggestHid.val('');
	    },
	    onInvalidateSelection: function () {
	      jobTitleSuggestHid.val('');
	    },
	    onSearchComplete: function (query, suggestions) {
	      if (suggestions.length === 0) {
	        jobTitleSuggestHid.val('');
	        return;
	      }
	      //auto select when only one result
	      if (suggestions.length === 1) {
	        jobTitleSuggestHid.val(suggestions[0].data);
	      }
	    },
	    autoSelectFirst: true
	  });
		//创建行业下拉列表
		function createIndustrySelect(){
			var query=jobTitleSuggest.val();
			$.ajax({
				url:"/autocomplete/salaryindustry.json",
				dataType:"json",
				data:{
					query:query
				},
				success:function(result){
					var list=result.suggestions;
		      var h='';
		      var selectHtml='';
		      $.each(list,function(i,v){
		      	var arr=v.data.split("|");
		      	selectHtml+='<a href="javascript:;" rel="nofollow" data-val="'+arr[1]+'" >'+arr[0]+'</a>';
		      });
		      h+='<dt>'+
            '<input type="hidden" name="industryCode" value="" class="v" data-necessary="1">'+
            '<input type="button" name="industry_s" value="请选择" ><span class="btn"><i></i></span>'+
          '</dt>'+
          '<dd>'+
            selectHtml+
          '</dd>';
					$("dl.js_industrySelect").html(h);
				}
			});
		}

    var salaryDetail = $('li.rem_s_d input:text'),
      sDetailErr = $('#sDetailErr'),
      salaryBase  = $('input[name=salaryPayBase]'),
      salaryTotal = $('input[name=salaryPayTotal]'),
      salaryDetailFn = function(){
        var others = 0, total = parseInt(salaryTotal.val());
        salaryDetail.not('[name=salaryPayBase]').each(function(i, v){
          var val = parseInt(v.value) || 0;
          if(!(/^(([1-9]\d*)|0)$/).test(val)){
            sDetailErr.html('请输入正确的数额！').show();
            return false;
          }else{
            others += val;
          }
        });

        var base = total - others;
        if(base < 0){
          sDetailErr.html('工资明细不能大于月薪,请重新输入。').show();
          salaryBase.val('');
          return;
        }else{
          sDetailErr.hide();
        }

        salaryBase.val(base||0);
      };
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

    //添加工资明细
    $('#addincome').click(function () {
      var detail = $('li.rem_s_d');
      if(detail.is(':hidden')){
        detail.removeClass('none');
      }else{
        detail.addClass('none');
        sDetailErr.hide();
        //salaryDetail.val('');
        salaryBase.val(salaryTotal.val());
      }
    });

		var v = reportsaveForm.validatorAll({
			elems: 'input:text,.v',
	    prompt: {
	      succ: function (target) {
					var elem;
         	if(target.attr('type') === 'hidden'){
             elem = $('>p.err', target.parent().parent().parent());
          }else{
          	elem=$('>p', target.parent())
          }
	        elem.html('').hide();
	      },
	      err: function (target, msg) {
	      	var elem;
         	if(target.attr('type') === 'hidden'){
             elem = $('>p.err', target.parent().parent().parent());
          }else{
          	elem=$('>p', target.parent())
          }
	        elem.html(msg || elem.data('msg')).show();
	      },
	      normal: function (target) {
	      	var elem;
	      	if(target.attr('type') === 'hidden'){
             elem = $('>p.err', target.parent().parent().parent());
          }else{
          	elem=$('>p', target.parent())
          }
	        $('p', target.parent()).html('').hide();
	      }
	    },
	    more:{
	      jobTitle: function (_this, prompt, e) {
          var that = this;
	        var s = setTimeout(function () {
	          clearTimeout(s);
	          if (jobTitleSuggestHid.val() === '') {
	            //jobTitleSuggest.val('').trigger('blur');
              prompt.err($(that), '职位样本数据不足，请重新输入！');
	          }
	          return true;
	        }, 300);
	        return true;
	      },
        email:{
          type: 'isMail',
          msg: '请输入正确格式的邮箱！'
        },
        company: function(_this, prompt, e){
          var val =  this.value;
          var scale = $('input[name=scale]');
          setTimeout(function(){
            if($.trim(val) !== '' && companyNameSuggestHid.val() === ''){
              $('#coScale').show();
              scale.attr('data-necessary', '1');
              v.elems = 'input:text,.v';
            }else{
              $('#coScale').hide();
              scale.removeAttr('data-necessary').val('');
              $('input[name=scale_s]').val('请选择');
              v.elems = 'input:text,.v:not([name=scale])';
            }
          },300);

          return true;
        }
	    }
		});

    v.init().submit(function(){
      if($.trim(salaryBase.val()) === ''){
        return false;
      }else{
        return true;
      }
    });

    var companyNameSuggest = $('input[name=company]'),
      companyNameSuggestHid = $('input[name=companyId]');


    //选择公司
    companyNameSuggest.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/company.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            var arr = dataItem.data.split('|');
            return { value: arr[0], data: arr[1], num: arr[2]};
          })
        };
      },
      formatResult: function (suggestion, currentValue) {
        return suggestion.value + '（' + suggestion.num + '）';
      },
      onSelect: function (suggestion) {
        companyNameSuggestHid.val(suggestion.data);
      },
      onSearchStart: function () {
        //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
        companyNameSuggestHid.val('');
      },
      onInvalidateSelection: function () {
        companyNameSuggestHid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          companyNameSuggestHid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          companyNameSuggestHid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });
	});
});