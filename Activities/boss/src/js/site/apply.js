$(function(){
  var progressFirst = $('#progressFirst'),
    errFirst = $('p.err', progressFirst),
    progressSecond = $('#progressSecond'),
    errSecond = $('p.err', progressSecond),
    progressThird = $('#progressThird');

  $(window).on('load', function(){
    $('#loading').remove();
    $('div.apply').removeClass('hidden');
  });


  progressFirst.validatorAll({
    elems: 'input[type=text]',
    prompt: {
      succ: function(target, e){
        errFirst.addClass('hidden');
      },
      err: function(target, msg, e){
        errFirst.html(msg || target.data('msg')).removeClass('hidden');
      },
      normal: function(target, e){
        errFirst.addClass('hidden');
      }
    },
    ajaxSubmit: {
      elems: 'input[type=text]',
      success: function(ret){
        if(ret && ret.rescode == 1){
          progressFirst.hide();
          progressSecond.show();
        }else{
          alert('提交失败！');
        }
      },
      error: function(){
        alert('提交失败！');
      }
    }
  }).init().submit();

  progressSecond.validatorAll({
    elems: 'input[type=text]',
    prompt: {
      succ: function(target, e){
        errSecond.addClass('hidden');
      },
      err: function(target, msg, e){
        errSecond.html(msg || target.data('msg')).removeClass('hidden');
      },
      normal: function(target, e){
        errSecond.addClass('hidden');
      }
    },
    more: {
      phone: {
        type: 'isPhone',
        msg: '请输入正确格式的手机号'
      }
    },

    ajaxSubmit: {
      elems: 'input[type=text]',
      success: function(ret){
        if(ret && ret.rescode == 1){
          progressSecond.hide();
          progressThird.show();
        }else{
          alert('提交失败！');
        }
      },
      error: function(){
        alert('提交失败！');
      }
    }
  }).init().submit();

  $('.next', progressFirst).on('click', function(){
    progressFirst.trigger('likesubmit');
  })

  $('.next', progressSecond).on('click', function(){
    progressSecond.trigger('likesubmit');
  })
});