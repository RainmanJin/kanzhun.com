require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});

require(['u/autocomplete'], function(){
  $(function(){

    ///公司 autocomplete
    var companyNameSuggestHid = $('input[name=companyId]');
    $('#coSuggest').autocomplete({
      serviceUrl: '/activity/bsalary/companyList.json',
      paramName: 'query',
      dataType: 'json',
      //格式化修改返回的JSON
      transformResult: function(response) {
        return {
          suggestions: $.map(response.companyJson||[], function (dataItem) {
            return { value: dataItem.name, data: dataItem.salaryCount, id: dataItem.id};
          })
        };
      },
      preserveInput: true,
      maxHeight: 'auto',
      onSelect: function (suggestion) {
        companyNameSuggestHid.val(suggestion.id);
      }
    });


    $('#searchForm').on('submit', function(){
      var co = $('input[name=company]');
      if($.trim(co.val()) === ''){
        co.addClass('shine').one('animationEnd webkitAnimationEnd', function(){
          co.removeClass('shine');
        });
        return false;
      }

      return true;
    });
  });
});