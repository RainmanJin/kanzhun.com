require.config({
  paths: {
    u: '../../utils',
    s: '.'
  }
});
require(['u/autocomplete', 'u/validator', 'u/wx-share','u/maskui'], function(){
  var wxShare = require('u/wx-share');
  wxShare($('a.wx-share-btn'), '<p class="pt10">点击右上角的【分享按钮】<br/>分享到朋友圈</p>', function(){
    /*
    window.shareCallback = function(){
      $.get('/activity/bsalary/increase.json');
    }
    */
  });

  //选择公司
  var companyNameSuggest = $('#coSuggestions'),
    companyNameSuggestHid = $('input[name=companyId]');
  companyNameSuggest.autocomplete({
    serviceUrl: '/activity/bsalary/companyList.json',
    paramName: 'query',
    dataType: 'json',
    transformResult: function(response) {
      return {
        suggestions: $.map(response.companyJson||[], function (dataItem) {
          return { value: dataItem.name, data: dataItem.salaryCount, id: dataItem.id};
        })
      };
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

  //选择职位
  $('#jobSuggestions').autocomplete({
    serviceUrl: '/activity/bsalary/autojob.json',
    paramName: 'query',
    dataType: 'json',
    transformResult: function(response) {
      return {
        suggestions: $.map(response.jobtitleSalaryStatInfoJson||[], function (dataItem) {
          return { value: dataItem.jobTitle, data: dataItem.salaryCount, id: dataItem.id};
        })
      };
    }
  });

  $('#createSalaryForm').on('click', 'p.err', function(){
    $(this).hide().siblings('input, select').focus();
  }).validatorAll({
    elems: 'input[type=text], input[type=hidden], select',
    prompt: {
      succ: function(target){
        target.closest('li').removeClass('active error').find('p.err').hide();
      },
      err: function(target, msg){
        var err = target.closest('li').removeClass('active').addClass('error').find('p.err');
        err.html(msg || err.data('msg') || '').show();
      },
      normal: function(target){
        target.closest('li').removeClass('error').addClass('active').find('p.err').hide();
      }
    },
    more: {
      salary: {
        type: 'isIntger',
        msg: '月薪必须为正整数！'
      },
      companyName: function(_this, prompt, e){
        var val =  this.value;
        var s = setTimeout(function() {
          //clearTimeout(s);
          if($.trim(val) !== '' && companyNameSuggestHid.val() === '') {
            $.maskUI.open({
              elem: $('#createCompanyDialog'),
              resetForm:true
              //overlayClick: true
            })
          }
        },300);
        return true;
      }
    }
  }).init().submit();

  //校验创建新公司
  var ccDialog=$('#createCompanyDialog');
  $('#createCompany').on('click', 'p.err', function(){
    $(this).hide().siblings('input, select').focus();
  }).validatorAll({
    elems: 'input[type=text], input[type=hidden], select',
    prompt: {
      succ: function(target){
        target.closest('li').removeClass('active error').find('p.err').hide();
      },
      err: function(target, msg){
        var err = target.closest('li').removeClass('active').addClass('error').find('p.err');
        err.html(msg || err.data('msg') || '').show();
      },
      normal: function(target){
        target.closest('li').removeClass('error').addClass('active').find('p.err').hide();
      }
    },
    more: {
      companySite: {
        type: 'isSite',
        msg: '网站格式不正确'
      },
      city: function (_this, prompt, e) {
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
      elems: 'input:text,input:hidden,select',
      type: 'post',
      data: function () {
        return '&companyName='+companyNameSuggest.val();
      },
      success:function(result){
        if(result.rescode==1){
          //$('.maskuiclose').trigger('click');
          $.maskUI.close();
          companyNameSuggestHid.val(result.companyId);
        }
      }
    }
  }).init().submit();

  //城市
  var searchSuggestCity = $('[name="city"]',ccDialog),
    hid = $('[name="cityCode"]',ccDialog);
  searchSuggestCity.autocomplete({
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

});