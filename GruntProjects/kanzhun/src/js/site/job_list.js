require.config({
  baseUrl: '/js/site',
  paths: {
    u: '../utils',
    c: '.',
    comp: '../../components'
  }
});

require(['c/auth_dialog', 'c/user_response', 'c/general', 'c/company_common'], function (auth_dialog, user_response) {
  $(function () {
    $('#jobListFav').on('click', 'a.favorite', function (e) {
      e.preventDefault();
      if (!auth_dialog.isLogged()) {
        auth_dialog.open('#login');
        return;
      }
      var self = $(this), param = self.data('j');
      if (param) {
        $.getJSON(CONTEXTPATH + '/job/adduserjc.json?jobId=' + param, function (ret) {
          ret = ret || {};
          if (ret.rescode == 1011) {
            auth_dialog.open('#login');
          } else if (ret.rescode == 1) {
            self.html('已收藏').addClass('favorited').data('j', null);
          }
        });
      }
    });

    $('#viewCitySelect').DIYSelect({
      keepDefault: true
    });

    $('.search_close', '#joblistSearch').on('click', function () {
      $('#joblistSearch').addClass('none');
    });
    $('#showjobSearch').on('click', function () {
      $('#joblistSearch').toggleClass('none');
    });
  });
  //城市自动补全
  $(function () {

    //search
    var joblistForm = $('#joblistForm'),
      joblistCity = $('#joblistCity'),
      hid = $('input[name=cityCode]', joblistForm);


    //choose city autocomplete
    joblistCity.autocomplete({
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

    joblistCity.on('focus', function () {
      hid.val('');
    });

    joblistForm.on('submit', function (e) {
      if (hid.val() === '' && $.trim(joblistCity.val()) !== '') {
        return false;
      } else {
        return true;
      }
    });

    //分享公司
    var shareComments = user_response.share();
    shareComments.build({
      selectors: 'a.share_co'
    });
  });
});