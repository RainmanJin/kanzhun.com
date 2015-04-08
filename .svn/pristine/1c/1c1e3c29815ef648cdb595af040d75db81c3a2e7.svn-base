require.config({
    baseUrl: '/js/site',
    paths: {
        u: '../utils',
        c: '.'
    }
});

require(['c/widgets','u/validator'],function(){
  //选择城市
  var newCompanyCitySuggest = $('#newCompanyCitySuggest'),
      newCompanyCitySuggestHid = $('input[name=cityCode]');
  newCompanyCitySuggest.autocomplete({
    serviceUrl: '/autocomplete/city.json',
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
      newCompanyCitySuggestHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      newCompanyCitySuggestHid.val('');
    },
    onInvalidateSelection: function () {
      newCompanyCitySuggestHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        newCompanyCitySuggestHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        newCompanyCitySuggestHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });    
  //所属行业 公司规模
  $('.select', '#createCompanyForm').DIYSelect({
    listCallback: function (list, field, select) {
      select.removeClass('s_err').addClass('s_suc');
      select.find('dt>input:hidden').val($(this).data('val'));
    }
  });

  $('#createCompanyForm').validatorAll({
    elems: '.v',
    prompt: {
      succ: function (target) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          target.removeClass('err').addClass('suc');
          target.parent().find('>span.red').hide();
        } else {
          //select的错误样式
          target.parent().parent().parent().find('span.red').hide();
        }
      },
      err: function (target, msg) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          target.removeClass('suc').addClass('err');
          var prompt = target.parent().find('p.err');
          prompt = target.parent().find('span.red');
        } else {
          var prompt = target.parent().parent().parent().find('span.red');
        }
        prompt.html('<i class="base errormsg"></i> '+(msg || prompt.data('msg'))).show();
      },
      normal: function (target) {
        if (target.attr('name').indexOf('selectflag') === -1) {
          target.removeClass('err suc');
          target.parent().find('>span.red').hide();
        } else {
          //target.parent().parent().removeClass('s_err s_suc');
          target.parent().parent().parent().find('span.red').hide();
        }
      }
    },
    focusMore: {
      companyName: function (prompt) {
        var self = $(this);
        self.data('ischecked', false).parent().find('span.prompt').hide();
        prompt.normal(self);

        return true;
      },
      url: function () {
        $(this).removeClass('s_err s_suc').parent().find('span').attr('class', 'none');
      }
    },
    more: {
      city: function (_this, prompt, e) {
        var s = setTimeout(function () {
          clearTimeout(s);
          if (newCompanyCitySuggestHid.val() === '') {
            newCompanyCitySuggest.val('').trigger('blur');
          }
          return true;
        }, 300);
        return true;
      } 
    }
  }).init().submit(function(){
    if (newCompanyCitySuggestHid.val() === '') {
      return false;
    }else{
      return true;
    }
  });
});