$(function(){

  var ifds = $('#cctvSalaryForm input[type=text]');
  var max = parseInt($('input[name=max]').val());
  var min = parseInt($('input[name=min]').val());

  $('#cctvSalaryForm').on('submit', function(){
    var bool = true;
    var target;
    var prompt = '';
    var total = 0;

    ifds.each(function(i, v){
      var val = v.value;
      if($.trim(val) === ''){
        target = $(v);
        bool = false;
        prompt = '请输入正整数！';
        return false;
      }else if(!(/^(([1-9]\d*)|0)$/).test(val)){
        target = $(v);
        bool = false;
        prompt = '请输入正整数！';
        return false;
      }

      total += parseInt(val);
    });

    if(bool && (total < min || total > max)){
      target = ifds;
      prompt = '超出看准君常识！';
      bool = false;
    }

    if(!bool){
      $('#sErr').html(prompt).show();
      target.addClass('on');
      return false;
    }

    return true;
  });

  ifds.on('focus', function(){
    $(this).removeClass('on');
    $('#sErr').hide();
  });

});

