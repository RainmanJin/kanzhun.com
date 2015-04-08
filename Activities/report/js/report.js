$(function(){

  var jobTitle = $('input[name=jobTitle]'),
    err = $('p.form-err'),
    industry = $('select[name=industryCode]');


  function createIndustrySelect(){

    var query=jobTitle.val();
    $.ajax({
      url:"/autocomplete/salaryindustry.json",
      dataType:"json",
      data:{
        query:query
      },
      success:function(result){
        if(result && result.suggestions.length > 0)
        var selectHtml='<option value="1">选择TA的行业</option>';
        $.each(result.suggestions,function(i,v){
          var arr=v.data.split("|");
          selectHtml += '<option value="'+arr[1]+'">'+arr[0]+'</option>';
        });

        industry.html(selectHtml);
      }
    });
  }

  //职位autocomplete
  var jobTitleSuggestHid = $('input[name=jobTitleId]');
  jobTitle.autocomplete({
    serviceUrl: '/autocomplete/salaryjob.json',
    paramName: 'query',
    dataType: 'json',
    maxHeight: 350,
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
      industry.html('<option value="1">选择TA的行业</option>');
      err.hide();
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



  //
  $('#reportForm').submit(function(){
    if($.trim(jobTitle.val()) === ''){
      err.html('请输入TA的职位！').show();
      return false;
    }else if(jobTitleSuggestHid.val() === ''){
      err.html('暂时还没有相关职位信息，请再输入一个试试吧！').show();
      jobTitle.val('').focus();
      return false;
    }else if(industry.val() == 1){
      err.html('请选择TA的行业！').show();
      return false;
    }


  });
});