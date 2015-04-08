define(['c/widgets'], function(){
  $(function(){
    //选择公司
    var companyNameSuggest = $('#companyNameSuggest'),
      companyNameSuggestHid = $('input[name=encryptCompId]'),
      companyCitySuggest = $('#companyCitySuggest'),
      companyCitySuggestHid = $('input[name=encryptCityCode]'),
      companyJobSuggest = $('#companyJobSuggest');
      noCoSuggestion = $('div.no-co-suggestion'),
      isEmptyCoSuggestion = false; //保存公司suggestion搜索结果为空

    companyNameSuggest.autocomplete({
      containerClass: 'autocomplete-suggestions cmp_select',
      serviceUrl: CONTEXTPATH + '/autocomplete/company.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            var arr = dataItem.data.split('|');
            return { value: arr[0], data: arr[1], num: arr[2], logo: dataItem.logo, url: dataItem.url};
          })
        };
      },

      formatResult: function (suggestion, currentValue) {
        return '<dl><dt><img src='+STATICURL + suggestion.logo + '></dt><dd><p>' + suggestion.value + '</p><p class="f_12 grey_99">' + suggestion.url + '</p></dd></dl>';
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
          isEmptyCoSuggestion = true;
          return;
        }

        isEmptyCoSuggestion = false;
        if (suggestions.length === 1) {
          companyNameSuggestHid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true,
      beforeRender: function(container){
        //再次搜索时滚动条回到最顶部
        container.scrollTop(0);
      }
    });

    companyNameSuggest.on('blur', function(){
      //如果搜索结果为空
      if(isEmptyCoSuggestion){
        noCoSuggestion.show().find('span').html(companyNameSuggest.val());
        return;
      }

      noCoSuggestion.hide();
      var s = setTimeout(function() {
        clearTimeout(s);
        $.getJSON(CONTEXTPATH + '/company/queryname.json?query='+ encodeURIComponent(companyNameSuggest.val()), function(ret){
          if(companyNameSuggestHid.val() === ''&& !ret.encryptId){
            companyNameSuggest.focus();
            $('div.cmp_select').append('<div class="suggestion-force">请从以上列表中选择公司：<p>没有你的公司？ <a href="/companyugc/">创建新公司档案</a></p></div>').scrollTop(400);
          }else{
            companyCitySuggestHid.val(ret.cityCode);
            companyCitySuggest.val(ret.cityName).trigger('blur');
          }
        });
      }, 200);

    });

    //选择城市
    companyCitySuggest.autocomplete({
      serviceUrl: CONTEXTPATH + '/autocomplete/city.json',
      paramName: 'query',
      dataType: 'json',
      transformResult: function (response) {
        return {
          suggestions: $.map(response.suggestions, function (dataItem) {
            if( response.suggestions.length == 0 ) {

            }
            return { value: dataItem.value, data: dataItem.data};
          })
        };
      },
      //noCache: true,     /
      onSelect: function (suggestion) {
        companyCitySuggestHid.val(suggestion.data);
      },
      onSearchStart: function () {
        companyCitySuggestHid.val('');
      },
      onInvalidateSelection: function () {
        companyCitySuggestHid.val('');
      },
      onSearchComplete: function (query, suggestions) {
        if (suggestions.length === 0) {
          companyCitySuggestHid.val('');
          return;
        }
        //auto select when only one result
        if (suggestions.length === 1) {
          companyCitySuggestHid.val(suggestions[0].data);
        }
      },
      autoSelectFirst: true
    });

    //选择职位
    if (companyJobSuggest.length) {
      companyJobSuggest.autocomplete({
        serviceUrl: CONTEXTPATH + '/autocomplete/jobtitle.json',
        paramName: 'query',
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
});