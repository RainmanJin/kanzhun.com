require.config({
  paths: {
    u: 'js/utils',
    c: 'js/site',
    comp: '../../components',
    highcharts: 'http://s.kanzhun.com/js/utils/highcharts',
    v2: 'v2/js'
  }
});


require(['c/auth_dialog', 'u/validator', 'comp/toggler/toggler'], function(auth_dialog){
  $(function(){
    //筛选 展开
    var toggler = require('comp/toggler/toggler');
    var salaryDetail = $('ul.salary-detail');
    toggler({
      el: $('div.salary-detail-tt div.C-toggler'),
      text: ['添加公司明细', '添加公司明细'],
      on: function(){
        salaryDetail.show();
      },
      off: function(){
        salaryDetail.hide();
      }
    });

    $('dl.select').DIYSelect({
      listCallback: function(list, field, target){
        target.siblings('p.err').hide();
      }
    });


    var salaryDetailList = $('input:text', salaryDetail),
      sDetailErr = $('#sDetailErr'),
      salaryBase  = $('#salaryBase'),
      salaryTotal = $('#salaryTotal'),
      salaryDetailFn = function(){
        var others = 0, total = parseInt(salaryTotal.val());
        salaryDetailList.not('[name=salaryPayBase]').each(function(i, v){
          var val = parseInt(v.value) || 0;
          if(!(/^(([1-9]\d*)|0)$/).test(val)){
            sDetailErr.html('请输入正确的数额！').show();
            return false;
          }else{
            others += val;
          }
        });

        var base = total - others;
        if(base < 0){
          sDetailErr.html('工资明细不能大于月薪,请重新输入。').show();
          salaryBase.val('');
          return;
        }else{
          sDetailErr.hide();
        }

        salaryBase.val(base||0);
      };

    salaryDetail.on('keyup', 'input:text', function () {
      var val = this.value.replace(/^0(?=\d+)|\D/g, '');
      $(this).val(val);
      salaryDetailFn(val);
    });

    salaryTotal.on('keyup', function(){
      var val = this.value.replace(/^0(?=\d+)|\D/g, '');
      $(this).val(val);
      salaryDetailFn(val);
    });


    //表单验证
    var ugcSalaryForm = $('#ugcSalaryForm');
    ugcSalaryForm.validatorAll({
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
      }
    }).init().submit(function(){
      if($.trim(salaryBase.val()) === ''){
        return false;
      }else{
        return true;
      }
    });
  });
});