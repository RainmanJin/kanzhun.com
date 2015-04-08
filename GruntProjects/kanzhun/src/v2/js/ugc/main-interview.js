require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});


require(['c/auth_dialog', 'u/validator', 'v2/ugc/main-suggestion'], function(auth_dialog){
  $(function(){
    var companyNameSuggestHid = $('input[name=encryptCompId]'),
      companyCitySuggest = $('#companyCitySuggest'),
      companyCitySuggestHid = $('input[name=encryptCityCode]');

    var v = $('#step1form').validatorAll({
      elems: 'input.v',
      prompt: {
        succ: function (target) {
          $('p.err', target.removeClass('err active').closest('li')).html('').hide();
        },
        err: function (target, msg) {
          var elem = $('p.err', target.removeClass('active').addClass('err').closest('li'));
          elem.html('<i></i>' + (msg || elem.data('msg'))).show();
        },
        normal: function (target) {
          $('p.err', target.removeClass('err').addClass('active').closest('li')).html('').hide();
        }
      },
      more: {
        cityName: function(_this, prompt, e){
          var s = setTimeout(function(){
            clearTimeout(s);
            if(companyCitySuggestHid.val() === ''){
              companyCitySuggest.val('').trigger('blur');
            }
            return true;
          },300);
          return true;
        }
      }
    });

    v.init().submit(function(){
      if($.trim(companyNameSuggestHid.val()) === ''){
        return false;
      }else{
        return true;
      }
    });
  });
});