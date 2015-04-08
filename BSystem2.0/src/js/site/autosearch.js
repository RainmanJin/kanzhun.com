require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets'],function(){
		var company=$('input[name="searchWord"]');
    company.autocomplete({
      serviceUrl: '/autocomplete/searchkey.json',
      paramName: 'query',
      params: function (query) {
        return {
          query: query,
          type: 2
        };
      },
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            return { value: dataItem.value, type: dataItem.type};
          })
        };
      },
      onSelect: function(suggestion){
      }
    });

    //职位
    var companyJobSuggest = $('#companyJobSuggest');
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
});