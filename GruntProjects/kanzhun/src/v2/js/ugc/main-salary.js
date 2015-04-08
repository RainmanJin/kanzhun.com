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
      companyCitySuggestHid = $('input[name=encryptCityCode]'),
      stepOneForm = $('#step1form'),
      entryDateSelect = $('#entryDateSelect'),
      dimissionDateSelect = $('#dimissionDateSelect');

    //当前状态
    $('#salaryEmpStatus').on('click', 'button.radio', function(){
      var val = $(this).val();
      $(this).addClass('radio-checked').siblings('button.radio').removeClass('radio-checked').siblings('input[name=employeeStatus]').val(val).siblings('p.err').hide();
      entryDateSelect.show();
      if(val == 2){
        dimissionDateSelect.show();
      }else{
        dimissionDateSelect.hide();
      }
    });

    //工作性质
    $('#salaryWorkStatus').on('click', 'button.radio', function(){
      $(this).addClass('radio-checked').siblings('button.radio').removeClass('radio-checked').siblings('input[type=hidden]').val($(this).val());
    });

    $('dl.select', stepOneForm).DIYSelect({
      listCallback: function(list, field, target){
        target.siblings('p.err').hide();
      }
    });

    //表单验证
    stepOneForm.validatorAll({
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
          },200);
          return true;
        }

      }
    }).init().submit(function(){
      if($.trim(companyNameSuggestHid.val()) === ''){
        return false;
      }else if(!dimissionDateSelect.is(':hidden') && $('input[name=dimissionDate]').val() < $('input[name=entryDate]').val()){
        dimissionDateSelect.find('p.err').html('<i></i>离职年份不能比入职年份早！').show();
        return false;
      }else{
        return true;
      }
    });

    //离开时间提示
    var wrapbox = $('div.prompt_box');
    $('div.prompt_wrap i').hover(function(){
      wrapbox.removeClass('none');
    },function(){
      wrapbox.addClass('none');
    });
  });
});