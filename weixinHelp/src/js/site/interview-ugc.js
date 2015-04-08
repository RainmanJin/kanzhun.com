$(function(){
  var interviewDialog =$('#interviewDialog');

   //city autocomplete
  var city = $('input[name=city]'),
    cityHid = $('input[name=cityCode]'),
    stepOne = $('div.i-step-one'),
    stepTwo = $('div.i-step-two');


  city.autocomplete({
    serviceUrl: '/city/city.json',
    paramName: 'query',
    dataType: 'json',
    maxHeight: 'auto',
    onSelect: function (suggestion) {
      cityHid.val(suggestion.data);
    },
    onSearchStart: function () {
      //防止选中后不失去焦点接着搜 强制选择的地方都要加这个
      cityHid.val('');
    },
    onInvalidateSelection: function () {
      cityHid.val('');
    },
    onSearchComplete: function (query, suggestions) {
      if (suggestions.length === 0) {
        cityHid.val('');
        return;
      }
      //auto select when only one result
      if (suggestions.length === 1) {
        cityHid.val(suggestions[0].data);
      }
    },
    autoSelectFirst: true
  });

  var industry = $('input[name=industryCode]').val();
  $('input[name=jobTitle]').autocomplete({
    serviceUrl: '/autocomplete/jobtitle.json',
    paramName: 'query',
    dataType: 'json',
    maxHeight: 'auto',
    params: function (query) {
      return {
        query: query,
        code: industry
      };
    },
    autoSelectFirst: true
  });


  $.fn.buttonToRaido = function(cb){
    $(this).on('click', 'button', function(){
      var _this = $(this);
      _this.addClass('on').siblings('button').removeClass('on');
      _this.siblings('input[type=hidden]').val(_this.val());
      _this.parent().next('p.err').hide();

      if(cb){
        cb.call(_this);
      }
    });
  }

  //
  $('div.i-ret,div.i-feeling,div.i-chance').buttonToRaido();
  $('div.i-level').buttonToRaido(function(){
    this.parent().find('button').slice(0,this.val()).addClass('on');
    this.siblings('span').html(this.data('w'));
  });

  //validator
  var v = $('#interviewUgcForm').validatorAll({
    elems: 'input.v, textarea.v',
    prompt: {
      succ: function(target){
        target.parent().siblings('p.err').hide();
      },
      err: function(target, msg){
        var err = target.parent().siblings('p.err');
        err.html(msg || err.data('msg')).show();
      },
      normal: function(target){
        target.parent().siblings('p.err').hide();
      }
    },
    more: {
      city: function(_this, prompt, e){
        var self = $(this);
        var s = setTimeout(function () {
          clearTimeout(s);
          if (cityHid.val() === '') {
            prompt.err(self, '请从提示列表里选择城市！');
          }
        }, 300);
        return true;
      },

      process: function(_this, prompt, e){
        var self = $(this);
        if(this.value.length < 20){
          prompt.err(self, '不能少于20个字！');
          return false;
        }else{
          prompt.succ(self);
          return true;
        }
      }
    }
  });

  v.init().submit(function(){
    if(cityHid.val() === ''){
      return false;
    }

    if(stepTwo.hasClass('hidden')){
      v.elems = 'input.v, textarea.v, input.v2'
      stepOne.addClass('hidden');
      stepTwo.removeClass('hidden');
      return false;
    }

    return true;
  });


  //添加问题
  var question = $('textarea[name=question]', interviewDialog),
    answer = $('textarea[name=answer]', interviewDialog),
    qaList = $('#qaList'),
    count = $('#qaCount');

  $('#addQuestion').on('click', function(){
    count.html(qaList.find('a').length + 1);
    question.val('');
    answer.val('');
    $.maskUI.open({
      pos: 'absolute',
      elem: interviewDialog
    });
  });

  $('#addNewQuestion').on('click', function(){
    var q = $.trim(question.val()),
      s = $.trim(answer.val());
    if(q === '' && s === ''){
      $('a.dialog_close').trigger('click');
    }else if(q === '' && s !== ''){
      question.parent().next('p.err').show();
    }else{
      var r = interviewDialog.data('qaid');


      if(r){
        $('#q_' + r).val(q);
        $('#a_' + r).val(s);
      }else{
        r =  Date.now();
        $('#interviewUgcForm').append('<input name="question" id="q_'+r+'" type="hidden" value="'+q+'"/><input name="answer" id="a_'+r+'" type="hidden" value="'+s+'"/>');
        qaList.append('<p><a href="javascript:;" class="blue" id="l_'+r+'">'+q+'</a></p>');
      }


      $('a.dialog_close').trigger('click');

      question.parent().next('p.err').hide();
      interviewDialog.data('qaid', '');

      if(parseInt(count.html()) === 5){
        $('#addQuestion').hide();
      }
    }
  });

  question.on('focus', function(){
    question.parent().next('p.err').hide();
  });

  qaList.on('click', 'a', function(){
    var id = this.id.replace('l_','');
    question.val($('#q_' + id).val());
    answer.val($('#a_' + id).val());
    interviewDialog.data('qaid', id);
    count.html(qaList.find('a').index(this) + 1);

    $.maskUI.open({
      pos: 'absolute',
      elem: interviewDialog
    });
  });

  $('textarea[name=process]').one('focus', function(){
    $('li.ab-qa-hid,p.ab-qa-hid').removeClass('hidden');
  });
});