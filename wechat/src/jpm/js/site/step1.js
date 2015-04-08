/**
 * Created by zcy on 2015/3/28.
 */
$(function(){
	$("#companyNameSuggest").autocomplete({
	    containerClass: 'autocomplete-suggestions cmp_select',
	    serviceUrl: '/activity/jinpingmei/company.json',
	    paramName: 'q',
	    dataType: 'json',
	    transformResult: function (response) {
	        return {
	            suggestions: $.map(response.suggestions, function (dataItem) {
	                var arr = dataItem.data.split('|');
	                return { value: arr[0], data: arr[1], num: arr[2], logo: dataItem.logo, industry : dataItem.industry,city :dataItem.city };
	            })
	        };
	    },
	    onSelect: function (suggestion) {
	    	 $("#encryptCompId").val(suggestion.data);
	    }
	});

	$(".next").on("click",function(){
		if($.trim($("#companyNameSuggest").val())==""){
			alert("您要提名的公司不能为空!");
			return false;
		}

		if(!$("input[name='relation']:checked").val()){
			alert("请选择您和提名公司的关系!");
			return false;
		}

	});

});

